document.addEventListener("DOMContentLoaded", function() {
    const planet1Span = document.getElementById("planet1");
    const planet2Span = document.getElementById("planet2");
    const guessInput = document.getElementById("guess");
    const submitButton = document.getElementById("submitGuess");
    const feedbackDiv = document.getElementById("feedback");
    const scoreValueSpan = document.getElementById("scoreValue");
    const newGameButton = document.getElementById("newGame");

    const planets = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"];
    // Average distances in millions of kilometers
    const distances = {
        "Mercury-Venus": 77,
        "Mercury-Earth": 91.7,
        "Mercury-Mars": 145,
        "Mercury-Jupiter": 628,
        "Mercury-Saturn": 1275,
        "Mercury-Uranus": 2720,
        "Mercury-Neptune": 4350,
        "Venus-Earth": 41.4,
        "Venus-Mars": 75,
        "Venus-Jupiter": 589,
        "Venus-Saturn": 1240,
        "Venus-Uranus": 2690,
        "Venus-Neptune": 4320,
        "Earth-Mars": 78.3,
        "Earth-Jupiter": 628.7,
        "Earth-Saturn": 1277,
        "Earth-Uranus": 2723,
        "Earth-Neptune": 4352,
        "Mars-Jupiter": 546,
        "Mars-Saturn": 1200,
        "Mars-Uranus": 2650,
        "Mars-Neptune": 4280,
        "Jupiter-Saturn": 650,
        "Jupiter-Uranus": 2090,
        "Jupiter-Neptune": 3720,
        "Saturn-Uranus": 1430,
        "Saturn-Neptune": 3060,
        "Uranus-Neptune": 1620
    };

    let planet1, planet2, correctAnswer, score = 0;

    function newQuestion() {
        planet1 = planets[Math.floor(Math.random() * planets.length)];
        planet2 = planets[Math.floor(Math.random() * planets.length)];

        // Ensure planets are different
        while (planet1 === planet2) {
            planet2 = planets[Math.floor(Math.random() * planets.length)];
        }

        planet1Span.textContent = planet1;
        planet2Span.textContent = planet2;

        // Get the distance (using a consistent key format)
        let key = [planet1, planet2].sort().join("-");

        // Check for reversed order of planets if the key isn't found
        if (!(key in distances)) {
            key = [planet2, planet1].sort().join("-"); // Try the other way around
        }

        correctAnswer = distances[key];

        if (correctAnswer === undefined) {
            console.error(`Distance data not found for ${planet1} and ${planet2}`);
            feedbackDiv.textContent = "Error: Distance data not available. Please try again.";
            correctAnswer = 0; // To avoid NaN issues
        }
    }

    function checkGuess() {
        const guessValue = guessInput.value;

        if (guessValue === "") {
            feedbackDiv.textContent = "Please enter a guess.";
            return;
        }

        const guess = parseInt(guessValue);

        if (isNaN(guess)) {
            feedbackDiv.textContent = "Invalid input. Please enter a number.";
            guessInput.value = "";
            return;
        }

        console.log("User's Guess:", guess); //log users guess

        const difference = Math.abs(guess - correctAnswer);

        if (difference <= 50) {
            feedbackDiv.textContent = "Correct! Great job!";
            score++;
        } else {
            feedbackDiv.textContent = `Incorrect. The correct distance is approximately ${correctAnswer} million km.`;
            score = Math.max(0, score - 1); // Don't let score go below 0
        }

        scoreValueSpan.textContent = score;
        guessInput.value = "";
        newQuestion();
    }

    newGameButton.addEventListener("click", function() {
        score = 0;
        scoreValueSpan.textContent = score;
        feedbackDiv.textContent = "";
        newQuestion();
    });

    submitButton.addEventListener("click", checkGuess);

    newQuestion(); // Start the first question
});