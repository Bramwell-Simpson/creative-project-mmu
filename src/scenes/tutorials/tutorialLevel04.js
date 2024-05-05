import Phaser from "phaser";

export default class TutorialLevel04 extends Phaser.Scene
{
    constructor()
    {
        super("tutorialLevel04");
    }

    create()
    {
        const message01 = "You've made it to the end of the tutorials! Let's recap what you've learned:\n\n• You learned how to use the move function to navigate the square through the maze.\n• You understood the concept of functions and how they work.\n• You practiced combining commands to create more complex movements.\n\nNow, it's time for the ultimate challenge: navigate the square through the maze \nusing everything you've learned so far.\n\nRemember to plan your moves carefully and use your programming skills wisely!\n\nGood luck, and have fun!";

        this.add.text(0, 200, message01, {fontSize: "32px", color: "#fff"}).setAlign("left").setOrigin(0, 0.5).setAlign("left");

        const startText = this.add.text(800, 500, "Start Game!", {fontSize: "56px", backgroundColor: "#fff", color: "#008000"});
        startText.setOrigin(0.5, 0.5);
        
        startText.setInteractive();

        startText.on('pointerdown', () => 
        {
            console.log("clicked");
            this.scene.start('level-01');
        });
    }
}