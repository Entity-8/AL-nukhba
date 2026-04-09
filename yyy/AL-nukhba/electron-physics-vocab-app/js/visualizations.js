// Interactive Physics Visualizations
// SVG-based animations and interactive elements for physics concepts

class PhysicsVisualizations {
    constructor() {
        this.currentVisualization = null;
        this.animationFrame = null;
        this.isAnimating = false;
    }

    // Main visualization dispatcher
    createVisualization(type, container, wordData) {
        // Clear previous visualization
        container.innerHTML = '';
        
        // Create SVG container
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.setAttribute('viewBox', '0 0 800 400');
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        container.appendChild(svg);

        // Dispatch to specific visualization
        switch(type) {
            case 'interactive-atom':
                this.createInteractiveAtom(svg, wordData);
                break;
            case 'electron-orbit':
                this.createElectronOrbit(svg, wordData);
                break;
            case 'nucleus-zoom':
                this.createNucleusZoom(svg, wordData);
                break;
            case 'atom-cross-section':
                this.createAtomCrossSection(svg, wordData);
                break;
            case 'electron-cloud':
                this.createElectronCloud(svg, wordData);
                break;
            case 'energy-levels':
                this.createEnergyLevels(svg, wordData);
                break;
            case 'bonding-demo':
                this.createBondingDemo(svg, wordData);
                break;
            case 'electron-flow':
                this.createElectronFlow(svg, wordData);
                break;
            case 'band-diagram':
                this.createBandDiagram(svg, wordData);
                break;
            case 'material-comparison':
                this.createMaterialComparison(svg, wordData);
                break;
            case 'resistor-demo':
                this.createResistorDemo(svg, wordData);
                break;
            case 'doping-demo':
                this.createDopingDemo(svg, wordData);
                break;
            case 'electron-blockade':
                this.createElectronBlockade(svg, wordData);
                break;
            case 'electron-highway':
                this.createElectronHighway(svg, wordData);
                break;
            case 'quantum-steps':
                this.createQuantumSteps(svg, wordData);
                break;
            case 'heat-transfer':
                this.createHeatTransfer(svg, wordData);
                break;
            case 'particle-motion':
                this.createParticleMotion(svg, wordData);
                break;
            case 'motion-energy':
                this.createMotionEnergy(svg, wordData);
                break;
            case 'transfer-modes':
                this.createTransferModes(svg, wordData);
                break;
            case 'electron-removal':
                this.createElectronRemoval(svg, wordData);
                break;
            case 'energy-absorption':
                this.createEnergyAbsorption(svg, wordData);
                break;
            case 'light-particle':
                this.createLightParticle(svg, wordData);
                break;
            case 'wave-spectrum':
                this.createWaveSpectrum(svg, wordData);
                break;
            case 'wave-frequency':
                this.createWaveFrequency(svg, wordData);
                break;
            case 'electron-transition':
                this.createElectronTransition(svg, wordData);
                break;
            case 'probability-cloud':
                this.createProbabilityCloud(svg, wordData);
                break;
            case 'cloud-density':
                this.createCloudDensity(svg, wordData);
                break;
            case 'discrete-steps':
                this.createDiscreteSteps(svg, wordData);
                break;
            case 'electron-ejection':
                this.createElectronEjection(svg, wordData);
                break;
            default:
                this.createDefaultVisualization(svg, wordData);
        }
    }

    // ATOMIC STRUCTURE VISUALIZATIONS

