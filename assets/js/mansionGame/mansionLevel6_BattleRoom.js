import GameEnvBackground  from "./GameEngine/GameEnvBackground.js";
import Player from "./GameEngine/Player.js";
import Boss from './GameEngine/Boss.js';

class MansionLevel6_BattleRoom {
    constructor(gameEnv) {
        let width = gameEnv.innerWidth;
        let height = gameEnv.innerHeight;
        let path = gameEnv.path;

        const image_src_floor = path + "/images/mansionGame/tiledFloor.png";
        const image_data_floor = {
            name: 'floor',
            src: image_src_floor,
            pixels: {height: 341, width: 498}
        };

        /*
        // Defnine the player
        const sprite_src_mc = path + "/images/mansionGame/playerMove.png";
        const MC_SCALE_FACTOR = 1;
        const sprite_data_mc = {
            id: 'mc',
            src: sprite_src_mc,
            SCALE_FACTOR: MC_SCALE_FACTOR,
            STEP_FACTOR: 500,
            ANIMATION_RATE: 30,
            INIT_POSITION: {x: (width / 3), y: (height * 0.75)},
            pixels: {height: 3600, width: 1200},
            orientation: {rows: 1, columns: 3},
            // for now I'm just making the animation for all directions the same.
            down: {row: 0, start: 0, columns: 3},
            downRight: {row: 0, start: 0, columns: 3, rotate: Math.PI/16},
            downLeft: {row: 0, start: 0, columns: 3, rotate: -Math.PI/16},
            left: {row: 0, start: 0, columns: 3},
            right: {row: 0, start: 0, columns: 3},
            up: {row: 0, start: 0, columns: 3},
            upLeft: {row: 0, start: 0, columns: 3, rotate: Math.PI/16},
            upRight: {row: 0, start: 0, columns: 3, rotate: -Math.PI/16},  
            hitbox: {widthPercentage: 0.5, heightPercentage: 0.4},
            keypress: {up: 87, left: 65, down: 83, right: 68} // W, A, S, D
        };
        */

        // Testing wether copying the player from the first room works
        //Player appears but doesm't move
        const sprite_src_mc = path + "/images/mansionGame/spookMcWalk.png"; // be sure to include the path
        const MC_SCALE_FACTOR = 6;
        const sprite_data_mc = {
            id: 'Spook',
            greeting: "Hi, I am Spook.",
            src: sprite_src_mc,
            SCALE_FACTOR: MC_SCALE_FACTOR,
            STEP_FACTOR: 1200,
            ANIMATION_RATE: 10,
            INIT_POSITION: { x: (width / 2 - width / (5 * MC_SCALE_FACTOR)), y: height - (height / MC_SCALE_FACTOR)}, 
            pixels: {height: 2400, width: 3600},
            orientation: {rows: 2, columns: 3},
            down: {row: 1, start: 0, columns: 3},
            downRight: {row: 1, start: 0, columns: 3, rotate: Math.PI/16},
            downLeft: {row: 0, start: 0, columns: 3, rotate: -Math.PI/16},
            left: {row: 0, start: 0, columns: 3},
            right: {row: 1, start: 0, columns: 3},
            up: {row: 1, start: 0, columns: 3},
            upLeft: {row: 0, start: 0, columns: 3, rotate: Math.PI/16},
            upRight: {row: 1, start: 0, columns: 3, rotate: -Math.PI/16},
            hitbox: {widthPercentage: 0.45, heightPercentage: 0.2},
            keypress: {up: 87, left: 65, down: 83, right: 68} // W, A, S, D
        };

        // Define the Reaper boss (enabled for the battle room)
        //const sprite_src_enemy = path + "/images/mansionGame/ReaperMainBody.png";
        //const BOSS_SCALE_FACTOR = 2;  // Make boss bigger
        //const sprite_boss_data = {
            //id: 'reaper',
            //src: sprite_src_enemy,
            //SCALE_FACTOR: BOSS_SCALE_FACTOR,
            //STEP_FACTOR: 800,  // Slower movement
            //ANIMATION_RATE: 30,
            // spawn near the right side of the room
           // INIT_POSITION: {x: Math.floor(width * 0.7), y: Math.floor(height * 0.6)},
            //pixels: {height: 300, width: 300},
            //orientation: {rows: 1, columns: 1},
            //hitbox: {widthPercentage: 0.45, heightPercentage: 0.2},
            // Boss specific settings
            //projectileSpeed: 8,
            //attackInterval: 2000,  // Time between attacks in ms
            //projectileTypes: ['FIREBALL', 'ARROW'],  // Available projectile types
            //initialHealth: 1500
        //};

        this.classes = [
            {class: GameEnvBackground, data: image_data_floor},
            {class: Player, data: sprite_data_mc},
            {class: Boss, data: sprite_boss_data}
        ];

    };

}

export default MansionLevel6_BattleRoom;