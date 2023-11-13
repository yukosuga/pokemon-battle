import readline from "readline-sync";
import chalk from "chalk";

// Class 1 / Attack Skill Information
class AttackSkill {
  constructor(attack, damage, magic) {
    this.attack = attack;
    this.damage = damage;
    this.magic = magic;
  }
}

// Class 2 / Pokémon Details
class Pokemon {
  constructor(name, health, magic, attacks) {
    this.name = name;
    this.health = health;
    this.magic = magic;
    this.attacks = attacks;
  }

  isAlive() {
    return this.health > 0; // Check if the Pokémon is alive based on its health
  }

  // Function for attack
  attack(opponent, selectedAttack) {
    if (this.isAlive() && opponent.isAlive()) {
      // Check if both the entities are alive
      const pointOfDamage = selectedAttack.damage;
      const pointOfMagic = selectedAttack.magic;

      // Check if the entity has enough magic points for the selected attack
      if (this.magic >= pointOfMagic) {
        this.magic -= pointOfMagic;
        opponent.health -= pointOfDamage;

        // Display attack information
        console.log(
          chalk.whiteBright(
            `\n${this.name} attacked ${opponent.name} with ${selectedAttack.attack} for ${pointOfDamage} damage💥\n`
          )
        );
      } else {
        // Display a message if the entity doesn't have enough magic for the selected attack
        console.log(
          chalk.whiteBright(
            `\n${this.name} doesn't have enough magic to use ${selectedAttack.attack}.`
          )
        );

        // Recharge the entity's magic with a random number between 1 and 20
        const getMagic = () => {
          const magicByRandomNumber = Math.floor(Math.random() * 20) + 1;
          this.magic += magicByRandomNumber;
          return magicByRandomNumber;
        };

        // Display the amount of recharged magic
        const extraMagic = getMagic();
        console.log(
          chalk.whiteBright(
            `Instead ${this.name} recharges ${extraMagic} points of magic🔥\n`
          )
        );
      }
    }
  }

  // Function to display the status
  showStatus() {
    return chalk.magentaBright(
      `🔹${this.name} - Health: ${this.health} / Magic: ${this.magic}`
    );
  }
}

// Character / Pokémon 1
const pikachu = new Pokemon("Pikachu", 100, 80, [
  new AttackSkill("Thunderbolt", 40, 30),
  new AttackSkill("Quick Attack", 20, 10),
  new AttackSkill("Iron Tail", 30, 20),
]);

// Character / Pokémon 2
const mewtwo = new Pokemon("Mewtwo", 100, 75, [
  new AttackSkill("Psystrike", 50, 30),
  new AttackSkill("Shadow Ball", 40, 20),
  new AttackSkill("Aura Sphere", 20, 50),
]);

// Character / Pokémon 3
const charizard = new Pokemon("Charizard", 100, 60, [
  new AttackSkill("Fire Spin", 35, 25),
  new AttackSkill("Dragon Claw", 30, 15),
  new AttackSkill("Blast Burn", 25, 20),
]);

// Character / Pokémon 4
const dragonite = new Pokemon("Dragonite", 100, 70, [
  new AttackSkill("Dragon Tail", 40, 30),
  new AttackSkill("Steel Wing", 35, 25),
  new AttackSkill("Outrage", 30, 20),
]);

// Character / Pokémon 5
const snorlax = new Pokemon("Snorlax", 100, 70, [
  new AttackSkill("Hyper Beam", 25, 15),
  new AttackSkill("Lick", 45, 30),
  new AttackSkill("Zen Headbutt", 35, 10),
]);

// Character / Pokémon 6
const rayquaza = new Pokemon("Rayquaza", 100, 70, [
  new AttackSkill("Dragon Tail", 25, 15),
  new AttackSkill("Breaking Swipe", 45, 30),
  new AttackSkill("Dragon Ascent", 35, 10),
]);

// Available Pokémon Players
const players = [mewtwo, charizard, dragonite, snorlax, rayquaza];

// Function for a selected attack of the player
const selectedAttackByPlayer = (player) => {
  console.log(chalk.whiteBright(`\n🔥Choose an attack for ${player.name}:`));

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
  return player.attacks[attackIndex];
};

// Function for a random attack of the opponent
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
      `🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻`
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
🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺\n`);
    console.log(
      chalk.whiteBright(
        `Get ready to choose your attacks and battle against ` +
          chalk.yellow(`Pikachu💥\n`)
      )
    );
  }

  // Function for a selected character of the player
  const selectedCharacter = (players) => {
    console.log(chalk.whiteBright(`\n🔥Choose your character:`));
    const playerIndex = readline.keyInSelect(
      players.map((player) => chalk.cyan(player.name)),
      chalk.bgWhiteBright.redBright.italic(
        "Choose a character and enter the number: "
      ),
      {cancel: false}
    );
    return players[playerIndex];
  };

  // Select a character for the player
  const player = selectedCharacter(players);
  player.health = 100; // Set the player's health to 100
  
  const opponent = pikachu; // Set the default opponent

  readline.question(
    chalk.bgWhiteBright.redBright.italic(
      "\nPress enter to start a battle💥💥💥"
    )
  );

  while (player.isAlive() && opponent.isAlive()) {
    const playerAttack = selectedAttackByPlayer(player);
    const computerAttack = randomAttackByComputer(opponent);

    player.attack(opponent, playerAttack); // Player attacks the opponent
    opponent.attack(player, computerAttack); // Opponent randomly attacks the player by the computer

    console.log(player.showStatus()); // Display player's status
    console.log(opponent.showStatus()); // Display opponent's status

    if (!opponent.isAlive()) {
      console.log(chalk.bold.yellowBright(`You won!🔥🔥🔥`));
    }

    if (!player.isAlive()) {
      console.log(chalk.blueBright(`You lost...😭😭😭`));
    }
  }

  playAgain = readline.keyInYN(chalk.redBright("\nDo you want to play again?"));
  if (playAgain) {
    opponent.health = 100; // Recharge opponent's health to 100 for the next battle
    console.log("Recharging you to 100 health💥");
    console.clear();
  } else {
    console.log(chalk.whiteBright("\nIt was fun! See you next time👋\n"));
  }
} while (playAgain);