// 1. DOM Елементи головної сторінки
const datesContainer = document.getElementById('dates-container');
const moviesGrid = document.getElementById('movies-grid');

// 2. Глобальний стан додатку (State Management)
let state = {
    selectedDate: null,
    selectedMovie: null,
    selectedSession: null,
    selectedSeats: [] // Збереження вибраних місць у масиві (знадобиться пізніше)
};

// 3. Отримання унікальних дат з бази даних (data.js)
function getUniqueDates() {
    const dates = new Set();
    moviesData.forEach(movie => {
        movie.sessions.forEach(session => dates.add(session.date));
    });
    return Array.from(dates).sort();
}

// 4. Рендер кнопок дат
function renderDates() {
    const dates = getUniqueDates();
    if (dates.length === 0) return;

    // Встановлюємо першу доступну дату за замовчуванням
    state.selectedDate = dates[0];

    // Генеруємо HTML кнопок
    datesContainer.innerHTML = dates.map(date => `
        <button class="date-btn ${date === state.selectedDate ? 'active' : ''}" data-date="${date}">
            ${formatDate(date)}
        </button>
    `).join('');

    // Event Delegation: один слухач на весь контейнер
    datesContainer.addEventListener('click', handleDateClick);
}

// Форматування дати (наприклад: "Oct 2")
function formatDate(dateString) {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// 5. Обробка кліку по даті
function handleDateClick(e) {
    // Перевіряємо, чи клік був саме по кнопці
    if (e.target.classList.contains('date-btn')) {
        // Маніпуляції з classList: знімаємо активний клас з усіх кнопок
        document.querySelectorAll('.date-btn').forEach(btn => btn.classList.remove('active'));
        
        // Додаємо активний клас клікнутій кнопці
        e.target.classList.add('active');
        
        // Оновлюємо стан додатку
        state.selectedDate = e.target.dataset.date;
        
        // Перемальовуємо фільми відповідно до нової дати
        renderMovies();
    }
}

// 6. Рендер карток фільмів
function renderMovies() {
    // Шукаємо фільми, у яких є сеанси на обрану дату
    const availableMovies = moviesData.filter(movie => 
        movie.sessions.some(session => session.date === state.selectedDate)
    );

    // Генеруємо HTML карток
    moviesGrid.innerHTML = availableMovies.map(movie => `
        <div class="movie-card">
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
            <div class="movie-card-content">
                <h3 class="movie-title">${movie.title}</h3>
                <p class="movie-genre">${movie.genre}</p>
                <p class="movie-price">Ticket: $${movie.price}</p>
                <button class="select-movie-btn" data-id="${movie.id}">Select Movie</button>
            </div>
        </div>
    `).join('');
}

// 7. Ініціалізація додатку при завантаженні сторінки
function init() {
    renderDates();
    renderMovies();
}

// Запускаємо
init();

///new 

// --- НОВІ DOM ЕЛЕМЕНТИ ---
const homePage = document.getElementById('home-page');
const bookingPage = document.getElementById('booking-page');
const backBtn = document.getElementById('back-btn');
const movieInfo = document.getElementById('movie-info');
const timesContainer = document.getElementById('times-container');
const seatsContainer = document.getElementById('seats-container');
const countDisplay = document.getElementById('count');
const totalDisplay = document.getElementById('total');
const buyBtn = document.getElementById('buy-btn');

// --- ЛОГІКА ПЕРЕХОДУ ТА ВІДОБРАЖЕННЯ ---

// 1. Делегування подій для кнопок "Select Movie"
moviesGrid.addEventListener('click', (e) => {
    if (e.target.classList.contains('select-movie-btn')) {
        const movieId = e.target.dataset.id;
        openBookingPage(movieId);
    }
});

// 2. Відкриття сторінки бронювання
function openBookingPage(movieId) {
    // Знаходимо обраний фільм
    state.selectedMovie = moviesData.find(m => m.id === movieId);
    
    // Знаходимо всі сеанси для цього фільму на обрану дату
    const availableSessions = state.selectedMovie.sessions.filter(s => s.date === state.selectedDate);
    
    // За замовчуванням обираємо перший доступний час
    if(availableSessions.length > 0) {
        state.selectedSession = availableSessions[0];
    }

    // Ховаємо головну і показуємо сторінку бронювання (маніпуляції з classList)
    homePage.classList.add('hidden');
    bookingPage.classList.remove('hidden');

    // Рендеримо контент другої сторінки
    renderMovieInfo();
    renderTimes(availableSessions);
    renderSeats();
}

// 3. Повернення на головну сторінку
backBtn.addEventListener('click', () => {
    bookingPage.classList.add('hidden');
    homePage.classList.remove('hidden');
    
    // Очищаємо обрані місця при виході
    state.selectedSeats = [];
    updateSummary();
});

// 4. Рендер інформації про фільм
function renderMovieInfo() {
    movieInfo.innerHTML = `
        <div class="movie-info-card">
            <img src="${state.selectedMovie.poster}" alt="Poster" class="info-poster">
            <div>
                <h2>${state.selectedMovie.title}</h2>
                <p>${state.selectedMovie.description}</p>
                <p class="movie-price">Ticket: $${state.selectedMovie.price}</p>
            </div>
        </div>
    `;
}

// 5. Рендер кнопок часу
function renderTimes(sessions) {
    timesContainer.innerHTML = sessions.map(session => `
        <button class="time-btn ${session.time === state.selectedSession.time ? 'active' : ''}" data-time="${session.time}">
            ${session.time}
        </button>
    `).join('');
}

// Делегування подій для кнопок часу
timesContainer.addEventListener('click', (e) => {
    if(e.target.classList.contains('time-btn')) {
        document.querySelectorAll('.time-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        const selectedTime = e.target.dataset.time;
        // Оновлюємо поточний сеанс у стані
        state.selectedSession = state.selectedMovie.sessions.find(s => 
            s.date === state.selectedDate && s.time === selectedTime
        );
        
        // При зміні часу очищаємо вибрані місця і перемальовуємо зал
        state.selectedSeats = [];
        updateSummary();
        renderSeats();
    }
});

// 6. Рендер сітки крісел
// 6. Рендер сітки крісел (з рядами та номерами)
function renderSeats() {
    seatsContainer.innerHTML = '';
    const totalRows = 6;
    const seatsPerRow = 10;
    let globalSeatIndex = 1; // Індекс для сумісності з нашою базою зайнятих місць (від 1 до 60)
    
    for (let row = 1; row <= totalRows; row++) {
        // Створюємо номер ряду зліва
        const rowLabel = document.createElement('div');
        rowLabel.classList.add('row-label');
        rowLabel.innerText = row;
        seatsContainer.appendChild(rowLabel);

        // Генеруємо крісла для цього ряду
        for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
            const seat = document.createElement('div');
            seat.classList.add('seat');
            seat.innerText = seatNum; // Додаємо цифру всередину крісла
            
            if (state.selectedSession.occupiedSeats.includes(globalSeatIndex)) {
                seat.classList.add('occupied');
            }
            
            // Зберігаємо всі координати в data-атрибути
            seat.dataset.index = globalSeatIndex;
            seat.dataset.row = row;
            seat.dataset.seatNum = seatNum;
            
            seatsContainer.appendChild(seat);
            globalSeatIndex++;
        }
    }
}

// 8. Вибір місць (Event Delegation)
seatsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        
        const seatIndex = parseInt(e.target.dataset.index);
        const seatRow = e.target.dataset.row;
        const seatNum = e.target.dataset.seatNum;
        
        // Шукаємо, чи є вже це місце в нашому масиві за його унікальним індексом
        const existingSeatIndex = state.selectedSeats.findIndex(s => s.index === seatIndex);
        
        if (existingSeatIndex !== -1) {
            // Якщо є — видаляємо його
            state.selectedSeats.splice(existingSeatIndex, 1);
        } else {
            // Якщо немає — додаємо як об'єкт з детальною інформацією
            state.selectedSeats.push({ index: seatIndex, row: seatRow, seat: seatNum });
        }
        
        updateSummary();
    }
});

