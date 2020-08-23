
document.onmouseup = function (e) {
    let text = window?.getSelection()?.toString().trim()
    if (text) {
        console.log('当前选中的文本', text);
        ajax(text.trim())
    }
};
function ajax(query) {
    $.ajax({
        url: 'http://localhost:3002/word',
        type: 'post',
        data: {
            en: query,
        },
        success: function (data) {
            let notifOptions = {
                type: 'basic',
                iconUrl: 'icon.png',
                title: `${query} 已保存`,
                message: JSON.stringify(data)
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