// player.js

var Hero = function() {
    'use strict';

    var x = 0,
        y = 0,
        dy = 10,
        dx = 10,
        pw = 20,
        ph = 20;

    function draw_hero() {
        ctx.fillStyle = PLAYER_COLOR;
        ctx.fillRect(x, y, pw, ph);
    }

    function moveDown() {
        if (y + ph + dy < STAGE_HEIGHT) {
            y += dy;
        } else {
            y = STAGE_HEIGHT - ph;
        }
    }

    function moveUP() {
        if (y - dy > 0) {
            y -= dy;
        } else {
            y = 0;
        }
    }

    function moveLeft() {
        if (x - dx > 0) {
            x -= dx;
        } else {
            x = 0;
        }
    }

    function moveRight() {
        if (x + pw + dx < STAGE_WIDTH) {
            x += dx;
        } else {
        	x = STAGE_WIDTH - pw;
        }
    }

    function doKeyDown(evt) {
        switch (evt.keyCode) {
            case 38:
                /* Up arrow was pressed */
                evt.preventDefault();
                moveUP();
                break;
            case 40:
                /* Down arrow was pressed */
                evt.preventDefault();
                moveDown();
                break;
            case 37:
                /* Left arrow was pressed */
                evt.preventDefault();
                moveLeft();
                break;
            case 39:
                /* Right arrow was pressed */
                evt.preventDefault();
                moveRight();
                break;
        }
    }

    return {
        draw_hero: draw_hero,
        doKeyDown: doKeyDown
    }
}
