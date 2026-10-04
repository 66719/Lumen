# Lumen Cinema - Interactive Seat Booking System (Made with AI)

## Overview

This project is a client-side single-page application (SPA) that simulates a modern cinema ticket booking experience. It features a dynamically generated movie catalog and an interactive seat selection interface, designed to demonstrate practical frontend development skills and state management without relying on a backend.

## Core Features

- **Dynamic Content Rendering:** Movies, dates, and showtimes are dynamically generated on the page using JavaScript based on a structured data array.
- **Interactive Cinema Hall:** Users can select available seats in a generated grid. Seats that are already occupied are dynamically assigned distinct classes and visually disabled.
- **State Management:** The application effectively tracks and updates the user's current selection (active date, selected movie, session time, and specific seats including row numbers).
- **Event Delegation:** Optimized event handling is implemented by attaching single listeners to parent containers (like the seat grid and date selectors) instead of binding hundreds of listeners to individual elements.
- **Real-time Price Calculation:** The total ticket price dynamically recalculates as seats are selected or deselected.

## Technologies Used

- **HTML5 & CSS3:** For semantic structure and a custom "Dark Cinema" UI theme with CSS variables.
- **Vanilla JavaScript:** For DOM manipulation (using `classList`), complex array filtering, loops, and event delegation.

## How to Run

This project runs entirely in the browser. Simply download or clone the repository and open the `index.html` file in any modern web browser. No local server, database, or backend configuration is required.
