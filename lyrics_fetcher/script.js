const form = document.getElementById("form");
const search = document.getElementById("search");
const results = document.getElementById("results");
const more = document.getElementById("more");
const api = "https://api.lyrics.ovh";

//search the song and get data
async function searchSongs(song) {
  const res = await fetch(`${api}/suggest/${song}`);
  const data = await res.json();
  console.log(data);
  showData(data);
}

//Show the songs to DOM
function showData(data) {
  results.innerHTML = `
      <ul class="songs">
        ${data.data
          .map(
            (song) => `<li>
        <span><strong>${song.artist.name}</strong> - ${song.title}</span>
        <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
      </li>`
          )
          .join("")}
      </ul>
    `;

  if (data.prev || data.next) {
    more.innerHTML = `
        ${
          data.prev
            ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
            : ""
        }
        ${
          data.next
            ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
            : ""
        }
      `;
  } else {
    more.innerHTML = "";
  }
}

//to get more songs
async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();

  showData(data);
}

async function getLyrics(artist, songTitle) {
  const res = await fetch(`${api}/v1/${artist}/${songTitle}`);
  const data = await res.json();

  if (data.error) {
    results.innerHTML = data.error;
  } else {
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

    results.innerHTML = `
        <h2><strong>${artist}</strong> - ${songTitle}</h2>
        <span>${lyrics}</span>
    `;
  }

  more.innerHTML = "";
}

//Event listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;
  if (searchTerm.trim()) {
    searchSongs(searchTerm);
  } else {
    alert("Enter the song or artist");
  }
});

results.addEventListener("click", (e) => {
  const clickedEl = e.target;

  if (clickedEl.tagName === "BUTTON") {
    const artist = clickedEl.getAttribute("data-artist");
    const songTitle = clickedEl.getAttribute("data-songtitle");

    getLyrics(artist, songTitle);
  }
});
