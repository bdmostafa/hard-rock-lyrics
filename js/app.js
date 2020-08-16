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
        console.log(data);
        // As data is array object, return data through destructuring with the help of rest operator
        return [...data];
    }



}




// Trigger DOM loaded
// document.addEventListener('DOMContentLoaded', defaultResult);

// function defaultResult() {

// }

// Instantiate lyrics
const lyrics = new Lyrics;



document.getElementById('search-input').addEventListener('keyup', (e) => {
    console.log(e.target.value);
    lyrics.searchLyrics(e.target.value)
        .then(data => {
            console.log(data)
        })
})