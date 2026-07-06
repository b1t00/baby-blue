const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    parent: "game-container",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            }
        }
    },
    render: {
        pixelArt: true,
    },
    scene: [LoadScene, IntroScene, StoryIntro, StartMenu, Hauptspiel, GameOver, HappyEnd]
};

const game = new Phaser.Game(config);
