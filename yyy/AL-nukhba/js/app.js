/**
 * Main Application Logic for Elite+ Physics Vocabulary
 */

document.addEventListener('DOMContentLoaded', () => {
    // Basic Elements
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');
    const searchInput = document.getElementById('search-input');
    const subjectSelect = document.getElementById('subject-select');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const wordGrid = document.getElementById('word-grid');
    const modal = document.getElementById('word-modal');
    const closeBtn = document.querySelector('.close-btn');

    // State Variables
    let currentFilter = 'all';
    let searchQuery = '';
    let userProgress = JSON.parse(localStorage.getItem('physicsVocab_v2')) || {
        learnedWords: [],
        quizScore: 0,
        quizzesTaken: 0,
        categoryProgress: {
            atomic: 0,
            electrical: 0,
            thermal: 0,
            quantum: 0
        }
    };

    const departmentPanel = document.getElementById('department-panel');
    const departmentInfo = document.getElementById('department-info');

    function renderDepartmentCards() {
        if (!departmentPanel || !window.departments) return;

        const allDept = {
            title: 'الفيزياء (الكل)',
            description: 'تصفح جميع المواضيع الفيزيائية المتاحة. اختر تخصصًا للحصول على كلمات وتركيز مناسب.',
            colleges: ['كلية العلوم', 'كلية الهندسة']
        };

        const deptKeys = ['all', ...Object.keys(window.departments)];
        departmentPanel.innerHTML = '';

        deptKeys.forEach(key => {
            const dept = key === 'all' ? allDept : window.departments[key];
            if (!dept) return;

            const card = document.createElement('div');
            card.className = 'department-card';
            card.dataset.category = key;
            card.innerHTML = `
                <h3>${dept.title}</h3>
                <p>${dept.description}</p>
                <div class="colleges">
                    ${(dept.colleges || []).map(c => `<span class="college">${c}</span>`).join('')}
                </div>
            `;

            card.addEventListener('click', () => setCurrentDepartment(key));
            departmentPanel.appendChild(card);
        });

        updateDepartmentCards();
    }

    function updateDepartmentCards() {
        if (!departmentPanel) return;
        departmentPanel.querySelectorAll('.department-card').forEach(card => {
            const category = card.dataset.category;
            card.classList.toggle('active', category === currentFilter);
        });
    }

    function updateDepartmentInfo(category) {
        if (!departmentInfo) return;

        const dept = category === 'all' ? {
            title: 'الفيزياء (الكل)',
            description: 'تصفح جميع المواضيع الفيزيائية المتاحة. اختر تخصصًا للتركيز على محتوى محدد.',
            colleges: ['كلية العلوم', 'كلية الهندسة']
        } : window.departments?.[category];

        if (!dept) {
            departmentInfo.innerHTML = '';
            return;
        }

        departmentInfo.innerHTML = `
            <h3>${dept.title}</h3>
            <p>${dept.description}</p>
            <ul class="info-list">
                <li><strong>الكليات المستفيدة:</strong></li>
                ${(dept.colleges || []).map(cc => `<li>${cc}</li>`).join('')}
            </ul>
        `;
    }

    function setCurrentDepartment(category) {
        currentFilter = category;
        if (subjectSelect) subjectSelect.value = category;
        filterButtons.forEach(b => b.classList.toggle('active', b.dataset.filter === category));
        renderWordGrid();
        updateDepartmentCards();
        updateDepartmentInfo(category);
    }

    /**
     * Navigation Logic
     */
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            navButtons.forEach(b => b.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(btn.dataset.section).classList.add('active');

            if (btn.dataset.section === 'progress') {
                updateProgressUI();
            }
        });
    });

    /**
     * Search and Filtering Logic
     */
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase();
            renderWordGrid();
        });
    }

    if (subjectSelect) {
        subjectSelect.addEventListener('change', (e) => {
            currentFilter = e.target.value;
            filterButtons.forEach(b => b.classList.toggle('active', b.dataset.filter === currentFilter));
            renderWordGrid();
        });
    }

    if (filterButtons) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                if (subjectSelect) subjectSelect.value = currentFilter;
                renderWordGrid();
            });
        });
    }

    /**
     * Grid Rendering
     */
