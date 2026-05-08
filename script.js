// ===== 1. SPLASH SCREEN =====
let bgMusic = null;
let splashIntro = null;
let currentIndex = 0;
let lastScrollTime = 0;
let isAnimating = false;
let scrollVelocity = 0;
let momentum = 0;
let isMusicPlaying = false; // ADD THIS

const TOTAL_PROJECTS = 18;
const VISIBLE_COUNT = 5;
const CARD_HEIGHT = 73;
const CONTAINER_HEIGHT = 450;
const SMOOTHING = 0.85;

// ===== AVATAR CYCLE CONFIGURATION =====
/*const avatarCycle = [
    { index: 0, src: 'assets/images/avatar_smile_left.png' },    // Projects 1-4
    { index: 4, src: 'assets/images/avatar_smile_wink_left.png' }, // Projects 5-8
    { index: 8, src: 'assets/images/avatar_smile_left.png' },    // Projects 9-12
    { index: 12, src: 'assets/images/avatar_smile_wink_left.png' }, // Projects 13-16
    { index: 16, src: 'assets/images/avatar_smile_left.png' },    // Projects 17-18
]*/;

// ===== 18 Project Data =====
const allProjects = [
    { id: 'project1', title: 'Midterms Hands-on Exercise 1', arcana: '📊 Regression', file: 'projects/project1.html', color: '#ffb3ba' },
    { id: 'project2', title: 'Midterms Hands-on Exercise 2', arcana: '🧠 Neural Net', file: 'projects/project2.html', color: '#bae1ff' },
    { id: 'project3', title: 'Midterms Assignment 1', arcana: '📚 Deep Learning', file: 'projects/project3.html', color: '#baffc9' },
    { id: 'project4', title: 'Midterms Hands-on Exercise 3', arcana: '🌐 Web App', file: 'projects/project4.html', color: '#ffd93d' },
    { id: 'project5', title: 'Midterms Hands-on Exercise 4', arcana: '⚖️ Model Selection', file: 'projects/project5.html', color: '#d4b8ff' },
    { id: 'project6', title: 'Midterms Hands-on Quiz 1', arcana: '🏠 Web App', file: 'projects/project6.html', color: '#ffd5b8' },
    { id: 'project7', title: 'Midterms Hands-on Long Quiz 1', arcana: '🛠️ Full Stack', file: 'projects/project7.html', color: '#ffb3ba' },
    { id: 'project8', title: 'Midterm Hands-on Project', arcana: '🔁 Optimization', file: 'projects/project8.html', color: '#bae1ff' },
    { id: 'project9', title: 'Finals Hands-on Exercise 1', arcana: '🖥️ Streamlit', file: 'projects/project9.html', color: '#baffc9' },
    { id: 'project10', title: 'Finals Hands-on Exercise 2', arcana: '🧠 CNN', file: 'projects/project10.html', color: '#ffd93d' },
    { id: 'project11', title: 'Finals Lab Exercise 3', arcana: '📈 CNN Optimization', file: 'projects/project11.html', color: '#d4b8ff' },
    { id: 'project12', title: 'Finals Lab Exercise 4', arcana: '🎯 Test Time!', file: 'projects/project12.html', color: '#ffd5b8' },
    { id: 'project13', title: 'Finals Lab Exercise 5', arcana: '🐕🐈 Binary Classification', file: 'projects/project13.html', color: '#ffb3ba' },
    { id: 'project14', title: 'Finals Lab Exercise 6', arcana: '⚡ Flask', file: 'projects/project14.html', color: '#bae1ff' },
    { id: 'project15', title: 'Finals Lab Exercise 7', arcana: '🌐 Streamlit', file: 'projects/project15.html', color: '#baffc9' },
    { id: 'project16', title: 'Finals Lab Quiz 1', arcana: '😊 Sentiment', file: 'projects/project16.html', color: '#ffd93d' },
    { id: 'project17', title: 'Finals Lab Quiz 2', arcana: '😔 Sentiment', file: 'projects/project17.html', color: '#ffb3ba' },
    { id: 'project18', title: 'Finals Hands-on Project', arcana: '📱 Mobile AI', file: 'projects/project18.html', color: '#bae1ff' }
];

