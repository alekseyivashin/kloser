chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.storage.sync.get({
        defaultTab: "chrome",
        site: ""
    }, function (items) {
        chrome.tabs.getAllInWindow(null, function (tabs) {
            tabs.forEach(function (tab, i) {
                chrome.tabs.remove(tab.id);
            });
        });
        if (items.site == "") {
            chrome.tabs.create({});
        } else {
            var url = "http://" + items.site;
            chrome.tabs.create({"url": url});
        }
    });

});