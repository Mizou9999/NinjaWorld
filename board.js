class Board {
    constructor(row, column, cell) {
            this.map = []
            this.buildMap(row, column, cell)
        }
        // row , column numbers, cell its an object
    buildMap(row, column, cell) {
            for (let y = 0; y < row; y++) {
                this.map[y] = []
                for (let x = 0; x < column; x++) {
                    this.map[y][x] = [cell]
                }
            }
        }
        // return an object
    randomNum() {
            const y = Math.floor(Math.random() * this.map.length)
            const x = Math.floor(Math.random() * this.map[y].length)
            return { y, x }
        }
        // piece : object
    randomPlace(piece) {
            while (true) {
                const randomPos = this.randomNum()
                    // blocked variable gonna be true or false ,if not blocked it place the item and break 
                const blocked = this.map[randomPos.y][randomPos.x].find(item => {
                    return item.blocked
                })
                if (!blocked) {
                    this.map[randomPos.y][randomPos.x].push(piece)
                    piece.position = randomPos
                    break
                }
            }
        }
        // item : object , cellXY : object, update the map
    placeItem(item, cellXY) {
            this.map[cellXY.y][cellXY.x].push(item)
        }
        // id : string , cellXY: object, update the map 
    deleteItemInCell(id, cellXY) {
        this.map[cellXY.y][cellXY.x] = this.map[cellXY.y][cellXY.x].filter(item => {
            return item.id !== id
        })
    }

    // gameId : string, method update the dom 
    draw(gameId) {
            return new Promise(resolve => {
                const gameElement = document.getElementById(gameId)
                    // "" to clear the game 
                gameElement.innerHTML = ""
                for (let y = 0; y < this.map.length; y++) {
                    const rowElement = document.createElement("div")
                    rowElement.setAttribute("id", "row-" + y)
                    rowElement.setAttribute("class", "row")
                    for (let x = 0; x < this.map[y].length; x++) {
                        const cellElement = document.createElement("div")
                        cellElement.setAttribute("id", "cell-" + y + "-" + x)
                        cellElement.setAttribute("class", "col")
                        cellElement.classList.add("cell")
                        for (let i = 0; i < this.map[y][x].length; i++) {
                            cellElement.classList.add(this.map[y][x][i].id)
                        }
                        rowElement.appendChild(cellElement)
                    }
                    gameElement.appendChild(rowElement)
                }
                resolve()
            })

        }
        // semilair to draw(game) but to draw a single element, method update the dom 

    drawCell(cellXY) {
        const cellElement = document.getElementById("cell-" + cellXY.y + "-" + cellXY.x)
        cellElement.setAttribute("class", "cell" + " col")
        for (let i = 0; i < this.map[cellXY.y][cellXY.x].length; i++) {
            cellElement.classList.add(this.map[cellXY.y][cellXY.x][i].id)

        }
    }

    //type : string , method return object(player or weapon)
    findItemInCell(type, cellXY) {

            return this.map[cellXY.y][cellXY.x].find(item => {
                return item.type === type

            })
        }
        // currentPlayer is an object , direction is a string
    movePlayer(currentPlayer, direction) {
        let player = currentPlayer.players[0]
            //newPosition : object
        let newPosition = this.getNewYnewX(player, direction)
        const blocked = this.checkFreeCell(newPosition.y, newPosition.x)
            // check if there is a player around
        if (!blocked) {

            // if checkfreecell return true drawPlayer with a new position   
            this.drawPlayer(player, newPosition);
            this.heighlight({ x: player.position.x, y: player.position.y, limit: player.movementPoints, action: "remove" })
            player.position = { y: newPosition.y, x: newPosition.x }
            player.movementPoints = player.movementPoints - 1
            const weapon = this.findItemInCell("weapon", newPosition)
            if (weapon) {
                const oldWeapon = player.swapWeapon(weapon)
                this.deleteItemInCell(weapon.id, newPosition)
                this.placeItem(oldWeapon, newPosition)

            }

            if (player.movementPoints === 0) {

                player = currentPlayer.swap()
                player.movementPoints = 3
                this.heighlight({ x: player.position.x, y: player.position.y, limit: player.movementPoints, action: "add" })
            } else {

                this.heighlight({ x: newPosition.x, y: newPosition.y, limit: player.movementPoints, action: "add" })
            }



        }



    }
    heighlight({ x, y, limit, action }) {

        for (let i = 0; i < limit; i++) {
            let newY = i + 1
            newY = y - newY
            if (newY < 0) {
                break
            }
            let playerPosUp = { y: newY, x }
            let pervCellY1 = document.getElementById(`cell-${newY}-${x}`)
            const treeUp = this.findItemInCell("obstacle", playerPosUp)
            if (!treeUp) {
                pervCellY1.classList[action]("bordwer")
            } else {
                break
            }
        }
        for (let i = 0; i < limit; i++) {
            let newY = i + 1
            newY = y + newY
            if (newY > this.map.length - 1) {
                break
            }
            let playerPosUp = { y: newY, x }
            let pervCellY1 = document.getElementById(`cell-${newY}-${x}`)
            const treeUp = this.findItemInCell("obstacle", playerPosUp)
            if (!treeUp) {
                pervCellY1.classList[action]("bordwer")
            } else {
                break
            }
        }
        for (let i = 0; i < limit; i++) {
            let newX = i + 1
            newX = x + newX
            if (newX > this.map[y].length - 1) {
                break
            }
            let playerPosUp = { y, x: newX }
            let pervCellY1 = document.getElementById(`cell-${y}-${newX}`)
            const treeUp = this.findItemInCell("obstacle", playerPosUp)
            if (!treeUp) {
                pervCellY1.classList[action]("bordwer")
            } else {
                break
            }
        }
        for (let i = 0; i < limit; i++) {
            let newX = i + 1
            newX = x - newX
            if (newX < 0) {
                break
            }
            let playerPosUp = { y, x: newX }
            let pervCellY1 = document.getElementById(`cell-${y}-${newX}`)
            const treeUp = this.findItemInCell("obstacle", playerPosUp)
            if (!treeUp) {
                pervCellY1.classList[action]("bordwer")
            } else {
                break
            }
        }

    }

    //player : object, direction : string , return new y and x as a new position 
    getNewYnewX(player, direction) {
            let { y, x } = player.position
            let newY = y
            let newX = x

            // direction : keycodes
            switch (direction) {
                case "ArrowLeft":
                    if (x > 0) {
                        newX = x - 1
                    }
                    break;

                case "ArrowUp":
                    if (y > 0) {
                        newY = y - 1
                    }
                    break;

                case "ArrowRight":
                    if (x < this.map[newY].length - 1) {
                        newX = x + 1
                    }
                    break;

                case "ArrowDown":
                    if (y < this.map[newY].length - 1) {
                        newY = y + 1
                    }
                    break;
            }

            return { y: newY, x: newX }

        }
        // currentPlayer : object , newPosition : object
    drawPlayer(currentPlayer, newPosition) {
            //deconstruction
            const { y, x } = currentPlayer.position
            const newY = newPosition.y
            const newX = newPosition.x
                // the New Cell replaced with the new player Object(put player in new cell)
            this.map[newY][newX].push(currentPlayer)
                // remove player from the old cell
            this.map[y][x] = this.map[y][x].filter(item => {
                return item.id !== currentPlayer.id
            })
            this.drawCell({ y, x })
            this.drawCell({ y: newY, x: newX })
        }
        // y,x: number , and  the method return a boolean 
    checkFreeCell(y, x) {
            // check if the new position is not outside the map , nested because if y is out of the map the x too 
            if (y >= 0 && x >= 0) {
                if (y <= this.map.length - 1) {
                    if (x <= this.map[y].length - 1) {
                        return this.map[y][x].find(item => {
                            return item.blocked
                        })

                    }
                }
            }
        }
        // check if there is a player around the current player, position : object , 
    checkForPlayer(position) {
        const { y, x } = position
        // -1  because in the array it start from 0 , and  in the length start from 1 
        const mapHeight = this.map.length - 1
        const mapWidth = this.map[0].length - 1
        if (y - 1 >= 0) {
            const playerUp = this.findItemInCell("player", { y: y - 1, x })
            if (playerUp) {
                return playerUp
            }
        }
        if (y + 1 <= mapHeight) {
            const playerDown = this.findItemInCell("player", { y: y + 1, x })
            if (playerDown) {
                return playerDown
            }
        }
        if (x - 1 >= 0) {
            const playerLeft = this.findItemInCell("player", { y, x: x - 1 })
            if (playerLeft) {
                return playerLeft
            }
        }
        if (x + 1 <= mapWidth) {

            const playerRight = this.findItemInCell("player", { y, x: x + 1 })

            if (playerRight) {
                return playerRight
            }
        }
    }

}