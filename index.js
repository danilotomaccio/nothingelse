window.onload = function () {
    if (localStorage.getItem("blocked") && localStorage.getItem("blocked") == "true") {
        document.getElementById("msg1").innerText = "Hai pure provato ad aggiornare la pagina?! Complimenti!"
        showModal();
    }

    const pinInputs = document.querySelectorAll("#pin input");

    for (const pinInput of pinInputs) {
        pinInput.addEventListener('input', function (event) {
            if (event.target.value.length === event.target.maxLength) {
                const nextDigit = pinInput.nextElementSibling;
                if (nextDigit) {
                    nextDigit.focus();
                } else {
                    checkPin(pinInputs);
                }
            }
        });

        pinInput.addEventListener('keydown', function (event) {
            if (event.key === 'Backspace' && event.target.value === '') {
                const previousDigit = pinInput.previousElementSibling;
                if (previousDigit) {
                    previousDigit.focus();
                }
            }
        });

        pinInput.addEventListener('paste', function (event) {
            event.preventDefault();
            const paste = (event.clipboardData || window.clipboardData).getData('text');
            if (paste.length !== 4) {
                return;
            }
            for (let i = 0; i < pinInputs.length; i++) {
                pinInputs[i].value = paste[i];
                checkPin(pinInputs);
            }
        });
    }
}

function checkPin(pinInputs) {
    let password = "";
    for (let i = 0; i < pinInputs.length; i++) {
        password += pinInputs[i].value;
    }
    if (password.length === 4 && !isNaN(password)) {
        if (isPinValid(password)) {
            hideModal();
            for (let i = 0; i < pinInputs.length; i++) {
                pinInputs[i].value = "";
            }
        }
    }
}

document.addEventListener("mouseleave", () => {
    localStorage.setItem("blocked", true);
    showModal();
});

document.addEventListener("mouseenter", () => {
    console.log("in")
});

window.oncontextmenu = function () {
    return false;
};

document.addEventListener("keydown", function (event) {
    const key = event.key || event.keyCode;

    if ((key == "F12") || (key == 123) || (key == "Dead") || (key == 73)) {
        console.log(key);
        event.preventDefault();
        return false;
    } else if ((event.ctrlKey && event.shiftKey && key == 73) || (event.ctrlKey && event.shiftKey && key == 74)) {
        event.preventDefault();
        return false;
    }
}, false);

document.addEventListener("copy", function (event) {
    event.preventDefault();
});

function showModal() {
    const modalContainer = document.getElementById("modal-container");
    modalContainer.style.display = "block";
}

function hideModal() {
    const modalContainer = document.getElementById("modal-container");
    modalContainer.style.display = "none";
}

function isPinValid(pin) {
    const now = new Date();
    return pin === ("" + now.getHours() + (now.getMinutes()));
}