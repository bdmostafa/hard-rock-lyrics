// Handle backend part of Lyrics Search app =======================================
class Song {
    constructor() {
        this.apiSong = 'https://api.lyrics.ovh/suggest/';
        this.apiLyrics = 'https://api.lyrics.ovh/v1/';

    }

    // Search song data with all the properties, values
    async searchSong(searchText) {
        try {
            // Fetching the song info from API
            const fetchedData = await fetch(`${this.apiSong}${searchText}`);
            const responseData = await fetchedData.json();
            // console.log(responseData.data);

            // loading only 10 data as required
            let data = [];
            for (let i = 0; i < 10; i++) {
                data.push(responseData.data[i]);
            }
            // console.log(data);
            return [...data];

        } catch (err) {
            console.log(err);
        }
    }

    // Minimize the data from the whole response data
    getMinimizedData(data) {
        // Initialization
        const title = [];
        const albumTitle = [];
        const albumCoverImg = [];
        const artistName = [];
        const artistProfile = [];
        const artistPic = [];
        const duration = [];
        const listen = [];

        // Collecting all the necessary data
        data.forEach(data => {
            // console.log(data)
            title.push(data.title);
            albumTitle.push(data.album.title);
            albumCoverImg.push(data.album.cover);
            artistName.push(data.artist.name);
            artistProfile.push(data.artist.link);
            artistPic.push(data.artist.picture);
            duration.push(`${(data.duration/60).toFixed(2)}m`);
            listen.push(data.preview);
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
        }
    }

    // Search lyrics depending on specific artist and title
    async getLyrics(artist, title) {
        try {
            // Fetching the lyrics from API
            const fetchedLyrics = await fetch(`${this.apiLyrics}${artist}/${title}`);
            const data = await fetchedLyrics.json();
            // console.log(data.lyrics);

            return {
                song_lyrics: data
            }

        } catch (err) {
            console.log(err);
        }
    }
}