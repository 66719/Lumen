const datesContainer = document.getElementById('dates-container');
const moviesGrid = document.getElementById('movies-grid');

let state = {
    selectedDate: null,
    selectedMovie: null,
    selectedSession: null,
    selectedSeats: []
};

function getUniqueDates() {
    const dates = new Set();
    moviesData.forEach(movie => {
        movie.sessions.forEach(session => dates.add(session.date));
    });
    return Array.from(dates).sort();
}

function renderDates() {
    const dates = getUniqueDates();
    if (dates.length === 0) return;

    state.selectedDate = dates[0];

    datesContainer.innerHTML = dates.map(date => `
        <button class="date-btn ${date === state.selectedDate ? 'active' : ''}" data-date="${date}">
            ${formatDate(date)}
        </button>
    `).join('');

    datesContainer.addEventListener('click', handleDateClick);
}

function formatDate(dateString) {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function handleDateClick(e) {
    if (e.target.classList.contains('date-btn')) {
        document.querySelectorAll('.date-btn').forEach(btn => btn.classList.remove('active'));
        
        e.target.classList.add('active');
        
        state.selectedDate = e.target.dataset.date;
        
        renderMovies();
    }
}

function renderMovies() {
    const availableMovies = moviesData.filter(movie => 
        movie.sessions.some(session => session.date === state.selectedDate)
    );

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

function init() {
    renderDates();
    renderMovies();
}

init();

const homePage = document.getElementById('home-page');
const bookingPage = document.getElementById('booking-page');
const backBtn = document.getElementById('back-btn');
const movieInfo = document.getElementById('movie-info');
const timesContainer = document.getElementById('times-container');
const seatsContainer = document.getElementById('seats-container');
const countDisplay = document.getElementById('count');
const totalDisplay = document.getElementById('total');
const buyBtn = document.getElementById('buy-btn');

moviesGrid.addEventListener('click', (e) => {
    if (e.target.classList.contains('select-movie-btn')) {
        const movieId = e.target.dataset.id;
        openBookingPage(movieId);
    }
});

function openBookingPage(movieId) {
    state.selectedMovie = moviesData.find(m => m.id === movieId);
    
    const availableSessions = state.selectedMovie.sessions.filter(s => s.date === state.selectedDate);
    
    if (availableSessions.length > 0) {
        state.selectedSession = availableSessions[0];
    }

    homePage.classList.add('hidden');
    bookingPage.classList.remove('hidden');

    renderMovieInfo();
    renderTimes(availableSessions);
    renderSeats();
}

backBtn.addEventListener('click', () => {
    bookingPage.classList.add('hidden');
    homePage.classList.remove('hidden');
    
    state.selectedSeats = [];
    updateSummary();
});

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

function renderTimes(sessions) {
    timesContainer.innerHTML = sessions.map(session => `
        <button class="time-btn ${session.time === state.selectedSession.time ? 'active' : ''}" data-time="${session.time}">
            ${session.time}
        </button>
    `).join('');
}

timesContainer.addEventListener('click', (e) => {
    if(e.target.classList.contains('time-btn')) {
        document.querySelectorAll('.time-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        const selectedTime = e.target.dataset.time;

        state.selectedSession = state.selectedMovie.sessions.find(s => 
            s.date === state.selectedDate && s.time === selectedTime
        );
        
        state.selectedSeats = [];
        updateSummary();
        renderSeats();
    }
});

function renderSeats() {
    seatsContainer.innerHTML = '';
    const totalRows = 6;
    const seatsPerRow = 10;
    let globalSeatIndex = 1;
    
    for (let row = 1; row <= totalRows; row++) {
        const rowLabel = document.createElement('div');
        rowLabel.classList.add('row-label');
        rowLabel.innerText = row;
        seatsContainer.appendChild(rowLabel);

        for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
            const seat = document.createElement('div');
            seat.classList.add('seat');
            seat.innerText = seatNum;
            
            if (state.selectedSession.occupiedSeats.includes(globalSeatIndex)) {
                seat.classList.add('occupied');
            }
            
            seat.dataset.index = globalSeatIndex;
            seat.dataset.row = row;
            seat.dataset.seatNum = seatNum;
            
            seatsContainer.appendChild(seat);
            globalSeatIndex++;
        }
    }
}

seatsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        
        const seatIndex = parseInt(e.target.dataset.index);
        const seatRow = e.target.dataset.row;
        const seatNum = e.target.dataset.seatNum;
        
        const existingSeatIndex = state.selectedSeats.findIndex(s => s.index === seatIndex);
        
        if (existingSeatIndex !== -1) {
            state.selectedSeats.splice(existingSeatIndex, 1);
        } else {
            state.selectedSeats.push({ index: seatIndex, row: seatRow, seat: seatNum });
        }
        
        updateSummary();
    }
});

function updateSummary() {
    if (state.selectedSeats.length > 0) {
        const seatsText = state.selectedSeats.map(s => `Row ${s.row}, Seat ${s.seat}`).join(' | ');
        countDisplay.innerText = seatsText;
    } else {
        countDisplay.innerText = '0';
    }
    
    const total = state.selectedSeats.length * (state.selectedMovie ? state.selectedMovie.price : 0);
    totalDisplay.innerText = total;
    
    if (state.selectedSeats.length > 0) {
        buyBtn.removeAttribute('disabled');
    } else {
        buyBtn.setAttribute('disabled', 'true');
    }
}

buyBtn.addEventListener('click', () => {
    const total = state.selectedSeats.length * state.selectedMovie.price;
    alert(`Success! You booked ${state.selectedSeats.length} tickets for "${state.selectedMovie.title}". Total amount: $${total}`);
    
    state.selectedSeats = [];
    updateSummary();
    bookingPage.classList.add('hidden');
    homePage.classList.remove('hidden');
});