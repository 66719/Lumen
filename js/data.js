const moviesData = [
  {
    id: 'm1',
    title: 'Dune: Part Two',
    genre: 'Sci-Fi, Action',
    poster: 'assets/posters/dune.jpg', 
    price: 15,
    description: 'The epic continuation of Paul Atreides journey on the planet Arrakis.',
    sessions: [
      { date: '2026-10-02', time: '10:00', occupiedSeats: [12, 13, 14, 25, 26, 45] },
      { date: '2026-10-02', time: '18:30', occupiedSeats: [5, 6, 7, 8, 20, 21, 22, 50, 51] },
      { date: '2026-10-03', time: '14:00', occupiedSeats: [33, 34] }
    ]
  },
  {
    id: 'm2',
    title: 'Deadpool & Wolverine',
    genre: 'Comedy, Action',
    poster: 'assets/posters/deadpool.jpg',
    price: 12,
    description: 'The irresponsible hero Deadpool will change the history of cinema forever.',
    sessions: [
      { date: '2026-10-02', time: '20:15', occupiedSeats: [1, 2, 3, 10, 11, 40, 41, 42] },
      { date: '2026-10-04', time: '16:45', occupiedSeats: [15, 16, 25, 26] }
    ]
  }
];