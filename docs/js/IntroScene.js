var zeilen = [];
var sceneIntro;
var textLaenge = 0;
var zeilenY = 130;
var tuete1;
var once = false;
var seegrasR2 = [];
var timeOut = [];
var introSixPack;
var introFetzen;
var introPartikel;
var introMuellKneuelAktiv = false;
var introMuellMove = 2;
var introBlackOverlay;
var introAbschlussLaeuft = false;
class IntroScene extends Phaser.Scene {
    constructor() {
        super({
            key: "IntroScene"
        });
    }
    create() {
        sceneIntro = this;
        let key = this.input.keyboard.addKey('S');
        key.on('down', function () {
            for (let i = 0; i < timeOut.length; i++) {
                clearTimeout(timeOut[i]);
            }
            sceneIntro.scene.start('Hauptspiel');

        });
        let skiptBtn = this.add.sprite(200, 100, 'skipBtn');

        skiptBtn.setInteractive();
        skiptBtn.setAlpha(0.5);

        skiptBtn.on('pointerover', () => {
            skiptBtn.scale = 1.1;
        skiptBtn.setAlpha(1);
        })
        skiptBtn.on('pointerout', () => {
            skiptBtn.scale = 1;
        skiptBtn.setAlpha(0.5);
        })
        skiptBtn.on('pointerdown', () => {
            skiptBtn.scale = 1.14;
            skiptBtn.anims.play('skiptBtnDown', true);

        })
        skiptBtn.on('pointerup', () => {
            skiptBtn.scale = 1.2;
            skiptBtn.setAlpha(1);
            for (let i = 0; i < timeOut.length; i++) {
                clearTimeout(timeOut[i]);
            }
            sceneIntro.scene.start('Hauptspiel');
        })

        seegrasRandomIntro(2, 56, 46, this);
                korallenRiff1 = this.physics.add.image(1300, 588, 'korallenRiff1').setDepth(50).setAlpha(0);;


        for (var i = 0; i < 15; i++) {
            if (zeilenY > 1000) {
                zeilenY = 130;
            }
            zeilen[i] = sceneIntro.add.text(0, zeilenY, '', {
                fontFamily: 'kongtext',
                fontSize: '36px',
                fill: '#65a0e1'
            }).setAlpha(0).setDepth(300);
            zeilenY += 100;
        }

        setTimeout(function () {
            zeile(0);
        }, 50);

        tuete1 = sceneIntro.add.sprite(300, 400, 'muellTueten', 1).setAlpha(0);

        introSixPack = sceneIntro.physics.add.group();
        introFetzen = sceneIntro.physics.add.group();
        introPartikel = sceneIntro.physics.add.group();

        introBlackOverlay = sceneIntro.add.rectangle(0, 0, 1920, 1080, 0x000000).setOrigin(0, 0).setAlpha(0).setDepth(1000).setScrollFactor(0);


    }
    update() {

        if (!once) {
            once = true;
            setTimeout(function () {
                zeilen[0].setText("Riesige Weltmeere");
                zeilen[1].setText("idyllische Inseln mit schneeweißen Straenden");
                zeilen[2].setText("Blauer Himmel ueber der Wasseroberflaeche");
                zeilen[3].setText("und eine atemberaubende Unterwasserwelt");
                zeilen[4].setText("voller Korallenriffe, Algen und bunter Lebewesen");
                zeilen[5].setText("");
                zeilen[6].setText("So stellt man sich die Ozeane gerne vor.");
                zeilen[7].setText("Doch die Realitaet sieht weitaus anders aus!");
                zeilen[7].setColor('#e03c28');
                zeilen[8].setText("");
                zeilen[9].setText("");
                zeilen[10].setText("Eine furchtbare Bedrohung");
                zeilen[10].setColor('#e03c28');
                zeilen[10 + 1].setText("ist in die Unterwasserwelt eingedrungen");
                zeilen[10 + 1].setColor('#e03c28');
                zeilen[11 + 1].setText("und bedroht grausam und unaufhaltsam");
                zeilen[11 + 1].setColor('#f45141');
                zeilen[12 + 1].setText("das Leben der Meeresbewohner!");
                zeilen[12 + 1].setColor('#f45141');

                for (var i = 0; i < zeilen.length; i++) {
                    zeilen[i].x = 1920 / 2 - zeilen[i].width / 2;
                }
            }, 92);
        }

        if (introMuellKneuelAktiv) {
            muellKneuelBewegungIntro();
        }
    }
}

