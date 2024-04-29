import Phaser from 'phaser'

import Level01Scene from './scenes/Level01Scene'
import Level02Scene from './scenes/Level02Scene'
import TutorialScene from './scenes/TutorialScene'

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 1600,
	height: 580,
	dom: {
        createContainer: true
    },

    pixelArt: true,
    backgroundColor: '#00000',
	scene: [TutorialScene, Level01Scene, Level02Scene]
}

export default new Phaser.Game(config)
