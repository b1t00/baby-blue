let easyAlpha = 0;
let difficultyFadeIntervalId = null;

var kannSpielen = (typeof kannSpielen !== 'undefined') ? kannSpielen : false;
var storyBtn;


class StartMenu extends Phaser.Scene {
    constructor() {
        super({
            key: "StartMenu"
        });
    }
    create() {
        this.isStartingIntro = false;
        this.backgroundHappyEnd = this.add.tileSprite(0, 0, 1920, 1080, 'backgroundHappyEnd');
        this.backgroundHappyEnd.setOrigin(0, 0).setAlpha(1);
        this.backgroundHappyEnd.scrollFactorX = 2;
        let logo = this.add.image(850, 300, 'logo');
        logo.scale = 0.9;
        this.tweens.add({
            targets: logo,
            x: 950,
            ease: 'Sine.easeInOut',
            duration: 8000,
            delay: 50,
            repeat: -1,
            yoyo: true,
            repeatDelay: 100
        });
        this.tweens.add({
            targets: logo,
            y: 310,
            ease: 'Sine.easeInOut',
            duration: 8000 / 2,
            delay: 50,
            repeat: -1,
            yoyo: true,
            repeatDelay: 100
        });

        let easyBtn = this.add.sprite(1920 * 0.2, 600, 'easyBtn');

        easyBtn.setInteractive();
        easyBtn.setAlpha(0).setDepth(-100);

        easyBtn.on('pointerover', () => {
            easyBtn.scale = 1.1;
        });
        easyBtn.on('pointerout', () => {
            easyBtn.scale = 1;
        });
        easyBtn.on('pointerdown', () => {
            easyBtn.scale = 1.14;
            easyBtn.anims.play('easyBtnDown', true);

        });
        easyBtn.on('pointerup', () => {
            easyBtn.scale = 1.2;
            easyBtn.setAlpha(1);
            schwierigkeitsStufe = 'easy';
            wieSchnellWirdRuntergezaehlt = 43;
            this.startIntroAfterAudioReady();
        });

        let normalBtn = this.add.sprite(1920 * 0.5, 600, 'normBtn');

        normalBtn.setInteractive();
        normalBtn.setAlpha(0).setDepth(-100);

        normalBtn.on('pointerover', () => {
            normalBtn.scale = 1.1;
        });
        normalBtn.on('pointerout', () => {
            normalBtn.scale = 1;
        });
        normalBtn.on('pointerdown', () => {
            normalBtn.anims.play('normalBtnDown', true);

            normalBtn.scale = 1.14;
        });
        normalBtn.on('pointerup', () => {
            normalBtn.scale = 1.2;
            normalBtn.setAlpha(1);
            wieSchnellWirdRuntergezaehlt = 37;
            this.startIntroAfterAudioReady();
        });

        let hardBtn = this.add.sprite(1920 * 0.8, 600, 'hardBtn');

        hardBtn.setInteractive();
        hardBtn.setAlpha(0).setDepth(-100);

        hardBtn.on('pointerover', () => {
            hardBtn.scale = 1.1;
        });
        hardBtn.on('pointerout', () => {
            hardBtn.scale = 1;
        });
        hardBtn.on('pointerdown', () => {
            hardBtn.scale = 1.14;
            hardBtn.anims.play('hardBtnDown', true);

        });
        hardBtn.on('pointerup', () => {
            hardBtn.scale = 1.2;
            hardBtn.setAlpha(1);
            schwierigkeitsStufe = 'hard';
            wieSchnellWirdRuntergezaehlt = 32;
            this.startIntroAfterAudioReady();
        });

        storyBtn = this.add.sprite((1920 / 2), 600, 'storyBtn');
        storyBtn.id = 'storyBtn';
        storyBtn.setAlpha(1);

        storyBtn.setInteractive();

        storyBtn.on('pointerover', () => {
            storyBtn.scale = 1.1;
        });

        storyBtn.on('pointerout', () => {
            storyBtn.scale = 1;
            storyBtn.anims.play('storyBtnUp', true);
        });
        storyBtn.on('pointerdown', () => {
            storyBtn.scale = 1.14;
            storyBtn.anims.play('storyBtnDown', true);

        });
        storyBtn.on('pointerup', () => {
            storyBtn.anims.play('storyBtnUp', true);
            const revealDifficulty = () => {
                storyBtn.scale = 1.2;
                storyBtn.setAlpha(1);
                storyBtn.setDepth(-100);
                easyBtn.setDepth(100);
                hardBtn.setDepth(100);
                normalBtn.setDepth(100);
                if (easyAlpha < 1.1) {
                    if (difficultyFadeIntervalId !== null) {
                        clearInterval(difficultyFadeIntervalId);
                    }
                    difficultyFadeIntervalId = setInterval(function () {
                        easyBtn.setAlpha(easyAlpha);
                        hardBtn.setAlpha(easyAlpha);
                        normalBtn.setAlpha(easyAlpha);
                        easyAlpha += 0.003;

                        if (easyAlpha >= 1) {
                            clearInterval(difficultyFadeIntervalId);
                            difficultyFadeIntervalId = null;
                        }

                    }, 1);
                }
            };

            revealDifficulty();

            if (typeof ensureAudioStarted === 'function') {
                ensureAudioStarted().catch(() => {
                });
            }
        });



    }

    async startIntroAfterAudioReady() {
        if (this.isStartingIntro) {
            return;
        }

        this.isStartingIntro = true;

        try {
            if (typeof ensureAudioStarted === 'function') {
                await ensureAudioStarted();
            }
        } catch (_) {
            // Continue into gameplay even if audio init fails.
        }

        this.scene.start('IntroScene');
    }
}