function zeile(welcheZeile) {
    sceneIntro.tweens.add({
        targets: zeilen[welcheZeile],
        ease: 'Sine.easeIn',
        alpha: 1,

        duration: 2750,
        onComplete: function () {

            if (textLaenge == 13 && !introAbschlussLaeuft) {
                introAbschlussLaeuft = true;
                sceneIntro.time.delayedCall(2400, function () {
                    sceneIntro.tweens.add({
                        targets: introBlackOverlay,
                        alpha: 1,
                        ease: 'Sine.easeInOut',
                        duration: 850,
                        onComplete: function () {
                            sceneIntro.time.delayedCall(450, function () {
                                sceneIntro.scene.start('StoryIntro');
                            });
                        }
                    });
                });
                return;
            }

            if (textLaenge < 15) {
                if (textLaenge == 3) {
                    seegrasSichtbar();
                    korrallenRiffSichtbar();
                }

                if (textLaenge == 9) {
                    mueller();
                    muellKneuelStartIntro();
                }
                

                zeileAusblenden(textLaenge);
                zeile(++textLaenge);

            } else {
                sceneIntro.scene.start('StoryIntro');
            }
        }
    });
}

function zeileAusblenden(welcheZeile) {
    sceneIntro.tweens.add({
        targets: zeilen[welcheZeile],
        ease: 'Sine.easeIn',
        alpha: 0,

        duration: 3000,
    });
}

function mueller() {
    tuete1.anims.play('tuete', true);
    sceneIntro.tweens.add({
        targets: tuete1,
        x: 200,
        y: 500,
        ease: 'Sine.easeInOut',
        alpha: 1,
        duration: 5000,
        yoyo: true,
        delay: 300,
        repeatDelay: 100
    });
}


function muellKneuelStartIntro() {
    if (introMuellKneuelAktiv) {
        return;
    }

    introMuellKneuelAktiv = true;
    var startX = 620;
    var startY = 310;

    for (var i = 0; i < 10; i++) {
        var ring = introSixPack.create(startX + Math.random() * 980, startY + Math.random() * 560, 'sixPackRinge', i % 4);
        ring.setAlpha(0.01).setDepth(85).setScale(1.35);
        ring.anims.play('sixpack', true);

        var fetzen = introFetzen.create(startX + Math.random() * 980, startY + Math.random() * 560, 'gruenerFetzten', i % 7);
        fetzen.setAlpha(0.01).setDepth(87).setScale(1.25);
        fetzen.anims.play('fetzen', true);

        var partikel = introPartikel.create(startX + Math.random() * 980, startY + Math.random() * 560, 'muellPartikel', i % 4);
        partikel.setAlpha(0.01).setDepth(88).setScale(1.2);
        partikel.anims.play('artikel', true);

        sceneIntro.tweens.add({
            targets: [ring, fetzen, partikel],
            alpha: 0.4,
            ease: function (v) {
                return Math.pow(v, 6);
            },
            duration: 9200,
            yoyo: true,
            repeat: -1,
            delay: i * 260
        });
    }
}

function muellKneuelBewegungIntro() {
    Phaser.Actions.IncX(introSixPack.getChildren(), Math.cos(introMuellMove) * 0.22);
    Phaser.Actions.IncY(introSixPack.getChildren(), Math.sin(introMuellMove) * 0.18);

    Phaser.Actions.IncX(introFetzen.getChildren(), Math.cos(introMuellMove + 0.7) * 0.24);
    Phaser.Actions.IncY(introFetzen.getChildren(), Math.sin(introMuellMove + 0.7) * 0.19);

    Phaser.Actions.IncX(introPartikel.getChildren(), Math.cos(introMuellMove + 1.2) * 0.26);
    Phaser.Actions.IncY(introPartikel.getChildren(), Math.sin(introMuellMove + 1.2) * 0.2);

    introMuellMove += 0.006;
}

function seegrasRandomIntro(von, bis, wieviele, _this) {
    von++; //tiledsets z
    seegrasR2.push(_this.physics.add.group({
        key: 'seegras',
        repeat: wieviele, //total 12 ( 1 repeat 11)

    }));
    seegrasR2[seegrasR2.length - 1].children.iterate(function (child) {
        child.setX(Phaser.Math.FloatBetween(32 * von, 32 * bis));
        child.setAlpha(0);
        child.setY(670);
        child.setDepth(100);

        timeOut.push(setTimeout(function () {
            child.anims.play('normelSeeGrasFlow', true);
        }, Phaser.Math.FloatBetween(0, 5000)))
    });
}

function seegrasSichtbar() {
    seegrasR2[seegrasR2.length - 1].children.iterate(function (child) {
        sceneIntro.tweens.add({
            targets: child,
            alpha: 0.8,
            ease: 'Sine.easeInOut',
            duration: 5000,
            yoyo: true,
            delay: 900,
            repeatDelay: 100
        });
    })
}
function korrallenRiffSichtbar() {
        sceneIntro.tweens.add({
            targets: korallenRiff1,
            alpha: 0.9,
            ease: 'Sine.easeInOut',
            duration: 4600,
            yoyo: true,
            delay: 900,
            repeatDelay: 100
        });
}
