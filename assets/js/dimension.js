// dimension.js - Script for the dimension detail page

document.addEventListener('DOMContentLoaded', function() {
    // Get the dimension ID from the URL
    const params = getUrlParams();
    const dimensionId = parseInt(params.id);
    
    if (!dimensionId) {
        // Redirect to marketplace if no valid ID
        window.location.href = 'marketplace.html';
        return;
    }
    
    // Get dimension data
    const dimension = findDimensionById(dimensionId);
    
    if (!dimension) {
        showNotification('Dimension not found. You have been redirected to the catalog.', 'error');
        window.location.href = 'marketplace.html';
        return;
    }
    
    // Display dimension details
    displayDimensionDetails(dimension);
    
    // Load similar dimensions
    loadRelatedDimensions(dimension);
    
    // Add event listener for the purchase button
    const addToCartBtn = document.querySelector('.add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            window.multiversMarket.addToCart(dimension.id);
        });
    }
});

// Find a dimension by its ID
function findDimensionById(id) {
    // Use dimensions from the main script
    const allDimensions = [
        ...window.multiversMarket.dimensions,
        // Additional marketplace dimensions
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
            description: "World where inside and outside are reversed - people live inside a hollow sphere.",
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
    
    return allDimensions.find(dim => dim.id === id);
}

// Display dimension details
function displayDimensionDetails(dimension) {
    // Update page title
    document.title = `${dimension.name} | MultiversMarket`;
    
    // Update image
    const imageContainer = document.querySelector('.dimension-detail-image');
    if (imageContainer) {
        imageContainer.innerHTML = `<object data="${dimension.image}" type="image/svg+xml"></object>`;
    }
    
    // Update text information
    const titleEl = document.querySelector('.dimension-title');
    if (titleEl) titleEl.textContent = dimension.name;
    
    const categoryEl = document.querySelector('.dimension-category');
    if (categoryEl) categoryEl.textContent = dimension.category;
    
    const priceEl = document.querySelector('.dimension-price');
    if (priceEl) priceEl.textContent = dimension.price;
    
    const descriptionEl = document.querySelector('.dimension-description');
    if (descriptionEl) {
        // Create a detailed paragraph from the short description
        const detailedDescription = createDetailedDescription(dimension);
        descriptionEl.innerHTML = detailedDescription;
    }
}

// Create a detailed description from the short description
function createDetailedDescription(dimension) {
    // Extract keywords from the original description
    const keywords = extractKeywords(dimension.description);
    
    // Generate longer text based on these keywords and the category
    let detailedText = `<p>${dimension.description}</p>`;
    
    // Add additional paragraphs based on the category
    switch (dimension.category) {
        case 'Harmonic':
            detailedText += `
                <p>This harmonic dimension presents a perfect balance between all its constituent elements. 
                Visitors report a feeling of deep peace and connection with the environment. 
                The physical laws are stable but slightly different from our original dimension.</p>
                <p>Interdimensional researchers have classified this dimension among the most suitable for human 
                habitation, with a compatibility index of 94%.</p>
            `;
            break;
        case 'Energetic':
            detailedText += `
                <p>This energetic dimension is characterized by pure energy flows visible to the naked eye. 
                The atmosphere is charged with particles that react to visitors' emotions and thoughts. 
                Energy-based technologies are naturally amplified here.</p>
                <p>Our engineers estimate that harnessing the energy resources of this dimension 
                could power an entire civilization for millennia.</p>
            `;
            break;
        case 'Biological':
            detailedText += `
                <p>This biological dimension hosts unique and fascinating life forms that defy our 
                understanding of biology. Evolution has followed radically different paths here, creating 
                ecosystems of extraordinary complexity.</p>
                <p>Our interdimensional biologists have already identified more than 10,000 species unknown in 
                our dimension, with invaluable medical and scientific potential.</p>
            `;
            break;
        case 'Altered Physics':
            detailedText += `
                <p>This altered physics dimension operates according to fundamental laws different from ours. 
                Gravity, electromagnetism, and nuclear forces interact in unique ways, 
                creating phenomena impossible in our reality.</p>
                <p>Quantum theorists consider this dimension a natural laboratory for 
                testing hypotheses impossible to verify in our universe.</p>
            `;
            break;
        case 'Temporal':
            detailedText += `
                <p>This temporal dimension presents unique characteristics in the way time 
                flows. Visitors report experiences of time dilation, causal loops, 
                and even visible temporal bifurcations.</p>
                <p>Our interdimensional chronometrists estimate that studying this dimension could 
                revolutionize our understanding of the very nature of time.</p>
            `;
            break;
        default:
            detailedText += `
                <p>This extraordinary dimension represents a unique opportunity for exploration and discovery. 
                Our experts have spent years mapping its unique characteristics and establishing 
                safety protocols to ensure an optimal experience.</p>
            `;
    }
    
    // Add a paragraph about safety and compatibility
    detailedText += `
        <p>As with all our dimensions, this one has been rigorously tested for stability and 
        compatibility with human physiology. Our transfer portals guarantee safe passage 
        and our interdimensional support team remains available at all times for any assistance.</p>
    `;
    
    return detailedText;
}

// Extract keywords from a description
function extractKeywords(description) {
    // Simplification: return words longer than 5 letters
    return description
        .replace(/[.,;:!?]/g, '')
        .split(' ')
        .filter(word => word.length > 5)
        .map(word => word.toLowerCase());
}

// Load similar dimensions
function loadRelatedDimensions(currentDimension) {
    // Find dimensions of the same category or with similar keywords
    const allDimensions = window.multiversMarket.dimensions.concat(
        Array.from({length: 8}, (_, i) => findDimensionById(i + 5))
    );
    
    const relatedDimensions = allDimensions
        .filter(dim => dim.id !== currentDimension.id) // Exclude current dimension
        .filter(dim => 
            dim.category === currentDimension.category || // Same category
            hasCommonKeywords(dim.description, currentDimension.description) // Or common keywords
        )
        .slice(0, 3); // Limit to 3 similar dimensions
    
    // Display similar dimensions
    const relatedGrid = document.querySelector('.related-grid');
    if (relatedGrid && relatedDimensions.length > 0) {
        relatedGrid.innerHTML = '';
        
        relatedDimensions.forEach(dimension => {
            const card = window.multiversMarket.createDimensionCard(dimension);
            relatedGrid.appendChild(card);
        });
    } else if (relatedGrid) {
        // If no similar dimensions, hide the section
        const relatedSection = document.querySelector('.related-dimensions');
        if (relatedSection) {
            relatedSection.style.display = 'none';
        }
    }
}

// Check if two descriptions share keywords
function hasCommonKeywords(desc1, desc2) {
    const keywords1 = extractKeywords(desc1);
    const keywords2 = extractKeywords(desc2);
    
    return keywords1.some(word => keywords2.includes(word));
}

// getUrlParams function already defined in main.js, but redefined here for safety
function getUrlParams() {
    const params = {};
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) {
        params[key] = decodeURIComponent(value);
    });
    return params;
}

