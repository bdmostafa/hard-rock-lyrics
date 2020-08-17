// Instantiate song
const song = new Song;

// Instantiate ui
const ui = new UI;

// Event Listeners ==================================================
// Keyup event when typing and displaying only available titles matching the letters
document.getElementById('search-input').addEventListener('keyup', (e) => {
    // console.log(e.target.value);
    song.searchSong(e.target.value)
        .then(data => {
            // console.log(data[0].title);
            ui.generateTitle(data);
        })
})

// Search click event and displaying the song info
document.getElementById('search').addEventListener('click', (e) => {
    // console.log(e.target.previousElementSibling.value);
    const searchText = e.target.previousElementSibling.value;
    if (searchText !== '') {
        song.searchSong(searchText)
            .then(data => {
                // Minimize the data as requirement/needed (10 data only)
                const minimizedData = song.getMinimizedData(data)
                // console.log(shortedData);

                // Send this shortedData object to the UI section to connect with DOM and display
                ui.showSongInfo(minimizedData);
            })
    } else {
        ui.showAlert('Please enter a song name', 'dark');
    }
})


// Event delegation - Get Lyrics click event and display the lyrics
document.getElementById('display-card').addEventListener('click', (e) => {
    if (e.target.innerText === 'Get Lyrics') {
        const artistName = e.target.parentElement.previousElementSibling.children[1].children[0].innerText;
        const songTitle = e.target.parentElement.previousElementSibling.children[0].innerText;
        // console.log(artistName, songTitle);

        // Get Lyrics of a specific song
        song.getLyrics(artistName, songTitle)
            .then(data => {
                // console.log(data.song_lyrics);

                // Send lyrics data to UI section to connect with DOM
                ui.showLyrics(songTitle, data.song_lyrics);
            });
    }
})