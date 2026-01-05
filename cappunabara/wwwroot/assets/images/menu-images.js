// ========== CAPPUNABARA MENU IMAGES - AESTHETIC SVG COLLECTION ==========

const menuImages = {
    // COFFEE CATEGORY - Realistic coffee cup designs
    coffee: {
        cappuccino: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="cupGradient" cx="50%" cy="30%" r="70%">
                    <stop offset="0%" style="stop-color:#f8f9fa"/>
                    <stop offset="100%" style="stop-color:#e9ecef"/>
                </radialGradient>
                <radialGradient id="coffeeGradient" cx="50%" cy="20%" r="80%">
                    <stop offset="0%" style="stop-color:#d4a574"/>
                    <stop offset="50%" style="stop-color:#8B6F47"/>
                    <stop offset="100%" style="stop-color:#6b4e3d"/>
                </radialGradient>
                <radialGradient id="foamGradient" cx="50%" cy="30%" r="60%">
                    <stop offset="0%" style="stop-color:#ffffff"/>
                    <stop offset="100%" style="stop-color:#f1f3f4"/>
                </radialGradient>
            </defs>
            <!-- Saucer -->
            <ellipse cx="100" cy="170" rx="80" ry="15" fill="#e9ecef" opacity="0.8"/>
            <!-- Cup body -->
            <path d="M40 120 Q40 160 100 160 Q160 160 160 120 L150 80 Q150 70 140 70 L60 70 Q50 70 50 80 Z" fill="url(#cupGradient)" stroke="#dee2e6" stroke-width="2"/>
            <!-- Handle -->
            <path d="M160 100 Q180 100 180 120 Q180 140 160 140" fill="none" stroke="#dee2e6" stroke-width="8" stroke-linecap="round"/>
            <!-- Coffee -->
            <ellipse cx="100" cy="80" rx="45" ry="8" fill="url(#coffeeGradient)"/>
            <!-- Foam -->
            <ellipse cx="100" cy="75" rx="40" ry="6" fill="url(#foamGradient)"/>
            <!-- Cocoa powder -->
            <circle cx="90" cy="75" r="1" fill="#8B6F47" opacity="0.6"/>
            <circle cx="110" cy="73" r="1" fill="#8B6F47" opacity="0.6"/>
            <circle cx="105" cy="77" r="0.8" fill="#8B6F47" opacity="0.6"/>
            <circle cx="95" cy="78" r="0.8" fill="#8B6F47" opacity="0.6"/>
            <!-- Steam -->
            <path d="M85 60 Q87 50 85 40 Q83 30 85 20" fill="none" stroke="#f8f9fa" stroke-width="2" opacity="0.7" stroke-linecap="round"/>
            <path d="M100 60 Q102 50 100 40 Q98 30 100 20" fill="none" stroke="#f8f9fa" stroke-width="2" opacity="0.7" stroke-linecap="round"/>
            <path d="M115 60 Q117 50 115 40 Q113 30 115 20" fill="none" stroke="#f8f9fa" stroke-width="2" opacity="0.7" stroke-linecap="round"/>
        </svg>`,
        
        latte: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="latteGradient" cx="50%" cy="20%" r="80%">
                    <stop offset="0%" style="stop-color:#f4e4bc"/>
                    <stop offset="50%" style="stop-color:#d4a574"/>
                    <stop offset="100%" style="stop-color:#8B6F47"/>
                </radialGradient>
                <radialGradient id="milkFoam" cx="50%" cy="30%" r="60%">
                    <stop offset="0%" style="stop-color:#ffffff"/>
                    <stop offset="100%" style="stop-color:#f8f9fa"/>
                </radialGradient>
            </defs>
            <!-- Saucer -->
            <ellipse cx="100" cy="170" rx="75" ry="12" fill="#e9ecef"/>
            <!-- Cup -->
            <path d="M45 125 Q45 155 100 155 Q155 155 155 125 L148 85 Q148 75 140 75 L60 75 Q52 75 52 85 Z" fill="url(#cupGradient)" stroke="#dee2e6" stroke-width="2"/>
            <!-- Handle -->
            <path d="M155 105 Q170 105 170 120 Q170 135 155 135" fill="none" stroke="#dee2e6" stroke-width="6" stroke-linecap="round"/>
            <!-- Latte -->
            <ellipse cx="100" cy="85" rx="42" ry="7" fill="url(#latteGradient)"/>
            <!-- Milk foam with latte art -->
            <ellipse cx="100" cy="82" rx="38" ry="5" fill="url(#milkFoam)"/>
            <!-- Latte art - heart -->
            <path d="M100 85 Q95 80 90 82 Q85 84 90 88 Q95 85 100 90 Q105 85 110 88 Q115 84 110 82 Q105 80 100 85" fill="#8B6F47" opacity="0.3"/>
        </svg>`,
        
        americano: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="americanoGradient" cx="50%" cy="20%" r="80%">
                    <stop offset="0%" style="stop-color:#4a3728"/>
                    <stop offset="50%" style="stop-color:#3d2b1f"/>
                    <stop offset="100%" style="stop-color:#2c1810"/>
                </radialGradient>
            </defs>
            <!-- Saucer -->
            <ellipse cx="100" cy="170" rx="75" ry="12" fill="#e9ecef"/>
            <!-- Cup -->
            <path d="M45 125 Q45 155 100 155 Q155 155 155 125 L148 85 Q148 75 140 75 L60 75 Q52 75 52 85 Z" fill="url(#cupGradient)" stroke="#dee2e6" stroke-width="2"/>
            <!-- Handle -->
            <path d="M155 105 Q170 105 170 120 Q170 135 155 135" fill="none" stroke="#dee2e6" stroke-width="6" stroke-linecap="round"/>
            <!-- Black coffee -->
            <ellipse cx="100" cy="85" rx="42" ry="7" fill="url(#americanoGradient)"/>
            <!-- Coffee surface reflection -->
            <ellipse cx="95" cy="83" rx="15" ry="2" fill="#4a3728" opacity="0.5"/>
        </svg>`,
        
        mocha: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="mochaGradient" cx="50%" cy="20%" r="80%">
                    <stop offset="0%" style="stop-color:#8B4513"/>
                    <stop offset="50%" style="stop-color:#654321"/>
                    <stop offset="100%" style="stop-color:#3d2b1f"/>
                </radialGradient>
                <radialGradient id="whippedCream" cx="50%" cy="30%" r="60%">
                    <stop offset="0%" style="stop-color:#ffffff"/>
                    <stop offset="100%" style="stop-color:#f8f9fa"/>
                </radialGradient>
            </defs>
            <!-- Saucer -->
            <ellipse cx="100" cy="170" rx="75" ry="12" fill="#e9ecef"/>
            <!-- Cup -->
            <path d="M45 125 Q45 155 100 155 Q155 155 155 125 L148 85 Q148 75 140 75 L60 75 Q52 75 52 85 Z" fill="url(#cupGradient)" stroke="#dee2e6" stroke-width="2"/>
            <!-- Handle -->
            <path d="M155 105 Q170 105 170 120 Q170 135 155 135" fill="none" stroke="#dee2e6" stroke-width="6" stroke-linecap="round"/>
            <!-- Mocha -->
            <ellipse cx="100" cy="88" rx="42" ry="8" fill="url(#mochaGradient)"/>
            <!-- Whipped cream -->
            <ellipse cx="100" cy="78" rx="38" ry="8" fill="url(#whippedCream)"/>
            <ellipse cx="95" cy="75" rx="8" ry="3" fill="url(#whippedCream)"/>
            <ellipse cx="105" cy="76" rx="6" ry="2" fill="url(#whippedCream)"/>
            <!-- Chocolate shavings -->
            <rect x="98" y="74" width="1" height="3" fill="#654321" opacity="0.8"/>
            <rect x="102" y="75" width="1" height="2" fill="#654321" opacity="0.8"/>
            <rect x="96" y="76" width="1" height="2" fill="#654321" opacity="0.8"/>
        </svg>`
    },
    
    // TEA CATEGORY - Elegant teacup designs
    tea: {
        earlGrey: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="teaGradient" cx="50%" cy="20%" r="80%">
                    <stop offset="0%" style="stop-color:#d4a574"/>
                    <stop offset="50%" style="stop-color:#b8860b"/>
                    <stop offset="100%" style="stop-color:#8B6914"/>
                </radialGradient>
                <pattern id="floralPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="2" fill="#e9ecef" opacity="0.3"/>
                </pattern>
            </defs>
            <!-- Saucer -->
            <ellipse cx="100" cy="170" rx="70" ry="10" fill="#f8f9fa" stroke="#e9ecef" stroke-width="1"/>
            <!-- Teacup -->
            <path d="M50 120 Q50 150 100 150 Q150 150 150 120 L145 90 Q145 85 140 85 L60 85 Q55 85 55 90 Z" fill="url(#cupGradient)" stroke="#dee2e6" stroke-width="2"/>
            <rect x="55" y="85" width="90" height="35" fill="url(#floralPattern)"/>
            <!-- Elegant handle -->
            <path d="M150 105 Q165 100 168 115 Q165 130 150 125" fill="none" stroke="#dee2e6" stroke-width="4" stroke-linecap="round"/>
            <path d="M150 108 Q160 105 162 115 Q160 125 150 122" fill="none" stroke="#f8f9fa" stroke-width="1"/>
            <!-- Tea -->
            <ellipse cx="100" cy="90" rx="40" ry="6" fill="url(#teaGradient)"/>
            <!-- Steam -->
            <path d="M90 75 Q92 65 90 55" fill="none" stroke="#f8f9fa" stroke-width="1.5" opacity="0.6" stroke-linecap="round"/>
            <path d="M110 75 Q112 65 110 55" fill="none" stroke="#f8f9fa" stroke-width="1.5" opacity="0.6" stroke-linecap="round"/>
        </svg>`,
        
        greenTea: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="greenTeaGradient" cx="50%" cy="20%" r="80%">
                    <stop offset="0%" style="stop-color:#90EE90"/>
                    <stop offset="50%" style="stop-color:#6B8E23"/>
                    <stop offset="100%" style="stop-color:#556B2F"/>
                </radialGradient>
            </defs>
            <!-- Saucer -->
            <ellipse cx="100" cy="170" rx="70" ry="10" fill="#f8f9fa" stroke="#e9ecef" stroke-width="1"/>
            <!-- Teacup -->
            <path d="M50 120 Q50 150 100 150 Q150 150 150 120 L145 90 Q145 85 140 85 L60 85 Q55 85 55 90 Z" fill="url(#cupGradient)" stroke="#dee2e6" stroke-width="2"/>
            <!-- Handle -->
            <path d="M150 105 Q165 100 168 115 Q165 130 150 125" fill="none" stroke="#dee2e6" stroke-width="4" stroke-linecap="round"/>
            <!-- Green tea -->
            <ellipse cx="100" cy="90" rx="40" ry="6" fill="url(#greenTeaGradient)"/>
            <!-- Tea leaves floating -->
            <ellipse cx="95" cy="88" rx="3" ry="1" fill="#6B8E23" opacity="0.7"/>
            <ellipse cx="105" cy="91" rx="2" ry="1" fill="#6B8E23" opacity="0.7"/>
        </svg>`
    },
    
    // BUBBLE TEA CATEGORY - Modern bubble tea cups
    bubble: {
        brownSugar: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="bubbleTeaGradient" cx="50%" cy="20%" r="80%">
                    <stop offset="0%" style="stop-color:#DEB887"/>
                    <stop offset="50%" style="stop-color:#CD853F"/>
                    <stop offset="100%" style="stop-color:#8B4513"/>
                </radialGradient>
                <radialGradient id="bubbleGradient" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" style="stop-color:#2F1B14"/>
                    <stop offset="100%" style="stop-color:#1a0e0a"/>
                </radialGradient>
            </defs>
            <!-- Cup -->
            <rect x="60" y="60" width="80" height="120" rx="10" ry="10" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2"/>
            <!-- Lid -->
            <ellipse cx="100" cy="60" rx="45" ry="8" fill="#e9ecef" stroke="#dee2e6" stroke-width="2"/>
            <!-- Straw -->
            <rect x="120" y="30" width="6" height="100" fill="#FF6B6B" rx="3"/>
            <rect x="118" y="28" width="10" height="8" fill="#FF6B6B" rx="5"/>
            <!-- Brown sugar milk tea -->
            <rect x="65" y="80" width="70" height="95" fill="url(#bubbleTeaGradient)" rx="5"/>
            <!-- Brown sugar swirls -->
            <path d="M70 90 Q80 85 90 90 Q100 95 110 90 Q120 85 130 90" fill="none" stroke="#8B4513" stroke-width="3" opacity="0.6"/>
            <path d="M70 110 Q85 105 100 110 Q115 115 130 110" fill="none" stroke="#8B4513" stroke-width="2" opacity="0.6"/>
            <!-- Tapioca pearls -->
            <circle cx="75" cy="160" r="4" fill="url(#bubbleGradient)"/>
            <circle cx="85" cy="165" r="4" fill="url(#bubbleGradient)"/>
            <circle cx="95" cy="162" r="4" fill="url(#bubbleGradient)"/>
            <circle cx="105" cy="168" r="4" fill="url(#bubbleGradient)"/>
            <circle cx="115" cy="164" r="4" fill="url(#bubbleGradient)"/>
            <circle cx="125" cy="167" r="4" fill="url(#bubbleGradient)"/>
        </svg>`,
        
        taro: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="taroGradient" cx="50%" cy="20%" r="80%">
                    <stop offset="0%" style="stop-color:#E6E6FA"/>
                    <stop offset="50%" style="stop-color:#DDA0DD"/>
                    <stop offset="100%" style="stop-color:#9370DB"/>
                </radialGradient>
            </defs>
            <!-- Cup -->
            <rect x="60" y="60" width="80" height="120" rx="10" ry="10" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2"/>
            <!-- Lid -->
            <ellipse cx="100" cy="60" rx="45" ry="8" fill="#e9ecef" stroke="#dee2e6" stroke-width="2"/>
            <!-- Straw -->
            <rect x="120" y="30" width="6" height="100" fill="#32CD32" rx="3"/>
            <rect x="118" y="28" width="10" height="8" fill="#32CD32" rx="5"/>
            <!-- Taro milk tea -->
            <rect x="65" y="80" width="70" height="95" fill="url(#taroGradient)" rx="5"/>
            <!-- Tapioca pearls -->
            <circle cx="75" cy="160" r="4" fill="url(#bubbleGradient)"/>
            <circle cx="90" cy="165" r="4" fill="url(#bubbleGradient)"/>
            <circle cx="105" cy="162" r="4" fill="url(#bubbleGradient)"/>
            <circle cx="120" cy="167" r="4" fill="url(#bubbleGradient)"/>
        </svg>`
    },
    
    // DESSERT CATEGORY - Elegant cake and pastry designs
    dessert: {
        tiramisu: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="cakeGradient" cx="50%" cy="30%" r="70%">
                    <stop offset="0%" style="stop-color:#F5DEB3"/>
                    <stop offset="100%" style="stop-color:#DEB887"/>
                </radialGradient>
                <radialGradient id="creamGradient" cx="50%" cy="30%" r="70%">
                    <stop offset="0%" style="stop-color:#FFFACD"/>
                    <stop offset="100%" style="stop-color:#F5F5DC"/>
                </radialGradient>
            </defs>
            <!-- Plate -->
            <ellipse cx="100" cy="160" rx="80" ry="15" fill="#f8f9fa" stroke="#e9ecef" stroke-width="2"/>
            <!-- Cake base -->
            <rect x="60" y="120" width="80" height="40" fill="url(#cakeGradient)" rx="5"/>
            <!-- Cream layer -->
            <rect x="60" y="100" width="80" height="20" fill="url(#creamGradient)" rx="3"/>
            <!-- Top cake layer -->
            <rect x="60" y="80" width="80" height="20" fill="url(#cakeGradient)" rx="3"/>
            <!-- Cocoa powder -->
            <rect x="60" y="75" width="80" height="5" fill="#8B4513" opacity="0.6" rx="2"/>
            <!-- Cocoa dusting -->
            <circle cx="80" cy="77" r="1" fill="#654321" opacity="0.8"/>
            <circle cx="100" cy="76" r="1" fill="#654321" opacity="0.8"/>
            <circle cx="120" cy="78" r="1" fill="#654321" opacity="0.8"/>
        </svg>`,
        
        cheesecake: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="cheesecakeGradient" cx="50%" cy="30%" r="70%">
                    <stop offset="0%" style="stop-color:#FFFACD"/>
                    <stop offset="100%" style="stop-color:#F0E68C"/>
                </radialGradient>
                <radialGradient id="blueberryGradient" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" style="stop-color:#6495ED"/>
                    <stop offset="100%" style="stop-color:#4169E1"/>
                </radialGradient>
            </defs>
            <!-- Plate -->
            <ellipse cx="100" cy="160" rx="80" ry="15" fill="#f8f9fa" stroke="#e9ecef" stroke-width="2"/>
            <!-- Crust -->
            <rect x="65" y="140" width="70" height="20" fill="#DEB887" rx="5"/>
            <!-- Cheesecake -->
            <path d="M65 140 Q65 90 100 90 Q135 90 135 140 Z" fill="url(#cheesecakeGradient)"/>
            <!-- Blueberries -->
            <circle cx="85" cy="100" r="4" fill="url(#blueberryGradient)"/>
            <circle cx="100" cy="95" r="4" fill="url(#blueberryGradient)"/>
            <circle cx="115" cy="105" r="4" fill="url(#blueberryGradient)"/>
            <circle cx="95" cy="110" r="3" fill="url(#blueberryGradient)"/>
            <circle cx="110" cy="98" r="3" fill="url(#blueberryGradient)"/>
        </svg>`
    },
    
    // FOOD CATEGORY - Fresh and appetizing food illustrations
    food: {
        salad: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="bowlGradient" cx="50%" cy="30%" r="70%">
                    <stop offset="0%" style="stop-color:#ffffff"/>
                    <stop offset="100%" style="stop-color:#f8f9fa"/>
                </radialGradient>
            </defs>
            <!-- Bowl -->
            <path d="M40 120 Q40 160 100 160 Q160 160 160 120 Q160 110 150 110 L50 110 Q40 110 40 120 Z" fill="url(#bowlGradient)" stroke="#dee2e6" stroke-width="2"/>
            <!-- Lettuce -->
            <ellipse cx="80" cy="115" rx="15" ry="8" fill="#90EE90" opacity="0.8"/>
            <ellipse cx="120" cy="118" rx="12" ry="6" fill="#90EE90" opacity="0.8"/>
            <ellipse cx="100" cy="110" rx="18" ry="10" fill="#90EE90" opacity="0.8"/>
            <!-- Tomatoes -->
            <circle cx="90" cy="120" r="5" fill="#FF6347"/>
            <circle cx="110" cy="125" r="4" fill="#FF6347"/>
            <!-- Croutons -->
            <rect x="95" y="115" width="6" height="6" fill="#DEB887" rx="1"/>
            <rect x="105" y="118" width="5" height="5" fill="#DEB887" rx="1"/>
        </svg>`,
        
        sandwich: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="breadGradient" cx="50%" cy="30%" r="70%">
                    <stop offset="0%" style="stop-color:#F5DEB3"/>
                    <stop offset="100%" style="stop-color:#DEB887"/>
                </radialGradient>
            </defs>
            <!-- Plate -->
            <ellipse cx="100" cy="160" rx="70" ry="12" fill="#f8f9fa" stroke="#e9ecef" stroke-width="1"/>
            <!-- Bottom bread -->
            <ellipse cx="100" cy="140" rx="50" ry="15" fill="url(#breadGradient)"/>
            <!-- Lettuce -->
            <ellipse cx="100" cy="130" rx="45" ry="8" fill="#90EE90" opacity="0.9"/>
            <!-- Tomato -->
            <ellipse cx="100" cy="125" rx="40" ry="5" fill="#FF6347" opacity="0.8"/>
            <!-- Chicken -->
            <ellipse cx="100" cy="120" rx="42" ry="6" fill="#DEB887"/>
            <!-- Cheese -->
            <ellipse cx="100" cy="115" rx="38" ry="4" fill="#FFD700" opacity="0.8"/>
            <!-- Top bread -->
            <ellipse cx="100" cy="105" rx="50" ry="15" fill="url(#breadGradient)"/>
            <!-- Toothpick -->
            <rect x="99" y="85" width="2" height="40" fill="#8B4513"/>
            <circle cx="100" cy="85" r="3" fill="#FF6347"/>
        </svg>`
    }
};

