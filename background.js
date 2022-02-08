const DEFAULT_BLACKLIST = [
    "totalpad.com",
    "kvfan.net",
    "hgk.biz",
    "delgets.com",	
]

chrome.tabs.onUpdated.addListener((id, change, tab) => {
    chrome.storage.sync.get(['blacklist_sites'], function (sites) {
        if(Object.keys(sites).length === 0) {
            chrome.storage.sync.set({ 'blacklist_sites': JSON.stringify(DEFAULT_BLACKLIST) });
            chrome.tabs.sendMessage(id, JSON.stringify(DEFAULT_BLACKLIST));
        }
        else{
            chrome.tabs.sendMessage(id, sites['blacklist_sites']);
        }
    }); 
});