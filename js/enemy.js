class Enemy {
    constructor(name, difficulty, vulnerability, attack, health, agility) {
        this.name = name;
        this.difficulty = difficulty;
        this.vulnerability = vulnerability;
        this.attack = attack;
        this.health = health;
        this.agility = agility;
    }

};


const greatSpider = new Enemy('Great Spider', 'easy', 'Sam', 230, 4100, 17);
const orc = new Enemy('Orc', 'easy', 'Gimli', 250, 4000, 12);
const warg = new Enemy('Warg', 'easy', 'Gimli', 240, 4040, 22);
const gollum = new Enemy('Gollum', 'easy', 'Sam', 220, 4260, 15);
const orcLeader = new Enemy('Orc Leader', 'medium', 'Gimli', 330, 4420, 13);
const nazgul = new Enemy('Nazgul', 'medium', 'Aragorn', 370, 4540, 20);
const shelob = new Enemy('Shelob', 'medium', 'Sam', 310, 4580, 19);
const troll = new Enemy('Troll', 'medium', 'Legolas', 380, 4620, 8);
const oliphant = new Enemy('Oliphant', 'medium', 'Legolas', 360, 4700, 9);
const saruman = new Enemy('Saruman', 'hard', 'Gandalf', 350, 5340, 12);
const balrog = new Enemy('Balrog', 'hard', 'Gandalf', 490, 5040, 8);
const kingOfTheDead = new Enemy('King of the Dead', 'hard', 'Aragorn', 370, 5440, 15);
const sauron = new Enemy('Sauron', 'hard', 'Frodo', 360, 5750, 10);

const easyEnemies = [greatSpider, orc, warg, gollum];
const mediumEnemies = [orcLeader, nazgul, shelob, troll, oliphant];
const hardEnemies = [saruman, balrog, kingOfTheDead, sauron];



function enemyAttack() {

    let basicDamage = gameManager.activeEnemy.attack;

    let offsetDamage = gameManager.getRandomNumber(30, 140);

    basicDamage += offsetDamage;

    if (gameManager.activeCharacter.skills.skill2.name==='You Shall Not Pass') {
        if (gameManager.activeEnemy.name==='Balrog') {
            if (gameManager.getRandomNumber(1, 100) <= gameManager.activeCharacter.skills.skill2.probability2) {
                basicDamage = gameManager.activeCharacter.skills.skill2.damage;
            }
        } else {
            if (gameManager.getRandomNumber(1, 100) <= gameManager.activeCharacter.skills.skill2.probability1) {
                basicDamage = gameManager.activeCharacter.skills.skill2.damage;
            }
        }
    };

    gameManager.activeCharacter.health -= basicDamage;

    gameManager.opponentInfoAttack.innerHTML = '<p>Enemy caused you ' + basicDamage + ' damage.</p>';

    gameManager.renderPlayerStats();

    if (gameManager.activeCharacter.health <= 0) {

        if (gameManager.activeRune.name === 'Earth' && gameManager.activeRune.status === 'active') {
            gameManager.activeCharacter.health = gameManager.activeRune.stats.health;
            gameManager.renderPlayerStats();
            gameManager.opponentInfoAttack.innerHTML = '<p>Earth rune ressurected you and you continue with ' + gameManager.activeCharacter.health + ' health.</p>';
            gameManager.activeRune.status = 'passive';
            gameManager.renderPassiveRuneStats();
            return;
        }

        if (gameManager.activeCharacter.skills.skill2.name==='Mithril shirt') {
            if (gameManager.getRandomNumber(1, 100) <= gameManager.activeCharacter.skills.skill2.probability) {
                gameManager.activeCharacter.health = gameManager.activeCharacter.skills.skill2.health;
                gameManager.renderPlayerStats();
                gameManager.opponentInfoAttack.innerHTML = '<p>You ressurected and continue with ' + gameManager.activeCharacter.health + ' health.</p>';
                return;
            }
        }
        if (gameManager.activeCharacter.skills.skill2.name==='Deal with the Dead') {
            if (gameManager.activeEnemy.name==='King of the Dead') {
                if (gameManager.getRandomNumber(1, 100) <= gameManager.activeCharacter.skills.skill2.probability2) {
                    gameManager.activeCharacter.health = gameManager.activeCharacter.skills.skill2.health;
                    gameManager.renderPlayerStats();
                    gameManager.opponentInfoAttack.innerHTML = '<p>You ressurected and continue with ' + gameManager.activeCharacter.health + ' health.</p>';
                    return;
                }
            } else {
                if (gameManager.getRandomNumber(1, 100) <= gameManager.activeCharacter.skills.skill2.probability1) {
                    gameManager.activeCharacter.health = gameManager.activeCharacter.skills.skill2.health;
                    gameManager.renderPlayerStats();
                    gameManager.opponentInfoAttack.innerHTML = '<p>You ressurected and continue with ' + gameManager.activeCharacter.health + ' health.</p>';
                    return;
                }
            }
        }
            gameManager.activeCharacter.health = 0;
            gameManager.playerResult.innerHTML = gameManager.renderPlayerStats();
            gameManager.playerResult.setAttribute('id', 'dead');
            gameManager.opponentResult.innerHTML = gameManager.renderOpponentStats();
            gameManager.resultStats.innerHTML = '<h4>You lose in ' + gameManager.round + ' rounds.</h4>';
            gameManager.selectContent(gameManager.result);
    }

};