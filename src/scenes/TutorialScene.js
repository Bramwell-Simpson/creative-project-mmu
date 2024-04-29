import Phaser from "phaser";

export default class TutorialScene extends Phaser.Scene
{
    constructor()
    {
        super("tutorial");
    }

    create()
    {
        const tutorialText = this.add.text(800, (580 / 2), "Move by completing the function\n - move(DIRECTION, DISTANCE).\nDirection is (left/right/up/down)\n and distance is the number of tiles you would like to move", {fontSize: "32px", color: "#fff"});

        tutorialText.setAlign("center");
        tutorialText.setOrigin(0.5, 0.5);

        const startText = this.add.text(800, 400, "Start Game", {fontSize: "56px", backgroundColor: "#fff", color: "#008000"})
        startText.setOrigin(0.5, 0.5)

        startText.setInteractive()

        startText.on('pointerdown', () => 
        {
            console.log("clicked")
            this.scene.start('level-01')
        });
    }
}