'use strict';

let data = document.querySelector('.data'),
    result = document.querySelector('.result'),
    buttonStart = document.getElementById('start'),
    incomePlus = data.getElementsByTagName('button'),
    expensesPlus = data.getElementsByTagName('button')[1],
    checkbox = data.querySelector('#deposit-check'),
    additional = data.querySelectorAll('.additional_expenses-item'),
    valueBudgetDay = result.getElementsByClassName('budget_day-value'),
    valueExpensesMonth = result.getElementsByClassName('expenses_month-value'),
    valueAdditionalIncome = result.getElementsByClassName('additional_income-value'),
    valueAdditionalExpenses = result.getElementsByClassName('additional_expenses-value'),
    valueIncomePeriod = result.getElementsByClassName('income_period-value'),
    valueTargetMonth = result.getElementsByClassName('target_month-value'),
    valueBudgetMonth = result.querySelector('.budget_month-value'),
    inputMonthSum = data.querySelector('.salary-amount'),
    additionalIncomeName = data.querySelector('.income-title'),
    additionalIncomeSum = data.querySelector('.income-amount'),
    possibleIncome = data.querySelector('.additional_income-item'),
    possibleIncome2 = data.querySelectorAll('.additional_income-item')[1],
    obligatoryExpensesName = data.querySelector('.expenses-title'),
    obligatoryExpensesSum = data.querySelector('.expenses-amount'),
    possibleCosts = data.querySelector('.additional_expenses-item'),
    target = data.querySelector('.target-amount'),
    calculationPeriod = data.querySelector('.period-select');
    
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
    income: {}, //* доп. доходы.
    addIncome: [], //? тут мы будем перечислять дополнительные доходы
    expenses: {}, //!содержит доп. расходы
    addExpenses: [], //** массив с возможными расходами
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 250000,
    period: 12,
    asking: function () { //? тут будем распрашивать пользователя

        if (confirm('do you have an additional source of income?')) {
            let itemIncome,
                cashIncome;
            do {
                itemIncome = prompt('what is your additional income?');
            } while (isNumber(itemIncome) || itemIncome === null || itemIncome.trim() === "");
            itemIncome = itemIncome.trim();

            do {
                cashIncome = prompt('how much do you make a month?', );
            } while (!isNumber(cashIncome));
            appData.income[itemIncome] = cashIncome;
        }

        let expenses;
        expenses = prompt('Your possible expenses for the billing period, separate with a space');
        if (expenses) {
            expenses = expenses.toLowerCase().split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1));
            appData.addExpenses = expenses.join(', ');
        }

        appData.deposit = confirm('Do you have a bank deposit?'); {
            appData.getInfoDeposit();
        }
        for (let i = 0; i < 2; i++) {
            let key,
                cost;
            do {
                key = prompt('Enter the required expense item');
            } while (isNumber(key) || key === null || key.trim() === "");
            key = key.trim();
            do {
                cost = prompt('How much will it cost?');
            } while (!isNumber(cost) || cost === null || cost === '');
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
    getTargetMonth: function (getBudgetDayArg1, getBudgetDayArg2, getTargetMonthArg1, getTargetMonthArg2) { //! за сколько накопим
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
    targetAchieved: function () {
        if (appData.targetMonth > 0) {
            console.log(appData.budgetDay, appData.targetMonth);
            console.log('your day budget ' + Math.ceil(appData.budgetDay));
            console.log('your budget for a month ' + appData.budgetMonth);
            console.log('your monthly expense ' + appData.expensesMonth);
            console.log('Your possible expenses for the billing period. ' + appData.addExpenses);
            console.log('budget target achieved in ' + Math.ceil(appData.targetMonth));
        }
    },
    getInfoDeposit: function () {
        if (appData.deposit) {
            let percentDeposit,
                moneyDeposit;
            do {
                percentDeposit = prompt('What is the annual percentage?', 10);
            } while (!isNumber(percentDeposit));
            appData.percentDeposit = percentDeposit;
            do {
                moneyDeposit = prompt('How much is pledged?', 10000);
            } while (!isNumber(moneyDeposit));
            appData.moneyDeposit = moneyDeposit;
        }
    },
    calcSavedMoney: function () {
        return appData.budgetMonth * appData.period;
    }
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getStatusIncome();
appData.getTargetMonth(appData.budgetMonth, appData.dayInMonth, appData.mission, appData.budgetMonth);
appData.targetAchieved();

for (let key in appData) {
    console.log('key:' + key + ' value:' + appData[key]);
}