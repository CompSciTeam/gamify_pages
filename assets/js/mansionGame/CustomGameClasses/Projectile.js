import Boomerang from './Boomerang.js';

// Template class -- VERIFY THIS
class Projectile extends Boomerang {
    constructor(gameEnv = null, targetx, targety, sourcex, sourcey, type) {
        super(gameEnv);
        // Add code here for the Scythe the Reaper weilds

        // finalized ellipse attributes, DO NOT CHANGE this - tinkerers
        this.target_coords = (targetx, targety); // player coords at scythe thrown
        this.source_coords = (sourcex, sourcey); // reaper coords at scythe thrown
        this.ellipse_center = ((targetx+sourcex)/2, (targety+sourcey)/2);
        this.ellipse_width = Math.sqrt((targetx-sourcex)**2 + (targety-sourcey)**2);
        this.ellipse_height = 0.01;
        this.ellipse_tilt = Math.atan((sourcey-targety)/(sourcex-targetx));
        this.radian_prog = 0;
        this.radian_limit = Math.PI;

        this.projectileSpeed = 0.1;

        this.type = type; // determines cosmetic appearance of the prokectile

        this.revComplete = false;
    }

    update(){ super.update(); }

    destroy(){ super.destroy(); }
}

export default Projectile;