// 9. Оновлення панелі підсумків
function updateSummary() {
    if (state.selectedSeats.length > 0) {
        // Перетворюємо кожен обраний об'єкт у рядок "Row X, Seat Y" і з'єднуємо їх через кому
        const seatsText = state.selectedSeats.map(s => `Row ${s.row}, Seat ${s.seat}`).join(' | ');
        countDisplay.innerText = seatsText;
    } else {
        countDisplay.innerText = '0';
    }
    
    // Рахуємо загальну суму (кількість об'єктів у масиві * ціна)
    const total = state.selectedSeats.length * (state.selectedMovie ? state.selectedMovie.price : 0);
    totalDisplay.innerText = total;
    
    if (state.selectedSeats.length > 0) {
        buyBtn.removeAttribute('disabled');
    } else {
        buyBtn.setAttribute('disabled', 'true');
    }
}

// 10. Оформлення замовлення (Імітація успішної покупки)
buyBtn.addEventListener('click', () => {
    const total = state.selectedSeats.length * state.selectedMovie.price;
    alert(`Success! You booked ${state.selectedSeats.length} tickets for "${state.selectedMovie.title}". Total amount: $${total}`);
    
    // Після "покупки" скидаємо стан і повертаємо на головну сторінку
    state.selectedSeats = [];
    updateSummary();
    bookingPage.classList.add('hidden');
    homePage.classList.remove('hidden');
});