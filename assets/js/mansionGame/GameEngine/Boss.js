import Enemy from './Enemy.js';
import GameObject from './GameObject.js';
import Character from './Character.js';  // We do this as a Charecter can actually draw itself to the screen

/*  This is a file for the Game Engine made by the Tinkerers (lvl6)
    Do not delete this file.
    - Samarth (and the rest of the Tinkerers)
*/

// The Reaper is a more powerful enemy that moves towards the player and performs various attacks
class Reaper extends Enemy {
    constructor(data = null, gameEnv = null) {
        super(data, gameEnv);
        this.stage = 1;
        this.isThrowingScythe = false;
        this.fullHealth = 1500;
        this.helthPoints = this.fullHealth;
        this.arrows = [];
        this.fireballs = [];
        this.angerModifier = 1;  // Increase this once hp gets low and boss is angry
        this.projectileSpeed = 5;  // This applies to all projectiles
        this.scythes = [];
    }

    // Overwrite the update method to add movement towards the nearest player
    update() {
        // Start by drawing the enemy to the screen
        this.draw();

        // Set the stage & update angerModifer
        const healthRatio = this.healthPoints / this.fullHealth;
        if (healthRatio < 2 / 3) {
            this.stage = 2;
        } else if (healthRatio < 1 / 3) {
            this.stage = 3;
            this.angerModifier = 2;
        } else if (this.healthPoints <= 0) {
            this.stage = 4;
            this.angerModifier = 1;
        }

        // Add code here to move each arrow and fireball towards the player

        // If the Reaper is throwing the scythe, then don't move (to simplify calculations)
        if (this.isThrowingScythe) {
            return;
        }

        // Direct copy-paste from the Enderman in the adventure game -- VERIFY THIS WORKS
        // Find all player objects
        const players = this.gameEnv.gameObjects.filter(obj => 
            obj.constructor.name === 'Player'
        );

        if (players.length === 0) return;
        
        // Find nearest player
        let nearest = players[0];
        let minDist = Infinity;

        for (const player of players) {
            const dx = player.position.x - this.position.x;
            const dy = player.position.y - this.position.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < minDist) {
                minDist = dist;
                nearest = player;
            }
        }

        // Move towards nearest player
        const Reaperspeed = 0.5; // Adjust speed as needed -- Enderman speed from adventureGame: 1.5
        const dx = nearest.position.x - this.position.x;
        const dy = nearest.position.y - this.position.y;
        const ReaperPlayerangle = Math.atan2(dy, dx);

        // Update position
        this.position.x += Math.cos(ReaperPlayerangle) * Reaperspeed;
        this.position.y += Math.sin(ReaperPlayerangle) * Reaperspeed;
    }

    // For now, disable the Reaper from exploding (we may change this later)
    explode(x, y) {
        // We don't want our Reaper exploding
        throw new Error("Reapers cannot explode! (yet :})");
    }

    // Now we'll define attacks, starting with the scythe
    scytheAttack() {
        this.isThrowingScythe = true;
        // Put logic for scytheAttack here
        this.scythes.push(new Scythe(this.gameEnv, nearest.position.x, nearest.position.y, this.position.x, this.position.y));
        // TODO: finish logic for scythe updates & collision with player
        this.isThrowingScythe = false;
    }

    // This is the fireball attack, create a new Fireball
    fireballAttack() {
        // Add attack logic here
        this.fireballs.push(new Projectile());
    }

    // This is the arrow attak, create a new arrow
    arrowAttack() {
        // Add attack logic here
        this.arrows.push(new Projectile());
    }
}


// Template class -- VERIFY THIS
class Scythe extends GameObject {
    constructor(gameEnv = null, targetx, targety, sourcex, sourcey) {
        super(gameEnv);
        // Add code here for the Scythe the Reaper weilds

        // finalized ellipse attributes, DO NOT CHANGE this - anish + tinkerers
        this.target_coords = (targetx, targety); // player coords at scythe thrown
        this.source_coords = (sourcex, sourcey); // reaper coords at scythe thrown
        this.ellipse_center = ((targetx+sourcex)/2, (targety+sourcey)/2);
        this.ellipse_width = Math.sqrt((targetx-sourcex)**2 + (targety-sourcey)**2);
        this.ellipse_height = this.ellipse_height/20;
        this.ellipse_tilt = Math.atan((sourcey-targety)/(sourcex-targetx));
        this.radian_prog = 0;

        this.revComplete = false;
    }

    update(){
        if (this.radian_prog > Math.PI*2){
            this.revComplete = true;
            return true; // already reached boss
        } else {
            this.radian_prog += .05; // experiment with diff radian increments to change speed
            let x_coord = (
                this.ellipse_center[0] + 
                (this.ellipse_width/2)*Math.cos(this.radian_prog)*Math.cos(this.ellipse_tilt) -
                (this.ellipse_height)*Math.sin(this.radian_prog)*Math.sin(this.ellipse_tilt)
            );

            let y_coord = (
                this.ellipse_center[1] +
                (this.ellipse_width/2)*Math.cos(this.radian_prog)*Math.sin(this.ellipse_tilt) +
                (this.ellipse_height)*Math.sin(this.radian_prog)*Math.cos(this.ellipse_tilt)
            );

            this.position.x = x_coord;
            this.position.y = y_coord;

        }
    }  
}


// Template class -- VERIFY THIS
class Projectile extends Character {
    constructor(speed, data = null, gameEnv = null) {
        super(data, gameEnv);
        this.speed = speed;
    }

    // The function to make the player move towards the projectile
    update(speed) {
        // Draw the projectile to the screen
        this.draw();

        /* Direct copy-paste from the Enderman in the adventure game -- VERIFY THIS WORKS
        Also clean this up later to be a global function that can be used by both Projectile class & the Reaper class. */
        // Find all player objects
        const players = this.gameEnv.gameObjects.filter(obj => 
            obj.constructor.name === 'Player'
        );

        if (players.length === 0) return;
        
        // Find nearest player
        let nearest = players[0];
        let minDist = Infinity;

        for (const player of players) {
            const dx = player.position.x - this.position.x;
            const dy = player.position.y - this.position.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < minDist) {
                minDist = dist;
                nearest = player;
            }
        }

        // Move towards nearest player
        const dx = nearest.position.x - this.position.x;
        const dy = nearest.position.y - this.position.y;
        const angle = Math.atan2(dy, dx);

        // Update position
        this.position.x += Math.cos(angle) * speed;
        this.position.y += Math.sin(angle) * speed;
    }
}
