// Handle Lyrics part backend =======================================
class Song {
    constructor() {
        this.apiSong = 'https://api.lyrics.ovh/suggest/';
        this.apiLyrics = 'https://api.lyrics.ovh/v1/';

    }
    // Search song data with all the properties, values
    async searchSong(searchText) {
        const fetchedData = await fetch(`${this.apiSong}${searchText}`);
        const responseData = await fetchedData.json();
        // console.log(responseData.data);

        // loading only 10 data as required
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
        const artistProfile = [];
        const artistPic = [];
        const duration = [];
        const listen = [];
        // const lyrics = [];
        data.forEach(data => {
            // console.log(data)
            title.push(data.title);
            albumTitle.push(data.album.title);
            albumCoverImg.push(data.album.cover);
            artistName.push(data.artist.name);
            artistProfile.push(data.artist.link);
            artistPic.push(data.artist.picture);
            duration.push(`${data.duration/1000}s`);
            listen.push(data.preview);
            // lyrics.push(data.lyrics);
        })
        // Return the shorted data as an object
        return {
            song_title: title,
            album_title: albumTitle,
            album_cover: albumCoverImg,
            artist_name: artistName,
            artist_profile: artistProfile,
            artist_pic: artistPic,
            song_duration: duration,
            song_listen: listen
            // song_lyrics: lyrics
        }
    }
    // Search lyrics depending on specific artist and title
    async getLyrics(artist, title) {
        const fetchedLyrics = await fetch(`${this.apiLyrics}${artist}/${title}`);
        const data = await fetchedLyrics.json();
        console.log(data.lyrics);

    }


}

// Handle UI part of Lyrics app =================================
class UI {
    constructor() {
        // All the selectors
        this.displayTitle = document.getElementById('display-title');
        this.displayCard = document.getElementById('display-card');
        this.songTitle = document.getElementById('song-title');
        this.albumCover = document.getElementById('album-cover-img');
        this.albumTitle = document.getElementById('album-title');
        this.artistName = document.getElementById('artist-name');
        this.artistProfile = document.getElementById('artist-link');
        this.artistPicture = document.getElementById('artist-picture');
        this.songDuration = document.getElementById('duration');
        this.songListen = document.getElementById('preview');
        this.songLyrics = document.getElementById('get-lyrics');
    }

    // Display only song title on keyup event
    generateTitle({
        // Object destructuring - receiving song_title as parameter from shortedData argument
        song_title
    }) {
        const titles = [];
        song_title.forEach(title => {
            titles.push += `<p>${title}</P>`
        })
        console.log(titles);
        this.displayTitle.innerHTML = `${titles}`;
        console.log(this.displayTitle)
    }

    // Frontend/UI section - all the data passing here through DOM
    paint({
        // Object destructuring - receiving as parameter from shortedData argument
        song_title,
        album_title,
        album_cover,
        artist_name,
        artist_profile,
        artist_pic,
        song_duration,
        song_listen,
        song_lyrics
    }) {

        this.displayCard.innerHTML = '';

        for (let i = 0; i < 10; i++) {

            this.displayCard.innerHTML += `
                <div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-9">
                        <h3 id="song-title">${song_title[i]}<img id="album-cover-img" src="${album_cover[i]}" alt="">
                        </h3>
                        <p id="album-title">${album_title[i]} by <span id="artist-name"> <a id="artist-link"
                        href="${artist_profile[i]}" target="_blank"> ${artist_name[i]} <img id="artist-picture" src="${artist_pic[i]}" alt=""></a></span>
                        </p>
                        <p id="duration"><i class="fas fa-hourglass-half" aria-hidden="true"></i> Duration: ${song_duration[i]}
                        <span id="preview"><i class="fas fa-music" aria-hidden="true"></i> <a id="" href="${song_listen[i]}" target="_blank"> Listen Now</a></span></p>
                    </div>
                    <div class="col-md-3 ">
                        <button id="get-lyrics" class="btn btn-success">Get Lyrics</button>
                    </div>
                 </div>
                `
        }


        //         console.log(this.displayCard)

    }

}


// Trigger DOM loaded
// document.addEventListener('DOMContentLoaded', defaultResult);

// function defaultResult() {

// }

// Instantiate lyrics
const song = new Song;

// Instantiate ui
const ui = new UI;

// Event Listeners ====================================
document.getElementById('search-input').addEventListener('keyup', (e) => {
    // console.log(e.target.value);
    // Search the song as searchText value
    song.searchSong(e.target.value)
        .then(data => {
            // Short the data as requirement/needed
            const shortedData = song.getShortedData(data)
            // console.log(shortedData);

            // Send shortedData object to display only song title on keyup event
            ui.generateTitle(shortedData);

            // Send this shortedData object to the UI section to connect with DOM and display
            document.getElementById('search').addEventListener('click', () => {
                ui.paint(shortedData);
            })
        })
})





document.getElementById('get-lyrics').addEventListener('click', (e) => {
    // console.log(e.target);
    const artistName = e.target.parentElement.previousElementSibling.children[1].children[0].innerText;
    const songTitle = e.target.parentElement.previousElementSibling.children[0].innerText;

    // Get Lyrics of a specific song
    song.getLyrics();
})