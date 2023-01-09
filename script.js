const body = document.querySelector('body');
const modalBackBtn = document.querySelectorAll('.modal-back-btn');
const projectModal = document.querySelector('.project-set-modal');
const logo = document.querySelector('.logo');
const nextBtn = document.querySelectorAll('.see-next');
const getInTouch = document.querySelector('#get-in-touch');
let welcomeMessage = 'Hi, my name is Sebastian.';

document.querySelector('.color-fade').onclick = (e) => {
    body.classList.toggle('color-mode-toggle');
    const root = document.querySelector(':root');
    // Dark mode
    if (body.classList.contains('color-mode-toggle')) {
        logo.src = '/images/SebDoubleU-icon-dark-mode.png';
        e.target.src = './images/svg/dark-mode.svg';
        root.style.setProperty('--link-text', 'var(--white)');
        root.style.setProperty('--gray', '#585858');
    }
    // Light Mode
    else {
        logo.src = '/images/SebDoubleU-icon.png';
        e.target.src = './images/svg/light-mode.svg';
        root.style.setProperty('--link-text', '#212529');
        root.style.setProperty('--gray', '#8297b7');
    }
    document.querySelector('.btn-outline-secondary').classList.toggle('dark-mode-button');
    document.querySelectorAll('.link-dark').forEach(element => {
        element.classList.toggle('header-links');
    });
}

let darkModeDefault = window.matchMedia('(prefers-color-scheme: dark)').matches;
if(darkModeDefault) {
    document.querySelector('.color-fade').click()
}

typewriter = () => {
    const h1 = document.querySelector('h1');
    h1.textContent = welcomeMessage.substring(0, typewriterIndex);

    if (typewriterIndex++ != welcomeMessage.length) {
        setTimeout(typewriter, 70);
    } else {
        if (welcomeMessage == 'Hi, my name is Sebastian.') {
            welcomeMessage = 'Here is some of my work:';
            typewriterIndex = 0;
            setTimeout(typewriter, 1300);
        } else {
            const main = document.querySelector('.main');
            main.style.display = 'block';
        }
    }
}
let typewriterIndex = 0;
document.addEventListener('DOMContentLoaded', typewriter);

let picCount = 0;
let picArray = ['/images/examples/example1.png', '/images/examples/example2.png', '/images/examples/example3.png', '/images/examples/example4.png', '/images/examples/example5.png'];
let projectTitle = ['Calculator App', 'Title 2', 'Title 3', 'Title 4', 'Title 5'];

nextBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        if (picCount == picArray.length - 1) {
            picCount = 0;
            updateCurrentProject();
        } else {
            picCount++;
            updateCurrentProject();
        }
    });
});

updateCurrentProject();

projectModal.style.display = 'none';
document.querySelectorAll('.view-project-btn').forEach(element => {
    element.onclick = () => {
    if (body.classList.contains('color-mode-toggle')) {
        projectModal.style.backgroundColor = 'rgb(37, 37, 37)';
    } else {   
        projectModal.style.backgroundColor = 'rgb(243, 243, 243)';
    }
    document.querySelector('body').style.overflow = 'hidden';
    projectModal.style.display = 'flex';
    updateCurrentProject();
    }
});

modalBackBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        projectModal.classList.add('fade');
        projectModal.addEventListener('animationend', () => {
            if (projectModal.classList.contains('fade')) {
                projectModal.style.display = 'none';
                document.querySelector('body').style.overflow = 'auto';
            }
            projectModal.classList.remove('fade');
        });
    });
});

function updateCurrentProject() {
    const h2 = document.querySelectorAll('h2');
    document.querySelector('.img-carousel').src = picArray[picCount];
    document.querySelector('.curr-project').src = picArray[picCount];
    document.querySelector('.curr-num').textContent = `0${picCount + 1}`;
    h2.forEach(h2 => {
        h2.textContent = projectTitle[picCount];
    });
}