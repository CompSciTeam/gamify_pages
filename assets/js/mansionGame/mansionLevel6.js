import GameEnvBackground  from "./GameEngine/GameEnvBackground.js";
import Player from "./GameEngine/Player.js";
import Npc from './GameEngine/Npc.js';
import GameControl from './GameEngine/GameControl.js';
import MansionLevel6_BattleRoom from './mansionLevel6_BattleRoom.js';

class MansionLevel6 {
   constructor(gameEnv){
        let width = gameEnv.innerWidth;
        let height = gameEnv.innerHeight;
        let path = gameEnv.path;

        const image_src_chamber = path + "images/gamify/bgBossIntroChamber.png"
        const image_data_chamber = {
            name: 'bossintro',
            greeting: "You hear a faint echo from behind the ebony doors.",
            src: image_src_chamber,
            pixels: {height: 341, width: 498}
        };


        const sprite_src_mc = path + "/images/gamify/playerMove.png";
        const MC_SCALE_FACTOR = 1;
        const sprite_data_mc = {
            id: 'mc',
            src: sprite_src_mc,
            SCALE_FACTOR: MC_SCALE_FACTOR,
            STEP_FACTOR: 500,
            ANIMATION_RATE: 30,
            INIT_POSITION: {x: (width/2), y: (1.1*height - (height/MC_SCALE_FACTOR))},
            pixels: {height: 3600, width: 1200},
            orientation: {rows: 1, columns: 3},
            // for now I'm just making the animation for all directions the same.
            down: {row: 0, start:0, columns:3},
            downRight: {row: 0, start: 0, columns: 3, rotate: Math.PI/16 },
            downLeft: {row: 0, start: 0, columns: 3, rotate: -Math.PI/16 },
            left: {row: 0, start: 0, columns: 3 },
            right: {row: 0, start: 0, columns: 3 },
            up: {row: 0, start: 0, columns: 3 },
            upLeft: {row: 0, start: 0, columns: 3, rotate: Math.PI/16 },
            upRight: {row: 0, start: 0, columns: 3, rotate: -Math.PI/16 },  
            hitbox: { widthPercentage: 0.5, heightPercentage: 0.4 },
            keypress: { up: 87, left: 65, down: 83, right: 68 } // W, A, S, D
        };

        const sprite_src_zombie_npc = path + "/images/gamify/zombieNpc.png";
        const sprite_greet_zombie_npc = "I heard the boss is waiting for you... enter if you dare.";
        const sprite_data_zombie = {
            id: 'ZombieNPC',
            greeting: sprite_greet_zombie_npc,
            src: sprite_src_mc,
            SCALE_FACTOR: 1,
            ANIMATION_RATE: 20,
            pixels: {width: 3600, width:1200},
            INIT_POSITION: { x: (width * 3 / 4), y: (height * 1 / 2)},
            orientation: {rows: 1, columns: 3},
            left: {row: 0, start:0, columns:3},
            hitbox: {widthPercentage: 0.3, heightPercentage: 0.5},
            dialogues: [
                "I heard the boss is waiting for you...",
                "Enter if you dare.",
                "*groans* So you're his next meal, eh?",
                "Enter if you dare... he's waiting for you..."
            ],

            reaction: function() {
                if (this.dialogueSystem) {
                    this.showReactionDialogue();
                } else {
                    console.log(sprite_greet_r2d2);
                }           
            },

            interact: function() {
                if (this.dialogueSystem) {
                    this.showReactionDialogue();
                } else {
                    console.log(sprite_greet_r2d2);
                }           
            },

        }

        // todo add sprite for door collision

        this.classes = [
            { class: GameEnvBackground, data: image_data_chamber },
            { class: Player, data: sprite_data_mc },
            { class: Npc, data: sprite_data_zombie}
        ];

    };
}

export default MansionLevel6;