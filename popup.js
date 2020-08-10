$(function () {
    $('#name').keyup(function() { 
        $('#great').text('hello ' + $('#name').val())
    })
})