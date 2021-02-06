'use strict';

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    start = function () {
        do {
            money = prompt('your monthly income?');
        } while (!isNumber(money));
        money = Number(money);
    };

start();

let appData = {
    targetMonth: 0,
    dayInMonth: 30,
    expensesMonth: 0,
    budgetMonth: 0,
    budgetDay: 0,
    budget: money,
    income: {}, //* This is additional income  доп. доходы.
    addIncome: [], //? тут мы будем перечислять дополнительные доходы
    expenses: {}, //!содержит доп. расходы
    addExpenses: [], //** массив с возможными расходами
    deposit: false,
    mission: 250000,
    period: 12,
    asking: function () { //? тут будем распрашивать пользователя

        let addExpenses = prompt('List the possible expenses for the calculated period, separated by commas', );
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Do you have a bank deposit?');
        for (let i = 0; i < 2; i++) {
            let key = prompt('Enter the required expense item');
            let cost = 0;
            do {
                cost = prompt('How much will it cost?');
            } while (!isNumber(cost));
            cost = Number(cost);
            appData.expenses[key] = cost;
        }
    },
    getExpensesMonth: function () { //? сумирует обязательные расходы
        let sum = 0;
        for (let key in appData.expenses) {
            sum += appData.expenses[key];
            appData.expensesMonth = sum;
        }
        return sum;
    },


    getBudget: function () { //!вычисляем бюджет на месяц
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        return appData.budgetMonth;

    },
    getTargetMonth: function (a, b, c, d) { //! за сколько накопим
        appData.budgetDay = a / b;
        appData.targetMonth = c / d;
        return appData.budgetDay, appData.targetMonth;
    },
    getStatusIncome: function () {
        if (appData.budgetDay >= 1200) {
            return ('you have a high income level');
        } else if (appData.budgetDay >= 600 && appData.budgetDay <= 1200) {
            return ('You have an average income');
        } else if (appData.budgetDay <= 600 && appData.budgetDay >= 0) {
            return ('Unfortunately your income is below average');
        } else if (appData.budgetDay <= 0) {
            return ('Something went wrong');
        }
    },
    targetAchieved: function() {
        if (appData.targetMonth > 0) {
            console.log(appData.budgetDay, appData.targetMonth);
            console.log('Day ' + Math.ceil(appData.budgetDay));
            console.log('твой бюджут ' + appData.budgetMonth);
            console.log('your monthly expense ' + appData.expensesMonth);
            console.log('budget target achieved in ' + Math.ceil(appData.targetMonth));
        }
    }
};

// let getExpensesMonth = function () { //? сумирует обязательные расходы

// };

appData.asking();

// appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
appData.getTargetMonth(appData.budgetMonth, appData.dayInMonth, appData.mission, appData.budgetMonth);
appData.targetAchieved();
for (let key in appData) {
    console.log('key:' + key + ' значение:' +  appData[key]); 
}
// 9) getAccumulatedMonth переименовать в getBudget. Этот метод будет высчитывать значения свойств budgetMonth и budgetDay, чтобы вычислить значения используем только свойства объекта (никаких внешних переменных)
// 10) В методах getTargetMonth и getStatusIncome исправить переменные, все значения получаем от нашего объекта appData
// 11) Вызвать все необходимые методы после объекта, чтобы корректно считались все данные (порядок очень важен).
// 12) В консоль вывести: 

//     — Расходы за месяц
//     — За какой период будет достигнута цель (в месяцах)
//     — Уровень дохода

// Все остальное почистить в программе у нас всего две переменных money и appData
// И две функции start и возможно isNumber
// 13) Используя цикл for in для объекта (appData), вывести в консоль сообщение "Наша программа включает в себя данные: " (вывести все свойства и значения)
// 14) Проверить, чтобы все работало и не было ошибок в консоли