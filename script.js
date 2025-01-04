let progressBar = document.getElementById("progress");
let song = document.getElementById("song");
let play = document.getElementById("ctrlIcon");
const imgRotated = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const previous = document.getElementById("prev");
const next = document.getElementById("next");
const songList = document.getElementsByClassName("circle");
const progressArea = document.querySelector("progress_area");
let total_duration = document.getElementById("duration");
let total_currentTime = document.getElementById("current_time");
const progress_div = document.getElementById("progress_div");

const songs = [
    {
        name: "song-1",
        title: "Jogi",
        artist: "Aakanksha Sharma,Yasser Desai",
    },
    {
        name: "song-2",
        title: "Oh Humsafar",
        artist: "Neha kakkar",
    },
    {
        name: "song-3",
        title: "Akhiyaan Milavanga",
        artist: "Arijit Singh, Sruthy Sasidharan",
    },
    {
        name: "song-4",
        title: "Prem Ratan Dhan Payo",
        artist: "Palak Muchhal",
    },
    {
        name: "song-5",
        title: "Kabhi Na Kabhi To Miloge",
        artist: "Aditya Narayan, Suzzanne D'mello & Chirantan Bhatt",
    },
    {
        name: "song-6",
        title: "Ladki",
        artist: "Sachin-Jigar Taniskha",
    },
]

// play song replace icon
let isPlaying = false;
const playMusic = () => {
    isPlaying = true;
    song.play();
    play.classList.replace("fa-play", "fa-pause");
    imgRotated.classList.add("anime");
};

// pause song
const pauseMusic = () => {
    isPlaying = false;
    song.pause();
    play.classList.replace("fa-pause", "fa-play");
    imgRotated.classList.remove("anime");
};

play.addEventListener("click", () => {
    isPlaying ? pauseMusic() : playMusic();
});



// change music data

const loadSong = (songs) => {
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    song.src = "music/" + songs.name + ".mp3";
    imgRotated.src = "img/" + songs.name + ".jpg";

}

// loadSong(songs[0]);
songIndex = 0;
const nextSong = () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};

const prevSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};
//progress work
song.addEventListener("timeupdate", (event) => {
    // console.log(event)
    const { currentTime, duration } = event.srcElement;
    let progress_time = (currentTime / duration) * 100;
    progressBar.style.width = `${progress_time}%`;

    // music update
    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);

    let tot_duration = `${min_duration}:${sec_duration}`;
    if (duration) {
        total_duration.textContent = `${tot_duration}`;
    }

    //currenttime update
    let min_currentTime = Math.floor(currentTime / 60);
    let sec_currentTime = Math.floor(currentTime % 60);
    if (sec_currentTime < 10) {
        sec_currentTime = `0${sec_currentTime}`;
    }
    let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
    total_currentTime.textContent = `${tot_currentTime}`;

});

// progress onclick
progress_div.addEventListener("click", (e) => {
    const { duration } = song;

    let move_progress = (e.offsetX / e.srcElement.clientWidth) * duration;
    song.currentTime = move_progress;
});
// move next song after song ended
song.addEventListener("ended", nextSong);

// Change song
next.addEventListener('click', nextSong);
previous.addEventListener('click', prevSong);
