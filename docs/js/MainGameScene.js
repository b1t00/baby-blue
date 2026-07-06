

var player;
var cursors; //tastertur

var map;
var groundLayer, himmelLayer, seegrasLayer; //Layers
var waterSurfaceFront, bg4surface2;
var sonnenstrahlen0, sonnenstrahlen1, sonnenstrahlen2;
var sonnenStrahlen = [];

var herrErmann;
var muellTueten, sixPackRinge, schuh, plastikEimer, muellFlaschen, gruenerFetzten, muellPartikel;
var muellKneul = [];
var oelfleck;
var atom, oeltonne;
var atomTonnen = [];
var seegras, korallenRiff1;
var seegrasR = [];
var fish1, blauerFisch;

var geschw = 50;
var schwierigkeitsStufe = 'normal';
var framerate = 2;
var wieSchnellWirdRuntergezaehlt = 20;

var timer = 0;
const TIMER_BASE_FPS = 30;
const TIMER_STEP_MS = 1000 / TIMER_BASE_FPS;
var _timerMsAcc = 0;
var vorbei = false;
var maxVor = 0; // maximaler verschiebungswert bei right/left_down fuer den bildschirm
const tauchAuf = 395; // konstanter wert zum merken, ab wann babyB auftaucht

var alph = 1; // evtl weg
var xKordinate;

const maximalWertMuellY = 460,
    minimalWertMuellY = 1100;

var xVariable;
var _this;


var countDownText;
var time = '...';
var endText = "";
var anfangsText = "";

class Hauptspiel extends Phaser.Scene {
    constructor() {
        super({
            key: "Hauptspiel"
        });
    }


