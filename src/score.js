import Phaser from "phaser";

export default class ScoreLabel extends Phaser.GameObjects.Text
{
    constructor(scene, x, y, score, style)
    {
        super(scene, x, y, score, style);
        scene.add.existing(this);
    }
}