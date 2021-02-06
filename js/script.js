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
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
        return appData.expensesMonth;
    },


    getBudget: function () { //!вычисляем бюджет на месяц
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        return appData.budgetMonth;

    },
    getTargetMonth: function ( getBudgetDayArg1, getBudgetDayArg2, getTargetMonthArg1, getTargetMonthArg2) { //! за сколько накопим
        appData.budgetDay = getBudgetDayArg1 / getBudgetDayArg2;
        appData.targetMonth = getTargetMonthArg1 / getTargetMonthArg2;
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
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getStatusIncome();
appData.getTargetMonth(appData.budgetMonth, appData.dayInMonth, appData.mission, appData.budgetMonth);
appData.targetAchieved();
for (let key in appData) {
    console.log('key:' + key + ' значение:' +  appData[key]); 
}