    createInteractiveAtom(svg, wordData) {
        const centerX = 400;
        const centerY = 200;
        const nucleusRadius = 40;
        
        // Nucleus
        const nucleus = this.createCircle(svg, centerX, centerY, nucleusRadius, '#6366f1', '#3b82f6');
        nucleus.setAttribute('cursor', 'pointer');
        
        // Add protons and neutrons
        this.addNucleusParticles(svg, centerX, centerY, nucleusRadius);
        
        // Electron shells
        const shells = [80, 130, 180];
        shells.forEach((radius, index) => {
            const shell = this.createCircle(svg, centerX, centerY, radius, 'none', '#9ca3af', 1);
            shell.setAttribute('opacity', '0.3');
            
            // Electrons
            const electronCount = [2, 8, 18][index];
            this.addElectronsToShell(svg, centerX, centerY, radius, electronCount, index);
        });

        // Interactive behavior
        this.makeInteractive(svg, nucleus, () => {
            this.showNucleusDetails(svg, centerX, centerY);
        });
    }

    createElectronOrbit(svg, wordData) {
        const centerX = 400;
        const centerY = 200;
        const orbitRadius = 150;
        
        // Nucleus
        const nucleus = this.createCircle(svg, centerX, centerY, 30, '#ef4444', '#dc2626');
        
        // Orbit path
        const orbit = this.createCircle(svg, centerX, centerY, orbitRadius, 'none', '#9ca3af', 2);
        orbit.setAttribute('stroke-dasharray', '5,5');
        
        // Electron
        const electron = this.createCircle(svg, centerX + orbitRadius, centerY, 8, '#3b82f6', '#2563eb');
        
        // Animation
        let angle = 0;
        const animate = () => {
            angle += 0.05;
            const x = centerX + orbitRadius * Math.cos(angle);
            const y = centerY + orbitRadius * Math.sin(angle);
            electron.setAttribute('cx', x);
            electron.setAttribute('cy', y);
            requestAnimationFrame(animate);
        };
        animate();
    }

    createNucleusZoom(svg, wordData) {
        const centerX = 400;
        const centerY = 200;
        const radius = 100;
        
        // Nucleus background
        const nucleus = this.createCircle(svg, centerX, centerY, radius, '#e0e7ff', '#c7d2fe');
        
        // Protons (red)
        for(let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const x = centerX + 30 * Math.cos(angle);
            const y = centerY + 30 * Math.sin(angle);
            this.createCircle(svg, x, y, 15, '#fecaca', '#ef4444');
        }
        
        // Neutrons (blue)
        for(let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2 + Math.PI / 6;
            const x = centerX + 50 * Math.cos(angle);
            const y = centerY + 50 * Math.sin(angle);
            this.createCircle(svg, x, y, 15, '#dbeafe', '#3b82f6');
        }
        
        // Label
        this.createText(svg, centerX, centerY + 80, 'Protons & Neutrons', '#1f2937', 16);
    }

    // ELECTRICAL PROPERTIES VISUALIZATIONS

    createElectronFlow(svg, wordData) {
        const width = 800;
        const height = 400;
        
        // Conductor background
        const conductor = this.createRect(svg, 100, 150, 600, 100, '#f0f9ff', '#0ea5e9');
        conductor.setAttribute('rx', '20');
        
        // Electrons flowing
        for(let i = 0; i < 20; i++) {
            const electron = this.createCircle(svg, 100 + Math.random() * 600, 150 + Math.random() * 100, 4, '#3b82f6', '#1d4ed8');
            electron.style.opacity = '0.8';
        }
        
        // Animation: electrons moving right
        const electrons = svg.querySelectorAll('circle');
        electrons.forEach((electron, index) => {
            let x = parseFloat(electron.getAttribute('cx'));
            const animate = () => {
                x += 2;
                if(x > 700) x = 100;
                electron.setAttribute('cx', x);
                requestAnimationFrame(animate);
            };
            setTimeout(() => animate(), index * 100);
        });
    }

