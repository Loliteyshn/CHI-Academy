// Task 1
for (let i = 1; i <= 10; i++) {
    console.log(i);
}

let index = 1;
while (index <= 10) {
    console.log(index);
    index++;
}

// Task 2
const differentTypesArray = [1, 'Hello', true, 2, 'world', false, 10, 'CHI', 'Academy', 20];
differentTypesArray.forEach(i => console.log(typeof i));

for (let i = 0; i < differentTypesArray.length; i++) {
    console.log(typeof differentTypesArray[i]);
}

index = 0;
while (index < differentTypesArray.length) {
    console.log(typeof differentTypesArray[index]);
    index++;
}

index = 0;
do {
    console.log(typeof differentTypesArray[index]);
    index++;
} while (index < differentTypesArray.length);

// Task 3
const objectsArray = [
    { name: 'Julie', age: 19, pets: ['cat'] },
    { name: 'Lolita', age: 22, pets: [] },
    { name: 'Tom', age: 26, pets: ['dog'] }
]

console.log(objectsArray.filter(item => item.age > 20));

// Task 4
objectsArray.map(item => item.pets.push('hamster'));
console.log(objectsArray);

// Task 5
const array = [];

for (let i = 0; i < 10; i++) {
    array.push(42);
}
array.splice(4, 1, 'answer')
console.log(array);
const word = array.find(item => item === 'answer');
console.log(word);

// Task 6
const object = {
    id: 1,
    task: 'To do homework',
    completed: true
}

const keys = Object.keys(object);
const values = Object.values(object);

if (object.hasOwnProperty('completed')) {
    console.log('Object has the property: completed');
}

for (let key of keys) {
    console.log(`key: ${key} - value: ${object[key]}`);
}

for (let val of values) {
    if (typeof val === "boolean") console.log(val);
}