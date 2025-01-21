let boardState = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

const Gameboard = (function () {

    function renderRowDiv(row) {
        const rowDiv = document.createElement('div');
        rowDiv.id = row
        document.getElementById('board').appendChild(rowDiv);
    }

    function renderButtons (row, col) {
        const button = document.createElement('button');
        button.id = `${row}-${col}`;
        button.className = 'btn'
        document.getElementById(row).appendChild(button);
        document.getElementById(`${row}-${col}`).addEventListener("click", () => btnClicked(row,col));
    }

    return {
        init: function() {
            for (let i = 0; i < 3; i++) {
                renderRowDiv(i)
                for (let j = 0; j < 3; j++) {
                    renderButtons(i,j)
                }
            }
        }
    }

    function btnClicked (row, col) {
        document.getElementById(`${row}-${col}`).innerText = GameControls.getMarker()
        boardState[row][col] = GameControls.getMarker()
        let winner = WinnerLogic.getWinner(row, col)
        console.log(winner)
        GameControls.nextPlayer()
        console.table(boardState)

    }
})();


const GameControls = (function () {
    function createPlayer (name,marker) {
        return {name, marker};
    }
    player1 = createPlayer('p1', 'X')
    player2 = createPlayer('p2', 'O')

    Gameboard.init()

    let currentPlayer = player1; 

    function switchPlayer () {
        currentPlayer === player1 ? currentPlayer = player2 : currentPlayer = player1 
    }

    return {
        getMarker: () => currentPlayer.marker,
        nextPlayer: () => switchPlayer()
    }

})();

const WinnerLogic = (function () {

    let marker = GameControls.getMarker()

    function winner (row, col) {
        if ((row,col === 0,0 || row,col === 2,2) ||
        (row,col === 2,0 || row,col === 0,2) ||
        (row,col === 1,1)) {
            function diagwin () {
                if (((boardState[0][0] === boardState[2][2]) &&
                    (boardState[0][2] === boardState[2][0])) ||
                   ((boardState[0][0] === marker) &&
                    (boardState[0][2] === marker)) &&
                (boardState[1][1])) {
                        return true
               }
               else {false}
            }
            return diagwin()
        }
        else {
            console.log(row, col)
            const rowwin = boardState[row].every((mark) => mark === marker)
            const colArr = []
            for (let i = 0; i < 3; i++) {
                let colMark = boardState[i][col]
                colArr.push(colMark)
            }
            const colwin = colArr.every((mark) => mark === marker)
        }
    }

     return {
         getWinner: (row, col) => winner(row, col) 
     }
})();


// mark placed > check up down, left right and diagonal till end (ie 0 || 2) 
// > check is one of the direction is 