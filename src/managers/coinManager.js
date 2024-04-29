import Phaser from "phaser";
import Coin from "../coin";

export default class CoinManager 
{

    constructor()
    {
        
    }

    //This function gets all walkable tiles (2), places them into an array, shuffles it, then picks 3 to place a coin on
    createCoins(scene, map)
    {
        let walkableTiles = [];

        map.forEachTile(function(tile) {
            //walkable tile spotted - store the coords
            if(tile.index === 0)
            {
                walkableTiles.push({x: tile.x, y: tile.y});
            }
        })

        Phaser.Utils.Array.Shuffle(walkableTiles);

        let randomTiles = walkableTiles.slice(0, 3);
        let coinArray = []
        randomTiles.forEach(function(tile) {
            console.log({x: tile.x * 32, y: tile.y * 32});

            var gameObjectX = (tile.x * map.tileWidth + 16) + 400;
            var gameObjectY = tile.y * map.tileHeight + 16;

            // Place your game object at the calculated position
      
            coinArray.push(new Coin(scene, gameObjectX, gameObjectY, 'coin'));
        });

        return coinArray;
    }
}