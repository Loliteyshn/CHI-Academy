const baseUrl = 'https://rickandmortyapi.com/api/character';

const body = document.body;
const usersList = document.getElementById('users-list');
const modalWindow = document.querySelector('.modal-background');
const modalContent = document.querySelector('.modal-content');
const closeBtn = document.querySelector('.modal-close');

let listInfo = {};
let isListLoading = false;

async function getUsers(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Error fetching users');
        const data = await response.json()
        return data;
    } catch (err) {
        console.error('Error occur: ', err);
    }
}

function renderListItem(item) {
    return `<div class="card" data-event="card-handler" data-card_id="${item.id}">
      <img src="${item.image}" alt="${item.name}">
      <div class="card-info">
          <h3>${item.name}</h3>
          <span class="status ${item.status.toLowerCase()}">
              ${item.status}
          </span>
      </div>
    </div>`;
}

async function renderList(url) {
    if (isListLoading || !url) return;

    try {
        isListLoading = true;
        loader.classList.remove('hidden');

        const { info, results } = await getUsers(url);
        listInfo = info;

        usersList.innerHTML += results.map(renderListItem).join('')
    } catch (error) {
        console.log(error);
        usersList.innerHTML = 'Something went wrong';
    } finally {
        isListLoading = false;
        loader.classList.add('hidden');
    }
}

async function showModal(id) {
    const user = await getUsers(`${baseUrl}/${id}`);
    modalWindow.classList.remove('modal-hidden');
    body.style.overflow = 'hidden';
    modalContent.innerHTML = '';
    modalContent.innerHTML = `
        <img src="${user?.image}" alt="">
        <h3>${user.name}</h3>
        <p>${user.status}</p>`;
}

eventListHandlers = {
    'card-handler': (event) =>
        showModal(event.target.dataset.card_id),
    'modal-close': (event) => {
        if (event.target.dataset.event !== 'modal-close') return;
        modalWindow.classList.add('modal-hidden');
        body.style.overflow = 'auto';
    }
}

document.querySelector('body').addEventListener('click', event => {
    const target = event.target.closest('[data-event]');
    if (!target) return;

    const action = target.dataset.event;
    eventListHandlers[action] && eventListHandlers[action](event);
});

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        renderList(listInfo.next);
    }
});


renderList(baseUrl);

