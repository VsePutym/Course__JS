'use strict';

let data = document.querySelector('.data'),
    result = document.querySelector('.result'),
    buttonStart = document.getElementById('start'),
    incomePlus = data.getElementsByTagName('button')[0],
    expensesPlus = data.getElementsByTagName('button')[1],
    checkBox = data.querySelector('#deposit-check'),
    additional = data.querySelectorAll('.additional_expenses-item'),
    valueBudgetDay = result.getElementsByClassName('result-total')[1],
    valueExpensesMonth = result.getElementsByClassName('result-total')[2],
    valueAdditionalIncome = result.getElementsByClassName('result-total')[3],
    valueAdditionalExpenses = result.getElementsByClassName('additional_expenses-value')[0],
    valueIncomePeriod = result.getElementsByClassName('income_period-value')[0],
    valueTargetMonth = result.getElementsByClassName('target_month-value')[0],
    valueBudgetMonth = result.querySelector('.budget_month-value'),
    inputMonthSum = data.querySelector('.salary-amount'),
    incomeItems = data.querySelectorAll('.income-items'),
    possibleIncome = data.querySelectorAll('.additional_income-item'),
    additionalIncomeValue = result.querySelector('.additional_income-value'),
    obligatoryExpensesName = data.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    possibleCost = data.querySelector('.additional_expenses-item'),
    target = data.querySelector('.target-amount'),
    periodAmount = data.querySelector('.period-amount'),
    range = data.querySelector('.period-select');

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};


let appData = {
    targetMonth: 0,
    dayInMonth: 30,
    expensesMonth: 0,
    budgetMonth: 0,
    budgetDay: 0,
    budget: 0,
    income: {}, //* доп. доходы.
    incomeMonth: 0,
    addIncome: [], //? тут мы будем перечислять дополнительные доходы
    expenses: {}, //!содержит доп. расходы
    addExpenses: [], //** массив с возможными расходами
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,

    start: function () {
        appData.showBudget(); //* проверка Рассчитать
        appData.getExpenses(); //? Отправляет со  страницы даннные обязательного расхода пользователя в Data
        appData.getIncome(); //! отправляет со страницы дополнительный доход пользователя в Data
        appData.getExpensesMonth(); //? суммирует обязательные расходы
        appData.getBudget(); //!вычисляем бюджет на месяц
        appData.getBudgetDay(); //? Получаем дневной бюджет
        appData.getTargetMonth(); //* Высчитываем за сколько накопим
        appData.getAddExpenses();//! Возможные расходы
        appData.getAddIncome();//? Дополнительный доход
        appData.showResult(); //* Показываем результат
    },
    showBudget: function (){
        if (inputMonthSum.value === '') {
            alert('Error, the "monthly income" field must be filled');
            return;
        }
        appData.budget = +inputMonthSum.value;
    },
    showResult: function () {
        valueBudgetMonth.value = appData.budgetMonth;
        valueBudgetDay.value = Math.ceil(appData.budgetDay);
        valueExpensesMonth.value = appData.expensesMonth;
        valueAdditionalExpenses.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        valueTargetMonth.value = Math.ceil(appData.targetMonth);
        valueIncomePeriod.value = appData.calcSavedMoney();
        range.addEventListener('change', appData.valueIncomePeriod);
    },
    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },
    addIncomeBlock: function(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    },
    getExpenses: function () {   //? Отправляет со  страницы даннные обязательного расхода пользователя в Data
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getIncome: function () {
        incomeItems.forEach(function (item) {
            let incomeName = item.querySelector('.income-title').value;
            let incomeSum = item.querySelector('.income-amount').value;
            if (incomeName !== '' && incomeSum !== '') {
                appData.income[incomeName] = incomeSum;
            }

            for( let key in appData.income){
                appData.incomeMonth += +appData.income[key];
            }
        });
    },
    getAddExpenses: function () {
        let addExpenses = possibleCost.value.split(', '); //! Возможные расходы
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function () {
        possibleIncome.forEach(function (item) {  //? Дополнительный доход
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    asking: function () { //? тут будем расспрашивать пользователя

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
    },
    getExpensesMonth: function () { //? суммирует обязательные расходы
        for (let key in appData.expenses) {
            appData.expensesMonth += parseFloat(appData.expenses[key]);
        }

        return appData.expensesMonth;
    },

    getBudget: function () { //!вычисляем бюджет на месяц
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        return appData.budgetMonth;

    },
    getTargetMonth: function () {//! за сколько накопим
        appData.targetMonth = target.value / appData.budgetMonth;
        return appData.targetMonth; 
    },
    getBudgetDay: function(){
        appData.budgetDay = appData.budgetMonth / appData.dayInMonth;
        return appData.budgetDay;
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
        return appData.budgetMonth * range.value;
    },
    getValueRange: function(){
        if(range.value){
            periodAmount.innerHTML = range.value;
        }
    }
    
};

buttonStart.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
range.addEventListener('change', appData.getValueRange);

// for (let key in appData) {
//     console.log('key:' + key + ' value:' + appData[key]);
// }