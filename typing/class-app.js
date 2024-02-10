'use strict';

class TypingGame {
  constructor(targetElement, resultElement) {
    this.words = ['red', 'blue', 'pink'];
    this.word = '';
    this.loc = 0;
    this.startTime = null;
    this.isPlaying = false;
    this.target = targetElement;
    this.result = resultElement;

    this.registerEvents();
  }

  setWord() {
    this.word = this.words.splice(Math.floor(Math.random() * this.words.length), 1)[0];
    this.target.textContent = this.word;
    this.loc = 0;
  }

  startGame() {
    if (this.isPlaying) {
      return;
    }

    this.isPlaying = true;
    this.startTime = Date.now();
    this.setWord();
  }

  processKeydown(key) {
    if (key !== this.word[this.loc]) {
      return;
    }

    this.loc++;
    this.target.textContent = '_'.repeat(this.loc) + this.word.substring(this.loc);

    if (this.loc === this.word.length) {
      if (this.words.length === 0) {
        const elapsedTime = ((Date.now() - this.startTime) / 1000).toFixed(2);
        this.result.textContent = `Finished! ${elapsedTime} seconds!`;
        this.isPlaying = false; // Reset the game state
        return;
      }

      this.setWord();
    }
  }

  registerEvents() {
    document.addEventListener('click', () => this.startGame());

    document.addEventListener('keydown', e => this.processKeydown(e.key));
  }
}

// DOM要素を取得し、TypingGameクラスのインスタンスを作成
const targetElement = document.getElementById('target');
const resultElement = document.getElementById('result');

new TypingGame(targetElement, resultElement);
