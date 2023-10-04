const foodItems = [
  {
    name: 'Box of Canned Goods',
    price: '$40',
    src: 'images/box-of-canned-goods.png',
    health: '3',
    longevity: '5',
    energy: '2',
    strength:'3'
  },
  {
    name: 'Tuna Sandwich',
    price: '$7',
    src: 'images/tuna-sandwich.png',
    health: '3',
    longevity: '1',
    energy: '4',
    strength: '3'
  },
  {
    name: 'Water Jug (5 Gal)',
    price: '$20',
    src: 'images/water-jug-5-gallon.png',
    health: '5',
    longevity: '5',
    energy: '4',
    strength: '4'
  },
  {
    name: 'Coffee Beans',
    price: '$12',
    src: 'images/coffee-beans.png',
    health: '3',
    longevity: '4',
    energy: '5',
    strength: '2'
  },
  {
    name: 'Bottle of Whiskey',
    price: '$27',
    src: 'images/whiskey-bottle.png',
    health: '1',
    longevity: '5',
    energy: '2',
    strength: '3'
  },
  {
    name: 'Red Apple',
    price: '$3',
    src: 'images/red-apple.png',
    health: '5',
    longevity: '2',
    energy: '4',
    strength: '3'
  },
  {
    name: 'Old Chinese Food',
    price: '$9',
    src: 'images/chinese-food.png',
    health: '1',
    longevity: '2',
    energy: '3',
    strength: '4'
  },
  {
    name: 'Coconut',
    price: '$7',
    src: 'images/coconut.png',
    health: '4',
    longevity: '3',
    energy: '5',
    strength: '2'
  },
  {
    name: 'Bowl of Rice',
    price: '$4',
    src: 'images/bowl-of-rice.png',
    health: '3',
    longevity: '5',
    energy: '4',
    strength: '2'
  },
  {
    name: 'Canned Mystery Food',
    price: '$5',
    src: 'images/canned-mystery-food.png',
    health: '2',
    longevity: '5',
    energy: '4',
    strength: '3'
  },
  {
    name: 'Dog Food Bites',
    price: '$2',
    src: 'images/dog-food-bites.png',
    health: '1',
    longevity: '4',
    energy: '1',
    strength: '2'
  }
];

function createMarkup() {
  let htmlBuffer = '';
  
  for (let i in foodItems) {
    const name = foodItems[i].name;
    const price = foodItems[i].price;
    const src = foodItems[i].src;
    const health = foodItems[i].health;
    const longevity = foodItems[i].longevity;
    const energy = foodItems[i].energy;
    const strength = foodItems[i].strength;

    if (i % 2 === 0) {
      htmlBuffer += `
        <div class="menu-item">
          <div class="item">
            <img src="${src}" id="menu-image" loading="lazy" alt="${name}" title="${name}">
            <div class="description">
              <p>${name}</p>
              <p id="price">${price}</p>
              <button>Add to Cart</button>
            </div>
          </div>

          <div class="click-for-stats">VIEW ITEM STATS</div>
          
          <div class="stats">
            <p id="item-stats">Item Stats</p>
            <div class="chart-item">
              <p>Health:</p>
              <div class="chart-bar" id="level-${health}"></div>
              <p>${health}/5</p>
            </div>
            <div class="chart-item">
              <p>Longevity:</p>
              <div class="chart-bar" id="level-${longevity}"></div>
              <p>${longevity}/5</p>
            </div>
            <div class="chart-item">
              <p>Energy:</p>
              <div class="chart-bar" id="level-${energy}"></div>
              <p>${energy}/5</p>
            </div>
            <div class="chart-item">
              <p>Strength:</p>
              <div class="chart-bar" id="level-${strength}"></div>
              <p>${strength}/5</p>
            </div>
          </div>
        </div>
      `;
    } else {
      htmlBuffer += `
        <div class="menu-item">
          <div class="item">
            <div class="description">
              <p>${name}</p>
              <p id="price">${price}</p>
              <button>Add to Cart</button>
            </div>
            <img src="${src}" id="menu-image" loading="lazy" alt="${name}" title="${name}">
          </div>

          <div class="click-for-stats">View Item Stats</div>

          <div class="stats">
            <p id="item-stats">Item Stats</p>
            <div class="chart-item">
              <p>Health:</p>
              <div class="chart-bar" id="level-${health}"></div>
              <p>${health}/5</p>
            </div>
            <div class="chart-item">
              <p>Longevity:</p>
              <div class="chart-bar" id="level-${longevity}"></div>
              <p>${longevity}/5</p>
            </div>
            <div class="chart-item">
              <p>Energy:</p>
              <div class="chart-bar" id="level-${energy}"></div>
              <p>${energy}/5</p>
            </div>
            <div class="chart-item">
              <p>Strength:</p>
              <div class="chart-bar" id="level-${strength}"></div>
              <p>${strength}/5</p>
            </div>
          </div>
        </div>
      `;
    }
  }

  htmlBuffer += `
  <div class="back-to-top">
  <a href="#">Back to Top</a>
  </div>`;

  return htmlBuffer;
}

export default function food() {
  return createMarkup();
}