    create() {

        cursors = this.input.keyboard.createCursorKeys();
        player = this.physics.add.sprite(-65, 700, 'playerklein').setDepth(100);

        _this = this; // eigene SceneClasse word in this variable gespeichert, damit diese in callbackfunktionen refenrenziert werden kann




        spawnSeaweedRandomAuto(74, 78, this);
        spawnSeaweedRandomAuto(84, 112, this);
        spawnSeaweedRandomAuto(113, 116, this);
        spawnSeaweedRandomAuto(117, 129, this);
        spawnSeaweedRandomAuto(130, 138, this);
        spawnSeaweedRandomAuto(139, 147, this);
        spawnSeaweedRandomAuto(148, 171, this);
        spawnSeaweedRandomAuto(239, 247, this);
        spawnSeaweedRandomAuto(172, 183, this);
        spawnSeaweedRandomAuto(289, 425, this);
        spawnSeaweedRandomAuto(427, 598, this);
        spawnSeaweedRandomAuto(602, 654, this);
        spawnSeaweedRandomAuto(659, 928, this);
        spawnSeaweedRandomAuto(1302, 1484, this);
        spawnSeaweedRandomAuto(1502, 1522, this);
        spawnSeaweedRandomAuto(1523, 1531, this);
        spawnSeaweedRandomAuto(1532, 1584, this);


        spawnSeaweedRandomAuto(1648, 1650, this);
        spawnSeaweedRandomAuto(1651, 1653, this);
        spawnSeaweedRandomAuto(1683, 1687, this);
        spawnSeaweedRandomAuto(1695, 1702, this);
        spawnSeaweedRandomAuto(1708, 1714, this);
        spawnSeaweedRandomAuto(1715, 1717, this);
        spawnSeaweedRandomAuto(1780, 1857, this);


        map = this.make.tilemap({
            key: 'map'
        });



        let wievieldrueber = 0;
        muellTueten = this.physics.add.group({
            key: 'muellTueten',
            repeat: 80-4,
            setXY: {
                x: -100,
                y: -500,
                stepX: 80
            }
        }, 1);

        xVariable = Phaser.Math.FloatBetween(900, 1000);
        var i = 0;
        songStart();

        muellTueten.children.iterate(function (child) {
            setTimeout(function () {
                child.anims.playReverse('tuete', true);
            }, Phaser.Math.FloatBetween(0, 300))
            xKordinate = xVariable + Phaser.Math.FloatBetween(-100, 500);
            skipTrashZone(575, 602);
            skipTrashZone(960, 1240);
            skipTrashZone(1235, 1334);
            skipTrashZone(1456, 1541);
            skipTrashZone(1565, 1660);

            child.setY(Phaser.Math.FloatBetween(maximalWertMuellY, minimalWertMuellY));
            child.setX(xKordinate);
            xVariable += Phaser.Math.Between(460, 700); // sagt den abschstand zwischen Muellten
            child.setDepth(300);

            _this.tweens.add({
                targets: child,
                y: child.y + Phaser.Math.FloatBetween(40, 240),
                x: child.x + Phaser.Math.FloatBetween(40, 240),
                ease: 'Linear',
                duration: Phaser.Math.FloatBetween(4000, 6000) * 1.5,
                delay: i * 50,
                repeat: -1,
                yoyo: true,
                repeatDelay: 100
            });
            i++;
            if (child.x > map.widthInPixels) {
                console.log("es gibt " + ++wievieldrueber + " zu viele tueten");
            }

        });
        schuh = this.physics.add.group({
            key: 'schuh',
            repeat: 35,
            setXY: {
                stepX: 1800
            }
        });


        i = 0;
        xVariable = 15000;
        wievieldrueber = 0;
        schuh.children.iterate(function (child) {
            child.anims.play('schuh', true);
            if ((Phaser.Math.FloatBetween(0, 2)) > 1.4) {
                child.flipY = true;
            }
            xKordinate = xVariable + Phaser.Math.FloatBetween(-100, 500);
            skipTrashZone(571, 640);
            skipTrashZone(960, 1240);

            skipTrashZone(1235, 1334);
            skipTrashZone(1456, 1551);
            skipTrashZone(1565, 1660);
            child.setY(Phaser.Math.FloatBetween(maximalWertMuellY, minimalWertMuellY));
            child.setX(xKordinate);
            xVariable += Phaser.Math.Between(700, 900);
            child.setDepth(300);
            if (child.x > map.widthInPixels) {
                console.log("es gibt " + ++wievieldrueber + " zu viele Schuhe");
            }

            setTimeout(function () {
                _this.tweens.add({
                    targets: child,
                    y: child.y + 100,
                    x: child.x + 50,
                    ease: 'Sine.easeInOut',
                    duration: 5000,
                    delay: 50,
                    repeat: -1,
                    yoyo: true,
                    repeatDelay: 100
                });
                i++;
            }, 2000)
        });

        plastikEimer = this.physics.add.group({
            key: 'plastikEimer',
            repeat: (100 - 44),
            setXY: {
                stepX: 2000
            }
        });
        wievieldrueber = 0;

        xVariable = Phaser.Math.FloatBetween(3000, 4000); //dient auch als starbtwert, ab wo verteilt werden soll
        i = Phaser.Math.FloatBetween(0, 500); //verzögert einsetzten des tweens für jeden

        plastikEimer.children.iterate(function (child) {
            setTimeout(function () {
                child.anims.playReverse('eimer', true);
            }, Phaser.Math.FloatBetween(0, 1000))
            if ((Phaser.Math.FloatBetween(0, 2)) > 1) { //funktionen die das drehen der assets zufällig machen soll, dadurch soll etwas abwechsung des muells erreicht wetden
                child.flipX = true;
            }
            if ((Phaser.Math.FloatBetween(0, 1)) > 0.5) {
                child.flipY = true;
            }
            if ((Phaser.Math.FloatBetween(0, 1)) > 0.5) {
                child.anims.playReverse('artikel', true);
            }



            xKordinate = xVariable + Phaser.Math.FloatBetween(-100, 500);
            skipTrashZone(581, 626);

            skipTrashZone(960, 1240);
            
            skipTrashZone(1235, 1334);

            skipTrashZone(1456, 1551);
            skipTrashZone(1565, 1660);
            child.setY(Phaser.Math.FloatBetween(maximalWertMuellY, minimalWertMuellY));
            child.setX(xKordinate);
            xVariable += Phaser.Math.Between(600, 900);
            child.setDepth(300);

            _this.tweens.add({
                targets: child,
                y: child.y - 70,
                x: child.x + 10,
                ease: 'Sine.easeInOut',
                duration: 5000,
                delay: i * 50,
                repeat: -1,
                yoyo: true,
                repeatDelay: 100
            });
            i++;
            if (child.x > map.widthInPixels) {
                console.log("es gibt " + ++wievieldrueber + " zu viele eimer");
            }
        });
        
        muellFlaschen = this.physics.add.group({
            key: 'muellFlasche',
            repeat: 60,
            setXY: {
                y: 410
            }
        });

        muellFlaschen.children.iterate(function (child) {
            child.setX(Phaser.Math.FloatBetween(100, map.widthInPixels))
            child.setY(Phaser.Math.FloatBetween(366, 390))
            setTimeout(function () {
                child.anims.play('flasche', true)
            }, Phaser.Math.FloatBetween(0, 1100))
            child.setGravityY(-100);
            child.setBounceY(1);
            child.setAlpha(0.86);
            child.setDepth(130);

            _this.tweens.add({
                targets: child,
                x: child.x + Phaser.Math.FloatBetween(-100, 100),
                ease: 'Sine.easeInOut',
                duration: 6000,
                delay: 50,
                repeat: -1,
                yoyo: true,
                repeatDelay: 100
            });
            if (child.x > map.widthInPixels) {
                console.log("es gibt " + ++wievieldrueber + " flaschen");
            }
        });

        sixPackRinge = this.physics.add.group();
        gruenerFetzten = this.physics.add.group();
        muellPartikel = this.physics.add.group();


            spawnTrashCluster(15, 10);
            spawnTrashCluster(1780, 12 * 32);
            spawnTrashCluster(1790, 14 * 32);
            spawnTrashCluster(1800, 13 * 32);
            spawnTrashCluster(1827, 20 * 32);

        sixPackRinge.children.iterate(function (child) {
            child.setDepth(300);
            setTimeout(function () {
                child.anims.play('sixpack', true);
                if ((Phaser.Math.FloatBetween(0, 2)) > 1) {
                    child.flipX = true;
                }
            }, Phaser.Math.FloatBetween(0, 1000))
        });
        gruenerFetzten.children.iterate(function (child) {
            child.setDepth(300);
            child.setAlpha(0.88);
            setTimeout(function () {
                child.anims.play('fetzen', true);
                if ((Phaser.Math.FloatBetween(0, 2)) > 1) {
                    child.flipX = true;
                }
            }, Phaser.Math.FloatBetween(0, 1000))
        });
        muellPartikel.children.iterate(function (child) {
            child.setDepth(300);
            setTimeout(function () {
                child.anims.play('artikel', true);
                if ((Phaser.Math.FloatBetween(0, 1)) > 0.5) {
                    child.flipX = true;
                    if ((Phaser.Math.FloatBetween(0, 1)) > 0.5) {
                        child.flipY = true;
                    }
                    if ((Phaser.Math.FloatBetween(0, 1)) > 0.5) {
                        child.anims.playReverse('artikel', true);
                    }
                }
                child.setAlpha(Phaser.Math.FloatBetween(0.6, 0.9));
            }, Phaser.Math.FloatBetween(0, 1000))
        });


    
        fish1 = this.physics.add.group();
        spawnFishSchool(425, 33, 3);
        spawnFishSchool(926, 43, 6);
        spawnFishSchool(740, 40, 7);
        spawnFishSchool(730, 30, 7);


        var __this = this;
        oelfleck = this.physics.add.group();
        oelflecken(600, 37);
        oelflecken(600, 39);
        oelflecken(1300, 30);
        oelflecken(1300, 40);
        oelflecken(1500, 38.3);
        var delayTime = 0;
        oelfleck.children.iterate(function (child) {
            child.setDepth(400);
            _this.tweens.add({
                targets: child,
                ease: 'Sine.easeInOut',
                duration: 1000,
                scaleY: Phaser.Math.FloatBetween(child.scale * 0.1, child.scale * 0.7),
                repeat: -1,
                yoyo: true,
                delay: delayTime

            });
            _this.tweens.add({
                targets: child,
                ease: 'Sine.easeInOut',
                duration: 1000,
                scaleX: Phaser.Math.FloatBetween(child.scale * 0.1, child.scale * 0.7),
                delay: 1000 + delayTime,
                repeat: -1,
                yoyo: true
            });
            delayTime += 500;
        });




        atomTonnen[0] = this.physics.add.image(1604 * 32, 350, 'atomTonne').setDepth(200).setVelocityY(1000);
        atomTonnen[1] = this.physics.add.image(1022 * 32, 750, 'atomTonne').setDepth(200).setVelocityY(1000);
        atomTonnen[2] = this.physics.add.image(1072 * 32, 750, 'atomTonne').setDepth(200).setVelocityY(1000);
        atomTonnen[3] = this.physics.add.image(1120 * 32, 750, 'atomTonne').setDepth(200).setVelocityY(1000);
        atomTonnen[4] = this.physics.add.image(1226 * 32, 750, 'atomTonne').setDepth(200).setVelocityY(1000);
        atomTonnen[5] = this.physics.add.image(1218 * 32, 750, 'atomTonne').setDepth(200).setVelocityY(1000);

        atomTonnen[6] = this.physics.add.image(1180 * 32, 750, 'atomTonne').setDepth(200).setVelocityY(1000);


        atomTonnen[7] = this.physics.add.image(985 * 32, 750, 'atomTonne').setDepth(200).setVelocityY(1000);

        atomTonnen[8] = this.physics.add.image(1127 * 32, 750, 'atomTonne').setDepth(200).setVelocityY(1000);

        atomTonnen[9] = this.physics.add.image(1137 * 32, 750, 'atomTonne').setDepth(200).setVelocityY(1000);

        atom = this.physics.add.group();


        herrErmann = this.physics.add.image(4400, 350, 'herrErmann').setDepth(200);


        this.background0 = this.add.tileSprite(0, 0, 2000, 1600, 'background0');
        this.background0.setOrigin(0, 0);
        this.background0.scrollFactorX = 0;

        sonnenstrahlen0 = this.add.tileSprite(0, 0, 2000, 1920 * 2, 'sonnenstrahlen0');
        sonnenstrahlen1 = this.add.tileSprite(0, 0, 2000, 1920 * 2, 'sonnenstrahlen1');
        waterSurfaceFront = this.add.tileSprite(0, 0, 2000, 1920 * 2, 'bg4surface');

        sonnenStrahlen = [sonnenstrahlen0, sonnenstrahlen1, waterSurfaceFront];

        for (var i = 0; i < sonnenStrahlen.length; i++) {
            sonnenStrahlen[i].setOrigin(0, 0);
            sonnenStrahlen[i].scrollFactorX = 0;
            sonnenStrahlen[i].setDepth(150);
            if (i == 0) {
                sonnenStrahlen[i].setAlpha(0.3);
            } else {
                sonnenStrahlen[i].setAlpha(0.8);
            }
            sonnenStrahlen[i].setDepth(130);
        }

        player.setDepth(130);

        bg4surface2 = this.add.tileSprite(0, 0, 2000, 1920 * 2, 'bg4surface2');
        bg4surface2.setOrigin(0, 0);
        bg4surface2.scrollFactorX = 0;
        bg4surface2.scrollFactorY = 0.98;
        bg4surface2.setDepth(110);
        bg4surface2.setAlpha(0.9);

        sonnenstrahlen2 = this.add.tileSprite(0, 0, 2000, 1920 * 2, 'sonnenstrahlen2');
        sonnenstrahlen2.setOrigin(0, 0);
        sonnenstrahlen2.scrollFactorX = 0;
        sonnenstrahlen2.scrollFactorY = 0.98;
        sonnenstrahlen2.setDepth(110);
        sonnenstrahlen2.setAlpha(0.9);

        this.tweens.add({
            targets: sonnenstrahlen1,
            ease: 'Sine.easeInOut',
            duration: 1000,
            alpha: 0.1,
            delay: 5,
            repeat: -1,
            yoyo: true,
            repeatDelay: 10
        });
        this.tweens.add({
            targets: sonnenstrahlen1,
            ease: 'Sine.easeInOut',
            duration: 5000,
            scaleX: 0.86,
            delay: 5,
            repeat: -1,
            yoyo: true,
            repeatDelay: 10
        });
        this.tweens.add({
            targets: sonnenstrahlen0,
            ease: 'Sine.easeInOut',
            duration: 5000,
            scaleX: 0.8,
            delay: 5,
            repeat: -1,
            yoyo: true,
            repeatDelay: 10
        });

        this.tweens.add({
            targets: bg4surface2,
            y: 10,
            x: 10,
            ease: 'Sine.easeInOut',
            duration: 1500,
            delay: 50,
            repeat: -1,
            yoyo: true,
            repeatDelay: 50
        });


        var groundTiles = map.addTilesetImage('tiles');
        groundLayer = map.createDynamicLayer('Boden', groundTiles, 0, 0);
        groundLayer.setCollisionByExclusion([-1]);
        groundLayer.setDepth(900);

        var himmelVorneTiles = map.addTilesetImage('tiles');
        himmelLayer = map.createDynamicLayer('Himmel', himmelVorneTiles, 0, 0);
        himmelLayer.setCollisionByExclusion([-1]);
        himmelLayer.setAlpha(0);




        countDownText = this.add.text((config.width / 2) - 30, 100, time, {
            fontSize: '60px',
            fontFamily: 'kongtext',
            fill: '#bb6957'
        }).setScrollFactor(0).setDepth(-1000);

        anfangsText = this.add.text(400, player.y, "", {
            fontFamily: 'kongtext',
            fontSize: '45px',
            fill: '#211640'
        });


        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(player);



        this.physics.world.bounds.width = groundLayer.width;
        this.physics.world.bounds.height = groundLayer.height;


        this.physics.add.collider(groundLayer, player);
        this.physics.add.collider(himmelLayer, muellFlaschen);

        for (var i = 0; i < atomTonnen.length; i++) {
            this.physics.add.collider(groundLayer, atomTonnen[i]);
        }
        this.physics.add.collider(groundLayer, oeltonne);
        for (var i = 0; i < seegrasR.length; i++) {
            this.physics.add.collider(groundLayer, seegrasR[i]);

        }
        this.physics.add.collider(groundLayer, korallenRiff1);



        this.physics.add.overlap(player, seegrasR, swimThroughSeaweed, null, this);
        this.physics.add.overlap(player, oelfleck, onTrashHit, null, this);

        this.physics.add.overlap(player, atom, onTrashHit, null, this);
        this.physics.add.overlap(player, muellTueten, onTrashHit, null, this);
        this.physics.add.overlap(player, sixPackRinge, onTrashHit, null, this);
        this.physics.add.overlap(player, schuh, onTrashHit, null, this);
        this.physics.add.overlap(player, plastikEimer, onTrashHit, null, this);
        this.physics.add.overlap(player, muellFlaschen, onTrashHit, null, this);
        this.physics.add.overlap(player, gruenerFetzten, onTrashHit, null, this);
        this.physics.add.overlap(player, muellPartikel, onTrashHit, null, this);
        this.physics.add.overlap(player, herrErmann, onTrashHit, null, this);

        this.physics.add.overlap(player, fish1, onFishHit, null, this);


    }

