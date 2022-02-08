const DEFAULT_BLACKLIST = [
  "totalpad.com",
  "kvfan.net",
  "hgk.biz",
  "delgets.com",	
]


const renderList = () => {
  chrome.storage.sync.get(['blacklist_sites'], function (sites) {
    const blacklist = JSON.parse(sites['blacklist_sites']);
    $('.url-list').empty();
    blacklist.map((item, index) => {
      $('.url-list').append(
        `<div id="item-${index}" class="list-item">` +
        `<div>${item}</div>` +
        `<button class = "close-btn" id="btn-${index}"> X </button>` +
        `</div>`
      );
      $(`#btn-${index}`).click(() => removeSite(item));
    })
  });

  $(".rst-btn").click(() => resetSites());

  $(".add-btn").click(() => addSite($("input").val()));
}

const removeSite = (item) => {
  chrome.storage.sync.get(['blacklist_sites'], function (sites) {
    const blacklist = JSON.parse(sites['blacklist_sites']);
    const newList = blacklist.filter(x => x != item)
    chrome.storage.sync.set({ 'blacklist_sites': JSON.stringify(newList) });
    renderList();
  })
}

const addSite = (item) => {
  if (item.length > 0) {
    $("input").val('');
    chrome.storage.sync.get(['blacklist_sites'], function (sites) {
      let blacklist = JSON.parse(sites['blacklist_sites']);
      blacklist.push(item);
      chrome.storage.sync.set({ 'blacklist_sites': JSON.stringify(blacklist) });
      renderList();
    })
  }
}

const resetSites = () => {
  chrome.storage.sync.set({ 'blacklist_sites': JSON.stringify(DEFAULT_BLACKLIST) });
  renderList();
}

$(document).ready(() => renderList())

