// Application Constants
// Centralized configuration for magic numbers and settings

const APP_CONFIG = {
    // Animation settings
    ANIMATION: {
        DEFAULT_SPEED: 50,
        SPEED_MULTIPLIER: 0.02,
        NUCLEUS_VIBRATION: 1.5,
        ELECTRON_COUNT_SHELL_1: 2,
        ELECTRON_COUNT_SHELL_2: 4,
    },

    // Grid and layout
    GRID: {
        MIN_CARD_WIDTH: 300,
        GAP: 25,
    },

    // Visualization dimensions
    VIZ: {
        CENTER_X: 400,
        CENTER_Y: 200,
        NUCLEUS_RADIUS: 45,
        SHELL_RADII: [90, 140, 190],
        ORBIT_RX: 250,
        ORBIT_RY: 120,
    },

    // Colors
    COLORS: {
        NUCLEUS: '#6366f1',
        NUCLEUS_STROKE: '#3b82f6',
        ELECTRON_SHELL_1: '#60a5fa',
        ELECTRON_SHELL_2: '#34d399',
        ELECTRON_SHELL_3: '#fbbf24',
        PROTON: '#ef4444',
        NEUTRON: '#94a3b8',
        ELECTRON: '#3b82f6',
    },

    // Quiz settings
    QUIZ: {
        QUESTIONS_PER_QUIZ: 10,
        OPTIONS_COUNT: 4,
    },

    // LocalStorage keys
    STORAGE: {
        LEARNED_WORDS: 'physics_vocab_learned',
        SCORE: 'physics_vocab_score',
    },

    // DOM selectors (cache for performance)
    SELECTORS: {
        WORD_GRID: '#word-grid',
        SEARCH_INPUT: '#search-input',
        WORD_MODAL: '#word-modal',
        VISUALIZATION_AREA: '#visualization-area',
        VISUALIZATION_CONTROLS: '#visualization-controls',
        INTERACTIVE_TEXT: '#interactive-text',
        QUIZ_CONTENT: '#quiz-content',
        SCORE_DISPLAY: '#score-display',
        PROGRESS_DISPLAY: '#progress-display',
        TOTAL_WORDS: '#total-words',
        LEARNED_WORDS: '#learned-words',
        QUIZ_SCORE: '#quiz-score',
    },

    // Accessibility
    A11Y: {
        MODAL_ROLE: 'dialog',
        MODAL_LABEL: 'word-detail-modal',
        LIVE_REGION_ROLE: 'status',
    }
};

// Utility function to safely get element by ID
function getElement(id) {
    const element = document.getElementById(id);
    if (!element) {
        console.warn(`Element with id "${id}" not found`);
    }
    return element;
}