    createBandDiagram(svg, wordData) {
        const width = 800;
        const height = 400;
        const margin = 50;
        
        // Energy levels
        const valenceY = height - margin;
        const conductionY = margin;
        
        // Valence band
        this.createRect(svg, margin, valenceY - 20, width - 2*margin, 40, '#f0fdf4', '#10b981');
        this.createText(svg, width/2, valenceY + 30, 'Valence Band', '#059669', 16);
        
        // Conduction band
        this.createRect(svg, margin, conductionY - 20, width - 2*margin, 40, '#fff7ed', '#f59e0b');
        this.createText(svg, width/2, conductionY - 40, 'Conduction Band', '#d97706', 16);
        
        // Band gap
        const gapLine = this.createLine(svg, margin, valenceY - 20, width - margin, valenceY - 20, '#6b7280', 2);
        this.createText(svg, width/2, (valenceY + conductionY)/2, 'Band Gap', '#6b7280', 18);
        
        // Electrons in valence band
        for(let i = 0; i < 10; i++) {
            const x = margin + 50 + i * 60;
            this.createCircle(svg, x, valenceY, 6, '#10b981', '#059669');
        }
    }

    // THERMAL CONCEPTS VISUALIZATIONS

    createHeatTransfer(svg, wordData) {
        const width = 800;
        const height = 400;
        
        // Hot object (left)
        const hot = this.createCircle(svg, 200, 200, 60, '#fee2e2', '#ef4444');
        this.createText(svg, 200, 300, 'Hot Object', '#ef4444', 16);
        
        // Cold object (right)
        const cold = this.createCircle(svg, 600, 200, 60, '#dbeafe', '#3b82f6');
        this.createText(svg, 600, 300, 'Cold Object', '#3b82f6', 16);
        
        // Heat flow arrows
        for(let i = 0; i < 5; i++) {
            const arrow = this.createArrow(svg, 260 + i*50, 200, 540 - i*50, 200, '#f59e0b');
        }
        
        // Particles in hot object (fast)
        this.createParticles(svg, 200, 200, 60, 8, '#ef4444', true);
        
        // Particles in cold object (slow)
        this.createParticles(svg, 600, 200, 60, 5, '#3b82f6', false);
    }

    createParticleMotion(svg, wordData) {
        const width = 800;
        const height = 400;
        
        // Temperature indicators
        this.createText(svg, 100, 50, 'Low Temp', '#6b7280', 16);
        this.createText(svg, 700, 50, 'High Temp', '#6b7280', 16);
        
        // Low temperature particles (left)
        this.createParticles(svg, 100, 200, 80, 15, '#93c5fd', false);
        
        // High temperature particles (right)
        this.createParticles(svg, 700, 200, 80, 25, '#fca5a5', true);
        
        // Temperature slider visualization
        const slider = this.createRect(svg, 300, 350, 200, 10, '#e5e7eb', '#9ca3af');
        const knob = this.createCircle(svg, 400, 355, 10, '#3b82f6', '#2563eb');
    }

    // QUANTUM PHYSICS VISUALIZATIONS

    createWaveSpectrum(svg, wordData) {
        const width = 800;
        const height = 400;
        
        // Electromagnetic spectrum background
        const gradient = this.createGradient(svg, 'spectrum', ['#8b5cf6', '#22c55e', '#f59e0b', '#ef4444']);
        
        const spectrum = this.createRect(svg, 50, 200, 700, 50, 'url(#spectrum)', 'url(#spectrum)');
        
        // Wave representations
        const waves = [
            { x: 100, wavelength: 100, color: '#8b5cf6' },    // Radio
            { x: 250, wavelength: 60, color: '#22c55e' },     // Visible
            { x: 400, wavelength: 30, color: '#f59e0b' },     // UV
            { x: 550, wavelength: 10, color: '#ef4444' }      // Gamma
        ];
        
        waves.forEach(wave => {
            this.createWave(svg, wave.x, 300, wave.wavelength, wave.color);
        });
        
        // Labels
        this.createText(svg, 100, 150, 'Radio', '#8b5cf6', 14);
        this.createText(svg, 250, 150, 'Visible', '#22c55e', 14);
        this.createText(svg, 400, 150, 'UV', '#f59e0b', 14);
        this.createText(svg, 550, 150, 'Gamma', '#ef4444', 14);
    }

