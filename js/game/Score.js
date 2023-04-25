export default class Score {
    static scores = [];
  
    constructor(name, score) {
      this.name = name;
      this.score = score;
    }
  
    addScore(score) {
      this.scores.push(score);
      this.scores.sort((a, b) => b - a); // Sort scores in descending order
    }
  
    getScores() {
      return this.scores;
    }
  
    // Draw the score on the canvas
    drawScore(ctx) {
      ctx.font = "bold 24px Arial"; // Set the font
      ctx.fillStyle = "white"; // Set the text color
      ctx.textAlign = "left"; // Set the horizontal alignment
      ctx.textBaseline = "top"; // Set the vertical alignment
      ctx.fillText(`Score: ${this.score}`, 10, 10); // Draw the score text
    }
  }
  
  // Example usage
//   const score = new Score("Player 1", 100);
//   score.addScore(50);
//   score.addScore(200);
//   console.log(score.getScores()); // [200, 100, 50]
  