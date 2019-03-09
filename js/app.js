// Inimigos que nosso jogador deve evitar
class Enemy {
    constructor(y) {
        this.x = -50;
        this.y = y;
        this.sprite = 'images/enemy-bug.png';   
    }
    // As variáveis aplicadas a nossas instâncias entram aqui.
    // Fornecemos uma a você para que possa começcar.

    // A imagem/sprite de nossos inimigos, isso usa um
    // ajudante que é fornecido para carregar imagens
    // com facilidade.
};

// Atualize a posição do inimigo, método exigido pelo jogo
// Parâmetro: dt, um delta de tempo entre ticks
Enemy.prototype.update = function(dt) {
    const speed = Math.floor(Math.random() * (100 - 50)) + 50;
    return this.x += (speed*dt);
    // Você deve multiplicar qualquer movimento pelo parâmetro
    // dt, o que garantirá que o jogo rode na mesma velocidade
    // em qualquer computador.
};

// Desenhe o inimigo na tela, método exigido pelo jogo
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Agora, escreva sua própria classe de jogador
// Esta classe exige um método update(), 
// um render() e um handleInput().
class Player {
    constructor() {
        this.x = 200;
        this.y = 440;
        this.sprite = 'images/char-boy.png';
    }
};

Player.prototype.update = function(dt) {
    const speed = Math.floor(Math.random() * (100 - 50)) + 50;
    return speed;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
  switch(key) {
    case 'left':
        if (this.x !== 0) {
            this.x -= 100;
        };
        break;
    case 'up':
        if (this.y != -40) {
            this.y -= 80;
        }
        break;
    case 'right':
        if (this.x !== 400) {
            this.x += 100;
        };
        break;
    case 'down':
        if (this.y != 440) {
            this.y += 80;
        }
        break;
  }
};


// Represente seus objetos como instâncias.
// Coloque todos os objetos inimgos numa array allEnemies
// Coloque o objeto do jogador numa variável chamada jogador.

let allEnemies = [];

let callEnemies = function() {
    setInterval(function() {
        const num = [40,120,200];
        let newEnemy = allEnemies.push(new Enemy(num[Math.floor(Math.random()*3)]));
    },2000);    
};
callEnemies();

let player = new Player();

// Isto reconhece cliques em teclas e envia as chaves para seu
// jogador. método handleInput(). Não é preciso mudar nada.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

Player.prototype.checkCollisions = function() {
        let playerX = this.offsetLeft; //capturando a posição em x
        let playerY = this.offsetTop; //capturando a posição em y
        let playerW = this.offsetWidth; //capturando a largura
        let playerH = this.offsetHeight; //capturando a altura

        let enemyX = Enemy.offsetLeft; //capturando a posição em x
        let enemyY = Enemy.offsetTop; //capturando a posição em y
        let enemyW = Enemy.offsetWidth; //capturando a largura
        let enemyH = Enemy.offsetHeight; //capturando a altura

        let collisionX = (playerX + playerW >= enemyX) && (enemyX + enemyW >= playerX);
        let collisionY = (playerY + playerH >= enemyY) && (enemyY + enemyH >= playerY);
        if (collisionY && collisionX) {
            alert("You Loose!");
        };
};