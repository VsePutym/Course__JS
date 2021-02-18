document.addEventListener('DOMContentLoaded', function () {
    'use strict';


    let data = document.querySelector('.data'),
        result = document.querySelector('.result'),
        buttonStart = document.getElementById('start'),
        buttonCancel = document.getElementById('cancel'),
        btnPlus = data.getElementsByTagName('button'),
        incomePlus = btnPlus[0],
        expensesPlus = btnPlus[1],
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
        expensesItems = data.querySelectorAll('.expenses-items'),
        possibleCost = data.querySelector('.additional_expenses-item'),
        target = data.querySelector('.target-amount'),
        periodAmount = data.querySelector('.period-amount'),
        range = data.querySelector('.period-select'),
        allinputs = document.querySelectorAll("input[type='text']");

    let isNumber = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

    const AppData = function () {
        this.targetMonth = 0;
        this.dayInMonth = 30;
        this.expensesMonth = 0;
        this.budgetMonth = 0;
        this.budgetDay = 0;
        this.budget = 0;
        this.income = {}; //* доп. доходы.
        this.incomeMonth = 0;
        this.addIncome = []; //? тут мы будем перечислять дополнительные доходы
        this.expenses = {}; //!содержит доп. расходы
        this.addExpenses = []; //** массив с возможными расходами
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
    };

    AppData.prototype.start = function () {
        this.budget = +inputMonthSum.value;
        this.getExpenses(); //? Отправляет со  страницы данные обязательного расхода пользователя в Data
        this.getIncome(); //! отправляет со страницы дополнительный доход пользователя в Data
        this.getExpensesMonth(); //? суммирует обязательные расходы
        this.getBudget(); //!вычисляем бюджет на месяц
        this.getBudgetDay(); //? Получаем дневной бюджет
        this.getTargetMonth(); //* Высчитываем за сколько накопим
        this.getAddExpenses(); //! Возможные расходы
        this.getAddIncome(); //? Дополнительный доход
        this.showResult(); //* Показываем результат

        buttonCancel.style.display = 'block';
        buttonStart.style.display = 'none';

        let inputBlock = function () { //! импуты блокированны
            allinputs = document.querySelectorAll("input[type='text']");
            allinputs.forEach(function (items) {
                items.setAttribute("disabled", true);
            });
        };
        inputBlock();
    };

    AppData.prototype.showResult = function () {
        const _this = this;
        valueBudgetMonth.value = this.budgetMonth;
        valueBudgetDay.value = Math.ceil(this.budgetDay);
        valueExpensesMonth.value = this.expensesMonth;
        valueAdditionalExpenses.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        valueTargetMonth.value = Math.ceil(this.targetMonth);
        valueIncomePeriod.value = this.calcSavedMoney();
        range.addEventListener('change', function () {
            valueIncomePeriod.value = _this.calcSavedMoney();
        });
    };

    AppData.prototype.addExpensesBlock = function () { //? Обязательные расходы button +
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.children[0].value = '';
        cloneExpensesItem.children[1].value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = data.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    };

    AppData.prototype.addIncomeBlock = function () { //? Дополнительные доходы button +
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.children[0].value = '';
        cloneIncomeItem.children[1].value = '';
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = data.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    };

    AppData.prototype.getExpenses = function () { //? Отправляет  данные обязательного расхода пользователя в Data
        expensesItems = data.querySelectorAll('.expenses-items');
        const _this = this;
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                _this.expenses[itemExpenses] = cashExpenses;
            }
        });
    };

    AppData.prototype.getIncome = function () { //! отправляет со страницы дополнительный доход пользователя в Data
        incomeItems = document.querySelectorAll('.income-items');
        const _this = this;
        incomeItems.forEach(function (item) {
            let incomeName = item.querySelector('.income-title').value;
            let incomeSum = item.querySelector('.income-amount').value;
            if (incomeName !== '' && incomeSum !== '') {
                _this.income[incomeName] = incomeSum;
            }
            for (let key in _this.income) {
                _this.incomeMonth += parseFloat(_this.income[key]);
            }
        });
    };

    AppData.prototype.getAddExpenses = function () {
        let addExpenses = possibleCost.value.split(', '); //! Возможные расходы
        const _this = this;
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                _this.addExpenses.push(item);
            }
        });
    };

    AppData.prototype.getAddIncome = function () {
        const _this = this;
        possibleIncome.forEach(function (item) { //? Дополнительный доход
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                _this.addIncome.push(itemValue);
            }
        });
    };

    AppData.prototype.getExpensesMonth = function () { //? суммирует обязательные расходы
        for (let key in this.expenses) {
            this.expensesMonth += parseFloat(this.expenses[key]);
        }
    };

    AppData.prototype.getBudget = function () { //!вычисляем бюджет на месяц
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        return this.budgetMonth;
    };

    AppData.prototype.getTargetMonth = function () { //! за сколько накопим
        this.targetMonth = target.value / this.budgetMonth;
        return this.targetMonth;
    };

    AppData.prototype.getBudgetDay = function () { //! Дневной бюджет
        this.budgetDay = this.budgetMonth / this.dayInMonth;
        return this.budgetDay;
    };

    AppData.prototype.calcSavedMoney = function () {
        return this.budgetMonth * range.value;
    };

    AppData.prototype.getValueRange = function () {
        if (range.value) {
            periodAmount.innerHTML = range.value;
        }
    };

    AppData.prototype.getInfoDeposit = function () {
        if (this.deposit) {
            do {
                this.percentDeposit = prompt('What is the annual percentage?', 10);
            } while (isNumber(this.percentDeposit) || this.percentDeposit === '' || this.percentDeposit === null);
            do {
                this.moneyDeposit = prompt('How much is pledged?', 10000);
            } while (isNumber(this.moneyDeposit) || this.moneyDeposit === '' ||
                this.moneyDeposit === ' ' || this.moneyDeposit === null);
        }
    };

    AppData.prototype.reset = function () { //? сброс appData
        this.targetMonth = 0;
        this.dayInMonth = 30;
        this.expensesMonth = 0;
        this.budgetMonth = 0;
        this.budgetDay = 0;
        this.budget = 0;
        this.income = {}; //* доп. доходы.
        this.incomeMonth = 0;
        this.addIncome = []; //? тут мы будем перечислять дополнительные доходы
        this.expenses = {}; //!содержит доп. расходы
        this.addExpenses = []; //** массив с возможными расходами
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;

        buttonCancel.style.display = 'none';
        buttonStart.style.display = 'block';
        checkBox.checked = false;

        let clearInput = function () { //! импуты очистка
            allinputs.forEach(function (items) {
                items.value = '';
            });
        };

        let inputUnblock = function () { //! импуты разблокированные
            allinputs = document.querySelectorAll("input[type='text']");
            allinputs.forEach(function (items) {
                items.removeAttribute("disabled");
            });
        };

        expensesItems = document.querySelectorAll('.expenses-items');
        for (let i = 1; i < expensesItems.length; i++) {
            if(expensesItems[i].localName === 'div'){
                expensesItems[i].remove();
            }
        }

        incomeItems = data.querySelectorAll('.income-items');
        for (let i = 1; i < incomeItems.length; i++) {
            if(incomeItems[i].localName === 'div'){
                incomeItems[i].remove();
            }
        }
        expensesPlus.style.display = 'block';
        incomePlus.style.display = 'block';
        range.value = 1;
        this.getValueRange();
        clearInput();
        inputUnblock();
    };

    AppData.prototype.getKeyStart = function () { // TODO Ключ 
        if (isNumber(inputMonthSum.value) && inputMonthSum.value !== "") {
            this.start();
            incomePlus.style.display = 'none';
            expensesPlus.style.display = 'none';
        } else {
            alert('not a number');
        }
    };

    const appData = new AppData();
    AppData.prototype.eventListener = function () {
        buttonStart.addEventListener('click', this.getKeyStart.bind(this)); //? слушаем кнопку старт
        buttonCancel.addEventListener('click', this.reset.bind(this)); //? слушаем кнопку сброс

        // checkBox.addEventListener('change', appData.getInfoDeposit);
        expensesPlus.addEventListener('click', this.addExpensesBlock);
        incomePlus.addEventListener('click', this.addIncomeBlock);
        range.addEventListener('change', this.getValueRange);

        // let getlanguage = function(){
        //     allinputs.forEach(function (items) {    //! Проверяем инпуты на ввод русских букв, пока не работает
        //         items.value = items.value.replace(/^[^а-яё]+$/ig.test(allinputs), '');
        //     });
        // };
        //     allinputs = document.querySelectorAll("input[type='text']").value;
        //     allinputs.addEventListener('input', getlanguage);
    };

    appData.eventListener();
});