const gearItems = [
  {
    name: 'Hunting Rifle',
    price: '$275',
    src: 'images/hunting-rifle.png',
    damage: '2',
    protection: '3',
    effectOnVitality: '1',
    longevity: '4'
  },
  {
    name: 'Ray Gun',
    price: '$1100',
    src: 'images/ray-gun.png',
    damage: '5',
    protection: '5',
    effectOnVitality: '2',
    longevity: '3'
  },
  {
    name: 'Machete',
    price: '$45',
    src: 'images/machete.png',
    damage: '2',
    protection: '2',
    effectOnVitality: '1',
    longevity: '4'
  },
  {
    name: 'Baseball Bat',
    price: '$20',
    src: 'images/baseball-bat.png',
    damage: '1',
    protection: '2',
    effectOnVitality: '1',
    longevity: '2'
  },
  {
    name: '.357 Magnum Revolver',
    price: '$550',
    src: 'images/revolver.png',
    damage: '3',
    protection: '3',
    effectOnVitality: '1',
    longevity: '4'
  },
  {
    name: 'Molotov Cocktail',
    price: '$35',
    src: 'images/molotov-cocktail.png',
    damage: '4',
    protection: '3',
    effectOnVitality: '1',
    longevity: '1'
  },
  {
    name: 'Gas Mask',
    price: '$150',
    src: 'images/gas-mask.png',
    damage: '1',
    protection: '4',
    effectOnVitality: '5',
    longevity: '4'
  },
  {
    name: 'Hazmat Suit',
    price: '$400',
    src: 'images/hazmat-suit.png',
    damage: '1',
    protection: '4',
    effectOnVitality: '5',
    longevity: '4'
  },
  {
    name: 'Banshee',
    price: '$1500',
    src: 'images/banshee.png',
    damage: '5',
    protection: '5',
    effectOnVitality: '5',
    longevity: '4'
  },
  {
    name: 'Minigun',
    price: '$1000',
    src: 'images/minigun.png',
    damage: '5',
    protection: '5',
    effectOnVitality: '1',
    longevity: '2'
  },
  {
    name: 'Flamethrower',
    price: '$500',
    src: 'images/flame-thrower.png',
    damage: '4',
    protection: '3',
    effectOnVitality: '1',
    longevity: '3'
  },
  {
    name: 'Robo Dog Companion',
    price: '$1400',
    src: 'images/robo-dog.png',
    damage: '3',
    protection: '5',
    effectOnVitality: '5',
    longevity: '4'
  },
  {
    name: 'Fidget Spinner',
    price: '$15',
    src: 'images/fidget-spinner.png',
    damage: '1',
    protection: '1',
    effectOnVitality: '5',
    longevity: '5'
  }
];

function createMarkup() {
  let htmlBuffer = '';
  
  for (let i in gearItems) {
    const name = gearItems[i].name;
    const price = gearItems[i].price;
    const src = gearItems[i].src;
    const damage = gearItems[i].damage;
    const protection = gearItems[i].protection;
    const effectOnVitality = gearItems[i].effectOnVitality;
    const longevity = gearItems[i].longevity;

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
              <p>Damage:</p>
              <div class="chart-bar" id="level-${damage}"></div>
              <p>${damage}/5</p>
            </div>
            <div class="chart-item">
              <p>Protection:</p>
              <div class="chart-bar" id="level-${protection}"></div>
              <p>${protection}/5</p>
            </div>
            <div class="chart-item">
              <p>Effect on Vitality:</p>
              <div class="chart-bar" id="level-${effectOnVitality}"></div>
              <p>${effectOnVitality}/5</p>
            </div>
            <div class="chart-item">
              <p>Longevity:</p>
              <div class="chart-bar" id="level-${longevity}"></div>
              <p>${longevity}/5</p>
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

          <div class="click-for-stats">VIEW ITEM STATS</div>
          
          <div class="stats">
            <p id="item-stats">Item Stats</p>
            <div class="chart-item">
              <p>Damage:</p>
              <div class="chart-bar" id="level-${damage}"></div>
              <p>${damage}/5</p>
            </div>
            <div class="chart-item">
              <p>Protection:</p>
              <div class="chart-bar" id="level-${protection}"></div>
              <p>${protection}/5</p>
            </div>
            <div class="chart-item">
              <p>Effect on Vitality:</p>
              <div class="chart-bar" id="level-${effectOnVitality}"></div>
              <p>${effectOnVitality}/5</p>
            </div>
            <div class="chart-item">
              <p>Longevity:</p>
              <div class="chart-bar" id="level-${longevity}"></div>
              <p>${longevity}/5</p>
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

export default function gear() {
  return createMarkup();
}