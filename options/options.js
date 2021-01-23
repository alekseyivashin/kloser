function save_options() {
    const element = document.getElementById('default-tab');
    const option = element.options[element.selectedIndex].value;
    let site = document.getElementById('site-input').value;
    const closePinned = document.getElementById("close-pinned").checked;
    if (option === "chrome") {
        site = "";
    } else {
        if (!isCorrectUrl(site)) {
            document.getElementById('site-input').value = "";
            document.getElementById('site-input').placeholder = "Please follow the pattern (google.com)";
            return;
        }
    }
    chrome.storage.sync.set({
        defaultTab: option,
        site: site,
        closePinned: closePinned
    }, function () {
        const saveButton = document.getElementById('save');
        saveButton.style.background = "#e04f5f";
        setTimeout(function () {
            saveButton.style.background = "transparent";
        }, 1000);
    });
}

function restore_options() {
    chrome.storage.sync.get({
        defaultTab: "chrome",
        site: "",
        closePinned: false
    }, function (items) {
        const element = document.getElementById('default-tab');
        document.getElementById('site-input').value = items.site;
        document.getElementById('close-pinned').checked = items.closePinned;
        const option = items.defaultTab;
        for (let i = 0; i < element.options.length; i++) {
            if (element.options[i].value === option) {
                element.selectedIndex = i;
                break;
            }
        }
        changeSelectStatement();
    });
}

function changeSelectStatement() {
    const element = document.getElementById("default-tab");
    const option = element.options[element.selectedIndex].value;
    const caption = document.getElementById("site-caption");
    const input = document.getElementById("site-input");
    switch (option) {
        case "chrome":
            caption.style.display = "none";
            input.style.display = "none";
            break;
        case "another":
            caption.style.display = "block";
            input.style.display = "block";
            break;
    }
}

function isCorrectUrl(url) {
    const expression = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.][a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g;
    return url.match(new RegExp(expression));
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
