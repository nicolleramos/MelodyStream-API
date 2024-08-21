import { sql } from "./db.js";

// sql`DROP TABLE IF EXISTS songs;`.then(() => {
//     console.log("table deleted successfully.");
// });

sql`
    CREATE TABLE songs (
        id          TEXT PRIMARY KEY,
        title       TEXT,
        artist_id   TEXT,
        album_id    TEXT,
        genre       TEXT,
        duration    INTEGER,
        url         TEXT
    );
`.then(() => {
    console.log("`songs` table created.");
});


