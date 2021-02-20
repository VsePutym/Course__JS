document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    let data = document.querySelector('.data'),
        result = document.querySelector('.result'),
        buttonStart = document.getElementById('start'),
        buttonCancel = document.getElementById('cancel'),
        btnPlus = data.getElementsByTagName('button'),
        incomePlus = btnPlus[0],
        expensesPlus = btnPlus[1],
        checkBox = data.querySelector('#deposit-check'),
        depositBank = data.querySelector('.deposit-bank'),
        depositAmount = data.querySelector('.deposit-amount'),
        depositPercent = data.querySelector('.deposit-percent'),
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

    const isNumber = (n) => {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

    class AppData {
        constructor() {
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
        }

        start() {
            this.budget = +inputMonthSum.value;

            this.getExpenses(); //? Отправляет со  страницы данные обязательного расхода пользователя в Data
            this.getIncome(); //! отправляет со страницы дополнительный доход пользователя в Data
            this.getExpensesMonth(); //? суммирует обязательные расходы
            this.getInfoDeposit();
            this.getBudget(); //!вычисляем бюджет на месяц
            this.getBudgetDay(); //? Получаем дневной бюджет
            this.getTargetMonth(); //* Высчитываем за сколько накопим
            this.getAddExpenses(); //! Возможные расходы
            this.getAddIncome(); //? Дополнительный доход
            this.showResult(); //* Показываем результат

            depositBank.setAttribute('disabled', true);
            buttonCancel.style.display = 'block';
            buttonStart.style.display = 'none';
            expensesPlus.setAttribute("disabled", true);
            incomePlus.setAttribute("disabled", true);
            checkBox.setAttribute("disabled", true);

            range.addEventListener('change', () => {
                valueIncomePeriod.value = this.calcSavedMoney();
            });

            const inputBlock = () => { //! импуты блокированны
                allinputs = document.querySelectorAll("input[type='text']");
                allinputs.forEach((items) => {
                    items.setAttribute("disabled", true);
                });
            };
            inputBlock();
        }

        showResult() { //* Выводим результаты
            valueBudgetMonth.value = this.budgetMonth;
            valueBudgetDay.value = Math.ceil(this.budgetDay);
            valueExpensesMonth.value = this.expensesMonth;
            valueAdditionalExpenses.value = this.addExpenses.join(', ');
            additionalIncomeValue.value = this.addIncome.join(', ');
            valueTargetMonth.value = Math.ceil(this.targetMonth);
            valueIncomePeriod.value = this.calcSavedMoney();
        }

        addExpensesBlock() { //? Обязательные расходы button +
            let cloneExpensesItem = expensesItems[0].cloneNode(true);
            cloneExpensesItem.children[0].value = '';
            cloneExpensesItem.children[1].value = '';
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
            expensesItems = data.querySelectorAll('.expenses-items');
            if (expensesItems.length === 3) {
                expensesPlus.style.display = 'none';
            }
        }

        addIncomeBlock() { //? Дополнительные доходы button +
            const cloneIncomeItem = incomeItems[0].cloneNode(true);
            cloneIncomeItem.children[0].value = '';
            cloneIncomeItem.children[1].value = '';
            incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
            incomeItems = data.querySelectorAll('.income-items');
            if (incomeItems.length === 3) {
                incomePlus.style.display = 'none';
            }
        }

        getExpenses() { //? Отправляет  данные обязательного расхода пользователя в Data
            expensesItems = data.querySelectorAll('.expenses-items');
            expensesItems.forEach((item) => {
                const itemExpenses = item.querySelector('.expenses-title').value;
                const cashExpenses = item.querySelector('.expenses-amount').value;
                if (itemExpenses !== '' && cashExpenses !== '') {
                    this.expenses[itemExpenses] = cashExpenses;
                }
            });
        }

        getIncome() { //! отправляет со страницы дополнительный доход пользователя в Data
            incomeItems = document.querySelectorAll('.income-items');
            incomeItems.forEach((item) => {
                const incomeName = item.querySelector('.income-title').value;
                const incomeSum = item.querySelector('.income-amount').value;
                if (incomeName !== '' && incomeSum !== '') {
                    this.income[incomeName] = incomeSum;
                }
                for (let key in this.income) {
                    this.incomeMonth += parseFloat(this.income[key]);
                }
            });
        }

        getAddExpenses() {
            const addExpenses = possibleCost.value.split(', '); //! Возможные расходы
            addExpenses.forEach((item) => {
                item = item.trim();
                if (item !== '') {
                    this.addExpenses.push(item);
                }
            });
        }

        getAddIncome() {
            possibleIncome.forEach((item) => { //? Дополнительный доход
                let itemValue = item.value.trim();
                if (itemValue !== '') {
                    this.addIncome.push(itemValue);
                }
            });
        }

        getExpensesMonth() { //? суммирует обязательные расходы
            for (const key in this.expenses) {
                this.expensesMonth += parseFloat(this.expenses[key]);
            }
        }

        getBudget() { //!вычисляем бюджет на месяц
            const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
            this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
            return this.budgetMonth;
        }

        getTargetMonth() { //! за сколько накопим
            this.targetMonth = target.value / this.budgetMonth;
            return this.targetMonth;
        }

        getBudgetDay() { //! Дневной бюджет
            this.budgetDay = this.budgetMonth / this.dayInMonth;
            return this.budgetDay;
        }

        calcSavedMoney() {
            return this.budgetMonth * range.value;
        }

        returnLangvich(){
            allinputs.forEach ((items) => {    //! Проверяем инпуты на ввод русских букв, пока не работает
                items.value = items.value.replace(/^[^а-яё]+$/ig, '');
                alert('только ru');
            });
        }

        reset() { //? сброс appData
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

            depositAmount.removeEventListener('input', () => {
                if (!isNumber(+depositAmount.value) && depositAmount.value !== '') {
                    alert('введите сумму');
                    depositAmount.value = '';
                }
            });

            depositBank.removeAttribute('disabled');
            depositBank.style.display = 'none';
            depositPercent.style.display = 'none';
            checkBox.checked = false;
            depositBank.value = '';
            buttonCancel.style.display = 'none';
            buttonStart.style.display = 'block';
            expensesPlus.removeAttribute("disabled");
            incomePlus.removeAttribute("disabled");
            checkBox.removeAttribute("disabled");

            const clearInput = () => { //! импуты очистка
                allinputs.forEach((items) => {
                    items.value = '';
                });
            };

            const inputUnblock = () => { //! импуты разблокированные
                allinputs = document.querySelectorAll("input[type='text']");
                allinputs.forEach((items) => {
                    items.removeAttribute("disabled");
                });
            };

            expensesItems = document.querySelectorAll('.expenses-items'); //? удаляем поля обязат. расходов
            for (let i = 1; i < expensesItems.length; i++) {
                if (expensesItems[i].localName === 'div') {
                    expensesItems[i].remove();
                }
            }

            incomeItems = data.querySelectorAll('.income-items'); //? удаляем поля доп. доходов
            for (let i = 1; i < incomeItems.length; i++) {
                if (incomeItems[i].localName === 'div') {
                    incomeItems[i].remove();
                }
            }

            range.removeEventListener('change', () => { //! Удаляем слушателя
                valueIncomePeriod.value = this.calcSavedMoney();
            });


            depositAmount.style.display = 'none';
            expensesPlus.style.display = 'block';
            incomePlus.style.display = 'block';
            range.value = 1;
            this.getValueRange();
            clearInput();
            inputUnblock();
        }

        getValueRange() { //? обновляет данные чисел range
            if (range.value) {
                periodAmount.innerHTML = range.value;
            }
        }

        getInfoDeposit() {
            if (this.deposit) {
                this.percentDeposit = depositPercent.value;
                this.moneyDeposit = depositAmount.value;
            }
        }

        changePercent() {
            let valueSelect = this.value;
            if (valueSelect === 'other') {
                depositPercent.style.display = 'block';
                valueSelect = depositPercent.value;
                depositPercent.addEventListener('input', () => {
                    if (isNumber(+depositPercent.value) && +depositPercent.value >= 1 &&
                        +depositPercent.value <= 100) {
                        valueSelect = depositPercent.value;
                    } else {
                        alert('Возможный процент должен быть от 1 до 100');
                        depositPercent.value = '';
                    }
                });
            } else {
                depositPercent.value = +valueSelect;
            }
            depositAmount.addEventListener('input', () => {
                if (!isNumber(+depositAmount.value) && depositAmount.value !== '') {
                    alert('Ввести можно только число');
                    depositAmount.value = '';
                }
            });
        }


        depositHandler() { //? Проверка стоит ли галочка на checkbox
            if (checkBox.checked) {
                depositBank.style.display = 'inline-block';
                depositAmount.style.display = 'inline-block';
                depositBank.addEventListener('change', this.changePercent);
                this.deposit = true;
            } else {
                depositBank.style.display = 'none';
                depositAmount.style.display = 'none';
                depositAmount.value = '';
                depositBank.value = '';
                this.deposit = false;
                depositBank.removeEventListener('change', this.changePercent);
            }
        }

        getKeyStart() { // TODO Ключ 
            if (checkBox.checked === false && isNumber(inputMonthSum.value) && inputMonthSum.value !== "") {
                this.start();
            } else if (checkBox.checked === true && isNumber(inputMonthSum.value) && inputMonthSum.value !== "") {
                if(depositBank.value === '' || depositAmount.value === ''){
                    alert('В поле сумма введено не число, либо пустая строка, также убедитесь что в поле "Депозит" заполнены данные, либо уберите галочку');
                }else{
                    buttonStart.removeAttribute("disabled");
                    this.start();
                }
            } else {
                alert('В поле сумма введено не число, либо пустая строка, также убедитесь что в поле "Депозит" заполнены данные, либо уберите галочку');
            }
        }


        eventListener() {

            buttonStart.addEventListener('click', this.getKeyStart.bind(this)); //? слушаем кнопку старт
            buttonCancel.addEventListener('click', this.reset.bind(this)); //? слушаем кнопку сброс
            expensesPlus.addEventListener('click', this.addExpensesBlock);
            incomePlus.addEventListener('click', this.addIncomeBlock);
            range.addEventListener('change', this.getValueRange);
            checkBox.addEventListener('change', this.depositHandler.bind(this));
            allinputs.addEventListener('input', this.returnLangvich);
        }
    }

    const appData = new AppData();

    appData.eventListener();
});