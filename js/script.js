'use string';

let money = 70000;
let income = 'freelance';
let addExpenses = 'Cat, Shope, Store, Taxi, Education';
let deposit = 10000;
let mission = 1000000;
let period = 12;
let budgetDay = null;
let dayInMonth = 30;
let expenses1 = prompt('Введите обязательную статью расходов?' + '');
let amount1 = +prompt('Во сколько это обойдется?' + '');
let expenses2 = prompt('Введите обязательную статью расходов?' + '');
let amount2 = +prompt('Во сколько это обойдется?' + '');

budgetDay = money / dayInMonth;
money = +prompt('ваш месячный доход?' + '');
addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через запятую' + '');
deposit = confirm('Есть ли у вас депозит в банке?');
    let budgetMonth = amount1 + amount2;
    console.log(budgetMonth);
    const howMonth = mission / budgetMonth;
    console.log(Math.ceil(howMonth));
    budgetDay = howMonth / budgetDay;
    console.log(Math.floor(budgetDay));

    if( budgetDay > 1200){
        alert('у вас высокий уровень дохода');
    }else if( budgetDay > 600 && budgetDay < 1200){
        alert('У вас средний уровень дохода');
    }else if( budgetDay < 600 && budgetDay > 0){
        alert('К сожалению у вас уровень дохода ниже среднего');
    }else if( budgetDay <= 0 ){
        alert('Что то пошло не так');
    }
