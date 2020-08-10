$(function () {
    $('#name').keyup(function() { 
        $('#great').text('hello ' + $('#name').val())
    })


    chrome.storage.sync.get('total', (budget) => { 
        if (budget.total) {
            $('#total').text(budget.total)
        }
    })

    $('#spendAmount').click(() => { 
        chrome.storage.sync.get('total', (budget) => { 
            let newTotal = 0
            if (budget.total) {
                newTotal += parseInt(budget.total)
            }
            let amount = $('#amount').val()
            if (amount) {
                newTotal += parseInt(amount)
            }
            chrome.storage.sync.set({'total': newTotal})
            $('#total').text(newTotal)
        })
    })
})