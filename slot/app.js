function createPanel() {
    const obj = {
        img: document.createElement('img'),
        stop: document.createElement('div'),
        timeoutId: undefined
    };

    const section = document.createElement('section');
    section.classList.add('panel');

    obj.img.src = randamImg();

    obj.stop.textContent = 'STOP';
    obj.stop.classList.add('stop', 'inactive');
    obj.stop.addEventListener('click', () => {
        if (obj.stop.classList.contains('inactive')) {
            return;
        }
        obj.stop.classList.add('inactive');
        clearTimeout(obj.timeoutId);

        panelsLeft--;

        if (panelsLeft === 0) {
            spin.classList.remove('inactive');
            panelsLeft = 3;
            checkResult();
        }
    });

    section.appendChild(obj.img);
    section.appendChild(obj.stop);

    const main = document.querySelector('main');
    main.appendChild(section);

    function randamImg() {
        const imgs = [
            './image/seven.png',
            './image/bell.png',
            './image/cherry.png',
        ];
        return imgs[Math.floor(Math.random() * imgs.length)];
    }

    obj.spin = function() {
        this.img.src = randamImg();
        this.timeoutId = setTimeout(() => {
            this.spin();
        }, 50);
    }

    obj.isUnmatched = function(p1, p2) {
        return (this.img.src !== p1.img.src && this.img.src !== p2.img.src);
    }

    obj.unmatch = function() {
        this.img.classList.add('unmatched');
    }

    obj.activate = function() {
        this.img.classList.remove('unmatched');
        this.stop.classList.remove('inactive');
    }

    return obj;
}

function checkResult() {
    if (panels[0].isUnmatched(panels[1], panels[2])) {
      panels[0].unmatch();
    }
    if (panels[1].isUnmatched(panels[0], panels[2])) {
      panels[1].unmatch();
    }
    if (panels[2].isUnmatched(panels[0], panels[1])) {
      panels[2].unmatch();
    }
}

const panels = [
    createPanel(),
    createPanel(),
    createPanel(),
];

let panelsLeft = 3;

const spin = document.getElementById('spin');
spin.addEventListener('click', () => {
    if (spin.classList.contains('inactive')) {
        return;
    }
    spin.classList.add('inactive');
    panels.forEach(panel => {
        panel.activate();
        panel.spin();
    });
});
