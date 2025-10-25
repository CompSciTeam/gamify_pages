import GameEnvBackground  from "./GameEngine/GameEnvBackground.js";
import Player from "./GameEngine/Player.js";
import Npc from './GameEngine/Npc.js';
import MansionLevel6_BattleRoom from './mansionLevel6_BattleRoom.js';

class MansionLevel6 {
   constructor(gameEnv){

        // upon mansion level6 construction, 

        // keep reference to gameEnv for lifecycle methods
        this.gameEnv = gameEnv;

        let width = gameEnv.innerWidth;
        let height = gameEnv.innerHeight;
        let path = gameEnv.path;

        const image_src_chamber = path + "/images/gamify/bgBossIntroChamber.png"
        const image_data_chamber = {
            name: 'bossintro',
            greeting: "You hear a faint echo from behind the ebony doors.",
            src: image_src_chamber,
            pixels: {height: 580, width: 1038},
            mode: 'stretch'
        };

        /*
        const sprite_src_mc = path + "/images/gamify/mansionMcMove.png";
        const MC_SCALE_FACTOR = 1;
        const sprite_data_mc = {
            id: 'mc',
            src: sprite_src_mc,
            SCALE_FACTOR: MC_SCALE_FACTOR,
            STEP_FACTOR: 500,
            ANIMATION_RATE: 30,
            INIT_POSITION: {x: (width/2), y: (height/2)},
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
        */

        
        
        const sprite_src_chillguy = path + "/images/gamify/chillguy.png"; // be sure to include the path
        const CHILLGUY_SCALE_FACTOR = 5;
        const sprite_data_chillguy = {
            id: 'Chill Guy',
            greeting: "Hi I am Chill Guy, the desert wanderer. I am looking for wisdom and adventure!",
            src: sprite_src_chillguy,
            SCALE_FACTOR: CHILLGUY_SCALE_FACTOR,
            STEP_FACTOR: 1000,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: (width/2 - width/(5*CHILLGUY_SCALE_FACTOR)), y: height - (height/CHILLGUY_SCALE_FACTOR) }, 
            pixels: {height: 384, width: 512},
            orientation: {rows: 3, columns: 4 },
            down: {row: 0, start: 0, columns: 3 },
            downRight: {row: 1, start: 0, columns: 3, rotate: Math.PI/16 },
            downLeft: {row: 2, start: 0, columns: 3, rotate: -Math.PI/16 },
            left: {row: 2, start: 0, columns: 3 },
            right: {row: 1, start: 0, columns: 3 },
            up: {row: 3, start: 0, columns: 3 },
            upLeft: {row: 2, start: 0, columns: 3, rotate: Math.PI/16 },
            upRight: {row: 1, start: 0, columns: 3, rotate: -Math.PI/16 },
            hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
            keypress: { up: 87, left: 65, down: 83, right: 68 } // W, A, S, D
        };

        /*
        const sprite_src_zombie_npc = path + "/images/gamify/zombieNpc.png";
        const sprite_greet_zombie_npc = "I heard the boss is waiting for you... enter if you dare.";
        const sprite_data_zombie = {
            id: 'ZombieNPC',
            greeting: sprite_greet_zombie_npc,
            src: sprite_src_zombie_npc,
            SCALE_FACTOR: 0.2,
            ANIMATION_RATE: 20,
            pixels: {width: 3600, width:1200},
            INIT_POSITION: { x: (width / 2), y: (height / 2)},
            orientation: {rows: 1, columns: 3},
            left: {row: 0, start:0, columns:3},
            hitbox: {widthPercentage: 0.3, heightPercentage: 0.5},
            dialogues: [
                "I heard the boss is waiting for you...",
                "Enter if you dare... he's waiting for you...",
                "Don't go in! I heard the Reaper himself was in there.",
            ],

            reaction: function() {
                if (this.dialogueSystem) {
                    this.showReactionDialogue();
                } else {
                    console.log(sprite_greet_zombie_npc);
                }           
            },

            interact: function() {
                if (this.dialogueSystem) {
                    this.showReactionDialogue();
                } else {
                    console.log(sprite_greet_zombie_npc);
                }           
            },

        }
        */

        // invisible sprite for door collision that handles going to lv6 battle room