    update(_time, delta) {






        increaseSwimSpeed();

        if (cursors.up.isDown) {

            player.setVelocityY(-390);

            if (player.y < tauchAuf) {
                player.anims.play('tauchAuf', true);

                if (player.y < 364) {
                    player.setVelocityY(0);
                }

            } else {
                player.anims.play('up', true);
                player.anims.update('up', geschw * 0.04); //TODO: 

            }
        } else if (cursors.down.isDown) {
            player.setVelocityY(390);
            player.anims.play('down', true);
            player.anims.update('down', 10);
            if (player.y < tauchAuf) {
                player.anims.play('tauchAuf', true);
                player.anims.update('tauchAuf', framerate);
            }

        } else {
            player.setVelocityY(0);
        }
        if (cursors.right.isDown && !(geschw < 210)) {
            if (maxVor < 600) { //maximalgeschwin mit addition ist  ueber 100 //TODO: glaube hier gibts an sich ein logik fehler. mit kurzen drücken von 600 kann man an maximalgeschwindigkeit cheeten ? kann ab einer gewissen geschwindigkeit durch die map fliegen. problem noch nicht behoben
                player.setVelocityX(geschw + 203);
                this.cameras.main.setFollowOffset(maxVor, 0);
                maxVor += 3;
            }
            player.anims.update('swim', 29);
        } else if (cursors.left.isDown) {
            player.setVelocityX(geschw - 200);
            if (player.y < tauchAuf) {
                player.anims.play('tauchAuf', true);
                player.anims.update('tauchAuf', framerate * 0.02);
            } else {
                player.anims.play('down', true);
                player.anims.update('down', 0.8);
                player.anims.reverse = true;
                player.anims.update('swim', 1);

            }
            if (maxVor > -300) {
                this.cameras.main.setFollowOffset(maxVor, 0);
                maxVor -= 2;
            }
        } else {
            player.flipX = false;
            player.setVelocityX(geschw);
            if (maxVor == 0) {
            } else
            if (maxVor >= 0) {
                this.cameras.main.setFollowOffset(maxVor, 0);
                maxVor -= 2;
            } else if (maxVor <= 0) {
                if (maxVor <= 0 && maxVor > -2) {
                    maxVor = 0;
                }
                this.cameras.main.setFollowOffset(maxVor, 0);
                maxVor += 2;
            }
        }

        if (geschw < 120) {
        } else if (player.y < tauchAuf) {
            player.anims.play('tauchAuf', true);
        } else if (!cursors.left.isDown && !cursors.right.isDown && !cursors.up.isDown && !cursors.down.isDown) {
            player.anims.play('swim', true);
            player.anims.update('swim', geschw * 0.02);
        }




        const clampedDelta = Math.min(delta || 0, 100);
        _timerMsAcc += clampedDelta;

        const cameraX = this.cameras.main.worldView.x;

        while (_timerMsAcc >= TIMER_STEP_MS) {
            _timerMsAcc -= TIMER_STEP_MS;
            timer++; //timer wird in "virtuellen" 30fps ticks hochgezahlt

            if (timer % 20) {
                anfangsText.setText("Achte auf die Zeit..").setDepth(500);
            };
            if (timer % 60) {
                anfangsText.setAlpha(alph -= 0.004);
            };

            if (cameraX > 90) {
                if (timer % wieSchnellWirdRuntergezaehlt == 0) {
                    if (time > -1 && !vorbei) {
                        time--;
                    } else if (time == 0) {
                        endText = 'NOOO!';
                    }
                }
            }

            atomEmitter(atomTonnen[0], 1.1);
            atomEmitter(atomTonnen[1], 1.2);
            atomEmitter(atomTonnen[2], 1.3);
            atomEmitter(atomTonnen[3], 1.35);
            atomEmitter(atomTonnen[4], 1.65);
            atomEmitter(atomTonnen[5], 0.85);

            atomEmitter(atomTonnen[6], 0.75);
            atomEmitter(atomTonnen[7], 0.9);
            if (schwierigkeitsStufe == ('normal' || 'hard')) {
                atomEmitter(atomTonnen[8], 0.7);
                atomEmitter(atomTonnen[9], 0.8);
            } else {
                atomEmitter(atomTonnen[8], 1.6);
                atomEmitter(atomTonnen[9], 1.2);

            }
            atom.children.iterate(function (child) {
                if (child.y < 400) {
                    child.disableBody(true, true);
                }
            });
        }


        if (cameraX > 0 && cameraX < 90) {
            countDownText.setDepth(1000);
            time = 100;
        }
        if (time < 11) {
            countDownText.setColor('#f44141');

        }
        countDownText.setText(time + endText);


        _this = this;
        fish1.children.iterate(function (child) {
            if (player.x + 2100 > child.x && !player.x + 3100 < child.x) {
                _this.tweens.add({
                    targets: child,
                    x: child.x - 3000,
                    ease: 'Sine.easeOut',
                    duration: 19000,
                    delay: 50,
                    repeat: -1,
                    yoyo: true,
                    repeatDelay: 100
                });
                _this.tweens.add({
                    targets: child,
                    y: child.y + 30,
                    ease: 'Sine.easeInOut',
                    duration: 1600,
                    delay: 50,
                    repeat: -1,
                    yoyo: true
                });
            };
        });

        updateTrashClusterMovement();




        this.background0.tilePositionX = this.background0.tilePositionX += (geschw * 0.7);
        waterSurfaceFront.tilePositionX = waterSurfaceFront.tilePositionX += geschw * 0.008; //8.0
        sonnenstrahlen1.tilePositionX = sonnenstrahlen1.tilePositionX += geschw * 0.008; //8.0
        bg4surface2.tilePositionX = bg4surface2.tilePositionX += geschw * 0.006; //8.0
        sonnenstrahlen2.tilePositionX = sonnenstrahlen2.tilePositionX += geschw * 0.006; //8.0
        sonnenStrahlen[0].tilePositionX = sonnenStrahlen[0].tilePositionX += geschw * 0.0063; //8.0


        lowpassFilter(player.y);

        var _this = this;
        if (player.x > (2026 * 32) && !vorbei) {
            outroMainThemeStarten();

            vorbei = true;
            alph -= 0.0075;

            setTimeout(function () {
                _this.scene.start("HappyEnd");
            }, 3900);

        } else if (time == 0 && !vorbei) {
            gameOverThemeStarten();
            vorbei = true;
            time = '';
            _this.cameras.main.fade(2500);
            setTimeout(function () {

                _this.scene.start("GameOver");
            }, 3000);
        };
    }
}


