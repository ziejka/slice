// player.js

var Hero = function() {
	'use strict';

	var x = 10, 
		y = 10,
		dy= 5,
		dx = 5;

    function draw_hero() {
        ctx.fillStyle = PLAYER_COLOR;
        ctx.fillRect(x, y, 20, 20);
    }

    function doKeyDown(evt) {
        switch (evt.keyCode) {
            case 38:
                /* Up arrow was pressed */
                if (y - dy > 0) {
                    y -= dy;
                }
                break;
            case 40:
                /* Down arrow was pressed */
                if (y + dy < STAGE_HEIGHT) {
                    y += dy;
                }
                break;
            case 37:
                /* Left arrow was pressed */
                if (x - dx > 0) {
                    x -= dx;
                }
                break;
            case 39:
                /* Right arrow was pressed */
                if (x + dx < STAGE_WIDTH) {
                    x += dx;
                }
                break;
        }
        draw_hero(x, y);
    }

    return {
    	draw_hero: draw_hero,
    	doKeyDown: doKeyDown
    }
}
