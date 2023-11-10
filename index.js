import readline from "readline-sync";
import chalk from "chalk";

// Class 1 for Attack Skill Information
class AttackSkill {
  constructor(attack, damage, magic) {
    this.attack = attack;
    this.damage = damage;
    this.magic = magic;
  }
}

// Class 2 for Pokemon Details
class Pokemon {
  constructor(name, health, magic, attacks) {
    this.name = name;
    this.health = health;
    this.magic = magic;
    this.attacks = attacks;
  }

  isAlive() {
    return this.health > 0;
  }

  attack(opponent, selectedAttack) {
    if (this.isAlive() && opponent.isAlive()) {
      const pointOfDamage = selectedAttack.damage;
      const pointOfMagic = selectedAttack.magic;
      if (this.magic >= pointOfMagic) {
        this.magic -= pointOfMagic;
        opponent.health -= pointOfDamage;
        console.log(
          chalk.whiteBright(
            `\n💥 ${this.name} attacked ${opponent.name} with ${selectedAttack.attack} for ${pointOfDamage} damage.\n`
          )
        );
      } else {
        console.log(
          `\n${this.name} doesn't have enough magic to use ${selectedAttack.attack}.`
        );
        const getMagic = () => {
          const magicByRandomNumber = Math.floor(Math.random() * 21);
          this.magic += magicByRandomNumber;
          return magicByRandomNumber;
        };
        const extraMagic = getMagic();
        console.log(
          `Instead ${this.name} recharges ${extraMagic} points of magic🔥\n`
        );
      }
    }
  }

  showStatus() {
    return `🔹${this.name} - Health: ${this.health} / Magic: ${this.magic}`;
  }
}

// Character 1
const pikachu = new Pokemon("Pikachu", 100, 80, [
  new AttackSkill("Thunderbolt", 40, 30),
  new AttackSkill("Quick Attack", 20, 10),
  new AttackSkill("Iron Tail", 30, 20),
]);

// Character 2
const mewtwo = new Pokemon("Mewtwo", 100, 75, [
  new AttackSkill("Psystrike", 50, 30),
  new AttackSkill("Shadow Ball", 40, 20),
  new AttackSkill("Aura Sphere", 20, 50),
]);

// Character 3
const charizard = new Pokemon("Charizard", 100, 60, [
  new AttackSkill("Fire Spin", 35, 25),
  new AttackSkill("Dragon Claw", 30, 15),
  new AttackSkill("Blast Burn", 25, 20),
]);

// Character 4
const dragonite = new Pokemon("Dragonite", 100, 70, [
  new AttackSkill("Dragon Tail", 40, 30),
  new AttackSkill("Steel Wing", 35, 25),
  new AttackSkill("Outrage", 30, 20),
]);

// Set available players
const players = [mewtwo, charizard, dragonite];

// select an attack
const selectedAttackByPlayer = (player) => {
  console.log(chalk.whiteBright(`\nChoose an attack for ${player.name}:`));

  const attackNames = player.attacks.map((attack) =>
    chalk.cyan(
      `${attack.attack} - ${attack.damage} damage / ${attack.magic} magic`
    )
  );

  const attackIndex = readline.keyInSelect(
    attackNames,
    chalk.bgWhiteBright.redBright.italic(
      "Choose an attack and enter the number: "
    ),
    {cancel: false}
  );
  console.clear();
  return player.attacks[attackIndex];
};

const randomAttackByComputer = (opponent) => {
    const randomIndex = Math.floor(Math.random() * opponent.attacks.length);
    return opponent.attacks[randomIndex];
  };
  

// Main Game
let playAgain = false;

console.clear();
do {
  if (!playAgain) {
    console.log(chalk.whiteBright(`\n🔥Welcome to Pokémon Battle Arena🔥🔥`));
    console.log(
      `🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻\n`
    );
    console.log(chalk.italic.redBright(` Rules:`));
    console.log(`
 1️⃣  Select your Pokémon to battle against Pikachu.
 2️⃣  Each Pokémon starts with 100 health.
 3️⃣  You can choose from three different attacks for each turn.
 4️⃣  Your goal is to reduce Pikachu's health to zero.
 5️⃣  Keep an eye on your magic points, as some attacks require them.
 6️⃣  If your health points reach zero, you lose.
 7️⃣  You can play as many rounds as you want, and you'll start with 100 health in each new round.
 🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺\n`);
    console.log(
      chalk.whiteBright(
        `Get ready to choose your attacks and battle against ` +
          chalk.yellow(`Pikachu💥\n`)
      )
    );
  }

// Select a character
const selectedCharacter = (players) => {
  console.log(chalk.whiteBright(`\nChoose your character:`));
  const playerIndex = readline.keyInSelect(
    players.map((player) => chalk.cyan(player.name)),
    chalk.bgWhiteBright.redBright.italic(
      "Choose a character and enter the number: "
    ),
    {cancel: false}
  );
  return players[playerIndex];
  };


const player = selectedCharacter(players)
player.health = 100

const opponent = pikachu;


  readline.question(
    chalk.bgWhiteBright.redBright.italic("Press enter to start a battle!")
  );
  
  while (player.isAlive() && opponent.isAlive()) {
    const playerAttack = selectedAttackByPlayer(player);
    const computerAttack = randomAttackByComputer(opponent);

    player.attack(opponent, playerAttack);
    if (!opponent.isAlive()) {
      console.log(chalk.bold.yellowBright(`You won!🔥🔥🔥`));
    }

    console.log(player.showStatus());
    console.log(opponent.showStatus());

    opponent.attack(player, computerAttack);
    if (!player.isAlive()) {
      console.log(chalk.blueBright(`You lost...😭😭😭`));
    }
  }

  playAgain = readline.keyInYN(
    chalk.redBright("Do you want to play again?")
  );
  if (playAgain) {
    // playerHealth = 100;
    // opponentHealth = 100;

    opponent.health = 100
    console.log("Restoring you to 100 health💥");
  } else {
    console.log("\nIt was fun! See you next time👋\n");
  }
} while (playAgain);