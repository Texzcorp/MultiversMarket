// Marketplace.js - Script for the dimensions catalog page

document.addEventListener('DOMContentLoaded', function() {
    // Extended dimensions data
    const extendedDimensions = [
        ...window.multiversMarket.dimensions,
        {
            id: 5,
            name: "Suspended Chronos",
            description: "Dimension where time is not linear but folds like fabric, creating pockets of past and future.",
            price: "19.2 ETH",
            image: "assets/svg/dimension5.svg",
            category: "Temporal"
        },
        {
            id: 6,
            name: "Stellar Ocean",
            description: "A world entirely composed of luminous water where stars are born and die beneath the surface.",
            price: "13.7 ETH",
            image: "assets/svg/dimension6.svg",
            category: "Harmonic"
        },
        {
            id: 7,
            name: "Nano-Civilization",
            description: "Miniature dimension where an entire civilization exists at a microscopic scale.",
            price: "7.9 ETH",
            image: "assets/svg/dimension7.svg",
            category: "Biological"
        },
        {
            id: 8,
            name: "Inverted Terra",
            description: "World where the inside and outside are inverted - you live inside a hollow sphere.",
            price: "11.4 ETH",
            image: "assets/svg/dimension8.svg",
            category: "Altered Physics"
        },
        {
            id: 9,
            name: "Magnetic Pulse",
            description: "Dimension dominated by immense visible magnetic fields that sculpt the landscape.",
            price: "14.8 ETH",
            image: "assets/svg/dimension9.svg",
            category: "Energetic"
        },
        {
            id: 10,
            name: "Terra Cognita",
            description: "World where thoughts materialize instantly, creating a constantly evolving landscape.",
            price: "22.5 ETH",
            image: "assets/svg/dimension10.svg",
            category: "Harmonic"
        },
        {
            id: 11,
            name: "Eternal Echo",
            description: "Dimension where sound is visible and permanent, creating complex architectural structures.",
            price: "16.3 ETH",
            image: "assets/svg/dimension11.svg",
            category: "Energetic"
        },
        {
            id: 12,
            name: "Stable Antimatter",
            description: "Universe composed exclusively of stabilized antimatter, offering infinite energy possibilities.",
            price: "25.0 ETH",
            image: "assets/svg/dimension12.svg",
            category: "Altered Physics"
        }
    ];

    // Component state
    let state = {
        dimensions: extendedDimensions,
        filteredDimensions: [...extendedDimensions],
        currentPage: 1,
        itemsPerPage: 6,
        category: 'all',
        sortBy: 'name-asc',
        searchQuery: '',
    };

    // DOM elements
    const dimensionsContainer = document.getElementById('dimensions-container');
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    const searchFilter = document.getElementById('search-filter');
    const searchBtn = document.querySelector('.search-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const currentPageEl = document.querySelector('.current-page');
    const totalPagesEl = document.querySelector('.total-pages');

    // Initialize the page
    init();

    function init() {
        // Add event listeners
        if (categoryFilter) categoryFilter.addEventListener('change', handleCategoryChange);
        if (sortFilter) sortFilter.addEventListener('change', handleSortChange);
        if (searchBtn) searchBtn.addEventListener('click', handleSearch);
        if (searchFilter) searchFilter.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') handleSearch();
        });
        if (prevBtn) prevBtn.addEventListener('click', goToPrevPage);
        if (nextBtn) nextBtn.addEventListener('click', goToNextPage);

        // Load initial dimensions
        applyFilters();
        renderDimensions();
    }

    function handleCategoryChange() {
        state.category = categoryFilter.value;
        state.currentPage = 1;
        applyFilters();
        renderDimensions();
    }

    function handleSortChange() {
        state.sortBy = sortFilter.value;
        applyFilters();
        renderDimensions();
    }

    function handleSearch() {
        state.searchQuery = searchFilter.value.trim().toLowerCase();
        state.currentPage = 1;
        applyFilters();
        renderDimensions();
    }

    function goToPrevPage() {
        if (state.currentPage > 1) {
            state.currentPage--;
            renderDimensions();
        }
    }

    function goToNextPage() {
        const totalPages = Math.ceil(state.filteredDimensions.length / state.itemsPerPage);
        if (state.currentPage < totalPages) {
            state.currentPage++;
            renderDimensions();
        }
    }

    function applyFilters() {
        // Filter by category
        let filtered = state.dimensions;
        
        if (state.category !== 'all') {
            filtered = filtered.filter(dim => dim.category === state.category);
        }
        
        // Filter by search
        if (state.searchQuery) {
            filtered = filtered.filter(dim => 
                dim.name.toLowerCase().includes(state.searchQuery) || 
                dim.description.toLowerCase().includes(state.searchQuery)
            );
        }
        
        // Sort
        filtered = sortDimensions(filtered, state.sortBy);
        
        state.filteredDimensions = filtered;
    }

    function sortDimensions(dimensions, sortBy) {
        const sortedDimensions = [...dimensions];
        
        switch(sortBy) {
            case 'name-asc':
                sortedDimensions.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                sortedDimensions.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'price-asc':
                sortedDimensions.sort((a, b) => {
                    const priceA = parseFloat(a.price.split(' ')[0]);
                    const priceB = parseFloat(b.price.split(' ')[0]);
                    return priceA - priceB;
                });
                break;
            case 'price-desc':
                sortedDimensions.sort((a, b) => {
                    const priceA = parseFloat(a.price.split(' ')[0]);
                    const priceB = parseFloat(b.price.split(' ')[0]);
                    return priceB - priceA;
                });
                break;
            case 'new':
                sortedDimensions.sort((a, b) => b.id - a.id);
                break;
            default:
                break;
        }
        
        return sortedDimensions;
    }

    function renderDimensions() {
        // Calculate pagination
        const startIndex = (state.currentPage - 1) * state.itemsPerPage;
        const endIndex = startIndex + state.itemsPerPage;
        const paginatedDimensions = state.filteredDimensions.slice(startIndex, endIndex);
        const totalPages = Math.ceil(state.filteredDimensions.length / state.itemsPerPage);
        
        // Update pagination UI
        if (currentPageEl) currentPageEl.textContent = state.currentPage;
        if (totalPagesEl) totalPagesEl.textContent = totalPages;
        
        // Enable/disable pagination buttons
        if (prevBtn) prevBtn.disabled = state.currentPage <= 1;
        if (nextBtn) nextBtn.disabled = state.currentPage >= totalPages;
        
        // Clear container
        if (dimensionsContainer) {
            dimensionsContainer.innerHTML = '';
            
            if (paginatedDimensions.length === 0) {
                dimensionsContainer.innerHTML = `
                    <div class="no-results">
                        <p>No dimensions found matching your criteria.</p>
                        <button class="btn btn-secondary reset-filters-btn">Reset Filters</button>
                    </div>
                `;
                
                const resetBtn = dimensionsContainer.querySelector('.reset-filters-btn');
                if (resetBtn) {
                    resetBtn.addEventListener('click', resetFilters);
                }
                
                return;
            }
            
            // Render each dimension
            paginatedDimensions.forEach(dimension => {
                const card = window.multiversMarket.createDimensionCard(dimension);
                dimensionsContainer.appendChild(card);
            });
        }
    }

    function resetFilters() {
        // Reset all filters to default
        if (categoryFilter) categoryFilter.value = 'all';
        if (sortFilter) sortFilter.value = 'name-asc';
        if (searchFilter) searchFilter.value = '';
        
        // Reset state
        state.category = 'all';
        state.sortBy = 'name-asc';
        state.searchQuery = '';
        state.currentPage = 1;
        
        // Apply and render
        applyFilters();
        renderDimensions();
    }

    // Animation on scroll
    initScrollAnimations();

    function initScrollAnimations() {
        // Add animation class to dimension cards
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        // Observe dimension cards as they're added to the DOM
        const observeDimensionCards = () => {
            const cards = document.querySelectorAll('.dimension-card:not(.animate-in)');
            cards.forEach(card => {
                observer.observe(card);
            });
        };
        
        // Initial observation
        observeDimensionCards();
        
        // Re-observe when dimensions are rendered
        const originalRenderDimensions = renderDimensions;
        renderDimensions = function() {
            originalRenderDimensions();
            setTimeout(observeDimensionCards, 100);
        };
    }

    // Additional styles
    addStyles();

    function addStyles() {
        // Create style element if it doesn't exist
        let style = document.getElementById('marketplace-styles');
        if (!style) {
            style = document.createElement('style');
            style.id = 'marketplace-styles';
            document.head.appendChild(style);
        }
        
        // Add styles
        style.textContent = `
            .marketplace-hero {
                padding: 100px 0 50px;
                text-align: center;
                position: relative;
                overflow: hidden;
            }
            
            .marketplace-title {
                font-size: 3rem;
                margin-bottom: 1rem;
                color: #fff;
                text-shadow: 0 0 10px rgba(110, 0, 255, 0.5);
            }
            
            .marketplace-subtitle {
                font-size: 1.2rem;
                color: rgba(255, 255, 255, 0.8);
                max-width: 800px;
                margin: 0 auto;
            }
            
            .marketplace-filters {
                background: rgba(21, 21, 56, 0.7);
                backdrop-filter: blur(10px);
                border-radius: 15px;
                padding: 20px;
                margin: 20px auto;
                max-width: 1200px;
            }
            
            .filters-wrapper {
                display: flex;
                flex-wrap: wrap;
                gap: 20px;
                justify-content: center;
            }
            
            .filter-group {
                flex: 1;
                min-width: 200px;
            }
            
            .filter-group label {
                display: block;
                margin-bottom: 8px;
                color: rgba(255, 255, 255, 0.8);
                font-size: 0.9rem;
            }
            
            .filter-select,
            #search-filter {
                width: 100%;
                padding: 10px 15px;
                border-radius: 8px;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(110, 0, 255, 0.3);
                color: #fff;
                font-family: 'Rajdhani', sans-serif;
                transition: all 0.3s ease;
            }
            
            .filter-select:focus,
            #search-filter:focus {
                outline: none;
                border-color: rgba(110, 0, 255, 0.8);
                box-shadow: 0 0 10px rgba(110, 0, 255, 0.3);
            }
            
            .search-input-wrapper {
                position: relative;
            }
            
            .search-btn {
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
                background: none;
                border: none;
                color: rgba(255, 255, 255, 0.6);
                cursor: pointer;
                transition: color 0.3s ease;
            }
            
            .search-btn:hover {
                color: rgba(255, 255, 255, 1);
            }
            
            .dimensions-grid {
                padding: 50px 0;
            }
            
            .grid-container {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                gap: 30px;
                margin-top: 30px;
            }
            
            .dimension-card {
                background: rgba(21, 21, 56, 0.7);
                backdrop-filter: blur(10px);
                border-radius: 15px;
                overflow: hidden;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                opacity: 0;
                transform: translateY(20px);
            }
            
            .dimension-card.animate-in {
                animation: fadeInUp 0.6s forwards;
            }
            
            .dimension-card:hover {
                transform: translateY(-10px);
                box-shadow: 0 10px 20px rgba(110, 0, 255, 0.2);
            }
            
            .dimension-img {
                height: 200px;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(10, 10, 32, 0.5);
            }
            
            .dimension-img object {
                width: 100%;
                height: 100%;
            }
            
            .dimension-info {
                padding: 20px;
            }
            
            .dimension-title {
                font-size: 1.5rem;
                margin: 0 0 10px;
                color: #fff;
            }
            
            .dimension-desc {
                color: rgba(255, 255, 255, 0.7);
                margin-bottom: 15px;
                font-size: 0.95rem;
                line-height: 1.5;
            }
            
            .dimension-meta {
                display: flex;
                justify-content: space-between;
                margin-top: 15px;
                font-size: 0.9rem;
            }
            
            .dimension-category {
                background: rgba(110, 0, 255, 0.2);
                padding: 5px 10px;
                border-radius: 20px;
                color: rgba(255, 255, 255, 0.9);
            }
            
            .dimension-price {
                font-weight: bold;
                color: #00f2ff;
            }
            
            .dimension-actions {
                display: flex;
                gap: 10px;
                margin-top: 15px;
            }
            
            .pagination {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 40px;
                gap: 20px;
            }
            
            .pagination-btn {
                background: rgba(110, 0, 255, 0.2);
                border: 1px solid rgba(110, 0, 255, 0.3);
                color: #fff;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .pagination-btn:hover:not(:disabled) {
                background: rgba(110, 0, 255, 0.4);
            }
            
            .pagination-btn:disabled {
                opacity: 0.3;
                cursor: not-allowed;
            }
            
            .pagination-pages {
                color: rgba(255, 255, 255, 0.8);
                font-size: 1.1rem;
            }
            
            .no-results {
                grid-column: 1 / -1;
                text-align: center;
                padding: 50px 0;
                color: rgba(255, 255, 255, 0.7);
            }
            
            .no-results p {
                margin-bottom: 20px;
                font-size: 1.2rem;
            }
            
            .promo-section {
                background: linear-gradient(135deg, rgba(110, 0, 255, 0.2), rgba(0, 242, 255, 0.2));
                padding: 80px 0;
                margin-top: 50px;
                border-radius: 15px;
                text-align: center;
            }
            
            .promo-content {
                max-width: 800px;
                margin: 0 auto;
            }
            
            .promo-content h2 {
                font-size: 2.5rem;
                margin-bottom: 20px;
                color: #fff;
            }
            
            .promo-content p {
                color: rgba(255, 255, 255, 0.8);
                margin-bottom: 30px;
                font-size: 1.1rem;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @media (max-width: 768px) {
                .grid-container {
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                }
                
                .marketplace-title {
                    font-size: 2.2rem;
                }
                
                .filter-group {
                    min-width: 100%;
                }
            }
        `;
    }
});
