function Paper(size) {
    this.size = size;
    this.board = this.createBoard(size);
    this.currentPlayer = 0;
    console.log(this.board);
}

Paper.prototype.createBoard = function(size) {
    var array = [];
    for (var i = 0; i < size; i++) {
        array[i] = [];
        for (var j = 0; j < size; j++) {
            array[i][j] = 0;
        }
    }
    return array;
}

Paper.prototype.render = function() {
    this.renderBoard();
    this.renderFields();
}

Paper.prototype.renderBoard = function() {
    var area = world.width - offset * 2;
    var step = area / this.size;

    strokeWeight(5 * SCALE);
    stroke(202);
    for (var i = 1; i < this.size; i++) {
        line((offset + i * step) * SCALE, offset * SCALE, (offset + i * step) * SCALE, (world.height - offset) * SCALE);
    }

    for (var i = 1; i < this.size; i++) {
        line(offset * SCALE, (offset + i * step) * SCALE, (world.width - offset) * SCALE, (offset + i * step) * SCALE);
    } 
}

Paper.prototype.renderFields = function() {
    var area = world.width - offset * 2;
    var step = area / this.size;

    for (var x = 0; x < this.size; x++) {
        for (var y = 0; y < this.size; y++) {
            noFill();
            if (this.board[x][y] == 1) {
                stroke(52, 152, 219);
                line(((offset + x * step + step / 2) - step / 5) * SCALE, ((offset + y * step + step / 2) - step / 5) * SCALE, ((offset + x * step + step / 2) + step / 5) * SCALE, ((offset + y * step + step / 2) + step / 5) * SCALE)
                line(((offset + x * step + step / 2) - step / 5) * SCALE, ((offset + y * step + step / 2) + step / 5) * SCALE, ((offset + x * step + step / 2) + step / 5) * SCALE, ((offset + y * step + step / 2) - step / 5) * SCALE)
            }
            else if (this.board[x][y] == 2) {
                stroke(231, 76, 60);
                ellipse((offset + x * step + step / 2) * SCALE, (offset + y * step + step / 2) * SCALE, (step / 2) * SCALE)
            }
        }
    }
}

Paper.prototype.setField = function(x, y) {
    if (this.board[x][y] == 0) {
        this.board[x][y] = this.currentPlayer + 1;
        this.currentPlayer++;
        this.currentPlayer %= 2;
    }
}

Paper.prototype.gameDone = function() {
    var full = true;
    for (var x = 0; x < this.size; x++) {
        for (var y = 0; y < this.size; y++) {
            if (this.board[x][y] === 0) {
                full = false
                continue
            }

            // Collumn
            if (this.safeSpot(x, y - 4) && this.equal(x, y, x, y + 1, x, y + 2, x, y + 3, x, y + 4)) {
                return this.board[x][y] - 1;
            }
            // Row
            else if (this.safeSpot(x + 4, y) && this.equal(x, y, x + 1, y, x + 2, y, x + 3, y, x + 4, y)) {
                return this.board[x][y] - 1;
            }
            // Diagonal right
            else if (this.safeSpot(x + 4, y) && this.equal(x, y, x + 1, y - 1, x + 2, y - 2, x + 3, y - 3, x + 4, y - 4)) {
                return this.board[x][y] - 1;
            }
            // Diagonal left
            else if (this.safeSpot(x + 4, y) && this.equal(x, y, x + 1, y + 1, x + 2, y + 2, x + 3, y + 3, x + 4, y + 4)) {
                return this.board[x][y] - 1;
            }
        }
    }

    if (full) {
        return 2
    }

    return false
}

Paper.prototype.safeSpot = function(x, y) {
    return x > 0 && x < this.size && y > 0 && y < this.size
}

Paper.prototype.equal = function(x1, y1, x2, y2, x3, y3, x4, y4, x5, y5) {
    return this.board[x1][y1] === this.board[x2][y2] && this.board[x2][y2] === this.board[x3][y3] &&
        this.board[x3][y3] === this.board[x4][y4] && this.board[x4][y4] === this.board[x5][y5]
}

Paper.prototype.reset = function() {
    this.board = this.createBoard(this.size);
    this.currentPlayer = 0;
}