// ===== CLICK TO START =====
function startSplashSequence() {
    // 1. Hide click overlay
    const overlay = document.getElementById('click-overlay');
    overlay.classList.add('hidden');

    // 2. Show splash content
    const content = document.getElementById('splash-content');
    content.classList.add('visible');

    // 3. Start intro music
    playSplashIntro();
}

// ===== SPLASH INTRO MUSIC =====
function playSplashIntro() {
    splashIntro = new Audio('assets/music/splash_intro.mp3');
    splashIntro.loop = false;
    splashIntro.volume = 0.5;

    splashIntro.play().catch(error => {
        console.log('Splash intro play failed:', error);
    });

    // Listen for the 6-second mark (avatar and tag pop)
    splashIntro.addEventListener('timeupdate', function() {
        if (this.currentTime >= 6.0 && this.currentTime < 6.1) {
            console.log('⏰ 6-second mark reached!');
            const avatar = document.querySelector('.splash-avatar');
            const tag = document.querySelector('.splash-tag');
            if (avatar) {
                avatar.style.animation = 'popFast 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
                avatar.style.opacity = '1';
            }
            if (tag) {
                tag.style.animation = 'popFast 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
                tag.style.opacity = '1';
            }
        }
    });

    // Show START button at exactly 8 seconds
    setTimeout(() => {
        console.log('⏰ 8-second mark reached!');
        const startBtn = document.querySelector('.start-btn');
        if (startBtn) {
            startBtn.style.opacity = '1';
            startBtn.style.pointerEvents = 'auto';
            startBtn.classList.add('pop-up');
            console.log('✅ START button popped up!');
        } else {
            console.error('❌ START button not found!');
        }
    }, 8000);

    window.splashIntro = splashIntro;
}

// ===== START SITE =====
function startSite() {
    const splash = document.getElementById('splash-screen');
    const main = document.getElementById('main-app');

    renderProjects();

    // Play magical chime sound effect
    const chime = new Audio('assets/music/chime_intro.m4a'); // Changed to chime_intro.mp3
    chime.volume = 0.5;
    chime.play();

    // ZOOM OUT TRANSITION - 3 seconds to match the sound
    splash.style.transition = 'all 3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    splash.style.transform = 'scale(1.5) rotate(3deg)';
    splash.style.opacity = '0';

    // Hide the splash screen after 3 seconds (when sound fades)
    setTimeout(() => {
        splash.style.display = 'none';
        main.style.display = 'block';
        if (window.splashIntro && !window.splashIntro.paused) {
            window.splashIntro.pause();
            window.splashIntro.currentTime = 0;
        }
        playBackgroundMusic();
    }, 3000);
}

// ===== BACKGROUND MUSIC =====
function playBackgroundMusic() {
    if (!bgMusic) {
        bgMusic = new Audio('assets/music/background.mp3');
        bgMusic.loop = true;
        bgMusic.volume = 0.3;
    }
    
    bgMusic.play().catch(error => {
        console.log('Background music play failed:', error);
    });
    
    isMusicPlaying = true;
    document.getElementById('music-icon').textContent = '🔊';
    window.bgMusic = bgMusic;
}

// ===== TOGGLE MUSIC =====
function toggleMusic() {
    if (!bgMusic) {
        // If music hasn't been initialized yet, create it
        bgMusic = new Audio('assets/music/background.mp3');
        bgMusic.loop = true;
        bgMusic.volume = 0.3;
        window.bgMusic = bgMusic;
    }
    
    if (bgMusic.paused) {
        bgMusic.play().catch(error => {
            console.log('Music play failed:', error);
        });
        document.getElementById('music-icon').textContent = '🔊';
        isMusicPlaying = true;
        
        // Add dance animation to Mii
        const mii = document.getElementById('main-mii');
        mii.classList.remove('dance');
        void mii.offsetWidth;
        mii.classList.add('dance');
        
        // Update speech bubble
        const bubble = document.getElementById('mii-speech');
        bubble.textContent = '"🎵 Music makes me dance!"';
        setTimeout(() => {
            bubble.textContent = '"Pick a project!"';
        }, 3000);
    } else {
        bgMusic.pause();
        document.getElementById('music-icon').textContent = '🔇';
        isMusicPlaying = false;
        
        // Remove dance animation
        const mii = document.getElementById('main-mii');
        mii.classList.remove('dance');
    }
}

