function getRandomValue(max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      roundCount: 0,
      monsterHealth: 100,
      playerHealth: 100,
      winner: null,
    };
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    disabledBtn() {
      return this.roundCount % 3 !== 0;
    },
  },
  methods: {
    restartGame() {
      this.winner = null;
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.roundCount = 0;
    },
    attackMonster() {
      this.roundCount++;
      const attackValue = getRandomValue(12, 5);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(15, 8);
      this.playerHealth -= attackValue;
    },
    specialAttackMonster() {
      this.roundCount++;
      const specialAttackValue = getRandomValue(25, 10);
      this.monsterHealth -= specialAttackValue;
      this.attackPlayer();
    },
    healPlayer() {
      this.roundCount++;
      const healValue = getRandomValue(20, 8);
      if (healValue + this.playerHealth > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.attackPlayer();
    },
    surrender() {
      this.winner = "monster";
    },
  },
});

app.mount("#game-block");
