// Inimigos que nosso jogador deve evitar
class Enemy {
    constructor(y) {
        this.x = -50;
        this.y = y;
        this.sprite = 'images/enemy-bug.png';   
    }
    collision() {
        return ((this.x + 80 > player.x
            && this.x + 80 < player.x + 101
            || this.x >= player.x
            && this.x < player.x + 80))
            && this.y === player.y;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    update(dt) {
        if (this.collision()) {
            alert('Você foi pego! Aperte enter para reiniciar o jogo!');
            reset();
        } else {
            const speed = Math.floor(Math.random() * (300 - 100)) + 100;
            return this.x += (speed*dt);
        }
    }
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
    reset() {
        this.x = 200;
        this.y = 440;
    }
    update(dt) {
        if (this.y === -40) {
            alert('Você venceu! Aperte enter para jogar novamente!');
            reset();
        } else{
            const speed = Math.floor(Math.random() * (100 - 50)) + 50;
            return speed;
        }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
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

const reset = function() {
    player.reset();
    allEnemies = [];
};

// Represente seus objetos como instâncias.
// Coloque todos os objetos inimgos numa array allEnemies
// Coloque o objeto do jogador numa variável chamada jogador.

let allEnemies = [];

let callEnemies = function() {
    setInterval(function() {
        const num = [40,120,200];
        let newEnemy = allEnemies.push(new Enemy(num[Math.floor(Math.random()*3)]));
    },800);    
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