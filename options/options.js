function save_options() {
    var element = document.getElementById('default-tab');
    var option = element.options[element.selectedIndex].value;
    chrome.storage.sync.set({
        defaultTab: option
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
        defaultTab: "chrome"
    }, function (items) {
        var element = document.getElementById('default-tab');
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
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);