
var mainSong = null;
var walRufe = null;
var intro = null;
var outroMainTheme = null;
var outro = null;
var gameOverTheme = null;
var filter = null;

var audioInitialized = false;
var audioReadyResolve = null;
var audioReadyPromise = null;
var audioFilesPreloaded = false;
var audioFilesPreloadPromise = null;

const audioAssetUrls = {
    whale: "./audio/walsounds2.wav",
    intro: "./audio/intro-song.mp3",
    main: "./audio/main-song.mp3",
    happyEnd: "./audio/happyend-theme.mp3",
    outro: "./audio/outro-theme.mp3",
    gameOver: "./audio/gameover-theme.mp3"
};

function preloadAudioFiles(onProgress) {
    if (audioFilesPreloaded) {
        if (typeof onProgress === 'function') {
            onProgress(1);
        }
        return Promise.resolve();
    }

    if (audioFilesPreloadPromise) {
        return audioFilesPreloadPromise;
    }

    const urls = Object.values(audioAssetUrls);
    const total = urls.length;
    let loaded = 0;

    audioFilesPreloadPromise = Promise.all(urls.map(function (url) {
        return fetch(url, {
            cache: 'force-cache'
        }).then(function (response) {
            if (!response.ok) {
                throw new Error('Audio load failed: ' + url);
            }

            return response.arrayBuffer();
        }).then(function () {
            loaded++;
            if (typeof onProgress === 'function') {
                onProgress(loaded / total);
            }
        });
    })).then(function () {
        audioFilesPreloaded = true;
    }).catch(function (error) {
        audioFilesPreloadPromise = null;
        throw error;
    });

    return audioFilesPreloadPromise;
}

function createAudioGraph() {
    if (audioInitialized) {
        return;
    }

    audioInitialized = true;

    walRufe = new Tone.Player(audioAssetUrls.whale);
    intro = new Tone.Player(audioAssetUrls.intro, introStart);
    intro.toMaster();
    mainSong = new Tone.Player(audioAssetUrls.main);
    outroMainTheme = new Tone.Player(audioAssetUrls.happyEnd);
    outro = new Tone.Player(audioAssetUrls.outro);
    gameOverTheme = new Tone.Player(audioAssetUrls.gameOver);

    filter = new Tone.Filter({
        type: 'lowpass',
        frequency: 2000,
        rolloff: -12,
        Q: 7.4,
        gain: 100
    });

    filter.toMaster();
}

function ensureAudioStarted() {
    if (audioReadyPromise) {
        return audioReadyPromise;
    }

    audioReadyPromise = new Promise(async function (resolve, reject) {
        audioReadyResolve = resolve;

        try {
            if (Tone.context.state !== 'running') {
                await Tone.start();
            }

            createAudioGraph();
        } catch (error) {
            audioReadyPromise = null;
            audioReadyResolve = null;
            reject(error);
        }
    });

    return audioReadyPromise;
}

function introStart() {

    if (outroMainTheme && outroMainTheme.state == true) {
        outroMainTheme.stop();
    }
    intro.volume.value = -20;
    intro.fadeIn = 3;
    intro.loop = true;
    intro.start();
    kannSpielen = true;
    if (storyBtn) {
        storyBtn.setAlpha(1);
    }

    if (audioReadyResolve) {
        audioReadyResolve();
        audioReadyResolve = null;
    }
}

function outroMainThemeStarten() {
    outroMainTheme.toMaster();
    outroMainTheme.volume.value = -15;
    mainSong.fadeOut = 1;
    outroMainTheme.fadeIn = 3.3;
    outroMainTheme.start();
}

function outroStarten() {
    outro.toMaster();
    outro.volume.value = -15;
    outro.start();
}

function gameOverThemeStarten() {
    gameOverTheme.toMaster();
    mainSong.fadeOut = 0.2;//funktioniert irgendwie nicht richtig
    gameOverTheme.fadeIn = 3.6;
    gameOverTheme.loop = true;
    gameOverTheme.start();
}

function songStart() {
    if (!mainSong || !filter) {
        createAudioGraph();
    }

    intro.disconnect();
    intro.stop();
    mainSong.volume.value = -15;
    setTimeout(function () {
        mainSong.connect(filter);

        mainSong.start();
    }, 2000);
    setKannLosgehen();
}

var q = 3.4;

var frequenz = 200;

var jetztGehtslos = 0; 



function lowpassFilter(freq) {
    frequenz = freq;
    if (frequenz > 5400) {
        if (frequenz < 194 && jetztGehtslos == 0) {
            console.log("eey");
            jetztGehtslos++;
        } else {
            jetztGehtslos = 0;
        }
        filter.frequency._param.value = 8100 - freq * 15;
    } else {
        filter.frequency._param.value = 8100 - freq * 5.2;
    }
}
