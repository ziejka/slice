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
        if (y + dy < STAGE_HEIGHT) {
            y += dy;
        }
        break;
    }

    function doKeyDown(evt) {
        switch (evt.keyCode) {
            case 38:
                /* Up arrow was pressed */
                evt.preventDefault();
                if (y - dy > 0) {
                    y -= dy;
                } else {
                    y = 0;
                }
                break;
            case 40:
                /* Down arrow was pressed */
                evt.preventDefault();
                if (y + dy < STAGE_HEIGHT) {
                    y += dy;
                }
                break;
            case 37:
                /* Left arrow was pressed */
                evt.preventDefault();
                if (x - dx > 0) {
                    x -= dx;
                } else {
                    x = 0;
                }
                break;
            case 39:
                /* Right arrow was pressed */
                evt.preventDefault();
                if (x + dx < STAGE_WIDTH) {
                    x += dx;
                }
                break;
        }
    }

    return {
        draw_hero: draw_hero,
        doKeyDown: doKeyDown
    }
}
