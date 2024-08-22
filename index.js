function makeGameBoard() {
    const board = [null, null, null,
                   null, null, null,
                   null, null, null];
    
    const place = (marker, pos) => {
        if (board[pos] == null) {
            board[pos] = marker;
            return true;
        } else {
            return false;
        }
    }
    
    return {board, place};
}


function makePlayer(PlayerName, marker) {
    const placeYourMarker = (pos, board) => {
        return board.place(marker, pos);
    }
    return {PlayerName, marker, placeYourMarker};
}

function makeGame(Player1, Player2) {
    let finshed = false;
    let board = makeGameBoard();
    let currentTurn = 0;
    let turnCount = 0;
    const playTurn = (pos) => {
        if (!finshed) {
            if (currentTurn == 0) {
                let correct = Player1.placeYourMarker(pos, board);
                if (correct) {
                    currentTurn = 1;
                    turnCount++;
                    var victor = checkForWin();
                }
            } else if (currentTurn == 1) {
                let correct = Player2.placeYourMarker(pos, board)
                if (correct) {
                    currentTurn = 0;
                    turnCount++;
                    var victor = checkForWin();
                }
            }
            getBoard();
            if (victor != null) {
                endGame(victor);
            }
        }

    }
    const getBoard = () => {
        //console.log(board.board);
        return board.board
    }

    const winning = [[0, 1, 2],
                     [3, 4, 5],
                     [6, 7, 8],
                     [0, 3, 6],
                     [1, 4, 7],
                     [2, 5, 8],
                     [0, 4, 8],
                     [2, 4, 6]];

    const checkForWin = () => {
        for (let position of winning ) {
            let Ocount = 0;
            let Xcount = 0;
            for (let i = 0; i < 3; i++) {
                let pos = position[i];
                if (board.board[pos] == "X") {
                    Xcount++;
                } else if (board.board[pos] == "O") {
                    Ocount++;
                }
            }
            if (Xcount == 3) {
                console.log("i'm here")
                return 1
            } else if (Ocount == 3) {
                return 2
            }
        }
        if (turnCount == 9) {
            return 3;
        }
        return null;
    }

    const endGame = (victor) => {
        if (victor == 1) {
            console.log(`${Player1.PlayerName} wins!!!`)
        } else if (victor == 2) {
            console.log(`${Player2.PlayerName} wins!!!`)
        } else if (victor == 3) {
            console.log("It's a draw")
        }
        // this will be changed
        //board = makeGameBoard();
        //currentTurn = 0;
        //turnCount = 0;
        finshed = true
    }
    
    const getTurnCount = () => {
        return turnCount
    }

    return {getBoard, playTurn}
}


const UIrenderer = function () {
    const runGame = (Player1, Player2) => {
        let game = makeGame(Player1, Player2);
        
    }

    const renderBoard = (game) => {
        let boardArr = game.getBoard();
        const boardEl = document.querySelector(".board")
        boardEl.replaceChildren();
        for (let i = 0; i < 9; i++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.dataset.position = i;
            square.textContent = boardArr[i];
            square.addEventListener("click", (ref) => {
                pos = ref.target.getAttribute("data-position");
                //console.log(pos)
                game.playTurn(pos);
                renderBoard(game);
            })
            boardEl.appendChild(square);
        }
        
    }
    return {renderBoard}
}();

let Player1 = makePlayer("test", "X");
let Player2 = makePlayer("test2", "O");
let game = makeGame(Player1, Player2);


UIrenderer.renderBoard(game);
