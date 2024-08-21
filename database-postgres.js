import { randomUUID } from "crypto";
import { sql } from "./db.js";

export class DataBasePostgres {
    #songs = new Map();

    async list(search) {
        let songs;
        if(search) {
            songs = await sql`SELECT * FROM songs WHERE title ILIKE ${'%'+search+'%'}`;
        } else {
            songs = await sql`SELECT * FROM songs`;
        } return songs;
    }

    async create(song) {
        const songId = randomUUID();
        const { title, artist_id, album_id, genre, duration, url } = song;
        await sql`INSERT INTO songs(id, title, artist_id, album_id, genre, duration, url) VALUES (${songId}, ${title}, ${artist_id}, ${album_id}, ${genre}, ${duration}, ${url})`;
    }

    async update(id, song) {
        const { title, artist_id, album_id, genre, duration, url } = song;
        await sql`UPDATE songs SET title = ${title}, artist_id = ${artist_id}, album_id = ${album_id}, genre = ${genre}, duration = ${duration}, url = ${url} WHERE id = ${id}`;
    }

    async delete(id) {
        await sql`DELETE FROM songs WHERE id = ${id}`;
    }
}