// ===== RENDER PROJECTS =====
function renderProjects() {
    const list = document.getElementById('project-list');
    list.innerHTML = '';

    for (let i = 0; i < TOTAL_PROJECTS; i++) {
        const project = allProjects[i];
        const card = document.createElement('div');
        card.className = 'project-card';
        card.dataset.index = i;
        card.onclick = function() { openProject(project.file, project.title); };

        card.innerHTML = `
            <div class="card-rank">
                <span class="rank-number">${String(i + 1).padStart(2, '0')}</span>
                <span class="rank-label">RANK MAX</span>
            </div>
            <div class="card-info">
                <span class="card-arcana">★ ${project.arcana}</span>
                <span class="card-title">${project.title}</span>
            </div>
            <span class="card-status">▶</span>
        `;

        list.appendChild(card);
    }

    updateWheelPosition(0, false);
    attachCardEvents();
}

// ===== UPDATE WHEEL POSITION =====
function updateWheelPosition(index, animate = true) {
    const list = document.getElementById('project-list');
    const cards = document.querySelectorAll('.project-card');
    const centerIndex = index + 2;

    const targetPosition = (CONTAINER_HEIGHT / 2) - (centerIndex * CARD_HEIGHT) - (CARD_HEIGHT / 2);

    if (animate) {
        list.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
    } else {
        list.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    }

    list.style.transform = `translateY(${targetPosition}px)`;

    cards.forEach((card, i) => {
        const distance = Math.abs(i - centerIndex);
        card.style.transition = 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
        card.className = 'project-card';
        card.style.borderColor = 'var(--text-dark)';

        if (distance === 0) {
            card.classList.add('center');
            card.style.borderColor = 'var(--accent-pink)';
            card.style.transform = `scale(1.1) rotateX(0deg) translateZ(30px)`;
            card.style.opacity = '1';
            card.style.zIndex = '10';
        } else if (distance === 1) {
            card.classList.add('center-1');
            card.style.transform = `scale(0.95) rotateX(3deg) translateZ(-20px)`;
            card.style.opacity = '0.75';
            card.style.zIndex = '5';
        } else if (distance === 2) {
            card.classList.add('center-2');
            card.style.transform = `scale(0.85) rotateX(6deg) translateZ(-60px)`;
            card.style.opacity = '0.5';
            card.style.zIndex = '3';
        } else if (distance === 3) {
            card.classList.add('center-3');
            card.style.transform = `scale(0.75) rotateX(9deg) translateZ(-100px)`;
            card.style.opacity = '0.3';
            card.style.zIndex = '1';
        } else {
            card.classList.add('center-4');
            card.style.transform = `scale(0.65) rotateX(12deg) translateZ(-150px)`;
            card.style.opacity = '0.15';
            card.style.zIndex = '0';
        }
    });

    const startNum = index + 1;
    const endNum = Math.min(index + VISIBLE_COUNT, TOTAL_PROJECTS);
    document.getElementById('project-counter').textContent = 
        `${String(startNum).padStart(2, '0')}-${String(endNum).padStart(2, '0')} / ${TOTAL_PROJECTS}`;
}

// ===== ATTACH CARD EVENTS =====
function attachCardEvents() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.removeEventListener('click', cardClickHandler);
        card.addEventListener('click', cardClickHandler);

        card.addEventListener('mouseenter', function() {
            document.querySelectorAll('.project-card').forEach(c => {
                c.classList.remove('center');
                c.style.borderColor = 'var(--text-dark)';
                c.style.transform = c.style.transform.replace(' scale(1.1)', '');
            });

            this.classList.add('center');
            this.style.borderColor = 'var(--accent-pink)';

            const mii = document.getElementById('main-mii');
            mii.classList.remove('wave');
            void mii.offsetWidth;
            mii.classList.add('wave');

            const bubble = document.getElementById('mii-speech');
            const projectName = this.querySelector('.card-title').textContent;
            bubble.textContent = `"${projectName} is selected!"`;
        });

        card.addEventListener('mouseleave', function() {
            this.classList.remove('center');
            this.style.borderColor = 'var(--text-dark)';

            const mii = document.getElementById('main-mii');
            mii.classList.remove('wave');

            setTimeout(() => {
                const bubble = document.getElementById('mii-speech');
                bubble.textContent = '"Pick a project!"';
            }, 2000);
        });
    });
}

