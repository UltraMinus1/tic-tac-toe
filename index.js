function makeGameBoard() {
    const board = [[null, null, null],
                   [null, null, null],
                   [null, null, null]];
    
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

function makeGame(player1Name, player1Marker, player2Name, player2Marker) {
    const board = makeGameBoard();
    const Player1 = makePlayer(player1Name, player1Marker, board);
    const Player2 = makePlayer(player2Name, player2Marker, board);
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
    return {getBoard, playTurn}
}

let game = makeGame("UltraMinus1", "X", "tester", "O");



