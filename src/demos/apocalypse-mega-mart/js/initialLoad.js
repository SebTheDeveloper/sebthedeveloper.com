export default function initialLoad() {

  const pickYourPoison = document.querySelector('.pick-your-poison');
  const menu = document.querySelector('.menu');

  const startingWalletBalance = '2000';
  const walletBalanceSpan = document.querySelector('.wallet-balance span');
  const walletBalanceTop = document.querySelector('.wallet-balance-top');

  if (sessionStorage.getItem('walletBalance')) {
    pickYourPoison.style.display = 'none';
    menu.classList.add('menu-display');
    menu.classList.add('menu-visible');
    walletBalanceSpan.textContent = `$${sessionStorage.getItem('walletBalance')}`;
    walletBalanceTop.textContent = `$${sessionStorage.getItem('walletBalance')}`;
  } else {
    sessionStorage.setItem('walletBalance', startingWalletBalance);
    setTimeout(() => {
      pickYourPoison.style.display = 'none';
      menu.classList.add('menu-display');
      menu.classList.add('menu-visible');
      walletBalanceSpan.textContent = `$${startingWalletBalance}`;
      walletBalanceTop.textContent = `$${startingWalletBalance}`;
    }, 4700);
  }

}