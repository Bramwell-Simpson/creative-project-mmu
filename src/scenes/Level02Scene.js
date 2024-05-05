import Phaser from "phaser";
import CommandMatcher from "../utils/commandMatcher";
import Player from "../player";
import CoinManager from "../managers/coinManager";
import ScoreManager from "../managers/scoreManager";
import ScoreLabel from "../score";

export default class Level02Scene extends Phaser.Scene
{
    constructor()
    {
        super({ key: 'level-02' });
    }

    preload() 
    {
        this.player = undefined;
        this.scoreManager = undefined;

        this.map = undefined;
        this.coins = undefined;
        this.timer = undefined;
        this.coinManager = undefined;

        this.load.image('tiles', '../assets/tilemaps/tiles/drawtiles-spacedV2.png');
        this.load.image('car', '../assets/sprites/player.png');
        this.load.image('coin', "../assets/sprites/coin.png");
        this.load.tilemapCSV('map02', '../assets/tilemaps/level01.csv');
        this.load.html("textbox", "./src/utils/input.html");
    }

    create() 
    {
        this.map = this.make.tilemap({ key: 'map02', tileWidth: 32, tileHeight: 32 });
        const tileset = this.map.addTilesetImage('tiles', null, 32, 32, 0, 2);
        const layer = this.map.createLayer(0, tileset, 400, 0);

        let matcher = new CommandMatcher();
        this.coinManager = new CoinManager();

        this.coins = this.coinManager.createCoins(this.scene.scene, this.map);

        //const player = this.add.image(32 + 16, 32 + 16, 'car');
        //player.setPosition(448, 48);


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
                console.error("the hell");
            }

            this.player.executeCommands(input.split("\n"));
        })
        
    }
}