function speakWord(lang, text) {
    // Stop any ongoing speech
    window.speechSynthesis.cancel();
    
    // Create utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Language and voice settings
    if (lang === 'ar') {
        utterance.lang = 'ar-SA';
        // Prefer Arabic voice if available
        const arabicVoices = speechSynthesis.getVoices().filter(voice => voice.lang.startsWith('ar'));
        if (arabicVoices.length > 0) {
            utterance.voice = arabicVoices[0];
        }
        utterance.rate = 0.9; // Slightly slower for Arabic
    } else {
        utterance.lang = 'en-US';
        const englishVoices = speechSynthesis.getVoices().filter(voice => voice.lang.startsWith('en'));
        if (englishVoices.length > 0) {
            utterance.voice = englishVoices.find(v => v.name.includes('US') || v.lang === 'en-US') || englishVoices[0];
        }
        utterance.rate = 0.85;
    }
    
    utterance.volume = 1;
    utterance.pitch = 1;
    
    // Event listeners for accessibility
    utterance.onend = () => {
        const a11y = document.getElementById('a11y-speak');
        if (a11y) a11y.textContent = 'تم الانتهاء من النطق';
    };
    
    utterance.onerror = (event) => {
        console.warn('TTS Error:', event.error);
    };
    
    // Speak
    window.speechSynthesis.speak(utterance);
}

// Wait for voices to load and ensure TTS ready
let voicesLoaded = false;
window.speechSynthesis.onvoiceschanged = () => {
    voicesLoaded = true;
    console.log('TTS voices loaded:', speechSynthesis.getVoices().length);
};

// Fallback speak function
window.safeSpeak = function(lang, text) {
    window.speechSynthesis.cancel();
    if (!voicesLoaded) {
        // Retry after short delay if voices not ready
        setTimeout(() => window.safeSpeak(lang, text), 100);
        return;
    }
    speakWord(lang, text);
}; 

