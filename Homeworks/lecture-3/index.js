// Task 1 Factory
class Transport {
    constructor() { }

    ride() {
        throw new Error('ride() is not implemented');
    }

    stop() {
        throw new Error('ride() is not implemented');
    }
}

class Car extends Transport {
    constructor() {
        super();
        this.type = 'car';
    }

    ride() {
        console.log(`The ${this.type} is driving`);
    }

    stop() {
        console.log(`The ${this.type} has stopped`);
    }
}

class Bike extends Transport {
    constructor() {
        super();
        this.type = 'bike';
    }

    ride() {
        console.log(`The ${this.type} is moving`);
    }

    stop() {
        console.log(`The ${this.type} has stopped`);
    }
}

class TransportFactory {
    static createTransport(type) {
        switch (type) {
            case 'car':
                return new Car();
            case 'bike':
                return new Bike();
            default:
                throw new Error('Unknown transport type');
        }
    }
}

const car = TransportFactory.createTransport('car');
// car.ride();
// car.stop();

const bike = TransportFactory.createTransport('bike');
// bike.ride();
// bike.stop();

// task 2 DOM
const app = document.getElementById('app');

function renderLoader() {
    app.innerHTML = `
    <div class="loader">
      Loading...
    </div> `;
}

async function getUsers(url) {
    try {
        renderLoader();

        const response = await fetch(url);
        if (!response.ok) throw new Error('Error fetching users');
        const data = await response.json()
        return data;
    } catch (err) {
        console.error('Error occur: ', err);
    }
}

function atachListennerToBtn(btnName, data) {
    const button = document.getElementById(btnName);
    if (!data.info[btnName]) {
        button.disabled = true;
        return;
    }
    button.addEventListener('click', async () => {
        const newUsers = await getUsers(data.info[btnName]);
        renderApp(newUsers);
    });
}

function getPageNumber(info) {
    if (!info.next) return info.pages;

    const parsedUrl = new URL(info.next);
    return parsedUrl.searchParams.get('page') - 1;
}

function renderApp(data) {
    app.innerHTML = '';

    const pageNumber = getPageNumber(data.info);

    data.results.forEach(item => {
        app.innerHTML += `
          <div class="card">
            <img src="${item.image}" alt="${item.name}">
            <div class="card-info">
                <h3>${item.name}</h3>
                <span class="status ${item.status.toLowerCase()}">
                    ${item.status}
                </span>
            </div>
          </div>
        `;
    });

    app.innerHTML += `
      <div class="pagination">
        <button id="prev">Prev</button>
        <span class="page">${pageNumber}</span>
        <button id="next">Next</button>
      </div>
    `;

    atachListennerToBtn('next', data);
    atachListennerToBtn('prev', data);
}


(async () => {
    const users = await getUsers('https://rickandmortyapi.com/api/character');
    renderApp(users);
})()



