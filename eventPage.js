let contextMenuItem = {
    id: 'translate',
    title: '查看翻译',
    contexts: ['selection']
}

chrome.contextMenus.create(contextMenuItem)

function isInt(value) {
    return !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10))
}

chrome.contextMenus.onClicked.addListener((clickData) => {
    let query = clickData.selectionText.trim()
    if (clickData.menuItemId == 'translate' && query) {
        $.ajax({
            url: 'http://localhost:3002/word/'+query,
            type: 'get',
            data: {
                en: query,
            },
            success: function (data) {
                let notifOptions = {
                    type: 'basic',
                    iconUrl: 'icon.png',
                    title: `${query} 查看翻译`,
                    message: JSON.stringify(data.detail?.google?.result)
                }
                try {
                    chrome.notifications.create(null,notifOptions)
                } catch (error) {
                    console.log(error);
                }
            },
            error: function (err) {
                let notifOptions = {
                    type: 'basic',
                    iconUrl: 'icon.png',
                    title: `${query} 保存失败`,
                    message: JSON.stringify(err)
                }
                try {
                    chrome.notifications.create(null,notifOptions)
                } catch (error) {
                    console.log(error);
                }
            }
        })

        
    }
})
// chrome.browserAction.setBadgeText({ 'text': 'sb' })
// chrome.storage.onChanged.addListener((changes, storageName) => {
//     chrome.browserAction.setBadgeText({ 'text': changes.total.newValue.toString() })
// })
