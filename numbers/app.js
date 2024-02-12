'use strict';

(function() {
  function createPanel(game) {
    const el = document.createElement('li');
    el.classList.add('pressed');
    el.addEventListener('click', function() {
      check(game, el);
    });

    function getEl() {
      return el;
    }

    function activate(num) {
      el.classList.remove('pressed');
      el.textContent = num;
    }

    function check(game, el) {
      if (game.getCurrentNum() === parseInt(el.textContent, 10)) {
        el.classList.add('pressed');
        game.addCurrentNum();

        if (game.getCurrentNum() === game.getLevel() ** 2) {
          clearTimeout(game.getTimeoutId());
        }
      }
    }

    return { getEl, activate };
  }

  function createBoard(game) {
    const panels = [];
    for (let i = 0; i < game.getLevel() ** 2; i++) {
      panels.push(createPanel(game));
    }

    function setup() {
      const board = document.getElementById('board');
      panels.forEach(panel => {
        board.appendChild(panel.getEl());
      });
    }

    function activate() {
      const nums = [];
      for (let i = 0; i < game.getLevel() ** 2; i++) {
        nums.push(i);
      }

      panels.forEach(panel => {
        const num = nums.splice(Math.floor(Math.random() * nums.length), 1)[0];
        panel.activate(num);
      });
    }

    setup();

    return { activate };
  }

  function createGame(level) {
    const game = {
      level,
      currentNum: undefined,
      startTime: undefined,
      timeoutId: undefined,
      board: undefined,
      getCurrentNum: function() {
        return this.currentNum;
      },
      addCurrentNum: function() {
        this.currentNum++;
      },
      getTimeoutId: function() {
        return this.timeoutId;
      },
      getLevel: function() {
        return this.level;
      },
      setup: function() {
        const container = document.getElementById('container');
        const PANEL_WIDTH = 50;
        const BOARD_PADDING = 10;
        container.style.width = PANEL_WIDTH * this.level + BOARD_PADDING * 2 + 'px';
      },
      start: function() {
        if (typeof this.timeoutId !== 'undefined') {
          clearTimeout(this.timeoutId);
        }

        this.currentNum = 0;
        this.board.activate();

        this.startTime = Date.now();
        this.runTimer();
      },
      runTimer: function() {
        const timer = document.getElementById('timer');
        timer.textContent = ((Date.now() - this.startTime) / 1000).toFixed(2);

        this.timeoutId = setTimeout(() => {
          this.runTimer();
        }, 10);
      }
    };

    game.board = createBoard(game);

    const btn = document.getElementById('btn');
    btn.addEventListener('click', () => {
      game.start();
    });

    game.setup();

    return game;
  }

  createGame(5);
})();
