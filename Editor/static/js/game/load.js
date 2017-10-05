var loadState = {
    preload: function() {
        var loadingLabel = game.add.text(80, 150, 'loading...', {
            font: '30px Curier', fill: '#ffffff'});
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.PageAlignHorizontally = true;
        page.scale.PageAlignVertically = true;
        game.stage.backgroundColor = '#000000';

        game.loadspritesheet('bikes', 'sprites/bikes.png', 32, 32);
    },

    create: function() {
        game.state.start('title');
    }
}