// ===== CARD CLICK HANDLER =====
function cardClickHandler() {
    const title = this.querySelector('.card-title').textContent;
    const project = allProjects.find(p => p.title === title);
    if (project) {
        openProject(project.file, project.title);
    }
}

// ===== WHEEL EVENT =====
document.addEventListener('wheel', function(e) {
    const mainApp = document.getElementById('main-app');
    if (mainApp.style.display === 'none') return;

    const projectList = document.getElementById('project-list');
    const rect = projectList.getBoundingClientRect();
    const isOverList = e.clientX >= rect.left && e.clientX <= rect.right &&
                       e.clientY >= rect.top && e.clientY <= rect.bottom;

    if (!isOverList) return;

    e.preventDefault();

    const now = Date.now();
    if (now - lastScrollTime < 50) return;

    lastScrollTime = now;

    const delta = e.deltaY > 0 ? 1 : -1;
    currentIndex = (currentIndex + delta + TOTAL_PROJECTS) % TOTAL_PROJECTS;
    updateWheelPosition(currentIndex, true);
    miiReact(delta > 0 ? 'down' : 'up');

    scrollVelocity = delta * 0.5;
}, { passive: false });

// ===== SCROLL PROJECTS =====
function scrollProjects(direction) {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex = (currentIndex + direction + TOTAL_PROJECTS) % TOTAL_PROJECTS;
    updateWheelPosition(currentIndex, true);
    miiReact(direction > 0 ? 'down' : 'up');
    setTimeout(() => {
        isAnimating = false;
    }, 500);
}

// ===== MII REACT =====
function miiReact(direction) {
    const mii = document.getElementById('main-mii');
    mii.classList.remove('wave');
    void mii.offsetWidth;
    mii.classList.add('wave');

    const bubble = document.getElementById('mii-speech');
    bubble.textContent = direction === 'down' ? '"☀️ Here we go~"' : '"🌙 Going back~"';
    setTimeout(() => {
        bubble.textContent = '"Pick a project!"';
    }, 1500);
}

// ===== OPEN PROJECT =====
async function openProject(htmlPath, title) {
    const slide = document.getElementById('project-slide');
    const slideTitle = document.getElementById('slide-title');
    const slideBody = document.querySelector('.slide-body');

    const centerCard = document.querySelector('.project-card.center');
    if (centerCard) {
        centerCard.classList.add('clicked');
        setTimeout(() => {
            centerCard.classList.remove('clicked');
        }, 400);
    }

    const mii = document.getElementById('main-mii');
    mii.classList.remove('hop', 'excited');
    void mii.offsetWidth;
    mii.classList.add('hop');

    const bubble = document.getElementById('mii-speech');
    bubble.textContent = `"Opening ${title}..."`;

    try {
        const response = await fetch(htmlPath);
        const html = await response.text();

        slideTitle.textContent = title;
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const bodyContent = doc.body.innerHTML;
        slideBody.innerHTML = bodyContent;
        slide.classList.add('open');
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            mii.classList.remove('hop');
            mii.classList.add('excited');
            bubble.textContent = '"Here it is!"';
        }, 500);
    } catch (error) {
        console.error('Failed to load project:', error);
        slideBody.innerHTML = `<div class="slide-section"><h3>📖 Overview</h3><p>Project content could not be loaded.</p></div>`;
        slide.classList.add('open');
    }
}

// ===== CLOSE PROJECT =====
function closeProject() {
    const slide = document.getElementById('project-slide');
    slide.classList.remove('open');
    document.body.style.overflow = 'hidden';

    const mii = document.getElementById('main-mii');
    mii.classList.remove('excited');
    const bubble = document.getElementById('mii-speech');
    setTimeout(() => {
        bubble.textContent = '"Pick a project!"';
    }, 500);
}

