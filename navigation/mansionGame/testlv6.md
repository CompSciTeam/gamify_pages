---
layout: opencs
title: Mansion Game
permalink: /gamify/mansionGame/testlv6
---

<div id="gameContainer">
    <div id="promptDropDown" class="promptDropDown" style="z-index: 9999"></div>
    <canvas id='gameCanvas'></canvas>
</div>

<script type="module">
    // Mansion Game assets locations
    import GameLevel6 from "{{site.baseurl}}/assets/js/mansionGame/mansionLevel6.js";
    import { pythonURI, javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

    const gameLevelClasses = [GameLevel1, GameLevel2, GameLevel3, GameLevel4, GameLevel5, GameLevel6 ];

    // Web Server Environment data
    const environment = {
        path:"{{site.baseurl}}",
        pythonURI: pythonURI,
        javaURI: javaURI,
        fetchOptions: fetchOptions,
        gameContainer: document.getElementById("gameContainer"),
        gameCanvas: document.getElementById("gameCanvas"),
        gameLevelClasses: gameLevelClasses
        ,
        // Global photographic background for the entire game. Replace with your local image if desired.
        /*globalBackgroundData: {
            src: "{{site.baseurl}}/assets/images/mansion_main_photo.png",
            mode: 'cover',
            crossOrigin: 'anonymous'
        }*/

    }
    // Launch Mansion Game
    Game.main(environment);
</script>
