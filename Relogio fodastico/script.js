// Config
const elHHMM = document.getElementById('hhmm');
const elSecs = document.getElementById('secs');
const elAMPM = document.getElementById('ampm');
const elTime = document.getElementById('time');
const elWeekday = document.getElementById('weekday');
const elDate = document.getElementById('date');
const matrix = document.getElementById('matrix');
const btnFormat = document.getElementById('toggleFormat');
const btnSecs = document.getElementById('toggleSeconds');

let use24 = true;
let showSeconds = true;

function pad(n) { return n.toString().padStart(2, '0') }

function update() {
    const now = new Date();
    let hh = now.getHours();
    const mm = now.getMinutes();
    const ss = now.getSeconds();

    const weekdayNames = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
    const monthNames = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

    elWeekday.textContent = weekdayNames[now.getDay()];
    elDate.textContent = pad(now.getDate()) + ' ' + monthNames[now.getMonth()] + ' ' + now.getFullYear();

    let ampm = '';
    if (!use24) { ampm = hh >= 12 ? 'PM' : 'AM'; hh = hh % 12 || 12; }

    const hhStr = pad(hh);
    const mmStr = pad(mm);
    const ssStr = pad(ss);

    elHHMM.textContent = `${hhStr}:${mmStr}`;
    elSecs.textContent = `:${ssStr}`;
    elAMPM.textContent = ampm;

    // data attr for glitch effect
    elTime.setAttribute('data-time', `${hhStr}:${mmStr}:${ssStr}`);

    // matrix box last update
    matrix.querySelectorAll('p')[2].textContent = `> Última atualização: ${now.toLocaleTimeString()}`;

    // hide/show seconds
    elSecs.style.display = showSeconds ? 'inline-block' : 'none';
}

// initial update
update();
// update each second (good enough for a clock)
setInterval(update, 1000);

// controls
btnFormat.addEventListener('click', () => {
    use24 = !use24;
    btnFormat.textContent = use24 ? '24h' : '12h';
    update();
});
btnSecs.addEventListener('click', () => {
    showSeconds = !showSeconds;
    btnSecs.style.opacity = showSeconds ? '1' : '0.6';
    update();
});

// tiny cool effect: move background gradient based on mouse
document.addEventListener('mousemove', (e) => {
    const panel = document.querySelector('.panel');
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    panel.style.transform = `translate3d(${x}px, ${y}px, 0)`;
});

// accessibility: space toggles seconds
window.addEventListener('keydown', (ev) => {
    if (ev.code === 'Space') {
        ev.preventDefault(); btnSecs.click();
    }
});