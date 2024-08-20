import { randomUUID } from "crypto";

export class DataBaseMemory {
    #songs = new Map();

    create(song) {
        const songId = randomUUID();
        this.#songs.set(songId, song);
    }

    list(search) {
        return Array.from(this.#songs.entries())
        .map((songArray) => {
            const id = songArray[0];
            const data = songArray[1];
            return {
                id,
                ...data,
            }
        })
        .filter(song => {
            if(search) {
                return song.title.includes(search);
            }
            return true;
        });
    }

    update(id, song) {
        this.#songs.set(id, song);
    }

    delete(id) {
        this.#songs.delete(id);
    }
}

