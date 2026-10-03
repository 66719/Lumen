function generateOccupiedSeats() {
    const occupiedCount = Math.floor(Math.random() * 25);
    const occupied = new Set();
    while (occupied.size < occupiedCount) {
        occupied.add(Math.floor(Math.random() * 60) + 1);
    }
    return Array.from(occupied).sort((a, b) => a - b);
}

function generateSessions() {
    const dates = ['2026-12-03', '2026-12-04', '2026-12-05', '2026-12-06', '2026-12-07', '2026-12-08', '2026-12-09', '2026-12-10'];
    const possibleTimes = ['10:00', '12:30', '14:15', '16:45', '19:00', '21:30', '23:15'];
    const sessions = [];

    dates.forEach(date => {
        const sessionsPerDay = Math.floor(Math.random() * 3) + 4;
        const shuffledTimes = [...possibleTimes].sort(() => 0.5 - Math.random()).slice(0, sessionsPerDay).sort();
        
        shuffledTimes.forEach(time => {
            sessions.push({
                date: date,
                time: time,
                occupiedSeats: generateOccupiedSeats()
            });
        });
    });

    return sessions;
}

const moviesData = [
    {
        id: 'm1',
        title: 'Dune: Part Two',
        genre: 'Sci-Fi, Action',
        poster: 'assets/posters/dune.jpg',
        price: 15,
        description: 'The epic continuation of Paul Atreides journey on the planet Arrakis.',
        sessions: generateSessions()
    },
    {
        id: 'm2',
        title: 'Deadpool & Wolverine',
        genre: 'Comedy, Action',
        poster: 'assets/posters/deadpool.jpg',
        price: 12,
        description: 'The irresponsible hero Deadpool will change the history of cinema forever.',
        sessions: generateSessions()
    },
    {
        id: 'm3',
        title: 'Interstellar',
        genre: 'Sci-Fi, Drama',
        poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
        price: 14,
        description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
        sessions: generateSessions()
    },
    {
        id: 'm4',
        title: 'The Dark Knight',
        genre: 'Action, Crime',
        poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
        price: 11,
        description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham.',
        sessions: generateSessions()
    },
    {
        id: 'm5',
        title: 'Inception',
        genre: 'Sci-Fi, Thriller',
        poster: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
        price: 13,
        description: 'A thief who steals corporate secrets through the use of dream-sharing technology.',
        sessions: generateSessions()
    },
    {
        id: 'm6',
        title: 'Avatar: The Way of Water',
        genre: 'Sci-Fi, Adventure',
        poster: 'assets/posters/avatar.jpg',
        price: 16,
        description: 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora.',
        sessions: generateSessions()
    },
    {
        id: 'm7',
        title: 'Spider-Man: Across the Spider-Verse',
        genre: 'Animation, Action',
        poster: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
        price: 10,
        description: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People.',
        sessions: generateSessions()
    },
    {
        id: 'm8',
        title: 'Oppenheimer',
        genre: 'Biography, Drama',
        poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
        price: 15,
        description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
        sessions: generateSessions()
    },
    {
        id: 'm9',
        title: 'Gladiator II',
        genre: 'Action, Adventure',
        poster: 'https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg',
        price: 14,
        description: 'Follows Lucius, the son of Maximus\' love Lucilla, after Maximus\' death.',
        sessions: generateSessions()
    },
    {
        id: 'm10',
        title: 'The Batman',
        genre: 'Action, Crime',
        poster: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg',
        price: 13,
        description: 'When a sadistic serial killer begins murdering key political figures in Gotham.',
        sessions: generateSessions()
    },
    {
        id: 'm11',
        title: 'Blade Runner 2049',
        genre: 'Sci-Fi, Mystery',
        poster: 'https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg',
        price: 12,
        description: 'A young blade runner\'s discovery of a long-buried secret leads him to track down former blade runner Rick Deckard.',
        sessions: generateSessions()
    },
    {
        id: 'm12',
        title: 'Joker',
        genre: 'Crime, Drama',
        poster: 'assets/posters/joker.jpg',
        price: 11,
        description: 'In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society.',
        sessions: generateSessions()
    },
    {
        id: 'm13',
        title: 'John Wick: Chapter 4',
        genre: 'Action, Thriller',
        poster: 'assets/posters/john.jpg',
        price: 14,
        description: 'John Wick uncovers a path to defeating The High Table.',
        sessions: generateSessions()
    },
    {
        id: 'm14',
        title: 'Mad Max: Fury Road',
        genre: 'Action, Sci-Fi',
        poster: 'https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg',
        price: 12,
        description: 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland.',
        sessions: generateSessions()
    },
    {
        id: 'm15',
        title: 'The Matrix',
        genre: 'Sci-Fi, Action',
        poster: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
        price: 10,
        description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
        sessions: generateSessions()
    }
];