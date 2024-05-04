import Phaser from "phaser";

export default class Tip extends Phaser.GameObjects.Text
{
    constructor(scene, x, y, text, style)
    {
        super(scene, x, y, text, style);
        scene.add.existing(this);

        this.isOpen = false;

        this.setInteractive();
        this.on("pointerdown", () => {
            if(this.isOpen)
            {
                this.closeTip();              
            }
            else 
            {
                this.openTip();
            }

        }, this);

        this.setAlign("center");
        this.setOrigin(0, 0.5);

        this.tipObject = undefined;
    }

    openTip()
    {
        this.text = "X";
        this.isOpen = true;

        const tipText = "To collect a coin, submit \'collect()\'.\nTo move right 5 tiles -\ntype \'move(right, 5)\'."

        this.tipObject = this.scene.add.text(this.x, this.y - 75, tipText, {fontSize: "16px", color: "#fff"})
    }

    closeTip()
    {
        this.text = "?";
        this.isOpen = false;
        this.tipObject.destroy();
    }

}