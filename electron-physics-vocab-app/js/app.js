// Main Application Logic
// Handles UI interactions, modal management, search, filtering, and highlighting

class PhysicsVocabApp {
    constructor() {
        this.visualizations = new PhysicsVisualizations();
        this.currentWord = null;
        this.learnedWords = new Set();
        this.quizQuestions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderWordGrid();
        this.loadProgress();
        this.updateProgressDisplay();
    }

    setupEventListeners() {
        // Navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchSection(e.target.dataset.section);
            });
        });

        // Search functionality
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleFilter(e.target.dataset.filter);
            });
        });

        // Modal close
        const closeBtn = document.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            this.closeModal();
        });

        // Modal background click
        const modal = document.getElementById('word-modal');
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });

        // Quiz buttons
        const startQuizBtn = document.getElementById('start-quiz-btn');
        const nextQuestionBtn = document.getElementById('next-question-btn');
        
        if (startQuizBtn) {
            startQuizBtn.addEventListener('click', () => {
                this.startQuiz();
            });
        }
        
        if (nextQuestionBtn) {
            nextQuestionBtn.addEventListener('click', () => {
                this.nextQuestion();
            });
        }
    }

    switchSection(sectionName) {
        // Update navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`.nav-btn[data-section="${sectionName}"]`).classList.add('active');

        // Show/hide sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionName).classList.add('active');
    }

    renderWordGrid(words = physicsVocabulary) {
        const grid = document.getElementById('word-grid');
        grid.innerHTML = '';

        words.forEach(word => {
            const card = this.createWordCard(word);
            grid.appendChild(card);
        });
    }

    createWordCard(word) {
        const card = document.createElement('div');
        card.className = `word-card category-${word.category}`;
        card.dataset.id = word.id;

        const categoryBadge = document.createElement('div');
        categoryBadge.className = 'word-category';
        categoryBadge.textContent = wordCategories[word.category].name;

        const title = document.createElement('h3');
        title.className = 'word-title';
        title.textContent = word.word;

        const arabic = document.createElement('div');
        arabic.className = 'word-arabic';
        arabic.textContent = word.arabic;

        const definition = document.createElement('p');
        definition.className = 'word-definition';
        definition.textContent = word.definition;

        const difficulty = document.createElement('div');
        difficulty.className = 'word-difficulty';
        
        const dot = document.createElement('div');
        dot.className = `difficulty-dot ${word.difficulty}`;
        
        const difficultyText = document.createElement('span');
        difficultyText.textContent = word.difficulty.charAt(0).toUpperCase() + word.difficulty.slice(1);

        difficulty.appendChild(dot);
        difficulty.appendChild(difficultyText);

        card.appendChild(categoryBadge);
        card.appendChild(title);
        card.appendChild(arabic);
        card.appendChild(definition);
        card.appendChild(difficulty);

        card.addEventListener('click', () => {
            this.openWordModal(word);
        });

        return card;
    }

    openWordModal(word) {
        this.currentWord = word;
        
        // Update modal content
        document.getElementById('modal-word').textContent = word.word;
        document.getElementById('modal-category').textContent = wordCategories[word.category].name;
        document.getElementById('modal-definition').textContent = word.definition;
        document.getElementById('modal-arabic').textContent = word.arabic;

        // Update category color
        const categoryElement = document.getElementById('modal-category');
        categoryElement.style.backgroundColor = wordCategories[word.category].color;
        categoryElement.style.color = 'white';

        // Create visualization
        const vizContainer = document.getElementById('visualization-area');
        this.visualizations.createVisualization(word.visualization.type, vizContainer, word);

        // Create interactive text
        const textContainer = document.getElementById('interactive-text');
        this.createInteractiveText(textContainer, word);

        // Show modal
        document.getElementById('word-modal').classList.add('active');
        
        // Mark as viewed (for progress tracking)
        this.markWordViewed(word.id);
    }

    createInteractiveText(container, word) {
        container.innerHTML = '';
        
        // Create text with highlighted words
        const text = document.createElement('p');
        text.innerHTML = this.highlightContextText(word.contextText, word.word);
        container.appendChild(text);

        // Add click listeners for all highlighted words
        const highlights = container.querySelectorAll('.highlight-word');
        highlights.forEach(highlight => {
            highlight.addEventListener('mouseenter', (e) => {
                this.showTooltip(e, highlight.dataset.translation);
            });
            
            highlight.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
            
            highlight.addEventListener('click', () => {
                this.showTranslationPopup(highlight.dataset.word, highlight.dataset.translation);
            });
        });
    }

    highlightContextText(text, mainWord) {
        // Split text into words and highlight relevant physics terms
        const physicsTerms = physicsVocabulary.map(w => w.word.toLowerCase());
        const arabicTerms = physicsVocabulary.map(w => w.arabic);
        
        let highlightedText = text;
        
        // Highlight English terms
        physicsTerms.forEach(term => {
            const regex = new RegExp(`\\b${term}\\b`, 'gi');
            highlightedText = highlightedText.replace(regex, (match) => {
                const wordData = physicsVocabulary.find(w => w.word.toLowerCase() === term.toLowerCase());
                return `<span class="highlight-word" data-word="${match}" data-translation="${wordData.arabic}">${match}</span>`;
            });
        });

        return highlightedText;
    }

    showTooltip(event, translation) {
        let tooltip = document.getElementById('tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.id = 'tooltip';
            tooltip.className = 'translation-tooltip';
            document.body.appendChild(tooltip);
        }

        tooltip.textContent = translation;
        tooltip.style.left = event.pageX + 10 + 'px';
        tooltip.style.top = event.pageY + 10 + 'px';
        tooltip.classList.add('show');
    }

    hideTooltip() {
        const tooltip = document.getElementById('tooltip');
        if (tooltip) {
            tooltip.classList.remove('show');
        }
    }

    showTranslationPopup(word, translation) {
        // Create a popup with the translation
        const popup = document.createElement('div');
        popup.style.position = 'fixed';
        popup.style.top = '50%';
        popup.style.left = '50%';
        popup.style.transform = 'translate(-50%, -50%)';
        popup.style.background = 'white';
        popup.style.padding = '20px';
        popup.style.borderRadius = '8px';
        popup.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        popup.style.zIndex = '1000';
        popup.style.textAlign = 'center';

        popup.innerHTML = `
            <h3>${word}</h3>
            <p style="font-size: 1.5rem; direction: rtl; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #6366f1;">
                ${translation}
            </p>
            <button style="margin-top: 15px; padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 5px; cursor: pointer;">
                Close
            </button>
        `;

        document.body.appendChild(popup);

        popup.querySelector('button').addEventListener('click', () => {
            document.body.removeChild(popup);
        });
    }

    closeModal() {
        document.getElementById('word-modal').classList.remove('active');
        this.currentWord = null;
    }

    handleSearch(query) {
        if (query.trim() === '') {
            this.renderWordGrid();
            return;
        }

        const results = searchWords(query);
        this.renderWordGrid(results);
    }

    handleFilter(category) {
        // Update filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`.filter-btn[data-filter="${category}"]`).classList.add('active');

        if (category === 'all') {
            this.renderWordGrid();
        } else {
            const filteredWords = getWordsByCategory(category);
            this.renderWordGrid(filteredWords);
        }
    }

    // Quiz functionality
    startQuiz() {
        this.quizQuestions = this.generateQuizQuestions();
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.showQuestion();
        
        document.getElementById('start-quiz-btn').style.display = 'none';
        document.getElementById('quiz-content').style.display = 'block';
        document.getElementById('next-question-btn').style.display = 'inline-block';
    }

    generateQuizQuestions() {
        const questions = [];
        const words = getRandomWords(10);

        words.forEach(word => {
            const question = {
                word: word.word,
                correctAnswer: word.arabic,
                options: this.generateOptions(word.arabic),
                definition: word.definition
            };
            questions.push(question);
        });

        return questions;
    }

    generateOptions(correctAnswer) {
        const options = [correctAnswer];
        
        // Add 3 wrong answers
        while (options.length < 4) {
            const randomWord = physicsVocabulary[Math.floor(Math.random() * physicsVocabulary.length)];
            const randomAnswer = randomWord.arabic;
            if (!options.includes(randomAnswer)) {
                options.push(randomAnswer);
            }
        }

        // Shuffle options
        return options.sort(() => Math.random() - 0.5);
    }

    showQuestion() {
        const question = this.quizQuestions[this.currentQuestionIndex];
        const content = document.getElementById('quiz-content');
        
        content.innerHTML = `
            <div class="question-text">
                What is the Arabic translation of: <strong>${question.word}</strong>
            </div>
            <div class="options-grid">
                ${question.options.map(option => `
                    <button class="option-btn" data-answer="${option}">
                        ${option}
                    </button>
                `).join('')}
            </div>
        `;

        // Add event listeners to options
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.checkAnswer(e.target, question.correctAnswer);
            });
        });

        this.updateQuizStats();
    }

    checkAnswer(selectedBtn, correctAnswer) {
        const selectedAnswer = selectedBtn.dataset.answer;
        const isCorrect = selectedAnswer === correctAnswer;

        // Disable all options
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.disabled = true;
            if (btn.dataset.answer === correctAnswer) {
                btn.classList.add('correct');
            } else {
                btn.classList.add('wrong');
            }
        });

        if (isCorrect) {
            this.score++;
            selectedBtn.classList.add('correct');
        } else {
            selectedBtn.classList.add('wrong');
        }

        // Update progress
        this.updateQuizStats();
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        
        if (this.currentQuestionIndex >= this.quizQuestions.length) {
            this.showQuizResults();
        } else {
            this.showQuestion();
        }
    }

    showQuizResults() {
        const content = document.getElementById('quiz-content');
        const percentage = Math.round((this.score / this.quizQuestions.length) * 100);
        
        content.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <h2>Quiz Complete!</h2>
                <p style="font-size: 2rem; color: #3b82f6; margin: 20px 0;">${this.score}/${this.quizQuestions.length}</p>
                <p style="font-size: 1.2rem; color: #6b7280;">${percentage}% Correct</p>
                <button class="btn-primary" onclick="app.startQuiz()" style="margin-top: 30px;">Try Again</button>
            </div>
        `;

        // Update overall progress
        this.updateProgressDisplay();
    }

    updateQuizStats() {
        document.getElementById('score-display').textContent = `Score: ${this.score}/${this.currentQuestionIndex + 1}`;
        document.getElementById('progress-display').textContent = `Progress: ${this.currentQuestionIndex + 1}/${this.quizQuestions.length}`;
    }

    // Progress tracking
    markWordViewed(wordId) {
        this.learnedWords.add(wordId);
        this.saveProgress();
        this.updateProgressDisplay();
    }

    saveProgress() {
        localStorage.setItem('physics_vocab_learned', JSON.stringify(Array.from(this.learnedWords)));
        localStorage.setItem('physics_vocab_score', this.score.toString());
    }

    loadProgress() {
        const learned = localStorage.getItem('physics_vocab_learned');
        if (learned) {
            this.learnedWords = new Set(JSON.parse(learned));
        }
        
        const score = localStorage.getItem('physics_vocab_score');
        if (score) {
            this.score = parseInt(score);
        }
    }

    updateProgressDisplay() {
        // Update main progress stats
        document.getElementById('total-words').textContent = physicsVocabulary.length;
        document.getElementById('learned-words').textContent = this.learnedWords.size;
        document.getElementById('quiz-score').textContent = this.score > 0 ? 
            Math.round((this.score / Math.max(1, this.quizQuestions.length)) * 100) + '%' : '0%';

        // Update category progress bars
        const categories = ['atomic', 'electrical', 'thermal', 'quantum'];
        categories.forEach(category => {
            const wordsInCategory = getWordsByCategory(category);
            const learnedInCategory = wordsInCategory.filter(word => this.learnedWords.has(word.id)).length;
            const percentage = Math.round((learnedInCategory / wordsInCategory.length) * 100);
            
            const progressBar = document.getElementById(`${category}-progress`);
            const progressText = progressBar.nextElementSibling;
            
            if (progressBar) {
                progressBar.style.width = `${percentage}%`;
                progressText.textContent = `${learnedInCategory}/${wordsInCategory.length} words`;
            }
        });
    }
}

// Initialize app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new PhysicsVocabApp();
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhysicsVocabApp;
}