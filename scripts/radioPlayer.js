export const radioPlayerInit = () => {
    const radio = document.querySelector(".radio");
    const radioNavigation = document.querySelector(".radio-navigation");
    const radioItem = document.querySelectorAll(".radio-item");
    const radioCoverImg = document.querySelector(".radio-cover__img");
    const radioStop = document.querySelector(".radio-stop");
    const radioHeader = document.querySelector(".radio-header__big");
    const radioVolume = document.querySelector(".radio-volume");

    const audio = new Audio();
    audio.type = "audio/aac";

    radioStop.disabled = true;

    const changeIconPlay = () => {
        if(audio.paused) {
            radio.classList.remove("play");
            radioStop.classList.add("fa-play");
            radioStop.classList.remove("fa-stop");
        } else {
            radio.classList.add("play");
            radioStop.classList.add("fa-stop");
            radioStop.classList.remove("fa-play");
        }
    }

    radioNavigation.addEventListener("change", event => {
        const target = event.target;
        const parrent = target.closest(".radio-item");
        radioItem.forEach(item => item.classList.remove("select"));
        parrent.classList.add("select");

        const title = parrent.querySelector(".radio-name").textContent;
        radioHeader.textContent = title;

        const img = parrent.querySelector(".radio-img").src;
        radioCoverImg.src = img;

        radioStop.disabled = false;
        audio.src = target.dataset.radioStantion;
        audio.play();
        changeIconPlay();
    })
    radioStop.addEventListener("click", () => {
        if(audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        changeIconPlay();
    })
    radioVolume.addEventListener("input", () => {
        audio.volume = radioVolume.value / 100;
    })
}