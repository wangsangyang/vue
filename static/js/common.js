var loading = {
     close: function () {
         $('#loading').remove();
     },
    open: function () {
        var $loading = '<div class="loading" id="loading"></div>';
        $('body').append($loading);
    }
}