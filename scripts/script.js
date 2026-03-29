// create elements for synonyms
const createElements = (arr) => {
    // console.log(arr);
    const htmlElements = arr.map((el) => `<span class = "btn"> ${el} </span>`);
    return htmlElements.join("");
};

// pronounce word
function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-EN"; // English
    window.speechSynthesis.speak(utterance);
}

// loading spinner manager
const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-section").classList.add("hidden");
    } else {
        document.getElementById("word-section").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
};

const loadLessons = () => {
    let url = "https://openapi.programming-hero.com/api/levels/all";
    fetch(url)
        .then((res) => res.json())
        .then((datas) => displayLessons(datas.data));
};

// button toggling remover active
const removeActive = () => {
    const lessonBtns = document.querySelectorAll(".lesson-btn");
    // console.log(lessonBtns);
    lessonBtns.forEach((btn) => btn.classList.remove("activeBtn"));
};

// load buttons with levels design
const loadLevelWord = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((datas) => {
            removeActive();
            const clickedBtn = document.getElementById(`lesson-btn-${id}`);
            // console.log(clickedBtn);
            clickedBtn.classList.add("activeBtn");
            displayLevelWords(datas.data);
        });
};

// load word details
const loadWordDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    // console.log(url);
    const response = await fetch(url);
    const details = await response.json();
    displayWordDetails(details.data);
    detailsContainer.innerHTML = `
    
    `;
};

// display word details
const displayWordDetails = (details) => {
    console.log(details);
    const detailsContainer = document.getElementById("details-container");
    detailsContainer.innerHTML = `
    <div class="">
                        <h2 class="text-2xl font-bold">${details.word} ( 🎙️ :${details.pronunciation})</h2>
                    </div>
                    <div class="">
                        <h2 class="text-2xl font-bold">Meaning</h2>
                        <p>${details.meaning}</p>
                    </div>
                    <div class="">
                        <h2 class="text-2xl font-bold">Example</h2>
                        <p>${details.sentence}</p>
                    </div>
                    <div class="">
                        <h2 class="text-2xl font-bold">সমার্থক শব্দ গুলো</h2>
                        <div class ="">${createElements(details.synonyms)}</div>
                    </div>
    
    `;
    document.getElementById("my_modal_5").showModal();
};
// display all the words in the card
const displayLevelWords = (words) => {
    const wordContainer = document.getElementById("word-section");
    wordContainer.innerHTML = "";

    // for null objects
    if (words.length == 0) {
        wordContainer.innerHTML = `
        <div class="text-center col-span-full space-y-6 py-6">
            <div class="flex justify-center">
                <img class="" src="./assets/alert-error.png" alt="alert">
            </div>
            <p class="font-bangla text-sm text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bangla text-4xl font-medium">নেক্সট Lesson এ যান</h2>
        </div>
        `;
        manageSpinner(false);
        return;
    }

    words.forEach((word) => {
        // console.log(word);
        const card = document.createElement("div");
        card.innerHTML = `
            <div class="space-y-6 bg-white p-14 md:p-4 lg:p-6 rounded-2xl shadow-sm h-full">
                <h2 class="font-bangla text-3xl font-bold">${word.word ? word.word : "No Word found"}</h2>
                <p class="font-bangla text-xl font-medium">Meaning/Pronounciation</p>
                <h2 class="font-bangla text-3xl font-bold">${word.meaning ? word.meaning : "No meaning found"}/${word.pronunciation ? word.pronunciation : "No pronunciation found"}</h2>
                <div class="flex justify-between">
                    <button onclick = "loadWordDetails(${word.id})" class="btn rounded-xl">
                        <i class="fa-solid fa-circle-info"></i>
                    </button>
                    <button onclick = "pronounceWord('${word.word}')" class="btn rounded-xl">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>
                </div>
            </div>
        `;
        wordContainer.appendChild(card);
    });
    manageSpinner(false);
};

// display lessons
const displayLessons = (lessons) => {
    const btnContainer = document.getElementById("button-container");
    btnContainer.innerHTML = "";

    lessons.forEach((lesson) => {
        // console.log(lesson);
        const btn = document.createElement("div");
        // btn.classList.add('btn btn-outline btn-success');
        btn.innerHTML = `
            <button id = "lesson-btn-${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})" class = "btn btn-outline btn-success lesson-btn">
                <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
            </button>
        `;
        btnContainer.appendChild(btn);
    });
};
loadLessons();

// search words
document.getElementById("btn-search").addEventListener("click", () => {
    removeActive();
    const inputWord = document.getElementById("input-search");
    const searchValue = inputWord.value.trim().toLowerCase();

    const url = `https://openapi.programming-hero.com/api/words/all`;
    fetch(url)
        .then((res) => res.json())
        .then((words) => {
            const allWords = words.data;
            // console.log(allWords);
            const filterWords = allWords.filter((word) =>
                word.word.toLowerCase().includes(searchValue),
            );
            // console.log(filterWords);
            displayLevelWords(filterWords);
        });
});
