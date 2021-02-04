'use strict';

let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
let income = 'freelance';
let addExpenses = prompt('List the possible expenses for the calculated period, separated by commas', );
let deposit = confirm('Do you have a bank deposit?');
let mission = 250000;
let period = 10;
let dayInMonth = 30;
let expenses = [];
let accumulatedMonth;

addExpenses = addExpenses.split(',');

let start = function(){
    do{
        money = prompt('your monthly income?');
    }while (!isNumber(money));
};

start();


let getExpensesMonth = function(){
    let cost;
    let sum = 0;
    for(let i = 0; i < 2; i++ ){
        expenses[i] = prompt('Enter the required expense item');
        do{
            cost = prompt('How much will it cost?');
        }while(!isNumber(cost));
        sum += +cost;
    }
    console.log(expenses);
    return sum;
};

let expensesAmount = getExpensesMonth();

function getAccumulatedMonth(a, b){
    return a - b;
}
accumulatedMonth = getAccumulatedMonth(money, expensesAmount);

let budgetDay = accumulatedMonth / dayInMonth;

function getTargetMonth(arg1, arg2){
    return arg1 / arg2;
}
let targetMonth = getTargetMonth(mission, accumulatedMonth);



function showTypeOf(data){
    console.log(data, typeof(data));
}

function targetAchieved(){
    if(targetMonth < 0){
        console.log(('The goal will not be achieved'));
    }else{
        console.log('budget target achieved in ' + Math.ceil(targetMonth));
    }
}

showTypeOf('your monthly expenses ' + expensesAmount);
showTypeOf('your possible expenses ' + addExpenses);
showTypeOf(targetAchieved());
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
