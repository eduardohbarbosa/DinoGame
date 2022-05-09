const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const play = document.querySelector('.play');
let position = 0;
let isJump = false;

function jump(){
    isJump = true;
    let upInterval = setInterval(() => {
    if(position >= 150){
        clearInterval(upInterval);
        let downInterval = setInterval(() => {
            if(position <= 0){
                clearInterval(downInterval)
                isJump = false;
            }else{
                position -= 20;
                dino.style.bottom = `${position}px`;
            }
        }, 30)
    }else{
        position += 20;
        dino.style.bottom = `${position}px`;
    }
    },30)
}

function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1000;

    let radomTime = Math.random() * 6000;
    let leftInterval = setInterval(() => {
        cactus.classList.add('cactus');
        cactus.style.left = `${1000}px`;
        background.appendChild(cactus);
        if(cactusPosition < -60){
            clearInterval(leftInterval);
            background.removeChild(cactus);
        }else if(cactusPosition > 0 && cactusPosition < 60 && position < 60){//Colisão
            clearInterval(leftInterval);
            gameOver();
        }else{
            cactusPosition -= 10;
            cactus.style.left = `${cactusPosition}px`;
        }
    },30)

    setTimeout(createCactus, radomTime);
}

function gameOver(){
    location.reload();
}

play.addEventListener('click', () =>{
    play.style.display = 'none';
    background.style.animation = 'slideright 600s infinite linear';
    document.addEventListener('keyup', (event) => {
        if(event.key === ' '){
            if(!isJump){
                jump();
            }
        }
    })
    createCactus();
})