// Function to get image for menu item
function getMenuImage(itemName, category) {
    const name = itemName.toLowerCase();
    
    // Coffee category
    if (category === 'coffee') {
        if (name.includes('cappuccino')) return menuImages.coffee.cappuccino;
        if (name.includes('latte')) return menuImages.coffee.latte;
        if (name.includes('americano')) return menuImages.coffee.americano;
        if (name.includes('mocha')) return menuImages.coffee.mocha;
        return menuImages.coffee.cappuccino; // default
    }
    
    // Tea category
    if (category === 'tea') {
        if (name.includes('green')) return menuImages.tea.greenTea;
        return menuImages.tea.earlGrey; // default
    }
    
    // Bubble tea category
    if (category === 'bubble') {
        if (name.includes('taro')) return menuImages.bubble.taro;
        return menuImages.bubble.brownSugar; // default
    }
    
    // Dessert category
    if (category === 'dessert') {
        if (name.includes('tiramisu')) return menuImages.dessert.tiramisu;
        if (name.includes('cheesecake')) return menuImages.dessert.cheesecake;
        return menuImages.dessert.tiramisu; // default
    }
    
    // Food category
    if (category === 'food') {
        if (name.includes('salad')) return menuImages.food.salad;
        if (name.includes('sandwich') || name.includes('wrap')) return menuImages.food.sandwich;
        return menuImages.food.sandwich; // default
    }
    
    // Default fallback
    return menuImages.coffee.cappuccino;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { menuImages, getMenuImage };
}