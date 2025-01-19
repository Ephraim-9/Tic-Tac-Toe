function Gameboard () {
    for (let i = 0; i < 3; i += 1) {
        renderRowDiv(i)
        for ( let j = 0; j < 3; j += 1) {
            renderButtons(i,j)
        }
    }

    function renderRowDiv (row) {
        const rowDiv = document.createElement('div');
        rowDiv.id = `${row}`;
        document.getElementById('board').appendChild(rowDiv);
    }

    function renderButtons (row,col) {
        const button = document.createElement('button');
        button.id = `${row}, ${col}`;
        button.className = 'btn'
        document.getElementById(`${row}`).appendChild(button);
    }

    function renderMark (marker, rowId , colId) {
        document.getElementById(`${rowId}, ${colId}`).innerText = `${marker}`
    }

}

Gameboard()

function GameControls () {

    function makePlayer (name, marker) {
        return {
            name: name,
            marker: marker,
            turn: function() {
                return(`${this.name}'s turn.`);
            }
        };
    }
    
    const player1 = makePlayer ('p1', 'X');
    const player2 = makePlayer ('p2', 'O');
    
    
    function currentPlayer () {
        activePlayer = activePlayer === player1 ? player2 : player1;
    }
    
    const activePlayer = currentPlayer.activePlayer

    function btnListener (row,col) {
        document.getElementById(btn).addEventListener("click", renderMark());
        debugger
    }


    btnListener(currentPlayer.marker)
}

GameControls()