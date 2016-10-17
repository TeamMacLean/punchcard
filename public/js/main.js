$(function () {
    initAreYouSureButtons();
    initUserMenu();
});

function initAreYouSureButtons() {
    $('.areyousure').click(function () {
        return window.confirm('Are you sure?');
    });
}

function initUserMenu() {
    var user = $('.user, .user-menu');

    user.on('mouseenter', function () {
        $('.user-menu').removeClass('hidden');

    });
    user.on('mouseleave', function () {
        $('.user-menu').addClass('hidden');
    });
}