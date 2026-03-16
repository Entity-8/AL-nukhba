// Accessibility Module
// Handles ARIA labels, keyboard navigation, and screen reader announcements

class AccessibilityManager {
    constructor() {
        this.liveRegion = null;
        this.init();
    }

    init() {
        this.createLiveRegion();
        this.setupKeyboardNavigation();
    }

    // Create live region for screen reader announcements
    createLiveRegion() {
        this.liveRegion = document.createElement('div');
        this.liveRegion.setAttribute('role', 'status');
        this.liveRegion.setAttribute('aria-live', 'polite');
        this.liveRegion.setAttribute('aria-atomic', 'true');
        this.liveRegion.className = 'sr-only';
        this.liveRegion.style.cssText = `
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        `;
        document.body.appendChild(this.liveRegion);
    }

    // Announce message to screen readers
    announce(message, priority = 'polite') {
        this.liveRegion.setAttribute('aria-live', priority);
        this.liveRegion.textContent = '';
        setTimeout(() => {
            this.liveRegion.textContent = message;
        }, 100);
    }

    // Setup keyboard navigation
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Close modal with Escape
            if (e.key === 'Escape') {
                const modal = document.getElementById('word-modal');
                if (modal && modal.classList.contains('active')) {
                    const app = window.app;
                    if (app && typeof app.closeModal === 'function') {
                        app.closeModal();
                        this.announce('Modal closed');
                    }
                }
            }

            // Navigate quiz options with arrow keys
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                const focused = document.activeElement;
                if (focused && focused.classList.contains('option-btn')) {
                    const options = Array.from(document.querySelectorAll('.option-btn'));
                    const currentIndex = options.indexOf(focused);
                    if (currentIndex < options.length - 1) {
                        options[currentIndex + 1].focus();
                        e.preventDefault();
                    }
                }
            }

            if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                const focused = document.activeElement;
                if (focused && focused.classList.contains('option-btn')) {
                    const options = Array.from(document.querySelectorAll('.option-btn'));
                    const currentIndex = options.indexOf(focused);
                    if (currentIndex > 0) {
                        options[currentIndex - 1].focus();
                        e.preventDefault();
                    }
                }
            }

            // Enter/Space to select option
            if (e.key === 'Enter' || e.key === ' ') {
                const focused = document.activeElement;
                if (focused && focused.classList.contains('option-btn') && !focused.disabled) {
                    focused.click();
                    e.preventDefault();
                }
            }
        });
    }

    // Add ARIA attributes to word cards
    enhanceWordCards() {
        const cards = document.querySelectorAll('.word-card');
        cards.forEach((card, index) => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `View details for ${card.dataset.word || 'word'}`);
            
            // Keyboard activation
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    card.click();
                    e.preventDefault();
                }
            });
        });
    }

    // Add ARIA to quiz options
    enhanceQuizOptions() {
        const options = document.querySelectorAll('.option-btn');
        options.forEach((option, index) => {
            option.setAttribute('role', 'radio');
            option.setAttribute('aria-checked', 'false');
            option.setAttribute('tabindex', index === 0 ? '0' : '-1');
            
            option.addEventListener('click', () => {
                this.announce(`Selected option ${index + 1}`);
            });
        });
    }

    // Add ARIA to modal
    enhanceModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.setAttribute('role', 'dialog');
            modal.setAttribute('aria-modal', 'true');
            modal.setAttribute('aria-labelledby', 'modal-word');
            
            const closeBtn = modal.querySelector('.close-btn');
            if (closeBtn) {
                closeBtn.setAttribute('aria-label', 'Close modal');
            }
        }
    }

    // Add ARIA to navigation
    enhanceNavigation() {
        const navBtns = document.querySelectorAll('.nav-btn');
        navBtns.forEach(btn => {
            btn.setAttribute('role', 'tab');
            btn.setAttribute('aria-selected', btn.classList.contains('active'));
            
            btn.addEventListener('click', () => {
                navBtns.forEach(b => b.setAttribute('aria-selected', 'false'));
                btn.setAttribute('aria-selected', 'true');
            });
        });
    }

    // Add ARIA to progress bars
    enhanceProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        progressBars.forEach(bar => {
            const parent = bar.parentElement;
            const text = parent.nextElementSibling;
            
            if (text) {
                bar.setAttribute('aria-label', text.textContent);
            }
        });
    }

    // Add ARIA to filter buttons
    enhanceFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.setAttribute('role', 'button');
            btn.setAttribute('tabindex', '0');
            
            btn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    btn.click();
                    e.preventDefault();
                }
            });
        });
    }
}

// Initialize accessibility manager
let accessibilityManager;
document.addEventListener('DOMContentLoaded', () => {
    accessibilityManager = new AccessibilityManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AccessibilityManager;
}

