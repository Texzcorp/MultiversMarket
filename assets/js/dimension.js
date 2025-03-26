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
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
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
    const imageContainer = document.querySelector('.dimension-visual');
    if (imageContainer) {
        imageContainer.innerHTML = `<object data="${dimension.image}" type="image/svg+xml"></object>`;
    }
    
    // Update text information
    const titleEl = document.querySelector('.dimension-title');
    if (titleEl) titleEl.textContent = dimension.name;
    
    // Update dimension ID
    const idEl = document.querySelector('.dimension-id');
    if (idEl) idEl.textContent = `#${dimension.id}`;
    
    // Update dimension type, stability, and discovery info
    const typeEl = document.querySelector('.dimension-type .value');
    if (typeEl) typeEl.textContent = dimension.category || 'Unknown';
    
    // Update stability info
    const stabilityEl = document.querySelector('.dimension-stability .value');
    if (stabilityEl) {
        // Determine stability based on category
        let stability = 'Unknown';
        switch (dimension.category) {
            case 'Harmonic':
                stability = 'Extremely Stable (98%)';
                break;
            case 'Energetic':
                stability = 'Fluctuating (76%)';
                break;
            case 'Biological':
                stability = 'Stable (85%)';
                break;
            case 'Altered Physics':
                stability = 'Variable (62%)';
                break;
            case 'Temporal':
                stability = 'Unstable (45%)';
                break;
            default:
                stability = 'Moderate (70%)';
        }
        stabilityEl.textContent = stability;
    }
    
    // Update discovery info
    const discoveryEl = document.querySelector('.dimension-discovery .value');
    if (discoveryEl) {
        // Generate a discovery date based on the dimension ID
        const currentYear = new Date().getFullYear();
        const discoveryYear = currentYear - (dimension.id * 3 + 5);
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const month = months[dimension.id % 12];
        discoveryEl.textContent = `${month} ${discoveryYear}`;
    }
    
    // Update price
    const priceEl = document.querySelector('.amount');
    if (priceEl) {
        // Extract numeric value from price string (e.g., "19.2 ETH" -> "19.2")
        const priceValue = dimension.price.split(' ')[0];
        priceEl.textContent = priceValue;
    }
    
    // Update currency symbol if ETH
    const currencyEl = document.querySelector('.currency');
    if (currencyEl && dimension.price.includes('ETH')) {
        currencyEl.textContent = 'ETH';
    }
    
    // Update description
    const descriptionEl = document.querySelector('.dimension-description p');
    if (descriptionEl) {
        descriptionEl.textContent = dimension.description;
    }
    
    // Update features list
    const featuresList = document.querySelector('.features-list');
    if (featuresList) {
        // Create a detailed description from the short description
        const detailedDescription = createDetailedDescription(dimension);
        
        // Extract features from the detailed description
        const features = extractFeatures(dimension, detailedDescription);
        
        // Clear loading message
        featuresList.innerHTML = '';
        
        // Add features
        features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
        });
    }
    
    // Update add to cart button
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.setAttribute('data-dimension-id', dimension.id);
    }
}

// Extract features from the detailed description
function extractFeatures(dimension, detailedDescription) {
    // Simple extraction of key points from the detailed description
    const features = [];
    
    // Add category-specific feature
    features.push(`${dimension.category} dimension with unique properties`);
    
    // Add more features based on keywords in the description
    const keywords = extractKeywords(dimension.description);
    if (keywords.length > 0) {
        features.push(`Contains elements of: ${keywords.join(', ')}`);
    }
    
    // Add generic features
    features.push('Safe for human exploration');
    features.push('Fully mapped and catalogued');
    features.push('24/7 interdimensional support');
    
    return features;
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
        .filter(dim => dim && dim.id !== currentDimension.id) // Exclude current dimension
        .filter(dim => 
            dim.category === currentDimension.category || // Same category
            hasCommonKeywords(dim.description, currentDimension.description) // Or common keywords
        )
        .slice(0, 3); // Limit to 3 similar dimensions
    
    // Display similar dimensions
    const relatedGrid = document.querySelector('.related-dimensions-grid');
    if (relatedGrid && relatedDimensions.length > 0) {
        relatedGrid.innerHTML = '';
        
        relatedDimensions.forEach(dimension => {
            const card = createRelatedDimensionCard(dimension);
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

// Create a card for a related dimension
function createRelatedDimensionCard(dimension) {
    const card = document.createElement('div');
    card.className = 'related-dimension-card';
    
    // Create image container
    const imageContainer = document.createElement('div');
    imageContainer.className = 'related-dimension-image';
    imageContainer.innerHTML = `<object data="${dimension.image}" type="image/svg+xml"></object>`;
    
    // Create content container
    const contentContainer = document.createElement('div');
    contentContainer.className = 'related-dimension-content';
    
    // Create title
    const title = document.createElement('h3');
    title.className = 'related-dimension-title';
    title.textContent = dimension.name;
    
    // Create category
    const category = document.createElement('span');
    category.className = 'related-dimension-category';
    category.textContent = dimension.category;
    
    // Create description
    const description = document.createElement('p');
    description.className = 'related-dimension-description';
    description.textContent = dimension.description.length > 100 
        ? dimension.description.substring(0, 100) + '...' 
        : dimension.description;
    
    // Create price
    const price = document.createElement('div');
    price.className = 'related-dimension-price';
    price.textContent = dimension.price;
    
    // Create link
    const link = document.createElement('a');
    link.className = 'related-dimension-link';
    link.href = `dimension.html?id=${dimension.id}`;
    link.textContent = 'View Dimension';
    
    // Assemble the card
    contentContainer.appendChild(title);
    contentContainer.appendChild(category);
    contentContainer.appendChild(description);
    contentContainer.appendChild(price);
    contentContainer.appendChild(link);
    
    card.appendChild(imageContainer);
    card.appendChild(contentContainer);
    
    return card;
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
        
        .related-dimensions-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: var(--space-lg);
        }
        
        .related-dimension-card {
            display: flex;
            flex-direction: column;
            gap: var(--space-md);
            padding: var(--space-md);
            border-radius: var(--radius-md);
            background: rgba(21, 21, 56, 0.5);
        }
        
        .related-dimension-image {
            border-radius: var(--radius-lg);
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            background: rgba(21, 21, 56, 0.5);
            aspect-ratio: 4/3;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .related-dimension-image object {
            width: 100%;
            height: 100%;
        }
        
        .related-dimension-content {
            display: flex;
            flex-direction: column;
            gap: var(--space-sm);
        }
        
        .related-dimension-title {
            font-size: 1.5rem;
            margin-bottom: var(--space-sm);
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }
        
        .related-dimension-category {
            background: rgba(110, 0, 255, 0.2);
            color: var(--primary);
            padding: 0.25rem 0.75rem;
            border-radius: var(--radius-sm);
            font-size: 0.9rem;
        }
        
        .related-dimension-description {
            margin-bottom: var(--space-md);
            line-height: 1.7;
        }
        
        .related-dimension-price {
            font-size: 1.2rem;
            font-weight: 700;
            color: var(--accent);
        }
        
        .related-dimension-link {
            text-decoration: none;
            color: var(--primary);
        }
        
        @media (max-width: 768px) {
            .dimension-detail-content {
                grid-template-columns: 1fr;
            }
            
            .dimension-actions {
                flex-direction: column;
            }
            
            .related-dimensions-grid {
                grid-template-columns: 1fr;
            }
        }
    `;
    
    document.head.appendChild(style);
}
