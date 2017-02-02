chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.getAllInWindow(null, function(tabs) {
        tabs.forEach(function(tab, i) {
            chrome.tabs.remove(tab.id);
        });
    });
    chrome.tabs.create({});
});