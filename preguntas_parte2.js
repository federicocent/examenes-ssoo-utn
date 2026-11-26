// Parte 2 del Banco de Preguntas: 1º Parcial Práctica (Solo ejercicios prácticos)
window.BANCO_PREGUNTAS = window.BANCO_PREGUNTAS || [];

(function () {
  const D = window.DIAGRAMAS;
  const P2 = [
    // =========================================================================
    // 16. 1º PARCIAL 18/09/2025 - TEMA 1
    // =========================================================================
    {
      id: 'p1_180925_t1_1',
      category: '1º Parcial Práctica',
      exam: '1º Parcial 18/09/2025 - Tema 1',
      points: 20,
      type: 'text',
      prompt: 'Ejercicio 1: ¿Cuál es la secuencia completa de ejecución para el siguiente conjunto de procesos? Aplique Round Robin con q = 2.\nInstante de llegada: iA=0, iB=2, iC=3, iD=5\nTiempo de ejecución: tA=6, tB=5, tC=3, tD=4',
      placeholder: 'Ej: AABBAACCBBDDAACBDD',
      accepted: ['aabbaaccbbddaacbdd', 'aaaabbaaccbbddcbdd'],
      displayAnswer: 'AABBAACCBBDDAACBDD (o AAAABBAACCBBDDCBDD si el saliente se encola antes)',
      explanation: 'Con q=2 (encolando llegada en t=2 antes del saliente): A(0..2), B(2..4, llega C en 3), A(4..6, llega D en 5), C(6..8), B(8..10), D(10..12), A(12..14 fin), C(14..15 fin), B(15..16 fin), D(16..18 fin) → AABBAACCBBDDAACBDD. (Se aceptan ambas convenciones de desempate).'
    },
    {
      id: 'p1_180925_t1_4',
      category: '1º Parcial Práctica',
      exam: '1º Parcial 18/09/2025 - Tema 1',
      points: 20,
      type: 'text',
      prompt: 'Ejercicio 4: Aplique planificador SJF (no apropiativo) y complete con la secuencia de ejecución.\nInstante de llegada: iA=0, iB=2, iC=3, iD=5; Tiempo de ejecución: tA=6, tB=5, tC=3, tD=4:',
      placeholder: 'Ej: AAAAAACCCDDDDDBBBBB',
      accepted: ['aaaaaacccddddbbbbb'],
      displayAnswer: 'AAAAAACCCDDDDBBBBB',
      explanation: 'En t=0 solo está A y ejecuta sin desalojo hasta t=6 (AAAAAA). En t=6 ya llegaron B(5), C(3) y D(4): SJF ordena por menor duración → C(3: CCC), luego D(4: DDDD) y finalmente B(5: BBBBB) → AAAAAACCCDDDDBBBBB.'
    },
    {
      id: 'p1_180925_t1_5',
      category: '1º Parcial Práctica',
      exam: '1º Parcial 18/09/2025 - Tema 1',
      points: 20,
      type: 'blanks',
      prompt: 'Ejercicio 5: Teniendo en cuenta el código de lectores y escritores, complete las 4 líneas punteadas colocando el número de opción correspondiente (1..6):',
      mediaHtml: D.CODIGO_LECTOR_1P,
      fields: [
        { label: 'Línea 1 (antes de cl = cl + 1)', options: ['1', '2', '3', '4', '5', '6'], accepted: ['3', 'down(&mutex)', 'down (&mutex)'], displayAnswer: '3 — down(&mutex)' },
        { label: 'Línea 2 (antes de leer_base_de_datos)', options: ['1', '2', '3', '4', '5', '6'], accepted: ['6', 'up(&mutex)', 'up (&mutex)'], displayAnswer: '6 — up(&mutex)' },
        { label: 'Línea 3 (antes de cl = cl - 1)', options: ['1', '2', '3', '4', '5', '6'], accepted: ['3', 'down(&mutex)', 'down (&mutex)'], displayAnswer: '3 — down(&mutex)' },
        { label: 'Línea 4 (antes de usar_lectura_datos)', options: ['1', '2', '3', '4', '5', '6'], accepted: ['6', 'up(&mutex)', 'up (&mutex)'], displayAnswer: '6 — up(&mutex)' }
      ],
      explanation: 'El contador `cl` de lectores activos es una variable compartida y debe protegerse con `down(&mutex)` (3) al entrar y `up(&mutex)` (6) al salir tanto al incrementar como al decrementar `cl`.'
    },
    {
      id: 'p1_180925_t1_6',
      category: '1º Parcial Práctica',
      exam: '1º Parcial 18/09/2025 - Tema 1',
      points: 20,
      type: 'blanks',
      prompt: 'Ejercicio 6: Instantes de llegada: A=0, B=1, C=2, D=3, E=4. Tiempos de ejecución: tA=7, tB=2, tC=4, tD=5, tE=3. Prioridades: PA=3, PB=1, PC=4, PD=2, PE=5. Considerando Prioridad NO apropiativa (menor valor = mayor prioridad), indique en qué instante terminan C y E:',
      fields: [
        { label: 'C termina en ->', placeholder: 'Ej: t=18 (o 18)', accepted: ['18', 't=18', 't = 18', 'en t=18'], displayAnswer: 't = 18' },
        { label: 'E termina en ->', placeholder: 'Ej: t=21 (o 21)', accepted: ['21', 't=21', 't = 21', 'en t=21'], displayAnswer: 't = 21' }
      ],
      explanation: 'A inicia en t=0 y no es expropiado: A(0..7). En t=7 están todos listos; orden por prioridad (PB=1, PD=2, PC=4, PE=5): B ejecuta 7..9, D ejecuta 9..14, C ejecuta 14..18 (termina en t=18) y E ejecuta 18..21 (termina en t=21).'
    },
    {
      id: 'p1_180925_t1_7',
      category: '1º Parcial Práctica',
      exam: '1º Parcial 18/09/2025 - Tema 1',
      points: 5,
      type: 'vf',
      prompt: 'Ejercicio 7: Hay tres procesos (P1, P2, P3) y tres recursos: R1 (1 ejemplar), R2 (2 ejemplares) y R3 (1 ejemplar). P1 solicita R1 (que posee P2). P2 solicita R2 y P3 tiene asignado un ejemplar de R2. Luego P3 solicita R3 (que tiene P1). ¿Hay un ciclo con interbloqueo?',
      answer: 'F',
      explanation: 'Falso. Aunque existe el ciclo P1→R1→P2→R2→P3→R3→P1, el recurso R2 tiene DOS ejemplares y solo uno está asignado a P3. El segundo ejemplar de R2 está libre, por lo que P2 lo obtiene, termina, libera R1 para P1, quien termina y libera R3 para P3. ¡No hay interbloqueo!'
    },

    // =========================================================================
    // 17. 1º PARCIAL 18/09/2025 - TEMA 2
    // =========================================================================
    {
      id: 'p1_180925_t2_1',
      category: '1º Parcial Práctica',
      exam: '1º Parcial 18/09/2025 - Tema 2',
      points: 20,
      type: 'text',
      prompt: 'Ejercicio 1: Aplique Round Robin con q = 2 teniendo en cuenta que el proceso que llega se coloca antes que el que sale de ejecución en la cola de Listos.\nInstante de llegada: iA=0, iB=2, iC=3, iD=5; Tiempo de ejecución: tA=6, tB=5, tC=3, tD=4:',
      placeholder: 'Ej: AABBAACCBBDDAACBDD',
      accepted: ['aabbaaccbbddaacbdd'],
      displayAnswer: 'AABBAACCBBDDAACBDD',
      explanation: 't=0..2: AA (llega B antes que A → [B,A]). t=2..4: BB (llega C en 3 → [A,C,B]). t=4..6: AA (llega D en 5 → [C,B,D,A]). t=6..8: CC ([B,D,A,C]). t=8..10: BB ([D,A,C,B]). t=10..12: DD ([A,C,B,D]). t=12..14: AA(fin). t=14..15: C(fin). t=15..16: B(fin). t=16..18: DD(fin) → AABBAACCBBDDAACBDD.'
    },
    {
      id: 'p1_180925_t2_4',
      category: '1º Parcial Práctica',
      exam: '1º Parcial 18/09/2025 - Tema 2',
      points: 20,
      type: 'blanks',
      prompt: 'Ejercicio 4: Dado el problema del productor y el consumidor, complete el código del consumidor seleccionando el número correspondiente (1..6):',
      mediaHtml: D.CODIGO_CONSUMIDOR_1P,
      fields: [
        { label: 'Línea 1 (esperar ítem lleno)', options: ['1', '2', '3', '4', '5', '6'], accepted: ['2', 'b', 'down(&llenas)'], displayAnswer: '2 — down(&llenas)' },
        { label: 'Línea 2 (entrar región crítica)', options: ['1', '2', '3', '4', '5', '6'], accepted: ['3', 'c', 'down(&mutex)'], displayAnswer: '3 — down(&mutex)' },
        { label: 'Línea 3 (salir región crítica)', options: ['1', '2', '3', '4', '5', '6'], accepted: ['6', 'f', 'up(&mutex)'], displayAnswer: '6 — up(&mutex)' },
        { label: 'Línea 4 (incrementar ranura vacía)', options: ['1', '2', '3', '4', '5', '6'], accepted: ['4', 'd', 'up(&vacias)'], displayAnswer: '4 — up(&vacias)' }
      ],
      explanation: 'El consumidor primero hace `down(&llenas)` (¡si hiciera `down(&mutex)` primero provocaría interbloqueo con buffer vacío!), luego `down(&mutex)`, extrae el elemento, libera `up(&mutex)` y avisa una ranura libre con `up(&vacias)`.'
    },
    {
      id: 'p1_180925_t2_6',
      category: '1º Parcial Práctica',
      exam: '1º Parcial 18/09/2025 - Tema 2',
      points: 20,
      type: 'blanks',
      prompt: 'Ejercicio 6: Instantes de llegada: A=0, B=1, C=2, D=3, E=4. Tiempos: tA=7, tB=2, tC=4, tD=5, tE=3. Prioridades: PA=3, PB=1, PC=4, PD=2, PE=5 (menor valor = mayor prioridad). Con Prioridad APROPIATIVA, indique cómo está la cola de Listos en t=5 y en t=2:',
      fields: [
        { label: 'Cola en t5 ->', placeholder: 'Ej: A, C, E', accepted: ['a, c, e', 'ace', 'a c e', 'a-c-e'], displayAnswer: 'A, C, E' },
        { label: 'Cola en t2 ->', placeholder: 'Ej: A, C', accepted: ['a, c', 'ac', 'a c', 'a-c'], displayAnswer: 'A, C' }
      ],
      explanation: 't=0..1 ejecuta A(rem 6). En t=1 llega B(p1 < p3) y expropia a A. En t=2 B sigue ejecutando y llega C(p4) → Cola de listos en t=2: [A, C]. En t=3 B termina y llega D(p2 < p3), que entra a ejecutar de 3..8; en t=4 llega E(p5) → Cola de listos en t=5 (mientras ejecuta D): [A, C, E].'
    },
    {
      id: 'p1_180925_t2_7',
      category: '1º Parcial Práctica',
      exam: '1º Parcial 18/09/2025 - Tema 2',
      points: 5,
      type: 'vf',
      prompt: 'Ejercicio 7: Hay tres procesos (P1, P2, P3) y tres recursos: R1 (1 ejemplar), R2 (1 ejemplar) y R3 (1 ejemplar). P1 solicita R1 que posee P2, P2 solicita R2 que tiene P3 y P3 solicita R3 que tiene P1. ¿Hay un ciclo con interbloqueo?',
      answer: 'V',
      explanation: 'Verdadero. Cuando cada tipo de recurso tiene un único ejemplar, la existencia de un ciclo en el grafo de asignación de recursos (P1→R1→P2→R2→P3→R3→P1) es condición necesaria y suficiente de interbloqueo.'
    },

    // =========================================================================
    // 18. 1º PARCIAL 03/10/2024 - TEMA 1
    // =========================================================================
    {
      id: 'p1_031024_t1_1',
      category: '1º Parcial Práctica',
      exam: '1º Parcial 03/10/2024 - Tema 1',
      points: 20,
      type: 'single',
      prompt: 'Ejercicio 1: Determine la secuencia completa de ejecución de un planificador Round Robin con q = 2 para: iA=0, iB=2, iC=3, iD=5; tA=6, tB=5, tC=3, tD=4:',
      options: [
        'a) AABBCCDDAABBCDDAAB',
        'b) AAAABBCCAADDBBCDDB',
        'c) AABBBBCCAADDAACDDB',
        'd) Las opciones presentadas no son correctas.'
      ],
      answer: 3,
      explanation: 'La secuencia real es AABBAACCBBDDAACBDD (o AAAABBAACCBBDDCBDD según prioridad de arribo en frontera), por lo que ninguna de las secuencias a, b, c coincide → opción d.'
    },
    {
      id: 'p1_031024_t1_6',
      category: '1º Parcial Práctica',
      exam: '1º Parcial 03/10/2024 - Tema 1',
      points: 20,
      type: 'single',
      prompt: 'Ejercicio 6: Dada la siguiente configuración inicial para el problema del productor-consumidor (¡observe los valores iniciales!), podemos decir:',
      mediaHtml: D.CODIGO_PROD_CONS_MUTEX0,
      options: [
        'a) El productor bloquea eternamente al consumidor.',
        'b) El consumidor bloquea eternamente al productor.',
        'c) El código no presenta problema alguno.',
        'd) Ninguna de las opciones presentadas es correcta.'
      ],
      answer: 3,
      explanation: '¡Fíjese en la inicialización! `semaforo mutex = 0; semaforo vacias = 0; semaforo llenas = N;`. El productor se bloquea inmediatamente en `down(&vacias)` porque vacias=0, y el consumidor pasa `down(&llenas)` pero se bloquea eternamente en `down(&mutex)` porque `mutex` fue inicializado en 0 en vez de 1. ¡AMBOS quedan bloqueados eternamente desde el inicio sin que uno bloquee al otro por retener mutex! Por tanto: opción d.'
    },

    // =========================================================================
    // 19. RECUPERATORIO 1º EXAMEN 31/10/2024 - TEMA 1
    // =========================================================================
    {
      id: 'rec1p_311024_1',
      category: '1º Parcial Práctica',
      exam: 'Recuperatorio 1º Examen 31/10/2024 - Tema 1',
      points: 20,
      type: 'blanks',
      prompt: 'Ejercicio 1: Planificación por Round Robin con quantum = 2 (entre un proceso que llega y uno que sale, primero se encola el que ingresa):',
      mediaHtml: D.TABLA_RECUP_1P_RR,
      fields: [
        { label: 'a) Secuencia completa (use P1..P4 o 1..4)', placeholder: 'Ej: P1P1P2P2P3P3P1P1P4P4P2P2P3P3P1P1P4P4P3P3P1P1P4P3P3P3', accepted: ['p1p1p2p2p3p3p1p1p4p4p2p2p3p3p1p1p4p4p3p3p1p1p4p3p3p3', '11223311442233114433114333'], displayAnswer: 'P1P1P2P2P3P3P1P1P4P4P2P2P3P3P1P1P4P4P3P3P1P1P4P3P3P3' },
        { label: 'b) Proceso con mayor tiempo de retorno/respuesta total', placeholder: 'Ej: P3', accepted: ['p3', '3', 'proceso 3', 'el proceso p3'], displayAnswer: 'P3 (termina en t=26, retorno = 26 − 2 = 24)' }
      ],
      explanation: 'Tiempos de finalización: P2=12 (retorno 11), P1=22 (retorno 22), P4=23 (retorno 20), P3=26 (retorno 26−2 = 24, el mayor del sistema).'
    },
    {
      id: 'rec1p_311024_2',
      category: '1º Parcial Práctica',
      exam: 'Recuperatorio 1º Examen 31/10/2024 - Tema 1',
      points: 20,
      type: 'vf',
      prompt: 'Ejercicio 2: Se tienen 4 procesos (P1..P4) y 3 recursos (R1..R3) de un solo ejemplar cada uno. Relaciones de solicitud y asignación: P1 -> R3, P4 -> R1, P2 -> R1, P3 -> R2, R2 -> P1 y R3 -> P3. Afirmación: "En la situación descripta hay dos ciclos y un interbloqueo".',
      answer: 'F',
      explanation: 'Falso. Siguiendo las flechas: P1 → R3 → P3 → R2 → P1 forma UN SOLO ciclo (y produce interbloqueo entre P1 y P3), mientras que P2 → R1 y P4 → R1 solicitan R1 que está LIBRE (no pertenece a ningún ciclo). Hay 1 ciclo, no 2.'
    },
    {
      id: 'rec1p_311024_3',
      category: '1º Parcial Práctica',
      exam: 'Recuperatorio 1º Examen 31/10/2024 - Tema 1',
      points: 20,
      type: 'blanks',
      prompt: 'Ejercicio 3: Dada la información de la tabla, complete los valores teniendo en cuenta un planificador SRNT:',
      mediaHtml: D.TABLA_RECUP_1P_SRNT,
      fields: [
        { label: 'Tiempo de retorno del proceso B (ms)', placeholder: 'Ej: 2', accepted: ['2', '2 ms', '2ms'], displayAnswer: '2 ms' },
        { label: 'Tiempo de espera del proceso A (ms)', placeholder: 'Ej: 6', accepted: ['6', '6 ms', '6ms'], displayAnswer: '6 ms' }
      ],
      explanation: 'Ejecución SRNT: A(0..1, rem 9), B llega en 1 con tB=2 < 9 y ejecuta 1..3 (termina en 3 → Retorno de B = 3 − 1 = 2 ms). En t=3 llega D(1 < C=3) y ejecuta 3..4; luego C ejecuta 4..7; finalmente A ejecuta 7..16 (termina en 16 → Espera de A = 16 − 0 − 10 = 6 ms).'
    },

    // =========================================================================
    // 20. 1º PARCIAL (SRNT / PRIORIDAD / BANQUERO) - TEMA 1
    // =========================================================================
    {
      id: 'p1_banq_1',
      category: '1º Parcial Práctica',
      exam: '1º Parcial (SRNT y Banquero) - Tema 1',
      points: 20,
      type: 'single',
      prompt: 'Ejercicio 1: ¿Cuál es la secuencia completa de ejecución aplicando SRNT?\nInstante de llegada: iA=0, iB=1, iC=3, iD=5; Tiempo de ejecución: tA=8, tB=4, tC=2, tD=3:',
      options: [
        'a) ABBCCBDDDBAAAAAAA',
        'b) ABBCCBBDDDAAAAAAA',
        'c) ABBBBCCDDDAAAAAAA',
        'd) Las opciones presentadas no son correctas'
      ],
      answer: 2,
      explanation: 't=0..1 ejecuta A(rem 7). En t=1 llega B(4 < 7) y ejecuta; en t=3 llega C(2), pero a B le quedan exactamente 2 unidades (2 no es menor que 2, continúa B hasta t=5: BBBB). Luego ejecuta C(5..7: CC), D(7..10: DDD) y A(10..17: AAAAAAA) → ABBBBCCDDDAAAAAAA (opción c).'
    },
    {
      id: 'p1_banq_2',
      category: '1º Parcial Práctica',
      exam: '1º Parcial (SRNT y Banquero) - Tema 1',
      points: 10,
      type: 'text',
      prompt: 'Ejercicio 2: En el ejercicio 1 de aplicación de SRNT (iA=0, iB=1, iC=3, iD=5; tA=8, tB=4, tC=2, tD=3), complete cómo queda la cola de listos en t = 5 (6º estado, cuando C entra a CPU):',
      placeholder: 'Ej: D, A',
      accepted: ['d, a', 'da', 'd a', 'd-a'],
      displayAnswer: 'D, A (ordenada por menor tiempo restante: D=3, A=7)',
      explanation: 'En t=5 B termina, C(2) toma la CPU y en la cola de listos quedan D(restante=3) y A(restante=7) → D, A.'
    },
    {
      id: 'p1_banq_3',
      category: '1º Parcial Práctica',
      exam: '1º Parcial (SRNT y Banquero) - Tema 1',
      points: 20,
      type: 'single',
      prompt: 'Ejercicio 3: Aplique Prioridad apropiativa sin envejecimiento (Mayor número = mayor prioridad). Llegada: iA=0, iB=1, iC=3, iD=4. Ejecución: tA=5, tB=3, tC=2, tD=3. Prioridad: pA=2, pB=5, pC=6, pD=1. ¿Cuál es la secuencia correcta?',
      options: [
        'a) ABBCCBAAAADDD',
        'b) AAAAABBBCCDDD',
        'c) ABCCBBAAAADDD',
        'd) ABBBCCAAAADDD',
        'e) Las opciones presentadas no son correctas'
      ],
      answer: 0,
      explanation: 't=0..1: A(rem 4). En t=1 llega B(p5 > p2) y ejecuta 1..3 (BB, rem 1). En t=3 llega C(p6 > p5) y ejecuta 3..5 (CC, fin). Retoma B en 5..6 (B, fin), luego A en 6..10 (AAAA, fin) y finalmente D(p1) en 10..13 (DDD) → ABBCCBAAAADDD (opción a).'
    },
    {
      id: 'p1_banq_4a',
      category: '1º Parcial Práctica',
      exam: '1º Parcial (SRNT y Banquero) - Tema 1',
      points: 5,
      type: 'single',
      prompt: 'Ejercicio 4 ( parte 1): Algoritmo del Banquero con 4 procesos y créditos máximos A=6, B=4, C=3, D=3 (suma = 16; se reserva el 50% quedando 8 unidades disponibles). Secuencia: AA-BBA-CDBA.\nEn el estado AA, ¿cuántos créditos han sido solicitados?',
      options: ['a) 1', 'b) 2', 'c) 3', 'd) 4', 'e) No hay opciones correctas'],
      answer: 1,
      explanation: 'En el estado AA el proceso A realizó dos peticiones de 1 unidad → se han solicitado 2 créditos (opción b).'
    },
    {
      id: 'p1_banq_4b',
      category: '1º Parcial Práctica',
      exam: '1º Parcial (SRNT y Banquero) - Tema 1',
      points: 5,
      type: 'single',
      prompt: 'Ejercicio 4 (parte 2): Con créditos A=6, B=4, C=3, D=3 (8 unidades utilizables tras reserva del 50%), en el estado AA ¿cuántos créditos libres quedan?',
      options: ['a) 6', 'b) 7', 'c) 8', 'd) 5'],
      answer: 0,
      explanation: '8 unidades utilizables − 2 asignadas a A = 6 créditos libres (opción a).'
    },
    {
      id: 'p1_banq_4c',
      category: '1º Parcial Práctica',
      exam: '1º Parcial (SRNT y Banquero) - Tema 1',
      points: 5,
      type: 'single',
      prompt: 'Ejercicio 4 (parte 3): En el estado AA (asignados A=2, libres=6, necesidad restante de A=4, B=4, C=3, D=3), el estado es:',
      options: ['a) Inseguro', 'b) Bloqueado', 'c) Seguro', 'd) Con devolución'],
      answer: 2,
      explanation: 'Con 6 unidades libres se puede satisfacer la necesidad máxima restante de cualquiera de los procesos (4, 4, 3, 3 ≤ 6), por lo que existe secuencia segura → el estado es Seguro (opción c).'
    },
    {
      id: 'p1_banq_4d',
      category: '1º Parcial Práctica',
      exam: '1º Parcial (SRNT y Banquero) - Tema 1',
      points: 5,
      type: 'single',
      prompt: 'Ejercicio 4 (parte 4): Tras AA-BBA (acumulado A=3, B=2; ocupados=5, libres=3; necesidades restantes: A=3, B=2, C=3, D=3). Respecto del estado BBA:',
      options: ['a) Es seguro', 'b) Es inseguro', 'c) Existe devolución de B', 'd) Existe devolución de A'],
      answer: 0,
      explanation: 'Con 3 libres se puede completar B (necesita 2) o A, C, D (necesitan 3), recuperando sus recursos y terminando todos sin bloqueo → Es seguro (opción a).'
    },

    // =========================================================================
    // 21. 1º EXAMEN PRÁCTICA 22/10/2026 - TEMA 1
    // =========================================================================
    {
      id: 'p1_221026_1',
      category: '1º Parcial Práctica',
      exam: '1º Examen Práctica 22/10/2026 - Tema 1',
      points: 20,
      type: 'single',
      prompt: 'Ejercicio 1: Si fuera necesario realizar un reemplazo de página, y con la información de Tabla 1, ¿cuál de las siguientes afirmaciones es correcta?',
      mediaHtml: D.TABLA_NRU_22_10_2026,
      options: [
        'a) Es preferible reemplazar la página 3 antes que la página 9.',
        'b) Es preferible reemplazar la página 16 antes que la página 38.',
        'c) Es preferible reemplazar la página 72 antes que la página 24.',
        'd) Es preferible reemplazar la página 150 antes que la página 16.'
      ],
      answer: 1,
      explanation: 'Todas están presentes (Presente=1). La página 16 tiene R=0, M=0 (Clase 0, la mejor candidata a desalojar), mientras que la página 38 tiene R=1, M=0 (Clase 2). Por tanto, es preferible reemplazar la 16 antes que la 38 (opción b).'
    },
    {
      id: 'p1_221026_2',
      category: '1º Parcial Práctica',
      exam: '1º Examen Práctica 22/10/2026 - Tema 1',
      points: 20,
      type: 'text',
      prompt: 'Ejercicio 2: Con la información de Tabla 1, considerando páginas de 1 KB de tamaño, si la dirección virtual es 100010010111000110, ¿cuál es la dirección física? Nota: tenga en cuenta que la tabla se encuentra expresada en binario y en hexadecimal.',
      mediaHtml: D.TABLA_MARCOS_22_10_2026,
      placeholder: 'Ej: Fallo de página',
      accepted: ['fallo de pagina', 'ausente', 'no esta presente', 'page fault'],
      displayAnswer: 'Fallo de página (página 0x89 tiene Pres. = 0)',
      explanation: 'Con páginas de 1 KB (10 bits de offset): los 8 bits superiores son 1000 1001₂ = 89 en hexadecimal (y el offset es 0111000110₂ = 454₁₀). En la Tabla 1, la fila N.º pág = 89 tiene el bit Pres. = 0 (ausente en RAM) → se produce un Fallo de página.'
    },
    {
      id: 'p1_221026_3',
      category: '1º Parcial Práctica',
      exam: '1º Examen Práctica 22/10/2026 - Tema 1',
      points: 20,
      type: 'blanks',
      prompt: 'Ejercicio 3: El espacio de direccionamiento lógico está compuesto por 8192 páginas de 2048 bytes cada una, y se mapea en una memoria física de 4096 marcos de página:',
      fields: [
        { label: 'a) Bits para representar una dirección lógica', placeholder: 'Ej: 24', accepted: ['24', '24 bits', '24bits'], displayAnswer: '24 bits' },
        { label: 'b) Bits para representar una dirección física', placeholder: 'Ej: 23', accepted: ['23', '23 bits', '23bits'], displayAnswer: '23 bits' }
      ],
      explanation: 'Tamaño de página/marco = 2048 B = 2^11 B (11 bits de offset).\na) Lógica: 8192 = 2^13 páginas → 13 + 11 = 24 bits.\nb) Física: 4096 = 2^12 marcos → 12 + 11 = 23 bits.'
    },
    {
      id: 'p1_221026_4',
      category: '1º Parcial Práctica',
      exam: '1º Examen Práctica 22/10/2026 - Tema 1',
      points: 40,
      type: 'blanks',
      prompt: 'Ejercicio 4: Máquina con arquitectura de 32 bits y 2 GB de memoria RAM con paginación. Cada entrada en la tabla de páginas ocupa 24 bits (3 bytes) y el tamaño de página es de 8 KB:',
      fields: [
        { label: 'a) Cantidad de entradas de la tabla de páginas', placeholder: 'Ej: 524288 (o 2^19)', accepted: ['524288', '524.288', '2^19', '512k'], displayAnswer: '524.288 entradas (2^19)' },
        { label: 'b) Espacio en KBytes que ocupará 1 tabla de páginas', placeholder: 'Ej: 1536 KB', accepted: ['1536', '1536 kb', '1536 kbytes', '1.536'], displayAnswer: '1536 KBytes (1,5 MB)' },
        { label: 'c) Memoria máxima en MBytes para 128 procesos concurrentes', placeholder: 'Ej: 192 MB', accepted: ['192', '192 mb', '192 mbytes'], displayAnswer: '192 MBytes' },
        { label: 'd) Cantidad de marcos de página disponibles en 2 GB de RAM', placeholder: 'Ej: 262144 (o 2^18)', accepted: ['262144', '262.144', '2^18', '256k'], displayAnswer: '262.144 marcos (2^18)' }
      ],
      explanation: '8 KB = 2^13 bytes.\na) Entradas = 2^32 / 2^13 = 2^19 = 524.288.\nb) Espacio = 524.288 × 3 B = 1.572.864 B = 1536 KB (1,5 MB).\nc) 128 procesos × 1,5 MB = 192 MB.\nd) Marcos en 2 GB (2^31 B) = 2^31 / 2^13 = 2^18 = 262.144 marcos.'
    },

    // =========================================================================
    // 22. 1º EXAMEN 28/09/2023 Y 26/08/2023 (Ejercicios adicionales únicos)
    // =========================================================================
    {
      id: 'p1_280923_5e',
      category: '1º Parcial Práctica',
      exam: '1º Examen 28/09/2023 y 26/08/2023',
      points: 15,
      type: 'single',
      prompt: 'Ejercicio (28/09/23 - 5e): Se tienen 4 procesos y 3 recursos: R1 = R2 = 1 ejemplar cada uno y R3 = 2 ejemplares; donde 1 ejemplar de R3 está asignado a P1, 1 de R1 a P2, 1 de R2 a P4 y (enunciado original: 1 de R3 a P2). Luego P3 solicita R3, P2 solicita R3 y P1 solicita R1. Bajo esta situación, se tiene:',
      options: [
        'a. Dos ciclos',
        'b. No hay ciclos',
        'c. Las respuestas presentadas no son correctas',
        'd. Un Ciclo'
      ],
      answer: 3,
      explanation: 'Trazando solicitudes: P1 → R1 → P2 → R3 → P1 forma UN único ciclo (P3 → R3 no cierra otro ciclo porque nadie solicita recursos retenidos por P3, y P4 tampoco solicita nada) → Un Ciclo (opción d).'
    },
    {
      id: 'p1_260823_1',
      category: '1º Parcial Práctica',
      exam: '1º Examen 28/09/2023 y 26/08/2023',
      points: 25,
      type: 'blanks',
      prompt: 'Ejercicio (26/08/23 - 1): En la Tabla 1 se muestra una carga de trabajo con ráfagas de CPU y E/S. Identifique qué algoritmo de planificación no apropiativo corresponde a cada diagrama de Gantt:',
      mediaHtml: D.DIAGRAMAS_GANTT_26_08_2023,
      fields: [
        { label: 'Diagrama 1', placeholder: 'Ej: SJF', accepted: ['sjf', 'shortest job first', 'spn', 'trabajo mas corto primero'], displayAnswer: 'SJF (Trabajo más corto primero)' },
        { label: 'Diagrama 2', placeholder: 'Ej: FCFS / FIFO', accepted: ['fcfs', 'fifo', 'primero en llegar primero en ser atendido'], displayAnswer: 'FCFS / FIFO' }
      ],
      explanation: 'En el Diagrama 1, al terminar F1 en t=4 están listos F3(CPU=2), F2(CPU=3) y F4(CPU=2): ejecuta F3(4..6), luego F4(6..8) antes que F2(8..11) por tener menor ráfaga de CPU → SJF. En el Diagrama 2 se atienden en estricto orden de llegada a la cola de listos: F1(0..4), F3(llegó en 1 → 4..6), F2(llegó en 2 → 6..9), F4(llegó en 4 → 9..11), F1(volvió de E/S en 6 → 11..15) → FCFS / FIFO.'
    },
    {
      id: 'p1_260823_3',
      category: '1º Parcial Práctica',
      exam: '1º Examen 28/09/2023 y 26/08/2023',
      points: 30,
      type: 'blanks',
      prompt: 'Ejercicio (26/08/23 - 3): Dado el problema del productor y el consumidor, complete el código de `Productor` seleccionando la letra correspondiente (a..f):',
      mediaHtml: D.CODIGO_PRODUCTOR_1P,
      fields: [
        { label: 'Línea 1 (esperar ranura vacía)', options: ['a', 'b', 'c', 'd', 'e', 'f'], accepted: ['a', '1', 'down(&vacias)'], displayAnswer: 'a — down(&vacias)' },
        { label: 'Línea 2 (entrar región crítica)', options: ['a', 'b', 'c', 'd', 'e', 'f'], accepted: ['c', '3', 'down(&mutex)'], displayAnswer: 'c — down(&mutex)' },
        { label: 'Línea 3 (salir región crítica)', options: ['a', 'b', 'c', 'd', 'e', 'f'], accepted: ['f', '6', 'up(&mutex)'], displayAnswer: 'f — up(&mutex)' },
        { label: 'Línea 4 (incrementar ranuras llenas)', options: ['a', 'b', 'c', 'd', 'e', 'f'], accepted: ['e', '5', 'up(&llenas)'], displayAnswer: 'e — up(&llenas)' }
      ],
      explanation: 'El productor produce el elemento, hace `down(&vacias)` (a), entra en exclusión mutua con `down(&mutex)` (c), inserta en el buffer, sale con `up(&mutex)` (f) y despierta/incrementa `up(&llenas)` (e).'
    }
  ];

  window.BANCO_PREGUNTAS.push(...P2);
})();
