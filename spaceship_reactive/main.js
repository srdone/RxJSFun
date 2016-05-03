import Rx from 'rx';

var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const SPEED = 40;
const STAR_NUMBER = 250;
var StarStream = Rx.Observable.range(1, STAR_NUMBER)
    .map(() => {
        return {
            x: parseInt(Math.random() * canvas.width),
            y: parseInt(Math.random() * canvas.height),
            size: Math.random() * 3 + 1
        };
    })
    .toArray()
    .flatMap(function (starArray) {
        return Rx.Observable.interval(SPEED).map(function () {
            starArray.forEach((star) => {
                if (star.y >= canvas.height) {
                    star.y = 0;
                }
                star.y += 3;
            });
            return starArray;
        })
    })
    .subscribe((starArray) => paintStars(starArray));

function paintStars(stars) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    stars.forEach(star => ctx.fillRect(star.x, star.y, star.size, star.size));
}


