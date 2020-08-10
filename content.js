
document.onmouseup = function (e) {
    let text = window?.getSelection()?.toString().trim()
    if (text) {
        console.log('当前选中的文本', text);
        // await translate(text)
        // xhrReq(text)
        translate(text)
    }
};

function translate(word) {
    console.log('translate',word);
    var reg = /^[a-zA-Z]+$/i;
    if (!word || !reg.test(word)) {
        return
    }
    console.log('google..4');
    var promiseGoogle = new Promise((resolve, reject)=>{
        window.tjs.google.translate(word).then(function(value){
            resolve(value.dict)
        }).catch(err=>reject(err))
    });
    console.log('google..3');
    var promiseBaidu = new Promise((resolve, reject)=>{
        window.tjs.baidu.translate(word).then(function(value){
            resolve(value.dict)
        }).catch(err=>reject(err))
    });
    console.log('google..1');
    promiseGoogle.then(function (value) {
        console.log('google..');
        console.log(word, 'google', value)
    }).catch(err => {
        console.log('google:',err);
    });
    console.log('google..2');
    promiseBaidu.then(function (value) {
        console.log('baidu..');
        console.log(word, 'baidu', value)
    }).catch(err => {
        console.log('baidu:',err);
    });


}

async function baidu(word) {
    return new Promise((resolve, reject) => {
        window.tjs.baidu.translate(word).then(value => {
            resolve(value)
        }).catch(err => {
            reject(err)
        })
    })
}

function ajax(query) {
    let appid = '20190118000257759'
    let key = 'BKMcXYBOxPUAS7oQi9mL'
    let salt = (new Date).getTime();

    let str1 = appid + query + salt + key;
    let sign = MD5(str1);

    $.ajax({
        url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
        type: 'get',
        // dataType: 'jsonp',
        data: {
            q: query,
            appid,
            salt,
            from: 'auto',
            to: 'zh',
            sign
        },
        success: function (data) {
            // var res = data.trans_result[0].dst;
            // $("#result")[0].innerHTML = res;
            console.log('data.....');
            console.log(data);
        },
        error: function (err) {
            console.log('err.....');
            console.log(err);
        }
    })
}

function xhrReq(query) {

    let appid = '20190118000257759'
    let key = 'BKMcXYBOxPUAS7oQi9mL'
    let salt = (new Date).getTime();

    let str1 = appid + query + salt + key;
    let sign = MD5(str1);

    // let url = `https://api.fanyi.baidu.com/api/trans/vip/translate?q=${query}&from=en&to=zh&appid=${appid}&salt=${salt}&sign=${sign}`
    let url = `https://fanyi-api.baidu.com/api/trans/vip/translate?q=${query}&from=en&to=zh&appid=${appid}&salt=${salt}&sign=${sign}`
    console.log(url);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", (url), true);
    xhr.responseType = 'text'
    xhr.onreadystatechange = function () { 
        if (xhr.readyState === 4) { 
            // 200-299
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log(xhr.response)
                console.log(xhr);
            } else { 
                console.error(xhr.status)
            }
        }
    }
    xhr.send();
}