function startTimer() {
    time = 100;
}

function increaseSwimSpeed() {
    if (geschw < 580) {
        geschw = geschw * 1.025;
        framerate = framerate * 1.0088;
    } else if (geschw < 799) {
        geschw = geschw * 1.0002;
        framerate = framerate * 1.0010;
    }

}

function geschwinPlus() {
    increaseSwimSpeed();
}

function swimThroughSeaweed(player, seaweed) {
    seaweed.setDepth(140);

    seaweed.anims.play('seegrasDown', true);


}

function swimTroughtSeegras(player, seegr) {
    swimThroughSeaweed(player, seegr);
}


function spawnTrashCluster(tileX, offsetY) {
    tileX = ++tileX * 32;
    for (var i = 0; i < 4; i++) {
        sixPackRinge.create(tileX + Math.random() * 400, maximalWertMuellY + offsetY + Math.random() * 200, 'sixPackRinge', i);
        gruenerFetzten.create(tileX + Math.random() * 400, maximalWertMuellY + offsetY + Math.random() * 200, 'gruenerFetzten', i);
        muellPartikel.create(tileX + Math.random() * 400, maximalWertMuellY + offsetY + Math.random() * 200, 'muellPartikel', i);
    }
}

function muellKneuel(woX, woY) {
    spawnTrashCluster(woX, woY);
}
var move = 2;

