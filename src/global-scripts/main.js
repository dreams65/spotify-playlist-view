/// Main JavaScript File
/// Here we import all the global JavaScript files we need for our project.

import '../global-styles/style.scss'

let endpoint = '/assets/json/data.json';
let templateSong = document.querySelector('.template');
let playList = document.querySelector('.playlist__songs');
let playListWrapper = document.querySelector('.playlist__songs_wrapper');
// playListWrapper.style.display = 'block';

fetch(`${endpoint}`)
    .then((result) => result.json())
    .then((data) => renderPlayList(data))


function renderPlayList(data) {

    for (const key in data) {
        let clone = templateSong.content.cloneNode(true);
        clone.querySelector('.id').textContent = `${data[key].id}`;
        clone.querySelector('.song-item__cover').src = `${data[key].img}`;
        clone.querySelector('.song-item__albom').textContent = `${data[key].albom}`;
        clone.querySelector('.song-item__name').textContent = `${data[key].name}`;
        clone.querySelector('.artist-name').textContent = `${data[key].artist}`;
        clone.querySelector('.duration').textContent = `${data[key].time}`;
        playList.appendChild(clone);
    }
};

function removeMenu() {
    let menus = document.querySelectorAll('.context-menu__items');
    menus.forEach(items => {
        items.classList.remove('active');
    })
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('like-btn')) {
        handleLike(e.target)
    }

    if (e.target.classList.contains('play')) {
        handlePlay(e.target);
    }

    if (e.target.classList.contains('playlist-menu-btn')) {
        handleMenuSong(e.target);
    }

})

const handleLike = (selector) => {

    if (selector.getAttribute('data-like') == 'false') {
        selector.setAttribute('data-like', true)
    } else {
        selector.setAttribute('data-like', false)
    }
}

const handlePlay = (selector) => {

    let songItems = document.querySelectorAll('.song-item');
    songItems.forEach(items => {
        items.classList.remove('active');
    })

    selector.closest('.song-item').classList.add('active');
}

const handleMenuSong = (selector) => {

    removeMenu();
    let songItem = selector.closest('.song-item');
    let contextMenuItems = songItem.querySelector('.context-menu__items');

    contextMenuItems.classList.add('active');

    playListWrapper.style.display = 'block';
    playListWrapper.addEventListener('click', () => {
        removeMenu();
        playListWrapper.style.display = 'none';
    })

    contextMenuItems.addEventListener('mouseleave', function() {
        this.classList.remove('active');
    });
};

