'use strict';

let money = +prompt('your monthly income?', 70000);
let income = 'freelance';
let addExpenses = prompt('List the possible expenses for the calculated period, separated by commas');
let deposit = confirm('Do you have a bank deposit?');
let mission = 250000;
let period = 10;
let dayInMonth = 30;
let expenses1 = prompt('Enter the required expense item', 'Transport');
let amount1 = +prompt('How much will it cost?', 2500);
let expenses2 = prompt('Enter the required expense item', 'Food');
let amount2 = +prompt('How much will it cost?', 13000);
let consumption = amount1 + amount2;
let budgetMonth = money - consumption;
let budgetDay = budgetMonth / dayInMonth;

console.log(typeof money);
console.log(typeof income);
console.log(addExpenses.length);
console.log('The period is ' + period + ' months');
console.log('Purpose to earn ' + mission + ' rubles');
console.log(addExpenses.toLowerCase().split(', '));
console.log(typeof deposit);
console.log('your monthly budget ' + budgetMonth);
console.log('budget target achieved in ' + (Math.ceil(mission / budgetMonth) +  ' months'));
console.log('budget for the day ' + (Math.floor(budgetDay)));

    if( budgetDay >= 1200){
        alert('you have a high income level');
    }else if( budgetDay >= 600 && budgetDay <= 1200){
        alert('You have an average income');
    }else if( budgetDay <= 600 && budgetDay >= 0){
        alert('Unfortunately your income is below average');
    }else if( budgetDay <= 0 ){
        alert('Something went wrong');
    }