    createElectronTransition(svg, wordData) {
        const width = 800;
        const height = 400;
        const centerX = 400;
        const centerY = 200;
        
        // Energy levels
        const levels = [300, 200, 100];
        levels.forEach((y, index) => {
            const line = this.createLine(svg, 200, y, 600, y, '#9ca3af', 2);
            this.createText(svg, 180, y - 10, `n=${index + 1}`, '#6b7280', 14);
        });
        
        // Electron at level 2
        const electron = this.createCircle(svg, centerX, levels[1], 8, '#3b82f6', '#2563eb');
        
        // Photon emission animation
        setTimeout(() => {
            // Create photon
            const photon = this.createCircle(svg, centerX, levels[1], 4, '#f59e0b', '#d97706');
            
            // Animate transition
            let progress = 0;
            const animate = () => {
                progress += 0.05;
                const y = levels[1] + (levels[2] - levels[1]) * progress;
                electron.setAttribute('cy', y);
                
                // Photon moves away
                const photonX = centerX + progress * 100;
                const photonY = y + progress * 50;
                photon.setAttribute('cx', photonX);
                photon.setAttribute('cy', photonY);
                
                if (progress < 1) requestAnimationFrame(animate);
            };
            animate();
        }, 1000);
    }

    // HELPER METHODS

