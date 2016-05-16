describe('Collision tests', function() {
    var heroT = new Hero();
    var heroPos = heroT.getHeroCords();
    heroPos.x = 100;
    heroPos.y = 100;
    var ennemyT = new Ennemy();

    it('should NOT collide', function() {
        ennemyT.x = 10;
        ennemyT.y = 10;
        expect(helpers.isInCollision(ennemyT, heroPos)).toBe(false);
    });

    it('Should collide 100/100 center', function () {
    	ennemyT.x = 100;
    	ennemyT.y = 100;
    	expect(helpers.isInCollision(ennemyT, heroPos)).toBe(true);
    });
    it('Should collide 90/110', function () {
    	ennemyT.x = 90;
    	ennemyT.y = 110;
    	expect(helpers.isInCollision(ennemyT, heroPos)).toBe(true);
    })
    it('Should collide 130/110', function () {
    	ennemyT.x = 130;
    	ennemyT.y = 110;
    	expect(helpers.isInCollision(ennemyT, heroPos)).toBe(true);
    })
    it('Should collide 110/90', function () {
    	ennemyT.x = 110;
    	ennemyT.y = 90;
    	expect(helpers.isInCollision(ennemyT, heroPos)).toBe(true);
    })
    it('Should collide 110/130', function () {
    	ennemyT.x = 110;
    	ennemyT.y = 130;
    	expect(helpers.isInCollision(ennemyT, heroPos)).toBe(true);
    })
    it('Should collide 93/93', function () {
    	ennemyT.x = 93;
    	ennemyT.y = 93;
    	expect(helpers.isInCollision(ennemyT, heroPos)).toBe(true);
    })
});
