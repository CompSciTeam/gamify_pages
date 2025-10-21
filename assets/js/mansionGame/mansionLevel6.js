import GameEnvBackground  from "./GameEngine/GameEnvBackground.js";
import Player from "./GameEngine/Player.js";
import Npc from './GameEngine/Npc.js';
import GameControl from './GameEngine/GameControl.js';
import MansionLevel6_BattleRoom from './MansionLevel6_BattleRoom.js';

class MansionLevel6 {
    constructor(gameEnv){
        let width = gameEnv.innerWidth;
        let height = gameEnv.innerHeight;
        let path = gameEnv.path;

        const image_src_bossIntroChamber = path + "images/gamify/bgBossIntroChamber.png"
        const image_bossIntroChamber = {
            name: 'bossintro',
            greeting: "You hear a faint echo from behind the ebony doors.",
            src: image_src_bossIntroChamber,
            pixels: {height: 341, width: 498}
        };

    }
}

export default MansionLevel6;