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

    function renderMark (marker) {
        document.getElementsByClassName('btn').innerText = `${marker}`
    }

}

Gameboard()

function GameControls () {
    const playerOne = player1;
    const playerTwo = player2;
    
    function switchPlayerPlayer () {
        activePlayer = activePlayer === player1 ? player2 : player1;
    }
    
    const playerMark = x    

    function btnListener (marker) {
        document.getElementsByClassName("btn").addEventListener("click", function() {  
            renderMark(marker)  
        });
    }

    btnListener(playerMark)
}