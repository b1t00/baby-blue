
function createAnimation(scene) {
    scene.anims.create({
        key: 'swim',
        frames: scene.anims.generateFrameNumbers('player', {
            start: 0,
            end: 47, //bisschen viele Frames. TODO: kurzer/ effizienter machen
        }),
        frameRate: geschw * 0.2,
        repeat: -1
    });

    
    scene.anims.create({
        key: 'auge',
        frames: scene.anims.generateFrameNumbers('mamaAuge', {
            start: 0,
            end: 9,
        }),
        frameRate: 4,
        repeat: 0,
        yoyo: true
    });
    
    scene.anims.create({
        key: 'augeEnd',
        frames: scene.anims.generateFrameNumbers('mamaAuge', {
            start: 11,
            end: 13,
        }),
        frameRate: 0.9,
        repeat: -1,
        yoyo: true
    });


    scene.anims.create({
        key: 'down',
        frames: scene.anims.generateFrameNumbers('player', {
            start: 6,
            end: 7,
        }),
        frameRate: framerate * 3,
        repeat: -1
    })

    scene.anims.create({
        key: 'up',
        frames: scene.anims.generateFrameNumbers('player', {
            start: 0,
            end: 3
        }),
        frameRate: framerate * 4,
        repeat: -1
    })

    scene.anims.create({
        key: 'tauchAuf',
        frames: scene.anims.generateFrameNumbers('tauchAuf', {
            start: 0,
            end: 3,
        }),
        frameRate: framerate * 4,
        repeat: -1
    })
    scene.anims.create({
        key: 'gegen',
        frames: scene.anims.generateFrameNumbers('player', {
            start: 48,
            end: 49
        }),
        frameRate: 8,
        repeat: -1
    })

    scene.anims.create({
        key: 'wasser',
        frames: scene.anims.generateFrameNumbers('bg4surface2', {
            start: 0,
            end: 1,
        }),
        frameRate: 3,
        repeat: -1,
    })


    scene.anims.create({
        key: 'normelSeeGrasFlow',
        frames: scene.anims.generateFrameNumbers('seegras', {
            start: 0,
            end: 13,
        }),
        frameRate: 3,
        repeat: -1,
    })

    scene.anims.create({
        key: 'seegrasDown',
        frames: scene.anims.generateFrameNumbers('seegras', {
            start: 14,
            end: 19,
        }),
        frameRate: 10,
        repeat: -1,
        yoyo: true,
    })


    scene.anims.create({
        key: 'tuete',
        frames: scene.anims.generateFrameNumbers('muellTueten', {
            start: 1,
            end: 4
        }),
        frameRate: 3.4,
        repeat: -1,
        yoyo: true
    })

    scene.anims.create({
        key: 'sixpack',
        frames: scene.anims.generateFrameNumbers('sixPackRinge', {
            start: 0,
            end: 3
        }),
        frameRate: 8,
        repeat: -1,
        yoyo: true
    })

    scene.anims.create({
        key: 'flasche',
        frames: scene.anims.generateFrameNumbers('muellFlasche', {
            start: 0,
            end: 10
        }),
        frameRate: 12.4,
        repeat: -1,
        yoyo: true
    })
    scene.anims.create({
        key: 'fetzen',
        frames: scene.anims.generateFrameNumbers('gruenerFetzten', {
            start: 0,
            end: 6
        }),
        frameRate: 3.4,
        repeat: -1,
        reverse: true
    })
    scene.anims.create({
        key: 'schuh',
        frames: scene.anims.generateFrameNumbers('schuh', {
            start: 0,
            end: 1
        }),
        frameRate: 4,
        yoyo: true,
        repeat: -1,
    })

    scene.anims.create({
        key: 'eimer',
        frames: scene.anims.generateFrameNumbers('plastikEimer', {
            start: 0,
            end: 6
        }),
        frameRate: 7.4,
        repeat: -1,
        yoyo: true,
    })

    scene.anims.create({
        key: 'artikel',
        frames: scene.anims.generateFrameNumbers('muellPartikel', {
            start: 0,
            end: 3
        }),
        frameRate: 7.4,
        repeat: -1,
        yoyo: true,
    })

    scene.anims.create({
        key: 'atom',
        frames: scene.anims.generateFrameNumbers('atom', {
            start: 0,
            end: 3
        }),
        frameRate: 10.4,
        repeat: -1,
        yoyo: true
    })

    scene.anims.create({
        key: 'ermann',
        frames: scene.anims.generateFrameNumbers('herrErmann', {
            start: 0,
            end: 3
        }),
        frameRate: 10.4,
        repeat: -1,
        yoyo: true
    })


    scene.anims.create({
        key: 'fish1',
        frames: scene.anims.generateFrameNumbers('fish1', {
            start: 0,
            end: 4
        }),
        frameRate: 3.4,
        repeat: -1,
        yoyo: true
    })

    scene.anims.create({
        key: 'hitFish',
        frames: scene.anims.generateFrameNumbers('fish1', {
            start: 5,
            end: 6
        }),
        frameRate: 10,
        repeat: -1,
        yoyo: true
    })



    scene.anims.create({
        key: 'storyBtnDown',
        frames: scene.anims.generateFrameNumbers('storyBtn', {
            start: 1,
            end: 1
        }),
        frameRate: 10,
        repeat: 1,
    })
    scene.anims.create({
        key: 'storyBtnUp',
        frames: scene.anims.generateFrameNumbers('storyBtn', {
            start: 0,
            end: 0
        }),
        frameRate: 10,
        repeat: 1,
    })
    scene.anims.create({
        key: 'easyBtnDown',
        frames: scene.anims.generateFrameNumbers('easyBtn', {
            start: 1,
            end: 1
        }),
        frameRate: 10,
        repeat: 1,
    })
    scene.anims.create({
        key: 'normalBtnDown',
        frames: scene.anims.generateFrameNumbers('normBtn', {
            start: 1,
            end: 1
        }),
        frameRate: 10,
        repeat: 1,
    })
    scene.anims.create({
        key: 'hardBtnDown',
        frames: scene.anims.generateFrameNumbers('hardBtn', {
            start: 1,
            end: 1
        }),
        frameRate: 10,
        repeat: 1,
    })
        scene.anims.create({
        key: 'menuBtnDown',
        frames: scene.anims.generateFrameNumbers('menuBtn', {
            start: 1,
            end: 1
        }),
        frameRate: 10,
        repeat: 1,
    })
            scene.anims.create({
        key: 'skiptBtnDown',
        frames: scene.anims.generateFrameNumbers('skipBtn', {
            start: 1,
            end: 1
        }),
        frameRate: 10,
        repeat: 1,
    })

}
