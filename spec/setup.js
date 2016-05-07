describe('A setup', function () {

	var stage = document.getElementById('main-canvas'),
		ctx = stage.getContext("2d");

	it('Should equal stage_setup', function () {
		expect(stage.height).toBe(536);
		expect(stage.width).toBe(960);
	});
});