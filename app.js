// Motor interactivo del Simulador de Exámenes de Sistemas Operativos (UTN FRM)
(function () {
  const STORAGE_CUSTOM = 'ssoo_utn_preguntas_usuario_v1';
  const STORAGE_WRONG = 'ssoo_utn_errores_ids_v1';
  const STORAGE_STATS = 'ssoo_utn_stats_examenes_v1';
  const STORAGE_THEME = 'ssoo_utn_tema_v1';

  // Campos válidos del comando ps en Linux
  const PS_VALID_FIELDS = new Set([
    'pid', 'tty', 'time', 'cmd', 'command', 'uid', 'user', 'ppid', 'c',
    'cpu', '%cpu', 'mem', '%mem', 'vsz', 'rss', 'stat', 's', 'start',
    'stime', 'pri', 'ni', 'addr', 'sz', 'wchan', 'f', 'psr', 'pcpu', 'pmem'
  ]);

  let customQuestions = loadJson(STORAGE_CUSTOM, []);
  let wrongIds = new Set(loadJson(STORAGE_WRONG, []));
  let examStats = loadJson(STORAGE_STATS, {});

  // Estado de la sesión activa
  let session = {
    questions: [],
    answers: {},   // qId -> valor del usuario
    checked: {},   // qId -> { isCorrect: boolean }
    currentIndex: 0,
    viewMode: 'all' // 'single' | 'all'
  };

  // Estado del creador de preguntas
  let editingCustomId = null;
  let creatorImageData = '';
  let tableBuilderData = [
    ['Columna 1', 'Columna 2', 'Columna 3'],
    ['Dato 1', 'Dato 2', 'Dato 3']
  ];
  let includeBuiltTable = false;

  function loadJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (_) {
      return fallback;
    }
  }

  function saveJson(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      alert('Atención: No se pudo guardar en el almacenamiento local (puede que la imagen sea demasiado pesada). Use Exportar JSON como respaldo.');
    }
  }

  function getAllQuestions() {
    return [...(window.BANCO_PREGUNTAS || []), ...customQuestions];
  }

  function escapeHtml(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function norm(s) {
    return String(s ?? '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ');
  }

  function normTight(s) {
    return norm(s).replace(/[\s;()'"`]/g, '');
  }

  function shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  // Validación flexible de un texto contra lista de respuestas aceptadas y validadores especiales
  function checkSingleText(userVal, acceptedList, validator) {
    const u = norm(userVal);
    if (!u) return false;

    if (validator === 'ps4') {
      const tokens = u.split(/[,;/\s|]+/).map(t => t.trim()).filter(Boolean);
      const matched = new Set(tokens.filter(t => PS_VALID_FIELDS.has(t)));
      return matched.size >= 4;
    }
    if (validator === 'monitor_prop') {
      return (u.includes('un proceso') || u.includes('1 proceso') || u.includes('unico proceso') || u.includes('mas de un proceso')) &&
             (u.includes('activo') || u.includes('adentro') || u.includes('dentro') || u.includes('vez') || u.includes('instante'));
    }
    if (validator === 'mkfs_cmd') {
      return u.includes('mkfs');
    }
    if (validator === 'lns_cmd') {
      return u.includes('ln') && u.includes('-s');
    }
    if (validator === 'mknod_cmd') {
      return u.includes('mknod');
    }

    const uTight = normTight(userVal);
    return (acceptedList || []).some(acc => {
      return norm(acc) === u || normTight(acc) === uTight;
    });
  }

  // Evaluar cualquier tipo de pregunta
  function evaluateQuestion(q, ans) {
    if (ans === undefined || ans === null) return false;

    if (q.type === 'vf') {
      return ans === q.answer;
    }
    if (q.type === 'single') {
      return Number(ans) === Number(q.answer);
    }
    if (q.type === 'multi') {
      if (!Array.isArray(ans) || ans.length === 0) return false;
      const aSorted = [...ans].map(Number).sort((a, b) => a - b);
      const qSorted = [...q.answers].map(Number).sort((a, b) => a - b);
      return aSorted.length === qSorted.length && aSorted.every((v, i) => v === qSorted[i]);
    }
    if (q.type === 'text') {
      return checkSingleText(ans, q.accepted, q.validator);
    }
    if (q.type === 'blanks') {
      if (!Array.isArray(ans) || ans.length !== q.fields.length) return false;
      return q.fields.every((f, idx) => checkSingleText(ans[idx], f.accepted, f.validator));
    }
    return false;
  }

  function hasUserAnswered(q, ans) {
    if (ans === undefined || ans === null) return false;
    if (q.type === 'vf') return ans === 'V' || ans === 'F';
    if (q.type === 'single') return ans !== '' && !Number.isNaN(Number(ans));
    if (q.type === 'multi') return Array.isArray(ans) && ans.length > 0;
    if (q.type === 'text') return String(ans).trim().length > 0;
    if (q.type === 'blanks') return Array.isArray(ans) && ans.some(x => String(x ?? '').trim().length > 0);
    return false;
  }

  function getRightAnswerSummary(q) {
    if (q.type === 'vf') return q.answer === 'V' ? 'Verdadero (V)' : 'Falso (F)';
    if (q.type === 'single') return q.options[q.answer];
    if (q.type === 'multi') return q.answers.map(i => q.options[i]).join('  |  ');
    if (q.type === 'text') return q.displayAnswer || (q.accepted && q.accepted[0]) || '';
    if (q.type === 'blanks') {
      return q.fields.map(f => `${f.label}: ${f.displayAnswer || f.accepted[0]}`).join('  |  ');
    }
    return '';
  }

  // =========================================================================
  // INICIALIZACIÓN DE FILTROS Y SESIÓN
  // =========================================================================
  function populateFilters() {
    const all = getAllQuestions();
    const catSelect = document.getElementById('filter-category');
    const examSelect = document.getElementById('filter-exam');
    const prevCat = catSelect.value || 'ALL';
    const prevExam = examSelect.value || 'ALL';

    const categories = [
      { val: 'ALL', label: `Todas las categorías (${all.length} preguntas)` },
      { val: 'CARPETA_PAGINA', label: 'Solo carpeta "pagina" (Globales + 2ºP Práctica)' },
      { val: 'Globales / Integradores', label: 'Globales / Integradores' },
      { val: '2º Parcial Práctica', label: '2º Parcial Práctica' },
      { val: '1º Parcial Práctica', label: '1º Parcial Práctica' },
      { val: '2º Parcial Teoría', label: '2º Parcial Teoría' },
      { val: 'Mis Preguntas', label: `Mis Preguntas Agregadas (${customQuestions.length})` }
    ];

    catSelect.innerHTML = categories
      .map(c => `<option value="${escapeHtml(c.val)}">${escapeHtml(c.label)}</option>`)
      .join('');
    if ([...catSelect.options].some(o => o.value === prevCat)) catSelect.value = prevCat;

    updateExamDropdown(prevExam);
    updateHeaderBadges();
    renderCatalog();
    renderCustomList();
    renderMistakesView();
    populateCreatorExamDatalist();
  }

  function filterByCategory(list, catVal) {
    if (catVal === 'ALL') return list;
    if (catVal === 'CARPETA_PAGINA') {
      return list.filter(q => q.category === 'Globales / Integradores' || q.category === '2º Parcial Práctica');
    }
    return list.filter(q => q.category === catVal);
  }

  function updateExamDropdown(preferredExam) {
    const catVal = document.getElementById('filter-category').value;
    const examSelect = document.getElementById('filter-exam');
    const filtered = filterByCategory(getAllQuestions(), catVal);

    const examCounts = new Map();
    filtered.forEach(q => {
      examCounts.set(q.exam, (examCounts.get(q.exam) || 0) + 1);
    });

    let html = `<option value="ALL">Todos los exámenes del filtro (${filtered.length} preg.)</option>`;
    for (const [examName, count] of examCounts.entries()) {
      html += `<option value="${escapeHtml(examName)}">${escapeHtml(examName)} (${count})</option>`;
    }
    examSelect.innerHTML = html;
    if (preferredExam && [...examSelect.options].some(o => o.value === preferredExam)) {
      examSelect.value = preferredExam;
    }
  }

  function startNewSession(customPool) {
    let pool;
    if (Array.isArray(customPool)) {
      pool = [...customPool];
    } else {
      const catVal = document.getElementById('filter-category').value;
      const examVal = document.getElementById('filter-exam').value;
      pool = filterByCategory(getAllQuestions(), catVal);
      if (examVal !== 'ALL') {
        pool = pool.filter(q => q.exam === examVal);
      }
    }

    const doShuffle = document.getElementById('chk-shuffle').checked;
    const limitVal = document.getElementById('filter-limit').value;
    session.viewMode = document.getElementById('chk-single-view').checked ? 'single' : 'all';

    if (doShuffle) {
      pool = shuffleArray(pool);
    }
    if (limitVal !== 'ALL' && !Array.isArray(customPool)) {
      const lim = parseInt(limitVal, 10);
      if (!Number.isNaN(lim) && pool.length > lim) {
        pool = pool.slice(0, lim);
      }
    }

    session.questions = pool;
    session.answers = {};
    session.checked = {};
    session.currentIndex = 0;

    renderSession();
  }

  function reshuffleCurrentUnchecked() {
    if (session.questions.length <= 1) return;
    session.questions = shuffleArray(session.questions);
    session.currentIndex = 0;
    renderSession();
  }

  // =========================================================================
  // RENDERIZADO DE LA PRÁCTICA / EXAMEN
  // =========================================================================
  function renderSession() {
    updateScoreboard();
    const container = document.getElementById('questions-container');
    const stepperWrap = document.getElementById('stepper-controls');

    if (session.questions.length === 0) {
      container.innerHTML = `
        <div class="panel" style="text-align:center; padding:2.5rem 1rem;">
          <h3>No hay preguntas en este filtro</h3>
          <p style="color:var(--text-muted)">Elegí otra categoría o agregá tus propias preguntas en la pestaña "Agregar Pregunta".</p>
        </div>`;
      stepperWrap.style.display = 'none';
      return;
    }

    if (session.viewMode === 'single') {
      stepperWrap.style.display = 'block';
      if (session.currentIndex >= session.questions.length) {
        session.currentIndex = session.questions.length - 1;
      }
      const q = session.questions[session.currentIndex];
      container.innerHTML = renderQuestionCard(q, session.currentIndex);
      renderStepperDots();
    } else {
      stepperWrap.style.display = 'none';
      container.innerHTML = session.questions.map((q, idx) => renderQuestionCard(q, idx)).join('');
    }
  }

  function renderQuestionCard(q, idx) {
    const chk = session.checked[q.id];
    const ans = session.answers[q.id];
    const stateClass = chk ? (chk.isCorrect ? 'correcta' : 'incorrecta') : '';
    const isCustom = String(q.id).startsWith('custom_');

    let mediaBlock = '';
    if (q.mediaHtml) {
      mediaBlock += `<div class="q-media">${q.mediaHtml}</div>`;
    }
    if (q.imageUrl) {
      mediaBlock += `<div class="q-media"><img src="${escapeHtml(q.imageUrl)}" alt="Diagrama o cuadro de la pregunta"></div>`;
    }
    if (q.codeText) {
      mediaBlock += `<div class="q-media"><div class="code-box">${escapeHtml(q.codeText)}</div></div>`;
    }

    const inputHtml = renderQuestionInputs(q, ans, chk);
    const feedbackHtml = chk ? renderFeedback(q, chk.isCorrect) : '';

    return `
      <article class="question-card ${stateClass}" id="qcard-${escapeHtml(q.id)}">
        <div class="q-meta">
          <div class="q-badges">
            <span class="q-number">#${idx + 1} de ${session.questions.length}</span>
            <span class="q-badge cat">${escapeHtml(q.category)}</span>
            <span class="q-badge">${escapeHtml(q.exam)}</span>
            ${isCustom ? '<span class="q-badge custom">Agregada por vos</span>' : ''}
          </div>
          <span class="q-badge">${q.points || 10} pts</span>
        </div>

        <div class="q-prompt">${escapeHtml(q.prompt)}</div>
        ${mediaBlock}
        ${inputHtml}

        <div class="q-actions">
          <div class="btn-group">
            ${!chk ? `<button type="button" class="btn btn-primary btn-sm" data-action="check-one" data-qid="${escapeHtml(q.id)}">✓ Comprobar respuesta</button>` : `<button type="button" class="btn btn-sm" data-action="retry-one" data-qid="${escapeHtml(q.id)}">↺ Intentar de nuevo</button>`}
          </div>
          ${chk ? `<span style="font-weight:750; color:${chk.isCorrect ? 'var(--success)' : 'var(--danger)'}">${chk.isCorrect ? '¡Respuesta Correcta!' : 'Respuesta Incorrecta'}</span>` : ''}
        </div>
        ${feedbackHtml}
      </article>`;
  }

  function renderQuestionInputs(q, ans, chk) {
    const locked = Boolean(chk);

    if (q.type === 'vf') {
      const getCls = (val) => {
        const classes = ['vf-btn'];
        if (ans === val && !chk) classes.push('selected');
        if (chk) {
          if (q.answer === val) classes.push('right-choice');
          else if (ans === val && q.answer !== val) classes.push('wrong-choice');
        }
        return classes.join(' ');
      };
      return `
        <div class="vf-row">
          <button type="button" class="${getCls('V')}" ${locked ? 'disabled' : ''} data-action="pick-vf" data-qid="${escapeHtml(q.id)}" data-val="V">Verdadero (V)</button>
          <button type="button" class="${getCls('F')}" ${locked ? 'disabled' : ''} data-action="pick-vf" data-qid="${escapeHtml(q.id)}" data-val="F">Falso (F)</button>
        </div>`;
    }

    if (q.type === 'single') {
      return `
        <div class="options-list">
          ${q.options.map((opt, oi) => {
            const isSel = ans !== undefined && ans !== '' && Number(ans) === oi;
            let cls = 'option-item';
            if (locked) cls += ' locked';
            if (isSel && !chk) cls += ' selected';
            if (chk) {
              if (Number(q.answer) === oi) cls += ' right-choice';
              else if (isSel) cls += ' wrong-choice';
            }
            return `
              <label class="${cls}">
                <input type="radio" name="opt_${escapeHtml(q.id)}" value="${oi}" ${isSel ? 'checked' : ''} ${locked ? 'disabled' : ''} data-action="pick-single" data-qid="${escapeHtml(q.id)}">
                <span>${escapeHtml(opt)}</span>
              </label>`;
          }).join('')}
        </div>`;
    }

    if (q.type === 'multi') {
      const selSet = new Set(Array.isArray(ans) ? ans.map(Number) : []);
      const rightSet = new Set((q.answers || []).map(Number));
      return `
        <div class="options-list">
          ${q.options.map((opt, oi) => {
            const isSel = selSet.has(oi);
            let cls = 'option-item';
            if (locked) cls += ' locked';
            if (isSel && !chk) cls += ' selected';
            if (chk) {
              if (rightSet.has(oi)) cls += ' right-choice';
              else if (isSel) cls += ' wrong-choice';
            }
            return `
              <label class="${cls}">
                <input type="checkbox" value="${oi}" ${isSel ? 'checked' : ''} ${locked ? 'disabled' : ''} data-action="pick-multi" data-qid="${escapeHtml(q.id)}">
                <span>${escapeHtml(opt)}</span>
              </label>`;
          }).join('')}
        </div>`;
    }

    if (q.type === 'text') {
      return `
        <div style="max-width:560px;">
          <input type="text" value="${escapeHtml(ans || '')}" placeholder="${escapeHtml(q.placeholder || 'Escribí tu respuesta aquí...')}" ${locked ? 'disabled' : ''} data-action="input-text" data-qid="${escapeHtml(q.id)}">
        </div>`;
    }

    if (q.type === 'blanks') {
      const arr = Array.isArray(ans) ? ans : q.fields.map(() => '');
      return `
        <div class="blanks-grid">
          ${q.fields.map((f, fi) => {
            const val = arr[fi] || '';
            if (Array.isArray(f.options) && f.options.length > 0) {
              return `
                <div class="blank-row">
                  <label>${escapeHtml(f.label)}</label>
                  <select ${locked ? 'disabled' : ''} data-action="input-blank" data-qid="${escapeHtml(q.id)}" data-fidx="${fi}">
                    <option value="">-- Seleccionar --</option>
                    ${f.options.map(op => `<option value="${escapeHtml(op)}" ${val === op ? 'selected' : ''}>${escapeHtml(op)}</option>`).join('')}
                  </select>
                </div>`;
            }
            return `
              <div class="blank-row">
                <label>${escapeHtml(f.label)}</label>
                <input type="text" value="${escapeHtml(val)}" placeholder="${escapeHtml(f.placeholder || 'Completar...')}" ${locked ? 'disabled' : ''} data-action="input-blank" data-qid="${escapeHtml(q.id)}" data-fidx="${fi}">
              </div>`;
          }).join('')}
        </div>`;
    }

    return '';
  }

  function renderFeedback(q, isCorrect) {
    return `
      <div class="feedback-box ${isCorrect ? 'ok' : 'bad'}">
        <div class="feedback-title">
          ${isCorrect ? '✅ ¡Correcto!' : `❌ Incorrecto — Respuesta correcta: ${escapeHtml(getRightAnswerSummary(q))}`}
        </div>
        ${q.explanation ? `<div class="feedback-exp">${escapeHtml(q.explanation)}</div>` : ''}
      </div>`;
  }

  function renderStepperDots() {
    const dotsEl = document.getElementById('stepper-dots');
    const prevBtn = document.getElementById('btn-prev-q');
    const nextBtn = document.getElementById('btn-next-q');

    prevBtn.disabled = session.currentIndex <= 0;
    nextBtn.disabled = session.currentIndex >= session.questions.length - 1;

    dotsEl.innerHTML = session.questions.map((q, i) => {
      const chk = session.checked[q.id];
      const answered = hasUserAnswered(q, session.answers[q.id]);
      const cls = ['q-dot'];
      if (i === session.currentIndex) cls.push('current');
      if (chk) cls.push(chk.isCorrect ? 'ok' : 'bad');
      else if (answered) cls.push('answered');
      return `<button type="button" class="${cls.join(' ')}" data-action="goto-q" data-idx="${i}">${i + 1}</button>`;
    }).join('');
  }

  function updateScoreboard() {
    const total = session.questions.length;
    let right = 0;
    let wrong = 0;
    let earnedPts = 0;
    let totalPts = 0;

    session.questions.forEach(q => {
      const pts = Number(q.points) || 10;
      totalPts += pts;
      const chk = session.checked[q.id];
      if (chk) {
        if (chk.isCorrect) {
          right++;
          earnedPts += pts;
        } else {
          wrong++;
        }
      }
    });

    const checkedCount = right + wrong;
    const pending = total - checkedCount;
    const pct = totalPts > 0 ? Math.round((earnedPts / totalPts) * 100) : 0;

    document.getElementById('stat-total').textContent = total;
    document.getElementById('stat-right').textContent = right;
    document.getElementById('stat-wrong').textContent = wrong;
    document.getElementById('stat-pending').textContent = pending;
    document.getElementById('stat-score').textContent = `${pct}% (${earnedPts}/${totalPts}p)`;

    const progressPct = total > 0 ? Math.round((checkedCount / total) * 100) : 0;
    document.getElementById('session-progress-fill').style.width = `${progressPct}%`;
  }

  function checkOneQuestion(qId) {
    const q = session.questions.find(item => item.id === qId);
    if (!q) return;
    const isCorrect = evaluateQuestion(q, session.answers[qId]);
    session.checked[qId] = { isCorrect };

    if (!isCorrect) {
      wrongIds.add(qId);
    } else {
      wrongIds.delete(qId);
    }
    saveJson(STORAGE_WRONG, [...wrongIds]);
    updateHeaderBadges();
    renderMistakesView();
    renderSession();
  }

  function checkAllQuestions() {
    session.questions.forEach(q => {
      const isCorrect = evaluateQuestion(q, session.answers[q.id]);
      session.checked[q.id] = { isCorrect };
      if (!isCorrect) wrongIds.add(q.id);
      else wrongIds.delete(q.id);
    });
    saveJson(STORAGE_WRONG, [...wrongIds]);

    // Si estaba practicando un examen específico, guardar su mejor/última nota
    const selectedExam = document.getElementById('filter-exam').value;
    if (selectedExam && selectedExam !== 'ALL' && session.questions.length > 0) {
      let earned = 0;
      let maxP = 0;
      session.questions.forEach(q => {
        const p = Number(q.points) || 10;
        maxP += p;
        if (session.checked[q.id]?.isCorrect) earned += p;
      });
      examStats[selectedExam] = {
        pct: Math.round((earned / maxP) * 100),
        date: new Date().toLocaleDateString('es-AR')
      };
      saveJson(STORAGE_STATS, examStats);
      renderCatalog();
    }

    updateHeaderBadges();
    renderMistakesView();
    renderSession();
  }

  // =========================================================================
  // CATÁLOGO DE EXÁMENES Y PESTAÑA DE ERRORES
  // =========================================================================
  function renderCatalog() {
    const all = getAllQuestions();
    const byExam = new Map();
    all.forEach(q => {
      if (!byExam.has(q.exam)) {
        byExam.set(q.exam, { exam: q.exam, category: q.category, count: 0, points: 0 });
      }
      const info = byExam.get(q.exam);
      info.count++;
      info.points += Number(q.points) || 10;
    });

    const grid = document.getElementById('catalog-grid');
    grid.innerHTML = [...byExam.values()].map(item => {
      const st = examStats[item.exam];
      const statusBadge = st
        ? `<span class="q-badge" style="color:${st.pct >= 60 ? 'var(--success)' : 'var(--danger)'}; font-weight:800;">Última nota: ${st.pct}% (${st.pct >= 60 ? 'AD / Aprobado' : 'Repasar'})</span>`
        : `<span class="q-badge">Sin rendir aún</span>`;
      return `
        <div class="exam-card">
          <div>
            <span class="q-badge cat">${escapeHtml(item.category)}</span>
            <h3>${escapeHtml(item.exam)}</h3>
            <p>${item.count} actividades • ${item.points} puntos totales</p>
            <div style="margin-top:0.5rem;">${statusBadge}</div>
          </div>
          <div class="btn-group">
            <button type="button" class="btn btn-primary btn-sm" data-action="launch-exam" data-exam="${escapeHtml(item.exam)}" data-shuffle="0">📄 Rendir en orden</button>
            <button type="button" class="btn btn-sm" data-action="launch-exam" data-exam="${escapeHtml(item.exam)}" data-shuffle="1">🔀 Rendir mezclado</button>
          </div>
        </div>`;
    }).join('');
  }

  function renderMistakesView() {
    const all = getAllQuestions();
    const wrongList = all.filter(q => wrongIds.has(q.id));
    const box = document.getElementById('mistakes-container');

    if (wrongList.length === 0) {
      box.innerHTML = `
        <div class="panel" style="text-align:center; padding:2rem;">
          <h3>🎉 ¡No tenés preguntas pendientes en tu lista de errores!</h3>
          <p style="color:var(--text-muted)">Cada vez que falles una pregunta quedará guardada aquí automáticamente hasta que la respondas bien.</p>
        </div>`;
      return;
    }

    box.innerHTML = `
      <div class="panel">
        <div class="panel-header">
          <h3 class="panel-title">Preguntas por repasar (${wrongList.length})</h3>
          <div class="btn-group">
            <button type="button" class="btn btn-primary" id="btn-practice-mistakes">🔥 Practicar estas ${wrongList.length} preguntas ahora</button>
            <button type="button" class="btn btn-danger" id="btn-clear-mistakes">Limpiar historial de errores</button>
          </div>
        </div>
        <div class="options-list">
          ${wrongList.map(q => `
            <div class="option-item" style="cursor:default; justify-content:space-between; align-items:center;">
              <div>
                <span class="q-badge cat">${escapeHtml(q.exam)}</span>
                <div style="margin-top:0.3rem; font-weight:600;">${escapeHtml(q.prompt.slice(0, 160))}${q.prompt.length > 160 ? '...' : ''}</div>
              </div>
              <button type="button" class="btn btn-sm" data-action="remove-mistake" data-qid="${escapeHtml(q.id)}">Quitar</button>
            </div>`).join('')}
        </div>
      </div>`;
  }

  function updateHeaderBadges() {
    document.getElementById('badge-total-bank').textContent = getAllQuestions().length;
    document.getElementById('badge-mistakes').textContent = wrongIds.size;
    document.getElementById('badge-custom').textContent = customQuestions.length;
  }

  // =========================================================================
  // CREADOR Y GESTIÓN DE PREGUNTAS DEL USUARIO (CON CUADROS Y DIAGRAMAS)
  // =========================================================================
  function populateCreatorExamDatalist() {
    const exams = new Set(getAllQuestions().map(q => q.exam));
    const dl = document.getElementById('datalist-exams');
    dl.innerHTML = [...exams].map(ex => `<option value="${escapeHtml(ex)}"></option>`).join('');
  }

  function updateCreatorTypeVisibility() {
    const t = document.getElementById('new-type').value;
    document.getElementById('creator-vf-box').style.display = t === 'vf' ? 'block' : 'none';
    document.getElementById('creator-options-box').style.display = (t === 'single' || t === 'multi') ? 'block' : 'none';
    document.getElementById('creator-text-box').style.display = t === 'text' ? 'block' : 'none';
    if (t === 'single' || t === 'multi') {
      renderCreatorOptionInputs();
    }
  }

  function renderCreatorOptionInputs(existingOpts, existingAns) {
    const t = document.getElementById('new-type').value;
    const list = document.getElementById('creator-options-list');
    const currentRows = existingOpts || [...list.querySelectorAll('.creator-opt-row')].map(r => ({
      text: r.querySelector('input[type="text"]').value,
      checked: r.querySelector('.opt-correct-selector').checked
    }));

    const rows = currentRows.length >= 2 ? currentRows : [
      { text: 'a) ', checked: true },
      { text: 'b) ', checked: false },
      { text: 'c) ', checked: false },
      { text: 'd) ', checked: false }
    ];

    list.innerHTML = rows.map((r, i) => `
      <div class="creator-opt-row" style="display:flex; gap:0.5rem; align-items:center; margin-bottom:0.45rem;">
        <input class="opt-correct-selector" type="${t === 'single' ? 'radio' : 'checkbox'}" name="creator_correct_opt" value="${i}" ${r.checked ? 'checked' : ''} title="Marcar como correcta">
        <input type="text" value="${escapeHtml(r.text)}" placeholder="Opción ${i + 1}">
        ${rows.length > 2 ? `<button type="button" class="btn btn-sm btn-danger" data-action="del-opt-row" data-idx="${i}">✕</button>` : ''}
      </div>`).join('');
  }

  // Constructor visual de cuadros/tablas para preguntas agregadas
  function renderTableBuilder() {
    const wrap = document.getElementById('table-builder-container');
    if (!includeBuiltTable) {
      wrap.style.display = 'none';
      return;
    }
    wrap.style.display = 'block';
    const rows = tableBuilderData.length;
    const cols = tableBuilderData[0]?.length || 2;

    let html = `<div style="overflow-x:auto;"><table class="exam-table table-builder-grid"><thead><tr>`;
    for (let c = 0; c < cols; c++) {
      html += `<th><input type="text" value="${escapeHtml(tableBuilderData[0][c] || '')}" data-tb-r="0" data-tb-c="${c}" placeholder="Encabezado ${c + 1}"></th>`;
    }
    html += `</tr></thead><tbody>`;
    for (let r = 1; r < rows; r++) {
      html += `<tr>`;
      for (let c = 0; c < cols; c++) {
        html += `<td><input type="text" value="${escapeHtml(tableBuilderData[r][c] || '')}" data-tb-r="${r}" data-tb-c="${c}" placeholder="Celda"></td>`;
      }
      html += `</tr>`;
    }
    html += `</tbody></table></div>`;
    document.getElementById('table-builder-grid-wrap').innerHTML = html;
  }

  function buildHtmlFromTableBuilder() {
    if (!includeBuiltTable || tableBuilderData.length === 0) return '';
    const head = tableBuilderData[0].map(cell => `<th>${escapeHtml(cell)}</th>`).join('');
    const body = tableBuilderData.slice(1).map(row =>
      `<tr>${row.map(cell => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`
    ).join('');
    return `<table class="exam-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
  }

  function handleImageFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      creatorImageData = ev.target.result;
      renderCreatorImagePreview();
    };
    reader.readAsDataURL(file);
  }

  function renderCreatorImagePreview() {
    const prev = document.getElementById('creator-img-preview');
    if (!creatorImageData) {
      prev.innerHTML = '';
      return;
    }
    prev.innerHTML = `
      <div style="margin-top:0.6rem;">
        <img src="${creatorImageData}" alt="Vista previa del diagrama" style="max-height:220px; border-radius:8px; border:1px solid var(--border);">
        <div style="margin-top:0.35rem;">
          <button type="button" class="btn btn-danger btn-sm" id="btn-remove-img">Quitar diagrama/imagen</button>
        </div>
      </div>`;
  }

  function resetCreatorForm() {
    editingCustomId = null;
    document.getElementById('form-title-lbl').textContent = '➕ Agregar Nueva Pregunta al Banco';
    document.getElementById('btn-save-question').textContent = '💾 Guardar Pregunta';
    document.getElementById('btn-cancel-edit').style.display = 'none';
    document.getElementById('new-category').value = 'Mis Preguntas';
    document.getElementById('new-exam').value = 'Mis Ejercicios Personalizados';
    document.getElementById('new-type').value = 'single';
    document.getElementById('new-points').value = '10';
    document.getElementById('new-prompt').value = '';
    document.getElementById('new-code').value = '';
    document.getElementById('new-text-accepted').value = '';
    document.getElementById('new-explanation').value = '';
    creatorImageData = '';
    includeBuiltTable = false;
    document.getElementById('chk-include-table').checked = false;
    tableBuilderData = [
      ['Columna 1', 'Columna 2', 'Columna 3'],
      ['', '', '']
    ];
    renderCreatorImagePreview();
    renderTableBuilder();
    renderCreatorOptionInputs([
      { text: 'a) ', checked: true },
      { text: 'b) ', checked: false },
      { text: 'c) ', checked: false },
      { text: 'd) ', checked: false }
    ]);
    updateCreatorTypeVisibility();
  }

  function saveCustomQuestion(e) {
    e.preventDefault();
    const category = document.getElementById('new-category').value;
    const exam = document.getElementById('new-exam').value.trim() || 'Mis Ejercicios Personalizados';
    const type = document.getElementById('new-type').value;
    const points = Math.max(1, parseInt(document.getElementById('new-points').value, 10) || 10);
    const prompt = document.getElementById('new-prompt').value.trim();
    const codeText = document.getElementById('new-code').value;
    const explanation = document.getElementById('new-explanation').value.trim();

    if (!prompt) {
      alert('Por favor escribí el enunciado de la pregunta.');
      return;
    }

    const qObj = {
      id: editingCustomId || ('custom_' + Date.now()),
      category,
      exam,
      points,
      type,
      prompt,
      mediaHtml: buildHtmlFromTableBuilder(),
      tableRaw: includeBuiltTable ? JSON.parse(JSON.stringify(tableBuilderData)) : null,
      imageUrl: creatorImageData || '',
      codeText: codeText.trim() ? codeText : '',
      explanation
    };

    if (type === 'vf') {
      qObj.answer = document.querySelector('input[name="new_vf_ans"]:checked').value;
    } else if (type === 'single' || type === 'multi') {
      const rows = [...document.querySelectorAll('#creator-options-list .creator-opt-row')];
      const opts = [];
      const rightIdx = [];
      rows.forEach((r) => {
        const txt = r.querySelector('input[type="text"]').value.trim();
        const chk = r.querySelector('.opt-correct-selector').checked;
        if (txt) {
          if (chk) rightIdx.push(opts.length);
          opts.push(txt);
        }
      });
      if (opts.length < 2) {
        alert('Ingresá al menos 2 opciones con texto.');
        return;
      }
      if (rightIdx.length === 0) {
        alert('Marcá al menos una opción como correcta.');
        return;
      }
      qObj.options = opts;
      if (type === 'single') qObj.answer = rightIdx[0];
      else qObj.answers = rightIdx;
    } else if (type === 'text') {
      const rawAcc = document.getElementById('new-text-accepted').value;
      const acc = rawAcc.split('|').map(s => s.trim()).filter(Boolean);
      if (acc.length === 0) {
        alert('Ingresá al menos una respuesta válida.');
        return;
      }
      qObj.accepted = acc;
      qObj.displayAnswer = acc.join(' / ');
    }

    if (editingCustomId) {
      const idx = customQuestions.findIndex(item => item.id === editingCustomId);
      if (idx >= 0) customQuestions[idx] = qObj;
    } else {
      customQuestions.push(qObj);
    }

    saveJson(STORAGE_CUSTOM, customQuestions);
    populateFilters();
    resetCreatorForm();
    alert('✅ Pregunta guardada correctamente. Ya está disponible para practicar y mezclar.');
  }

  function editCustomQuestion(qId) {
    const q = customQuestions.find(item => item.id === qId);
    if (!q) return;
    editingCustomId = q.id;
    document.getElementById('form-title-lbl').textContent = '✏️ Editando Pregunta Personalizada';
    document.getElementById('btn-save-question').textContent = '💾 Actualizar Pregunta';
    document.getElementById('btn-cancel-edit').style.display = 'inline-flex';

    document.getElementById('new-category').value = q.category || 'Mis Preguntas';
    document.getElementById('new-exam').value = q.exam || '';
    document.getElementById('new-type').value = q.type;
    document.getElementById('new-points').value = q.points || 10;
    document.getElementById('new-prompt').value = q.prompt || '';
    document.getElementById('new-code').value = q.codeText || '';
    document.getElementById('new-explanation').value = q.explanation || '';

    creatorImageData = q.imageUrl || '';
    renderCreatorImagePreview();

    if (Array.isArray(q.tableRaw) && q.tableRaw.length > 0) {
      includeBuiltTable = true;
      tableBuilderData = JSON.parse(JSON.stringify(q.tableRaw));
      document.getElementById('chk-include-table').checked = true;
    } else {
      includeBuiltTable = false;
      document.getElementById('chk-include-table').checked = false;
    }
    renderTableBuilder();
    updateCreatorTypeVisibility();

    if (q.type === 'vf') {
      const r = document.querySelector(`input[name="new_vf_ans"][value="${q.answer}"]`);
      if (r) r.checked = true;
    } else if (q.type === 'single') {
      renderCreatorOptionInputs(q.options.map((t, i) => ({ text: t, checked: i === q.answer })));
    } else if (q.type === 'multi') {
      const s = new Set(q.answers || []);
      renderCreatorOptionInputs(q.options.map((t, i) => ({ text: t, checked: s.has(i) })));
    } else if (q.type === 'text') {
      document.getElementById('new-text-accepted').value = (q.accepted || []).join(' | ');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderCustomList() {
    const el = document.getElementById('custom-questions-list');
    if (customQuestions.length === 0) {
      el.innerHTML = `<p style="color:var(--text-muted); margin:0;">Todavía no agregaste preguntas propias. Usá el formulario de arriba para crear preguntas con texto, opciones, tablas o imágenes.</p>`;
      return;
    }
    el.innerHTML = customQuestions.map(q => `
      <div class="option-item" style="cursor:default; justify-content:space-between; align-items:center;">
        <div>
          <span class="q-badge custom">${escapeHtml(q.type.toUpperCase())}</span>
          <span class="q-badge">${escapeHtml(q.exam)}</span>
          <div style="margin-top:0.3rem; font-weight:600;">${escapeHtml(q.prompt)}</div>
        </div>
        <div class="btn-group">
          <button type="button" class="btn btn-sm" data-action="edit-custom" data-qid="${escapeHtml(q.id)}">Editar</button>
          <button type="button" class="btn btn-sm btn-danger" data-action="delete-custom" data-qid="${escapeHtml(q.id)}">Eliminar</button>
        </div>
      </div>`).join('');
  }

  // Exportar / Importar JSON
  function exportCustomBackup() {
    const payload = {
      exportedAt: new Date().toISOString(),
      customQuestions,
      wrongIds: [...wrongIds],
      examStats
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'backup_examenes_ssoo_utn.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  function importCustomBackup(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (Array.isArray(data.customQuestions)) {
          const existingIds = new Set(customQuestions.map(q => q.id));
          data.customQuestions.forEach(q => {
            if (!existingIds.has(q.id)) customQuestions.push(q);
          });
          saveJson(STORAGE_CUSTOM, customQuestions);
        }
        if (Array.isArray(data.wrongIds)) {
          data.wrongIds.forEach(id => wrongIds.add(id));
          saveJson(STORAGE_WRONG, [...wrongIds]);
        }
        populateFilters();
        startNewSession();
        alert('✅ Respaldo importado con éxito.');
      } catch (_) {
        alert('❌ El archivo seleccionado no es un JSON de respaldo válido.');
      }
    };
    reader.readAsText(file);
  }

  // =========================================================================
  // EVENTOS GLOBALES Y NAVEGACIÓN DE PESTAÑAS
  // =========================================================================
  function switchTab(tabId) {
    document.querySelectorAll('.tab-btn[data-tab]').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === tabId);
    });
    document.querySelectorAll('.view-section').forEach(sec => {
      sec.classList.toggle('active', sec.id === `view-${tabId}`);
    });
  }

  function initTheme() {
    const saved = localStorage.getItem(STORAGE_THEME) || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    document.getElementById('btn-theme').textContent = saved === 'dark' ? '☀️ Modo claro' : '🌙 Modo oscuro';
  }

  function bindEvents() {
    // Pestañas superiores
    document.querySelectorAll('.tab-btn[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // Tema claro / oscuro
    document.getElementById('btn-theme').addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', cur);
      localStorage.setItem(STORAGE_THEME, cur);
      document.getElementById('btn-theme').textContent = cur === 'dark' ? '☀️ Modo claro' : '🌙 Modo oscuro';
    });

    // Filtros de práctica
    document.getElementById('filter-category').addEventListener('change', () => {
      updateExamDropdown('ALL');
      startNewSession();
    });
    document.getElementById('filter-exam').addEventListener('change', () => startNewSession());
    document.getElementById('filter-limit').addEventListener('change', () => startNewSession());
    document.getElementById('chk-shuffle').addEventListener('change', () => startNewSession());
    document.getElementById('chk-single-view').addEventListener('change', (e) => {
      session.viewMode = e.target.checked ? 'single' : 'all';
      renderSession();
    });

    document.getElementById('btn-new-mix').addEventListener('click', () => startNewSession());
    document.getElementById('btn-reshuffle-now').addEventListener('click', () => reshuffleCurrentUnchecked());
    document.getElementById('btn-check-all').addEventListener('click', () => checkAllQuestions());

    document.getElementById('btn-prev-q').addEventListener('click', () => {
      if (session.currentIndex > 0) {
        session.currentIndex--;
        renderSession();
      }
    });
    document.getElementById('btn-next-q').addEventListener('click', () => {
      if (session.currentIndex < session.questions.length - 1) {
        session.currentIndex++;
        renderSession();
      }
    });

    // Delegación en contenedor de preguntas y puntos del stepper
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const action = btn.dataset.action;

      if (action === 'pick-vf') {
        const qId = btn.dataset.qid;
        if (session.checked[qId]) return;
        session.answers[qId] = btn.dataset.val;
        renderSession();
      } else if (action === 'check-one') {
        checkOneQuestion(btn.dataset.qid);
      } else if (action === 'retry-one') {
        delete session.checked[btn.dataset.qid];
        renderSession();
      } else if (action === 'goto-q') {
        session.currentIndex = Number(btn.dataset.idx);
        renderSession();
      } else if (action === 'launch-exam') {
        const ex = btn.dataset.exam;
        const shuf = btn.dataset.shuffle === '1';
        document.getElementById('filter-category').value = 'ALL';
        updateExamDropdown(ex);
        document.getElementById('filter-exam').value = ex;
        document.getElementById('filter-limit').value = 'ALL';
        document.getElementById('chk-shuffle').checked = shuf;
        switchTab('practicar');
        startNewSession();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (action === 'remove-mistake') {
        wrongIds.delete(btn.dataset.qid);
        saveJson(STORAGE_WRONG, [...wrongIds]);
        updateHeaderBadges();
        renderMistakesView();
      } else if (action === 'del-opt-row') {
        const idx = Number(btn.dataset.idx);
        const rows = [...document.querySelectorAll('#creator-options-list .creator-opt-row')].map(r => ({
          text: r.querySelector('input[type="text"]').value,
          checked: r.querySelector('.opt-correct-selector').checked
        }));
        rows.splice(idx, 1);
        if (!rows.some(r => r.checked) && rows.length > 0) rows[0].checked = true;
        renderCreatorOptionInputs(rows);
      } else if (action === 'edit-custom') {
        editCustomQuestion(btn.dataset.qid);
      } else if (action === 'delete-custom') {
        if (confirm('¿Seguro que querés eliminar esta pregunta personalizada?')) {
          customQuestions = customQuestions.filter(q => q.id !== btn.dataset.qid);
          saveJson(STORAGE_CUSTOM, customQuestions);
          populateFilters();
          startNewSession();
        }
      }
    });

    document.addEventListener('change', (e) => {
      const el = e.target;
      if (el.dataset.action === 'pick-single') {
        session.answers[el.dataset.qid] = Number(el.value);
        renderSession();
      } else if (el.dataset.action === 'pick-multi') {
        const qId = el.dataset.qid;
        const cur = new Set(Array.isArray(session.answers[qId]) ? session.answers[qId] : []);
        const val = Number(el.value);
        if (el.checked) cur.add(val);
        else cur.delete(val);
        session.answers[qId] = [...cur];
        renderSession();
      } else if (el.dataset.action === 'input-blank' && el.tagName === 'SELECT') {
        const qId = el.dataset.qid;
        const fidx = Number(el.dataset.fidx);
        const q = session.questions.find(item => item.id === qId);
        if (!Array.isArray(session.answers[qId])) {
          session.answers[qId] = q.fields.map(() => '');
        }
        session.answers[qId][fidx] = el.value;
        if (session.viewMode === 'single') renderStepperDots();
      }
    });

    document.addEventListener('input', (e) => {
      const el = e.target;
      if (el.dataset.action === 'input-text') {
        session.answers[el.dataset.qid] = el.value;
        if (session.viewMode === 'single') renderStepperDots();
      } else if (el.dataset.action === 'input-blank' && el.tagName === 'INPUT') {
        const qId = el.dataset.qid;
        const fidx = Number(el.dataset.fidx);
        const q = session.questions.find(item => item.id === qId);
        if (!Array.isArray(session.answers[qId])) {
          session.answers[qId] = q.fields.map(() => '');
        }
        session.answers[qId][fidx] = el.value;
        if (session.viewMode === 'single') renderStepperDots();
      } else if (el.dataset.tbR !== undefined) {
        const r = Number(el.dataset.tbR);
        const c = Number(el.dataset.tbC);
        tableBuilderData[r][c] = el.value;
      }
    });

    // Comprobar con Enter en inputs de texto
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && (e.target.dataset.action === 'input-text' || (e.target.dataset.action === 'input-blank' && e.target.tagName === 'INPUT'))) {
        e.preventDefault();
        checkOneQuestion(e.target.dataset.qid);
      }
    });

    // Eventos de pestaña Errores
    document.getElementById('mistakes-container').addEventListener('click', (e) => {
      if (e.target.id === 'btn-practice-mistakes') {
        const wrongPool = getAllQuestions().filter(q => wrongIds.has(q.id));
        switchTab('practicar');
        startNewSession(shuffleArray(wrongPool));
      } else if (e.target.id === 'btn-clear-mistakes') {
        if (confirm('¿Limpiar toda la lista de errores guardados?')) {
          wrongIds.clear();
          saveJson(STORAGE_WRONG, []);
          updateHeaderBadges();
          renderMistakesView();
        }
      }
    });

    // Eventos del Creador de preguntas
    document.getElementById('new-type').addEventListener('change', updateCreatorTypeVisibility);
    document.getElementById('btn-add-opt-row').addEventListener('click', () => {
      const rows = [...document.querySelectorAll('#creator-options-list .creator-opt-row')].map(r => ({
        text: r.querySelector('input[type="text"]').value,
        checked: r.querySelector('.opt-correct-selector').checked
      }));
      const nextLetter = String.fromCharCode(97 + rows.length);
      rows.push({ text: `${nextLetter}) `, checked: false });
      renderCreatorOptionInputs(rows);
    });

    document.getElementById('chk-include-table').addEventListener('change', (e) => {
      includeBuiltTable = e.target.checked;
      renderTableBuilder();
    });
    document.getElementById('btn-tb-add-row').addEventListener('click', () => {
      const cols = tableBuilderData[0]?.length || 2;
      tableBuilderData.push(Array(cols).fill(''));
      renderTableBuilder();
    });
    document.getElementById('btn-tb-del-row').addEventListener('click', () => {
      if (tableBuilderData.length > 2) {
        tableBuilderData.pop();
        renderTableBuilder();
      }
    });
    document.getElementById('btn-tb-add-col').addEventListener('click', () => {
      tableBuilderData.forEach((row, idx) => row.push(idx === 0 ? `Col ${row.length + 1}` : ''));
      renderTableBuilder();
    });
    document.getElementById('btn-tb-del-col').addEventListener('click', () => {
      if ((tableBuilderData[0]?.length || 0) > 1) {
        tableBuilderData.forEach(row => row.pop());
        renderTableBuilder();
      }
    });

    // Subir o pegar imagen / diagrama
    const fileImg = document.getElementById('input-img-file');
    const pasteZone = document.getElementById('paste-img-zone');
    pasteZone.addEventListener('click', () => fileImg.click());
    fileImg.addEventListener('change', (e) => {
      if (e.target.files?.[0]) handleImageFile(e.target.files[0]);
    });
    document.addEventListener('paste', (e) => {
      const addSectionActive = document.getElementById('view-agregar').classList.contains('active');
      if (!addSectionActive) return;
      const items = e.clipboardData?.items || [];
      for (const it of items) {
        if (it.type.startsWith('image/')) {
          handleImageFile(it.getAsFile());
          e.preventDefault();
          break;
        }
      }
    });
    document.getElementById('creator-img-preview').addEventListener('click', (e) => {
      if (e.target.id === 'btn-remove-img') {
        creatorImageData = '';
        fileImg.value = '';
        renderCreatorImagePreview();
      }
    });

    document.getElementById('creator-form').addEventListener('submit', saveCustomQuestion);
    document.getElementById('btn-cancel-edit').addEventListener('click', resetCreatorForm);

    document.getElementById('btn-export-json').addEventListener('click', exportCustomBackup);
    const importInput = document.getElementById('input-import-json');
    document.getElementById('btn-import-json').addEventListener('click', () => importInput.click());
    importInput.addEventListener('change', (e) => {
      if (e.target.files?.[0]) importCustomBackup(e.target.files[0]);
      importInput.value = '';
    });
  }

  // Arranque
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    populateFilters();
    resetCreatorForm();
    bindEvents();
    startNewSession();
  });
})();