function updateTrashClusterMovement() {
    Phaser.Actions.IncX(sixPackRinge.getChildren(), Math.cos(move));
    Phaser.Actions.IncY(sixPackRinge.getChildren(), Math.sin(move));
    Phaser.Actions.IncX(gruenerFetzten.getChildren(), Math.cos(move));
    Phaser.Actions.IncY(gruenerFetzten.getChildren(), Math.sin(move));
    Phaser.Actions.IncX(muellPartikel.getChildren(), Math.cos(move));
    Phaser.Actions.IncY(muellPartikel.getChildren(), Math.sin(move));
    move += 0.02;
}

function muelltuetenBewegung() {
    updateTrashClusterMovement();
}


function seegrasRandom(von, bis, wieviele, _this) {
    von++; //tiledsets z
    seegrasR.push(_this.physics.add.group({
        key: 'seegras',
        repeat: wieviele, //total 12 ( 1 repeat 11)

    }));
    seegrasR[seegrasR.length - 1].children.iterate(function (child) {
        child.setX(Phaser.Math.FloatBetween(32 * von, 32 * bis));
        child.setVelocityY(1000);
        child.setDepth(100);
        setTimeout(function () {
            child.anims.play('normelSeeGrasFlow', true);

        }, Phaser.Math.FloatBetween(0, 5000))
    });
}

