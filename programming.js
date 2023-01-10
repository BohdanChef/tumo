function setup(){
createCanvas(400, 600);
Game.addCommonBalloon()
}

function draw() {

    background('orange')

    for (let balloon of Game.balloons) {

        balloon.display();
        balloon.move(Game.score);

        if (balloon.y < balloon.size / 2 && balloon.color != 'black' && balloon.color != 'gold') {

            noLoop()
            Game.balloons.length = 0 
            background (136, 220, 166);
            let finalScore = Game.score
            Game.score= ''
            textSize(64);
            fill('white');
            textAlign(CENTER, CENTER);
            text('FINISH', 200, 200);
            textSize(34);
            text('Score: ' + finalScore, 200, 300);
            }
    }

    textSize(32);
    fill('black');
    text(Game.score, 20, 40);

    if(frameCount % 50 === 0) {
    Game.addCommonBalloon()
    }

    if(frameCount % 100 === 0) {
        Game.addUniqBalloon()
    }
    if(frameCount % 150 === 0) {
        Game.addAngryBalloon()
    }
    if(frameCount % 800 === 0) {
        Game.addRandomBalloon()
    }
}

function mousePressed() {
    if (!isLooping()) {
        loop()
        Game.score = 0
    }
    Game.checkIfBalloonBurst()
}

class Game {
    static balloons = []
    static score = 0

    static addCommonBalloon () {
        let commonBalloon = new CommonBalloon('blue', 50);
        this.balloons.push(commonBalloon);
    }

    static addUniqBalloon () {
        let uniqBalloon = new UniqBalloon('green', 30);
        this.balloons.push(uniqBalloon);
    }

    static addAngryBalloon () {
        let angryBalloon = new AngryBalloon('black', 50);
        this.balloons.push(angryBalloon);
    }
    static addRandomBalloon () {
        let randomBalloon = new RandomBalloon('gold', 50);
        this.balloons.push(randomBalloon);
    }

    static checkIfBalloonBurst() {
        this.balloons.forEach((balloon, index) => {
            let distance = dist(balloon.x, balloon.y, mouseX, mouseY);
            if (distance <= balloon.size / 2) { 
                balloon.burst (index)
            
            }
        })
    }
}

class CommonBalloon {
    constructor(color, size) {
        this.x = random(width);
        this.y = random(height - 10, height + 50);
        this.color = color;
        this.size = size;
    }

    display() {
        fill(this.color);
        ellipse(this.x, this.y, this.size);
        line(this.x, this.y + this.size / 2, this.x, this.y + 2 * this.size);
    }

    move(score) {
        if (score < 100) {
            this.y -=0.5
        } else if (score > 100 && score < 200) {
            this.y -= 1
        } else {
            this.y -= 1.5
        }

    }

    burst(index) {
        Game.balloons.splice(index, 1)
        Game.score +=1
    }
}

class UniqBalloon extends CommonBalloon {
    constructor(color, size) {
        super(color, size)
    }

    burst(index) {
        Game.balloons.splice(index, 1)
        Game.score +=10
    }
}

class AngryBalloon extends CommonBalloon {
    constructor(color, size) {
        super(color, size)
    }

    burst(index) {
        Game.balloons.splice(index, 1)
        Game.score -=15
    }
}


class RandomBalloon {
    constructor(color, size) {
        this.x = random(width);
        this.y = random(height - 10, height + 50);
        this.color = color;
        this.size = size;
    }

    display() {
        fill(this.color);
        ellipse(this.x, this.y, this.size);
        line(this.x, this.y + this.size / 2, this.x, this.y + 2 * this.size);
    }

    move(x) {
        if (x <= 200 && x >= 0){
            this.y -=3
            this.x +=0.5
        } else if (x > 200 && x <= 400){
            this.y -=3
            this.x -=0.5
        }
    }


    burst(index) {
        Game.balloons.splice(index, 1)
        Game.score +=30
    }
}





