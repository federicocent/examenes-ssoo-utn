// Parte 1 del Banco de Preguntas: Globales / Integradores y 2º Parcial Práctica (Solo ejercicios prácticos)
window.BANCO_PREGUNTAS = window.BANCO_PREGUNTAS || [];

(function () {
  const D = window.DIAGRAMAS;
  const P1 = [
    // =========================================================================
    // 1. INTEGRADOR 16/11/2023 (Ejercicios Prácticos de Cálculo de Disco)
    // =========================================================================
    {
      id: 'int_161123_t1_5',
      category: 'Globales / Integradores',
      exam: 'Integrador 16/11/2023 (Práctica)',
      points: 10,
      type: 'vf',
      prompt: '[Tema 1] El tiempo medio de lectura o escritura de un sector de 512 bytes en un disco típico que gira a 5400 rpm es de 27 ms; considerando que el tiempo medio de posicionado anunciado para este disco es de 18 ms, la velocidad de transferencia es de 5 MB/seg y la sobrecarga debida al controlador es de 3 ms. Suponga que el disco está desocupado de forma que no hay tiempo de espera. (tenga en cuenta precisión de decimales).',
      answer: 'F',
      explanation: 'Falso. Latencia rotacional media = 0,5 × (60 / 5400) × 1000 = 5,56 ms. Transferencia = 512 B / (5 MB/s) ≈ 0,10 ms. Total = 18 + 5,56 + 0,10 + 3 = 26,66 ms (no es 27 ms considerando precisión de decimales).'
    },
    {
      id: 'int_161123_t2_5',
      category: 'Globales / Integradores',
      exam: 'Integrador 16/11/2023 (Práctica)',
      points: 10,
      type: 'vf',
      prompt: '[Tema 2] Se dice que el tiempo medio de lectura o escritura de un disco es de 12,87 ms de un sector de 512 Bytes en un disco típico que gira a 7200 rpm; con: Tiempo medio de posicionado anunciado por el fabricante para este disco es de 6,8 ms; la velocidad de transferencia de 19 MB/s y la sobrecarga debida al controlador es de 2 ms. Suponga que el disco está desocupado de forma que no hay tiempo de espera alguno. (tenga en cuenta precisión de decimales).',
      answer: 'F',
      explanation: 'Falso. Latencia rotacional media = 0,5 × (60 / 7200) × 1000 = 4,17 ms. Transferencia = 512 B / 19 MB/s ≈ 0,03 ms. Total = 6,8 + 4,17 + 0,03 + 2 = 12,99 ms (≈ 13,00 ms), no 12,87 ms.'
    },

    // =========================================================================
    // 3. INTEGRADOR 03/10/2024 - TEMA 2 (6 Ejercicios)
    // =========================================================================
    {
      id: 'int_031024_t2_1',
      category: 'Globales / Integradores',
      exam: 'Integrador 03/10/2024 - Tema 2',
      points: 20,
      type: 'single',
      prompt: 'Ejercicio 1: Teniendo en cuenta la bibliografía de base y basado en la siguiente distribución de procesos que llegan al sistema, aplique el planificador SRNT e indique qué secuencia es la correcta.\nInstante de llegada: iA=0, iB=2, iC=3, iD=5\nTiempo de ejecución: tA=8, tB=5, tC=3, tD=4',
      options: [
        'a) AABCCCBBBBDDDDAAAAAA',
        'b) AABCCBBBBCDDDDAAAAAA',
        'c) AABAACCCAAAADDDDBBBB',
        'd) Las opciones presentadas no son correctas'
      ],
      answer: 0,
      explanation: 't=0..2 ejecuta A (resta 6). En t=2 llega B(5 < 6) y ejecuta t=2..3 (resta 4). En t=3 llega C(3 < 4) y ejecuta t=3..6 hasta terminar (CCC). En t=5 llegó D(4), empate con B(4) pero B llegó antes: ejecuta B t=6..10 (BBBB), luego D t=10..14 (DDDD) y finalmente A t=14..20 (AAAAAA) → AABCCCBBBBDDDDAAAAAA.'
    },
    {
      id: 'int_031024_t2_2',
      category: 'Globales / Integradores',
      exam: 'Integrador 03/10/2024 - Tema 2',
      points: 10,
      type: 'single',
      prompt: 'Ejercicio 2: Seleccione una opción. En el siguiente grafo, los procesos bloqueados son:',
      mediaHtml: D.SVG_GRAFO_BLOQUEADOS,
      options: [
        'a) Los procesos P2, P3',
        'b) Los procesos P1 y P2',
        'c) Solo el P4',
        'd) Las opciones presentadas no son correctas'
      ],
      answer: 1,
      explanation: 'Observando los ejemplares (puntos negros): el recurso superior izquierdo (1 ejemplar) está asignado a P1; el superior derecho (1 ejemplar) a P3; el inferior izquierdo (2 ejemplares) tiene 1 en P2 y 1 en P3 (0 libres); y el inferior derecho tiene su ejemplar LIBRE. Por tanto, P3 y P4 solicitan un recurso libre (no están bloqueados), mientras que P1 pide del recurso inferior izquierdo (0 libres) y P2 pide de los dos recursos superiores (ambos con 0 libres). Bloqueados: P1 y P2.'
    },
    {
      id: 'int_031024_t2_3',
      category: 'Globales / Integradores',
      exam: 'Integrador 03/10/2024 - Tema 2',
      points: 20,
      type: 'text',
      prompt: 'Ejercicio 3: Complete en qué tiempo completa su ejecución el proceso A. Basado en la siguiente distribución de procesos, aplique el algoritmo Round Robin con time slice = 1.\nNota: Cuando se produce la llegada de un proceso se coloca en la cola de listos antes del proceso que deja la CPU.\nInstante de llegada: iA=0, iB=2, iC=3, iD=4\nTiempo de ejecución: tA=4, tB=5, tC=1, tD=3',
      placeholder: 'Ej: 8 (o t=8)',
      accepted: ['8', 't=8', 't = 8', '8 ms', 'en 8', 'en t=8'],
      displayAnswer: '8 (t = 8)',
      explanation: 'Secuencia paso a paso con q=1 (nuevo entra antes del saliente):\nt=0..1: A (rem 3) cola:[A]\nt=1..2: A (rem 2), llega B en t=2 → cola:[B, A]\nt=2..3: B (rem 4), llega C en t=3 → cola:[A, C, B]\nt=3..4: A (rem 1), llega D en t=4 → cola:[C, B, D, A]\nt=4..5: C (termina en 5) → cola:[B, D, A]\nt=5..6: B (rem 3) → cola:[D, A, B]\nt=6..7: D (rem 2) → cola:[A, B, D]\nt=7..8: A (rem 0 → ¡A termina en t = 8!).'
    },
    {
      id: 'int_031024_t2_5',
      category: 'Globales / Integradores',
      exam: 'Integrador 03/10/2024 - Tema 2',
      points: 30,
      type: 'blanks',
      prompt: 'Ejercicio 5: En una tienda de mascotas se encuentran varios hámsteres en una jaula. Todos quieren inicialmente comer del plato y después correr en la rueda. A lo sumo 3 pueden comer del plato al mismo tiempo y sólo 1 puede estar corriendo en la rueda en un instante dado. Complete las 6 instrucciones dentro de loop begin de Process HamsterX:',
      mediaHtml: D.DIAGRAMA_HAMSTERS,
      fields: [
        { label: 'Línea 1 (pedir plato)', options: ['wait (puedo_comer);', 'comer();', 'signal(puedo_comer);', 'wait(rueda);', 'montar_en_rueda();', 'signal(rueda);', 'rueda(no puedo comer);', 'wait();', 'down(rueda_comer);'], accepted: ['wait (puedo_comer);', 'wait(puedo_comer);', 'wait(puedo_comer)'], displayAnswer: 'wait (puedo_comer);' },
        { label: 'Línea 2 (acción comer)', options: ['wait (puedo_comer);', 'comer();', 'signal(puedo_comer);', 'wait(rueda);', 'montar_en_rueda();', 'signal(rueda);', 'rueda(no puedo comer);', 'wait();', 'down(rueda_comer);'], accepted: ['comer();', 'comer()'], displayAnswer: 'comer();' },
        { label: 'Línea 3 (liberar plato)', options: ['wait (puedo_comer);', 'comer();', 'signal(puedo_comer);', 'wait(rueda);', 'montar_en_rueda();', 'signal(rueda);', 'rueda(no puedo comer);', 'wait();', 'down(rueda_comer);'], accepted: ['signal(puedo_comer);', 'signal (puedo_comer);', 'signal(puedo_comer)'], displayAnswer: 'signal(puedo_comer);' },
        { label: 'Línea 4 (pedir rueda)', options: ['wait (puedo_comer);', 'comer();', 'signal(puedo_comer);', 'wait(rueda);', 'montar_en_rueda();', 'signal(rueda);', 'rueda(no puedo comer);', 'wait();', 'down(rueda_comer);'], accepted: ['wait(rueda);', 'wait (rueda);', 'wait(rueda)'], displayAnswer: 'wait(rueda);' },
        { label: 'Línea 5 (correr en rueda)', options: ['wait (puedo_comer);', 'comer();', 'signal(puedo_comer);', 'wait(rueda);', 'montar_en_rueda();', 'signal(rueda);', 'rueda(no puedo comer);', 'wait();', 'down(rueda_comer);'], accepted: ['montar_en_rueda();', 'montar_en_rueda()'], displayAnswer: 'montar_en_rueda();' },
        { label: 'Línea 6 (liberar rueda)', options: ['wait (puedo_comer);', 'comer();', 'signal(puedo_comer);', 'wait(rueda);', 'montar_en_rueda();', 'signal(rueda);', 'rueda(no puedo comer);', 'wait();', 'down(rueda_comer);'], accepted: ['signal(rueda);', 'signal (rueda);', 'signal(rueda)'], displayAnswer: 'signal(rueda);' }
      ],
      explanation: 'Primero sincroniza el acceso al plato con el semáforo general inicializado en 3: wait(puedo_comer) → comer() → signal(puedo_comer). Luego sincroniza la exclusión mutua de la rueda con el semáforo binario inicializado en 1: wait(rueda) → montar_en_rueda() → signal(rueda).'
    },

    // =========================================================================
    // 4. INTEGRADOR 15/11/2024 (Ejercicios Prácticos: Gantt y Tabla de Páginas)
    // =========================================================================
    {
      id: 'int_151124_t1_5',
      category: 'Globales / Integradores',
      exam: 'Integrador 15/11/2024 (Práctica)',
      points: 10,
      type: 'vf',
      prompt: '[Tema 1 - Act. 5] De acuerdo a la siguiente distribución de procesos, la implementación corresponde a Round Robin con q = 4.',
      mediaHtml: D.GANTT_15_11_2024,
      answer: 'F',
      explanation: 'Falso. En el diagrama P1 ejecuta solo 2 unidades (0..2) y es expropiado cuando llega P2 (duración 4 < 5 restantes de P1); luego en t=4 P2 es expropiado por P3 (duración 1 < 2 restantes de P2). Eso corresponde a SRTN, NO a Round Robin con q=4.'
    },
    {
      id: 'int_151124_t1_6',
      category: 'Globales / Integradores',
      exam: 'Integrador 15/11/2024 (Práctica)',
      points: 10,
      type: 'vf',
      prompt: '[Tema 1 - Act. 6] Con la información de la Tabla 1, la dirección física expresada en decimal considerando que: a) el tamaño de la página es de 2 kBytes, y b) la dirección virtual es 0101110101000111, es: 30026 (base 10).',
      mediaHtml: D.TABLA_PAG_15_11_2024_T1,
      answer: 'F',
      explanation: 'Falso. Página de 2 KB = 2048 bytes = 2^11 → 11 bits de desplazamiento. Separando 01011 | 10101000111: página = 01011₂ = 11₁₀ (marco 14 en Tabla 1) y offset = 10101000111₂ = 1351₁₀. Dirección física = 14 × 2048 + 1351 = 28672 + 1351 = 30023₁₀ (no 30026).'
    },
    {
      id: 'int_151124_t2_5',
      category: 'Globales / Integradores',
      exam: 'Integrador 15/11/2024 (Práctica)',
      points: 10,
      type: 'vf',
      prompt: '[Tema 2 - Act. 5] De acuerdo a la siguiente distribución de procesos, la implementación corresponde a SRNT.',
      mediaHtml: D.GANTT_15_11_2024,
      answer: 'V',
      explanation: 'Verdadero. En cada llegada se compara el tiempo restante: en t=2 P2(4) < P1(5), en t=4 P3(1) < P2(2), luego termina P2(5..7), P4(7..11) y P1(11..16). Es exactamente SRTN.'
    },
    {
      id: 'int_151124_t2_6',
      category: 'Globales / Integradores',
      exam: 'Integrador 15/11/2024 (Práctica)',
      points: 10,
      type: 'vf',
      prompt: '[Tema 2 - Act. 6] Con la información de la Tabla 1, la dirección física expresada en decimal considerando que: a) el tamaño de la página es de 2 kBytes, y b) la dirección virtual es 0101110101000111, es: 300023 (base 10).',
      mediaHtml: D.TABLA_PAG_15_11_2024_T2,
      answer: 'F',
      explanation: 'Falso (¡ojo al cero extra!). El cálculo da 14 × 2048 + 1351 = 30.023, mientras que el enunciado dice 300.023.'
    },
    {
      id: 'int_151124_t3_6',
      category: 'Globales / Integradores',
      exam: 'Integrador 15/11/2024 (Práctica)',
      points: 10,
      type: 'vf',
      prompt: '[Tema 3 - Act. 6] Con la información de la Tabla 1, la dirección física expresada en decimal considerando que: a) el tamaño de la página es de 2 kBytes, y b) la dirección virtual es 0101110101000111, es: 30023 (base 10).',
      mediaHtml: D.TABLA_PAG_15_11_2024_T3,
      answer: 'V',
      explanation: 'Verdadero. Página = 01011₂ = 11 → Marco 14. Offset = 10101000111₂ = 1351. Dirección física = 14 × 2048 + 1351 = 30023₁₀.'
    },

    // =========================================================================
    // 7. INTEGRADOR 13/11/2025 - TEMA 1 (10 Actividades)
    // =========================================================================
    {
      id: 'int_131125_t1_1',
      category: 'Globales / Integradores',
      exam: 'Integrador 13/11/2025 - Tema 1',
      points: 10,
      type: 'text',
      prompt: 'Actividad 1: En un sistema operativo el espacio de direccionamiento lógico es de 8196 páginas de 1024 bytes cada una. Este espacio de direccionamiento se mapea en una memoria física que tiene 524288 marcos de página.\na) ¿Cuántos bits son necesarios para representar la dirección RAM? Complete.',
      placeholder: 'Ej: 29 bits',
      accepted: ['29', '29 bits', '29bits'],
      displayAnswer: '29 bits',
      explanation: 'Memoria física = 524.288 marcos × 1024 bytes/marco = 2^19 × 2^10 = 2^29 bytes → se necesitan 29 bits para direccionar la RAM.'
    },
    {
      id: 'int_131125_t1_3',
      category: 'Globales / Integradores',
      exam: 'Integrador 13/11/2025 - Tema 1',
      points: 10,
      type: 'text',
      prompt: 'Actividad 3: Se tiene un sistema de archivos FAT32, ¿qué valores en hexadecimal hay que colocar en el campo de tamaño de sector para que el mismo tenga 1024 bytes? Complete.',
      placeholder: 'Ej: 00 04 (little-endian) o 0400h',
      accepted: ['00 04', '0004', '0004h', '0x0400', '0400', '0400h', '04 00', '00h 04h'],
      displayAnswer: '00 04 (en little-endian en el BPB) / 0x0400',
      explanation: '1024 en decimal equivale a 0x0400 en hexadecimal (2 bytes). Como el sector de arranque de FAT32 almacena enteros en formato little-endian (offset 0x0B-0x0C), en disco se escribe la secuencia de bytes 00 04 (valor 0x0400).'
    },
    {
      id: 'int_131125_t1_6',
      category: 'Globales / Integradores',
      exam: 'Integrador 13/11/2025 - Tema 1',
      points: 10,
      type: 'blanks',
      prompt: 'Actividad 6: Sistema interactivo con tres procesos A, B y C. Últimos cuatro comandos:\n- Proceso A: 10ms, 15ms, 12ms, 8ms\n- Proceso B: 20ms, 25ms, 22ms, 18ms\n- Proceso C: 5ms, 7ms, 6ms, 4ms\nSe aplica el método de envejecimiento con a = 1/2 para estimar el próximo comando. Complete el tiempo estimado de cada proceso y el orden de ejecución para minimizar el tiempo de respuesta:',
      fields: [
        { label: 'Estimación Proceso A (ms)', placeholder: 'Ej: 10.125', accepted: ['10.125', '10,125', '10.13', '10,13', '10.125 ms', '10,125 ms', '81/8'], displayAnswer: '10,125 ms' },
        { label: 'Estimación Proceso B (ms)', placeholder: 'Ej: 20.125', accepted: ['20.125', '20,125', '20.13', '20,13', '20.125 ms', '20,125 ms', '161/8'], displayAnswer: '20,125 ms' },
        { label: 'Estimación Proceso C (ms)', placeholder: 'Ej: 5', accepted: ['5', '5.0', '5,0', '5 ms', '5.00', '5,00'], displayAnswer: '5 ms' },
        { label: 'Orden de ejecución (SJF)', placeholder: 'Ej: C, A, B', accepted: ['c, a, b', 'cab', 'c - a - b', 'c a b', 'c->a->b', 'c,a,b'], displayAnswer: 'C, A, B' }
      ],
      explanation: 'Con a = 1/2: E₁ = T₀; E₂ = ½E₁ + ½T₁; E₃ = ½E₂ + ½T₂; E₄ = ½E₃ + ½T₃:\n• A: 10 → 12,5 → 12,25 → 10,125 ms\n• B: 20 → 22,5 → 22,25 → 20,125 ms\n• C: 5 → 6 → 6 → 5 ms\nPara minimizar el tiempo de respuesta medio (SJF) se ejecutan de menor a mayor: C, A, B.'
    },
    {
      id: 'int_131125_t1_7',
      category: 'Globales / Integradores',
      exam: 'Integrador 13/11/2025 - Tema 1',
      points: 10,
      type: 'text',
      prompt: 'Actividad 7: Se necesitan gestionar procesos en segundo plano, complete con el comando que debe ingresar en Linux.',
      placeholder: 'Ej: bg',
      accepted: ['bg', 'jobs', 'fg', '&', 'comando &'],
      displayAnswer: 'bg (o & al lanzar / jobs para listar)',
      explanation: 'El comando `bg` reanuda un proceso detenido pasándolo a segundo plano (background); `&` al final del comando lo inicia en segundo plano y `jobs` lista los trabajos.'
    },
    {
      id: 'int_131125_t1_8',
      category: 'Globales / Integradores',
      exam: 'Integrador 13/11/2025 - Tema 1',
      points: 10,
      type: 'text',
      prompt: 'Actividad 8: El tiempo medio de lectura o escritura de un sector de 512 Bytes en un disco típico que gira a 7200 rpm. Con: Tiempo medio de posicionado = 6,8 ms, velocidad de transferencia = 19 MB/s y sobrecarga del controlador = 2 ms. Disco desocupado sin espera. Complete el valor en ms calculado con centésimos.',
      placeholder: 'Ej: 12.99 ms',
      accepted: ['12.99', '12,99', '12.99 ms', '12,99 ms', '13.00', '13,00', '13', '13 ms'],
      displayAnswer: '12,99 ms (≈ 13,00 ms)',
      explanation: 'Seek = 6,8 ms + Latencia rotacional media (0,5 × 60000 / 7200 = 4,1667 ms) + Transferencia (512 / (19 × 1024²) × 1000 = 0,0257 ms) + Controlador (2 ms) = 12,992 ms → 12,99 ms.'
    },
    {
      id: 'int_131125_t1_9',
      category: 'Globales / Integradores',
      exam: 'Integrador 13/11/2025 - Tema 1',
      points: 10,
      type: 'single',
      prompt: 'Actividad 9: Se tienen 4 procesos y 3 recursos, donde: R1 = R2 = 1 ejemplar cada uno y R3 = 2 ejemplares. Un ejemplar de R3 está asignado a P1, un ejemplar de R1 está asignado a P2, un ejemplar de R2 está asignado a P4 y un ejemplar de R3 está asignado a P2. Luego P4 solicita R3, P2 solicita R2 y P1 solicita R1. Bajo esta situación, se tiene:',
      options: [
        'a) Dos ciclos',
        'b) No hay ciclos',
        'c) Las respuestas presentadas no son correctas',
        'd) Un Ciclo'
      ],
      answer: 0,
      explanation: 'Trazando el grafo dirigido de asignación y solicitud: R3→P1, R3→P2, R1→P2, R2→P4 y solicitudes P4→R3, P2→R2, P1→R1. Se forman dos ciclos cerrados: Ciclo 1 (P2 → R2 → P4 → R3 → P2) y Ciclo 2 (P1 → R1 → P2 → R2 → P4 → R3 → P1).'
    },
    {
      id: 'int_131125_t1_10',
      category: 'Globales / Integradores',
      exam: 'Integrador 13/11/2025 - Tema 1',
      points: 10,
      type: 'vf',
      prompt: 'Actividad 10: La INT 14H se encarga de las comunicaciones de Entrada/Salida, la función 05h regresa estado del puerto de comunicaciones.',
      answer: 'F',
      explanation: 'Falso. En la INT 14h del BIOS (puerto serie), la función que regresa el estado del puerto de comunicaciones es AH = 03h (00h inicializa, 01h envía carácter, 02h recibe carácter, 03h lee estado).'
    },

    // =========================================================================
    // 8. INTEGRADOR 13/11/2025 - TEMA 2 (10 Actividades)
    // =========================================================================
    {
      id: 'int_131125_t2_1',
      category: 'Globales / Integradores',
      exam: 'Integrador 13/11/2025 - Tema 2',
      points: 10,
      type: 'blanks',
      prompt: 'Actividad 1: Tres procesos interactivos A, B y C:\n- Proceso A: 10ms, 15ms, 12ms, 8ms\n- Proceso B: 20ms, 25ms, 22ms, 18ms\n- Proceso C: 5ms, 7ms, 6ms, 4ms\nAplique envejecimiento con a = 1/2 y complete los tiempos estimados y el orden de ejecución:',
      fields: [
        { label: 'Estimación A (ms)', placeholder: '10.125', accepted: ['10.125', '10,125', '10.13', '10,13'], displayAnswer: '10,125 ms' },
        { label: 'Estimación B (ms)', placeholder: '20.125', accepted: ['20.125', '20,125', '20.13', '20,13'], displayAnswer: '20,125 ms' },
        { label: 'Estimación C (ms)', placeholder: '5', accepted: ['5', '5.0', '5,0'], displayAnswer: '5 ms' },
        { label: 'Orden de ejecución', placeholder: 'C, A, B', accepted: ['c, a, b', 'cab', 'c a b', 'c - a - b'], displayAnswer: 'C, A, B' }
      ],
      explanation: 'A = 10,125 ms; B = 20,125 ms; C = 5 ms. Orden para minimizar tiempo de respuesta: C, A, B.'
    },
    {
      id: 'int_131125_t2_2',
      category: 'Globales / Integradores',
      exam: 'Integrador 13/11/2025 - Tema 2',
      points: 10,
      type: 'text',
      prompt: 'Actividad 2: Para el siguiente conjunto de trabajo: iA=0, iB=2, iC=1; tA=8, tB=1, tC=3; indique a qué algoritmo pertenece el siguiente diagrama de Gantt:',
      mediaHtml: D.GANTT_13_11_2025_T2,
      placeholder: 'Ej: SJF',
      accepted: ['sjf', 'shortest job first', 'trabajo mas corto primero', 'spn', 'sjf no apropiativo'],
      displayAnswer: 'SJF (Shortest Job First / Trabajo más corto primero)',
      explanation: 'A inicia en t=0 y ejecuta sus 8 unidades completas sin ser expropiado cuando llegan C(t=1) ni B(t=2). Al terminar A en t=8, están listos B(tB=1) y C(tC=3); se elige B por ser más corto (8..9) y luego C (9..12) → SJF.'
    },
    {
      id: 'int_131125_t2_3',
      category: 'Globales / Integradores',
      exam: 'Integrador 13/11/2025 - Tema 2',
      points: 10,
      type: 'single',
      prompt: 'Actividad 3: Si fuera necesario realizar un reemplazo de página, y con la información de Tabla 1, ¿cuál de las siguientes afirmaciones es correcta?',
      mediaHtml: D.TABLA_NRU_13_11_2025_T2,
      options: [
        'a) Es preferible reemplazar la página 5 antes que la página 1.',
        'b) Es preferible reemplazar la página 7 antes que la página 1.',
        'c) Es preferible reemplazar la página 53 antes que la página 1.',
        'd) Es preferible reemplazar la página 400 antes que la página 1.',
        'e) Las respuestas presentadas no son correctas.'
      ],
      answer: 4,
      explanation: '¡Trampa clásica! Las páginas 7 y 53 tienen Presente = 0 (no están en memoria RAM, no se pueden reemplazar). La página 1 está presente y es Clase 1 (R=0, M=1). La página 5 es Clase 3 (peor candidata), y la 400 también es Clase 1 (igual categoría que la 1, no es preferible sobre ella). Por tanto, ninguna afirmación es correcta (e).'
    },
    {
      id: 'int_131125_t2_4',
      category: 'Globales / Integradores',
      exam: 'Integrador 13/11/2025 - Tema 2',
      points: 10,
      type: 'text',
      prompt: 'Actividad 4: Disponemos de una dirección de memoria lógica cuyo valor es 20FB en hexadecimal. Si el tamaño de página es de 4 KB, complete con el par ordenado (nro pag, desplazamiento).',
      placeholder: 'Ej: (2, 0FB) en hex o (2, 251) en decimal',
      accepted: ['(2, 0fb)', '(2, fb)', '(0x2, 0x0fb)', '(0x02, 0x0fb)', '2, 0fb', '2, fb', '(2, 251)', '2, 251', '(2; 0fb)', '(2; 251)'],
      displayAnswer: '(2, 0FB) en hex  /  (2, 251) en decimal',
      explanation: 'Tamaño de página = 4 KB = 2^12 bytes → 12 bits (3 dígitos hexadecimales) para el desplazamiento. En 0x20FB: N° de página = 2 y desplazamiento = 0x0FB (251 en decimal).'
    },
    {
      id: 'int_131125_t2_5',
      category: 'Globales / Integradores',
      exam: 'Integrador 13/11/2025 - Tema 2',
      points: 10,
      type: 'blanks',
      prompt: 'Actividad 5: Un disco duro tiene bloques de 512 bytes, pero el sistema de archivos utiliza un tamaño de bloque lógico de 4 KB.\na) ¿Qué fragmentación se produce en este escenario?\nb) Si un archivo de 4500 bytes se guarda en este disco, ¿cuál es el espacio desperdiciado en bytes?',
      fields: [
        { label: 'a) Tipo de fragmentación', placeholder: 'Ej: Fragmentación interna', accepted: ['interna', 'fragmentacion interna'], displayAnswer: 'Fragmentación interna' },
        { label: 'b) Espacio desperdiciado (bytes)', placeholder: 'Ej: 3692', accepted: ['3692', '3692 bytes', '3692 b'], displayAnswer: '3692 bytes' }
      ],
      explanation: 'a) Se produce fragmentación interna en el último bloque lógico asignado.\nb) 4500 bytes requiere ⌈4500 / 4096⌉ = 2 bloques lógicos = 8192 bytes. Desperdicio = 8192 − 4500 = 3692 bytes.'
    },
    {
      id: 'int_131125_t2_7',
      category: 'Globales / Integradores',
      exam: 'Integrador 13/11/2025 - Tema 2',
      points: 10,
      type: 'text',
      prompt: 'Actividad 7: Se desea programar una UART para que utilice 7 bits por carácter, paridad par, 1 ½ bits de parada. Complete con el valor del registro LCR que cumple con esta condición.',
      placeholder: 'Ej: 1Eh o 00011110b',
      accepted: ['1e', '1eh', '0x1e', '00011110', '00011110b', '0001 1110', '30'],
      displayAnswer: '1Eh (0x1E / 00011110 en binario)',
      explanation: 'Registro LCR (bits 7..0): DLAB(b7)=0, Break(b6)=0, Stick(b5)=0, Paridad Par EPS(b4)=1, Paridad Habilitada PEN(b3)=1, Stop >1 bit(b2)=1, 7 bits de datos(b1..b0)=10 → 0001 1110₂ = 1Eh (30 decimal).'
    },
    {
      id: 'int_131125_t2_8',
      category: 'Globales / Integradores',
      exam: 'Integrador 13/11/2025 - Tema 2',
      points: 10,
      type: 'text',
      prompt: 'Actividad 8: Aplique el algoritmo SRNT (Shortest Remaining Time Next), con instantes de llegada: iA=0, iB=1, iC=3, iD=4, iE=6; y tiempos de ejecución: tA=4, tB=6, tC=4, tD=2, tE=7. Complete con la secuencia completa de ejecución.',
      placeholder: 'Ej: AAAADDCCCCBBBBBBEEEEEEE',
      accepted: ['aaaaddccccbbbbbbeeeeeee'],
      displayAnswer: 'AAAADDCCCCBBBBBBEEEEEEE',
      explanation: 't=0..1: A (resta 3). En t=1 llega B(6 > 3), sigue A. En t=3 llega C(4 > 1), sigue A hasta terminar en t=4 (AAAA). En t=4 llega D(2 < C=4 < B=6): ejecuta D de 4..6 (DD). En t=6 llega E(7): entre C(4), B(6) y E(7) ejecuta C de 6..10 (CCCC), luego B de 10..16 (BBBBBB) y E de 16..23 (EEEEEEE).'
    },
    {
      id: 'int_131125_t2_9',
      category: 'Globales / Integradores',
      exam: 'Integrador 13/11/2025 - Tema 2',
      points: 10,
      type: 'text',
      prompt: 'Actividad 9: En una máquina que corre Linux se está ejecutando Firefox y se desea obtener el process ID de este navegador. Escriba la sintaxis completa del comando (excluya top y htop).',
      placeholder: 'Ej: pidof firefox  o  pgrep firefox  o  ps aux | grep firefox',
      accepted: ['pidof firefox', 'pgrep firefox', 'ps aux | grep firefox', 'ps -ef | grep firefox', 'ps -A | grep firefox', 'ps -e | grep firefox', 'ps -C firefox -o pid='],
      displayAnswer: 'pidof firefox  (también válido: pgrep firefox o ps aux | grep firefox)',
      explanation: 'Tanto `pidof firefox` como `pgrep firefox` devuelven directamente el PID del proceso; también es válido filtrar la salida de `ps` con `ps aux | grep firefox` o `ps -ef | grep firefox`.'
    },
    {
      id: 'int_131125_t2_10',
      category: 'Globales / Integradores',
      exam: 'Integrador 13/11/2025 - Tema 2',
      points: 10,
      type: 'text',
      prompt: 'Actividad 10: El comando Linux "ps" brinda información sobre procesos. Mencione 4 campos (columnas) que se muestran cuando se emite el comando, separados por coma.',
      placeholder: 'Ej: PID, TTY, TIME, CMD',
      accepted: ['pid, tty, time, cmd'],
      validator: 'ps4',
      displayAnswer: 'PID, TTY, TIME, CMD (también UID/USER, PPID, %CPU, %MEM, STAT, VSZ, RSS, START)',
      explanation: 'Al emitir `ps` sin opciones muestra por defecto las 4 columnas: PID (ID del proceso), TTY (terminal asociada), TIME (tiempo de CPU acumulado) y CMD (comando ejecutado). Con opciones como `-f` o `aux` agrega UID/USER, PPID, C/%CPU, %MEM, VSZ, RSS, STAT, STIME/START.'
    },

    // =========================================================================
    // 9. INTEGRADOR - TEMA PRÁCTICO (10 Actividades)
    // =========================================================================
    {
      id: 'int_prac_1',
      category: 'Globales / Integradores',
      exam: 'Integrador - Tema Práctico',
      points: 10,
      type: 'text',
      prompt: 'Actividad 1: En un sistema operativo que utiliza paginación, el espacio de direccionamiento lógico está compuesto por 4096 páginas de 2048 bytes cada una. Este espacio se mapea en una memoria física (RAM) que tiene 131072 marcos de página.\n¿Cuántos bits son necesarios para representar la dirección RAM (dirección física)?',
      placeholder: 'Ej: 28 bits',
      accepted: ['28', '28 bits', '28bits'],
      displayAnswer: '28 bits',
      explanation: '131.072 marcos = 2^17 marcos. Tamaño de marco = 2048 bytes = 2^11 bytes. Total RAM = 2^17 × 2^11 = 2^28 bytes → 28 bits.'
    },
    {
      id: 'int_prac_4',
      category: 'Globales / Integradores',
      exam: 'Integrador - Tema Práctico',
      points: 10,
      type: 'text',
      prompt: 'Actividad 4: Se dispone de una dirección de memoria lógica cuyo valor es 318A en hexadecimal. Si el tamaño de página es de 8 KB, determine el Número de Página y el Offset dentro de esta página. Complete con el par ordenado (nro. página, desplazamiento) en hexadecimal.',
      placeholder: 'Ej: (1, 118A) o (0x01, 0x118A)',
      accepted: ['(1, 118a)', '(01, 118a)', '(0x1, 0x118a)', '(0x01, 0x118a)', '(0x01; 0x118a)', '(1; 118a)', '1, 118a', '0x01, 0x118a'],
      displayAnswer: '(0x01, 0x118A)  /  (1, 118A)',
      explanation: '8 KB = 8192 bytes = 2^13 bytes → los 13 bits menos significativos son el desplazamiento. En binario: 0x318A = 0011 0001 1000 1010₂ = 001 | 1 0001 1000 1010₂ → Página = 001₂ = 0x01, Offset = 1 0001 1000 1010₂ = 0x118A.'
    },
    {
      id: 'int_prac_6',
      category: 'Globales / Integradores',
      exam: 'Integrador - Tema Práctico',
      points: 10,
      type: 'text',
      prompt: 'Actividad 6: Coloque la sentencia completa para monitorear procesos en tiempo real en Linux. Excluya de la respuesta los comandos top y htop.',
      placeholder: 'Ej: watch ps aux  o  atop',
      accepted: ['watch ps aux', 'watch -n 1 ps aux', 'watch ps -ef', 'watch -n 1 ps -ef', 'atop', 'glances', 'vmstat 1'],
      displayAnswer: 'watch ps aux  (también válido: watch -n 1 ps -ef, atop, glances)',
      explanation: 'Nota de corrección de cátedra: `ps aux` solo muestra una foto estática (se corrige como incorrecto si no lleva `watch`). Para monitoreo en tiempo real sin top/htop se usa `watch ps aux` (o herramientas de tiempo real como `atop` / `glances`).'
    },
    {
      id: 'int_prac_7',
      category: 'Globales / Integradores',
      exam: 'Integrador - Tema Práctico',
      points: 10,
      type: 'text',
      prompt: 'Actividad 7: Se necesitan gestionar procesos en segundo plano, complete con el comando que debe ingresar en Linux para pasar procesos a segundo plano.',
      placeholder: 'Ej: bg',
      accepted: ['bg'],
      displayAnswer: 'bg',
      explanation: 'El comando `bg` (background) pasa un proceso detenido en la terminal a ejecutarse en segundo plano.'
    },
    {
      id: 'int_prac_8',
      category: 'Globales / Integradores',
      exam: 'Integrador - Tema Práctico',
      points: 10,
      type: 'blanks',
      prompt: 'Actividad 8: Un disco duro tiene bloques físicos de 256 bytes, pero el sistema de archivos está configurado para utilizar un tamaño de bloque lógico (cluster) de 8 KB.\na) ¿Qué fragmentación se produce en este escenario?\nb) Si un archivo de 10500 bytes se guarda en este disco, ¿cuál es el espacio desperdiciado en bytes?',
      fields: [
        { label: 'a) Fragmentación', placeholder: 'Ej: Interna', accepted: ['interna', 'fragmentacion interna'], displayAnswer: 'Fragmentación interna' },
        { label: 'b) Bytes desperdiciados', placeholder: 'Ej: 5884', accepted: ['5884', '5884 bytes', '5884 b'], displayAnswer: '5884 bytes' }
      ],
      explanation: '8 KB = 8192 bytes. Para 10500 bytes se asignan 2 bloques lógicos = 16384 bytes. Espacio desperdiciado por fragmentación interna = 16384 − 10500 = 5884 bytes.'
    },
    {
      id: 'int_prac_9',
      category: 'Globales / Integradores',
      exam: 'Integrador - Tema Práctico',
      points: 10,
      type: 'single',
      prompt: 'Actividad 9: Complete con la opción correcta. En el siguiente grafo, los procesos bloqueados son:',
      mediaHtml: D.SVG_GRAFO_BLOQUEADOS,
      options: [
        'a) Los procesos P2, P3',
        'b) Los procesos P1 y P2',
        'c) Solo el P4',
        'd) Las opciones presentadas no son correctas'
      ],
      answer: 1,
      explanation: 'El recurso inferior derecho posee 1 ejemplar libre (ninguna flecha sale de su punto negro), por lo que P3 y P4 no están bloqueados. En cambio, P1 y P2 solicitan recursos cuyos ejemplares están todos asignados → P1 y P2 están bloqueados (opción b).'
    },
    {
      id: 'int_prac_10',
      category: 'Globales / Integradores',
      exam: 'Integrador - Tema Práctico',
      points: 10,
      type: 'vf',
      prompt: 'Actividad 10: La INT 14H se encarga de las comunicaciones de Entrada/Salida, la función 02h regresa estado del puerto de comunicaciones.',
      answer: 'F',
      explanation: 'Falso. En la INT 14h la función 02h recibe/lee un carácter; la que regresa el estado del puerto es la función 03h.'
    },

    // =========================================================================
    // 10. GLOBAL PRÁCTICA 19/11/2026 - TEMA 1
    // =========================================================================
    {
      id: 'glob_191126_t1_1',
      category: 'Globales / Integradores',
      exam: 'Global Práctica 19/11/2026 - Tema 1',
      points: 15,
      type: 'single',
      prompt: 'Ejercicio 1: Disponemos de una dirección de memoria lógica cuyo valor es 3A7C en hexadecimal. Si el tamaño de página es de 4 KB, indique cuál es el número de página asociado a la dirección virtual y el desplazamiento dentro de esta:',
      options: [
        'a. N.º de página = 3, desplazamiento = A7C.',
        'b. N.º de página = A, desplazamiento = 37C.',
        'c. N.º de página = 3A, desplazamiento = 7C.',
        'd. Las opciones presentadas no son correctas.'
      ],
      answer: 0,
      explanation: '4 KB = 2^12 bytes → 12 bits de desplazamiento = 3 dígitos hexadecimales (A7C). El dígito superior (3) corresponde al número de página → N.º de página = 3, desplazamiento = A7C.'
    },
    {
      id: 'glob_191126_t1_2',
      category: 'Globales / Integradores',
      exam: 'Global Práctica 19/11/2026 - Tema 1',
      points: 15,
      type: 'text',
      prompt: 'Ejercicio 2: Se desea configurar una interfaz de comunicación UART para que transmita utilizando 8 bits por carácter, paridad impar y 2 bits de parada. Complete con el valor hexadecimal del registro LCR (Line Control Register) que permite cumplir con esta configuración.',
      placeholder: 'Ej: 0Fh (o 0x0F)',
      accepted: ['0f', '0fh', '0x0f', 'f', 'fh'],
      displayAnswer: '0Fh (0x0F)',
      explanation: 'Bits del LCR: DLAB(b7)=0, Break(b6)=0, Stick(b5)=0, Paridad Impar EPS(b4)=0, Paridad Habilitada PEN(b3)=1, 2 bits de parada(b2)=1, 8 bits por carácter(b1..b0)=11 → 0000 1111₂ = 0Fh.'
    },
    {
      id: 'glob_191126_t1_3a',
      category: 'Globales / Integradores',
      exam: 'Global Práctica 19/11/2026 - Tema 1',
      points: 10,
      type: 'single',
      prompt: 'Ejercicio 3 - Pregunta 1: Un disco duro tiene bloques físicos de 512 bytes, pero el sistema de archivos utiliza un tamaño de bloque lógico de 4 KB (4096 bytes). Si un archivo de 50.000 bytes se guarda en este disco, ¿cuántos bloques físicos se necesitarían para almacenar el archivo de 50.000 bytes?',
      options: [
        'A) 96 bloques físicos.',
        'B) 98 bloques físicos.',
        'C) 100 bloques físicos.',
        'E) Las opciones presentadas no son correctas.'
      ],
      answer: 1,
      explanation: '50.000 / 512 = 97,65625 → redondeando hacia arriba se requieren 98 bloques físicos (98 × 512 = 50.176 bytes). (Nota: si se contabilizan los bloques físicos contenidos en los 13 bloques lógicos de 8 sectores serían 104, pero la pregunta consulta directamente cuántos bloques físicos requiere el tamaño del archivo: 98).'
    },
    {
      id: 'glob_191126_t1_3b',
      category: 'Globales / Integradores',
      exam: 'Global Práctica 19/11/2026 - Tema 1',
      points: 10,
      type: 'single',
      prompt: 'Ejercicio 3 - Pregunta 2: Con bloques físicos de 512 bytes y bloque lógico de 4 KB (4096 bytes), ¿cuántos bloques lógicos se necesitarían para almacenar el archivo de 50.000 bytes?',
      options: [
        'A) 12 bloques lógicos.',
        'B) 13 bloques lógicos.',
        'C) 14 bloques lógicos.',
        'E) Las opciones presentadas no son correctas.'
      ],
      answer: 1,
      explanation: '50.000 / 4096 = 12,207 → se necesitan 13 bloques lógicos (13 × 4096 = 53.248 bytes).'
    },
    {
      id: 'glob_191126_t1_3c',
      category: 'Globales / Integradores',
      exam: 'Global Práctica 19/11/2026 - Tema 1',
      points: 10,
      type: 'single',
      prompt: 'Ejercicio 3 - Pregunta 3: ¿Cuánto espacio de almacenamiento se desperdicia por fragmentación interna al guardar el archivo de 50.000 bytes en bloques lógicos de 4 KB?',
      options: [
        'A) 2048 bytes.',
        'B) 3248 bytes.',
        'C) 4096 bytes.',
        'E) Las opciones presentadas no son correctas.'
      ],
      answer: 1,
      explanation: '13 bloques lógicos × 4096 bytes = 53.248 bytes asignados. Desperdicio = 53.248 − 50.000 = 3.248 bytes (opción B).'
    },
    {
      id: 'glob_191126_t1_4',
      category: 'Globales / Integradores',
      exam: 'Global Práctica 19/11/2026 - Tema 1',
      points: 20,
      type: 'single',
      prompt: 'Ejercicio 4: Considerando los datos de la Tabla 3, si se usara el algoritmo de planificación de procesos Round Robin con time slice = 1, entonces:',
      mediaHtml: D.TABLA_RR_19_11_2026,
      options: [
        'a. En tiempo t=12 la cola de procesos listos es la siguiente: D E B A',
        'b. En tiempo t=13 se ejecuta el proceso E.',
        'c. El proceso D se ejecuta en t=11 y en t=20.',
        'd. El proceso E se ejecuta en t=11 y en t=20.',
        'e. Ninguna de las respuestas anteriores es correcta.'
      ],
      answer: 4,
      explanation: 'Trazando RR con q=1: con política estándar la secuencia es AAABAEBCADEBCADEBCDEBDEEE (donde en t=11 y t=20 se ejecuta B, no D ni E; en t=13 se ejecuta A; y en t=12 mientras ejecuta C la cola es A D E B). Con política de nuevo antes del saliente la secuencia es AABAEBCADEBCADEBCADEBDEEE (en t=11 ejecuta C, en t=13 ejecuta D). En ambos casos ninguna de las opciones a-d es verdadera → opción e.'
    },
    {
      id: 'glob_191126_t1_5',
      category: 'Globales / Integradores',
      exam: 'Global Práctica 19/11/2026 - Tema 1',
      points: 20,
      type: 'blanks',
      prompt: 'Ejercicio 5: En una máquina con arquitectura de 32 bits y 4 GB de memoria RAM se implementa paginación. Si cada entrada en la tabla de páginas ocupa 32 bits (4 bytes), complete para un tamaño de página de 4 KB:',
      fields: [
        { label: 'a) Cantidad de entradas de la tabla de páginas', placeholder: 'Ej: 1048576 (o 2^20)', accepted: ['1048576', '1.048.576', '2^20', '1m'], displayAnswer: '1.048.576 entradas (2^20)' },
        { label: 'b) Espacio en KBytes que ocupará la tabla de páginas', placeholder: 'Ej: 4096 KB', accepted: ['4096', '4096 kb', '4096 kbytes', '4.096', '4.096 kb'], displayAnswer: '4096 KBytes (4 MB)' }
      ],
      explanation: 'a) Páginas virtuales = 2^32 / 2^12 = 2^20 = 1.048.576 entradas.\nb) Tamaño de la tabla = 1.048.576 entradas × 4 bytes = 4.194.304 bytes = 4096 KBytes.'
    },

    // =========================================================================
    // 11. GLOBAL PRÁCTICA 19/11/2026 - TEMA 2 (Preguntas diferenciales + completas)
    // =========================================================================
    {
      id: 'glob_191126_t2_1',
      category: 'Globales / Integradores',
      exam: 'Global Práctica 19/11/2026 - Tema 2',
      points: 10,
      type: 'single',
      prompt: 'Ejercicio 1: Disponemos de una dirección de memoria lógica cuyo valor es 5A3E91 en hexadecimal. Si el tamaño de página es de 4 KB, indique cuál es el número de página asociado a la dirección virtual y el desplazamiento dentro de esta:',
      options: [
        'a. N.º de página = 5A3E, desplazamiento = 91.',
        'b. N.º de página = 5A, desplazamiento = 3E91.',
        'c. N.º de página = 5A3, desplazamiento = E91.',
        'd. Las opciones presentadas no son correctas.'
      ],
      answer: 2,
      explanation: 'Tamaño de página = 4 KB = 2^12 bytes → los últimos 3 dígitos hexadecimales son el desplazamiento (E91) y los dígitos superiores el número de página (5A3) → opción c.'
    },
    {
      id: 'glob_191126_t2_2',
      category: 'Globales / Integradores',
      exam: 'Global Práctica 19/11/2026 - Tema 2',
      points: 20,
      type: 'text',
      prompt: 'Ejercicio 2: Se desea configurar una interfaz de comunicación UART para que las líneas de control DTR y RTS se encuentren activadas, mientras que las líneas OUT1 y OUT2 permanezcan desactivadas, manteniendo deshabilitado el modo LOOP. Complete con el valor binario que debe escribirse en el registro MCR (Modem Control Register).',
      placeholder: 'Ej: 00000011',
      accepted: ['00000011', '00000011b', '0000 0011', '00011', '00011b'],
      displayAnswer: '00000011 (03h)',
      explanation: 'En el registro MCR (8250/16550): bit 0 = DTR (1), bit 1 = RTS (1), bit 2 = OUT1 (0), bit 3 = OUT2 (0), bit 4 = LOOP (0), bits 5..7 = 0 → 00000011₂.'
    },
    {
      id: 'glob_191126_t2_4',
      category: 'Globales / Integradores',
      exam: 'Global Práctica 19/11/2026 - Tema 2',
      points: 20,
      type: 'single',
      prompt: 'Ejercicio 4: Considerando los datos de la Tabla 3, si se usara el algoritmo de planificación de procesos Round Robin con time slice = 1, entonces:',
      mediaHtml: D.TABLA_RR_19_11_2026,
      options: [
        'a. En tiempo t=12 la cola de procesos listos es la siguiente: D E B A',
        'b. En tiempo t=13 se ejecuta el proceso E.',
        'c. El proceso D se ejecuta en t=11 y en t=18.',
        'd. El proceso B se ejecuta en t=11 y en t=20.',
        'e. Ninguna de las respuestas anteriores es correcta.'
      ],
      answer: 3,
      explanation: 'Con RR (q=1) reencolando el proceso saliente antes de nuevas llegadas en el mismo instante: AAABAEBCADEBCADEBCDEBDEEE → en el intervalo t=11 ([11,12]) se ejecuta B y en t=20 ([20,21]) también se ejecuta B → opción d.'
    },
    {
      id: 'glob_191126_t2_5a',
      category: 'Globales / Integradores',
      exam: 'Global Práctica 19/11/2026 - Tema 2',
      points: 10,
      type: 'single',
      prompt: 'Ejercicio 5a: Arquitectura de 32 bits, 4 GB de RAM, entradas de tabla de páginas de 32 bits y páginas de 4 KB. La cantidad máxima de memoria, en MBytes, utilizada por las tablas de páginas si el sistema operativo soporta 64 procesos concurrentes es:',
      options: [
        'a. 64 MB',
        'b. 128 MB',
        'c. 256 MB',
        'd. 512 MB',
        'e. Las opciones presentadas no son correctas.'
      ],
      answer: 2,
      explanation: 'Cada tabla tiene 2^20 entradas × 4 B = 4 MB. Para 64 procesos concurrentes: 64 × 4 MB = 256 MB (opción c).'
    },
    {
      id: 'glob_191126_t2_5b',
      category: 'Globales / Integradores',
      exam: 'Global Práctica 19/11/2026 - Tema 2',
      points: 10,
      type: 'single',
      prompt: 'Ejercicio 5b: Con 4 GB de memoria RAM y tamaño de página de 4 KB, la cantidad de marcos de página disponibles es:',
      options: [
        'a. 262.144 marcos.',
        'b. 524.288 marcos.',
        'c. 1.048.576 marcos.',
        'd. 2.097.152 marcos.',
        'e. Las opciones presentadas no son correctas.'
      ],
      answer: 2,
      explanation: '4 GB / 4 KB = 2^32 bytes / 2^12 bytes = 2^20 = 1.048.576 marcos (opción c).'
    },

    // =========================================================================
    // 12. 2º PARCIAL PRÁCTICA 29/10/2025 - TEMA 2
    // =========================================================================
    {
      id: 'p2_291025_t2_1',
      category: '2º Parcial Práctica',
      exam: '2º Parcial Práctica 29/10/2025 - Tema 2',
      points: 20,
      type: 'single',
      prompt: 'Ejercicio 1: De acuerdo al programa en Assembler, en líneas generales ¿qué hace esta porción de código?',
      mediaHtml: D.ASM_29_10_2025,
      options: [
        'a. Establece el formato de transmisión (LCR y Divisor)',
        'b. Las opciones presentadas no son correctas',
        'c. Enmascara los valores leídos de los puertos y con OUT escribe en los puertos especificados',
        'd. Lee el registro 3FBh, donde se guarda el estado de la línea LSR',
        'e. Establece el formato de transmisión (LSR y Divisor)',
        'f. Lee el registro 3FBh, donde se guarda el estado de la línea LCR',
        'g. No hay opciones correctas'
      ],
      answer: 0,
      explanation: '3FBh es el registro LCR de COM1: primero escribe 80h (DLAB=1) para habilitar el divisor de baudios, carga 60h en DLL (3F8h) y 00h en DLM (3F9h) para 1200 bps, y luego prepara 0Ah en LCR (3FBh). Por tanto, en líneas generales establece el formato de transmisión (LCR y Divisor).'
    },
    {
      id: 'p2_291025_t2_2',
      category: '2º Parcial Práctica',
      exam: '2º Parcial Práctica 29/10/2025 - Tema 2',
      points: 20,
      type: 'text',
      prompt: 'Ejercicio 2: Se desea programar una UART para realizar una transmisión con paridad impar, 8 bits por carácter y dos bits de parada. ¿Cuál es el valor del registro LCR que cumple con esta condición?',
      placeholder: 'Ej: 0Fh o 00001111b',
      accepted: ['0f', '0fh', '0x0f', '00001111', '00001111b', '0000 1111', '15'],
      displayAnswer: '0Fh (00001111b / 15 decimal)',
      explanation: 'DLAB=0, Break=0, Stick=0, EPS(impar)=0, PEN(con paridad)=1, Stop(2 bits)=1, WordLen(8 bits)=11 → 0000 1111₂ = 0Fh.'
    },
    {
      id: 'p2_291025_t2_3',
      category: '2º Parcial Práctica',
      exam: '2º Parcial Práctica 29/10/2025 - Tema 2',
      points: 20,
      type: 'text',
      prompt: 'Ejercicio 3: Con la información de Tabla 1, considerando páginas de 2 KB de tamaño, si la dirección virtual es 1000 1001 0011 0101 0011, ¿cuál es la dirección en memoria real? (Si no puede traducirse, indique fallo de página / no está en tabla).',
      mediaHtml: D.TABLA_PAGINAS_29_10_2025,
      placeholder: 'Ej: Fallo de página (no se encuentra en la tabla)',
      accepted: ['fallo de pagina', 'no esta en la tabla', 'no se encuentra en la tabla', 'error', 'ausente', 'no existe'],
      displayAnswer: 'Fallo de página / No se encuentra en Tabla 1 (Nro pág = 100010010₂ = 274₁₀ = 112₁₆)',
      explanation: 'Con páginas de 2 KB (2^11 bytes), los 11 bits inferiores (011 0101 0011₂ = 851₁₀) son el offset, y los 9 bits superiores (1 0001 0010₂ = 274₁₀ = 0x112) son el número de página. Como la página 112h / 274 no figura en la Tabla 1 (solo están 1, 5, 7, 53, 89, 1A), no puede traducirse en RAM (se produce fallo).'
    },
    {
      id: 'p2_291025_t2_4',
      category: '2º Parcial Práctica',
      exam: '2º Parcial Práctica 29/10/2025 - Tema 2',
      points: 20,
      type: 'text',
      prompt: 'Ejercicio 4: ¿Cuál es el tiempo medio de lectura o escritura de un sector de 256 bytes en un disco típico que gira a 7200 rpm? Tiempo medio de posicionado = 6,8 ms, velocidad de transferencia = 8 MB/seg y sobrecarga del controlador = 2 ms. Disco desocupado sin espera. Exprese en milisegundos con 2 decimales.',
      placeholder: 'Ej: 13.00 ms',
      accepted: ['13', '13.00', '13,00', '13.00 ms', '13,00 ms', '12.99', '12,99', '12.99 ms', '12,99 ms'],
      displayAnswer: '13,00 ms (12,997 ms)',
      explanation: 'Seek = 6,8 ms + Latencia rotacional media (0,5 × 60000 / 7200 = 4,1667 ms) + Transferencia (256 / (8 × 1024²) × 1000 = 0,0305 ms) + Controlador (2 ms) = 12,997 ms → redondeado a 2 decimales: 13,00 ms.'
    },
    {
      id: 'p2_291025_t2_5',
      category: '2º Parcial Práctica',
      exam: '2º Parcial Práctica 29/10/2025 - Tema 2',
      points: 20,
      type: 'blanks',
      prompt: 'Ejercicio 5: Suponga que un proceso emite una dirección lógica igual a 7890 (decimal) y utiliza paginación con páginas de 2048 palabras:\na) ¿Cuál es el par de valores (nro página; desplazamiento) en decimal?\nb) ¿Es posible que la dirección lógica 7890 se traduzca en la dirección física 12090? (Responda Sí o No).',
      fields: [
        { label: 'a) Par (nro página; desplazamiento)', placeholder: 'Ej: (3; 1746)', accepted: ['(3; 1746)', '(3, 1746)', '3; 1746', '3, 1746'], displayAnswer: '(3; 1746)' },
        { label: 'b) ¿Es posible 12090? (Sí / No)', options: ['No', 'Sí'], accepted: ['no'], displayAnswer: 'No' }
      ],
      explanation: 'a) 7890 ÷ 2048 = cociente 3 (página 3) y resto 1746 (desplazamiento = 1746) → (3; 1746).\nb) NO es posible, porque en paginación el desplazamiento dentro del marco debe conservarse idéntico (1746), pero 12090 ÷ 2048 da marco 5 con desplazamiento 1850 ≠ 1746.'
    },

    // =========================================================================
    // 13. RECUPERATORIO 2º EXAMEN 31/10/2024 - TEMA 1 (Versiones A y B)
    // =========================================================================
    {
      id: 'rec2p_311024_1',
      category: '2º Parcial Práctica',
      exam: 'Recuperatorio 2º Examen 31/10/2024 - Tema 1',
      points: 20,
      type: 'single',
      prompt: 'Ejercicio 1: Interprete el siguiente código Assembler de comunicación serie y elija la opción correcta:',
      mediaHtml: D.ASM_RECUP_31_10_2024,
      options: [
        'a. No se activan los registros DLL, DLH.',
        'b. Los caracteres que se leen son erróneos.',
        'c. Los caracteres leídos en la rutina de error provienen de una controladora incorrecta (y RECIBIR enmascara a 6 bits).',
        'd. No presenta errores.',
        'e. Las opciones presentadas no son correctas.'
      ],
      answer: 2,
      explanation: 'En MAIN se configura la UART en los puertos 3E8h..3EDh (COM3) con 8 bits de datos (LCR = 0Bh). Sin embargo, en la etiqueta ERROR se hace `MOV DX, 3F8H` (que es COM1, ¡otra controladora distinta a 3E8h!) y además en RECIBIR se enmascara con `AND AL, 3FH` (6 bits).'
    },
    {
      id: 'rec2p_311024_2',
      category: '2º Parcial Práctica',
      exam: 'Recuperatorio 2º Examen 31/10/2024 - Tema 1',
      points: 20,
      type: 'text',
      prompt: 'Ejercicio 2: Basado en la Tabla 1, considerando páginas de 1 KB de tamaño y 16 bits de direccionamiento, se tiene la dirección virtual 0x54ED. Complete con la dirección física en memoria real en decimal (o indique si ocurre fallo de página):',
      mediaHtml: D.TABLA_PAGINAS_RECUP_31_10_2024,
      placeholder: 'Ej: Fallo de página',
      accepted: ['fallo de pagina', 'ausente', 'no esta presente', 'page fault'],
      displayAnswer: 'Fallo de página (corresponde a la página 21, cuyo bit Presente/Ausente es 0)',
      explanation: 'Páginas de 1 KB = 2^10 bytes → 10 bits inferiores de offset y 6 bits superiores de página. 0x54ED = 010101 | 0011101101₂ → Página = 010101₂ = 21₁₀, Offset = 237₁₀. Al buscar la página 21 en la Tabla 1, su bit Presente/ausente es 0 → ¡Ocurre un Fallo de página!'
    },
    {
      id: 'rec2p_311024_3',
      category: '2º Parcial Práctica',
      exam: 'Recuperatorio 2º Examen 31/10/2024 - Tema 1',
      points: 20,
      type: 'text',
      prompt: 'Ejercicio 3: Una computadora tiene cuatro marcos de página. De acuerdo a los siguientes datos, complete con la página que reemplazará un algoritmo LRU:',
      mediaHtml: D.TABLA_LRU_RECUP_31_10_2024,
      placeholder: 'Ej: 1 (o Página 1)',
      accepted: ['1', 'pagina 1', 'pag 1', 'la pagina 1', 'la 1'],
      displayAnswer: 'Página 1',
      explanation: 'LRU (Least Recently Used) desaloja la página cuya "Última referencia" sea la más antigua (menor valor): la página 1 tiene última referencia en 265 (< 270, 280, 285).'
    },
    {
      id: 'rec2p_311024_3_linux',
      category: '2º Parcial Práctica',
      exam: 'Recuperatorio 2º Examen 31/10/2024 - Tema 1',
      points: 20,
      type: 'blanks',
      prompt: 'Ejercicio 3 (Variante Linux): Complete en cada caso:\na) Comando en Linux para formatear un archivo de imagen (p. ej. imagen.img con ext4):\nb) Comando en Linux para crear un archivo simbólico (enlace simbólico) a un archivo de texto:',
      fields: [
        { label: 'a) Formatear imagen / bucle', placeholder: 'Ej: mkfs.ext4 imagen.img', accepted: ['mkfs', 'mkfs.ext4', 'mkfs.ext4 imagen.img', 'mkfs -t ext4 imagen.img', 'mkfs.ext3 imagen.img', 'mkfs.vfat imagen.img'], validator: 'mkfs_cmd', displayAnswer: 'mkfs.ext4 imagen.img (o mkfs -t ext4 ...)' },
        { label: 'b) Crear enlace simbólico', placeholder: 'Ej: ln -s archivo.txt enlace.txt', accepted: ['ln -s'], validator: 'lns_cmd', displayAnswer: 'ln -s archivo.txt enlace_simbolico' }
      ],
      explanation: 'En Linux se formatea un sistema de archivos sobre una imagen o dispositivo loop usando `mkfs` (ej. `mkfs.ext4 archivo.img` o `mkfs -t ext4 /dev/loop0`), y los enlaces simbólicos se crean con `ln -s <origen> <enlace>`.'
    },
    {
      id: 'rec2p_311024_4_8kb',
      category: '2º Parcial Práctica',
      exam: 'Recuperatorio 2º Examen 31/10/2024 - Tema 1',
      points: 20,
      type: 'text',
      prompt: 'Ejercicio 4 (Versión A): Una máquina tiene direcciones virtuales de 48 bits y direcciones físicas de 32 bits. Las páginas son de 8 KB. Complete con la cantidad de entradas que se necesitan para la tabla de páginas (de un nivel):',
      placeholder: 'Ej: 2^35 (o 34359738368)',
      accepted: ['2^35', '34359738368', '34.359.738.368', '32g', '2 a la 35'],
      displayAnswer: '2^35 entradas (34.359.738.368)',
      explanation: '8 KB = 2^13 bytes → 13 bits de desplazamiento. Bits de número de página virtual = 48 − 13 = 35 bits → se necesitan 2^35 entradas en la tabla de páginas.'
    },
    {
      id: 'rec2p_311024_4_4kb',
      category: '2º Parcial Práctica',
      exam: 'Recuperatorio 2º Examen 31/10/2024 - Tema 1',
      points: 20,
      type: 'text',
      prompt: 'Ejercicio 4 (Versión B): Una máquina tiene direcciones virtuales de 48 bits y direcciones físicas de 32 bits. Las páginas son de 4 KB. Complete con la cantidad de entradas que se necesitan para la tabla de páginas (de un nivel):',
      placeholder: 'Ej: 2^36 (o 68719476736)',
      accepted: ['2^36', '68719476736', '68.719.476.736', '64g', '2 a la 36'],
      displayAnswer: '2^36 entradas (68.719.476.736)',
      explanation: '4 KB = 2^12 bytes → 12 bits de desplazamiento. Bits de página virtual = 48 − 12 = 36 bits → 2^36 entradas.'
    },
    {
      id: 'rec2p_311024_5',
      category: '2º Parcial Práctica',
      exam: 'Recuperatorio 2º Examen 31/10/2024 - Tema 1',
      points: 20,
      type: 'blanks',
      prompt: 'Ejercicio 5: Complete el nombre base del comando en Linux para:\na) Formatear el dispositivo de bucle:\nb) Crear un Dispositivo de Caracteres:',
      fields: [
        { label: 'a) Comando para formatear dispositivo de bucle', placeholder: 'Ej: mkfs (o mkfs.ext4 /dev/loop0)', accepted: ['mkfs', 'mkfs.ext4', 'mkfs.ext3', 'mkfs.vfat'], validator: 'mkfs_cmd', displayAnswer: 'mkfs (ej. sudo mkfs.ext4 /dev/loop0)' },
        { label: 'b) Comando para crear dispositivo de caracteres', placeholder: 'Ej: mknod (ej. mknod /dev/disp c 89 1)', accepted: ['mknod'], validator: 'mknod_cmd', displayAnswer: 'mknod (con tipo c, ej: sudo mknod nombre c mayor menor)' }
      ],
      explanation: '`mkfs` formatea el dispositivo de bucle (asociado previamente con `losetup`), mientras que `mknod <nombre> c <mayor> <menor>` crea un archivo especial de dispositivo de caracteres.'
    },

    // =========================================================================
    // 14. 2º EXAMEN PRÁCTICA 25/10/2024 - TEMA 1 (y variante)
    // =========================================================================
    {
      id: 'p2_251024_t1_0',
      category: '2º Parcial Práctica',
      exam: '2º Examen Práctica 25/10/2024 - Tema 1',
      points: 20,
      type: 'text',
      prompt: 'Ejercicio 1 (Variante): En un sistema operativo el espacio de direccionamiento lógico consiste en 32 páginas de 4 KB cada una, mapeado en una memoria física de 128 marcos de página. ¿Cuántos bits son necesarios para representar la dirección lógica?',
      placeholder: 'Ej: 17 bits',
      accepted: ['17', '17 bits', '17bits'],
      displayAnswer: '17 bits',
      explanation: '32 páginas = 2^5; tamaño de página = 4 KB = 2^12 bytes → Dirección lógica = 5 + 12 = 17 bits.'
    },
    {
      id: 'p2_251024_t1_1',
      category: '2º Parcial Práctica',
      exam: '2º Examen Práctica 25/10/2024 - Tema 1',
      points: 20,
      type: 'single',
      prompt: 'Ejercicio 1: Dada la cadena de referencias a páginas: 2, 4, 5, 4, 6, 7, 4, 2, 1, 4, 7, 3. Si el sistema dispone de cuatro marcos de memoria principal (considere R=1, Presente=1 al cargar y páginas ordenadas en la cola):',
      options: [
        'a) Se generan 9 fallos de página si se aplica un algoritmo FIFO para el reemplazo de páginas',
        'b) Se generan 8 fallos de página si se aplica el algoritmo de wsclock para el reemplazo de páginas',
        'c) Se generan 9 fallos de página para ambos algoritmos, FIFO y wsclock',
        'd) La a y la d son ciertas.',
        'e) Las opciones presentadas no son correctas'
      ],
      answer: 2,
      explanation: 'Con 4 marcos inicialmente vacíos, en FIFO fallan: 2(F1), 4(F2), 5(F3), 4(hit), 6(F4), 7(F5 sale 2), 4(hit), 2(F6 sale 4), 1(F7 sale 5), 4(F8 sale 6), 7(hit), 3(F9 sale 7) = 9 fallos. Según criterio corregido en cátedra (20/20 ptos), con R=1 en el pulso actual sin expiración de τ en WSClock la manecilla da la vuelta completa comportándose igual → 9 fallos en ambos (opción c).'
    },
    {
      id: 'p2_251024_t1_2',
      category: '2º Parcial Práctica',
      exam: '2º Examen Práctica 25/10/2024 - Tema 1',
      points: 10,
      type: 'single',
      prompt: 'Ejercicio 2: La tabla de páginas de un proceso indica que la página 2₁₀ tiene asociado el marco 7₁₀. El tamaño de la memoria física es de 65536 bytes y hay 32 marcos de página. ¿Cuál es la dirección física asociada a la dirección virtual 4421₁₀?',
      options: [
        'a) 7*2*2*1024 + 325',
        'b) 7*2*1024 + 1676',
        'c) 2*2*1024 + 325',
        'd) Las opciones presentadas no son correctas (es 7*2*1024 + 325)'
      ],
      answer: 3,
      explanation: 'Tamaño de marco = 65536 / 32 = 2048 bytes = 2 × 1024 bytes. Dirección virtual 4421 = 2 × 2048 + 325 → Página 2, offset 325. Como la página 2 va al marco 7: Dirección física = 7 × 2 × 1024 + 325 = 14661₁₀ (opción d).'
    },
    {
      id: 'p2_251024_t1_4',
      category: '2º Parcial Práctica',
      exam: '2º Examen Práctica 25/10/2024 - Tema 1',
      points: 20,
      type: 'blanks',
      prompt: 'Ejercicio 4: Sistema con paginación: dirección virtual de 32 bits, tamaño de página de 4 KB. Traduzca las siguientes direcciones virtuales a direcciones físicas en hexadecimal, o escriba "Fallo de página" si no está presente / fuera de tabla:',
      mediaHtml: D.TABLA_PAGINAS_25_10_2024,
      fields: [
        { label: '1. Dirección virtual 0x0000C011', placeholder: 'Ej: Fallo de página', accepted: ['fallo de pagina', 'fuera de tabla', 'direccion invalida', 'error'], displayAnswer: 'Fallo de página (página 0x00C no presente en tabla)' },
        { label: '2. Dirección virtual 0x00002345', placeholder: 'Ej: Fallo de página', accepted: ['fallo de pagina', 'ausente'], displayAnswer: 'Fallo de página (página 0x002 tiene Presente/Ausente = 0)' }
      ],
      explanation: 'Con páginas de 4 KB (12 bits = 3 dígitos hex de offset):\n1) 0x0000C011 → página 0x0000C, offset 0x011: no está cargada en la tabla → Fallo de página.\n2) 0x00002345 → página 0x00002, offset 0x345: en la tabla la página 0x002 tiene bit Presente/Ausente = 0 → Fallo de página.'
    },
    {
      id: 'p2_251024_t1_6',
      category: '2º Parcial Práctica',
      exam: '2º Examen Práctica 25/10/2024 - Tema 1',
      points: 10,
      type: 'single',
      prompt: 'Ejercicio 6: La siguiente directiva Assembler: "DB 256 DUP(?)" sirve para:',
      options: [
        'a) Asignar 256 bytes indefinidos (sin inicializar)',
        'b) Asignar 256 bits indefinidos.',
        'c) Guarda y prepara 256 espacios de palabras',
        'd) Ninguna de las anteriores'
      ],
      answer: 0,
      explanation: '`DB` (Define Byte) reserva bytes, `256 DUP(?)` duplica 256 veces un byte sin valor inicial (`?`) → asigna 256 bytes indefinidos.'
    },
    {
      id: 'p2_251024_t1_7',
      category: '2º Parcial Práctica',
      exam: '2º Examen Práctica 25/10/2024 - Tema 1',
      points: 10,
      type: 'vf',
      prompt: 'Ejercicio 7: Establezca si la siguiente afirmación es verdadera o falsa: "La INT 16h y la INT 10h pertenecen al BIOS".',
      answer: 'V',
      explanation: 'Verdadero. INT 10h (servicios de video) e INT 16h (servicios de teclado) son interrupciones propias del BIOS de la PC.'
    },
    {
      id: 'p2_251024_t1_8',
      category: '2º Parcial Práctica',
      exam: '2º Examen Práctica 25/10/2024 - Tema 1',
      points: 10,
      type: 'single',
      prompt: 'Ejercicio Extra (Variante T1): Para una dirección lógica de 32 bits con el formato [número de pág. (22 bits), desplazamiento de la pág. (10 bits)]:',
      options: [
        'a) El número de páginas totales es de 22 y el tamaño de la página es de 10 bytes.',
        'b) El número de páginas totales es de 2^22 y el tamaño de la página de 2^10 bytes.',
        'c) El número de páginas totales es de 2^32 pero el tamaño de la página depende del marco de página.',
        'd) El número de páginas totales es de 2^22 pero el tamaño de la página depende del marco de página.',
        'e) Las opciones presentadas no son correctas'
      ],
      answer: 1,
      explanation: 'Con 22 bits de página hay 2^22 páginas virtuales posibles, y con 10 bits de desplazamiento cada página mide 2^10 = 1024 bytes (1 KB) → opción b.'
    },

    // =========================================================================
    // 15. 2º EXAMEN PRÁCTICA 25/10/2024 - TEMA 2 (y variante)
    // =========================================================================
    {
      id: 'p2_251024_t2_0',
      category: '2º Parcial Práctica',
      exam: '2º Examen Práctica 25/10/2024 - Tema 2',
      points: 20,
      type: 'text',
      prompt: 'Ejercicio 1 (Variante): El espacio de direccionamiento lógico es de 16 páginas de 2 KB cada una, mapeado en una memoria física de 64 marcos de página. ¿Cuántos bits son necesarios para representar la dirección lógica?',
      placeholder: 'Ej: 15 bits',
      accepted: ['15', '15 bits', '15bits'],
      displayAnswer: '15 bits',
      explanation: '16 páginas = 2^4; 2 KB = 2048 bytes = 2^11 bytes → 4 + 11 = 15 bits.'
    },
    {
      id: 'p2_251024_t2_1',
      category: '2º Parcial Práctica',
      exam: '2º Examen Práctica 25/10/2024 - Tema 2',
      points: 20,
      type: 'single',
      prompt: 'Ejercicio 1: Dada la cadena de referencias: 2, 4, 5, 4, 6, 7, 4, 2, 1, 4, 7, 3 con 4 marcos de memoria principal (R=1 al cargar) comparando Segunda Oportunidad:',
      options: [
        'a) Se generan 9 fallos de página si se aplica un algoritmo FIFO (y 8 con segunda oportunidad)',
        'b) Se generan 8 fallos de página si se aplica el algoritmo de segunda oportunidad para el reemplazo de páginas',
        'c) Se generan 9 fallos de página para ambos algoritmos, FIFO y segunda oportunidad',
        'd) La a y la d son ciertas.',
        'e) Las opciones presentadas no son correctas'
      ],
      answer: 1,
      explanation: 'Con Segunda Oportunidad: se cargan 2, 4, 5, 6 (4 fallos). En 7 todos tienen R=1→0 y sale 2 (fallo 5: [4₀,5₀,6₀,7₁]). En 4 es hit → 4₁. En 2: 4₁ pasa al final como 4₀ y sale 5₀ (fallo 6: [6₀,7₁,4₀,2₁]). En 1 sale 6₀ (fallo 7: [7₁,4₀,2₁,1₁]). Luego 4 es HIT y 7 es HIT. Finalmente en 3 ocurre el fallo 8 → 8 fallos de página con Segunda Oportunidad (opción b).'
    },
    {
      id: 'p2_251024_t2_2',
      category: '2º Parcial Práctica',
      exam: '2º Examen Práctica 25/10/2024 - Tema 2',
      points: 10,
      type: 'single',
      prompt: 'Ejercicio 2: La tabla de páginas de un proceso indica que la página 6₁₀ tiene asociado el marco 15₁₀. El tamaño de la memoria física es de 65536 bytes y tenemos 32 marcos de página. ¿Cuál es la dirección física asociada a la dirección virtual 3055₁₆ (en hexadecimal)?',
      options: [
        'a) 15*2*2*1024 + 85',
        'b) 15*2*1024 + 4181',
        'c) 15*2*1024 + 85',
        'd) Las opciones presentadas no son correctas'
      ],
      answer: 2,
      explanation: 'Tamaño de marco = 65536 / 32 = 2048 bytes (2*1024). Dirección virtual 0x3055 = 3×4096 + 5×16 + 5 = 12373₁₀. Dividiendo 12373 ÷ 2048 = página 6 con resto (offset) 85₁₀. Como la página 6 va al marco 15: Dirección física = 15*2*1024 + 85 (opción c).'
    },
    {
      id: 'p2_251024_t2_4',
      category: '2º Parcial Práctica',
      exam: '2º Examen Práctica 25/10/2024 - Tema 2',
      points: 20,
      type: 'blanks',
      prompt: 'Ejercicio 4: Sistema con paginación: dirección virtual de 32 bits, tamaño de página de 4 KB. Traduzca las siguientes direcciones virtuales a direcciones físicas en hexadecimal, o indique "Fallo de página":',
      mediaHtml: D.TABLA_PAGINAS_25_10_2024,
      fields: [
        { label: '1. Dirección virtual 0x00001F34', placeholder: 'Ej: 0xFFDF34', accepted: ['0xffdf34', 'ffdf34', 'ffdf34h', '0x00ffdf34'], displayAnswer: '0xFFDF34' },
        { label: '2. Dirección virtual 0x00008AB2', placeholder: 'Ej: Fallo de página', accepted: ['fallo de pagina', 'fuera de tabla', 'ausente', 'error'], displayAnswer: 'Fallo de página (página 0x008 no está en tabla)' }
      ],
      explanation: '1) 0x00001F34 → página 0x001 (Presente = 1, Marco = 0xFFD) y offset = 0xF34 → Dirección física = 0xFFDF34.\n2) 0x00008AB2 → página 0x008, no figura en la tabla → Fallo de página.'
    },
    {
      id: 'p2_251024_t2_6',
      category: '2º Parcial Práctica',
      exam: '2º Examen Práctica 25/10/2024 - Tema 2',
      points: 10,
      type: 'single',
      prompt: 'Ejercicio 6: La siguiente directiva Assembler: "DW 128 DUP(0)", elija una opción:',
      options: [
        'a) Asigna 128 bytes inicializados a cero.',
        'b) Asigna 128 palabras (2 bytes cada una) inicializadas a cero.',
        'c) Reserva 128 espacios para bytes sin inicializar.',
        'd) Ninguna de las anteriores.'
      ],
      answer: 1,
      explanation: '`DW` (Define Word) define palabras de 2 bytes (16 bits en x86) y `128 DUP(0)` reserva 128 palabras inicializadas en 0.'
    },
    {
      id: 'p2_251024_t2_7',
      category: '2º Parcial Práctica',
      exam: '2º Examen Práctica 25/10/2024 - Tema 2',
      points: 10,
      type: 'vf',
      prompt: 'Ejercicio 7: Establezca si la siguiente afirmación es verdadera o falsa: "La INT 21h y la INT 10h pertenecen al DOS".',
      answer: 'F',
      explanation: 'Falso. La INT 21h sí pertenece al DOS, pero la INT 10h pertenece al BIOS (servicios de video).'
    },
    {
      id: 'p2_251024_t2_8',
      category: '2º Parcial Práctica',
      exam: '2º Examen Práctica 25/10/2024 - Tema 2',
      points: 10,
      type: 'single',
      prompt: 'Ejercicio Extra (Variante T2): Para una dirección lógica de 32 bits con el formato [número de página (20 bits), desplazamiento de la página (12 bits)]:',
      options: [
        'a) El número de páginas totales es de 2^20 y el tamaño de la página es de 2^12 bytes.',
        'b) El número de páginas totales es de 24 y el tamaño de la página es de 4096 bytes.',
        'c) El número de páginas totales es de 2^20 pero el tamaño de la página depende del marco de página.',
        'd) El número de páginas totales es de 2^20 pero el tamaño de la página es de 212 bytes.',
        'e) Las opciones presentadas no son correctas.'
      ],
      answer: 0,
      explanation: '20 bits para página implican 2^20 páginas totales, y 12 bits de offset implican páginas de 2^12 = 4096 bytes (opción a).'
    }
  ];

  window.BANCO_PREGUNTAS.push(...P1);
})();
