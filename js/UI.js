// Handle Frontend/UI section part of Lyrics Search app =================================
class UI {
    constructor() {
        // All the necessary selectors
        this.displayTitle = document.getElementById('display-title');
        this.displayCard = document.getElementById('display-card');
        this.displayLyrics = document.getElementById('display-lyrics');
        this.searchInput = document.getElementById('search-input');
    }

    // Display only song title on keyup event
    generateTitle(data) {
        this.displayCard.innerHTML = '';
        this.displayTitle.innerHTML = '';
        const titles = [];
        data.forEach(title => {
            titles.push(`<p>${title.title}</P>`);
        })
        this.displayTitle.innerHTML = `${titles.join(' ')}`
    }

    //  All the song data passing here and display through DOM
    showSongInfo({
        // Object destructuring - receiving as parameter from minimizedData argument
        song_title,
        album_title,
        album_cover,
        artist_name,
        artist_profile,
        artist_pic,
        song_duration,
        song_listen
    }) {
        this.searchInput.value = '';
        this.displayTitle.innerHTML = '';
        this.displayCard.innerHTML = '';

        // Assigning the values through looping
        for (let i = 0; i < song_title.length; i++) {
            // HTML template for displayCard
            this.displayCard.innerHTML += `
                <div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-9">
                        <h3>${song_title[i]}<img id="album-cover-img" src="${album_cover[i]}" alt="">
                        </h3>
                        <p>${album_title[i]} by <span> <a id="artist-link"
                        href="${artist_profile[i]}" target="_blank"> ${artist_name[i]} <img id="artist-picture" src="${artist_pic[i]}" alt=""></a></span>
                        </p>
                        <p><i class="fas fa-hourglass-half" aria-hidden="true"></i> Duration: ${song_duration[i]}
                        <span id="preview"><i class="fas fa-music" aria-hidden="true"></i> <a href="${song_listen[i]}" target="_blank"> Listen Now</a></span></p>
                    </div>
                    <div class="col-md-3 ">
                        <button class="btn btn-success get-lyrics">Get Lyrics</button>
                    </div>
                </div>
            `
        }
    };

    // Display lyrics of a specific song
    showLyrics(title, lyrics) {
        // console.log(title, lyrics.lyrics);
        this.displayLyrics.innerHTML = '';

        // Display lyrics when available otherwise display 'not found'
        this.displayLyrics.innerHTML = `
                <button class="btn go-back">&lsaquo;</button>
                <h2 class="text-success mb-4">${title}</h2>
                <pre class="lyric text-white">${lyrics.lyrics || lyrics.error}</pre>
            `
    };

    // Show alert dynamically
    showAlert(message, className) {
        // Selectors
        const searchAreaTop = document.getElementById('search-area-top');
        const headingLine = document.getElementById('heading');

        // Creating div element
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.textContent = message;

        // Alert message position 
        searchAreaTop.insertBefore(div, headingLine);

        // Removing alert after 1 second automatically
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 1000);
    };
};