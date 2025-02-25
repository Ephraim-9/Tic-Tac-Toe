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

    function showTitle (title) {
        document.getElementById('title').innerText = `${title}`
    }

    function btnClicked (row, col) {
        document.getElementById(`${row}-${col}`).innerText = GameControls.getMarker()
        boardState[row][col] = GameControls.getMarker()
        if (WinnerLogic.getWinner(row, col) === true) {
            showTitle(`${GameControls.getPlayer()} WON!!!`)
            window.setTimeout(gameOver, 1000);
        }
        else if (isTie()) {
            showTitle("IT'S A TIE")
            window.setTimeout(gameOver, 10);
        }
        else {
            GameControls.nextPlayer()
            showTitle(`IT'S ${GameControls.getPlayer()}'S  TURN!`)
        }
    }

    function isTie () {
            let tie0 = boardState.map((r) => r[0]).every((m) => m !== '')
            let tie1 = boardState.map((r) => r[1]).every((m) => m !== '')
            let tie2 = boardState.map((r) => r[2]).every((m) => m !== '')
            if (tie0 && tie1 && tie2 === true) {
                return true
            }
    }

    function gameOver () {
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