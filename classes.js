class Players {
    constructor(id, name, weapon) {
            this.id = id
            this.name = name
            this.health = 100
            this.position = {}
            this.weapon = weapon
            this.movementPoints = 3
            this.type = 'player'
            this.blocked = true
            this.defend = false
        }
        // the target is a player 
    attack(target) {
        if (this.health > 0) {
            let targetStatus = "alive"
                // the damage = the weapon damage
            let damage = this.weapon.damage
            targetStatus = "-" + this.name + " attack " + target.name + " and dealt " + damage + " damage " + "<br>"
            if (target.defend) {
                damage = damage / 2
                target.defend = false
            }
            target.health = target.health - damage
            if (target.health > 0) {
                targetStatus += "-" + target.name + " has " + target.health + " health Points Left"
            } else if (target.health < 0) {
                targetStatus = "dead"
            }
            return targetStatus
        }

    }
    defending() {
        this.defend = true
    }

    swapWeapon(newWeapon) {
        const oldWeapon = this.weapon
        this.weapon = newWeapon
        return oldWeapon
    }

    resetStats(weapon) {
        this.health = 100
        this.position = {}
        this.weapon = weapon
        this.movementPoints = 3
        this.defend = false
    }
}

class Weapons {
    constructor(id, name, damage) {
        this.id = id
        this.name = name
        this.damage = damage
        this.position = {}
        this.type = "weapon"
        this.blocked = false
    }
}

class Items {
    constructor(id, name, type, blocked) {
        this.id = id
        this.name = name
        this.position = {}
        this.type = type
        this.blocked = blocked
    }
}