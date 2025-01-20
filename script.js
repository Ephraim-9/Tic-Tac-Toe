const Gameboard = (function () {
    function renderRowDiv(row) {
        const rowDiv = document.createElement('div');
        rowDiv.id = `${row}`
        document.getElementById('board').appendChild(rowDiv);
    }

    function renderButtons (row, col) {
        const button = document.createElement('button');
        button.id = `${row}-${col}`;
        button.className = 'btn'
        document.getElementById(`${row}`).appendChild(button);
        document.getElementById(`${row}-${col}`).addEventListener("click", () => btnClicked(`${row}-${col}`));
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

    function btnClicked (idBtn) {
        console.log(`${idBtn} clicked`)
    }
})();


const GameControls = (function () {
    function createPlayer (name,marker) {
        return {name, marker};
    }
    const player1 = createPlayer ('p1', 'X')
    const player2 = createPlayer ('p2', 'O')

    Gameboard.init()




})();


// listen for click(for each button) -> get curentplayerMark -> set marker -> change current player