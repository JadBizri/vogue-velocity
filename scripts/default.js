document.querySelectorAll('.item-container').forEach(function(item) {
    item.addEventListener('click', function() {
        window.location.href = 'item.html';
    });
});