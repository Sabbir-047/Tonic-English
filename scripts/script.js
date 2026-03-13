const loadLessons = () => {
    let url = "https://openapi.programming-hero.com/api/levels/all";
    fetch(url)
        .then((res) => res.json())
        .then((datas) => displayLessons(datas.data));
};

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((datas) => displayLevelWords(datas.data));
};

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
        return;
    }

    words.forEach((word) => {
        console.log(word);
        const card = document.createElement("div");
        card.innerHTML = `
            <div class="space-y-6 bg-white p-14 rounded-2xl shadow-sm h-full">
                <h2 class="font-bangla text-3xl font-bold">${word.word ? word.word : 'No Word found'}</h2>
                <p class="font-bangla text-xl font-medium">Meaning/Pronounciation</p>
                <h2 class="font-bangla text-3xl font-bold">${word.meaning ? word.meaning : "No meaning found"}/${word.pronunciation ? word.pronunciation : 'No pronunciation found'}</h2>
                <div class="flex justify-between">
                    <button class="btn rounded-xl">
                        <i class="fa-solid fa-circle-info"></i>
                    </button>
                    <button class="btn rounded-xl">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>
                </div>
            </div>
        `;
        wordContainer.appendChild(card);
    });
};

const displayLessons = (lessons) => {
    const btnContainer = document.getElementById("button-container");
    btnContainer.innerHTML = "";

    lessons.forEach((lesson) => {
        console.log(lesson);
        const btn = document.createElement("div");
        // btn.classList.add('btn btn-outline btn-success');
        btn.innerHTML = `
            <button onclick = "loadLevelWord(${lesson.level_no})">
                <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
            </button>
        `;
        btn.classList.add("btn", "btn-outline", "btn-success");
        btnContainer.appendChild(btn);
    });
};
loadLessons();
