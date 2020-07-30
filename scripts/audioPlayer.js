export const audioPlayerInit = () => {
    const audio = document.querySelector(".audio");
    const audioImg = document.querySelector(".audio-img");
    const audioHeader = document.querySelector(".audio-header");
    const audioPlayer = document.querySelector(".audio-player");
    const audioNavigation = document.querySelector(".audio-navigation");
    const audioButtonPlay = document.querySelector(".audio-button__play");
    const audioTimePassed = document.querySelector(".audio-time__passed");
    const audioProgressTiming = document.querySelector(".audio-progress__timing");
    const audioTimeTotal = document.querySelector(".audio-time__total");
    const audioProgress = document.querySelector(".audio-progress");

    const playList = ["hello", "flow", "speed"];
    let trackIndex = 0;

    const loadTrack = () => {
        const isPlayed = audioPlayer.paused;
        const track = playList[trackIndex];

        audioHeader.textContent = track.toUpperCase();
        audioPlayer.src = `./../audio/${track}.mp3`;
        audioImg.src = `./../audio/${track}.jpg`

        if(isPlayed) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
    }

    const nextTrack = () => {
        if(trackIndex === playList.length - 1) {
            trackIndex = 0;
        } else {
            trackIndex++;
        }
        loadTrack();
     }

    const prevTrack = () => {
        if(trackIndex !== 0) {
            trackIndex--;
        } else {
            trackIndex = playList.length - 1;
        }
        loadTrack();
     }

     const addZero = n => n < 10 ? "0" + n : n;
    
    audioNavigation.addEventListener("click", event => {
        let target = event.target;
        
        if(target.classList.contains("audio-button__play")) {
            
            audio.classList.toggle("play");
            audioButtonPlay.classList.toggle("fa-play");
            audioButtonPlay.classList.toggle("fa-pause");
            
            if(audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
            const track = playList[trackIndex];
            audioHeader.textContent = track.toUpperCase();
        };

        if(target.classList.contains("audio-button__prev")) {
            prevTrack();
        }

        if(target.classList.contains("audio-button__next")) {
            nextTrack();
        }
    });

    audioPlayer.addEventListener("ended", () => {
        nextTrack();
        audioPlayer.play();
    });

    audioPlayer.addEventListener("timeupdate", () => {
        let duration = audioPlayer.duration;
        let currentTime = audioPlayer.currentTime;
        let progress = (currentTime / duration) * 100;

        audioProgressTiming.style.width = progress + "%";

        let minutesPassed = Math.floor(currentTime / 60) || "0";
        let secondsPassed = Math.floor(currentTime % 60) || "0";

        let minutesTotal = Math.floor(duration / 60) || "0";
        let secondsTotal = Math.floor(duration % 60) || "0";

        audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
        audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
    })

    audioProgress.addEventListener("click", event => {
        let x = event.offsetX;
        let allWidth = audioProgress.clientWidth;
        let progress = (x / allWidth) * audioPlayer.duration;
        audioPlayer.currentTime = progress;
    })
};