// Safe localStorage operations with error handling
const Storage = {
    get(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error writing to localStorage:', error);
            return false;
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { APP_CONFIG, getElement, Storage };
}

// Translations object for UI text
window.translations = {
    close: 'إغلاق',
    next: 'التالي',
    previous: 'السابق',
    correct: 'صحيح!',
    incorrect: 'خطأ',
    quizComplete: 'اكتمل الاختبار',
    tryAgain: 'حاول مرة أخرى'
};

// PhET Interactive Simulations Configuration - Updated with correct HTML5 URLs
const PHET_SIMULATIONS = {
    'interactive-atom': {
        url: 'https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_en.html',
        simId: 'build-an-atom',
        title: 'Build an Atom',
        titleAr: 'بناء الذرة'
    },
    'nucleus-zoom': {
        url: 'https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_en.html',
        simId: 'build-an-atom',
        title: 'Build an Atom',
        titleAr: 'بناء الذرة'
    },
    'atom-cross-section': {
        url: 'https://phet.colorado.edu/sims/html/rutherford-scattering/latest/rutherford-scattering_en.html',
        simId: 'rutherford-scattering',
        title: 'Rutherford Scattering',
        titleAr: 'تشتت رذرفورد'
    },
    'electron-cloud': {
        url: 'https://phet.colorado.edu/sims/html/models-of-the-hydrogen-atom/latest/models-of-the-hydrogen-atom_en.html',
        simId: 'models-of-the-hydrogen-atom',
        title: 'Models of the Hydrogen Atom',
        titleAr: 'نماذج ذرة الهيدروجين'
    },
    'probability-cloud': {
        url: 'https://phet.colorado.edu/sims/html/models-of-the-hydrogen-atom/latest/models-of-the-hydrogen-atom_en.html',
        simId: 'models-of-the-hydrogen-atom',
        title: 'Models of the Hydrogen Atom',
        titleAr: 'نماذج ذرة الهيدروجين'
    },
    'cloud-density': {
        url: 'https://phet.colorado.edu/sims/html/models-of-the-hydrogen-atom/latest/models-of-the-hydrogen-atom_en.html',
        simId: 'models-of-the-hydrogen-atom',
        title: 'Models of the Hydrogen Atom',
        titleAr: 'نماذج ذرة الهيدروجين'
    },
    'electron-transition': {
        url: 'https://phet.colorado.edu/sims/html/models-of-the-hydrogen-atom/latest/models-of-the-hydrogen-atom_en.html',
        simId: 'models-of-the-hydrogen-atom',
        title: 'Models of the Hydrogen Atom',
        titleAr: 'نماذج ذرة الهيدروجين'
    },
    'quantum-steps': {
        url: 'https://phet.colorado.edu/sims/html/models-of-the-hydrogen-atom/latest/models-of-the-hydrogen-atom_en.html',
        simId: 'models-of-the-hydrogen-atom',
        title: 'Models of the Hydrogen Atom',
        titleAr: 'نماذج ذرة الهيدروجين'
    },
    'discrete-steps': {
        url: 'https://phet.colorado.edu/sims/html/models-of-the-hydrogen-atom/latest/models-of-the-hydrogen-atom_en.html',
        simId: 'models-of-the-hydrogen-atom',
        title: 'Models of the Hydrogen Atom',
        titleAr: 'نماذج ذرة الهيدروجين'
    },
    'electron-ejection': {
        url: 'https://phet.colorado.edu/sims/html/photoelectric/latest/photoelectric_en.html',
        simId: 'photoelectric',
        title: 'Photoelectric Effect',
        titleAr: 'التأثير الكهروضوئي'
    },
    'electron-removal': {
        url: 'https://phet.colorado.edu/sims/html/photoelectric/latest/photoelectric_en.html',
        simId: 'photoelectric',
        title: 'Photoelectric Effect',
        titleAr: 'التأثير الكهروضوئي'
    },
    'electron-orbit': {
        url: 'https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_en.html',
        simId: 'build-an-atom',
        title: 'Build an Atom',
        titleAr: 'بناء الذرة'
    },
    'energy-levels': {
        url: 'https://phet.colorado.edu/sims/html/models-of-the-hydrogen-atom/latest/models-of-the-hydrogen-atom_en.html',
        simId: 'models-of-the-hydrogen-atom',
        title: 'Models of the Hydrogen Atom',
        titleAr: 'نماذج ذرة الهيدروجين'
    },
    'bonding-demo': {
        url: 'https://phet.colorado.edu/sims/html/atomic-adventures/latest/atomic-adventures_en.html',
        simId: 'atomic-adventures',
        title: 'Atomic Adventures',
        titleAr: 'مغامرات ذرية'
    },
    'electron-flow': {
        url: 'https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_en.html',
        simId: 'circuit-construction-kit-dc',
        title: 'Circuit Construction Kit: DC',
        titleAr: 'مجموعة بناء الدوائر: تيار مستمر'
    },
    'band-diagram': {
        url: 'https://phet.colorado.edu/sims/html/conductivity/latest/conductivity_en.html',
        simId: 'conductivity',
        title: 'Conductivity',
        titleAr: 'التوصيلية'
    },
    'material-comparison': {
        url: 'https://phet.colorado.edu/sims/html/resistance-in-a-wire/latest/resistance-in-a-wire_en.html',
        simId: 'resistance-in-a-wire',
        title: 'Resistance in a Wire',
        titleAr: 'المقاومة في سلك'
    },
    'resistor-demo': {
        url: 'https://phet.colorado.edu/sims/html/resistance-in-a-wire/latest/resistance-in-a-wire_en.html',
        simId: 'resistance-in-a-wire',
        title: 'Resistance in a Wire',
        titleAr: 'المقاومة في سلك'
    },
    'doping-demo': {
        url: 'https://phet.colorado.edu/sims/html/conductivity/latest/conductivity_en.html',
        simId: 'conductivity',
        title: 'Conductivity',
        titleAr: 'التوصيلية'
    },
    'electron-blockade': {
        url: 'https://phet.colorado.edu/sims/html/resistance-in-a-wire/latest/resistance-in-a-wire_en.html',
        simId: 'resistance-in-a-wire',
        title: 'Resistance in a Wire',
        titleAr: 'المقاومة في سلك'
    },
    'energy-absorption': {
        url: 'https://phet.colorado.edu/sims/html/states-of-matter/latest/states-of-matter_en.html',
        simId: 'states-of-matter',
        title: 'States of Matter',
        titleAr: 'حالات المادة'
    },
    'light-particle': {
        url: 'https://phet.colorado.edu/sims/html/color-vision/latest/color-vision_en.html',
        simId: 'color-vision',
        title: 'Color Vision',
        titleAr: 'رؤية الألوان'
    },
    'wave-spectrum': {
        url: 'https://phet.colorado.edu/sims/html/wave-interference/latest/wave-interference_en.html',
        simId: 'wave-interference',
        title: 'Wave Interference',
        titleAr: 'تداخل الموجات'
    },
    'wave-frequency': {
        url: 'https://phet.colorado.edu/sims/html/wave-on-a-string/latest/wave-on-a-string_en.html',
        simId: 'wave-on-a-string',
        title: 'Wave on a String',
        titleAr: 'موجة على وتر'
    },
    'electron-highway': {
        url: 'https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_en.html',
        simId: 'circuit-construction-kit-dc',
        title: 'Circuit Construction Kit (DC)',
        titleAr: 'مجموعة بناء الدوائر'
    },
    'heat-transfer': {
        url: 'https://phet.colorado.edu/sims/html/energy-forms-and-changes/latest/energy-forms-and-changes_en.html',
        simId: 'energy-forms-and-changes',
        title: 'Energy Forms and Changes',
        titleAr: 'أشكال الطاقة وتحويلاتها'
    },
    'particle-motion': {
        url: 'https://phet.colorado.edu/sims/html/energy-forms-and-changes/latest/energy-forms-and-changes_en.html',
        simId: 'energy-forms-and-changes',
        title: 'Energy Forms and Changes',
        titleAr: 'أشكال الطاقة وتحويلاتها'
    },
    'motion-energy': {
        url: 'https://phet.colorado.edu/sims/html/energy-forms-and-changes/latest/energy-forms-and-changes_en.html',
        simId: 'energy-forms-and-changes',
        title: 'Energy Forms and Changes',
        titleAr: 'أشكال الطاقة وتحويلاتها'
    },
    'transfer-modes': {
        url: 'https://phet.colorado.edu/sims/html/energy-forms-and-changes/latest/energy-forms-and-changes_en.html',
        simId: 'energy-forms-and-changes',
        title: 'Energy Forms and Changes',
        titleAr: 'أشكال الطاقة وتحويلاتها'
    }
};

const PHET_CONFIG = {
    USE_PHET: true,
    FALLBACK_TO_SVG: true,
    IFRAME_WIDTH: '100%',
    IFRAME_HEIGHT: '450px',
    LOADING_MESSAGE: 'جاري تحميل المحاكاة...',
    ERROR_MESSAGE: 'تعذر تحميل المحاكاة'
};
