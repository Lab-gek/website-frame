
const cards = document.querySelectorAll('.round-moving-thingy');

cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
        cards.forEach((otherCard) => {
            otherCard.style.animationPlayState = 'paused';
        });
    });

    card.addEventListener('mouseleave', () => {
        cards.forEach((otherCard) => {
            otherCard.style.animationPlayState = 'running';
        });
    });
});