        const sprite_src_bossdoor = path + "/images/gamify/invisDoorCollisionSprite.png";
        const sprite_greet_bossdoor = "Battle the Reaper? Press E";
        const sprite_data_bossdoor = {
            id: 'Door',
            greeting: sprite_greet_bossdoor,
            src: sprite_src_bossdoor,
            SCALE_FACTOR: 6,
            ANIMATION_RATE: 100,
            pixels: {width: 2029, height: 2025},
            //INIT_POSITION: { x: (width * 2 / 5), y: (height / 2)},  // This is the old init position
            //INIT_POSITION: {x: (width / 2), y: (height / 8)},  // This init position has the correct height
            INIT_POSITION: {x: (width * 19 / 40), y: (height / 8)},
            orientation: {rows: 1, columns: 1},
            down: {row: 0, start: 0, columns: 1},
            hitbox: {widthPercentage: 0.1, heightPercentage: 0.2},
            // Add dialogues array for random messages
            dialogues: [
                "Many have entered. Few have returned.",
                "Dangerous things await you beyond this door..",
                "Prepare yourself. The journey beyond won't be easy."
            ],
            reaction: function() {
                // Don't show any reaction dialogue - this prevents the first alert
                // The interact function will handle all dialogue instead
            },
            interact: function() {
                // Clear any existing dialogue first to prevent duplicates
                if (this.dialogueSystem && this.dialogueSystem.isDialogueOpen()) {
                    this.dialogueSystem.closeDialogue();
                }
                
                // Create a new dialogue system if needed
                if (!this.dialogueSystem) {
                    this.dialogueSystem = new DialogueSystem();
                }
                
                // Show portal dialogue with buttons
                this.dialogueSystem.showDialogue(
                    "Do you wish to battle the Reaper?",
                    "Door",
                    this.spriteData.src
                );
                
                // Add buttons directly to the dialogue
                this.dialogueSystem.addButtons([
                    {
                        text: "Enter doors",
                        primary: true,
                        action: () => {
                            this.dialogueSystem.closeDialogue();
                            
                            // Clean up the current game state
                            if (gameEnv && gameEnv.gameControl) {
                                // Store reference to the current game control
                                const gameControl = gameEnv.gameControl;
                                
                                // Create fade overlay for transition
                                const fadeOverlay = document.createElement('div');
                                Object.assign(fadeOverlay.style, {
                                    position: 'fixed',
                                    top: '0',
                                    left: '0',
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: '#000',
                                    opacity: '0',
                                    transition: 'opacity 1s ease-in-out',
                                    zIndex: '9999'
                                });
                                document.body.appendChild(fadeOverlay);
                                
                                console.log("Starting battle level transition...");
                                
                                // Fade in
                                requestAnimationFrame(() => {
                                    fadeOverlay.style.opacity = '1';
                                    
                                    // After fade in, transition to End level
                                    setTimeout(() => {
                                        // Clean up current level properly
                                        if (gameControl.currentLevel) {
                                            // Properly destroy the current level
                                            console.log("Destroying current level...");
                                            gameControl.currentLevel.destroy();
                                            
                                            // Force cleanup of any remaining canvases
                                            const gameContainer = document.getElementById('gameContainer');
                                            const oldCanvases = gameContainer.querySelectorAll('canvas:not(#gameCanvas)');
                                            oldCanvases.forEach(canvas => {
                                                console.log("Removing old canvas:", canvas.id);
                                                canvas.parentNode.removeChild(canvas);
                                            });
                                        }
                                        
                                        console.log("Setting up battle room level...");
                                        
                                        // IMPORTANT: Store the original level classes for return journey
                                        gameControl._originalLevelClasses = gameControl.levelClasses;
                                        
                                        // Change the level classes to GameLevelEnd
                                        gameControl.levelClasses = [MansionLevel6_BattleRoom];
                                        gameControl.currentLevelIndex = 0;
                                        
                                        // Make sure game is not paused
                                        gameControl.isPaused = false;
                                        
                                        // Start the End level with the same control
                                        console.log("Transitioning to battle room level...");
                                        gameControl.transitionToLevel();
                                        
                                        // Fade out overlay
                                        setTimeout(() => {
                                            fadeOverlay.style.opacity = '0';
                                            setTimeout(() => {
                                                document.body.removeChild(fadeOverlay);
                                            }, 1000);
                                        }, 500);
                                    }, 1000);
                                });
                            }
                        }
                    },
                    {
                        text: "Not Ready",
                        action: () => {
                            this.dialogueSystem.closeDialogue();
                        }
                    }
                ]);
            }
        }
        


        this.classes = [
            { class: GameEnvBackground, data: image_data_chamber },
            { class: Player, data: sprite_data_chillguy },
            // { class: Npc, data: sprite_data_zombie},
            { class: Npc, data: sprite_data_bossdoor}
        ];

    };
}

export default MansionLevel6;
