import Enemy from './Enemy.js';
import Boomerang from './Boomerang.js';
import Projectile from './Projectile.js';

/*  This is a file for the Game Engine made by the Tinkerers (lvl6)
    Do not delete this file.
    - Tinkerers

    Boomerang class: used to make the scythe
    Projectile class: used to make the arrows/fireballs

*/

// The Reaper is a more powerful enemy that moves towards the player and performs various attacks
class Boss extends Enemy {
    constructor(data = null, gameEnv = null) {
        super(data, gameEnv);
        this.stage = 1;
        this.isThrowingScythe = false;
        this.fullHealth = data?.initialHealth || 1500;
        this.healthPoints = this.fullHealth;
        this.arrows = [];
        this.fireballs = [];
        this.angerModifier = 1;  // Increases when hp is low
        this.projectileSpeed = data?.projectileSpeed || 5;
        this.scythes = [];
        this.lastAttackTime = 0;
        this.attackInterval = data?.attackInterval || 2000;
        this.projectileTypes = data?.projectileTypes || ['FIREBALL', 'ARROW'];
        
        // Start attack pattern
        this.startAttackPattern();
    }

    // Overwrite the update method to add movement towards the nearest player
    startAttackPattern() {
        // Create periodic attacks
        setInterval(() => {
            if (this.healthPoints <= 0) return; // Stop attacks if dead
            
            const now = Date.now();
            if (now - this.lastAttackTime >= this.attackInterval) {
                this.lastAttackTime = now;
                
                // Find nearest player for target
                const target = this.findNearestPlayer();
                if (!target) return;

                // Choose attack based on stage and random chance
                const rand = Math.random();
                if (this.stage >= 3 && rand < 0.3) {
                    this.scytheAttack(target);
                } else if (rand < 0.6) {
                    this.fireballAttack(target);
                } else {
                    this.arrowAttack(target);
                }
            }
        }, 100); // Check every 100ms
    }

    findNearestPlayer() {
        const players = this.gameEnv.gameObjects.filter(obj => 
            obj.constructor.name === 'Player'
        );
        
        if (players.length === 0) return null;

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
        
        return nearest;
    }

    update() {
        // Start by drawing the enemy to the screen
        this.draw();

        // Set the stage & update angerModifer
        const healthRatio = this.healthPoints / this.fullHealth;
        if (healthRatio < 0.66) {
            this.stage = 2;
            this.attackInterval = 1500; // Attack faster
        } 
        if (healthRatio < 0.33) {
            this.stage = 3;
            this.angerModifier = 2;
            this.attackInterval = 1000; // Even faster
        } 
        if (this.healthPoints <= 0) {
            this.stage = 4;
            this.angerModifier = 1;
        }

        // Update all projectiles
        [...this.fireballs, ...this.arrows].forEach((projectile, index) => {
            if (projectile.revComplete) {
                projectile.destroy();
                if (this.fireballs.includes(projectile)) {
                    this.fireballs.splice(this.fireballs.indexOf(projectile), 1);
                } else {
                    this.arrows.splice(this.arrows.indexOf(projectile), 1);
                }
            } else {
                projectile.update();
            }
        });

        // If the Reaper is throwing the scythe, then don't move (to simplify calculations)
        if (this.isThrowingScythe) {

            let scythesToRemove = [];

            this.scythes.forEach(element => {
                element.update();
                if (element.revComplete){
                    scythesToRemove.push(element);
                }
            });

            scythesToRemove.forEach(element => {
                element.destroy();
                this.scythes.splice(1, this.scythes.indexOf(element));
            });

        } else {

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
            const Reaperspeed = 0.25; // Adjust speed as needed -- Enderman speed from adventureGame: 1.5
            const dx = nearest.position.x - this.position.x;
            const dy = nearest.position.y - this.position.y;
            const ReaperPlayerangle = Math.atan2(dy, dx);

            // Update position
            this.position.x += Math.cos(ReaperPlayerangle) * Reaperspeed;
            this.position.y += Math.sin(ReaperPlayerangle) * Reaperspeed;
        }
    }

    // For now, disable the Reaper from exploding (we may change this later)
    explode(x, y) {
        // We don't want our Reaper exploding
        throw new Error("Reapers cannot explode! (yet :})");
    }

    // Now we'll define attacks, starting with the scythe
    scytheAttack(target) {
        this.scythes.push(new Boomerang(this.gameEnv, target.position.x, target.position.y, this.position.x, this.position.y));
        this.isThrowingScythe = true;
    }

    // This is the fireball attack, create a new Fireball
    fireballAttack(target) {
        this.fireballs.push(new Projectile(this.gameEnv, target.position.x, target.position.y, this.position.x, this.position.y, "FIREBALL"));
    }

    // This is the arrow attack, create a new arrow
    arrowAttack(target) {
        this.arrows.push(new Projectile(this.gameEnv, target.position.x, target.position.y, this.position.x, this.position.y, "ARROW"));
    }
}

export default Boss;