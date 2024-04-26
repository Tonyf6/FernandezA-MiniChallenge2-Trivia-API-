document.addEventListener('DOMContentLoaded', () => {
    const videoGamesBtn = document.getElementById('videoGamesBtn');
    const sportsBtn = document.getElementById('sportsBtn');
    const scienceBtn = document.getElementById('scienceBtn');
    const getQuestionBtn = document.getElementById('getQuestionBtn');
    const questionDisplay = document.getElementById('question');
    const answerDisplay = document.getElementById('answer');
    const loadingIndicator = document.getElementById('loadingIndicator');
    let category = '15'; 

    videoGamesBtn.addEventListener('click', () => selectCategory('15'));
    sportsBtn.addEventListener('click', () => selectCategory('21'));
    scienceBtn.addEventListener('click', () => selectCategory('17'));
    getQuestionBtn.addEventListener('click', fetchTrivia);

    async function selectCategory(categoryId) {
        category = categoryId;
        await fetchTrivia();
    }

    async function fetchTrivia() {
        loadingIndicator.style.display = 'block'; 
        try {
            const response = await fetch(`https://opentdb.com/api.php?amount=1&type=multiple&category=${category}`);
            const data = await response.json();
            displayQuestion(data);
        } catch (error) {
            console.error('Error fetching trivia:', error);
        } finally {
            loadingIndicator.style.display = 'none'; 
        }
    }

    async function fetchVideoGamesTrivia() {
        try {
            const response = await fetch('https://opentdb.com/api.php?amount=10&category=15'); // Video Games category 
            const data = await response.json();
            displayQuestion(data);
        } catch (error) {
            console.error('Error fetching trivia:', error);
        }
    }

    async function fetchSportsTrivia() {
        try {
            const response = await fetch('https://opentdb.com/api.php?amount=10&category=21'); // Sports category 
            const data = await response.json();
            displayQuestion(data);
        } catch (error) {
            console.error('Error fetching trivia:', error);
        }
    }

    async function fetchScienceTrivia() {
        try {
            const response = await fetch('https://opentdb.com/api.php?amount=10&category=17'); // Science category
            const data = await response.json();
            displayQuestion(data);
        } catch (error) {
            console.error('Error fetching trivia:', error);
        }
    }

    function displayQuestion(data) {
        let question = data.results[0].question;
        const answer = data.results[0].correct_answer;
        
        question = question.replace(/&quot;/g, '"').replace(/&#039;/g, "'");
        questionDisplay.textContent = question;
        answerDisplay.textContent = `Answer: ${answer}`;
    }
});
