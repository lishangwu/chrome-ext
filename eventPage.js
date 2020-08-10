let contextMenuItem = {
    id: 'spendMoney',
    title: 'SpendMoney_title',
    contexts: ['selection']
}

chrome.contextMenus.create(contextMenuItem)

function isInt(value) {
    return !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10))
}

chrome.contextMenus.onClicked.addListener((clickData) => {
    if (clickData.menuItemId == 'spendMoney' && clickData.selectionText) {
        if (isInt(clickData.selectionText)) {
            chrome.storage.sync.get(['total', 'limit'], (budget) => {
                let newTotal = 0
                if (budget.total) {
                    newTotal += budget.total
                }
                newTotal += parseInt(clickData.selectionText)
                chrome.storage.sync.set({ total: newTotal }, () => {
                    if (newTotal >= budget.limit) {
                        let notifOptions = {
                            type: 'basic',
                            iconUrl: 'icon.png',
                            title: 'Limit reached!',
                            message: "Uh oh! Looks like you've reached your limit!"
                        }
                        chrome.notifications.create(null, notifOptions)
                    }
                })
            })
        }
    }
})
chrome.browserAction.setBadgeText({ 'text': 'sb' })
chrome.storage.onChanged.addListener((changes, storageName) => {
    chrome.browserAction.setBadgeText({ 'text': changes.total.newValue.toString() })
})