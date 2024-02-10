'use strict';
// 厳格モードを使用し、JavaScriptコードの安全な記述を強制

console.clear();
// コンソールをクリアし、前の実行結果を削除

class Calendar {
  // Calendarクラスを定義

  constructor() {
    // コンストラクタでカレンダーの初期状態を設定
    this.today = new Date(); // 今日の日付を取得
    this.year = this.today.getFullYear(); // 現在の年を取得
    this.month = this.today.getMonth(); // 現在の月を取得
    this.init(); // イニシャライザを呼び出し、カレンダーを初期化
  }

  getCalendarHead() {
    // カレンダーの先頭部分（前月の末尾の日）を取得
    const dates = [];
    const d = new Date(this.year, this.month, 0).getDate();
    const n = new Date(this.year, this.month, 1).getDay();

    for (let i = 0; i < n; i++) {
      dates.unshift({
        date: d - i,
        isToday: false,
        isDisabled: true,
      });
    }

    return dates;
  }

  getCalendarBody() {
    // 現在の月の日付を取得
    const dates = [];
    const lastDate = new Date(this.year, this.month + 1, 0).getDate();

    for (let i = 1; i <= lastDate; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: false,
      });
    }

    if (this.year === this.today.getFullYear() && this.month === this.today.getMonth()) {
      dates[this.today.getDate() - 1].isToday = true; // 今日の日付を特定
    }

    return dates;
  }

  getCalendarTail() {
    // カレンダーの末尾部分（次月の始まりの日）を取得
    const dates = [];
    const lastDay = new Date(this.year, this.month + 1, 0).getDay();

    for (let i = 1; i < 7 - lastDay; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: true,
      });
    }

    return dates;
  }

  clearCalendar() {
    // カレンダーをクリア
    const tbody = document.querySelector('tbody');
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  }

  renderTitle() {
    // カレンダーのタイトル（年月）を描画
    const title = `${this.year}/${String(this.month + 1).padStart(2, '0')}`;
    document.getElementById('title').textContent = title;
  }

  renderWeeks() {
    // 週ごとの日付を描画
    const dates = [...this.getCalendarHead(), ...this.getCalendarBody(), ...this.getCalendarTail()];
    const weeks = [];
    const weeksCount = dates.length / 7;

    for (let i = 0; i < weeksCount; i++) {
      weeks.push(dates.splice(0, 7));
    }

    weeks.forEach(week => {
      const tr = document.createElement('tr');
      week.forEach(date => {
        const td = document.createElement('td');
        td.textContent = date.date;
        if (date.isToday) {
          td.classList.add('today'); // 今日の日付にスタイルを適用
        }
        if (date.isDisabled) {
          td.classList.add('disabled'); // 非アクティブな日付にスタイルを適用
        }
        tr.appendChild(td);
      });
      document.querySelector('tbody').appendChild(tr);
    });
  }

  createCalendar() {
    // カレンダーを作成
    this.clearCalendar(); // カレンダーをクリア
    this.renderTitle(); // タイトルを描画
    this.renderWeeks(); // 週を描画
  }

  addEventListeners() {
    // イベントリスナーを追加
    document.getElementById('prev').addEventListener('click', () => {
      this.month--;
      if (this.month < 0) {
        this.year--;
        this.month = 11;
      }
      this.createCalendar(); // 前の月のカレンダーを表示
    });

    document.getElementById('next').addEventListener('click', () => {
      this.month++;
      if (this.month > 11) {
        this.year++;
        this.month = 0;
      }
      this.createCalendar(); // 次の月のカレンダーを表示
    });

    document.getElementById('today').addEventListener('click', () => {
      this.year = this.today.getFullYear();
      this.month = this.today.getMonth();
      this.createCalendar(); // 今日の日付に基づくカレンダーを表示
    });
  }

  init() {
    // イニシャライザでイベントリスナーを設定し、カレンダーを初期表示
    this.addEventListeners();
    this.createCalendar();
  }
}

// Calendarクラスのインスタンスを作成し、カレンダー機能を初期化
new Calendar();
