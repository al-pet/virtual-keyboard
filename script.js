let altKey = 0;
let shiftKey = 0;
let keySet;
let eventCode;
let currentKey;

const Keyboard = {
  units: {
    main: null,
    keysWrapper: null,
    keys: [],
  },

  eventHandler: {
    oninput: null,
  },

  features: {
    value: '',
    lang: '',
    caps: false,
  },

  start() {
    this.features.lang = window.localStorage.getItem('lang') || 'en';
    this.units.main = document.createElement('div');
    this.units.keysWrapper = document.createElement('div');

    this.units.main.classList.add('keyboard');
    this.units.keysWrapper.classList.add('keyboard__keys');
    this.units.keysWrapper.appendChild(this.createKeys());

    this.units.keys = this.units.keysWrapper.querySelectorAll('.keyboard__key');

    this.units.main.appendChild(this.units.keysWrapper);
    document.body.appendChild(this.units.main);

    document.querySelectorAll('.keyboard-input').forEach((element) => {
      this.open(element.value, (currentValue) => {
        /* eslint-disable-next-line */
        element.value = currentValue;
      });
    });

    for (let i = 0; i < keySet.length; i += 1) {
      const b = document.querySelectorAll('button')[i];
      b.setAttribute('data-code', eventCode[i]);
    }
  },

  stop() {
    this.units.main.remove();
  },

  createKeys() {
    const fragment = document.createDocumentFragment();
    if (this.features.lang === 'en') {
      keySet = [
        '~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
        'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'del',
        'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'enter',
        'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?', 'up', 'shift',
        'ctrl', 'alt', 'space', 'alt', 'left', 'down', 'right', 'ctrl',
      ];
    }
    if (this.features.lang === 'ru') {
      if (shiftKey === 0) {
        keySet = [
          'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
          'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'del',
          'caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
          'shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'up', 'shift',
          'ctrl', 'alt', 'space', 'alt', 'left', 'down', 'right', 'ctrl',
        ];
      } else {
        keySet = [
          'Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'backspace',
          'tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', 'del',
          'caps', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'enter',
          'shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', 'up', 'shift',
          'ctrl', 'alt', 'space', 'alt', 'left', 'down', 'right', 'ctrl',
        ];
      }
    }

    eventCode = [
      'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
      'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Delete',
      'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
      'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
      'ControlLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight',
    ];

    keySet.forEach((key) => {
      const keyElement = document.createElement('button');

      keyElement.classList.add('keyboard__key');
      const txta = document.querySelector('.keyboard-input');

      switch (key) {
        case 'backspace':
          keyElement.classList.add('keyboard__key-large');
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener('click', () => {
            const pos = txta.selectionStart;
            this.features.value = this.features.value.substring(0, pos - 1)
              + this.features.value.substring(pos, this.features.value.length);
            this.triggerEvent('oninput');
            txta.focus();
            txta.setSelectionRange(pos - 1, pos - 1);
          });

          document.addEventListener('keyup', (event) => {
            const pos = txta.selectionStart;
            event.preventDefault();
            if (event.key === 'Backspace') {
              this.features.value = this.features.value.substring(0, pos)
                + this.features.value.substring(pos + 1, this.features.value.length);
              this.triggerEvent('oninput');
              txta.focus();
              txta.setSelectionRange(pos, pos);
            }
          });

          break;

        case 'caps':
          keyElement.textContent = key.toLowerCase();
          keyElement.classList.add('keyboard__key-large');

          keyElement.addEventListener('click', () => {
            const pos = txta.selectionStart;
            this.togglecaps();
            txta.focus();
            txta.setSelectionRange(pos, pos);
          });

          document.addEventListener('keyup', (event) => {
            const pos = txta.selectionStart;
            event.preventDefault();
            if (event.key === 'CapsLock') {
              this.togglecaps();
              txta.focus();
              txta.setSelectionRange(pos, pos);
            }
          });

          break;

        case 'enter':
          keyElement.textContent = key.toLowerCase();
          keyElement.classList.add('keyboard__key-large');

          keyElement.addEventListener('click', () => {
            this.features.value += '\n';
            this.triggerEvent('oninput');
            txta.focus();
            txta.setSelectionRange(txta.value.length, txta.value.length);
          });

          break;

        case 'tab':
          keyElement.textContent = key.toLowerCase();

          keyElement.classList.add('keyboard__key-large');

          keyElement.addEventListener('click', () => {
            const pos = txta.selectionStart;
            this.features.value = `${this.features.value.substring(0, pos)
            }    ${this.features.value.substring(pos, this.features.value.length)}`;
            this.triggerEvent('oninput');
            txta.focus();
            txta.setSelectionRange(pos + 4, pos + 4);
          });

          document.addEventListener('keyup', (event) => {
            const pos = txta.selectionStart;
            event.preventDefault();
            if (event.key === 'Tab') {
              this.features.value = `${this.features.value.substring(0, pos)
              }    ${this.features.value.substring(pos, this.features.value.length)}`;
              this.triggerEvent('oninput');
              txta.focus();
              txta.setSelectionRange(pos + 4, pos + 4);
            }
          });

          break;

        case 'shift':
          keyElement.textContent = key.toLowerCase();
          keyElement.classList.add('keyboard__key-large');

          keyElement.addEventListener('click', () => {
            const position = txta.selectionStart;
            if (altKey === 1) {
              localStorage.lang = localStorage.lang === 'ru' ? localStorage.lang = 'en' : localStorage.lang = 'ru';
              Keyboard.stop();
              Keyboard.start();
              altKey = 0;
              txta.focus();
              txta.setSelectionRange(txta.value.length, txta.value.length);
            } else if (shiftKey === 0) {
              shiftKey = 1;
              // Keyboard.stop();
              // Keyboard.start();
              this.togglecaps();
              // keyElement.classList.add('active');
            } else {
              shiftKey = 0;
              // keyElement.classList.remove('active');
              // Keyboard.stop();
              // Keyboard.start();
              this.togglecaps();
            }
            txta.focus();
            txta.setSelectionRange(position, position);
          });

          break;

        case 'up':
          keyElement.textContent = '↑';

          keyElement.addEventListener('click', () => {
            this.features.value += '↑';
            this.triggerEvent('oninput');
            txta.focus();
            txta.setSelectionRange(txta.value.length, txta.value.length);
          });

          break;

        case 'down':
          keyElement.textContent = '↓';

          keyElement.addEventListener('click', () => {
            this.features.value += '↓';
            this.triggerEvent('oninput');
            txta.focus();
            txta.setSelectionRange(txta.value.length, txta.value.length);
          });

          break;

        case 'left':
          keyElement.textContent = '⟵';

          keyElement.addEventListener('click', () => {
            this.features.value += '⟵';
            this.triggerEvent('oninput');
            txta.focus();
            txta.setSelectionRange(txta.value.length, txta.value.length);
          });

          break;

        case 'right':
          keyElement.textContent = '⟶';

          keyElement.addEventListener('click', () => {
            this.features.value += '⟶';
            this.triggerEvent('oninput');
            txta.focus();
            txta.setSelectionRange(txta.value.length, txta.value.length);
          });

          break;

        case 'space':
          keyElement.textContent = ' ';
          keyElement.classList.add('keyboard__key-long');

          keyElement.addEventListener('click', () => {
            const pos = txta.selectionStart;
            this.features.value = `${this.features.value.substring(0, pos)
            } ${this.features.value.substring(pos, this.features.value.length)}`;
            this.triggerEvent('oninput');
            txta.focus();
            txta.setSelectionRange(pos + 1, pos + 1);
          });

          document.addEventListener('keyup', (event) => {
            const pos = txta.selectionStart;
            event.preventDefault();
            if (event.key === ' ') {
              this.features.value = `${this.features.value.substring(0, pos - 1)
              } ${this.features.value.substring(pos - 1, this.features.value.length)}`;
              this.triggerEvent('oninput');
              txta.focus();
              txta.setSelectionRange(pos, pos);
            }
          });

          break;

        case 'ctrl':
          keyElement.textContent = 'ctrl';

          keyElement.addEventListener('click', () => {
            this.features.value += '';
            this.triggerEvent('oninput');
            txta.focus();
            txta.setSelectionRange(txta.value.length, txta.value.length);
          });

          break;

        case 'alt':
          keyElement.textContent = 'alt';

          keyElement.addEventListener('click', () => {
            this.features.value += '';
            altKey = altKey === 0 ? 1 : 0;
            if (altKey === 1) {
              keyElement.classList.add('active');
            } else {
              keyElement.classList.remove('active');
            }

            this.triggerEvent('oninput');
            txta.focus();
            txta.setSelectionRange(txta.value.length, txta.value.length);
          });

          break;

        case 'del':
          keyElement.textContent = 'del';
          keyElement.addEventListener('click', () => {
            const pos = txta.selectionStart;
            this.features.value = this.features.value.substring(0, pos)
              + this.features.value.substring(pos + 1, this.features.value.length);
            this.triggerEvent('oninput');
            txta.focus();
            txta.setSelectionRange(pos, pos);
          });

          document.addEventListener('keyup', (event) => {
            const pos = txta.selectionStart;
            event.preventDefault();
            if (event.key === 'Delete') {
              this.features.value = this.features.value.substring(0, pos)
                + this.features.value.substring(pos + 1, this.features.value.length);
              this.triggerEvent('oninput');
              txta.focus();
              txta.setSelectionRange(pos, pos);
            }
          });

          break;

        default:

          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener('click', () => {
            const pos = txta.selectionStart;
            const addSymbol = this.features.caps ? key.toUpperCase() : key.toLowerCase();
            this.features.value = this.features.value.substring(0, pos)
              + addSymbol + this.features.value.substring(pos, this.features.value.length);
            this.triggerEvent('oninput');
            txta.focus();
            txta.setSelectionRange(pos + 1, pos + 1);
          });

          document.addEventListener('keyup', (event) => {
            const pos = txta.selectionStart;
            event.preventDefault();
            currentKey = document.querySelector(`button[data-code=${event.code}]`).textContent.toLowerCase();
            if (currentKey === key) {
              this.features.value = this.features.value.substring(0, pos - 1)
                + event.key + this.features.value.substring(pos - 1, this.features.value.length);
              this.triggerEvent('oninput');
              txta.focus();
              txta.setSelectionRange(pos, pos);
            }
          });

          break;
      }

      fragment.appendChild(keyElement);
    });
    return fragment;
  },

  triggerEvent(handlerName) {
    if (typeof this.eventHandler[handlerName] === 'function') {
      this.eventHandler[handlerName](this.features.value);
    }
  },

  togglecaps() {
    this.features.caps = !this.features.caps;

    /* eslint-disable-next-line */
    for (const key of this.units.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.features.caps
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    }
  },

  open(initialValue, oninput) {
    this.features.value = initialValue || '';
    this.eventHandler.oninput = oninput;
  },

};

window.addEventListener('DOMContentLoaded', () => {
  const note = document.createElement('p');
  note.innerHTML = 'Смена раскладки: [alt] + [shift]. Выполнено на Windows 11.';
  document.body.append(note);
  const textArea = document.createElement('textarea');
  textArea.className = 'keyboard-input';
  textArea.autofocus = true;
  document.body.append(textArea);

  Keyboard.start();
});

document.addEventListener('keydown', (event) => {
  if (document.querySelector(`button[data-code=${event.code}]`)) {
    document.querySelector(`button[data-code=${event.code}]`).classList.add('active');

    if (event.key === 'Shift' && event.altKey) {
      localStorage.lang = localStorage.lang === 'ru' ? localStorage.lang = 'en' : localStorage.lang = 'ru';

      Keyboard.stop();
      Keyboard.start();
    }
  }
});

document.addEventListener('keyup', (event) => {
  if (document.querySelector(`button[data-code=${event.code}]`)) {
    document.querySelector(`button[data-code=${event.code}]`).classList.remove('active');
  }
});
