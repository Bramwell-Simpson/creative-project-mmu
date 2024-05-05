import Phaser from "phaser";
import CommandMatcher from "../utils/commandMatcher";
import Player from "../player";
import CoinManager from "../managers/coinManager";
import ScoreManager from "../managers/scoreManager";
import ScoreLabel from "../score";
import Tip from "../tip";

export default class Level01Scene extends Phaser.Scene
{
    constructor()
    {
        super('level-01');
    }

    preload() 
    {
        this.load.image('tiles', '../assets/tilemaps/tiles/drawtiles-spacedV2.png');
        this.load.image('car', '../assets/sprites/player.png');
        this.load.image('coin', "../assets/sprites/coin.png");
        this.load.tilemapCSV('map', '../assets/tilemaps/level02.csv');
        this.load.html("textbox", "./src/utils/input.html");

        this.player = undefined;
        this.scoreManager = undefined;

        this.map = undefined;
        this.coins = undefined;
        this.timer = undefined;
        this.coinManager = undefined;
    }

    create()    
    {
        this.map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });
        const tileset = this.map.addTilesetImage('tiles', null, 32, 32, 0, 2);
        const layer = this.map.createLayer(0, tileset, 400, 0);

        this.emitter = new Phaser.Events.EventEmitter();

        this.emitter.on('changeScene', this.changeScene, this);

        let matcher = new CommandMatcher();
        this.coinManager = new CoinManager();

        this.coins = this.coinManager.createCoins(this.scene.scene, this.map);

        const scoreLabel = new ScoreLabel(this, 0, 0, 0, {fontSize: "32px", fill: "#fff"})
        this.scoreManager = new ScoreManager(scoreLabel, 0)

        this.scoreManager.setScore(0);

        this.player = new Player(this, 32 + 16, 32 + 16, 'car', layer, this.coins, this.scoreManager, false);
        this.player.setPosition(448, 48)

        let inputBox = this.add.graphics();
        inputBox.fillStyle(0x222222, 1);
        inputBox.fillRect(1200, 0, 400, 580); 
        let textbox = this.add.dom(1400,290).createFromCache('textbox');

        var commandEntry = document.getElementById("textEntry");
        let submitButton = document.getElementById("submit");

        const tipText = new Tip(this, 0, 540, "?", {fontSize: "32px", fill: "#fff"})

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

    update()
    {
        if(this.scoreManager.score === 30)
        {
            this.emitter.emit('changeScene');
        }
    }

    changeScene()
    {
        this.time.addEvent({
            delay: 5000, // Delay in milliseconds (5 seconds)
            callback: () => {
                this.scene.start("level-02");
                console.log("switched?") // Switch to nextScene after the delay
            },
            callbackScope: this
        }); 
    }
}