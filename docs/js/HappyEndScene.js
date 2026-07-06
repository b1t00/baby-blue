
var swimAnimSpeed = 10;
var hearts;
var creditsText;
var currentScene;
var creditsY = 500;
let happyEndMenuBtn;
class HappyEnd extends Phaser.Scene {
    constructor() {
        super({
            key: "HappyEnd"
        });
    }

    create() {
        currentScene = this;
        hearts = this.physics.add.group();
        this.backgroundHappyEnd = this.add.tileSprite(0, 0, 1920 * 2, 1080, 'backgroundHappyEnd');
        this.backgroundHappyEnd.setOrigin(0, 0);
        this.babyB = this.add.sprite(-66, 400, 'player');
        this.babyB.anims.play('swim', true);

        this.alph = 1;
        this.mamaB = this.add.sprite(2900, 400, 'mamaBlue');
        this.mamaAuge = this.add.sprite(3500, 650, 'mamaAuge', 9); //4ter parameter ist frame im spritesheet
        this.cameras.main.setBackgroundColor('#106dac');
        this.mamaB.setDepth(100);
        this.babyB.setDepth(200);
        this.mamaAuge.setDepth(120);
        this.mamaAuge.setAlpha(0);
        this.cameras.main.setBounds(0, 0, 1920 * 2, 1080);
        this.cameras.main.startFollow(this.babyB);
        arriveBabyBlue();

        creditsText = this.add.text(1920 + 110, creditsY + 200, "Vielen Dank fürs spielen! \n Denkt an die Umwelt! \n \n ein Spiel  Tobi Schmitt", {
            fontSize: '30px',
            fontFamily: 'kongtext',
            fill: '#98dcff'
        });
        creditsText.setAlpha(0);
        setTimeout(function () {
            creditsText.setText("Vielen Dank fürs spielen :) \n \nDenkt an die Umwelt! \n \n \nEntwickelt, gestaltet\n \nund vertont von Tobi Schmitt");

        }, 2000);

        happyEndMenuBtn = this.add.sprite(creditsText.x + creditsText.width - 350, 300, 'menuBtn');

        happyEndMenuBtn.setInteractive();
        happyEndMenuBtn.setAlpha(0);

        happyEndMenuBtn.on('pointerover', () => {
            happyEndMenuBtn.scale = 1.1;
        });
        happyEndMenuBtn.on('pointerout', () => {
            happyEndMenuBtn.scale = 1;
        });
        happyEndMenuBtn.on('pointerdown', () => {
            happyEndMenuBtn.scale = 1.14;
            happyEndMenuBtn.anims.play('menuBtnDown', true);

        });
        happyEndMenuBtn.on('pointerup', () => {
            happyEndMenuBtn.scale = 1.2;
            happyEndMenuBtn.setAlpha(1);
            location.reload();
        });
    }
    update() {
        currentScene.babyB.anims.update('swim', swimAnimSpeed += 0.000002);
        emitHearts(currentScene.babyB);
        if (creditsY < 500) {
            creditsY++;
        }
    }
}

function arriveBabyBlue() {
    currentScene.tweens.add({
        targets: currentScene.babyB,
        x: 3230,
        y: 670,
        ease: 'Sine.easeInOut',
        duration: 7000,
        onComplete: function () {
            showMamaEye();
            swimAnimSpeed = 30;
        }
    });
}

function celebrateBabyBlue() {
    currentScene.tweens.add({
        targets: currentScene.babyB,
        x: 3180,
        y: 400,
        repeat: -1,
        delay: 1200,
        yoyo: true,
        ease: 'Sine.easeInOut',
        duration: 2000,
    });
}

function showMamaEye() {
    currentScene.tweens.add({
        targets: currentScene.mamaAuge,
        alpha: 1,
        delay: -500,
        onComplete: function () {
            currentScene.time.delayedCall(1000, playMamaEyeAnimation(), null, null);
        }
    });
}

function playMamaEyeAnimation() {
    currentScene.mamaAuge.anims.playReverse('auge', true);
    setTimeout(function () {
        celebrateBabyBlue();
        outroStarten();
    }, 1600);
    setTimeout(function () {

        currentScene.mamaAuge.anims.play('augeEnd', true);
        showCreditsAndButton();
    }, 6000);
}

function emitHearts(babyB) {
    timer++;
    if (babyB.x > 1000 && timer % 20 == 0 && timer % 60 != 0) {
        hearts.create(babyB.x, babyB.y, 'herz');
        let heart = hearts.children.entries.pop();
        heart.setDepth(300);
        heart.setGravityY(-10);
        heart.scale = 2;
        heart.setGravityX(Phaser.Math.FloatBetween(-100, 50));
        currentScene.tweens.add({
            targets: heart,
            scaleX: 0,
            ease: 'Sine.easeIn',
            duration: 900,
            yoyo: true,
            repeat: -1,
            delay: 500,
            repeatDelay: 200
        });
    }
}

function showCreditsAndButton() {
    let buttonAlpha = 0;
    let creditsAlpha = 0;
    let fadeInterval = setInterval(function () {
        happyEndMenuBtn.setAlpha(buttonAlpha += 0.0075);
        creditsText.setAlpha(creditsAlpha += 0.009);
        if (buttonAlpha > 1.1) {
            clearInterval(fadeInterval);
        }
    }, 70);
}