// ===== KEYBOARD EVENTS =====
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') closeProject();
    if (event.key === 'ArrowUp') scrollProjects(-1);
    if (event.key === 'ArrowDown') scrollProjects(1);
    if (event.key === 'Enter') {
        const centerCard = document.querySelector('.project-card.center');
        if (centerCard) centerCard.click();
    }
});

document.getElementById('project-slide').addEventListener('click', function(e) {
    if (e.target === this) closeProject();
});

// ===== MOUSE TRACER - NO GSAP, PURE CSS =====
const cursor = document.getElementById("cursor");
const amount = 20;
const sineDots = Math.floor(amount * 0.3);
const width = 26;
const idleTimeout = 150;
let mousePosition = {x: 0, y: 0};
let dots = [];
let timeoutID;
let idle = false;

class Dot {
    constructor(index = 0) {
        this.index = index;
        this.anglespeed = 0.05;
        this.x = 0;
        this.y = 0;
        this.scale = 1 - 0.05 * index;
        this.range = width / 2 - width / 2 * this.scale + 2;
        this.element = document.createElement("span");
        this.element.style.transform = `scale(${this.scale})`;
        cursor.appendChild(this.element);
    }

    lock() {
        this.lockX = this.x;
        this.lockY = this.y;
        this.angleX = Math.PI * 2 * Math.random();
        this.angleY = Math.PI * 2 * Math.random();
    }

    draw() {
        if (!idle || this.index <= sineDots) {
            this.element.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale})`;
        } else {
            this.angleX += this.anglespeed;
            this.angleY += this.anglespeed;
            this.y = this.lockY + Math.sin(this.angleY) * this.range;
            this.x = this.lockX + Math.sin(this.angleX) * this.range;
            this.element.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale})`;
        }
    }
}

function buildDots() {
    for (let i = 0; i < amount; i++) {
        let dot = new Dot(i);
        dots.push(dot);
    }
}

function startIdleTimer() {
    timeoutID = setTimeout(goInactive, idleTimeout);
    idle = false;
}

function resetIdleTimer() {
    clearTimeout(timeoutID);
    startIdleTimer();
}

function goInactive() {
    idle = true;
    for (let dot of dots) {
        dot.lock();
    }
}

function positionCursor() {
    let x = mousePosition.x;
    let y = mousePosition.y;
    dots.forEach((dot, index, dots) => {
        let nextDot = dots[index + 1] || dots[0];
        dot.x = x;
        dot.y = y;
        dot.draw();
        if (!idle || index <= sineDots) {
            const dx = (nextDot.x - dot.x) * 0.35;
            const dy = (nextDot.y - dot.y) * 0.35;
            x += dx;
            y += dy;
        }
    });
}

function render(timestamp) {
    positionCursor();
    requestAnimationFrame(render);
}

function initTracer() {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);
    buildDots();
    startIdleTimer();
    render();
}

const onMouseMove = event => {
    mousePosition.x = event.clientX - width / 2;
    mousePosition.y = event.clientY - width / 2;
    resetIdleTimer();
};

const onTouchMove = () => {
    mousePosition.x = event.touches[0].clientX - width / 2;
    mousePosition.y = event.touches[0].clientY - width / 2;
    resetIdleTimer();
};

// ===== START THE TRACER =====
initTracer();

// ===== FACE PAINT DRAG & DROP =====
let draggedItem = null;
let isFromPalette = false;

// --- Make palette items draggable ---
document.querySelectorAll('.palette-item').forEach(item => {
    item.addEventListener('dragstart', function(e) {
        draggedItem = this;
        isFromPalette = true;
        this.style.opacity = '0.5';
        e.dataTransfer.setData('text/plain', JSON.stringify({
            src: this.dataset.src,
            type: this.dataset.type,
            fromPalette: true
        }));
    });
    
    item.addEventListener('dragend', function() {
        this.style.opacity = '1';
        if (!isFromPalette) {
            draggedItem = null;
        }
        isFromPalette = false;
    });
});

