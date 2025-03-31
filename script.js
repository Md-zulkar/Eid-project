// Select necessary DOM elements
const countdownDays = document.getElementById('days');
const countdownHours = document.getElementById('hours');
const countdownMinutes = document.getElementById('minutes');
const countdownSeconds = document.getElementById('seconds');

const wishButton = document.getElementById('wishButton');
const calendarButton = document.getElementById('calendarButton');
const wishPopup = document.getElementById('wishPopup');
const calendarPopup = document.getElementById('calendarPopup');
const closeButtons = document.querySelectorAll('.close-button');
const soundToggle = document.getElementById('soundToggle');
const eidMusic = document.getElementById('eidMusic');

const wishOptions = document.querySelectorAll('.wish-option');
const selectedWishContainer = document.getElementById('selectedWish');

const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');
const currentMonthDisplay = document.getElementById('currentMonth');
const calendarDaysContainer = document.getElementById('calendarDays');

// Islamic Months Array
const islamicMonths = [
    'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani',
    'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Shaaban',
    'Ramadan', 'Shawwal', 'Dhu al-Qadah', 'Dhu al-Hijjah'
];

// Get current date
const today = new Date();
let currentMonth = today.getMonth(); // Get current Gregorian month
let currentYear = today.getFullYear(); // Get current Gregorian year

// Function to update the calendar display
function updateCalendar() {
    const daysInMonth = getIslamicMonthDays(currentMonth, currentYear);
    currentMonthDisplay.textContent = `${islamicMonths[currentMonth]} ${currentYear}`;

    // Clear existing days
    calendarDaysContainer.innerHTML = '';

    // Dynamically populate calendar days
    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = i;
        dayElement.classList.add('day');
        dayElement.addEventListener('click', () => handleDayClick(i));
        calendarDaysContainer.appendChild(dayElement);
    }
}

// Function to get the number of days in an Islamic month
function getIslamicMonthDays(month, year) {
    return [0, 2, 4, 6, 8, 10].includes(month) ? 30 : 29;
}

// Handle day selection to set countdown date
function handleDayClick(day) {
    const selectedDate = new Date(currentYear, currentMonth, day);
    startCountdown(selectedDate);
    calendarPopup.style.display = 'none';
}

// Countdown Timer Logic
let countdownInterval;

function startCountdown() {
    clearInterval(countdownInterval);
    
    const targetDate = new Date();
    targetDate.setFullYear(2025, 2, 31); // March 31, 2025
    targetDate.setHours(6, 0, 0, 0); // 6:00 AM

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            countdownDays.textContent = '00';
            countdownHours.textContent = '00';
            countdownMinutes.textContent = '00';
            countdownSeconds.textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownDays.textContent = String(days).padStart(2, '0');
        countdownHours.textContent = String(hours).padStart(2, '0');
        countdownMinutes.textContent = String(minutes).padStart(2, '0');
        countdownSeconds.textContent = String(seconds).padStart(2, '0');
    }

    countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
}

// Popup Handling
wishButton.addEventListener('click', () => wishPopup.style.display = 'flex');
calendarButton.addEventListener('click', () => calendarPopup.style.display = 'flex');
closeButtons.forEach(button => button.addEventListener('click', () => {
    wishPopup.style.display = 'none';
    calendarPopup.style.display = 'none';
}));

// Interactive Wish Selector
wishOptions.forEach(option => {
    option.addEventListener('click', () => {
        const wishType = option.getAttribute('data-wish');
        const messages = {
            'health': 'Wishing you good health and wellness this Eid!',
            'prosperity': 'May this Eid bring prosperity and abundance to your life!',
            'peace': 'Wishing you peace and harmony in your home and heart.',
            'happiness': 'May your Eid be filled with joy and happiness!'
        };
        selectedWishContainer.textContent = messages[wishType] || '';
    });
});

// Sound Control
let isSoundOn = true;
soundToggle.addEventListener('click', () => {
    if (isSoundOn) {
        eidMusic.pause();
        soundToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
        eidMusic.play();
        soundToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
    isSoundOn = !isSoundOn;
});

// Calendar Navigation
prevMonthButton.addEventListener('click', () => {
    if (currentMonth > 0) currentMonth--;
    else {
        currentMonth = 11;
        currentYear--;
    }
    updateCalendar();
});

nextMonthButton.addEventListener('click', () => {
    if (currentMonth < 11) currentMonth++;
    else {
        currentMonth = 0;
        currentYear++;
    }
    updateCalendar();
});

// Initialize calendar and countdown on page load
window.onload = () => {
    updateCalendar();
    startCountdown();
};
