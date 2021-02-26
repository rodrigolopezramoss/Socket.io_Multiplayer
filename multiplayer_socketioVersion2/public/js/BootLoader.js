class BootLoader extends Phaser.Scene {
    constructor(){
        super("BootLoader");         
    }


    preload() {
        this.load.image('star', 'assets/star_gold.png');
        this.load.spritesheet("playerR", "assets/playerRed.png", {
            frameWidth: 16,
            frameHeight: 24,
        });
        this.load.spritesheet("playerB", "assets/playerBlue.png", {
            frameWidth: 16,
            frameHeight: 24,
        });
        this.load.spritesheet("playerY", "assets/playerYellow.png", {
            frameWidth: 16,
            frameHeight: 24,
        });
        this.load.spritesheet("playerG", "assets/playerGreen.png", {
            frameWidth: 16,
            frameHeight: 24,
        });
        this.load.spritesheet("playerP", "assets/playerPurple.png", {
            frameWidth: 16,
            frameHeight: 24,
        });
        this.load.spritesheet("playerK", "assets/playerPink.png", {
            frameWidth: 16,
            frameHeight: 24,
        });
        this.load.spritesheet("beam", "assets/beam.png",
        {
            frameWidth: 16,
            frameHeight: 16
        });
        
        
    }

    create(){
        //Beam animation
        this.anims.create({
            key: "beam_shoot",
            frames: this.anims.generateFrameNumbers("beam"),
            frameRate: 20,
            repeat: -1
        });
        //Player animation
        this.anims.create({
            key: "playerR_fly",
            frames: this.anims.generateFrameNumbers("playerR"),
            frameRate: 20,
            repeat: -1
        });
        //Player animation
        this.anims.create({
            key: "playerB_fly",
            frames: this.anims.generateFrameNumbers("playerB"),
            frameRate: 20,
            repeat: -1
        });
        //Player animation
        this.anims.create({
            key: "playerY_fly",
            frames: this.anims.generateFrameNumbers("playerY"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "playerG_fly",
            frames: this.anims.generateFrameNumbers("playerG"),
            frameRate: 20,
            repeat: -1
        });
        //Player animation
        this.anims.create({
            key: "playerP_fly",
            frames: this.anims.generateFrameNumbers("playerP"),
            frameRate: 20,
            repeat: -1
        });
        //Player animation
        this.anims.create({
            key: "playerK_fly",
            frames: this.anims.generateFrameNumbers("playerK"),
            frameRate: 20,
            repeat: -1
        });
        //CLIENT: Say to the Server that I am here. I will have a socket.id
        this.socket = io();
        //go to scene
        this.scene.start("Menu", {socket:this.socket, fromgame:false});
    }

}

export default BootLoader;