var storyText;
var hasStartedTyping = false;
var storyIntroScene;
class StoryIntro extends Phaser.Scene {
    constructor() {
        super({
            key: "StoryIntro"
        });
    }
    create() {
        storyIntroScene = this;
        storyText = this.add.text(1920 / 2, 340, '', {
            fontFamily: 'kongtext',
            fontSize: '20px',
            fill: '#65a0e1'
        }).setAlpha(1);
    }


    update() {

        if (!hasStartedTyping) {
            hasStartedTyping = true;
            setTimeout(function () {
                writeStoryText();
            }, 12);
        }
    }



}

function writeStoryText() {
    const fullText = "Diese Geschichte handelt von dem kleinen Babywal Blue\n\nder seine Mutter verloren hat.\n\nMama Blue wurde zuletzt in der Höhle hinter den Korallenriffen gesehen.\n\nSchwimm so schnell wie möglich zur Höhle, bevor Mama Blue verschwunden ist!\n\n\nBaby Blue kennt den Weg zur Höhle und schwimmt sofort los.\n\nVersuche, mit den Pfeiltasten (Oben/Unten) dem Müll auszuweichen,\n\nmit den Pfeiltasten (Rechts/Links)\n\nkannst du etwas schneller oder langsamer schwimmen.";
    let displayText = "";
    let charIndex = 0;

    const interval = setInterval(function () {
        displayText += fullText.charAt(charIndex);
        charIndex++;
        storyText.setText(displayText);
        storyText.x = 1920 / 2 - storyText.width / 2;
        if (charIndex > fullText.length) {
            clearInterval(interval);
            storyIntroScene.scene.start('Hauptspiel');
        }
    }, 80);
}
