'use string';

let money = 70000;

let income = 'freelance';

let addExpenses = 'Cat, Shope, Store, Taxi, Education';

let deposit = 10000;

let mission = 1000000;

let period = 12;

let budgetDay = null;

let month = 30;


budgetDay = money / month;


console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(', '));
console.log(budgetDay);