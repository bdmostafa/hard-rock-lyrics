// Handle Lyrics part backend =======================================
class Lyrics {
    constructor() {
        this.api = 'https://api.lyrics.ovh/suggest/';
    }
    // Search lyrics data with all the properties, values
    async searchLyrics(searchText) {
        const fetchedData = await fetch(`${this.api}${searchText}`);
        const responseData = await fetchedData.json();
        // console.log(responseData.data);

        // loading 10 data only as required
        let data = [];
        for (let i = 0; i < 10; i++) {
            data.push(responseData.data[i]);
        }
        // console.log(data);
        // As data is array object, return data through destructuring with the help of spread operator
        return [...data];
    }
    // Short the data as needed from the whole response data
    getShortedData(data) {
        const title = [];
        const albumTitle = [];
        const albumCoverImg = [];
        const artistName = [];
        const artistPic = [];
        const duration = [];
        const listen = [];
        const lyrics = [];
        data.forEach(data => {
            // console.log(data)
            title.push(data.title);
            albumTitle.push(data.album.title);
            albumCoverImg.push(data.album.cover);
            artistName.push(data.artist.name);
            artistPic.push(data.artist.picture);
            duration.push(`${data.duration/1000}s`);
            listen.push(data.preview);
            lyrics.push(data.lyrics);
        })
        // Return the shorted data as an object
        return {
            song_title: title,
            album_title: albumTitle,
            album_cover: albumCoverImg,
            artist_name: artistName,
            artist_pic: artistPic,
            song_duration: duration,
            song_listen: listen,
            song_lyrics: lyrics
        }
    }


}

// Handle UI part of Lyrics app =================================
class UI {
    constructor() {
        // All the selectors

    }
    // Frontend/UI section - all the data passing here through DOM
    paint() {

    }
}


// Trigger DOM loaded
// document.addEventListener('DOMContentLoaded', defaultResult);

// function defaultResult() {

// }

// Instantiate lyrics
const lyrics = new Lyrics;

// Instantiate ui
const ui = new UI;

document.getElementById('search-input').addEventListener('keyup', (e) => {
    // console.log(e.target.value);
    // Search the song as searchText value
    lyrics.searchLyrics(e.target.value)
        .then(data => {
            // Short the data as requirement/needed
            const d = lyrics.getShortedData(data)

            console.log(d)

        })
})