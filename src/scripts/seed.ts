// src/scripts/seed.ts
import betterSqlite3 from 'better-sqlite3';
import path from 'path';

// Initialize database connection
const dbPath = path.join(process.cwd(), 'data', 'portfolio.db');
const db = betterSqlite3(dbPath); // Correct way to initialize

// Clear existing data
db.prepare('DELETE FROM projects').run();

// Insert sample projects
const projects = [
    {
        title: "Chillstreams",
        description: "Site de streaming de anime, avec un catalogue de vidéos et un système de compte.",
        timeline: "Février 2025",
        stack: JSON.stringify(["React", "MongoDB", "CSS", "Node.js", "ExpressJS"]),
        features: JSON.stringify([
            "Catalogue videos : Recherche, filtres, vidéo en streaming",
            "Système de compte : Inscription, connexion",
            "Panneau admin : Gestion des vidéos,",
            "Securité : Authentification, JWT, rôles utilisateur (admin/client)",
        ]),
        image: "/images/chillstreamss.png",
        link: "https://github.com/MilasO1/ChillStreams.git"
    },
    // Add other projects...
];

const insert = db.prepare(
    'INSERT INTO projects (title, description, timeline, stack, features, image, link) VALUES (?, ?, ?, ?, ?, ?, ?)'
);

const insertMany = db.transaction(() => {
    for (const project of projects) {
        insert.run(
            project.title,
            project.description,
            project.timeline,
            project.stack,
            project.features,
            project.image,
            project.link
        );
    }
});

insertMany();
console.log(`Successfully seeded ${projects.length} projects`);