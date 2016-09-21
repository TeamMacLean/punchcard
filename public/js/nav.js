$(function () {
    $('#menu-button').on('click', toggleMenu);
    setActiveLink();
});

function toggleMenu() {
    $('#nav-icon').toggleClass('open');
    var links = $('.links');
    links.slideToggle(250);
}

function setActiveLink() {
    var url = window.location.pathname;
    var activePage = url.substring(url.lastIndexOf('/') + 1);
    $('nav a[href="/' + activePage + '"]').addClass('active');
}