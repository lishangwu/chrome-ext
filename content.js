
document.onmouseup = function (e) {
    let text = window?.getSelection()?.toString().trim()
    if (text) {
        console.log('当前选中的文本', text);
        ajax(text)
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
            console.log(data);
        },
        error: function (err) {
            console.log(err);
        }
    })
}