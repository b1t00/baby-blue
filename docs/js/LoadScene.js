class LoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: "LoadScene"
        });
    }

    preload() {
        this.load.image('logo', 'assets/LogoButtons/Schriftzug.png');
        this.load.image('logo', 'assets/LogoButtons/SchriftzugOhneSchatten.png');
        this.load.spritesheet('storyBtn', 'assets/LogoButtons/storyBtn.png', {
            frameWidth: 904 / 2,
            frameHeight: 147
        });
        this.load.spritesheet('easyBtn', 'assets/LogoButtons/easy.png', {
            frameWidth: 904 / 2,
            frameHeight: 147
        });
        this.load.spritesheet('normBtn', 'assets/LogoButtons/normal.png', {
            frameWidth: 904 / 2,
            frameHeight: 147
        });
        this.load.spritesheet('hardBtn', 'assets/LogoButtons/hard.png', {
            frameWidth: 904 / 2,
            frameHeight: 147
        });

        this.load.spritesheet('menuBtn', 'assets/LogoButtons/menu.png', {
            frameWidth: 904 / 2,
            frameHeight: 147
        });

        this.load.spritesheet('skipBtn', 'assets/LogoButtons/skip.png', {
            frameWidth: 455 / 2,
            frameHeight: 76
        });

        this.load.image('background0', 'assets/Map/Parallax/background0.png');

        this.load.spritesheet('bg4surface', 'assets/Map/Parallax/bgLayerSurface3.png', {
            frameWidth: 1920,
            frameHeight: 2000
        });
        this.load.image('sonnenstrahlen0', 'assets/Map/Parallax/SonnenStrahlen0.png');
        this.load.image('sonnenstrahlen1', 'assets/Map/Parallax/SonnenStrahlen1.png');
        this.load.image('sonnenstrahlen2', 'assets/Map/Parallax/SonnenStrahlen2.png');
        this.load.spritesheet('bg4surface2', 'assets/Map/Parallax/bgLayerSurface4.png', {
            frameWidth: 1920,
            frameHeight: 2000
        });

        this.load.tilemapTiledJSON('map', 'assets/Map/map.json');
        this.load.image('tiles', 'assets/Map/tiles.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('player', 'assets/BabyBlue/babyBlueSketch_blauSwimLangNeu.png', {
            frameWidth: 120,
            frameHeight: 92
        });
        this.load.spritesheet('playerklein', 'assets/BabyBlue/babyBlueSketch_zuKlein.png', {
            frameWidth: 120,
            frameHeight: 77
        });

        this.load.spritesheet('tauchAuf', 'assets/BabyBlue/babyBlueSketch3tobi_auftauch.png', {
            frameWidth: 129,
            frameHeight: 164
        });
        this.load.spritesheet('seegras', './assets/SeegrasUndKorallen/SeegrasAnim01.png', {
            frameWidth: 64,
            frameHeight: 60
        });
        this.load.spritesheet('korallenRiff1', './assets/SeegrasUndKorallen/Sprite-0002.png', {
            frameWidth: 132,
            frameHeight: 222
        });

        this.load.spritesheet('muellTueten', './assets/Muell/muellTuete01gross2.png', {
            frameWidth: 60,
            frameHeight: 80
        });

        this.load.spritesheet('sixPackRinge', './assets/Muell/sixPackRinge.png', {
            frameWidth: 84,
            frameHeight: 59
        });

        this.load.spritesheet('schuh', './assets/Muell/schuh.png', {
            frameWidth: 60,
            frameHeight: 30
        });

        this.load.spritesheet('muellFlasche', './assets/Muell/muell_Flasche01.png', {
            frameWidth: 24,
            frameHeight: 64
        });

        this.load.spritesheet('gruenerFetzten', './assets/Muell/gruenerFetzenTransparent.png', {
            frameWidth: 96,
            frameHeight: 72
        });

        this.load.spritesheet('plastikEimer', './assets/Muell/pasitkEimer2.png', {
            frameWidth: 82,
            frameHeight: 58
        });

        this.load.spritesheet('muellPartikel', './assets/Muell/muellPartikel.png', {
            frameWidth: 78,
            frameHeight: 66
        });

        this.load.image('atomTonne', './assets/Muell/AtomMuellTone.png', {
            frameWidth: 84,
            frameHeight: 44
        });

        this.load.image('oelfleck', './assets/Muell/oel2px38.png', {
            frameWidth: 38,
            frameHeight: 38
        });

        this.load.spritesheet('atom', './assets/Muell/atom.png', {
            frameWidth: 64,
            frameHeight: 64
        });

        this.load.spritesheet('herrErmann', './assets/Muell/ermann.png', {
            frameWidth: 48,
            frameHeight: 78
        });

        this.load.spritesheet('fish1', './assets/Fische/fish.png', {
            frameWidth: (343 / 7) * 2,
            frameHeight: 33 * 2
        });
        this.load.image('backgroundHappyEnd', 'assets/Map/Parallax/BackgroundHappyEnd.png');

        this.load.spritesheet('mamaBlue', 'assets/MamaBlue/mamaBSpriteSheet2.png', {
            frameWidth: 3102,
            frameHeight: 1540
        });
        this.load.spritesheet('mamaAuge', 'assets/MamaBlue/mamaAuge.png', {
            frameWidth: 390,
            frameHeight: 345
        });

        this.load.spritesheet('herz', 'assets/MamaBlue/herz16.png', {
            frameWidth: 16,
            frameHeight: 16
        });

        const loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff
            }
        });

        this.load.on("progress", (percent) => {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
        });
    }

    create() {
        createAnimation(this);

        const startupBar = this.add.graphics({
            fillStyle: {
                color: 0x65a0e1
            }
        });

        const statusText = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 80, 'Startup wird vorbereitet...', {
            fontFamily: 'kongtext',
            fontSize: '20px',
            fill: '#ffffff'
        }).setOrigin(0.5, 0.5);

        const startupTasks = [
            waitForFonts(),
            (typeof preloadAudioFiles === 'function') ? preloadAudioFiles() : Promise.resolve()
        ];

        let completed = 0;
        const markDone = () => {
            completed++;
            startupBar.clear();
            startupBar.fillRect(0, this.game.renderer.height / 2 + 60, this.game.renderer.width * (completed / startupTasks.length), 24);
        };

        Promise.all(startupTasks.map((task) => {
            return task.then(markDone).catch(markDone);
        })).finally(() => {
            statusText.setText('Startmenue wird geladen...');
            this.time.delayedCall(120, () => {
                this.scene.start('StartMenu');
            });
        });
    }
}

function waitForFonts() {
    if (!document.fonts || typeof document.fonts.load !== 'function') {
        return Promise.resolve();
    }

    return Promise.all([
        document.fonts.load('20px kongtext'),
        document.fonts.load('36px kongtext')
    ]).then(() => document.fonts.ready);
}