function spawnSeaweedRandomAuto(fromTile, toTile, scene) {
    fromTile++;
    seegrasR.push(scene.physics.add.group({
        key: 'seegras',
        repeat: (toTile - fromTile) * 1.1,

    }));
    seegrasR[seegrasR.length - 1].children.iterate(function (child) {
        child.setX(Phaser.Math.FloatBetween(32 * fromTile, 32 * toTile));
        child.setVelocityY(1000);
        child.setDepth(100);
        setTimeout(function () {
            child.anims.play('normelSeeGrasFlow', true);

        }, Phaser.Math.FloatBetween(0, 5000))
    });
}

function seegrasRandomAtomatik(von, bis, _this) {
    spawnSeaweedRandomAuto(von, bis, _this);
}


function skipTrashZone(fromTile, toTile) {
    while (xKordinate > 32 * (fromTile + 1) && xKordinate < 32 * (toTile)) {
        xVariable += 1000;
        xKordinate += 1000;
    }
}

function hierKeinMuell(vonWo, bisWo) {
    skipTrashZone(vonWo, bisWo);
}

function spawnFishSchool(startTileX, tileY, fishCount) {
    for (var i = 0; i < fishCount * 100; i += 120) {
        fish1.create((((startTileX + 1) * 32) + i) - (18.75 * 32), 32 * (tileY + 1), 'fish1').setDepth(400).anims.play('fish1', true, i % 4);

    }
    fish1.children.iterate(function (child) {
        child.anims.play('fish1', true);

    })
}

