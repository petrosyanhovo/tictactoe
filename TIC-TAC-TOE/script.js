// SELECTORS
let $inputNumber = document.querySelector("#inputNumber");
let $createBoardBtn = document.querySelector("#createBoardBtn");
let $board = document.querySelector("#board");
let $block = document.querySelector(".block");
let $info = document.querySelector(".player");
let $messageInfo = document.querySelector(".winplayer");
let $message = document.querySelector(".message");
let $messageBtn = document.querySelector(".message .btn");
///////////////////////////////////////

// VARIABLES
let boardArray = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

let row;
let col;
let currentPlayer;

// EVENTS
$createBoardBtn.addEventListener("click", makeBoard);
$inputNumber.setAttribute("onKeyDown", "return false");
$board.addEventListener("click", playFunc);
$messageBtn.addEventListener("click", closeWindow);

////////////////

// FUNCTIONS

function closeWindow() {
    $message.classList.remove("active");
    playFunc();
}

function playFunc(event) {
    let $blocks = document.querySelectorAll(".block");
    let elems = Array.from($blocks);
    let elem = event.target;
    let index = elems.indexOf(elem);
    // console.log(index);
    row = Math.floor(index / $inputNumber.value);
    col = index % $inputNumber.value;
    console.log(row, col);
    currentPlayer = currentPlayer == "X" ? "O" : "X";
    $info.innerHTML = currentPlayer == "O" ? "X" : "O";
    $messageInfo.innerHTML = currentPlayer == "X" ? "X" : "O";
    if (elem.innerHTML != "") {
        audioWhoosh();
        elem.click(function (event) {
            event.preventDefault();
        });
    } else {
        boardArray[row][col] = currentPlayer;
        elem.innerHTML = currentPlayer;
        elem.addEventListener("mousemove", function () {
            elem.classList.add("notallow");
        });
        audioClick();
    }
    console.log(boardArray);
    checkWinner();
}

function audioClick() {
    let audio = new Audio();
    audio.src = "click.mp3";
    audio.play();
}

function audioDing() {
    let audio = new Audio();
    audio.src = "ding.m4a";
    audio.play();
}

function audioWhoosh() {
    let audio = new Audio();
    audio.src = "whoosh.m4a";
    audio.play();
}

function checkWinner() {
    // Horizontal Check
    for (let i = 0; i < $inputNumber.value; i++) {
        if (boardArray[i].every((val) => val === currentPlayer)) {
            // console.log($board);
            $board.style.pointerEvents = "none";
            audioDing();
            setTimeout(function () {
                $message.classList.add("active");
                makeBoard();
            }, 800);
        }
    }

    // Vertical Check

    let arrVertical;

    for (let i = 0; i < $inputNumber.value; i++) {
        let arrVertical = [];
        arrVertical.length = $inputNumber.value;
        console.log(arrVertical);

        for (let j = 0; j < $inputNumber.value; j++) {
            arrVertical[j] = boardArray[j][i];
        }
        if (arrVertical.every((val) => val === currentPlayer)) {
            $board.style.pointerEvents = "none";
            audioDing();
            setTimeout(function () {
                $message.classList.add("active");
                makeBoard();
            }, 800);
        }
    }

    // First Diagonal Check

    let arrFirstDiagonal = [];
    for (let i = 0; i < $inputNumber.value; i++) {
        arrFirstDiagonal.length = $inputNumber.value;

        arrFirstDiagonal[i] = boardArray[i][i];
    }
    if (arrFirstDiagonal.every((val) => val === currentPlayer)) {
        $board.style.pointerEvents = "none";
        audioDing();
        setTimeout(function () {
            $message.classList.add("active");
            makeBoard();
        }, 800);
    }

    //  Second Diagonal Check

    let arrSecondDiagonal = [];
    for (let i = 0; i < $inputNumber.value; i++) {
        arrSecondDiagonal.length = $inputNumber.value;

        arrSecondDiagonal[i] = boardArray[i][$inputNumber.value - 1 - i];
    }
    if (arrSecondDiagonal.every((val) => val === currentPlayer)) {
        $board.style.pointerEvents = "none";
        audioDing();
        setTimeout(function () {
            $message.classList.add("active");
            makeBoard();
        }, 800);
    }
    console.log(arrSecondDiagonal);
}

function makeBoard(e) {
    $board.innerHTML = "";
    $board.style.pointerEvents = "auto";
    let size = $board.getBoundingClientRect();
    $board.style.width = $inputNumber.value * 80 + "px";
    $board.style.height = $inputNumber.value * 80 + "px";
    for (let i = 0; i < $inputNumber.value ** 2; i++) {
        $board.innerHTML += '<div class ="block"></div>';
    }

    console.log(makeArrayBoard());
    // makeArrayBoard()
}

function makeArrayBoard() {
    boardArray = [];
    for (let i = 0; i < $inputNumber.value; i++) {
        let line = [];
        for (let j = 0; j < $inputNumber.value; j++) {
            line.push(null);
        }
        boardArray.push(line);
    }
    return boardArray;
}
