// Interactive Physics Visualizations
// Uses PhET Interactive Simulations for all visualizations

class PhysicsVisualizations {
    constructor() {
        this.currentVisualization = null;
        this.animationFrame = null;
        this.isAnimating = false;
        this.params = {};
        this.elements = {};
        this.cleanupCallbacks = [];
    }

    // Main visualization dispatcher - Uses only PhET Simulations
    createVisualization(type, container, wordData) {
        this.stopAnimation();
        this.cleanup();
        
        container.innerHTML = '';
        this.params = {};
        this.elements = {};

        // Always use PhET simulation
        this.createPhETVisualization(type, container, wordData);
    }

    stopAnimation() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
        this.isAnimating = false;
    }

    cleanup() {
        this.cleanupCallbacks.forEach(cb => cb());
        this.cleanupCallbacks = [];
        this.elements = {};
    }

    onCleanup(callback) {
        this.cleanupCallbacks.push(callback);
    }

    updateParam(name, value) {
        this.params[name] = parseFloat(value);
    }

    // PhET Interactive Simulations Integration
    createPhETVisualization(type, container, wordData) {
        const simConfig = PHET_SIMULATIONS[type];
        if (!simConfig) {
            console.warn(`No PhET configuration found for type: ${type}`);
            this.createFallback(container, wordData);
            return;
        }

        // Create container wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'phet-visualization-container';
        Object.assign(wrapper.style, {
            width: '100%',
            height: PHET_CONFIG.IFRAME_HEIGHT,
            borderRadius: '12px',
            overflow: 'hidden',
            position: 'relative',
            background: '#f8fafc'
        });

        // Create loading indicator
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'phet-loading';
        Object.assign(loadingDiv.style, {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            color: '#6366f1',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            zIndex: '1'
        });
        
        // Spinner
        const spinner = document.createElement('div');
        Object.assign(spinner.style, {
            width: '40px',
            height: '40px',
            border: '3px solid #e5e7eb',
            borderTop: '3px solid #6366f1',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
        });
        
        loadingDiv.appendChild(spinner);
        loadingDiv.appendChild(document.createTextNode(PHET_CONFIG.LOADING_MESSAGE));
        wrapper.appendChild(loadingDiv);

        // Create iframe for PhET simulation
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', simConfig.url);
        iframe.setAttribute('title', simConfig.title);
        iframe.setAttribute('allow', 'fullscreen');
        iframe.setAttribute('loading', 'lazy');
        Object.assign(iframe.style, {
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: '12px',
            opacity: '0',
            transition: 'opacity 0.3s ease'
        });

        // Handle iframe load
        iframe.addEventListener('load', () => {
            loadingDiv.style.display = 'none';
            iframe.style.opacity = '1';
        });

        // Handle iframe error
        iframe.addEventListener('error', () => {
            loadingDiv.innerHTML = `<span style="color: #ef4444;">${PHET_CONFIG.ERROR_MESSAGE}</span>
                <a href="${simConfig.url}" target="_blank" style="color: #3b82f6; margin-top: 8px; display: inline-block;">فتح في نافذة جديدة</a>`;
        });

        wrapper.appendChild(iframe);

        // Create title bar
        const titleBar = document.createElement('div');
        titleBar.className = 'phet-title-bar';
        Object.assign(titleBar.style, {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 12px',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            borderRadius: '12px 12px 0 0',
            marginBottom: '-2px',
            position: 'relative',
            zIndex: '2'
        });

        const titleText = document.createElement('span');
        titleText.textContent = simConfig.titleAr || simConfig.title;
        Object.assign(titleText.style, {
            color: 'white',
            fontWeight: '600',
            fontSize: '14px',
            fontFamily: 'Inter, sans-serif'
        });

        const openNewBtn = document.createElement('a');
        openNewBtn.href = simConfig.url;
        openNewBtn.target = '_blank';
        openNewBtn.title = 'فتح في نافذة جديدة';
        Object.assign(openNewBtn.style, {
            color: 'white',
            textDecoration: 'none',
            padding: '4px 8px',
            borderRadius: '4px',
            background: 'rgba(255,255,255,0.2)',
            fontSize: '12px',
            transition: 'background 0.2s'
        });
        openNewBtn.textContent = '⧉';

        titleBar.appendChild(titleText);
        titleBar.appendChild(openNewBtn);

        // Create main container
        const mainContainer = document.createElement('div');
        Object.assign(mainContainer.style, {
            display: 'flex',
            flexDirection: 'column',
            gap: '0'
        });

        // Add CSS for spinner animation if not exists
        if (!document.getElementById('phet-spinner-style')) {
            const style = document.createElement('style');
            style.id = 'phet-spinner-style';
            style.textContent = `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }

        mainContainer.appendChild(titleBar);
        mainContainer.appendChild(wrapper);
        container.appendChild(mainContainer);
    }

    // Simple fallback without SVG
    createFallback(container, wordData) {
        const fallbackDiv = document.createElement('div');
        Object.assign(fallbackDiv.style, {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '300px',
            background: '#f8fafc',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center'
        });

        const title = document.createElement('h3');
        title.textContent = (wordData.word || '').toUpperCase();
        Object.assign(title.style, {
            color: '#6366f1',
            fontSize: '24px',
            marginBottom: '10px',
            fontFamily: 'Inter, sans-serif'
        });

        const arabic = document.createElement('p');
        arabic.textContent = wordData.arabic || '';
        Object.assign(arabic.style, {
            color: '#8b5cf6',
            fontSize: '28px',
            fontWeight: '600',
            fontFamily: 'Segoe UI, sans-serif',
            marginBottom: '10px'
        });

        const message = document.createElement('p');
        message.textContent = 'المحاكاة قيد التطوير';
        Object.assign(message.style, {
            color: '#64748b',
            fontSize: '14px'
        });

        fallbackDiv.appendChild(title);
        fallbackDiv.appendChild(arabic);
        fallbackDiv.appendChild(message);
        container.appendChild(fallbackDiv);
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhysicsVisualizations;
}

