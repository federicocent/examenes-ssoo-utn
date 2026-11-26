// Sección Independiente: Práctica Exclusiva de Todos los Registros de la UART (8250 / 16450 / 16550A)
// IMPORTANTE: Se guarda en window.BANCO_UART (NO en window.BANCO_PREGUNTAS) para que NUNCA se mezcle con los parciales.

(function () {
  window.TABLA_RESUMEN_UART = `
    <div style="overflow-x:auto;">
      <table class="exam-table">
        <thead>
          <tr>
            <th>Offset</th>
            <th>COM1 / COM2</th>
            <th>DLAB</th>
            <th>Registro (Lectura / Escritura)</th>
            <th>Mapa de Bits (Bit 7 → Bit 0)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>+0</strong></td>
            <td><code>3F8h</code> / <code>2F8h</code></td>
            <td><code>0</code></td>
            <td><strong>RBR</strong> (Lectura) / <strong>THR</strong> (Escritura)</td>
            <td>Bits 7..0: Byte de datos recibido (RBR) o byte a transmitir (THR)</td>
          </tr>
          <tr>
            <td><strong>+0</strong></td>
            <td><code>3F8h</code> / <code>2F8h</code></td>
            <td><code>1</code></td>
            <td><strong>DLL</strong> (Lectura / Escritura)</td>
            <td>Byte bajo del divisor de baudios (<code>Divisor = 115200 / bps</code>)</td>
          </tr>
          <tr>
            <td><strong>+1</strong></td>
            <td><code>3F9h</code> / <code>2F9h</code></td>
            <td><code>1</code></td>
            <td><strong>DLM / DLH</strong> (Lectura / Escritura)</td>
            <td>Byte alto del divisor de baudios</td>
          </tr>
          <tr>
            <td><strong>+1</strong></td>
            <td><code>3F9h</code> / <code>2F9h</code></td>
            <td><code>0</code></td>
            <td><strong>IER</strong> (Interrupt Enable Register)</td>
            <td>b7..b4=<code>0</code> | b3=Est. Módem | b2=Error/Est. Línea | b1=THR vacío | b0=Dato disponible</td>
          </tr>
          <tr>
            <td><strong>+2</strong></td>
            <td><code>3FAh</code> / <code>2FAh</code></td>
            <td><code>X</code></td>
            <td><strong>IIR</strong> (Solo Lectura)</td>
            <td>b7..b6=FIFOs | b5..b4=0 | b3..b1=ID prioridad (<code>011</code>=LSR, <code>010</code>=RX, <code>001</code>=THR, <code>000</code>=MSR) | <strong>b0=0 si hay int. pendiente</strong> (1=sin int.)</td>
          </tr>
          <tr>
            <td><strong>+2</strong></td>
            <td><code>3FAh</code> / <code>2FAh</code></td>
            <td><code>X</code></td>
            <td><strong>FCR</strong> (Solo Escritura, 16550A)</td>
            <td>b7..b6=Trigger RX (<code>00</code>=1B, <code>01</code>=4B, <code>10</code>=8B, <code>11</code>=14B) | b5..b4=0 | b3=DMA | b2=Reset TX | b1=Reset RX | b0=Habilitar FIFO</td>
          </tr>
          <tr>
            <td><strong>+3</strong></td>
            <td><code>3FBh</code> / <code>2FBh</code></td>
            <td><code>X</code></td>
            <td><strong>LCR</strong> (Line Control Register)</td>
            <td>b7=<strong>DLAB</strong> | b6=Break | b5=Stick | b4=EPS (1=Par, 0=Impar) | b3=PEN (1=Con paridad) | b2=Stop (0=1b, 1=1.5/2b) | b1..b0=Datos (<code>00</code>=5, <code>01</code>=6, <code>10</code>=7, <code>11</code>=8)</td>
          </tr>
          <tr>
            <td><strong>+4</strong></td>
            <td><code>3FCh</code> / <code>2FCh</code></td>
            <td><code>X</code></td>
            <td><strong>MCR</strong> (Modem Control Register)</td>
            <td>b7..b5=<code>0</code> | b4=<strong>LOOP</strong> | b3=<strong>OUT2</strong> (hab. IRQ al PIC) | b2=<strong>OUT1</strong> | b1=<strong>RTS</strong> | b0=<strong>DTR</strong></td>
          </tr>
          <tr>
            <td><strong>+5</strong></td>
            <td><code>3FDh</code> / <code>2FDh</code></td>
            <td><code>X</code></td>
            <td><strong>LSR</strong> (Line Status Register)</td>
            <td>b7=Err FIFO | b6=<strong>TEMT</strong> (TX total vacío) | b5=<strong>THRE</strong> (THR vacío) | b4=<strong>BI</strong> | b3=<strong>FE</strong> (Trama) | b2=<strong>PE</strong> (Paridad) | b1=<strong>OE</strong> (Overrun) | b0=<strong>DR</strong> (Dato listo)</td>
          </tr>
          <tr>
            <td><strong>+6</strong></td>
            <td><code>3FEh</code> / <code>2FEh</code></td>
            <td><code>X</code></td>
            <td><strong>MSR</strong> (Modem Status Register)</td>
            <td>b7=<strong>DCD</strong> | b6=<strong>RI</strong> | b5=<strong>DSR</strong> | b4=<strong>CTS</strong> | b3=ΔDCD | b2=TERI | b1=ΔDSR | b0=ΔCTS</td>
          </tr>
          <tr>
            <td><strong>+7</strong></td>
            <td><code>3FFh</code> / <code>2FFh</code></td>
            <td><code>X</code></td>
            <td><strong>SCR</strong> (Scratchpad Register)</td>
            <td>Bits 7..0: Registro temporal de 8 bits de propósito general (16450/16550)</td>
          </tr>
        </tbody>
      </table>
    </div>`;

  const ASM_SONDEO_UART = `<div class="code-box">ESPERAR_RX:
    MOV DX, 3FDh
    IN  AL, DX
    TEST AL, 01h        ; Verifica bit 0 (DR: Data Ready)
    JZ  ESPERAR_RX
    MOV DX, 3F8h
    IN  AL, DX          ; <-- (a) ¿Qué registro lee aquí (con DLAB=0)?
    MOV BL, AL

ESPERAR_TX:
    MOV DX, 3FDh
    IN  AL, DX
    AND AL, ____        ; <-- (b) Máscara hex para verificar THRE (bit 5 de LSR)
    JZ  ESPERAR_TX
    MOV DX, 3F8h
    MOV AL, BL
    OUT DX, AL          ; <-- (c) ¿Qué registro escribe aquí (con DLAB=0)?</div>`;

  window.BANCO_UART = [
    {
      id: 'uart_ex_1',
      category: 'Registros UART',
      exam: 'LCR — Formato de Trama',
      points: 10,
      type: 'text',
      prompt: 'Ejercicio 1 (Registro LCR): Se desea configurar una interfaz UART (con DLAB = 0, sin condición de Break ni paridad fija/stick) para transmitir utilizando 7 bits por carácter, paridad par y 1 bit de parada. Complete con el valor hexadecimal (o binario de 8 bits) que debe cargarse en el registro LCR (Line Control Register).',
      placeholder: 'Ej: 1Ah (o 00011010b)',
      accepted: ['1a', '1ah', '0x1a', '00011010', '00011010b', '0001 1010', '26'],
      displayAnswer: '1Ah (0x1A / 00011010 en binario)',
      explanation: 'Armando el byte del registro LCR (b7..b0): DLAB(b7)=0, Break(b6)=0, Stick(b5)=0, Paridad Par EPS(b4)=1, Paridad Habilitada PEN(b3)=1, 1 bit de parada(b2)=0, 7 bits por carácter(b1..b0)=10 → 0001 1010₂ = 1Ah.'
    },
    {
      id: 'uart_ex_2',
      category: 'Registros UART',
      exam: 'DLL y DLM — Divisor de Baudios',
      points: 10,
      type: 'blanks',
      prompt: 'Ejercicio 2 (Registros LCR/DLAB, DLL y DLM): En el puerto COM1 (base 3F8h, reloj de 1,8432 MHz → tasa base = 115.200) se desea configurar una velocidad de transmisión de 300 bps.\nComplete los valores hexadecimales que deben escribirse en cada paso:',
      fields: [
        { label: 'a) Valor en LCR (3FBh) para habilitar solo DLAB=1', placeholder: 'Ej: 80h', accepted: ['80h', '0x80', '80', '10000000', '10000000b'], displayAnswer: '80h (0x80)' },
        { label: 'b) Valor en DLL (3F8h, byte menos significativo)', placeholder: 'Ej: 80h', accepted: ['80h', '0x80', '80', '10000000', '10000000b'], displayAnswer: '80h (0x80)' },
        { label: 'c) Valor en DLM / DLH (3F9h, byte más significativo)', placeholder: 'Ej: 01h', accepted: ['01h', '0x01', '01', '1', '1h', '00000001', '00000001b'], displayAnswer: '01h (0x01)' }
      ],
      explanation: '1) Para acceder a DLL y DLM hay que poner el bit 7 de LCR (DLAB) en 1 → 1000 0000₂ = 80h en 3FBh.\n2) Divisor = 115.200 / 300 = 384₁₀. Pasando 384 a hexadecimal de 16 bits: 384 = 256 + 128 = 0180h.\n3) En little-endian por registros: byte bajo DLL (3F8h) = 80h y byte alto DLM (3F9h) = 01h.'
    },
    {
      id: 'uart_ex_3',
      category: 'Registros UART',
      exam: 'MCR — Control de Módem y Loopback',
      points: 10,
      type: 'text',
      prompt: 'Ejercicio 3 (Registro MCR): Se desea configurar el registro MCR (Modem Control Register, 3FCh en COM1) para activar las líneas DTR y RTS, activar la salida auxiliar OUT2 (necesaria en la PC para habilitar el paso de interrupciones hacia el PIC 8259), mantener OUT1 desactivada y habilitar el modo LOOP (autoprueba en bucle local). Complete con el valor binario de 8 bits (o hexadecimal) que debe escribirse en MCR.',
      placeholder: 'Ej: 00011011 (o 1Bh)',
      accepted: ['00011011', '00011011b', '0001 1011', '1b', '1bh', '0x1b', '27'],
      displayAnswer: '00011011 (1Bh / 0x1B)',
      explanation: 'En el registro MCR: bit 0 (DTR)=1, bit 1 (RTS)=1, bit 2 (OUT1)=0, bit 3 (OUT2)=1, bit 4 (LOOP)=1 y bits 7..5=000 → 0001 1011₂ = 1Bh.'
    },
    {
      id: 'uart_ex_4',
      category: 'Registros UART',
      exam: 'IER — Habilitación de Interrupciones',
      points: 10,
      type: 'text',
      prompt: 'Ejercicio 4 (Registro IER): Habiendo puesto DLAB = 0 en LCR, se desea programar el registro IER (Interrupt Enable Register, puerto 3F9h en COM1) para habilitar únicamente las interrupciones por "Dato Recibido Disponible" y por "Error / Estado de Línea Receptora", dejando deshabilitadas las de "THR vacío" y "Estado del Módem". Complete con el valor hexadecimal (o binario de 8 bits) a cargar en IER.',
      placeholder: 'Ej: 05h (o 00000101b)',
      accepted: ['05', '05h', '0x05', '5', '5h', '00000101', '00000101b', '0000 0101'],
      displayAnswer: '05h (0x05 / 00000101b)',
      explanation: 'Bits del registro IER: bit 0 (Dato recibido disponible)=1, bit 1 (THR vacío)=0, bit 2 (Error/Estado de línea receptora)=1, bit 3 (Estado del módem)=0, bits 7..4=0000 → 0000 0101₂ = 05h.'
    },
    {
      id: 'uart_ex_5',
      category: 'Registros UART',
      exam: 'IIR — Identificación de Interrupción',
      points: 10,
      type: 'single',
      prompt: 'Ejercicio 5 (Registro IIR): En una rutina de atención de interrupción para COM1, la CPU ejecuta IN AL, DX sobre el puerto 3FAh (registro IIR, solo lectura) y obtiene el valor AL = 04h (0000 0100b). ¿Qué indica exactamente este registro?',
      options: [
        'a) No hay interrupciones pendientes en la UART porque el bit 2 está en 1.',
        'b) Hay una interrupción pendiente de prioridad Nivel 2 por Dato Recibido Disponible (carácter listo en RBR).',
        'c) Hay una interrupción pendiente porque el registro transmisor THR quedó vacío.',
        'd) Hay una interrupción pendiente de máxima prioridad por error de paridad o trama en LSR.',
        'e) Hay una interrupción pendiente por cambio en las señales CTS/DSR del módem (MSR).'
      ],
      answer: 1,
      explanation: '¡Atención a la lógica negativa del bit 0 en IIR! Bit 0 = 0 significa que SÍ hay una interrupción pendiente. Los bits 2..1 valen 10₂ (04h = 0000 0100₂), código que identifica la interrupción de Nivel 2: Dato Recibido Disponible (se limpia leyendo RBR). (06h sería error LSR, 02h sería THR vacío, 00h sería estado del módem y 01h sin interrupciones).'
    },
    {
      id: 'uart_ex_6',
      category: 'Registros UART',
      exam: 'FCR — Control de Colas FIFO (16550A)',
      points: 10,
      type: 'text',
      prompt: 'Ejercicio 6 (Registro FCR): En una UART 16550A, al escribir en el puerto 3FAh (offset +2) se configura el registro FCR (FIFO Control Register). Calcule el valor hexadecimal (o binario de 8 bits) necesario para: habilitar ambas FIFOs, limpiar/vaciar tanto la FIFO de recepción como la de transmisión, dejar el modo DMA en 0 y fijar el nivel de disparo (Trigger Level, bits 7..6) en 8 bytes (código 10₂).',
      placeholder: 'Ej: 87h (o 10000111b)',
      accepted: ['87h', '0x87', '87', '10000111', '10000111b', '1000 0111', '135'],
      displayAnswer: '87h (0x87 / 10000111b)',
      explanation: 'Bits del registro FCR: bits 7..6 (Trigger 8 bytes)=10, bits 5..4 (reservados)=00, bit 3 (DMA)=0, bit 2 (Reset FIFO TX)=1, bit 1 (Reset FIFO RX)=1, bit 0 (Habilitar FIFOs)=1 → 1000 0111₂ = 87h.'
    },
    {
      id: 'uart_ex_7',
      category: 'Registros UART',
      exam: 'RBR, THR y LSR — Eco por Sondeo en Assembler',
      points: 10,
      type: 'blanks',
      prompt: 'Ejercicio 7 (Registros RBR, THR y LSR): La siguiente rutina en Assembler (con DLAB = 0 previamente configurado) espera recibir un carácter por COM1 y lo retransmite inmediatamente (eco). Complete las tres incógnitas:',
      mediaHtml: ASM_SONDEO_UART,
      fields: [
        { label: 'a) Sigla del registro leído con IN AL, DX en 3F8h (DLAB=0)', placeholder: 'Ej: RBR', accepted: ['rbr', 'registro rbr', 'receiver buffer register'], displayAnswer: 'RBR (Receiver Buffer Register)' },
        { label: 'b) Máscara hexadecimal en 3FDh (LSR) para aislar el bit 5 (THRE)', placeholder: 'Ej: 20h', accepted: ['20h', '0x20', '20', '00100000b', '00100000'], displayAnswer: '20h (0x20 / 00100000b)' },
        { label: 'c) Sigla del registro escrito con OUT DX, AL en 3F8h (DLAB=0)', placeholder: 'Ej: THR', accepted: ['thr', 'registro thr', 'transmitter holding register'], displayAnswer: 'THR (Transmitter Holding Register)' }
      ],
      explanation: 'Con DLAB=0, el puerto base 3F8h es de doble función: al leer (`IN`) se accede a RBR (carácter recibido) y al escribir (`OUT`) se accede a THR (carácter a enviar). En LSR (3FDh), el bit 0 es DR (01h) y el bit 5 es THRE (2^5 = 32₁₀ = 20h), que vale 1 cuando THR está listo para recibir un nuevo byte.'
    },
    {
      id: 'uart_ex_8',
      category: 'Registros UART',
      exam: 'LSR — Diagnóstico de Errores de Recepción',
      points: 10,
      type: 'single',
      prompt: 'Ejercicio 8 (Registro LSR): Al leer el registro de estado de línea LSR (puerto 3FDh en COM1), la CPU recibe el byte 66h (0110 0110b). ¿Cuál es el diagnóstico exacto según los bits de LSR?',
      options: [
        'a) Hay un carácter listo para leer en RBR (DR=1), sin errores, y el transmisor está ocupado.',
        'b) No hay carácter nuevo disponible (DR=0), ocurrieron errores de sobreescritura (Overrun, OE=1) y de paridad (PE=1), y el transmisor (THR y TSR) está completamente vacío.',
        'c) Hay carácter disponible (DR=1) con error de trama (Framing Error, FE=1) y condición de Break (BI=1).',
        'd) Ocurrió un error en la cola FIFO receptora (bit 7 = 1) y el registro THR está lleno.'
      ],
      answer: 1,
      explanation: 'Desglosando 66h = 0110 0110₂ bit a bit en LSR: b0(DR)=0 (sin dato listo), b1(OE)=1 (Overrun Error), b2(PE)=1 (Parity Error), b3(FE)=0, b4(BI)=0, b5(THRE)=1 (THR vacío), b6(TEMT)=1 (THR y TSR vacíos) y b7=0 → opción b.'
    },
    {
      id: 'uart_ex_9',
      category: 'Registros UART',
      exam: 'MSR — Estado de Señales del Módem y Deltas',
      points: 10,
      type: 'blanks',
      prompt: 'Ejercicio 9 (Registro MSR): Un driver lee el registro MSR (Modem Status Register, offset +6 → puerto 3FEh en COM1) y obtiene el valor B1h (1011 0001b). Responda:',
      fields: [
        { label: 'a) Máscara hexadecimal para verificar simultáneamente si CTS (bit 4) y DSR (bit 5) están en 1', placeholder: 'Ej: 30h', accepted: ['30h', '0x30', '30', '00110000b', '00110000'], displayAnswer: '30h (0x30 / 00110000b)' },
        { label: 'b) Sigla de la línea cuya bandera de cambio (Delta, bits 3..0) vale 1 en B1h', placeholder: 'Ej: CTS (o DCTS)', accepted: ['cts', 'dcts', 'delta cts'], displayAnswer: 'CTS (bit 0 = DCTS = 1)' },
        { label: 'c) Según B1h, ¿está activa la detección de portadora DCD (bit 7)? (Sí / No)', options: ['Sí', 'No'], accepted: ['si', 'sí'], displayAnswer: 'Sí (bit 7 = 1)' }
      ],
      explanation: 'En MSR (1011 0001₂ = B1h): b7(DCD)=1 (hay portadora → Sí), b6(RI)=0, b5(DSR)=1, b4(CTS)=1 (máscara de b5 y b4 = 0011 0000₂ = 30h), b3(ΔDCD)=0, b2(TERI)=0, b1(ΔDSR)=0 y b0(ΔCTS)=1 (cambió la línea CTS desde la última lectura).'
    },
    {
      id: 'uart_ex_10',
      category: 'Registros UART',
      exam: 'Mapa Completo de Puertos COM2, Multiplexación DLAB y SCR',
      points: 10,
      type: 'blanks',
      prompt: 'Ejercicio 10 (Mapa completo de registros + SCR): Considere la controladora UART del puerto serie COM2, cuya dirección base de E/S es 2F8h. Complete en cada caso:',
      fields: [
        { label: 'a) Dirección hexadecimal del registro LCR en COM2 (base + 3)', placeholder: 'Ej: 2FBh', accepted: ['2fb', '2fbh', '0x2fb'], displayAnswer: '2FBh (0x2FB)' },
        { label: 'b) Dirección hexadecimal del registro temporal SCR (Scratchpad, base + 7) en COM2', placeholder: 'Ej: 2FFh', accepted: ['2ff', '2ffh', '0x2ff'], displayAnswer: '2FFh (0x2FF)' },
        { label: 'c) Si en 2FBh se escribió 03h (DLAB=0) y se ejecuta IN AL, DX con DX=2F9h, ¿qué sigla de registro se lee?', placeholder: 'Ej: IER', accepted: ['ier', 'registro ier', 'interrupt enable register'], displayAnswer: 'IER (Interrupt Enable Register)' }
      ],
      explanation: 'Partiendo de COM2 = 2F8h:\na) LCR está en base + 3 → 2F8h + 3 = 2FBh.\nb) SCR (Scratchpad Register, byte temporal de lectura/escritura libre en 16450/16550) está en base + 7 → 2F8h + 7 = 2FFh.\nc) Al escribir 03h en LCR (0000 0011₂), el bit 7 vale DLAB = 0; por lo tanto, el puerto base + 1 (2F9h) apunta al registro IER (y NO a DLM).'
    }
  ];
})();
