import { fastify } from 'fastify';
// import { DataBaseMemory } from './database-memory.js';
import { DataBasePostgres } from './database-postgres.js';

const server = fastify();
// const db = new DataBaseMemory();
const db = new DataBasePostgres();

server.post('/songs', async (request, reply) => {
    const {title, artist_id, album_id, genre, duration, url } = request.body;
    await db.create({
        title: title,
        artist_id: artist_id,
        album_id: album_id,
        genre: genre,
        duration: duration,
        url: url
    });
    return reply.status(201).send();
});

server.get('/songs', async (request) => {
    const search = request.query.search;
    console.log(search);

    const songs = await db.list(search);
    return songs;
});

server.put('/songs/:id', async (request, reply) => {
    const songId = request.params.id;
    const {title, artist_id, album_id, genre, duration, url } = request.body;
    await db.update(songId, {
        title,
        artist_id, 
        album_id,
        genre, 
        duration, 
        url,
    });
    return reply.status(204).send();
});

server.delete('/songs/:id', async (request, reply) => {
    const songId = request.params.id;
    await db.delete(songId);
    return reply.status(204).send();
});

server.listen({
    port: process.env.port ?? 3333,
});
