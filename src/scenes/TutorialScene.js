import Phaser from "phaser";

export default class TutorialScene extends Phaser.Scene
{
    constructor()
    {
        super("tutorial");
    }

    create()
    {
        const functionText = this.add.text(800, 150, "What is a function?\n\nFunctions are \"self contained\" modules of code that accomplish a specific task.\n Functions usually \"take in\" data, process it, and \"return\" a result.\n Once a function is written, it can be used over and over and over again.", {fontSize: "32px", color: "#fff"})

        functionText.setAlign("center")
        functionText.setOrigin(0.5, 0.5)

        const tutorialText = this.add.text(800, 350, "Move by completing the function\n - move(DIRECTION, DISTANCE).\nDirection is (left/right/up/down)\n and distance is the number of tiles you would like to move.\nTo collect a coin, use the collect() function.", {fontSize: "32px", color: "#fff"});

        tutorialText.setAlign("center");
        tutorialText.setOrigin(0.5, 0.5);

        const startText = this.add.text(800, 500, "Start Game", {fontSize: "56px", backgroundColor: "#fff", color: "#008000"})
        startText.setOrigin(0.5, 0.5)

        startText.setInteractive()

        startText.on('pointerdown', () => 
        {
            console.log("clicked")
            this.scene.start('level-01')
        });
    }
}