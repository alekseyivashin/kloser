function save_options() {
    var element = document.getElementById('default-tab');
    var option = element.options[element.selectedIndex].value;
    var site = document.getElementById('site-input').value;
    if (option == "chrome") {
        site = "";
    } else {
        if (!isCorrectUrl(site)) {
            document.getElementById('site-input').value = "";
            document.getElementById('site-input').placeholder = "Please follow the pattern (www.google.com)";
            return;
        }
    }
    chrome.storage.sync.set({
        defaultTab: option,
        site: site
    }, function () {
        var saveButton = document.getElementById('save');
        saveButton.style.background = "#c4ffd0";
        setTimeout(function () {
            saveButton.style.background = "transparent";
        }, 1000);
    });
}

function restore_options() {
    chrome.storage.sync.get({
        defaultTab: "chrome",
        site: ""
    }, function (items) {
        var element = document.getElementById('default-tab');
        document.getElementById('site-input').value = items.site;
        var option = items.defaultTab;
        for (var i = 0; i < element.options.length; i++) {
            if (element.options[i].value === option) {
                element.selectedIndex = i;
                break;
            }
        }
        changeSelectStatement();
    });
}

function changeSelectStatement() {
    var element = document.getElementById("default-tab");
    var option = element.options[element.selectedIndex].value;
    var caption = document.getElementById("site-caption");
    var input = document.getElementById("site-input");
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
    var expression = /^(www\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])$/i;
    var regex = new RegExp(expression);

    return url.match(regex);
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);