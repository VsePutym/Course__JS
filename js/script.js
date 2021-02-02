'use strict';

let money = +prompt('your monthly income?', 70000);
let income = 'freelance';
let addExpenses = prompt('List the possible expenses for the calculated period, separated by commas', );
let deposit = confirm('Do you have a bank deposit?');
let mission = 250000;
let period = 10;
let dayInMonth = 30;
let expenses1 = prompt('Enter the required expense item', 'Transport');
let amount1 = +prompt('How much will it cost?', 2500);
let expenses2 = prompt('Enter the required expense item', 'Food');
let amount2 = +prompt('How much will it cost?', 13000);
let accumulatedMonth;

addExpenses = addExpenses.split(',');

function getExpensesMonth(a, b){
    return a + b;
}
getExpensesMonth(amount1, amount2);

function getAccumulatedMonth(a, b){
    return a - b;
}
accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amount1, amount2));

let budgetDay = accumulatedMonth / dayInMonth;

function getTargetMonth(arg1, arg2){
    return arg1 / arg2;
}
getTargetMonth(mission, accumulatedMonth);

function showTypeOf(data){
    console.log(data, typeof(data));
}

showTypeOf('your monthly expenses ' + getExpensesMonth(amount1, amount2));
showTypeOf('your possible expenses ' + addExpenses);
showTypeOf('budget target achieved in ' + Math.ceil(getTargetMonth(mission, accumulatedMonth)));
showTypeOf('budget for the day ' + Math.floor(budgetDay));


let getStatusIncome = function(){
    if( budgetDay >= 1200){
        return('you have a high income level');
    }else if( budgetDay >= 600 && budgetDay <= 1200){
        return('You have an average income');
    }else if( budgetDay <= 600 && budgetDay >= 0){
        return('Unfortunately your income is below average');
    }else if( budgetDay <= 0 ){
        return('Something went wrong');
    }
};

getStatusIncome();
console.log(getStatusIncome());
