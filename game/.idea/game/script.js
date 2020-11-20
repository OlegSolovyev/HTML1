function GameObject(imgUrl) {
    this.x=0;
    this.y=0;
    this.ready=false;
    this.image=new Image();
    this.image.onload = () => this.ready =true;
    if (imgUrl){
        this.image.src = imgUrl;
    }
}

GameObject.prototype.render = function (ctx) {
    if (this.ready) {
        ctx.drawImage(this.image, this.x, this.y);
    }
}


const background = new GameObject('images/background.png');
const hero = new GameObject('images/hero.png');
const monster = new GameObject('images/monster.png')

const canvas = document.createElement('canvas');
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas)


hero.x=canvas.width/2;
hero.y=canvas.height/2;
hero.speed = 1;

monster.x=monster.image.width +(Math.random() * (canvas.width-(monster.image.width*3)));
monster.y=monster.image.height +(Math.random() * (canvas.height-(monster.image.height*3)));

const ctx = canvas.getContext('2d');

ctx.drawImage(background.image,0,0);

window.addEventListener('keydown', (event) => {
    console.log(event)
    if (event.key == "w" ){
        moveUp();
    }
    if (event.key == "s" ){
        moveDown();
    }
    if (event.key == "a" ){
        moveLeft();
    }
    if (event.key == "d" ){
        moveRight();
    }
    if (event.code == "ControlLeft" ){
        speedUp();
    }
    if (event.code == "ControlRight" ){
        speedDown();
    }
});

window.addEventListener('keyup', (event) => {
    console.log(event);
});

const moveUp = function (){
    hero.y -= hero.speed;
}

const moveDown = function (){
    hero.y += hero.speed;
}

const moveLeft = function (){
    hero.x -= hero.speed;
}

const moveRight = function (){
    hero.x += hero.speed;
}

const speedUp = function (){
    hero.speed += 1;
}

const speedDown = function (){
    if (this.speed>1) {
        hero.speed -= 1;
    }
}



const gameCycle = function (){
    background.render(ctx);
    hero.render(ctx);
    monster.render(ctx);
    window.requestAnimationFrame(gameCycle)
};

window.requestAnimationFrame(gameCycle);

// setTimeout(() => {
//     background.render(ctx);
//     hero.render(ctx);
//     monster.render(ctx);
// }, 1500)


