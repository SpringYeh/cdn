const secHand = document.querySelector('.second');
const minHand = document.querySelector('.minute');
const hourHand = document.querySelector('.hour');
const hand = document.querySelectorAll('.hand')[2];


setInterval(setDate, 1000);

function setDate() {
    const now = new Date();
    const secs = now.getSeconds();
    const secDegrees = ((secs / 60) * 360) + 90;

    secHand.style.transform = `rotate(${secDegrees}deg)`;

    hand.style.transition =
        secDegrees === 90 ?
        "none" :
        "all 0.05s";


    const minutes = now.getMinutes();
    const minDegrees = ((minutes / 60) * 360) + 90;
    minHand.style.transform = `rotate(${minDegrees}deg)`;

    const hrs = now.getHours();

    var hrDegrees;
    if (minutes <= 15) {
        hrDegrees = ((hrs / 12) * 360) + 90;
    } else if (minutes > 15 && minutes <= 30) {
        hrDegrees = ((hrs / 12) * 360) + 100;
    } else if (minutes > 30 && minutes <= 45) {
        hrDegrees = ((hrs / 12) * 360) + 110;
    } else
        hrDegrees = ((hrs / 12) * 360) + 115;
    hourHand.style.transform = `rotate(${hrDegrees}deg)`;
}