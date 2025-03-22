class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = 1;
        this.rounds = 0;
        this.neighbors = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x, this.y]
        ];
    }

    findFields(input) {
        let freeFields = [];
        for (let y = 0; y < this.neighbors.length; y++) {
            if ((this.neighbors[y][1] < 0) || (this.neighbors[y][0] < 0) || (this.neighbors[y][1] >= matrix.length) || (this.neighbors[y][0] >= matrix.length)) {
                //does Nothing
            } else if ((matrix[this.neighbors[y][1]][this.neighbors[y][0]] === input)) {
                freeFields.push(this.neighbors[y]);
            }
        }
        return freeFields;
    }



    main() {
        if (this.rounds >= 6) {
            let emptyFields = this.findFields(0);
            if (emptyFields.length > 0) {
                let pos = (random(emptyFields));
                grassArr.push(new Grass(pos[0], pos[1]));
                matrix[pos[1]][pos[0]] = this.color;
            }
            this.rounds = 1;
        } else {
            this.rounds++;
        }
    }
}



class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = 2;
        this.grass = 0;
        this.noGrass = 0;
        this.neighbors = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x, this.y]
        ];
    }

    main() {
        this.duplicate()
        this.eat()
        this.death()
    }

    findFields(input) {
        let freeFields = [];
        for (let y = 0; y < this.neighbors.length; y++) {
            if ((this.neighbors[y][1] < 0) || (this.neighbors[y][0] < 0) || (this.neighbors[y][1] >= matrix.length) || (this.neighbors[y][0] >= matrix.length)) {
                //does Nothing
            } else if ((matrix[this.neighbors[y][1]][this.neighbors[y][0]] === input)) {
                freeFields.push(this.neighbors[y]);
            }
        }
        return freeFields;
    }
    updateNeighbors() {
        this.neighbors = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x, this.y]
        ];
    }
    eat() {
        this.updateNeighbors()
        let grassFields = this.findFields(1);
        if (grassFields.length > 0) {
            this.noGrass = 0;
            this.grass++;
            let pos = random(grassFields);
            matrix[this.y][this.x] = 0;
            matrix[pos[1]][pos[0]] = this.color;
            this.x = pos[0]
            this.y = pos[1]
            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x === this.x && grassArr[i].y === this.y) {
                    grassArr.splice(i, 1);

                }
            }
        } else {
            this.grass = 0;
            this.noGrass++;
            this.move()
        }
    }
    move() {
        let emptyFields = this.findFields(0);
        if (emptyFields.length > 0) {
            let pos = (random(emptyFields));
            matrix[this.y][this.x] = 0;
            matrix[pos[1]][pos[0]] = this.color;
            this.x = pos[0]
            this.y = pos[1]
        }
    }
    death() {
        if (this.noGrass >= 6) {
            matrix[this.y][this.x] = 0;
            for (let i = 0; i < grassEaterArr.length; i++) {
                if (grassEaterArr[i].x === this.x && grassEaterArr[i].y === this.y) {
                    grassEaterArr.splice(i, 1);

                }
            }
        }
    }
    duplicate() {
        if (this.grass >= 6) {
            let emptyFields = this.findFields(0);
            if (emptyFields.length > 0) {
                let pos = random(emptyFields)
                grassEaterArr.push(new GrassEater(pos[0], pos[1]));
            }
            this.grass = 0
        }
    }
}


