/*
task1 Задание:
Выполните рефакторинг кода. Сделайте так, чтобы объекты создавались не через литералы, а через функцию конструктор.
*/

    // let user1 = {
    //     firstName: "Ivan",
    //     lastName: "Ivanov",
            
    //     show: function () {
    //     console.log(this.firstName + " " + this.lastName);
    //     }
    // }

    // let user2 = {
    //     firstName: "Olga",
    //     lastName: "Petrova",
            
    //     show: function () {
    //         console.log(this.firstName + " " + this.lastName);
    //     }
    // }

    // user1.show();
    // user2.show();

function User (firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;

    this.show = function(){
        console.log(this.firstName + " " + this.lastName);
    }
}

let user1 = new User("Ivan", "Ivanov");
let user2 = new User("Olga", "Petrova");

user1.show();
user2.show();

 /*
Task 2. Задание:
Выполните рефакторинг кода. Замените фабричный метод createUser на функцию конструктор.
*/

function Ruser(login, email) {
    this.login = login;
    this.email = email;

    this.showContactInfo =  function () {
        console.log("Мой логин " + this.login + ", мой email " + this.email);
    }
}

let ruser1 = new Ruser("admin", "admin@example.com");
let ruser2 = new Ruser("user", "user@example.com");

ruser1.showContactInfo();
ruser2.showContactInfo();


 /*
        Задание:
        Найдите и исправьте ошибку в коде.
        */

        function Car(image, manufacturer, model, year, VIN) {
            this.image = image;
            this.manufacturer = manufacturer;
            this.model = model;
            this.year = year;
            this.VIN = VIN;

            this.showStats = function (element) {
                element.insertAdjacentHTML("beforeend", `<img src="images/${this.image}" /><br />`);
                element.insertAdjacentHTML("beforeend", `Производитель: ${this.manufacturer}<br />`);
                element.insertAdjacentHTML("beforeend", `Модель: ${this.model}<br />`);
                element.insertAdjacentHTML("beforeend", `Год выпуска: ${this.year}<br />`);
                element.insertAdjacentHTML("beforeend", `VIN: ${this.VIN}<br />`);
            };
        }

        let car1 = new Car("audi-a6-250.jpg", "Audi", "A6", 2011, "ABCD1234567890XYZ");
        let car2 = new Car("jaguar-x-type-250.jpg", "Jaguar", "X-Type", 2008, "DCAF0987654321XYZ");
        let car3 = new Car("porsche-carrera-911-250.jpg", "Porsce", "Carrera 911", 2011, "EFGH0987654321XYZ");

        let placeholder1 = document.querySelector("#placeholder1");
        let placeholder2 = document.querySelector("#placeholder2");
        let placeholder3 = document.querySelector("#placeholder3");

        car1.showStats(placeholder1);
        car2.showStats(placeholder2);
        car3.showStats(placeholder3);

/*
Task4 Задание:
Перепишите функцию конструктор Rect. Вынесите методы из экземпляра в прототип.
*/
function Rect(width, height) {
    this.width = width;
    this.height = height;
}
Rect.prototype.getArea = function () {
   return  this.height * this.width;
}

Rect.prototype.getPerimeter = function () {
    return this.height * 2 + this.width * 2;
}


let rect1 = new Rect(100, 50);
let rect2 = new Rect(25, 33);

console.log("rect1 area " + rect1.getArea());
console.log("rect1 perimeter " + rect1.getPerimeter());

console.log("rect2 area " + rect2.getArea());
console.log("rect2 perimeter " + rect2.getPerimeter());

/*
Tas5 Задание:
Изучите реализацию данного примера. Примените прототипы, где это возможно.
*/

let taskNameInput = document.querySelector("#task-name-input");
let addTaskButton = document.querySelector("#add-task-btn");
let startMessage = document.querySelector("#start-message");
let taskList = document.querySelector(".task-list");

addTaskButton.addEventListener("click", addTaskHandler);

taskNameInput.addEventListener("keydown", function (e) {
    if (e.code == "Enter") addTaskHandler();
})

function addTaskHandler() {
    if (taskNameInput.value) {
        if (!startMessage.hidden) startMessage.hidden = true;

        let newTask = new Task(taskNameInput.value);
        newTask.createIn(taskList);

        taskNameInput.value = "";
     } else {
        alert("введите имя задачи");
    }
}

function Task(text) {
    this.text = text;
    this.isDone = false;
    this.div = null;
}

Task.prototype.createIn = function (element) {
    this.div = document.createElement("div");
    this.div.classList.add("task");

    let input = document.createElement("input");
    input.addEventListener("click", () => this.changeState(this.div));
    input.type = "checkbox";

    let p = document.createElement("p");
    p.innerText = this.text;

    this.div.append(input);
    this.div.append(p);
    element.append(this.div);
}

Task.prototype.changeState = function (element) {
        this.isDone = !this.isDone;
        element.classList.toggle("completed");
    }