// Add specific styles to the detail page
addDetailStyles();

function addDetailStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .dimension-detail {
            padding: var(--space-xl) 0;
        }
        
        .dimension-detail-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--space-xl);
            align-items: center;
        }
        
        .dimension-detail-image {
            border-radius: var(--radius-lg);
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            background: rgba(21, 21, 56, 0.5);
            aspect-ratio: 4/3;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .dimension-detail-image object {
            width: 100%;
            height: 100%;
        }
        
        .dimension-title {
            font-size: 2.5rem;
            margin-bottom: var(--space-sm);
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }
        
        .dimension-meta {
            display: flex;
            gap: var(--space-md);
            margin-bottom: var(--space-md);
        }
        
        .dimension-category {
            background: rgba(110, 0, 255, 0.2);
            color: var(--primary);
            padding: 0.25rem 0.75rem;
            border-radius: var(--radius-sm);
            font-size: 0.9rem;
        }
        
        .dimension-price {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--accent);
        }
        
        .dimension-description {
            margin-bottom: var(--space-lg);
            line-height: 1.7;
        }
        
        .dimension-description p {
            margin-bottom: var(--space-md);
        }
        
        .dimension-features {
            margin-bottom: var(--space-lg);
            background: rgba(21, 21, 56, 0.5);
            padding: var(--space-md);
            border-radius: var(--radius-md);
        }
        
        .dimension-features h3 {
            margin-bottom: var(--space-sm);
            color: var(--accent);
        }
        
        .dimension-features ul {
            list-style: none;
            padding: 0;
        }
        
        .dimension-features li {
            padding: var(--space-xs) 0;
            position: relative;
            padding-left: var(--space-md);
        }
        
        .dimension-features li:before {
            content: '✦';
            position: absolute;
            left: 0;
            color: var(--primary);
        }
        
        .dimension-actions {
            display: flex;
            gap: var(--space-md);
        }
        
        .related-dimensions {
            padding: var(--space-xl) 0;
            background: rgba(10, 10, 32, 0.5);
        }
        
        .related-dimensions h2 {
            margin-bottom: var(--space-lg);
            text-align: center;
        }
        
        .related-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: var(--space-lg);
        }
        
        @media (max-width: 768px) {
            .dimension-detail-content {
                grid-template-columns: 1fr;
            }
            
            .dimension-actions {
                flex-direction: column;
            }
            
            .related-grid {
                grid-template-columns: 1fr;
            }
        }
    `;
    
    document.head.appendChild(style);
}
