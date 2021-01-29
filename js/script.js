//! variables ================================================

let money = 70000;

let income = 'freelance';

let addExpenses = 'Cat, Shope, Store, Taxi, Education';

const deposit = 10000;

const mission = 1000000;

const period = 12;

let budgetDay = null;

const manth = 30;



//? functional block =========================================

budgetDay = money / manth;

//* additional block =========================================

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(', '));