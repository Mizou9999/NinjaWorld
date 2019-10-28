// game config function
function configGame(board, data, tree, defaultWeapon, player) {
    board.buildMap(mapSize.y, mapSize.x, grass)
        //  trees creation
    let numTree = 0
    while (numTree < 8) {
        board.randomPlace(tree)
        numTree++
    }

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const element = data[key]
            if (key === "players") {
                for (const i in element) {
                    element[i].resetStats(defaultWeapon)
                }
            }
            for (const piece in element) {
                if (element.hasOwnProperty(piece)) {
                    board.randomPlace(element[piece])
                }
            }
        }
    }
    board.draw("game").then(() => {
        board.heighlight({ x: player.position.x, y: player.position.y, limit: player.movementPoints, action: "add" })
    })

    updateStats(data.players)

}

// Update and Display stats 
function updateStats(players) {
    const playerTurn = document.getElementById(currentPlayer.players[0].id)

    const lastPlayer = document.getElementById(currentPlayer.players[1].id)
    playerTurn.classList.add("bg-primary")
    for (let x in players) {
        if (players[x].movementPoints === 0) {
            playerTurn.classList.add("bg-primary")
            lastPlayer.classList.remove("bg-primary")

        }
    }
    for (let i in players) {
        document.querySelector(`#${players[i].id} .player-health`).innerHTML = players[i].health;
        document.querySelector(`#${players[i].id} .move-left`).innerHTML = players[i].movementPoints;
        document.querySelector(`#${players[i].id} .weapon-name`).innerHTML = players[i].weapon.name;
        document.querySelector(`#${players[i].id} .weapon-dmg`).innerHTML = players[i].weapon.damage;
    }
}

function checkKeyPressed(e) {

    switch (e.key) {
        case "ArrowLeft":
            board.movePlayer(currentPlayer, e.key);
            break;
        case "ArrowUp":
            board.movePlayer(currentPlayer, e.key);
            break;
        case "ArrowRight":
            board.movePlayer(currentPlayer, e.key);
            break;
        case "ArrowDown":
            board.movePlayer(currentPlayer, e.key);
            break;
    }
}