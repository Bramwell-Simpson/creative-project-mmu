import Phaser from "phaser";

export default class Coin extends Phaser.GameObjects.Image
{
    constructor(scene, x, y, texture, layer)
    {
        super(scene, x, y, texture);
        scene.add.existing(this)
    }

    checkCollection(player)
    {
        let playerBounds = player.getBounds();
        let coinBounds = this.getBounds();

        return Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, coinBounds);
    }

    collect(scoreManager)
    {
        scoreManager.add(10);
    }
}