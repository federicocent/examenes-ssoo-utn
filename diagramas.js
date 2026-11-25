// Generadores de diagramas SVG, grillas de Gantt, tablas de páginas y bloques de código fieles a los exámenes de SSOO (UTN FRM)

window.DIAGRAMAS = (function () {
  // 1. Grafo de asignación de recursos (Integrador 03/10/2024 Ej 2 y Tema Práctico Act 9)
  // R1 (arriba-izq, 1 ejemplar): asignado a P1, solicitado por P2
  // R2 (abajo-izq, 2 ejemplares): 1 asignado a P2, 1 asignado a P3, solicitado por P1
  // R3 (arriba-der, 1 ejemplar): asignado a P3, solicitado por P2
  // R4 (abajo-der, 1 ejemplar libre): solicitado por P3 y por P4
  const SVG_GRAFO_BLOQUEADOS = `
    <div class="svg-box" aria-label="Grafo de asignación de recursos con procesos P1, P2, P3 y P4">
      <svg width="450" height="215" viewBox="0 0 450 215" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#111827"/>
          </marker>
        </defs>
        <!-- Recursos (rectángulos) -->
        <!-- R_top_left -->
        <rect x="65" y="15" width="34" height="32" fill="#fff" stroke="#111827" stroke-width="1.6"/>
        <circle cx="82" cy="31" r="3.8" fill="#111827"/>
        <!-- R_top_right -->
        <rect x="245" y="15" width="34" height="32" fill="#fff" stroke="#111827" stroke-width="1.6"/>
        <circle cx="262" cy="31" r="3.8" fill="#111827"/>
        <!-- R_bottom_left (2 ejemplares) -->
        <rect x="145" y="165" width="44" height="32" fill="#fff" stroke="#111827" stroke-width="1.6"/>
        <circle cx="158" cy="181" r="3.8" fill="#111827"/>
        <circle cx="176" cy="181" r="3.8" fill="#111827"/>
        <!-- R_bottom_right (1 ejemplar libre) -->
        <rect x="305" y="165" width="34" height="32" fill="#fff" stroke="#111827" stroke-width="1.6"/>
        <circle cx="322" cy="181" r="3.8" fill="#111827"/>

        <!-- Procesos (círculos) -->
        <circle cx="35" cy="105" r="18" fill="#fff" stroke="#111827" stroke-width="1.6"/>
        <text x="35" y="110" text-anchor="middle" font-size="13" font-weight="bold" fill="#111827">P1</text>

        <circle cx="145" cy="105" r="18" fill="#fff" stroke="#111827" stroke-width="1.6"/>
        <text x="145" y="110" text-anchor="middle" font-size="13" font-weight="bold" fill="#111827">P2</text>

        <circle cx="262" cy="105" r="18" fill="#fff" stroke="#111827" stroke-width="1.6"/>
        <text x="262" y="110" text-anchor="middle" font-size="13" font-weight="bold" fill="#111827">P3</text>

        <circle cx="385" cy="105" r="18" fill="#fff" stroke="#111827" stroke-width="1.6"/>
        <text x="385" y="110" text-anchor="middle" font-size="13" font-weight="bold" fill="#111827">P4</text>

        <!-- Flechas de asignación y solicitud -->
        <!-- Ejemplar R_top_left -> P1 -->
        <line x1="82" y1="31" x2="44" y2="89" stroke="#111827" stroke-width="1.5" marker-end="url(#arrow)"/>
        <!-- P2 -> R_top_left -->
        <line x1="133" y1="91" x2="99" y2="47" stroke="#111827" stroke-width="1.5" marker-end="url(#arrow)"/>
        <!-- P1 -> R_bottom_left -->
        <line x1="47" y1="119" x2="145" y2="177" stroke="#111827" stroke-width="1.5" marker-end="url(#arrow)"/>
        <!-- Ejemplar 1 R_bottom_left -> P2 -->
        <line x1="158" y1="181" x2="148" y2="123" stroke="#111827" stroke-width="1.5" marker-end="url(#arrow)"/>
        <!-- Ejemplar 2 R_bottom_left -> P3 -->
        <line x1="176" y1="181" x2="250" y2="118" stroke="#111827" stroke-width="1.5" marker-end="url(#arrow)"/>
        <!-- P2 -> R_top_right -->
        <line x1="160" y1="95" x2="245" y2="42" stroke="#111827" stroke-width="1.5" marker-end="url(#arrow)"/>
        <!-- Ejemplar R_top_right -> P3 -->
        <line x1="262" y1="31" x2="262" y2="87" stroke="#111827" stroke-width="1.5" marker-end="url(#arrow)"/>
        <!-- P3 -> R_bottom_right -->
        <line x1="273" y1="120" x2="309" y2="165" stroke="#111827" stroke-width="1.5" marker-end="url(#arrow)"/>
        <!-- P4 -> R_bottom_right -->
        <line x1="374" y1="120" x2="339" y2="168" stroke="#111827" stroke-width="1.5" marker-end="url(#arrow)"/>
      </svg>
    </div>`;

  // 2. Diagrama de Gantt + Tabla de procesos (Integrador 15/11/2024 T1, T2, T3 - Pregunta 5)
  function gantt15Nov2024() {
    const cols = Array.from({ length: 24 }, (_, i) => i);
    const active = {
      P4: [7, 8, 9, 10],
      P3: [4],
      P2: [2, 3, 5, 6],
      P1: [0, 1, 11, 12, 13, 14, 15]
    };
    const arrivals = { P4: 5, P3: 4, P2: 2, P1: 0 };
    const qRow1 = { 1:'P1', 2:'P1', 3:'P2', 4:'P2', 5:'P3', 6:'P2', 7:'P2', 8:'P4', 9:'P4', 10:'P4', 11:'P4', 12:'P1', 13:'P1', 14:'P1', 15:'P1', 16:'P1' };
    const qRow2 = { 3:'P1', 4:'P1', 5:'P2', 6:'P4', 7:'P4', 8:'P1', 9:'P1', 10:'P1', 11:'P1' };
    const qRow3 = { 5:'P1', 6:'P1', 7:'P1' };

    const renderProcRow = (p) => {
      const tds = cols.map((c) => {
        const isAct = active[p].includes(c);
        const isArr = arrivals[p] === c;
        return `<td class="${isAct ? 'gantt-cell-yellow' : ''}">${isArr ? 'X' : ''}</td>`;
      }).join('');
      return `<tr><td class="proc-lbl">${p}</td>${tds}</tr>`;
    };

    return `
      <div class="gantt-layout">
        <table class="exam-table" style="width:auto; min-width:210px;">
          <thead><tr><th>Proceso</th><th>Llegada</th><th>Duración</th></tr></thead>
          <tbody>
            <tr><td>P1</td><td>0</td><td>7</td></tr>
            <tr><td>P2</td><td>2</td><td>4</td></tr>
            <tr><td>P3</td><td>4</td><td>1</td></tr>
            <tr><td>P4</td><td>5</td><td>4</td></tr>
          </tbody>
        </table>
        <div>
          <table class="gantt-table">
            <tbody>
              ${['P4', 'P3', 'P2', 'P1'].map(renderProcRow).join('')}
              <tr><td class="proc-lbl">t</td>${cols.map(c => `<th>${c}</th>`).join('')}</tr>
              <tr class="gantt-queue-row"><td></td>${cols.map(c => `<td>${qRow1[c + 1] || ''}</td>`).join('')}</tr>
              <tr class="gantt-queue-row"><td></td>${cols.map(c => `<td>${qRow2[c + 1] || ''}</td>`).join('')}</tr>
              <tr class="gantt-queue-row"><td></td>${cols.map(c => `<td>${qRow3[c + 1] || ''}</td>`).join('')}</tr>
            </tbody>
          </table>
        </div>
      </div>`;
  }

  // 3. Tabla 1 de páginas (Integrador 15/11/2024 T1, T2, T3 - Pregunta 6)
  function tablaPaginas15Nov2024(marcoHeader) {
    return `
      <div class="exam-caption">Tabla 1</div>
      <table class="exam-table">
        <thead>
          <tr><th>Núm. Pág.</th><th>Referenciada</th><th>Modificada</th><th>Protección</th><th>${marcoHeader || 'Nro. Marco'}</th></tr>
        </thead>
        <tbody>
          <tr><td>15</td><td>0</td><td>0</td><td>110</td><td>9</td></tr>
          <tr><td>11</td><td>1</td><td>1</td><td>111</td><td>14</td></tr>
          <tr><td>7</td><td>1</td><td>0</td><td>111</td><td>7</td></tr>
          <tr><td>2</td><td>0</td><td>0</td><td>100</td><td>3</td></tr>
        </tbody>
      </table>`;
  }

  // 4. Diagrama de Gantt (Integrador 13/11/2025 Tema 2 - Actividad 2)
  function gantt13Nov2025T2() {
    const cols = Array.from({ length: 18 }, (_, i) => i);
    const active = { C: [9, 10, 11], B: [8], A: [0, 1, 2, 3, 4, 5, 6, 7] };
    const arrivals = { C: 1, B: 2, A: 0 };
    const row = (p) => `<tr><td class="proc-lbl">${p}</td>${cols.map(c => `<td class="${active[p].includes(c) ? 'gantt-cell-green' : ''}">${arrivals[p] === c ? 'X' : ''}</td>`).join('')}</tr>`;
    return `
      <table class="gantt-table">
        <tbody>
          ${['C', 'B', 'A'].map(row).join('')}
          <tr><td class="proc-lbl">t</td>${cols.map(c => `<th>${c}</th>`).join('')}</tr>
        </tbody>
      </table>`;
  }

  // 5. Tabla 1 NRU 7 filas (Integrador 13/11/2025 Tema 2 - Actividad 3)
  const TABLA_NRU_13_11_2025_T2 = `
    <div class="exam-caption">Tabla 1</div>
    <table class="exam-table">
      <thead>
        <tr><th>N° de página</th><th>Activada / deshabilitada</th><th>Referenciada</th><th>Modificada</th><th>Presente / ausente</th></tr>
      </thead>
      <tbody>
        <tr><td>1</td><td>1</td><td>0</td><td>1</td><td>1</td></tr>
        <tr><td>5</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
        <tr><td>7</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
        <tr><td>21</td><td>1</td><td>1</td><td>0</td><td>1</td></tr>
        <tr><td>53</td><td>0</td><td>1</td><td>1</td><td>0</td></tr>
        <tr><td>112</td><td>0</td><td>1</td><td>1</td><td>1</td></tr>
        <tr><td>400</td><td>1</td><td>0</td><td>1</td><td>1</td></tr>
      </tbody>
    </table>`;

  // 6. Cuadro 6 pasos llamada al sistema (Tema Práctico Act 3 y 1P 03/10/2024 Ej 3)
  const CUADRO_SYSCALL_6_PASOS = `
    <div class="syscall-grid">
      <div class="syscall-item"><span class="syscall-num">1</span><span>Se retorna al programa de usuario</span></div>
      <div class="syscall-item"><span class="syscall-num">2</span><span>Se selecciona el manejador de llamadas al sistema</span></div>
      <div class="syscall-item"><span class="syscall-num">3</span><span>Se guarda el buffer en la pila</span></div>
      <div class="syscall-item"><span class="syscall-num">4</span><span>El programa de usuario realiza una llamada al sistema</span></div>
      <div class="syscall-item"><span class="syscall-num">5</span><span>Se guarda el contador de programa</span></div>
      <div class="syscall-item"><span class="syscall-num">6</span><span>Se invoca un trap</span></div>
    </div>`;

  // 7. Código y cuadro de Hámsteres Felices (Integrador 03/10/2024 T2 Ej 5)
  const DIAGRAMA_HAMSTERS = `
    <div class="gantt-layout">
      <div class="code-box">module Hamsters_felices
  var
    semaphore: puedo_comer; {general}
               rueda; {binario}
  Process Padre:
    begin
      inicializa(puedo_comer=3);
      inicializa(rueda=1);
      cobegin
        Hamsters;
      coend;
    end;
  Process HamsterX:
    begin
      loop begin
        [ Paso 1 ]
        [ Paso 2 ]
        [ Paso 3 ]
        [ Paso 4 ]
        [ Paso 5 ]
        [ Paso 6 ]
      end;
    end;</div>
      <div>
        <div class="exam-caption">Instrucciones disponibles para completar (primero comer, luego correr en la rueda):</div>
        <table class="exam-table">
          <tbody>
            <tr><td><code>montar_en_rueda();</code></td><td><code>wait(rueda);</code></td><td><code>signal(rueda);</code></td></tr>
            <tr><td><code>rueda(no puedo comer);</code></td><td><code>comer();</code></td><td><code>signal(puedo_comer);</code></td></tr>
            <tr><td><code>wait (puedo_comer);</code></td><td><code>wait();</code></td><td><code>down(rueda_comer);</code></td></tr>
          </tbody>
        </table>
      </div>
    </div>`;

  // 8. Tabla 3 Global Práctica 19/11/2026 T1 y T2 Ej 4
  const TABLA_RR_19_11_2026 = `
    <div class="exam-caption">Tabla 3</div>
    <table class="exam-table" style="max-width:440px;">
      <thead><tr><th>PROCESO</th><th>Instante de llegada</th><th>Tiempo de ejecución</th></tr></thead>
      <tbody>
        <tr><td>A</td><td>0</td><td>6</td></tr>
        <tr><td>B</td><td>2</td><td>5</td></tr>
        <tr><td>C</td><td>4</td><td>3</td></tr>
        <tr><td>D</td><td>5</td><td>4</td></tr>
        <tr><td>E</td><td>3</td><td>7</td></tr>
      </tbody>
    </table>`;

  // 9. Assembler 2º Parcial 29/10/2025 T2 Ej 1
  const ASM_29_10_2025 = `
    <div class="code-box">.MODEL TINY
.CODE
org 100
; ------------------------------------
; Procedimiento principal:
; ------------------------------------
MAIN   PROC   NEAR
       .STARTUP
       MOV DX, 3FBH
       MOV AL, 80H
       OUT DX, AL
       MOV DX, 3F8H
       MOV AL, 60H
       OUT DX, AL
       MOV DX, 3F9H
       MOV AL, 00H
       OUT DX, AL
       MOV DX, 3FBH
       MOV AL, 0AH</div>`;

  // 10. Tabla 1 de páginas (2º Parcial 29/10/2025 T2 Ej 3)
  const TABLA_PAGINAS_29_10_2025 = `
    <div class="exam-caption">Tabla 1</div>
    <table class="exam-table">
      <thead>
        <tr><th>Nro página</th><th>Uso caché deshabilitado</th><th>Referenciada</th><th>Modificada</th><th>Presente / ausente</th><th>Nro marco de pág</th></tr>
      </thead>
      <tbody>
        <tr><td>1</td><td>1</td><td>0</td><td>1</td><td>1</td><td>2A74</td></tr>
        <tr><td>5</td><td>1</td><td>1</td><td>1</td><td>1</td><td>5A14</td></tr>
        <tr><td>7</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0024</td></tr>
        <tr><td>53</td><td>1</td><td>0</td><td>0</td><td>1</td><td>13B9</td></tr>
        <tr><td>89</td><td>0</td><td>1</td><td>0</td><td>1</td><td>107B</td></tr>
        <tr><td>1A</td><td>0</td><td>1</td><td>1</td><td>0</td><td>542A</td></tr>
      </tbody>
    </table>`;

  // 11. Assembler 3 columnas Recuperatorio 31/10/2024 T1 Ej 1
  const ASM_RECUP_31_10_2024 = `
    <div class="asm-cols">
      <div class="code-box">MAIN: MOV DX, 3EBH
      MOV AL, 80H
      OUT DX, AL
      MOV DX, 3E8H
      MOV AL, 80H
      OUT DX, AL
      MOV DX, 3E9H
      MOV AL, 01H
      OUT DX, AL
      MOV DX, 3EBH
      MOV AL, 0BH
      OUT DX, AL
      MOV DX, 3ECH
      MOV AL, 13H
      OUT DX, AL
      MOV DX, 3E9H
      MOV AL, 00H
      OUT DX, AL</div>
      <div class="code-box">PORSIEMPRE:
      MOV  DX, 3EDH
      IN   AL, DX
      TEST AL, 10H
      JNZ  ERROR
      TEST AL, 01H
      JNZ  RECIBIR
      TEST AL, 20H
      JZ   PORSIEMPRE
      MOV  AH, 0
      INT  16H
      JZ   PORSIEMPRE
      MOV  AH, 0
      INT  16H
      CMP  AH, 01
      JZ   FIN
      MOV  DX, 3E8H
      OUT  DX, AL
      JMP  PORSIEMPRE</div>
      <div class="code-box">RECIBIR:
      MOV  DX, 3E8H
      IN   AL, DX
      AND  AL, 3FH
      PUSH AX
      MOV  BX, 0
      MOV  AH, 0EH
      INT  10H
      POP  AX
      CMP  AL, 0DH
      JNZ  PORSIEMPRE
      MOV  AL, 0AH
      MOV  BX, 00
      MOV  AH, 0EH
      INT  10H
      JMP  PORSIEMPRE

ERROR: MOV DX, 3F8H
       IN  AL, DX
       MOV AL, 0A8H
       MOV BX, 0
       MOV AH, 0EH
       INT 10H
       JMP PORSIEMPRE

FIN:   .EXIT</div>
    </div>`;

  // 12. Tabla 1 Recuperatorio 31/10/2024 Ej 2
  const TABLA_PAGINAS_RECUP_31_10_2024 = `
    <div class="exam-caption">Tabla 1</div>
    <table class="exam-table">
      <thead>
        <tr><th>N° de página (Decimal)</th><th>Referenciada</th><th>Modificada</th><th>Presente / ausente</th><th>N° de marco de página (Hexa)</th></tr>
      </thead>
      <tbody>
        <tr><td>1</td><td>1</td><td>0</td><td>1</td><td>10A4</td></tr>
        <tr><td>4</td><td>1</td><td>1</td><td>0</td><td>542A</td></tr>
        <tr><td>6</td><td>1</td><td>0</td><td>1</td><td>107D</td></tr>
        <tr><td>9</td><td>1</td><td>0</td><td>1</td><td>13B9</td></tr>
        <tr><td>17</td><td>1</td><td>0</td><td>1</td><td>10B9</td></tr>
        <tr><td>18</td><td>1</td><td>1</td><td>1</td><td>107E</td></tr>
        <tr><td>21</td><td>1</td><td>0</td><td>0</td><td>7935</td></tr>
      </tbody>
    </table>`;

  // 13. Tabla LRU Recuperatorio 31/10/2024 Ej 3
  const TABLA_LRU_RECUP_31_10_2024 = `
    <table class="exam-table" style="max-width:460px;">
      <thead>
        <tr><th>Página</th><th>Cargada</th><th>Última referencia</th><th>R</th><th>M</th></tr>
      </thead>
      <tbody>
        <tr><td>0</td><td>126</td><td>280</td><td>1</td><td>0</td></tr>
        <tr><td>1</td><td>230</td><td>265</td><td>0</td><td>1</td></tr>
        <tr><td>2</td><td>140</td><td>270</td><td>0</td><td>0</td></tr>
        <tr><td>3</td><td>110</td><td>285</td><td>1</td><td>1</td></tr>
      </tbody>
    </table>`;

  // 14. Tabla de páginas 2º Examen 25/10/2024 T1 y T2 Ej 4
  const TABLA_PAGINAS_25_10_2024 = `
    <table class="exam-table" style="max-width:520px;">
      <thead>
        <tr><th>Página virtual</th><th>Marco de página</th><th>Referenciada</th><th>Modificada</th><th>Presente / Ausente</th></tr>
      </thead>
      <tbody>
        <tr><td>0x000</td><td>0xABC</td><td>1</td><td>0</td><td>1</td></tr>
        <tr><td>0x001</td><td>0xFFD</td><td>1</td><td>1</td><td>1</td></tr>
        <tr><td>0x002</td><td>0x123</td><td>0</td><td>0</td><td>0</td></tr>
        <tr><td>0x003</td><td>0x45A</td><td>1</td><td>0</td><td>1</td></tr>
        <tr><td>0x004</td><td>0x789</td><td>0</td><td>1</td><td>1</td></tr>
      </tbody>
    </table>`;

  // 15. Bloques C de Semáforos (1º Parcial)
  const CODIGO_LECTOR_1P = `
    <div class="gantt-layout">
      <div class="code-box">typedef int semaforo;
semaforo mutex = 1;
semaforo bd = 1;
int cl = 0;

void lector(void)
{
  while (TRUE) {
    /* Línea 1 */ ................
    cl = cl + 1;
    if (cl == 1) down(&bd);
    /* Línea 2 */ ................
    leer_base_de_datos();
    /* Línea 3 */ ................
    cl = cl - 1;
    if (cl == 0) up(&bd);
    /* Línea 4 */ ................
    usar_lectura_datos();
  }
}</div>
      <table class="exam-table left-align" style="max-width:260px;">
        <thead><tr><th>N°</th><th>Opción</th></tr></thead>
        <tbody>
          <tr><td>1</td><td><code>down(&vacias)</code></td></tr>
          <tr><td>2</td><td><code>down(&llenas)</code></td></tr>
          <tr><td>3</td><td><code>down(&mutex)</code></td></tr>
          <tr><td>4</td><td><code>up(&vacias)</code></td></tr>
          <tr><td>5</td><td><code>up(&llenas)</code></td></tr>
          <tr><td>6</td><td><code>up(&mutex)</code></td></tr>
        </tbody>
      </table>
    </div>`;

  const CODIGO_CONSUMIDOR_1P = `
    <div class="gantt-layout">
      <div class="code-box">#define N 10
typedef int semaforo;
semaforo mutex = 1;
semaforo vacias = N;
semaforo llenas = 0;

void consumidor(void)
{
  int elemento;
  while (TRUE) {
    /* Línea 1 */ ................
    /* Línea 2 */ ................
    elemento = quitar_elemento();
    /* Línea 3 */ ................
    /* Línea 4 */ ................
    consumir_elemento(elemento);
  }
}</div>
      <table class="exam-table left-align" style="max-width:260px;">
        <thead><tr><th>N°</th><th>Opción</th></tr></thead>
        <tbody>
          <tr><td>1 / a</td><td><code>down(&vacias)</code></td></tr>
          <tr><td>2 / b</td><td><code>down(&llenas)</code></td></tr>
          <tr><td>3 / c</td><td><code>down(&mutex)</code></td></tr>
          <tr><td>4 / d</td><td><code>up(&vacias)</code></td></tr>
          <tr><td>5 / e</td><td><code>up(&llenas)</code></td></tr>
          <tr><td>6 / f</td><td><code>up(&mutex)</code></td></tr>
        </tbody>
      </table>
    </div>`;

  const CODIGO_PRODUCTOR_1P = `
    <div class="gantt-layout">
      <div class="code-box">#define N 10
typedef int semaforo;
semaforo mutex = 1;
semaforo vacias = N;
semaforo llenas = 0;

void Productor(void)
{
  int elemento;
  while (TRUE) {
    elemento = producir_elemento();
    /* Línea 1 */ ................
    /* Línea 2 */ ................
    insertar_elemento(elemento);
    /* Línea 3 */ ................
    /* Línea 4 */ ................
  }
}</div>
      <table class="exam-table left-align" style="max-width:260px;">
        <thead><tr><th>Letra</th><th>Opción</th></tr></thead>
        <tbody>
          <tr><td>a</td><td><code>down(&vacias)</code></td></tr>
          <tr><td>b</td><td><code>down(&llenas)</code></td></tr>
          <tr><td>c</td><td><code>down(&mutex)</code></td></tr>
          <tr><td>d</td><td><code>up(&vacias)</code></td></tr>
          <tr><td>e</td><td><code>up(&llenas)</code></td></tr>
          <tr><td>f</td><td><code>up(&mutex)</code></td></tr>
        </tbody>
      </table>
    </div>`;

  const CODIGO_PROD_CONS_MUTEX0 = `
    <div class="asm-cols">
      <div class="code-box">#define N 10
typedef int semaforo;
semaforo mutex = 0;
semaforo vacias = 0;
semaforo llenas = N;

void productor(void) {
  int elemento;
  while (TRUE) {
    elemento = producir_elemento();
    down(&vacias);
    down(&mutex);
    insertar_elemento(elemento);
    up(&mutex);
    up(&llenas);
  }
}</div>
      <div class="code-box">void consumidor(void) {
  int elemento;
  while (TRUE) {
    down(&llenas);
    down(&mutex);
    elemento = quitar_elemento();
    up(&mutex);
    up(&vacias);
    consumir_elemento();
  }
}</div>
    </div>`;

  // 16. Tablas de Recuperatorio 1P 31/10/2024 y 1P Práctica 22/10/2026
  const TABLA_RECUP_1P_RR = `
    <table class="exam-table" style="max-width:420px;">
      <thead><tr><th>Proceso</th><th>Tiempo llegada</th><th>Tiempo ejecución</th></tr></thead>
      <tbody>
        <tr><td>P1</td><td>0</td><td>8</td></tr>
        <tr><td>P2</td><td>1</td><td>4</td></tr>
        <tr><td>P3</td><td>2</td><td>9</td></tr>
        <tr><td>P4</td><td>3</td><td>5</td></tr>
      </tbody>
    </table>`;

  const TABLA_RECUP_1P_SRNT = `
    <table class="exam-table" style="max-width:420px;">
      <thead><tr><th>Proceso</th><th>Tiempo de llegada</th><th>Tiempo de ejecución</th></tr></thead>
      <tbody>
        <tr><td>A</td><td>0 ms</td><td>10 ms</td></tr>
        <tr><td>B</td><td>1 ms</td><td>2 ms</td></tr>
        <tr><td>C</td><td>2 ms</td><td>3 ms</td></tr>
        <tr><td>D</td><td>3 ms</td><td>1 ms</td></tr>
      </tbody>
    </table>`;

  const TABLA_NRU_22_10_2026 = `
    <div class="exam-caption">Tabla 1</div>
    <table class="exam-table">
      <thead>
        <tr><th>N.º pág.</th><th>Uso caché</th><th>Referenciada</th><th>Modificada</th><th>Presente</th></tr>
      </thead>
      <tbody>
        <tr><td>3</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
        <tr><td>9</td><td>1</td><td>0</td><td>1</td><td>1</td></tr>
        <tr><td>16</td><td>0</td><td>0</td><td>0</td><td>1</td></tr>
        <tr><td>24</td><td>1</td><td>0</td><td>0</td><td>1</td></tr>
        <tr><td>38</td><td>0</td><td>1</td><td>0</td><td>1</td></tr>
        <tr><td>72</td><td>1</td><td>1</td><td>0</td><td>1</td></tr>
        <tr><td>150</td><td>0</td><td>0</td><td>1</td><td>1</td></tr>
      </tbody>
    </table>`;

  const TABLA_MARCOS_22_10_2026 = `
    <div class="exam-caption">Tabla 1</div>
    <table class="exam-table">
      <thead>
        <tr><th>N.º pág.</th><th>Caché</th><th>Referenc.</th><th>Modif.</th><th>Pres.</th><th>Marco</th></tr>
      </thead>
      <tbody>
        <tr><td>1</td><td>1</td><td>0</td><td>1</td><td>1</td><td>2A74</td></tr>
        <tr><td>5</td><td>1</td><td>1</td><td>1</td><td>1</td><td>5A14</td></tr>
        <tr><td>7</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0024</td></tr>
        <tr><td>53</td><td>1</td><td>0</td><td>0</td><td>1</td><td>13B9</td></tr>
        <tr><td>89</td><td>0</td><td>1</td><td>0</td><td>0</td><td>107E</td></tr>
        <tr><td>112</td><td>0</td><td>1</td><td>1</td><td>0</td><td>542A</td></tr>
        <tr><td>400</td><td>1</td><td>0</td><td>1</td><td>1</td><td>7935</td></tr>
      </tbody>
    </table>`;

  // 17. Tabla + 2 Diagramas de Gantt de 1P 26/08/2023 T2 Ej 1
  // Con F1(p2, lleg 0, CPU 4, E/S 2, CPU 4), F2(p1, lleg 2, CPU 3, E/S 3, CPU 5), F3(p0, lleg 1, CPU 2), F4(p4, lleg 4, CPU 2, E/S 2, CPU 2)
  // Diagrama 1: SJF (no apropiativo): F1[0..4], F3[4..6], F4[6..8], F2[8..11], F4[11..13], F1[13..17], F2[17..22]
  // Diagrama 2: FCFS / FIFO (orden de llegada a cola de listos): F1[0..4], F3[4..6], F2[6..9], F4[9..11], F1[11..15], F2[15..20], F4[20..22]
  function diagramas26Ago2023() {
    const cols = Array.from({ length: 22 }, (_, i) => i);
    const d1 = {
      F1: [0,1,2,3, 13,14,15,16],
      F2: [8,9,10, 17,18,19,20,21],
      F3: [4,5],
      F4: [6,7, 11,12]
    };
    const d2 = {
      F1: [0,1,2,3, 11,12,13,14],
      F2: [6,7,8, 15,16,17,18,19],
      F3: [4,5],
      F4: [9,10, 20,21]
    };
    const renderG = (title, map) => `
      <div style="margin-top:0.65rem;">
        <div class="exam-caption">${title}</div>
        <table class="gantt-table">
          <tbody>
            <tr><td class="proc-lbl">t</td>${cols.map(c => `<th>${c}</th>`).join('')}</tr>
            ${['F1','F2','F3','F4'].map(p => `<tr><td class="proc-lbl">${p}</td>${cols.map(c => `<td class="${map[p].includes(c) ? 'gantt-cell-blue' : ''}"></td>`).join('')}</tr>`).join('')}
          </tbody>
        </table>
      </div>`;

    return `
      <div>
        <div class="exam-caption">Tabla 1: Carga de trabajo</div>
        <table class="exam-table" style="max-width:460px;">
          <thead><tr><th>Proceso</th><th>Prioridad</th><th>Llegada</th><th>CPU</th><th>E/S</th><th>CPU</th></tr></thead>
          <tbody>
            <tr><td>F1</td><td>2</td><td>0</td><td>4</td><td>2</td><td>4</td></tr>
            <tr><td>F2</td><td>1</td><td>2</td><td>3</td><td>3</td><td>5</td></tr>
            <tr><td>F3</td><td>0</td><td>1</td><td>2</td><td>-</td><td>-</td></tr>
            <tr><td>F4</td><td>4</td><td>4</td><td>2</td><td>2</td><td>2</td></tr>
          </tbody>
        </table>
        ${renderG('Diagrama 1 (selección por ráfaga de CPU más corta sin desalojo):', d1)}
        ${renderG('Diagrama 2 (selección por orden de entrada a la cola de listos sin desalojo):', d2)}
      </div>`;
  }

  return {
    SVG_GRAFO_BLOQUEADOS,
    GANTT_15_11_2024: gantt15Nov2024(),
    TABLA_PAG_15_11_2024_T1: tablaPaginas15Nov2024('Núm.'),
    TABLA_PAG_15_11_2024_T2: tablaPaginas15Nov2024('Nro Marco'),
    TABLA_PAG_15_11_2024_T3: tablaPaginas15Nov2024('Nro.'),
    GANTT_13_11_2025_T2: gantt13Nov2025T2(),
    TABLA_NRU_13_11_2025_T2,
    CUADRO_SYSCALL_6_PASOS,
    DIAGRAMA_HAMSTERS,
    TABLA_RR_19_11_2026,
    ASM_29_10_2025,
    TABLA_PAGINAS_29_10_2025,
    ASM_RECUP_31_10_2024,
    TABLA_PAGINAS_RECUP_31_10_2024,
    TABLA_LRU_RECUP_31_10_2024,
    TABLA_PAGINAS_25_10_2024,
    CODIGO_LECTOR_1P,
    CODIGO_CONSUMIDOR_1P,
    CODIGO_PRODUCTOR_1P,
    CODIGO_PROD_CONS_MUTEX0,
    TABLA_RECUP_1P_RR,
    TABLA_RECUP_1P_SRNT,
    TABLA_NRU_22_10_2026,
    TABLA_MARCOS_22_10_2026,
    DIAGRAMAS_GANTT_26_08_2023: diagramas26Ago2023()
  };
})();
