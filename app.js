function initCanvas(){
    var ctx = document.getElementById('my_canvas').getContext('2d');
    var backgroundImage = new Image();
    var naveImage   = new Image(); 
    var enemiespic1  = new Image(); 
    var enemiespic2 = new Image(); 

    // fondo y enemigos
    backgroundImage.src = "images/background-pic.jpg"; 
    naveImage.src       = "images/spaceship-pic.png"; 
    // Enemigos
    enemiespic1.src     = "images/enemigo1.png";
    enemiespic2.src     = "images/enemigo2.png"; 
    
    
    var cW = ctx.canvas.width; 
    var cH = ctx.canvas.height;

   //funcion para retornar la ubicacion y el id de los enemigos
    var enemigo = function(options){
        return {
            id: options.id || '',
            x: options.x || '',
            y: options.y || '',
            w: options.w || '',
            h: options.h || '',
            image: options.image || enemiespic1
        }
    }

 //definiendo las posiciones iniciales de los enemigos
    var enemies = [
                   new enemigo({id: "enemigo1", x: 100, y: -20, w: 50, h: 30 }),
                   new enemigo({id: "enemigo2", x: 225, y: -20, w: 50, h: 30 }),
                   new enemigo({id: "enemigo3", x: 350, y: -20, w: 80, h: 30 }),
                   new enemigo({id: "enemigo4", x:100,  y:-70,  w:80,  h: 30}),
                   new enemigo({id: "enemigo5", x:225,  y:-70,  w:50,  h: 30}),
                   new enemigo({id: "enemigo6", x:350,  y:-70,  w:50,  h: 30}),
                   new enemigo({id: "enemigo7", x:475,  y:-70,  w:50,  h: 30}),
                   new enemigo({id: "enemigo8", x:600,  y:-70,  w:80,  h: 30}),
                   new enemigo({id: "enemigo9", x:475,  y:-20,  w:50,  h: 30}),
                   new enemigo({id: "enemigo10",x: 600, y: -20, w: 50, h: 30}),
                   new enemigo({ id: "enemigo11", x: 100, y: -220, w: 50, h: 30, image: enemiespic2 }),
                   new enemigo({ id: "enemigo12", x: 225, y: -220, w: 50, h: 30, image: enemiespic2 }),
                   new enemigo({ id: "enemigo13", x: 350, y: -220, w: 80, h: 50, image: enemiespic2 }),
                   new enemigo({ id: "enemigo14", x: 100, y: -270, w: 80, h: 50, image: enemiespic2 }),
                   new enemigo({ id: "enemigo15", x: 225, y: -270, w: 50, h: 30, image: enemiespic2 }),
                   new enemigo({ id: "enemigo16", x: 350, y: -270, w: 50, h: 30, image: enemiespic2 }),
                   new enemigo({ id: "enemigo17", x: 475, y: -270, w: 50, h: 30, image: enemiespic2 }),
                   new enemigo({ id: "enemigo18", x: 600, y: -270, w: 80, h: 50, image: enemiespic2 }),
                   new enemigo({ id: "enemigo19", x: 475, y: -200, w: 50, h: 30, image: enemiespic2 }),
                   new enemigo({ id: "enemigo20", x: 600, y: -200, w: 50, h: 30, image: enemiespic2 })
                  ];
//Lista y arreglo de enemigos a mostrar 
    var renderEnemies = function (enemigoList) {
        for (var i = 0; i < enemigoList.length; i++) {
            console.log(enemigoList[i]);
            ctx.drawImage(enemigoList[i].image, enemigoList[i].x, enemigoList[i].y += .5, enemigoList[i].w, enemigoList[i].h);
           
            launcher.hitDetectLowerLevel(enemigoList[i]);
        }
    }

    function Launcher(){
        this.y = 500, 
        this.x = cW*.5-25, 
        this.w = 100, 
        this.h = 100,   
        this.direccion, 
        this.bg="white", 
        this.misiles = [];


         this.gameStatus = {
            over: false, 
            message: "",
            fillStyle: 'red',
            font: 'italic bold 36px Arial, sans-serif',
        }
//Funcion que muestra y mueve nuestras imagenes aumentando y disminuyendo los valores en x & y de los elementos
        this.render = function () {
            if(this.direccion === 'left'){
                this.x-=5;
            } else if(this.direccion === 'right'){
                this.x+=5;
            }else if(this.direccion === "downArrow"){
                this.y+=5;
            }else if(this.direccion === "upArrow"){
                this.y-=5;
            }
            ctx.fillStyle = this.bg;
            ctx.drawImage(backgroundImage, 10, 10); 
            ctx.drawImage(naveImage,this.x,this.y, 100, 90); 

            for(var i=0; i < this.misiles.length; i++){
                var m = this.misiles[i];
                //Direccion del disparo
                ctx.fillRect(m.x, m.y-=5, m.w, m.h); 
                this.hitDetect(this.misiles[i],i);
                if(m.y <= 0){ 
                    this.misiles.splice(i,1); 
                }
            }
          
            if (enemies.length === 0) {
                clearInterval(animateInterval); 
                ctx.fillStyle = 'yellow';
                ctx.font = this.gameStatus.font;
                ctx.fillText('Te los hechaste!!!', cW * .5 - 80, 50);
            }
        }
        
        
       //Funcion que compara la posicion de la bala con la posicion del enemigo y lo elimina
        this.hitDetect = function (m, mi) {
            console.log('crush');
            for (var i = 0; i < enemies.length; i++) {
                var e = enemies[i];
                if(m.x+m.w >= e.x && 
                   m.x <= e.x+e.w && 
                   m.y >= e.y && 
                   m.y <= e.y+e.h){
                    this.misiles.splice(this.misiles[mi],1); 
                    enemies.splice(i, 1); 
                    document.querySelector('.barra').innerHTML = "Destruiste al "+ e.id+ " ";
                }
            }
        }
       
        
        //Funcion que detecta si los enemigos atravesaron la barrera y actualiza el estatus del juego.
        this.hitDetectLowerLevel = function(enemigo){
           
            if(enemigo.y > 550){
                this.gameStatus.over = true;
                this.gameStatus.message = 'Te penetraron :(';
            }
           
            if(enemigo.id === 'enemigo3'){
              
                console.log(this.x);
            } 
            //Funcion que detecta si se estrellaron con nosotros y actualiza el estatus del juego.
            if ((enemigo.y < this.y + 25 && enemigo.y > this.y - 25) &&
                (enemigo.x < this.x + 45 && enemigo.x > this.x - 45)) { 
                    this.gameStatus.over = true;
                    this.gameStatus.message = 'Moriste'
                }

            if(this.gameStatus.over === true){  
                clearInterval(animateInterval); 
                ctx.fillStyle = this.gameStatus.fillStyle; 
                ctx.font = this.gameStatus.font;
               
                ctx.fillText(this.gameStatus.message, cW * .5 - 80, 50); 
            }
        }
    }
    
    var launcher = new Launcher();
    function animate(){
        ctx.clearRect(0, 0, cW, cH);
        launcher.render();
        renderEnemies(enemies);
    }
    
    //Frecuencia de acturalizacion de la animacion (6)
    var animateInterval = setInterval(animate, 6);
    
    var left_btn  = document.getElementById('left_btn');
    var right_btn = document.getElementById('right_btn');
    var fire_btn  = document.getElementById('fire_btn'); 

    
    //Funciones que actualizan valores de las coordenaddas para el movimiento
   document.addEventListener('keydown', function(event) {
        if(event.keyCode == 37)
        {
         launcher.direccion = 'left';  
            if(launcher.x < cW*.2-130){
                launcher.x+=0;
                launcher.direccion = '';
            }
       }    
    });

    document.addEventListener('keyup', function(event) {
        if(event.keyCode == 37)
        {
         launcher.x+=0;
         launcher.direccion = '';
        }
    }); 

    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 39) 
        {
         launcher.direccion = 'right';
         if(launcher.x > cW-110){
            launcher.x-=0;
            launcher.direccion = '';
         }
        
        }
    });

    document.addEventListener('keyup', function(event) {
        if(event.keyCode == 39) 
        {
         launcher.x-=0;   
         launcher.direccion = '';
        }
    }); 

    document.addEventListener('keydown', function(event){
         if(event.keyCode == 38) 
         {
           launcher.direccion = 'upArrow';  
           if(launcher.y < cH*.2-80){
              launcher.y += 0;
              launcher.direccion = '';
            }
         }
    });

    document.addEventListener('keyup', function(event){
         if(event.keyCode == 38) 
         {
           launcher.y -= 0;
           launcher.direccion = '';
         }
    });

    document.addEventListener('keydown', function(event){
         if(event.keyCode == 40)
         {
           launcher.direccion = 'downArrow';  
          if(launcher.y > cH - 110){
            launcher.y -= 0;
            launcher.direccion = '';
           }
         }
    });
    document.addEventListener('keyup', function(event){
         if(event.keyCode == 40)
         {
           launcher.y += 0;
           launcher.direccion = '';
         }
    });

    document.addEventListener('keydown', function(event){
         if(event.keyCode == 80) //
         {
          location.reload();
         }
    });

    // Controles de los botones en pantalla
    left_btn.addEventListener('mousedown', function(event) {
        launcher.direccion = 'left';
    });

    left_btn.addEventListener('mouseup', function(event) {
        launcher.direccion = '';
    });

    right_btn.addEventListener('mousedown', function(event) {
        launcher.direccion = 'right';
    });

    right_btn.addEventListener('mouseup', function(event) {
        launcher.direccion = '';
    });
    fire_btn.addEventListener('mousedown', function(event) {
        launcher.misiles.push({x: launcher.x + launcher.w*.5, y: launcher.y, w: 3, h: 10});
    });
 //Funcion para diparar con la barra espaciadora con el cod 32
    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 32) {
           launcher.misiles.push({x: launcher.x + launcher.w*.5, y: launcher.y, w: 3,h: 10});
        }
    });
}

window.addEventListener('load', function(event) {
    initCanvas();
});

