// --- Core Game Variables ---
let totalDrops = 0;
let dropsPerClick = 1;
let passiveIncome = 0;

// --- Obstacle State ---
let isLeakActive = false;

// --- Upgrade Costs ---
let costBiosand = 50;
let costHandpump = 200;
let costRainwater = 500;
let costSolar = 1500;
let costWell = 5000;

// --- DOM Elements ---
const totalWaterEl = document.getElementById('total-water');
const dropsPerClickEl = document.getElementById('drops-per-click');
const passiveIncomeEl = document.getElementById('passive-income');
const mainClicker = document.getElementById('main-clicker');
const winMessage = document.getElementById('win-message');
const leakObstacle = document.getElementById('leak-obstacle');

// Buttons
const btnBiosand = document.getElementById('buy-biosand');
const btnHandpump = document.getElementById('buy-handpump');
const btnRainwater = document.getElementById('buy-rainwater');
const btnSolar = document.getElementById('buy-solar');
const btnWell = document.getElementById('buy-well');

// --- Helper Functions ---

// Updates the text on the screen to match our JavaScript variables
function updateUI() {
    totalWaterEl.innerText = totalDrops;
    dropsPerClickEl.innerText = dropsPerClick;
    passiveIncomeEl.innerText = passiveIncome;

    // Update costs text
    document.getElementById('cost-biosand').innerText = costBiosand;
    document.getElementById('cost-handpump').innerText = costHandpump;
    document.getElementById('cost-rainwater').innerText = costRainwater;
    document.getElementById('cost-solar').innerText = costSolar;
    document.getElementById('cost-well').innerText = costWell;

    // Disable buttons if the player doesn't have enough drops
    btnBiosand.disabled = totalDrops < costBiosand;
    btnHandpump.disabled = totalDrops < costHandpump;
    btnRainwater.disabled = totalDrops < costRainwater;
    btnSolar.disabled = totalDrops < costSolar;
    btnWell.disabled = totalDrops < costWell;
}

// --- Event Listeners ---

// 1. Manual Clicking
mainClicker.addEventListener('click', function() {
    totalDrops = totalDrops + dropsPerClick;
    updateUI();
});

// 2. Buying Upgrades
btnBiosand.addEventListener('click', function() {
    if (totalDrops >= costBiosand) {
        totalDrops = totalDrops - costBiosand;
        dropsPerClick = dropsPerClick + 10;
        costBiosand = Math.floor(costBiosand * 1.5); // Increase cost for next time
        updateUI();
    }
});

btnHandpump.addEventListener('click', function() {
    if (totalDrops >= costHandpump) {
        totalDrops = totalDrops - costHandpump;
        dropsPerClick = dropsPerClick + 50;
        costHandpump = Math.floor(costHandpump * 1.5);
        updateUI();
    }
});

btnRainwater.addEventListener('click', function() {
    if (totalDrops >= costRainwater) {
        totalDrops = totalDrops - costRainwater;
        passiveIncome = passiveIncome + 5;
        costRainwater = Math.floor(costRainwater * 1.5);
        updateUI();
    }
});

btnSolar.addEventListener('click', function() {
    if (totalDrops >= costSolar) {
        totalDrops = totalDrops - costSolar;
        passiveIncome = passiveIncome + 20;
        costSolar = Math.floor(costSolar * 1.5);
        updateUI();
    }
});

btnWell.addEventListener('click', function() {
    if (totalDrops >= costWell) {
        totalDrops = totalDrops - costWell;
        winMessage.classList.remove('hidden'); // Show win message
        btnWell.disabled = true;
        btnWell.innerText = "UNLOCKED";
        updateUI();
    }
});

// 3. Obstacle Logic (Fix the Leak!)
leakObstacle.addEventListener('click', function() {
    isLeakActive = false;
    leakObstacle.classList.add('hidden'); // Hide the leak warning
});

// 4. Reset Game
document.getElementById('reset-btn').addEventListener('click', function() {
    totalDrops = 0;
    dropsPerClick = 1;
    passiveIncome = 0;

    costBiosand = 50;
    costHandpump = 200;
    costRainwater = 500;
    costSolar = 1500;
    costWell = 5000;

    isLeakActive = false;
    leakObstacle.classList.add('hidden');
    winMessage.classList.add('hidden');
    btnWell.innerText = "BUY";
    updateUI();
});

// --- Game Loops ---

// This runs every 1000 milliseconds (1 second) to handle Passive Income & the Leak Obstacle
setInterval(function() {
    if (passiveIncome > 0) {
        totalDrops = totalDrops + passiveIncome;
    }

    if (isLeakActive) {
        totalDrops = totalDrops - 5; // The challenge reduces score!
        if (totalDrops < 0) totalDrops = 0; // Prevent negative scores
    }

    updateUI();
}, 1000);

// Spawns the leak obstacle randomly
setInterval(function() {
    // 15% chance to trigger a leak every 4 seconds, as long as one isn't active and user has > 20 drops
    if (!isLeakActive && totalDrops > 20 && Math.random() < 0.15) {
        isLeakActive = true;
        leakObstacle.classList.remove('hidden');
    }
}, 4000);

// Initialize UI on first load
updateUI();