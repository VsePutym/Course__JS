'use strict';

let money = 70000;
let income = 'freelance';
let addExpenses = 'Cat, Shope, Store, Taxi, Education';
let deposit = 10000;
let mission = 250000;
let period = 10;
let budgetDay = null;
let dayInMonth = 30;
let expenses1 = prompt('Введите обязательную статью расходов?' + '');
let amount1 = +prompt('Во сколько это обойдется?' + '');
let expenses2 = prompt('Введите обязательную статью расходов?' + '');
let amount2 = +prompt('Во сколько это обойдется?' + '');
let consumption = amount1 + amount2;


budgetDay = money / dayInMonth;

console.log(typeof money);
console.log(typeof income);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');


money = +prompt('ваш месячный доход?' + '');
addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через запятую' + '');
console.log(addExpenses.toLowerCase().split(', '));
deposit = confirm('Есть ли у вас депозит в банке?');
console.log(typeof deposit);
    let budgetMonth = money - consumption;
    console.log('ваш месячный бюджет ' + budgetMonth);
    const howMonth = budgetMonth * period / mission;
    console.log('цель бюджета достигнута за ' + (Math.ceil(howMonth) +  ' месяцев'));
    budgetDay = howMonth * dayInMonth * budgetDay / dayInMonth;
    console.log('бюджет на день ' + (Math.floor(budgetDay)));

    if( budgetDay > 1200){
        alert('у вас высокий уровень дохода');
    }else if( budgetDay > 600 && budgetDay < 1200){
        alert('У вас средний уровень дохода');
    }else if( budgetDay < 600 && budgetDay > 0){
        alert('К сожалению у вас уровень дохода ниже среднего');
    }else if( budgetDay <= 0 ){
        alert('Что то пошло не так');
    }
