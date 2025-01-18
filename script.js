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
        document.getElementById(`${row}`).appendChild(button);
    }
}

Gameboard()

function players (player1, player2) {
    const playerOne = player1;
    const playerTwo = player2;

    function switchPlayerPlayer () {
        activePlayer = activePlayer === player1 ? player2 : player1;
    }
}