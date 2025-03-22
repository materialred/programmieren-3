let matrix = [
    [0, 0, 1, 0, 0],
    [1, 5, 0, 3, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 0, 2, 0],
    [1, 1, 0, 0, 4]
];



function randomMatrix(input_x, input_y) {
    let matrix = []
    for (let y = 0; y < input_y; y++) {
        matrix.push([])
        for (let x = 0; x < input_x; x++) {
            matrix[y].push(Math.floor(random(0, 2)))
        }
    }
    return matrix
}



let size = 20;
let xySize = [20,20];
let fr = 5;
let grassArr = [];
let grassEaterArr = [];
let predatorArr = [];
let miceArr = [];
let poisonArr = [];

function setup() {
    matrix = matrix;
    
    matrix = randomMatrix(xySize[0], xySize[1])

    for (let i = 0; i < 10; i++) {
        matrix[Math.floor(random(0, xySize[0]))][Math.floor(random(0, xySize[1]))] = 2;
    }
    
    matrix[Math.floor(random(0, xySize[0]))][Math.floor(random(0, xySize[1]))] = 3;
    matrix[Math.floor(random(0, xySize[0]))][Math.floor(random(0, xySize[1]))] = 4;
    for (let i = 0; i < 3; i++) {
        matrix[Math.floor(random(0, xySize[0]))][Math.floor(random(0, xySize[1]))] = 5;
    }
    
    
    console.table(matrix)
    createCanvas(size * matrix[0].length + 1, size * matrix.length + 1)
    background('#acacac')

    //Create grassArr, grassEaterArr, predatorArr
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if ((matrix[y][x] === 1)) {
                grassArr.push(new Grass(x, y));
            } else if ((matrix[y][x] === 2)) {
                grassEaterArr.push(new GrassEater(x, y));
            } else if ((matrix[y][x] === 3)) {
                predatorArr.push(new Predator(x, y));
            } else if ((matrix[y][x] === 4)) {
                miceArr.push(new Mice(x, y));
            } else if ((matrix[y][x] === 5)) {
                poisonArr.push(new Poison(x, y));
            }
        }
    }
    console.table(grassArr)
    console.table(grassEaterArr)
    console.table(predatorArr)
    console.table(miceArr)
    console.table(poisonArr)

    /*
    //Debugger
    for (let y = 0; y < grassArr.length; y++) {
        let emptyFields = grassArr[y].findFields()
        for (let i = 0; i < emptyFields.length; i++) {
            matrix[emptyFields[i][1]][emptyFields[i][0]] = 999;
            
        }
    }
    */
}

function draw() {
    frameRate(fr)



    for (let i = 0; i < grassEaterArr.length; i++) {
        grassEaterArr[i].main()
    }


    for (let i = 0; i < predatorArr.length; i++) {
        predatorArr[i].main()
    }

    for (let i = 0; i < miceArr.length; i++) {
        miceArr[i].main()
    }

    for (let i = 0; i < poisonArr.length; i++) {
        poisonArr[i].main()
    }


    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].main()
    }


    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            fill('white')
            if (matrix[y][x] === 1) {
                fill('green')
            } else if (matrix[y][x] === 2) {
                fill('gold')
            } else if (matrix[y][x] === 3) {
                fill('red')
            } else if (matrix[y][x] === 4) {
                fill('grey')
            } else if (matrix[y][x] === 5) {
                fill('purple')
            } else if (matrix[y][x] === 999) {
                fill('black')
            }
            rect(x * size, y * size, size, size)
        }
    }
}