// Frisst die Maus, sowie die Grassfresser auf
class Predator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = 3;
        this.grassEater = 0;
        this.noGrassEater = 0;
        this.neighbors = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x, this.y]
        ];
    }

    main() {
        this.duplicate()
        this.eat()
        this.death()
    }

    findFields(input) {
        let freeFields = [];
        for (let y = 0; y < this.neighbors.length; y++) {
            if ((this.neighbors[y][1] < 0) || (this.neighbors[y][0] < 0) || (this.neighbors[y][1] >= matrix.length) || (this.neighbors[y][0] >= matrix.length)) {
                //does Nothing
            } else if ((matrix[this.neighbors[y][1]][this.neighbors[y][0]] === input)) {
                freeFields.push(this.neighbors[y]);
            }
        }
        return freeFields;
    }
    updateNeighbors() {
        this.neighbors = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x, this.y]
        ];
    }
    eat() {
        this.updateNeighbors()
        let grassEaterFields = this.findFields(2);
        let miceFields = this.findFields(4);
        if (grassEaterFields.length > 0) {
            this.noGrassEater = 0;
            this.grassEater++;
            let pos = random(grassEaterFields);
            matrix[this.y][this.x] = 0;
            matrix[pos[1]][pos[0]] = this.color;
            this.x = pos[0]
            this.y = pos[1]
            for (let i = 0; i < grassEaterArr.length; i++) {
                if (grassEaterArr[i].x === this.x && grassEaterArr[i].y === this.y) {
                    grassEaterArr.splice(i, 1);

                }
            }
        } else if (miceFields.length > 0) {
            this.noGrassEater = 0;
            this.grassEater++;
            let pos = random(miceFields);
            matrix[this.y][this.x] = 0;
            matrix[pos[1]][pos[0]] = this.color;
            this.x = pos[0]
            this.y = pos[1]
            for (let i = 0; i < miceArr.length; i++) {
                if (miceArr[i].x === this.x && miceArr[i].y === this.y) {
                    miceArr.splice(i, 1);
                }
            }
        } else {
            this.grassEater = 0;
            this.noGrassEater++;
            this.move()
        }
    }
    move() {
        let emptyFields = this.findFields(0);
        if (emptyFields.length > 0) {
            let pos = (random(emptyFields));
            matrix[this.y][this.x] = 0;
            matrix[pos[1]][pos[0]] = this.color;
            this.x = pos[0]
            this.y = pos[1]
        }
    }
    death() {
        if (this.noGrassEater > 8) {
            matrix[this.y][this.x] = 0;
            for (let i = 0; i < predatorArr.length; i++) {
                if (predatorArr[i].x === this.x && predatorArr[i].y === this.y) {
                    predatorArr.splice(i, 1);

                }
            }
        }
    }
    duplicate() {
        if (this.grassEater > 1) {
            let emptyFields = this.findFields(0);
            if (emptyFields.length > 0) {
                let pos = random(emptyFields)
                predatorArr.push(new Predator(pos[0], pos[1]));
            }
            this.grassEater = 0
        }
    }
}



// Wartet bis alle Nachbarfelder voll sind und löscht diese.
// Er kann sich mit einer bestimten wahrscheinlichkeit sich alle zwei runden duplizieren
// Er kann mit einer bestimmten wahrscheinlichkeit Sterben nachdem er Felder Gelöscht hat
class Poison {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = 5;
        this.canDie = false;
        this.rounds = 0;
        this.nothing = 0;
        this.neighbors = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x, this.y]
        ];
    }

    findFields(input) {
        let freeFields = [];
        for (let y = 0; y < this.neighbors.length; y++) {
            if ((this.neighbors[y][1] < 0) || (this.neighbors[y][0] < 0) || (this.neighbors[y][1] >= matrix.length) || (this.neighbors[y][0] >= matrix.length)) {
                //does Nothing
            } else if ((matrix[this.neighbors[y][1]][this.neighbors[y][0]] === input)) {
                freeFields.push(this.neighbors[y]);
            }
        }
        return freeFields;
    }
    updateNeighbors() {
        this.neighbors = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x, this.y]
        ];
    }
    main() {
        this.updateNeighbors()
        let emptyFields = this.findFields(0);
        if (emptyFields.length <= 0) {
            this.canDie = true;
            this.rounds++;
            this.nothing = 0;
            for (let y = 0; y < this.neighbors.length; y++) {
                for (let x = 0; x < grassArr.length; x++) {
                    if (grassArr[x].x === this.neighbors[y][0] && grassArr[x].y === this.neighbors[y][1]) {
                        matrix[grassArr[x].y][grassArr[x].x] = 0;
                        grassArr.splice(x, 1);
                    }
                }
                for (let x = 0; x < grassEaterArr.length; x++) {
                    if (grassEaterArr[x].x === this.neighbors[y][0] && grassEaterArr[x].y === this.neighbors[y][1]) {
                        matrix[grassEaterArr[x].y][grassEaterArr[x].x] = 0;
                        grassEaterArr.splice(x, 1);
                    }
                }
                for (let x = 0; x < predatorArr.length; x++) {
                    if (predatorArr[x].x === this.neighbors[y][0] && predatorArr[x].y === this.neighbors[y][1]) {
                        matrix[predatorArr[x].y][predatorArr[x].x] = 0;
                        predatorArr.splice(x, 1);
                    }
                }
            }
            this.duplicate()
            this.death()
        }
    }
    death() {
        this.updateNeighbors()
        if ((Math.floor(random(0, 10)) >= 8)) {
            matrix[this.y][this.x] = 0;
            for (let i = 0; i < poisonArr.length; i++) {
                if (poisonArr[i].x === this.x && poisonArr[i].y === this.y) {
                    poisonArr.splice(i, 1);

                }
            }
        }
    }
    duplicate() {
        this.updateNeighbors()
        if (this.rounds >= 2) {
            if (Math.floor(random(0, 10)) >= 3) {
                let emptyFields = this.findFields(0);
                if (emptyFields.length > 0) {
                    let pos = random(emptyFields)
                    poisonArr.push(new Poison(pos[0], pos[1]));
                    matrix[pos[1]][pos[0]] = this.color;
                }
                this.rounds = 0
            }
        }
    }
}


