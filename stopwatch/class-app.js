'use strict';

class Timer {
  constructor(timerElement, startElement, stopElement, resetElement) {
    this.timer = timerElement;
    this.start = startElement;
    this.stop = stopElement;
    this.reset = resetElement;
    this.startTime = null;
    this.timeoutId = null;
    this.elapsedTime = 0;

    this.init();
  }

  countUp() {
    const d = new Date(Date.now() - this.startTime + this.elapsedTime);
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    const ms = String(d.getMilliseconds()).padStart(3, '0');
    this.timer.textContent = `${m}:${s}.${ms}`;

    this.timeoutId = setTimeout(() => {
      this.countUp();
    }, 10);
  }

  setButtonStateInitial() {
    this.start.classList.remove('inactive');
    this.stop.classList.add('inactive');
    this.reset.classList.add('inactive');
  }

  setButtonStateRunning() {
    this.start.classList.add('inactive');
    this.stop.classList.remove('inactive');
    this.reset.classList.add('inactive');
  }

  setButtonStateStopped() {
    this.start.classList.remove('inactive');
    this.stop.classList.add('inactive');
    this.reset.classList.remove('inactive');
  }

  init() {
    this.setButtonStateInitial();

    this.start.addEventListener('click', () => {
      if (this.start.classList.contains('inactive') === true) {
        return;
      }
      this.setButtonStateRunning();
      this.startTime = Date.now();
      this.countUp();
    });

    this.stop.addEventListener('click', () => {
      if (this.stop.classList.contains('inactive') === true) {
        return;
      }
      this.setButtonStateStopped();
      clearTimeout(this.timeoutId);
      this.elapsedTime += Date.now() - this.startTime;
    });

    this.reset.addEventListener('click', () => {
      if (this.reset.classList.contains('inactive') === true) {
        return;
      }
      this.setButtonStateInitial();
      this.timer.textContent = '00:00.000';
      this.elapsedTime = 0;
    });
  }
}

// DOM要素を取得し、Timerクラスのインスタンスを作成
const timerElement = document.getElementById('timer');
const startElement = document.getElementById('start');
const stopElement = document.getElementById('stop');
const resetElement = document.getElementById('reset');

new Timer(timerElement, startElement, stopElement, resetElement);
