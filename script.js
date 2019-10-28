const grass = new Items("grass", "grass", "path", false)
const tree = new Items("tree", "tree", "obstacle", true)
const defaultWeapon = new Weapons("defaultWeapon", "default Weapon", 10)
const player1 = new Players("player1", "player1", defaultWeapon)
const player2 = new Players("player2", "player2", defaultWeapon)
const weapon1 = new Weapons("weapon1", "axe", 22)
const weapon2 = new Weapons("weapon2", "goldenSword", 30)
const weapon3 = new Weapons("weapon3", "double head", 25)
const weapon4 = new Weapons("weapon4", "mace And Chain", 20)
const mapSize = { x: 12, y: 12 }
const data = {
        players: {
            player1,
            player2
        },
        weapons: {
            weapon1,
            weapon2,
            weapon3,
            weapon4
        }
    }
    //swap Player
const currentPlayer = {
        players: [player1, player2],
        swap() {
            const nextPlayer = this.players.pop()
            this.players.unshift(nextPlayer)
            return this.players[0]
        }
    }
    // move player 
document.addEventListener("keydown", (e) => {
    checkKeyPressed(e);
    updateStats(data.players)
})

const board = new Board(mapSize.y, mapSize.x, grass)
const startGame = document.getElementById("new-game")
configGame(board, data, tree, defaultWeapon, currentPlayer.players[0])
board.draw("game")
startGame.addEventListener("click", function() {
    configGame(board, data, tree, defaultWeapon)
})
updateStats(data.players)

const attackBtn = document.getElementById("attack")
const defendBtn = document.getElementById("defend")

const display = document.getElementById("display")


attackBtn.addEventListener("click", () => {
    if (board.checkForPlayer(currentPlayer.players[0].position)) {
        const targetStatus = currentPlayer.players[0].attack(currentPlayer.players[1])
        if (currentPlayer.players[1].health <= 0) {
            display.innerHTML = currentPlayer.players[0].name + " won the game !!!!"
            configGame(board, data, tree, defaultWeapon)
        } else {
            display.innerHTML = targetStatus
            currentPlayer.swap()
            updateStats(data.players)
        }
    } else {
        display.innerHTML = "No player around"
    }
})

defendBtn.addEventListener("click", () => {
    if (board.checkForPlayer(currentPlayer.players[0].position)) {
        currentPlayer.players[0].defending()
        display.innerHTML = "-" + currentPlayer.players[0].name + " Choose to defend "
        currentPlayer.swap()
        updateStats(data.players)
    } else {
        display.innerHTML = "You must start a fight"
    }
})