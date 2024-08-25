document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('inputField');
    const keys = document.querySelectorAll('.key');

    keys.forEach(key => {
        key.addEventListener('mousedown', () => {
            const keyValue = key.dataset.key;
            handleKeyPress(keyValue);
            key.classList.add('active');
        });

        key.addEventListener('mouseup', () => {
            key.classList.remove('active');
        });

        key.addEventListener('mouseleave', () => {
            key.classList.remove('active');
        });
    });

    function handleKeyPress(keyValue) {
        let currentValue = inputField.value;

        switch (keyValue) {
            case 'Backspace':
                inputField.value = currentValue.slice(0, -1);
                break;
            case 'Tab':
                inputField.value += '    ';
                break;
            case 'Enter':
                inputField.value += '\n';
                break;
            case 'Space':
                inputField.value += ' ';
                break;
            case 'CapsLock':
                toggleCapsLock();
                break;
            default:
                if (keyValue.length === 1) {
                    if (capsLockActive) {
                        inputField.value += keyValue.toUpperCase();
                    } else {
                        inputField.value += keyValue.toLowerCase();
                    }
                }
                break;
        }
    }

    let capsLockActive = false;

    function toggleCapsLock() {
        capsLockActive = !capsLockActive;
        keys.forEach(key => {
            if (key.dataset.key.length === 1) {
                key.textContent = capsLockActive ? key.dataset.key.toUpperCase() : key.dataset.key.toLowerCase();
            }
        });
    }

    document.addEventListener('keydown', (event) => {
        const key = document.querySelector(`.key[data-key="${event.code}"]`);
        if (key) {
            handleKeyPress(event.code);
            key.classList.add('active');
        }
    });

    document.addEventListener('keyup', (event) => {
        const key = document.querySelector(`.key[data-key="${event.code}"]`);
        if (key) {
            key.classList.remove('active');
        }
    });
});
