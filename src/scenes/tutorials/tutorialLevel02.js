import Phaser from "phaser";

import CommandMatcher from "../../utils/commandMatcher";
import Player from "../../player";
import CoinManager from "../../managers/coinManager";
import ScoreManager from "../../managers/scoreManager";
import ScoreLabel from "../../score";

export default class TutorialLevel02 extends Phaser.Scene
{
    constructor()
    {
        super("tutorialLevel02")
    }

    preload() 
    {
        this.load.image('tiles', '../../assets/tilemaps/tiles/drawtiles-spacedV2.png');
        this.load.image('player', '../../assets/sprites/player.png');
        this.load.image('coin', "../../assets/sprites/coin.png");
        this.load.tilemapCSV('tutMap02', '../../assets/tilemaps/tutorials/tutorialLevel01.csv');
        this.load.html("textbox", "../.././src/utils/input.html");

        this.player = undefined;
        this.scoreManager = undefined;

        this.map = undefined;
        this.coins = undefined;
        this.timer = undefined;
        this.coinManager = undefined;
    }

    create()    
    {
        this.tutorialText()
    }

    tutorialText()
    {
        const message01 = "Great job on completing the first level! \nNow let's dive deeper into how functions work.\n\nIn programming, a function is a block of reusable code \nthat performs a specific task.\nThink of it as a recipe: you give it some inputs, \nit does something with them, and then it gives you an output.\n\nIn our game, we have another function called collect().\nThis function allows the square to pick up coins\nscattered throughout the maze.\n\nTo use the collect() function simply type collect() \nwhen you're on a tile with a coin. \nThe square will automatically collect the coin\n\nNow, let's practice using both the move() and collect()\nfunctions to navigate the square through\nthe maze and collect coins along the way!"
        const tutorialText = this.add.text(250, 0, message01, {fontSize: "30px", color: "#fff"})

        tutorialText.setAlign("center");

        const startText = this.add.text(650, 550, "Start tutorial >", {fontSize: "32px", color: "#fff"}).setAlign("center").setInteractive()

        startText.on("pointerdown", () => {
            tutorialText.setVisible(false);
            startText.disableInteractive();
            startText.setVisible(false);

            this.playMap()
        })
    }

    playMap()
    {
        this.map = this.make.tilemap({ key: 'tutMap02', tileWidth: 32, tileHeight: 32 });
        const tileset = this.map.addTilesetImage('tiles', null, 32, 32, 0, 2);
        const layer = this.map.createLayer(0, tileset, 400, 0);
        
        this.coinManager = new CoinManager();
        this.coins = this.coinManager.createCoins(this, this.map)

        const scoreLabel = new ScoreLabel(this, 0, 0, 0, {fontSize: "32px", fill: "#fff"})
        this.scoreManager = new ScoreManager(scoreLabel, 0)

        this.scoreManager.setScore(0);

        this.player = new Player(this, 32 + 16, 32 + 16, 'player', layer, this.coins, this.scoreManager, true);
        this.player.setPosition(608, 304)

        let inputBox = this.add.graphics();
        inputBox.fillStyle(0x222222, 1);
        inputBox.fillRect(1200, 0, 400, 580); 
        let textbox = this.add.dom(1400,290).createFromCache('textbox');

        const nextSceneButton = this.add.text(800, 550, "Next Tutorial >", {fontSize: "32px", color: "#000"}).setInteractive()
        nextSceneButton.setOrigin(0.5, 0.5)
        nextSceneButton.setBackgroundColor("#fff")
        
        nextSceneButton.on("pointerdown", () => {
            this.scene.start("tutorialLevel03");
        });


        var commandEntry = document.getElementById("textEntry");
        let submitButton = document.getElementById("submit");

        commandEntry.addEventListener("click", () => {
            commandEntry.focus();
        });

        submitButton.addEventListener("click", () => {

            let input;

            if(commandEntry instanceof HTMLTextAreaElement) {
                input = commandEntry.value;
                const commands = input.split('\n');
                console.log(commands);
            }
            else {
                console.error("Text Area not found");
            }

            this.player.executeCommands(input.split("\n"));
        })
    }
}