    createCircle(svg, x, y, radius, fill, stroke, strokeWidth = 2) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', radius);
        circle.setAttribute('fill', fill);
        circle.setAttribute('stroke', stroke);
        circle.setAttribute('stroke-width', strokeWidth);
        svg.appendChild(circle);
        return circle;
    }

    createRect(svg, x, y, width, height, fill, stroke, strokeWidth = 2) {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', width);
        rect.setAttribute('height', height);
        rect.setAttribute('fill', fill);
        rect.setAttribute('stroke', stroke);
        rect.setAttribute('stroke-width', strokeWidth);
        svg.appendChild(rect);
        return rect;
    }

    createLine(svg, x1, y1, x2, y2, stroke, strokeWidth = 2) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', stroke);
        line.setAttribute('stroke-width', strokeWidth);
        svg.appendChild(line);
        return line;
    }

    createText(svg, x, y, text, color, fontSize) {
        const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textElement.setAttribute('x', x);
        textElement.setAttribute('y', y);
        textElement.setAttribute('text-anchor', 'middle');
        textElement.setAttribute('fill', color);
        textElement.setAttribute('font-size', fontSize);
        textElement.setAttribute('font-family', 'Inter, sans-serif');
        textElement.textContent = text;
        svg.appendChild(textElement);
        return textElement;
    }

    createArrow(svg, x1, y1, x2, y2, color) {
        const line = this.createLine(svg, x1, y1, x2, y2, color, 3);
        const angle = Math.atan2(y2 - y1, x2 - x1);
        
        // Arrow head
        const headSize = 10;
        const head1 = this.createLine(svg, x2, y2, 
            x2 - headSize * Math.cos(angle - Math.PI/6), 
            y2 - headSize * Math.sin(angle - Math.PI/6), 
            color, 3);
        const head2 = this.createLine(svg, x2, y2, 
            x2 - headSize * Math.cos(angle + Math.PI/6), 
            y2 - headSize * Math.sin(angle + Math.PI/6), 
            color, 3);
    }

    createGradient(svg, id, colors) {
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.setAttribute('id', id);
        gradient.setAttribute('x1', '0%');
        gradient.setAttribute('y1', '0%');
        gradient.setAttribute('x2', '100%');
        gradient.setAttribute('y2', '0%');
        
        colors.forEach((color, index) => {
            const stop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop.setAttribute('offset', `${(index / (colors.length - 1)) * 100}%`);
            stop.setAttribute('stop-color', color);
            gradient.appendChild(stop);
        });
        
        svg.appendChild(gradient);
        return gradient;
    }

    createWave(svg, x, y, wavelength, color) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        let d = `M ${x} ${y}`;
        
        for(let i = 0; i < 100; i += 5) {
            const newX = x + i;
            const newY = y + Math.sin(i / wavelength * Math.PI * 2) * 10;
            d += ` L ${newX} ${newY}`;
        }
        
        path.setAttribute('d', d);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', color);
        path.setAttribute('stroke-width', '2');
        svg.appendChild(path);
    }

    createParticles(svg, centerX, centerY, radius, count, color, fast) {
        for(let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * radius;
            const x = centerX + distance * Math.cos(angle);
            const y = centerY + distance * Math.sin(angle);
            
            const particle = this.createCircle(svg, x, y, 3, color, color);
            
            if (fast) {
                // Fast animation
                let angle = Math.random() * Math.PI * 2;
                const speed = 2 + Math.random();
                const animate = () => {
                    angle += 0.1;
                    const newX = centerX + (radius * 0.8) * Math.cos(angle);
                    const newY = centerY + (radius * 0.8) * Math.sin(angle);
                    particle.setAttribute('cx', newX);
                    particle.setAttribute('cy', newY);
                    requestAnimationFrame(animate);
                };
                animate();
            }
        }
    }

    addNucleusParticles(svg, centerX, centerY, radius) {
        // Protons
        for(let i = 0; i < 4; i++) {
            const angle = (i / 4) * Math.PI * 2;
            const x = centerX + (radius * 0.6) * Math.cos(angle);
            const y = centerY + (radius * 0.6) * Math.sin(angle);
            this.createCircle(svg, x, y, radius * 0.2, '#fecaca', '#ef4444');
        }
        
        // Neutrons
        for(let i = 0; i < 4; i++) {
            const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
            const x = centerX + (radius * 0.8) * Math.cos(angle);
            const y = centerY + (radius * 0.8) * Math.sin(angle);
            this.createCircle(svg, x, y, radius * 0.2, '#dbeafe', '#3b82f6');
        }
    }

    addElectronsToShell(svg, centerX, centerY, radius, count, shellIndex) {
        const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
        const color = colors[shellIndex % colors.length];
        
        for(let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            this.createCircle(svg, x, y, 6, color, color);
        }
    }

    showNucleusDetails(svg, centerX, centerY) {
        // Create tooltip or overlay with nucleus information
        const overlay = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        overlay.setAttribute('x', centerX - 100);
        overlay.setAttribute('y', centerY - 60);
        overlay.setAttribute('width', 200);
        overlay.setAttribute('height', 120);
        overlay.setAttribute('fill', 'white');
        overlay.setAttribute('stroke', '#3b82f6');
        overlay.setAttribute('stroke-width', '2');
        overlay.setAttribute('rx', '8');
        svg.appendChild(overlay);
        
        this.createText(svg, centerX, centerY - 30, 'Nucleus', '#3b82f6', 18);
        this.createText(svg, centerX, centerY, 'Protons + Neutrons', '#6b7280', 14);
        this.createText(svg, centerX, centerY + 30, 'Contains 99.9% of atom mass', '#6b7280', 12);
    }

    makeInteractive(svg, element, callback) {
        element.addEventListener('click', callback);
        element.style.cursor = 'pointer';
        element.addEventListener('mouseenter', () => {
            element.setAttribute('transform', 'scale(1.1)');
        });
        element.addEventListener('mouseleave', () => {
            element.setAttribute('transform', 'scale(1)');
        });
    }

    createDefaultVisualization(svg, wordData) {
        this.createText(svg, 400, 200, wordData.word.toUpperCase(), '#6b7280', 32);
        this.createText(svg, 400, 240, 'Interactive visualization coming soon!', '#9ca3af', 16);
    }
}

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhysicsVisualizations;
}