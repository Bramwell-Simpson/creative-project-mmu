import Phaser from "phaser";
import CommandMatcher from "../../utils/commandMatcher";
import Player from "../../player";
import CoinManager from "../../managers/coinManager";
import ScoreManager from "../../managers/scoreManager";
import ScoreLabel from "../../score";

export default class TutorialLevel01 extends Phaser.Scene
{
    constructor()
    {
        super("tutorialLevel01")
    }

    preload() 
    {
        this.load.image('tiles', '../../assets/tilemaps/tiles/drawtiles-spacedV2.png');
        this.load.image('car', '../../assets/sprites/player.png');
        this.load.image('coin', "../../assets/sprites/coin.png");
        this.load.tilemapCSV('tutMap01', '../../assets/tilemaps/tutorials/tutorialLevel01.csv');
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
        const message01 = "Welcome to the Tutorial!\n\nIn this tutorial, you'll learn the basics of \nnavigating through the maze using programming commands. \nOur maze consists of walls, and your goal is to move the \nsquare from the starting point to the exit.\n\nLet's start with the most basic command: move(direction, steps).\nThis command allows you to move the square in a \nspecified direction for a certain number of steps.\n\nFor example, to move the square 3 steps to the right, \nyou would type: move(right, 3). Go ahead and give it a try!"
        const tutorialText = this.add.text(200, 0, message01, {fontSize: "32px", color: "#fff"})

        tutorialText.setAlign("center");

        const startText = this.add.text(650, 450, "Start tutorial >", {fontSize: "32px", color: "#fff"}).setAlign("center").setInteractive()

        startText.on("pointerdown", () => {
            tutorialText.setVisible(false);
            startText.disableInteractive();
            startText.setVisible(false);

            this.playMap()
        })
    }

    playMap()
    {
        this.map = this.make.tilemap({ key: 'tutMap01', tileWidth: 32, tileHeight: 32 });
        const tileset = this.map.addTilesetImage('tiles', null, 32, 32, 0, 2);
        const layer = this.map.createLayer(0, tileset, 400, 0);

        let matcher = new CommandMatcher();
        this.coinManager = new CoinManager();

        //Hide Score as not required
        const scoreLabel = new ScoreLabel(this, 0, 0, 0, {fontSize: "32px", fill: "#fff"}).setVisible(false);
        this.scoreManager = new ScoreManager(scoreLabel, 0)

        this.player = new Player(this, 32 + 16, 32 + 16, 'car', layer, this.coins, this.scoreManager, true);
        this.player.setPosition(608, 304)

        let inputBox = this.add.graphics();
        inputBox.fillStyle(0x222222, 1);
        inputBox.fillRect(1200, 0, 400, 580); 
        let textbox = this.add.dom(1400,290).createFromCache('textbox');

        const nextSceneButton = this.add.text(800, 550, "Next Tutorial >", {fontSize: "32px", color: "#000"}).setInteractive()
        nextSceneButton.setOrigin(0.5, 0.5)
        nextSceneButton.setBackgroundColor("#fff")
        
        nextSceneButton.on("pointerdown", () => {
            this.scene.start("tutorialLevel02");
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