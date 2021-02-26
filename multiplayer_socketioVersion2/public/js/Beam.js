class Beam extends Phaser.GameObjects.Sprite{
    constructor(configBeam){
        super(configBeam.scene, configBeam.posX, configBeam.posY, configBeam.texture);

        this.scene = configBeam.scene;

        //add the beam to the scene
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this);

        this.play("beam_shoot");

        this.velX;
        this.velY;

        
        this.rotation = configBeam.rotation;
        this.playerId = configBeam.playerId;

        //Apunta arriba
        if(((this.rotation >= -0.25)&&(this.rotation <= 0.25))){
            this.velX = 0;
            this.velY = -100;
        }



        //Apunta arriba a la derecha
        else if ((this.rotation > 0.25)&&(this.rotation < 1.25)){
            if ((this.rotation > 0.25)&&(this.rotation < 0.75)){
                this.velX = 50;
                this.velY = -100;
            }else if ((this.rotation > 0.75)&&(this.rotation < 1.25)){
            
                this.velX = 100;
                this.velY = -50;
            }
        }//Apunta a la derecha
        else if((this.rotation >= 1.25)&&(this.rotation <= 1.75)){
            this.velX = 100;
            this.velY = 0;
        }
        
        

        //Apunta abajo a la derecha
        else if ((this.rotation > 1.75)&&(this.rotation < 3)){
            if ((this.rotation > 1.75)&&(this.rotation < 2.25)){
                this.velX = 100;
                this.velY = 50;
            }else if ((this.rotation > 2.25)&&(this.rotation < 3)){
                this.velX = 50;
                this.velY = 100;
            }
        }//Apunta abajo
        else if((this.rotation >= 3)||(this.rotation <= -3)){
            this.velX = 0;
            this.velY = 100;
        }

        //Apunta abajo a la izquierda
        else if ((this.rotation > -3)&&(this.rotation < -1.75)){
            if ((this.rotation > -2.25)&&(this.rotation < -1.75)){
                this.velX = -100;
                this.velY = 50;
            }else if ((this.rotation > -3)&&(this.rotation < -2.25)){
                this.velX = -50;
                this.velY = 100;
            }
        }//Apunta a la izquierda
        else if((this.rotation >= -1.75)&&(this.rotation <= -1.25)){
            this.velX = -100;
            this.velY = 0;
        }

        //Apunta arriba a la izquierda
        else if ((this.rotation > -1.25)&&(this.rotation < -0.25)){
            if ((this.rotation > -0.75)&&(this.rotation < -0.25)){
                this.velX = -50;
                this.velY = -100;
            }else if ((this.rotation > -1.25)&&(this.rotation < -0.75)){
            
                this.velX = -100;
                this.velY = -50;
            }
        }
        
        
        
        this.body.velocity.y = this.velY;
        this.body.velocity.x = this.velX;
    }


    update(){
        //if the position of the beam is near the top 
        //make it dissapear
        console.log(this.y);
        if ((this.y > 600)||(this.y < 0)){
            this.destroy();
        }
    }


}