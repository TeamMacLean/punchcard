$(function () {
    initAreYouSureButtons();
});

function initAreYouSureButtons() {
    $('.areyousure').click(function () {
        return window.confirm('Are you sure?');
    });
}