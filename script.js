// Load previous input and history from local storage
window.onload = function() {
    const display = document.getElementById('display');
    const historyList = document.getElementById('history');
    
    // Load input value
    const savedInput = localStorage.getItem('input');
    if (savedInput) {
        display.value = savedInput;
    }

    // Load history
    const savedHistory = JSON.parse(localStorage.getItem('history')) || [];
    savedHistory.forEach(item => {
        addHistoryItem(item);
    });
};

function appendToDisplay(value) {
    const display = document.getElementById('display');
    display.value += value;
    localStorage.setItem('input', display.value); // Save input to local storage
}

function clearDisplay() {
    const display = document.getElementById('display');
    display.value = ''; // Hanya menghapus input kalkulator
    localStorage.removeItem('input'); // Hapus hanya input dari local storage
    // Tidak menghapus riwayat
}

function deleteLast() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
    localStorage.setItem('input', display.value); // Save updated input to local storage
}

function calculate() {
    const display = document.getElementById('display');
    try {
        const expression = display.value; // Simpan ekspresi
        const result = eval(expression);
        display.value = result;
        localStorage.removeItem('input'); // Clear input after calculation

        // Tambahkan hasil ke riwayat dalam format yang diinginkan
        addHistoryItem(`${expression} = ${result}`);
        saveHistoryToLocalStorage(`${expression} = ${result}`);
    } catch (e) {
        display.value = 'Error';
    }
}

// Add item to history display
function addHistoryItem(item) {
    const historyList = document.getElementById('history');
    const li = document.createElement('li');
    li.classList.add('card');
    li.innerHTML = `<div>${item}</div> <button onclick="deleteHistoryItem(this)">Hapus</button>`;
    historyList.appendChild(li);
}

// Delete individual history item
function deleteHistoryItem(button) {
    const historyList = document.getElementById('history');
    historyList.removeChild(button.parentElement); // Hapus item dari DOM
    updateHistoryInLocalStorage(); // Update local storage
}

// Update history in local storage
function updateHistoryInLocalStorage() {
    const historyItems = Array.from(document.querySelectorAll('#history .card')).map(card => card.textContent.trim());
    localStorage.setItem('history', JSON.stringify(historyItems));
}

// Save history to local storage
function saveHistoryToLocalStorage(item) {
    const historyList = JSON.parse(localStorage.getItem('history')) || [];
    historyList.push(item);
    localStorage.setItem('history', JSON.stringify(historyList));
}

// Clear entire history
function clearHistory() {
    localStorage.removeItem('history'); // Hapus riwayat dari local storage
    const historyList = document.getElementById('history');
    historyList.innerHTML = ''; // Hapus semua item history dari tampilan
}

// Toggle history display
function toggleHistory() {
    const historyContainer = document.getElementById('history-container');
    const button = document.getElementById('toggle-history');

    if (historyContainer.style.maxHeight === "0px" || historyContainer.style.maxHeight === "") {
        historyContainer.style.maxHeight = "200px"; // Tampilkan
        button.textContent = "Minimize Riwayat";
    } else {
        historyContainer.style.maxHeight = "0"; // Minimalkan
        button.textContent = "Tampilkan Riwayat";
    }
}
