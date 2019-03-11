// Super Classe com dados comuns em Enemy e Player
class GameElements {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Classe Enemy usada para criar os inimigos do jogo e suas funções
class Enemy extends GameElements {
    //Método construtor com as informações basicas do objeto
    constructor(x,y) {
        super(x,y)
        this.sprite = 'images/enemy-bug.png';   
    }
    //Verifica se houve a colisão entre jogador e inimigo
    collision() {
        return ((this.x + 80 > player.x
            && this.x + 80 < player.x + 101
            || this.x >= player.x
            && this.x < player.x + 80))
            && this.y === player.y;
    }
    //Atualiza o jogo e avisa caso ocorra a colisão
    update(dt) { 
        if (this.collision()) {
            alert('Você foi pego! Aperte enter para reiniciar o jogo!');
            player.reset();
        } else {
            const speed = Math.floor(Math.random() * (300 - 100)) + 100;
            return this.x += (speed*dt);
        }
    }
};

// Classe Player usada para criar o jogador e suas funções
class Player extends GameElements { //
    //Método construtor com as informações basicas do objeto
    constructor(x,y) {
        super(x,y);
        this.sprite = 'images/char-boy.png';
    }
    //Reinicia o jogo em caso de vitória ou derrota
    reset() {
        this.x = 200;
        this.y = 440;
        allEnemies = [];
    }
    //Atualiza o jogo e avisa caso o jogador consiga chegar no rio e vencer
    update(dt) {
        if (this.y === -40) {
            alert('Você venceu! Aperte enter para jogar novamente!');
            this.reset();
        } else{
            const speed = Math.floor(Math.random() * (100 - 50)) + 50;
            return speed;
        }
    }
};

//Identifica quando há movimentação no jogo e limita o espaço em que o jogador pode andar
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
// Coloque o objeto do jogador numa variável chamada player.
let player = new Player(200,440);
let allEnemies = [];

let callEnemies = function() {
    setInterval(function() {
        const num = [40,120,200];
        let newEnemy = allEnemies.push(new Enemy(-50,num[Math.floor(Math.random()*3)]));
    },800);    
};
callEnemies();

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