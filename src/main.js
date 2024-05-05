import Phaser from 'phaser'

import Level01Scene from './scenes/Level01Scene'
import Level02Scene from './scenes/Level02Scene'
import TutorialLevel01 from './scenes/tutorials/tutorialLevel01'
import TutorialLevel02 from './scenes/tutorials/tutorialLevel02'
import TutorialLevel03 from './scenes/tutorials/tutorialLevel03'
import TutorialLevel04 from './scenes/tutorials/tutorialLevel04'

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
	scene: [TutorialLevel01, TutorialLevel02, TutorialLevel03, TutorialLevel04, Level01Scene, Level02Scene]
}

export default new Phaser.Game(config)
