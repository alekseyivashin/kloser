function save_options() {
    var defaultTabElement = document.getElementById('default-tab');
    var defaultTabOption = defaultTabElement.options[defaultTabElement.selectedIndex].value;
    chrome.storage.sync.set({
        defaultTab: defaultTabOption
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}

function restore_options() {
    chrome.storage.sync.get({
        defaultTab: "chrome"
    }, function (items) {
        var defaultTabElement = document.getElementById('default-tab');
        var defaultTabOption = items.defaultTab;
        for (var i = 0; i < defaultTabElement.options.length; i++) {
            if (defaultTabElement.options[i].value === defaultTabOption) {
                defaultTabElement.selectedIndex = i;
                break;
            }
        }
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);