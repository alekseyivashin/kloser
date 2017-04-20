chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.storage.sync.get({
        defaultTab: "chrome",
        site: "",
        closePinned: false
    }, function (items) {
        chrome.tabs.getAllInWindow(null, function (tabs) {
            tabs.forEach(function (tab, i) {
                console.log(items.closePinned);
                if (!tab.pinned || items.closePinned) {
                    chrome.tabs.remove(tab.id);
                }
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