// Bewegt sich mit 50% Wahrscheinlichkeit zwei Felder
// Kann Gras und Grasfresser Essen
// Kann vom Fleischfresser Gefressen werden
// Wird nich vom Gift getötet
// Vermehrt sich nach 10* Grass nacheinander oder 3* Grassfresser nacheinander
class Mice {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = 4;
        this.dieAt = Math.floor(random(5, 10))
        this.rounds = 0;
        this.neighbors = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x, this.y]

        ];
    }

    main() {
        this.eat()
        this.death()
    }

    findFields(input) {
        let freeFields = [];
        for (let y = 0; y < this.neighbors.length; y++) {
            if ((this.neighbors[y][1] < 0) || (this.neighbors[y][0] < 0) || (this.neighbors[y][1] >= matrix.length) || (this.neighbors[y][0] >= matrix.length)) {
                //does Nothing
            } else if ((matrix[this.neighbors[y][1]][this.neighbors[y][0]] === input)) {
                freeFields.push(this.neighbors[y]);
            }
        }
        return freeFields;
    }
    updateNeighbors() {
        this.neighbors = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x, this.y]
        ];
    }
    eat() {
        let rand = Math.floor(random(2))
        for (let i = 0; i <= rand; i++) {
            this.updateNeighbors()
            let emptyFields = this.findFields(0);
            let grassFields = this.findFields(1);
            let grassEaterFields = this.findFields(2);

            if (grassEaterFields.length > 0) {
                this.rounds = 0;
                let pos = random(grassEaterFields);
                matrix[this.y][this.x] = 0;
                matrix[pos[1]][pos[0]] = this.color;
                this.x = pos[0]
                this.y = pos[1]
                for (let i = 0; i < grassEaterArr.length; i++) {
                    if (grassEaterArr[i].x === this.x && grassEaterArr[i].y === this.y) {
                        grassEaterArr.splice(i, 1);

                    }
                }
            } else if (grassFields.length > 0) {
                this.rounds = 0;
                let pos = random(grassFields);
                matrix[this.y][this.x] = 0;
                matrix[pos[1]][pos[0]] = this.color;
                this.x = pos[0]
                this.y = pos[1]
                for (let i = 0; i < grassArr.length; i++) {
                    if (grassArr[i].x === this.x && grassArr[i].y === this.y) {
                        grassArr.splice(i, 1);

                    }
                }
            } else if (emptyFields.length > 0) {
                this.rounds++;
                this.move()
            } else {
                console.error("f")
            }
        }
    }
    move() {
        let emptyFields = this.findFields(0);
        if (emptyFields.length > 0) {
            let pos = (random(emptyFields));
            matrix[this.y][this.x] = 0;
            matrix[pos[1]][pos[0]] = this.color;
            this.x = pos[0]
            this.y = pos[1]
        }
    }
    death() {
        if (this.rounds >= this.dieAt) {
            matrix[this.y][this.x] = 0;
            for (let i = 0; i < miceArr.length; i++) {
                if (miceArr[i].x === this.x && miceArr[i].y === this.y) {
                    miceArr.splice(i, 1);

                }
            }
        }
    }
}
