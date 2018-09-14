import $ from 'jquery';

$(function () {
    initAreYouSureButtons();
    initUserMenu();
    $('#menu-button').on('click', toggleMenu);
    setActiveLink();
});

function initAreYouSureButtons() {
    $('.areyousure').click(function () {
        return window.confirm('Are you sure?');
    });
}

function initUserMenu() {
    const user = $('.user, .user-menu');

    user.on('mouseenter', function () {
        $('.user-menu').removeClass('hidden');

    });
    user.on('mouseleave', function () {
        $('.user-menu').addClass('hidden');
    });
}

function toggleMenu() {
    $('#nav-icon').toggleClass('open');
    const links = $('.links');
    links.slideToggle(250);
}

function setActiveLink() {
    const url = window.location.pathname;
    const activePage = url.substring(url.lastIndexOf('/') + 1);
    $('nav a[href="/' + activePage + '"]').addClass('active');
}
