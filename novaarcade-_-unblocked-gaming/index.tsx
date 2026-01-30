
/**
 * NovaArcade Vanilla Reset Logic
 * This file handles the imperative DOM manipulation as requested.
 */

document.addEventListener('DOMContentLoaded', async () => {
    const gamesGrid = document.getElementById('games-grid');
    const searchInput = document.getElementById('search-input') as HTMLInputElement;
    const categoryList = document.getElementById('category-list');
    const homeView = document.getElementById('home-view');
    const gameViewer = document.getElementById('game-viewer');
    const gameFrame = document.getElementById('game-frame') as HTMLIFrameElement;
    const gameTitle = document.getElementById('game-title');
    const gameMeta = document.getElementById('game-meta');
    const backBtn = document.getElementById('back-btn');
    const logoBtn = document.getElementById('logo-btn');
    const emptyState = document.getElementById('empty-state');
    const currentCategoryTitle = document.getElementById('current-category-title');
    const refreshGame = document.getElementById('refresh-game');
    const fullscreenGame = document.getElementById('fullscreen-game');

    let allGames = [];
    let currentCategory = 'All';
    let searchQuery = '';

    // Fetch games from JSON
    async function loadGames() {
        try {
            const response = await fetch('./games.json');
            if (!response.ok) throw new Error('Network response was not ok');
            allGames = await response.json();
            renderGames();
        } catch (error) {
            console.error('Failed to load games:', error);
            // Fallback hardcoded data to prevent empty screen if JSON fails
            allGames = [
                { id: '2048', title: '2048', category: 'Puzzle', description: 'Classic 2048 puzzle.', thumbnail: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?w=400&q=80', iframeUrl: 'https://play2048.co/' },
                { id: 'hextris', title: 'Hextris', category: 'Arcade', description: 'Fast-paced hexagon matching.', thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80', iframeUrl: 'https://hextris.io/' }
            ];
            renderGames();
        }
    }

    function renderGames() {
        if (!gamesGrid) return;

        const filtered = allGames.filter(game => {
            const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                game.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = currentCategory === 'All' || game.category === currentCategory;
            return matchesSearch && matchesCategory;
        });

        gamesGrid.innerHTML = '';
        
        if (filtered.length === 0) {
            emptyState?.classList.remove('hidden');
            emptyState?.classList.add('flex');
        } else {
            emptyState?.classList.add('hidden');
            emptyState?.classList.remove('flex');
            
            filtered.forEach((game, index) => {
                const card = document.createElement('div');
                card.className = 'game-card group bg-slate-900/40 rounded-[2rem] border border-white/5 overflow-hidden flex flex-col cursor-pointer animate-fade-in';
                card.style.animationDelay = `${index * 50}ms`;
                
                card.innerHTML = `
                    <div class="relative aspect-[16/10] overflow-hidden m-2 rounded-2xl">
                        <img src="${game.thumbnail}" alt="${game.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                        <div class="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-950 transform translate-y-4 group-hover:translate-y-0 transition-transform shadow-2xl">
                                <i class="fas fa-play ml-1"></i>
                            </div>
                        </div>
                    </div>
                    <div class="p-6 pt-2">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-md border border-indigo-500/10">${game.category}</span>
                            <div class="flex gap-1 items-center">
                                <i class="fas fa-star text-amber-500 text-[10px]"></i>
                                <span class="text-[10px] font-bold text-slate-400">4.9</span>
                            </div>
                        </div>
                        <h4 class="text-lg font-black text-white group-hover:text-indigo-400 transition-colors">${game.title}</h4>
                        <p class="text-xs text-slate-500 font-medium mt-1 line-clamp-2 leading-relaxed">${game.description}</p>
                    </div>
                `;

                card.onclick = () => openGame(game);
                gamesGrid.appendChild(card);
            });
        }
    }

    function openGame(game) {
        if (homeView && gameViewer && gameFrame && gameTitle && gameMeta) {
            homeView.classList.add('hidden');
            gameViewer.classList.remove('hidden');
            gameFrame.src = game.iframeUrl;
            gameTitle.textContent = game.title;
            gameMeta.textContent = game.category;
            document.body.style.overflow = 'hidden';
        }
    }

    function closeGame() {
        if (homeView && gameViewer && gameFrame) {
            homeView.classList.remove('hidden');
            gameViewer.classList.add('hidden');
            gameFrame.src = '';
            document.body.style.overflow = 'auto';
        }
    }

    // Event Listeners
    searchInput?.addEventListener('input', (e) => {
        searchQuery = (e.target as HTMLInputElement).value;
        renderGames();
    });

    categoryList?.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('category-pill')) {
            document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
            target.classList.add('active');
            currentCategory = target.getAttribute('data-category') || 'All';
            if (currentCategoryTitle) {
                currentCategoryTitle.textContent = currentCategory === 'All' ? 'All Games' : `${currentCategory} Collection`;
            }
            renderGames();
        }
    });

    if (backBtn) backBtn.onclick = closeGame;
    
    if (logoBtn) {
        logoBtn.onclick = () => {
            currentCategory = 'All';
            searchQuery = '';
            if (searchInput) searchInput.value = '';
            document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
            document.querySelector('[data-category="All"]')?.classList.add('active');
            if (currentCategoryTitle) currentCategoryTitle.textContent = 'All Games';
            closeGame();
            renderGames();
        };
    }

    if (refreshGame) {
        refreshGame.onclick = () => {
            const currentSrc = gameFrame.src;
            gameFrame.src = '';
            setTimeout(() => { gameFrame.src = currentSrc; }, 100);
        };
    }

    if (fullscreenGame) {
        fullscreenGame.onclick = () => {
            if (gameFrame.requestFullscreen) {
                gameFrame.requestFullscreen();
            }
        };
    }

    // Initialize the app
    loadGames();
});
