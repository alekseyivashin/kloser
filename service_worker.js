chrome.action.onClicked.addListener((currentTab) => {
    chrome.storage.sync.get({
        defaultTab: "chrome",
        site: "",
        closePinned: false,
        groupOnly: true,
    }, (items) => {
        const query = getTabsQuery(currentTab, items);
        closeAllTabs(items, query);
    });
});

const getTabsQuery = ({ groupId, windowId }, items) => {
    const query = {
        windowId: windowId,
    }
    if (items.groupOnly) {
        query.groupId = groupId;
    }
    return query;
}

const closeAllTabs = (items, query) => {
    chrome.tabs.query(query, (tabs) => {
        const tabIdsForRemove = tabs
            .filter(tab => !tab.pinned || items.closePinned)
            .map(tab => tab.id);
        openDefaultTab(items);
        chrome.tabs.remove(tabIdsForRemove);
    });
};

const openDefaultTab = (items) => {
    if (items.site === "") {
        chrome.tabs.create({});
    } else {
        chrome.tabs.create({"url": items.site});
    }
};
