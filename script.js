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
        document.getElementById(`${row}-${col}`).addEventListener("click", callBtnClicked);
        function callBtnClicked () {
            btnClicked(row,col)
            document.getElementById(`${row}-${col}`).removeEventListener("click", callBtnClicked);
        }
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
        console.table(boardState)
        if (WinnerLogic.getWinner(row, col) === true) {
            window.setTimeout(gameOver, 100);
        }
        // const colwin = boardState.map(row => row[col]).every(mark => mark === marker);
        else if (boardState.map((r) => r[col]).every((c) => c !== '')) {
            window.setTimeout(gameOver, 100);
        }
    }

    function gameOver () {
        GameControls.nextPlayer()
        alert('GAME OVER!')
        window.location.reload()
    }
})();


const GameControls = (function () {
    function createPlayer (name,marker) {
        return {name, marker};
    }
    player1 = createPlayer('Player One', 'X')
    player2 = createPlayer('Player Two', 'O')

    Gameboard.init()

    let currentPlayer = player1; 

    function switchPlayer () {
        currentPlayer === player1 ? currentPlayer = player2 : currentPlayer = player1 
    }

    return {
        getMarker: () => currentPlayer.marker,
        getPlayer: () => currentPlayer.name,
        nextPlayer: () => switchPlayer()
    }

})();

const WinnerLogic = (function () {

    function winner (row, col) {
        
        if ((row,col === 0,0 || row,col === 2,2) ||
        (row,col === 2,0 || row,col === 0,2) ||
        (row,col === 1,1)) {
            function win () {
                let marker = GameControls.getMarker()
                GameControls.nextPlayer()
                if ((boardState[0][0] === boardState[1][1] && 
                    boardState[1][1] === boardState[2][2] &&
                    boardState[1][1] === marker) ||
                    boardState[2][0] === boardState[1][1] && 
                    boardState[1][1] === boardState[0][2] &&
                    boardState[1][1] === marker) {
                        return true
               }
               else {
                if (boardState[row].every((mark) => mark === marker)) {
                    return true;
                   }
                   else{
                    const colArr = []
                    for (let i = 0; i < 3; i++) {
                        let colMark = boardState[i][col]
                        colArr.push(colMark)
                    }
                    const colwin = colArr.every((mark) => mark === marker)  
                    return colwin; 
                   }
               }
            }
            return win()
        }
    }
     return {
         getWinner: (row, col) => winner(row, col) 
     }
})();