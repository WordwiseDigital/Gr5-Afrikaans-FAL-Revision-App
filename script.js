document.addEventListener('DOMContentLoaded', () => {
    const topicSelection = document.getElementById('topic-selection');
    const startButton = document.getElementById('start-button');
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const questionText = document.getElementById('question-text');
    const answerOptions = document.getElementById('answer-options');
    const feedback = document.getElementById('feedback');
    const nextButton = document.getElementById('next-button');
    const scoreSpan = document.getElementById('score');

    let score = 0;
    let currentTopic = '';
    let currentQuestionIndex = 0;
    let questions = [];

    const gameData = {
        'Voornaamwoorde': [
            { question: "Kies die korrekte voornaamwoord: '___ het die boek gelees.'", options: ["Ek", "My", "Myne"], answer: "Ek" },
            { question: "Kies die korrekte voornaamwoord: 'Die hond behoort aan ___.'", options: ["sy", "haar", "hom"], answer: "hom" },
        ],
        'Voorsetsels': [
            { question: "Kies die korrekte voorsetsel: 'Die kat slaap ___ die bed.'", options: ["op", "in", "onder"], answer: "op" },
            { question: "Kies die korrekte voorsetsel: 'Hy gaan ___ die skool.'", options: ["na", "van", "met"], answer: "na" },
        ],
        'Byvoeglike Naamwoorde': [
            { question: "Kies die korrekte byvoeglike naamwoord: 'Die ___ motor ry vinnig.'", options: ["rooi", "sing", "hard"], answer: "rooi" },
            { question: "Identifiseer die byvoeglike naamwoord in die sin: 'Die pragtige blom ruik lekker.'", options: ["pragtige", "blom", "ruik"], answer: "pragtige" },
        ],
        'Selfstandige Naamwoorde': [
            { question: "Wat is die selfstandige naamwoord in die sin: 'Die seun skop die bal.'?", options: ["seun", "skop", "die"], answer: "seun" },
            { question: "Kies die selfstandige naamwoord.", options: ["hardloop", "huis", "gelukkig"], answer: "huis" },
        ],
        'Werkwoorde': [
            { question: "Wat is die werkwoord in die sin: 'Die voël sing in die boom.'?", options: ["sing", "voël", "boom"], answer: "sing" },
            { question: "Kies die werkwoord.", options: ["eet", "stoel", "groot"], answer: "eet" },
        ],
        'Sinonieme': [
            { question: "Wat is 'n sinoniem vir 'bly'?", options: ["gelukkig", "hartseer", "kwaad"], answer: "gelukkig" },
            { question: "Wat is 'n sinoniem vir 'praat'?", options: ["gesels", "luister", "skryf"], answer: "gesels" },
        ],
        'Antonieme': [
            { question: "Wat is die antoniem van 'groot'?", options: ["klein", "lank", "wyd"], answer: "klein" },
            { question: "Wat is die antoniem van 'warm'?", options: ["koud", "hitte", "son"], answer: "koud" },
        ],
        'Meervoude': [
            { question: "Wat is die meervoud van 'hond'?", options: ["honde", "hondde", "honds"], answer: "honde" },
            { question: "Wat is die meervoud van 'boek'?", options: ["boeke", "boeks", "boeken"], answer: "boeke" },
        ],
        'Verkleining': [
            { question: "Wat is die verkleining van 'tafel'?", options: ["tafeltjie", "tafelie", "tafeltjie"], answer: "tafeltjie" },
            { question: "Wat is die verkleining van 'stoel'?", options: ["stoeltjie", "stoelie", "stoelpie"], answer: "stoeltjie" },
        ]
    };

    function loadTopics() {
        for (const topic in gameData) {
            const button = document.createElement('button');
            button.className = 'topic-button';
            button.textContent = topic;
            button.addEventListener('click', () => selectTopic(topic, button));
            topicSelection.appendChild(button);
        }
    }

    function selectTopic(topic, button) {
        currentTopic = topic;
        const buttons = document.querySelectorAll('.topic-button');
        buttons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
    }

    startButton.addEventListener('click', () => {
        if (currentTopic) {
            questions = gameData[currentTopic];
            startScreen.classList.add('hidden');
            gameScreen.classList.remove('hidden');
            currentQuestionIndex = 0;
            score = 0;
            scoreSpan.textContent = score;
            loadQuestion();
        } else {
            alert('Kies asseblief eers n onderwerp!');
        }
    });

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
            feedback.classList.add('hidden');
            nextButton.classList.add('hidden');
        } else {
            endGame();
        }
    });

    function loadQuestion() {
        const question = questions[currentQuestionIndex];
        questionText.textContent = question.question;
        answerOptions.innerHTML = '';
        question.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'answer-button';
            button.textContent = option;
            button.addEventListener('click', () => selectAnswer(option, button));
            answerOptions.appendChild(button);
        });
    }

    function selectAnswer(selectedOption, button) {
        const question = questions[currentQuestionIndex];
        const buttons = document.querySelectorAll('.answer-button');
        buttons.forEach(btn => btn.disabled = true);

        if (selectedOption === question.answer) {
            score++;
            scoreSpan.textContent = score;
            button.classList.add('correct');
            feedback.textContent = 'Reg!';
            feedback.style.color = '#28a745';
        } else {
            button.classList.add('incorrect');
            feedback.textContent = `Verkeerd. Die korrekte antwoord is ${question.answer}.`;
            feedback.style.color = '#dc3545';
        }

        feedback.classList.remove('hidden');
        nextButton.classList.remove('hidden');
    }

    function endGame() {
        gameScreen.classList.add('hidden');
        startScreen.classList.remove('hidden');
        alert(`Speletjie verby! Jou finale telling is ${score}/${questions.length}.`);
        currentTopic = '';
        const buttons = document.querySelectorAll('.topic-button');
        buttons.forEach(btn => btn.classList.remove('selected'));
    }

    loadTopics();
});
