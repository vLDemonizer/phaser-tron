var game = new Phaser.Game(640, 480, Phaser.AUTO, null, 'gameDiv');

game.state.add('boot', bootState);
game.state.add('load', bootState);
game.state.add('title', titleState);
game.state.add('play', playState);

game.state.start('boot');