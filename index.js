const sirena = new Audio('./sirena.mp3');
let iframe;

try {
    iframeLinkDecoded = atob(iframeLink);
} catch (e) {
    iframeLinkDecoded = iframeLink;
}

try {
    unlockPinDecoded = atob(unlockPin);
} catch (e) {
    unlockPinDecoded = unlockPin;
}

window.onload = function () {

    iframe = document.getElementById("gform");
    iframe.style.height = window.innerHeight + 'px';
    iframe.style.width = window.innerWidth + 'px';
    iframe.height = window.innerHeight;
    iframe.width = window.innerWidth;

    iframe.src = iframeLinkDecoded;

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

window.onresize = function () {
    const iframe = document.getElementById("gform");

    iframe.style.height = window.innerHeight + 'px';
    iframe.style.width = window.innerWidth + 'px';
    iframe.height = window.innerHeight;
    iframe.width = window.innerWidth;
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
    // console.log("out")
    localStorage.setItem("blocked", true);
    document.getElementById("msg1").innerText = "Ah cazzone, ti sei fatto fregare";
    sirena.play();
    showModal();
});

document.addEventListener("mouseenter", () => {
    // console.log("in")
});

window.oncontextmenu = function () {
    return false;
};

document.addEventListener("keydown", function (event) {
    const key = event.key || event.keyCode;

    if ((key == "F12") || (key == 123) || (key == "Dead") || (key == 73) || (key == 74) || (key == "∆")) {
        // console.log(key);
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
    iframe.src = "";
    const modalContainer = document.getElementById("modal-container");
    modalContainer.style.display = "block";
}

function hideModal() {
    const modalContainer = document.getElementById("modal-container");
    iframe.src = iframeLinkDecoded;
    modalContainer.style.display = "none";
    sirena.pause();
    localStorage.setItem("blocked", false);
}

function isPinValid(pin) {
    /* const now = new Date();
    const min = now.getMinutes();
    const hours = now.getHours();
    return pin === ("" + (hours < 10 ? "0" + hours : hours) + (min < 10 ? "0" + min : min)); */
    return pin === unlockPinDecoded;
}