function renderWordGrid() {
        if (!wordGrid) return;
        wordGrid.innerHTML = '';

        const wordsToRender = physicsVocabulary.filter(word => {
            const matchesCategory = currentFilter === 'all' || word.category === currentFilter;
            const matchesSearch = word.word.toLowerCase().includes(searchQuery) ||
                                  word.english.toLowerCase().includes(searchQuery);
            return matchesCategory && matchesSearch;
        });

        if (wordsToRender.length === 0) {
            wordGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); font-size: 1.2rem;">لم يتم العثور على مصطلحات مطابقة للبحث.</p>';
            return;
        }

        wordsToRender.forEach(word => {
            const isLearned = userProgress.learnedWords.includes(word.id);
            const card = document.createElement('div');
            card.className = 'word-card';
            card.innerHTML = `

<div class="word-title">
    <div class="arabic-group">
        <span class="term-arabic">${word.word}</span>
        <button class="audio-btn arabic" onclick="safeSpeak('ar', \`${word.word}\`)" title="نطق عربي"></button>
</xai:function_call name="edit_file">

<xai:function_call name="edit_file">
<parameter name="path">js/app.js
    </div>
    <div class="english-group">
        <button class="audio-btn english" onclick="safeSpeak('en', \`${word.english}\`)" title="نطق إنجليزي"></button>
</xai:function_call name="edit_file">

        <span class="term-english">${word.english}</span>
    </div>
</div>

                <p class="card-preview">${word.definition}</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span class="category-tag">${wordCategories[word.category]?.name || word.category}</span>
                    <span class="learned-indicator">${isLearned ? '✔️' : ''}</span>
                </div>
            `;

            card.addEventListener('click', (e) => {
                // Don't open modal if clicking audio button
                if (e.target.classList.contains('audio-btn')) return;
                openModal(word);
            });
            wordGrid.appendChild(card);
        });
    }

    /**
     * Modal and Visualization Logic
     */
    const modalArabic = document.getElementById('modal-arabic');
    const modalEnglish = document.getElementById('modal-word');
    const modalCategory = document.getElementById('modal-category');
    const modalDefinition = document.getElementById('modal-definition');
    const interactiveText = document.getElementById('interactive-text');
    const visualizationArea = document.getElementById('visualization-area');
    const visualizationControls = document.getElementById('visualization-controls');

    function openModal(word) {
        if (!modal) return;
        
        modalArabic.textContent = word.word;
        modalEnglish.textContent = word.english;
        modalCategory.textContent = wordCategories[word.category]?.name || word.category;
        modalDefinition.textContent = word.definition;
        
        // Setup interactive text if available
        const contextHtml = word.contextText || word.context;
        if (contextHtml) {
            interactiveText.innerHTML = contextHtml;
        } else {
            interactiveText.innerHTML = "<em>لا توجد معلومات إضافية حالياً.</em>";
        }

        // Setup Visualization
        visualizationArea.innerHTML = '';
        visualizationControls.innerHTML = '';

        const simKey = word.phetSim || word.visualization?.type;
        if (simKey) {
            const simEntry = PHET_SIMULATIONS[simKey];
            const simUrl = typeof simEntry === 'string' ? simEntry : simEntry?.url;
            if (simUrl) {
                const iframe = document.createElement('iframe');
                iframe.src = simUrl;
                iframe.allowFullscreen = true;
                iframe.title = 'محاكاة تفاعلية لمفهوم';
                visualizationArea.appendChild(iframe);
            } else {
                visualizationArea.innerHTML = '<div style="color: white; padding: 2rem; text-align: center;">المحاكاة غير متوفرة حالياً.</div>';
            }
        } else if (word.visualization) {
            // Basic fallback purely CSS/JS based if PhET is not available
            visualizationArea.innerHTML = `
                <div style="color: white; padding: 2rem; display: flex; align-items: center; justify-content: center; height: 100%;">
                    <p>رسم توضيحي لـ قريباً...</p>
                </div>
            `;
        } else {
            visualizationArea.innerHTML = `
                <div style="color: white; padding: 2rem; display: flex; align-items: center; justify-content: center; height: 100%;">
                    <p>لا يتوفر شرح تفاعلي لهذا المفهوم.</p>
                </div>
            `;
        }

        modal.classList.add('fullscreen');
        modal.style.display = 'block';
        
        // Mark as learned when viewed
        if (!userProgress.learnedWords.includes(word.id)) {
            userProgress.learnedWords.push(word.id);
            saveProgress();
            renderWordGrid(); // update checkmarks
        }
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
             modal.style.display = 'none';
             modal.classList.remove('fullscreen');
             visualizationArea.innerHTML = ''; // Clear iframe to stop audio/running logic
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            modal.classList.remove('fullscreen');
            visualizationArea.innerHTML = '';
        }
    });

    /**
     * Quiz Logic
     */
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const quizContent = document.getElementById('quiz-content');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const scoreDisplay = document.getElementById('score-display');
    const progressDisplay = document.getElementById('progress-display');

    let currentQuizQuestions = [];
    let currentQuestionIndex = 0;
    let currentScore = 0;

    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', startQuiz);
    }

    if (nextQuestionBtn) {
        nextQuestionBtn.addEventListener('click', nextQuestion);
    }

    function startQuiz() {
        const availableWords = physicsVocabulary.filter(word => currentFilter === 'all' || word.category === currentFilter);
        if (availableWords.length < 4) {
            alert('لا توجد كلمات كافية في هذا القسم لبدء الاختبار. حاول اختيار قسم أوسع.');
            return;
        }
        
        currentQuizQuestions = generateQuestions(5);
        currentQuestionIndex = 0;
        currentScore = 0;
        
        startQuizBtn.style.display = 'none';
        quizContent.style.display = 'block';
        
        updateQuizHeader();
        showQuestion();
    }

    function generateQuestions(num) {
        let questions = [];
        let pool = physicsVocabulary.filter(word => currentFilter === 'all' || word.category === currentFilter);
        let shuffledWords = [...pool].sort(() => 0.5 - Math.random());
        let selectedWords = shuffledWords.slice(0, num);

        selectedWords.forEach(word => {
            // Generate wrong options
            let wrongOptions = shuffledWords
                .filter(w => w.id !== word.id)
                .slice(0, 3)
                .map(w => w.definition);
            
            let allOptions = [word.definition, ...wrongOptions].sort(() => 0.5 - Math.random());

            questions.push({
                word: word.word,
                english: word.english,
                correctIndex: allOptions.indexOf(word.definition),
                options: allOptions
            });
        });
        return questions;
    }

    function showQuestion() {
        const q = currentQuizQuestions[currentQuestionIndex];
        const optionsHtml = q.options.map((opt, i) => `
            <button class="quiz-option" data-index="${i}">${opt}</button>
        `).join('');

        quizContent.innerHTML = `
            <div class="quiz-question">ما هو التعريف الصحيح لمصطلح: <strong>${q.word} (${q.english})</strong>؟</div>
            <div class="quiz-options">${optionsHtml}</div>
        `;

        document.querySelectorAll('.quiz-option').forEach(btn => {
            btn.addEventListener('click', handleAnswer);
        });
        
        nextQuestionBtn.style.display = 'none';
    }

    function handleAnswer(e) {
        const selectedIndex = parseInt(e.target.dataset.index);
        const q = currentQuizQuestions[currentQuestionIndex];
        
        // Disable all options
        document.querySelectorAll('.quiz-option').forEach(btn => {
            btn.disabled = true;
            btn.style.pointerEvents = 'none';
        });

        if (selectedIndex === q.correctIndex) {
            e.target.classList.add('correct');
            currentScore++;
        } else {
            e.target.classList.add('incorrect');
            const correctBtn = document.querySelector(`.quiz-option[data-index="${q.correctIndex}"]`);
            if (correctBtn) correctBtn.classList.add('correct');
        }

        updateQuizHeader();
        nextQuestionBtn.style.display = 'block';
        
        if (currentQuestionIndex === currentQuizQuestions.length - 1) {
            nextQuestionBtn.textContent = 'إنهاء الاختبار';
        } else {
            nextQuestionBtn.textContent = 'السؤال التالي';
        }
    }

    function nextQuestion() {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < currentQuizQuestions.length) {
            showQuestion();
            updateQuizHeader();
        } else {
            finishQuiz();
        }
    }

    function updateQuizHeader() {
        scoreDisplay.textContent = `الدرجة: ${currentScore}`;
        progressDisplay.textContent = `التقدم: ${currentQuestionIndex + 1}/${currentQuizQuestions.length}`;
    }

    function finishQuiz() {
        const percentage = Math.round((currentScore / currentQuizQuestions.length) * 100);
        
        // Update user stats
        if (percentage > userProgress.quizScore) {
            userProgress.quizScore = percentage;
        }
        userProgress.quizzesTaken++;
        saveProgress();

        quizContent.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <h3 style="font-size: 2rem; color: var(--primary-color);">انتهى الاختبار!</h3>
                <p style="font-size: 1.5rem; margin: 1rem 0;">نتيجتك: ${currentScore} من ${currentQuizQuestions.length} (${percentage}%)</p>
                <button id="restart-quiz-btn" class="btn-primary" style="margin-top: 1rem;">بدء اختبار جديد</button>
            </div>
        `;
        
        nextQuestionBtn.style.display = 'none';
        document.getElementById('restart-quiz-btn').addEventListener('click', startQuiz);
        updateProgressUI();
    }

    /**
     * Progress Logic
     */
    const totalWordsCount = physicsVocabulary.length;
    
    function saveProgress() {
        localStorage.setItem('physicsVocab_v2', JSON.stringify(userProgress));
    }

    function updateProgressUI() {
        const elTotal = document.getElementById('total-words');
        const elLearned = document.getElementById('learned-words');
        const elScore = document.getElementById('quiz-score');

        if (elTotal) elTotal.textContent = totalWordsCount;
        if (elLearned) elLearned.textContent = userProgress.learnedWords.length;
        if (elScore) elScore.textContent = userProgress.quizScore + '%';

        // Calculate Category Progress
        let catCounts = { atomic: 0, electrical: 0, thermal: 0, quantum: 0 };
        let catLearned = { atomic: 0, electrical: 0, thermal: 0, quantum: 0 };

        physicsVocabulary.forEach(word => {
            if (catCounts[word.category] !== undefined) {
                catCounts[word.category]++;
                if (userProgress.learnedWords.includes(word.id)) {
                    catLearned[word.category]++;
                }
            }
        });

        // Update progress bars
        for (const cat in catCounts) {
            const bar = document.getElementById(`${cat}-progress`);
            const header = bar?.closest('.progress-item')?.querySelector('.progress-header');

            if (bar && catCounts[cat] > 0) {
                const percent = Math.round((catLearned[cat] / catCounts[cat]) * 100);
                bar.style.width = `${percent}%`;

                if (header) {
                    const spans = header.querySelectorAll('span');
                    if (spans.length > 1) {
                        spans[1].textContent = `${catLearned[cat]}/${catCounts[cat]}`;
                    }
                }
            }
        }
    }


    // Initialization
    renderDepartmentCards();
    setCurrentDepartment('all');
    updateProgressUI();
});