// --- Make dropped items draggable for repositioning ---
function makeDroppedItemDraggable(element) {
    element.addEventListener('dragstart', function(e) {
        draggedItem = this;
        isFromPalette = false;
        this.style.opacity = '0.5';
        e.dataTransfer.setData('text/plain', JSON.stringify({
            src: this.src,
            type: this.dataset.type,
            id: this.dataset.id,
            fromPalette: false
        }));
    });
    
    element.addEventListener('dragend', function() {
        this.style.opacity = '1';
        if (!isFromPalette) {
            draggedItem = null;
        }
        isFromPalette = false;
    });
}

// --- Drop zone events ---
const dropZone = document.getElementById('mii-drop-zone');
const droppedElements = document.getElementById('dropped-elements');
let itemCounter = 0;

dropZone.addEventListener('dragover', function(e) {
    e.preventDefault();
    this.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', function(e) {
    this.classList.remove('drag-over');
});

dropZone.addEventListener('drop', function(e) {
    e.preventDefault();
    this.classList.remove('drag-over');
    
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
    
    if (data.fromPalette) {
        const droppedItem = document.createElement('img');
        droppedItem.src = data.src;
        droppedItem.className = 'dropped-item';
        droppedItem.draggable = true;
        droppedItem.dataset.type = data.type;
        droppedItem.dataset.id = `item-${itemCounter++}`;
        
        // Determine size based on type
        let size = 80; // default for individual parts
        if (data.type === 'face' || data.src.includes('roblox') || data.src.includes('face')) {
            size = 180; // 👈 YOUR CHOSEN SIZE
        } else if (data.type === 'eye') {
            size = 65;
        } else if (data.type === 'mouth') {
            size = 55;
        } else if (data.type === 'hair') {
            size = 120;
        } else if (data.type === 'accessory') {
            size = 60;
        }
        
        droppedItem.style.width = `${size}px`;
        droppedItem.style.height = `${size}px`;
        
        // Calculate offset for centering (half of size)
        const offset = size / 2;
        
        // Position at drop point with correct offset
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - offset;
        const y = e.clientY - rect.top - offset;
        
        droppedItem.style.left = `${Math.max(0, Math.min(100, x / rect.width * 100))}%`;
        droppedItem.style.top = `${Math.max(0, Math.min(100, y / rect.height * 100))}%`;
        
        // Add remove button
        const removeBtn = document.createElement('div');
        removeBtn.className = 'remove-btn';
        removeBtn.textContent = '✕';
        removeBtn.onclick = function(e) {
            e.stopPropagation();
            droppedItem.remove();
        };
        droppedItem.appendChild(removeBtn);
        
        // Make it draggable for repositioning
        makeDroppedItemDraggable(droppedItem);
        
        droppedElements.appendChild(droppedItem);
    } else {
        // If this is an existing item, just move it (reposition)
        if (draggedItem) {
            const rect = this.getBoundingClientRect();
            const size = parseInt(draggedItem.style.width);
            const offset = size / 2;
            const x = e.clientX - rect.left - offset;
            const y = e.clientY - rect.top - offset;
            
            draggedItem.style.left = `${Math.max(0, Math.min(100, x / rect.width * 100))}%`;
            draggedItem.style.top = `${Math.max(0, Math.min(100, y / rect.height * 100))}%`;
        }
    }
});

// --- Trash Bin ---
const trashBin = document.getElementById('trash-bin');

trashBin.addEventListener('dragover', function(e) {
    e.preventDefault();
    this.classList.add('drag-over');
});

trashBin.addEventListener('dragleave', function(e) {
    this.classList.remove('drag-over');
});

trashBin.addEventListener('drop', function(e) {
    e.preventDefault();
    this.classList.remove('drag-over');
    
    // Remove the dragged item
    if (draggedItem) {
        draggedItem.remove();
        draggedItem = null;
    }
});

// Add this to your script.js at the end
function updateSpeechBubble() {
    const bubble = document.getElementById('mii-speech');
    if (window.innerHeight < 850) {
        bubble.textContent = '"Drag a face onto me!"';
    } else {
        bubble.textContent = '"Pick a project!"';
    }
}

// Run on load and resize
window.addEventListener('resize', updateSpeechBubble);
updateSpeechBubble();