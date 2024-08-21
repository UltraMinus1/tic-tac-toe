function makeGameBoard() {
    const board = [["X", "X", "X"],
                   [null, null, null],
                   [null, "O", null]];
    
    const place = (marker, X, Y) => {
        if (board[Y][X] == null) {
            board[Y][X] = marker;
            return true;
        } else {
            return false;
        }
    }
    
    return {board, place};
}


function makePlayer(PlayerName, marker, board) {
    const placeYourMarker = (X, Y) => {
        return board.place(marker, X, Y);
    }
    return {PlayerName, marker, placeYourMarker};
}

function makeGame(player1Name, player2Name) {
    const board = makeGameBoard();
    const Player1 = makePlayer(player1Name, "X", board);
    const Player2 = makePlayer(player2Name, "O", board);
    let currentTurn = 0;
    const playTurn = (X, Y) => {
        if (currentTurn == 0) {
            let correct = Player1.placeYourMarker(X, Y);
            if (correct) {
                currentTurn = 1;
            }
        } else if (currentTurn == 1) {
            let correct = Player2.placeYourMarker(X, Y)
            if (correct) {
                currentTurn = 0;
            }
        }
    }
    const getBoard = () => {
        console.log(board
        )}

    const winning = [[[0, 0], [1, 0], [2, 0]],
                     [[0, 1], [1, 1], [2, 1]],
                     [[0, 2], [1, 2], [2, 2]],
                     [[0, 0], [0, 1], [0, 2]],
                     [[1, 0], [1, 1], [1, 2]],
                     [[2, 0], [2, 1], [2, 2]],
                     [[0, 0], [1, 1], [2, 2]],
                     [[2, 0], [1, 1], [0, 2]]];

    const checkForWin = () => {
        for (let position of winning ) {
            let Ocount = 0;
            let Xcount = 0;
            for (let i = 0; i < 3; i++) {
                let [X, Y] = position[i];
                if (board.board[Y][X] == "X") {
                    Xcount++;
                } else if (board.board[Y][X] == "O") {
                    Ocount++;
                }
            }
            if (Xcount == 3) {
                console.log("i'm here")
                return 1
            } else if (Ocount == 3) {
                return 2
            }
        };
        return null;
    }
    return {getBoard, playTurn, checkForWin}
}

let game = makeGame("UltraMinus1", "X", "tester", "O");



