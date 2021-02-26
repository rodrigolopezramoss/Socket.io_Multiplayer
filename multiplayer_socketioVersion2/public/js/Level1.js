class Level1 extends Phaser.Scene {
    constructor() {
        super("Level1");
        
        console.log("Level 1 (load)"); 
    }

    //Every time you enter in Level1
    init(data){
        //Receive the socket
        this.socket = data.socket;
        //Send to SERVER the information that I'm playing        
        this.socket.emit('playerStartLevel1', data.texture);
        this.texture = data.texture;
    }

    create() {

        /*this.startTXT = this.add.text(10, 20, "Quit" , {font:"25px Arial", fill:"yellow"}).setAlpha(1).setDepth(9)
        .setInteractive().on("pointerdown",() => {            
            this.scene.start("Menu",{socket:this.socket, fromgame:true});
        });*/
        
        var self = this;
        
        this.otherPlayers = this.physics.add.group();

        //send to the server that I am active 
        //send to server playerStartLevel1
        //at server player.active = true
        //server send to all clients "CurrentActivePlayers"
        

        //from server
        this.socket.on('currentPlayers', function (players) {
            Object.keys(players).forEach(function (id) { 
                if (players[id].active){
                    if (players[id].playerId === self.socket.id) {
                        self.addPlayer(self, players[id]);
                    } else {
                        self.addOtherPlayers(self, players[id]);
                    }
                }
            });
        });

        
        this.socket.on('newPlayer', function (playerInfo) {
            self.addOtherPlayers(self, playerInfo);
        });


        this.socket.on('disconnect', function (playerId) {
            self.otherPlayers.getChildren().forEach(function (otherPlayer) {
                if (playerId === otherPlayer.playerId) {
                    otherPlayer.destroy();
                }
            });
        });
        this.cursors = this.input.keyboard.createCursorKeys();


        this.socket.on('playerMoved', function (playerInfo) {
            self.otherPlayers.getChildren().forEach(function (otherPlayer) {
                if (playerInfo.playerId === otherPlayer.playerId) {
                    otherPlayer.setRotation(playerInfo.rotation);
                    otherPlayer.setPosition(playerInfo.x, playerInfo.y);
                }
            });
        });


        this.blueScoreText = this.add.text(16, 16, '', { fontSize: '32px', fill: '#FFFFFF' });
        this.redScoreText = this.add.text(584, 16, '', { fontSize: '32px', fill: '#FFFFFF' });
        this.yellowScoreText = this.add.text(584, 64, '', { fontSize: '32px', fill: '#FFFFFF' });
        this.greenScoreText = this.add.text(16, 64, '', { fontSize: '32px', fill: '#FFFFFF' });
        this.purpleScoreText = this.add.text(584, 112, '', { fontSize: '32px', fill: '#FFFFFF' });
        this.pinkScoreText = this.add.text(16, 112, '', { fontSize: '32px', fill: '#FFFFFF' });



        this.socket.on('scoreR', function(scores){
            self.redScoreText.setText('Red: ' + scores.red);
        });
        this.socket.on('scoreB', function(scores){
            self.blueScoreText.setText('Blue: ' + scores.blue);
        });
        this.socket.on('scoreY', function(scores){
            self.yellowScoreText.setText('Yellow: ' + scores.yellow);
        });
        this.socket.on('scoreG', function(scores){
            self.greenScoreText.setText('Green: ' + scores.green);
        });
        this.socket.on('scoreP', function(scores){
            self.purpleScoreText.setText('Purple: ' + scores.purple);
        });
        this.socket.on('scoreK', function(scores){
            self.pinkScoreText.setText('Pink: ' + scores.pink);
        });


        this.socket.on('starDestruccion', function () {
            self.star.destroy();
        });

        this.socket.on('starLocation', function (starLocation) {
            if (self.star) self.star.destroy();
            self.star = self.physics.add.image(starLocation.x, starLocation.y, 'star');
            self.physics.add.overlap(self.player, self.star, function () {
                if(self.player.playerId != starLocation.id){
                    
                    this.socket.emit('starCollected',this.player.texture.key);
                }
            }, null, self);
        });


    }//CREATE

    addPlayer( self, playerInfo) {

        if (typeof self.player === 'undefined') {
            
            //add the player
            self.player = new Player({
                scene : this,
                posX : playerInfo.x,
                posY :playerInfo.y,
                texture : playerInfo.texture,
                anim : playerInfo.texture + "_fly",
                playerId : playerInfo.playerId,
                playerInfo : playerInfo       
                
            });
            
            self.player.setDrag(100);
            self.player.setAngularDrag(100);
            self.player.setMaxVelocity(200);
        }
    }

    
    addOtherPlayers(self, playerInfo) {
        if (playerInfo.active){
            let exist = false;
            
            self.otherPlayers.getChildren().forEach(function (otherPlayer) {
                if (playerInfo.playerId === otherPlayer.playerId) {
                    exist = true;
                }
            });

            if (!exist){
                const otherPlayer =  new Player({
                    scene : this,
                    posX : playerInfo.x,
                    posY :playerInfo.y,
                    texture : playerInfo.texture,
                    anim : playerInfo.texture + "_fly",
                    playerId : playerInfo.playerId,
                    playerInfo : playerInfo      
                    
                });

                otherPlayer.setOrigin(0.5, 0.5);
                //Recorrer el grupo otherPlayers y comprobar que no existe con el texture
                self.otherPlayers.add(otherPlayer);
            }
        }
    }


    /****************************************************************************
    ***                               UPDATE                                  ***
    *****************************************************************************/
    update() {


        if (this.player) {

            if (this.cursors.left.isDown) {
                this.player.setAngularVelocity(-150);
            } else if (this.cursors.right.isDown) {
                this.player.setAngularVelocity(150);
            } else {
                this.player.setAngularVelocity(0);
            }
            


            if (this.cursors.up.isDown) {
                this.physics.velocityFromRotation(this.player.rotation + 5, 100, this.player.body.acceleration);
            } else {
                this.player.setAcceleration(0);
            }

            if(Phaser.Input.Keyboard.JustDown(this.player.fireKey)){
                this.socket.emit('crearEstrella',{x: this.player.x, y: this.player.y, id: this.player.playerId});
                
            }


            this.physics.world.wrap(this.player, 5);

            var x = this.player.x;
            var y = this.player.y;
            var r = this.player.rotation;

            if (this.player.oldPosition && (x !== this.player.oldPosition.x || y !== this.player.oldPosition.y || r !== this.player.oldPosition.rotation)) {
                this.socket.emit('playerMovement', { x: this.player.x, y: this.player.y, rotation: this.player.rotation});
            }

            this.player.oldPosition = {
                x: this.player.x,
                y: this.player.y,
                rotation: this.player.rotation
            };
        }




    }//update



}//class

export default Level1;