function woFishSchwarm(anfangX, yKachel, wieviele) {
    spawnFishSchool(anfangX, yKachel, wieviele);
}

function atomEmitter(atomTonne, wieSchnell) {
    if (player.x < atomTonne.x + 1920) { // hoert auf atome zu erzeugen, wenn atomtonne vom bildschirm verschwunden ist
        if (timer % (20 * wieSchnell) == 0 && timer % (40 * wieSchnell) != 0) {
            atom.create(atomTonne.x, atomTonne.y, 'atom');
            atom.children.iterate(function (child) {
                child.setDepth(300);
                child.setGravityY(-110);
                child.setGravityX(-30);
                child.anims.play('atom', true, timer % 4);
            });
        }
    }
}

function oelflecken(xLocation, yLocation) {
    let groesse = 0.1;
    let verteilung = 0.9;

    while ((yLocation * 32) > maximalWertMuellY) {
        if(groesse< 0.8){
          oelfleck.create(xLocation * 32, yLocation * 32, 'oelfleck').scale = groesse+0.4;   
        } else if (Phaser.Math.Between(0, 1) < 0.6) {
            oelfleck.create(xLocation * 32, yLocation * 32, 'oelfleck').scale = groesse;
        } else {
            oelfleck.create(xLocation * 32, yLocation * 32, 'oelfleck').scale = groesse / 1.3;
        }
        yLocation -= Phaser.Math.Between(1, 7);
        xLocation = xLocation + Phaser.Math.Between(-20, 15);
        verteilung = verteilung * Phaser.Math.Between(0.02, 1);
        if (schwierigkeitsStufe == 'normal') {
            groesse += 0.02;
        }
        groesse += 0.8;
    }


}



function onTrashHit(player, trash) {
    trash.disableBody(true, true);

    player.anims.play('gegen', true, );
    player.setTint(0xFF7D7D);
    setTimeout(function () {
        player.clearTint();
    player.anims.play('swim', true, );
    }, 700);
    framerate = 0;
    geschw = 50;
}

function hitMuell(player, muell) {
    onTrashHit(player, muell);
}

function onFishHit(player, fish) {
    fish.setVelocityX(0)
    fish.anims.play('hitFish', true);

    player.anims.play('gegen', true, );
    player.setTint(0xFF7D7D);
    setTimeout(function () {
        player.clearTint();
    }, 700);
    framerate = 0;
    geschw = 50;
    geschw - 60;
}

function hitFish(player, fish) {
    onFishHit(player, fish);
}

function muellImBoden(muell) {
    muell.setY(muell.y - 100);
}

var kannlosgehen = false;

function trackKannGestartetWerden() {
    return kannlosgehen;
}

function setKannLosgehen() {
    console.log("kann jetzt losgehen")
    kannlosgehen = true;
}
