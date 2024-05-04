import Phaser from "phaser";
import CommandMatcher from "./utils/commandMatcher";

let mapLayer;

const tileSize = 32;
const moveDelay = 250; //ms

export default class Player extends Phaser.GameObjects.Image
{

    constructor(scene, x, y, texture, layer, coins, scoreManager)
    {
        super(scene, x , y, texture);

        scene.add.existing(this);   

        this.commandChecker = new CommandMatcher();
        mapLayer = layer;

        this.coins = coins;
        this.scores = scoreManager;
    }

    move(direction, distance) {
        // Calculate step size based on direction
        const stepX = (direction === "left" ? -1 : direction === "right" ? 1 : 0);
        const stepY = (direction === "up" ? -1 : direction === "down" ? 1 : 0);
    
        // Check for collisions along the path
        for (let i = 0; i < distance; i++) {
            // Calculate target position for this step
            const targetX = this.x + stepX * tileSize;
            const targetY = this.y + stepY * tileSize;
    
            // Check if the target position is on an unwalkable tile
            if (this.checkCollision(targetX, targetY, mapLayer)) {
                // Collision detected, prevent player movement
                const blockedText = this.scene.add.text(0, 50, "Blocked!", {fontSize: "32px", color: "#f00"})
                this.scene.time.addEvent({
                    delay: 5000,
                    callback: () => {
                        blockedText.destroy();
                    }
                })
                return;
            }
    
            // Update player position for this step
            this.x = targetX;
            this.y = targetY;
        }
    }

    collectCoin()
    {
        this.coins.forEach(coin => {
            if (this.x === coin.x && this.y === coin.y)
            {
                this.scores.add(10);
                const coinCollectedText = this.scene.add.text(0, 50, "Coin collected!", {fontSize: "32px", color: "#008000"})
                this.scene.time.addEvent({
                    delay: 5000,
                    callback: () => {
                        coinCollectedText.destroy();
                    }
                })
                coin.destroy();
            }
        });

        if(this.scores.score === 30)
        {
            this.scene.add.text(0, 50, "Level Complete!", {fontSize: "32px", color: "#008000"});
        }
    }
    
    checkCollision(tileX, tileY, layer) {
        let tile = layer.getTileAtWorldXY(tileX, tileY, true);

        // Check if the target tile is unwalkable
        return tile.index === 2; 
    }

    executeCommands(input) {
        // Variable to keep track of the current command index
        let currentIndex = 0;
    
        // Define a recursive function to execute the commands
        const executeNextCommand = () => {
            // Check if there are more commands to execute
            if (currentIndex < input.length) {
                // Execute the current command
                let currentCommand = this.commandChecker.checkInput(input[currentIndex]);
                if (currentCommand === null) {
                    // If the current command is invalid, skip to the next one
                    currentIndex++;
                    executeNextCommand();
                    return;
                }
    
                // Execute the current command after a delay
                if(currentCommand[0] === "move")
                {
                    this.move(currentCommand[1], currentCommand[2]);
                }
                else if(currentCommand[0] === "collect")
                {
                    this.collectCoin()
                }

    
                // Increment the current command index
                currentIndex++;
    
                // Schedule the next command execution with a delay
                let timer = this.scene.time.addEvent({
                    delay: 500, 
                    callback: executeNextCommand,
                    callbackScope: this
                });
            }
        };
    
        // Start executing the commands
        executeNextCommand();
    }
    
}