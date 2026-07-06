
var player;
let gameOverText;
let menuBtn;
let fadeAlpha = 1;

class GameOver extends Phaser.Scene {
    constructor() {
        super({
            key: "GameOver"
        });
    }
    preload() {
        this.load.spritesheet('player', 'assets/babyBlueSketch3tobi_swimKurz.png', {
            frameWidth: 129,
            frameHeight: 96
        });
    }


    create() {
        gameOverText = this.add.text(0, 600, "Game Over", {
            fontSize: '75px',
            fontFamily: 'kongtext',
            fill: '#661837'
        });

        gameOverText.x = 1920 / 2 - gameOverText.width / 2;

        this.cameras.main.setBackgroundColor('#183666').fadeIn('6900');
        player = this.physics.add.sprite(-80, 400, 'player');
        fadeAlpha = 1;
        this.anims.create({
            key: 'swim',
            frames: this.anims.generateFrameNumbers('player', {
                start: 0,
                end: 7,
            }),
            frameRate: 7,
            repeat: -1
        });
        menuBtn = this.add.sprite(1920 * 0.5, 300, 'menuBtn');

        menuBtn.setInteractive();
        menuBtn.setAlpha(0);

        menuBtn.on('pointerover', () => {
            menuBtn.scale = 1.1;
        });
        menuBtn.on('pointerout', () => {
            menuBtn.scale = 1;
        });
        menuBtn.on('pointerdown', () => {
            menuBtn.scale = 1.14;
            menuBtn.anims.play('menuBtnDown', true);

        });
        menuBtn.on('pointerup', () => {
            menuBtn.scale = 1.2;
            menuBtn.setAlpha(1);
            location.reload();
        });
    }
    update() {
        if (player.x < 300) {
            player.setVelocityX(160);
            player.flipX = false;

        }
        if (player.x > 1000) {
            player.flipX = true;
            player.setVelocityX(-80);
        }
        player.anims.play('swim', true);
        gameOverText.setAlpha((0.4 - fadeAlpha) * 1.2);
        menuBtn.setAlpha((0.3 - fadeAlpha) * 1.2);
        player.setAlpha(fadeAlpha -= 0.001);

    }

}
