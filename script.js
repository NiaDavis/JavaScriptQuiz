(function() {
    console.log("Script loaded");

    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const previousButton = document.getElementById('previous');
    const nextButton = document.getElementById('next');
    const progressBar = document.getElementById('progress').querySelector('div');
    const timerContainer = document.getElementById('timer');

    const myQuestions = [
        {
            question: "What is Iron Man's real name?",
            answers: {
                a: "Steve Rogers",
                b: "Bruce Banner",
                c: "Tony Stark"
            },
            correctAnswer: "c"
        },
        {
            question: "What is Captain America's shield made of?",
            answers: {
                a: "Adamantium",
                b: "Vibranium",
                c: "Titanium"
            },
            correctAnswer: "b"
        },
        {
            question: "Who is Thor's brother?",
            answers: {
                a: "Loki",
                b: "Odin",
                c: "Hela"
            },
            correctAnswer: "a"
        },
        {
            question: "What is Black Widow's real name?",
            answers: {
                a: "Natasha Romanoff",
                b: "Wanda Maximoff",
                c: "Carol Danvers"
            },
            correctAnswer: "a"
        },
        {
            question: "Which infinity stone is hidden on Vormir?",
            answers: {
                a: "Soul Stone",
                b: "Mind Stone",
                c: "Power Stone"
            },
            correctAnswer: "a"
        }
    ];

    function buildQuiz() {
        console.log("Building quiz...");
        const output = [];

        myQuestions.forEach((currentQuestion, questionNumber) => {
            const answers = [];
            for (letter in currentQuestion.answers) {
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter} :
                        ${currentQuestion.answers[letter]}
                    </label>`
                );
            }
            output.push(
                `<div class="slide">
                    <div class="question"> ${currentQuestion.question} </div>
                    <div class="answers"> ${answers.join('')} </div>
                </div>`
            );
        });

        quizContainer.innerHTML = output.join('');
        console.log("Quiz built successfully");
    }

    function showResults() {
        console.log("Showing results...");
        const answerContainers = quizContainer.querySelectorAll('.answers');
        let numCorrect = 0;

        myQuestions.forEach((currentQuestion, questionNumber) => {
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            if (userAnswer === currentQuestion.correctAnswer) {
                numCorrect++;
                answerContainer.style.color = 'green';
            } else {
                answerContainer.style.color = 'red';
            }
        });

        let message;
        if (numCorrect >= 4) {
            message = `Marvel Genius! You got ${numCorrect} out of ${myQuestions.length} correct.`;
        } else if (numCorrect >= 2) {
            message = `Marvel Fan! You got ${numCorrect} out of ${myQuestions.length} correct.`;
        } else {
            message = `Needs Improvement! You got ${numCorrect} out of ${myQuestions.length} correct.`;
        }

        resultsContainer.innerHTML = message;
        clearInterval(timer);
        console.log("Results displayed");
    }

    function showSlide(n) {
        console.log(`Showing slide: ${n}`);
        slides[currentSlide].classList.remove('active-slide');
        slides[n].classList.add('active-slide');
        currentSlide = n;
        if (currentSlide === 0) {
            previousButton.style.display = 'none';
        } else {
            previousButton.style.display = 'inline-block';
        }
        if (currentSlide === slides.length - 1) {
            nextButton.style.display = 'none';
            submitButton.style.display = 'inline-block';
        } else {
            nextButton.style.display = 'inline-block';
            submitButton.style.display = 'none';
        }
        updateProgress();
    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    function showPreviousSlide() {
        showSlide(currentSlide - 1);
    }

    function updateProgress() {
        const progress = (currentSlide + 1) / slides.length * 100;
        progressBar.style.width = progress + '%';
        console.log(`Progress updated: ${progress}%`);
    }

    function startTimer(duration) {
        let time = duration;
        timer = setInterval(() => {
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            timerContainer.textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            if (--time < 0) {
                clearInterval(timer);
                showResults();
            }
        }, 1000);
    }

    buildQuiz();

    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    showSlide(currentSlide);
    startTimer(300); // 5 minutes timer

    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);

    console.log("Event listeners added");
})();
