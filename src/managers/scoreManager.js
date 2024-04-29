import Phaser from "phaser";

const formatScore = (score) => `Score: ${score}`

export default class ScoreManager
{
    constructor(scoreLabel, score)
    {
        this.score = score;
        this.label = scoreLabel
    }

    setScore(score)
    {
        this.score = score;
        this.updateScore();
    }

    add(points)
    {
        this.setScore(this.score + points);
    }

    updateScore()
    {
        this.label.setText(formatScore(this.score));
    }

}