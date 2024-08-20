import { fastify } from 'fastify';
import { DataBaseMemory } from './database-memory.js';

const server = fastify();
const db = new DataBaseMemory();

server.post('/songs', (request, reply) => {
    const {title, artist_ID, album_ID, genre, duration, url } = request.body;
    db.create({
        title: title,
        artist_ID: artist_ID,
        album_ID: album_ID,
        genre: genre,
        duration: duration,
        url: url
    });
    return reply.status(201).send();
});

server.get('/songs', (request) => {
    const search = request.query.search;
    console.log(search);

    const songs = db.list(search);
    return songs;
});

server.put('/songs/:id', (request, reply) => {
    const songId = request.params.id;
    const {title, artist_ID, album_ID, genre, duration, url } = request.body;
    db.update(songId, {
        title,
        artist_ID, 
        album_ID,
        genre, 
        duration, 
        url,
    });
    return reply.status(204).send();
});

server.delete('/songs/:id', (request, reply) => {
    const songId = request.params.id;
    db.delete(songId);
    return reply.status(204).send();
});

server.listen({
    port: 3333,
});
