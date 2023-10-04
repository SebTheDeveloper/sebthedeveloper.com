import food from "./food.js";
import gear from "./gear.js";


const tabs = document.querySelectorAll('nav li');

function selectTab() {
  const selected = document.querySelector('.curr-tab');
  if (this !== selected) {
    tabs.forEach(tab => {
      tab.classList.toggle('curr-tab');
    });
    loadMenu(this);
  }
}

function loadMenu(tab = 'Food') {
  let tabTextContent = tab.textContent || tab;
  const currTab = tabTextContent.toLowerCase();
  const menu = document.querySelector('.menu-inventory');

  if (currTab === 'food') {
    menu.innerHTML = food();
  } else {
    menu.innerHTML = gear();
  }

  selectCartItems(menu);
  topWalletBalance();
  backToTop();
}

function topWalletBalance() {

  const firstItem = document.querySelector('.menu-item:nth-of-type(3)');
  const walletBalanceTop = document.querySelector('.wallet-balance-top');

  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio === 0) {
        return
      } else if ((entry.intersectionRect.top > 0)) {
        if (entry.isIntersecting) {
          walletBalanceTop.classList.remove('hidden');
          walletBalanceTop.classList.add('valid');
        } else {
          walletBalanceTop.classList.add('hidden');
          walletBalanceTop.classList.remove('valid');
          walletBalanceTop.classList.remove('invalid');
        }
      }
    });
  }, { threshold: 0.5 });

  observer.observe(firstItem);
}

function backToTop() {

  const [...menuItems] = document.querySelectorAll('.menu-item');
  const lastItem = menuItems[menuItems.length - 1];
  const backToTopBtn = document.querySelector('.back-to-top');

  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio === 0) {
        return;
      } else if (entry.intersectionRatio === 1) {
        backToTopBtn.classList.add('visible');
      } else if (entry.intersectionRect.top > 0) {
        backToTopBtn.style.opacity = '0';
        setTimeout(() => {
          backToTopBtn.classList.remove('visible');
          backToTopBtn.style = '';
        }, 600);
      }
    });
  }, { threshold: 1 });

  observer.observe(lastItem);
}

function createContinueButton() {
  
}

function selectCartItems(menu) {
  const items = menu.querySelectorAll('.menu-item');

  items.forEach(item => {
    const itemName = item.querySelector('p').textContent;
    const btn = item.querySelector('button');
    const clickForStats = item.querySelector('.click-for-stats');

    if (sessionStorage.getItem(itemName)) {
      item.classList.add('selected-item');
      btn.textContent = 'Remove from Cart';
      createContinueButton()
    }
    
    btn.addEventListener('click', () => {
      const price = Number(item.querySelector('#price').textContent.slice(1));
      let walletBalance = Number(sessionStorage.getItem('walletBalance'));
      const walletBalanceTop = document.querySelector('.wallet-balance-top');
      const walletBalanceFixed = document.querySelector('.wallet-balance');

      if (btn.textContent === 'Add to Cart') {

        if ((walletBalance - price) < 0) {
          item.classList.add('menu-item-invalid');
          walletBalanceFixed.classList.add('invalid');
          walletBalanceTop.classList.add('invalid');

          walletBalanceFixed.addEventListener('animationend', () => {
            walletBalanceFixed.classList.remove('invalid');
          }, { once: true });
          walletBalanceTop.addEventListener('animationend', () => {
            walletBalanceTop.classList.remove('invalid');
          }, { once: true });
          item.addEventListener('animationend', () => {
            item.classList.remove('menu-item-invalid');
          }, { once: true });

          return;
        } else {
          walletBalance -= price;
          sessionStorage.setItem('walletBalance', walletBalance);
        }
        btn.textContent = 'Remove from Cart';

      } else {
        btn.textContent = 'Add to Cart';
        walletBalance += price;
        sessionStorage.setItem('walletBalance', walletBalance);
      }

      item.classList.toggle('selected-item');
      manageSessionStorage(item);
    });

    clickForStats.addEventListener('click', () => {
      item.querySelector('.stats').style.display = 'flex';
      item.querySelector('.click-for-stats').style.display = 'none';
    });
  });
}

function manageSessionStorage(item) {
  const itemName = item.querySelector('p').textContent;
  if (sessionStorage.getItem(itemName)) {
    sessionStorage.removeItem(itemName);
  } else {
    sessionStorage.setItem(itemName, "item selected");
  }
  
  const walletBalanceSpan = document.querySelector('.wallet-balance span');
  const walletBalanceTop = document.querySelector('.wallet-balance-top');
  walletBalanceSpan.textContent = `$${sessionStorage.getItem('walletBalance')}`;
  walletBalanceTop.textContent = `$ ${sessionStorage.getItem('walletBalance')}`;
}

export default function menuTabs() {
  tabs.forEach(tab => {
    tab.addEventListener('click', selectTab);
  });
  loadMenu();
}