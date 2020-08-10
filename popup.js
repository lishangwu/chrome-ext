$(function () {
    $('#name').keyup(function() { 
        $('#great').text('hello ' + $('#name').val())
    })


    chrome.storage.sync.get(['total', 'limit'], (budget) => { 
        $('#total').text(budget.total)
        $('#limit').text(budget.limit)
    })

    $('#spendAmount').click(() => { 
        chrome.storage.sync.get(['total','limit'], (budget) => { 
            let newTotal = 0
            if (budget.total) {
                newTotal += parseInt(budget.total)
            }
            let amount = $('#amount').val()
            if (amount) {
                newTotal += parseInt(amount)
            }
            chrome.storage.sync.set({ 'total': newTotal }, () => { 
                if (amount && newTotal >= budget.limit) {
                    let notifOptions = {
                        type: 'basic',
                        iconUrl: 'icon.png',
                        title: 'Limit reached!',
                        message: "Uh oh! Looks like you've reached your limit!"
                    }
                    chrome.notifications.create(null,notifOptions)
                }
            })
            $('#total').text(newTotal)
            $('#amount').val('')
        })
    })
})