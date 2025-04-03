document.addEventListener("DOMContentLoaded", function () {
    const questions = [
        { question: "What is the capital of France?", choices: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
        { question: "What is the highest mountain in the world?", choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"], answer: "Everest" },
        { question: "What is the largest country by area?", choices: ["Russia", "China", "Canada", "United States"], answer: "Russia" },
        { question: "Which is the largest planet in our solar system?", choices: ["Earth", "Jupiter", "Mars", "Saturn"], answer: "Jupiter" },
        { question: "What is the capital of Canada?", choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"], answer: "Ottawa" }
    ];

    const questionsElement = document.getElementById("questions");
    const submitButton = document.getElementById("submit");
    const scoreDisplay = document.getElementById("score");
    const progressKey = "progress";
    const scoreKey = "score";

    function loadProgress() {
        const savedProgress = JSON.parse(sessionStorage.getItem(progressKey)) || {};
        questions.forEach((q, index) => {
            const questionElement = document.createElement("div");
            questionElement.innerHTML = `<p>${q.question}</p>`;
            q.choices.forEach(choice => {
                const choiceElement = document.createElement("input");
                choiceElement.type = "radio";
                choiceElement.name = `question-${index}`;
                choiceElement.value = choice;
                if (savedProgress[index] === choice) {
                    choiceElement.checked = true;
                }
                choiceElement.addEventListener("change", () => saveProgress(index, choice));
                questionElement.appendChild(choiceElement);
                questionElement.appendChild(document.createTextNode(choice));
            });
            questionsElement.appendChild(questionElement);
        });
    }

    function saveProgress(questionIndex, answer) {
        const savedProgress = JSON.parse(sessionStorage.getItem(progressKey)) || {};
        savedProgress[questionIndex] = answer;
        sessionStorage.setItem(progressKey, JSON.stringify(savedProgress));
        console.log("Saved Progress:", savedProgress); // Debugging
    }

    function calculateScore() {
        const savedProgress = JSON.parse(sessionStorage.getItem(progressKey)) || {};
        let score = 0;
        questions.forEach((q, index) => {
            if (savedProgress[index] === q.answer) {
                score++;
            }
        });
        return score;
    }

    function submitQuiz() {
        const finalScore = calculateScore();
        scoreDisplay.innerText = `Your score is ${finalScore} out of 5.`;
        localStorage.setItem(scoreKey, finalScore);
        console.log("Stored Score:", finalScore); // Debugging
    }

    function loadFinalScore() {
        const savedScore = localStorage.getItem(scoreKey);
        if (savedScore !== null) {
            scoreDisplay.innerText = `Your score is ${savedScore} out of 5.`;
        }
    }

    submitButton.addEventListener("click", submitQuiz);
    loadProgress();
    loadFinalScore();

    // Debugging: Ensure saved progress is correctly retrieved
    console.log("Loaded Progress:", JSON.parse(sessionStorage.getItem(progressKey)));
});
