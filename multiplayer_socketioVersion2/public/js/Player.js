class Player extends Phaser.Physics.Arcade.Sprite{
    /**
     * Player class manager
     * @param {*} configPlayer contains all the parameters
     */
    constructor(configPlayer){
        //it needs scene, pos X, pos Y, texture        
        super(configPlayer.scene, configPlayer.posX, configPlayer.posY, configPlayer.texture);

        //initial positions
        this.initialPosX = configPlayer.posX;
        this.initialPosY = configPlayer.posY;

        //Scene property
        this.scene = configPlayer.scene;

        //add the player to the current scene
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this);

        this.beamCount = 20;
        //score for each player
        this.score = 0;

        //Lives
        this.lives = 3;

        this.setCollideWorldBounds(true);
        
        //play animation
        this.play(configPlayer.anim);

        this.playerId = configPlayer.playerId;

        
        this.playerInfo = configPlayer.playerInfo;

        
      
        //add cursor keys player
        /*this.playerKeys = this.scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });*/

        //add a fire key
        this.fireKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        

/*
        //Create the text for beam counts
        let posX = (this.playerId==1) ? 50 : 220;
        this.beamTxt = this.scene.add.text(posX, 30, this.beamCount , {font:"25px Arial", fill:"yellow"});

        //Create the text for lives counts
        posX = (this.playerId==1) ? 10 : 180;
        this.livesTxt = this.scene.add.text(posX, 30, this.lives , {font:"25px Arial", fill:"yellow"});



        //Text for score
        posX = (this.playerId==1) ? 10 : 180;
        this.padScore = Phaser.Utils.String.Pad(this.score,5,'0',1);
        this.scoreTxt = this.scene.add.text(posX, 0, this.padScore,{font:"25px Arial", fill:"yellow"});        
*/
        //add to the players group
        /*this.scene.players.add(this);*/

    }


    update(){

        //move Player with the cursor Keys
        /*this.movePlayerManager();*/
        

        //when the fire key is pressed
        /*if (Phaser.Input.Keyboard.JustDown(this.fireKey)){
            console.log("pium");
            if (this.beamCount > 0){
                console.log("pium");
                let beam = new Beam({
                    scene : this.scene,
                    posX : this.x,
                    posY : this.y - 16,
                    texture: "beam", 
                    playerId : this.playerId
                });
                this.beamCount--;
                this.beamTxt.text = this.beamCount;
                //add the bean to the group 
                this.scene.projectiles.add(beam);
                
            }
        }*/

    }

    /**
     * Cursor keys for player
     */
    movePlayerManager(){
        //if not pressing any cursor key velocity = 0
        this.setVelocity(0);

        if (this.playerKeys.left.isDown){
            this.setVelocityX(-200);
        }else if (this.playerKeys.right.isDown){
            this.setVelocityX(+200);
        }

        if (this.playerKeys.up.isDown){
            this.setVelocityY(-200);
        }else if (this.playerKeys.down.isDown){
            this.setVelocityY(+200);
        }    

    }





}