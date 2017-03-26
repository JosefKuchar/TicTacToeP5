var ratioW = 1;
var ratioH = 1;
var RATIO = ratioW / ratioH;
var world = {
    width: ratioW * 1000,
    height: ratioH * 1000
}
var SCALE = 0;
var offset = 70;
var end = false;

var paper;

function setup() {
    if (windowHeight < windowWidth) {
        createCanvas(windowHeight * RATIO, windowHeight);
    } else {
        createCanvas(windowWidth, windowWidth * RATIO);
    }

    paper = new Paper(15);
}

function draw() {
    background(238);

    updateScale();

    paper.render();

    renderText();

    if (paper.gameDone() === 0 || paper.gameDone() === 1) {
        console.log(paper.gameDone())
        fill(255);
        rect(width / 4, height / 4, width / 2, height / 2);
        
        var current = paper.gameDone() === 0 ? "X" : "O";
        fill(51);
        textSize(60 * SCALE);
        text("Player " + current + " wins!", width / 2, height / 2);
        textSize(25 * SCALE);
        text("Press any key to restart game", width / 2, height / 2 + 50 * SCALE);
        end = true;
    } else if (paper.gameDone() === 2) {
        fill(255);
        rect(width / 4, height / 4, width / 2, height / 2);

        fill(51);
        textSize(60 * SCALE);
        text("Draw!", width / 2, height / 2);
        textSize(25 * SCALE);
        text("Press any key to restart game", width / 2, height / 2 + 50 * SCALE);
        end = true;
    }
}

function windowResized() {
    if (windowHeight < windowWidth) {
        resizeCanvas(windowHeight * RATIO, windowHeight);
    } else {
        resizeCanvas(windowWidth, windowWidth * RATIO);
    }
}

function updateScale() {
    SCALE = width / world.width;
}

function mousePressed() {
    if (end) {
        paper.reset();
        end = false
        return false
    }

    var area = world.width - offset * 2;
    var step = area / paper.size;

    var gameX = mouseX / SCALE;
    var gameY = mouseY / SCALE;
    
    var boardX = Math.floor((gameX - offset) / step);
    var boardY = Math.floor((gameY - offset) / step);

    if (boardX >= 0 && boardX < paper.size && boardY >= 0 && boardY < paper.size) {
        paper.setField(boardX, boardY);
    }
}

function keyPressed() {
    if (end) {
        paper.reset();
        end = false
    }
}

function renderText() {
    noStroke();
    fill(51);
    textAlign(CENTER);
    textSize(50 * SCALE);

    var current = paper.currentPlayer == 0 ? "X" : "O";

    text(current + " on turn", width / 2, (offset - 20) * SCALE);
}