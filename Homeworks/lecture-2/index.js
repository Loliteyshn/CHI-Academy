// task 1
function addParamsToRequest(params) {
    let count = 0;
    return function (data) {
        let currentCount = count;
        count++
        return {
            ...params,
            ...data,
            count: currentCount
        }
    }
}

const sendData = addParamsToRequest({ 'access-token': 'qwerty' });

const result = sendData({ data: [4, 5, 6] });
// console.log(result);

const res2 = sendData({ data: [1, 2, 3] })
// console.log(res2);


// task 2
const obj = {
    getData: function () {
        console.log(`Person name is: ${this.name} and age ${this.age}`)
    }
}

obj.getData.call({ name: 'Lolita', age: 22 });
const getData = obj.getData.bind({ name: 'Lolita', age: 22 });

// task 3
const root = {
    name: 'name',
    type: 'folder',
    children: [
        {
            name: 'folder 1',
            type: 'folder',
            children: [
                {
                    name: 'folder 2',
                    type: 'folder',
                    children: [
                        {
                            name: 'file 3',
                            type: 'file',
                            size: 30
                        }
                    ]
                }
            ]
        },
        {
            name: 'file 1',
            type: 'file',
            size: 10
        },
        {
            name: 'file 2',
            type: 'file',
            size: 20
        }
    ]
};
const files = [];

function findFiles(obj) {
    if (obj.type === 'file') {
        files.push(obj.name);
    } else {
        for (let i of obj.children) {
            findFiles(i);
        }
    }
}
findFiles(root);

// task 4
// ES5
function PersonOld(name, phone) {
    this.name = name;
    this.phone = phone;
}
PersonOld.prototype.introduce = function () {
    console.log(`Привіт, мене звати ${this.name}, мій номер ${this.phone}`);
}

function StudentOld(name, phone, course) {
    PersonOld.call(this, name, phone);
    this.course = course;
}
StudentOld.prototype = Object.create(PersonOld.prototype);
StudentOld.prototype.constructor = StudentOld;
StudentOld.prototype.study = function () {
    console.log(`Я навчаюся на ${this.course} курсі`);
}

function TeacherOld(name, phone, subject) {
    PersonOld.call(this, name, phone);
    this.subject = subject;
}
TeacherOld.prototype = Object.create(PersonOld.prototype);
TeacherOld.prototype.constructor = TeacherOld;
TeacherOld.prototype.teach = function () {
    console.log(`Я викладаю ${this.subject}`);
}

const student = new StudentOld('Lolita', 89024, 2);
student.introduce();
student.study();

// ES6

class Person {
    constructor(name, phone) {
        this._name = name;
        this._phone = phone;
    }

    introduce() {
        console.log(`Привіт, мене звати ${this._name}, мій номер ${this._phone}`);
    }
}

class Student extends Person {
    constructor(name, phone, course) {
        super(name, phone);
        this._course = course;
    }

    study() {
        console.log(`Я навчаюся на ${this._course} курсі`);
    }
}

class Teacher extends Person {
    constructor(name, phone, subject) {
        super(name, phone);
        this._subject = subject;
    }

    teach() {
        console.log(`Я викладаю ${this._subject}`);
    }
}

const student2 = new Student('Lolita 2', 3456789, 4);
student2.introduce();
student2.study();