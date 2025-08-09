//hero js
document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('scrollButton');
    const target = document.getElementById('feedback');

    if (button && target) {
        button.addEventListener('click', function () {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});
// ----->