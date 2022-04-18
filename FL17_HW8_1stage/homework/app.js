const appRoot = document.getElementById('app-root');

let arrForTable = [];
let isSortingByName = false;
let isSortingByIndex = false;


function createMyElement(type, text, appendChild, attributes) {
    let element = document.createElement(type);
    element.textContent = text;
    for (let key in attributes) {
        if (key === 'class') {
            element.classList.add(attributes[key]); // add all classes at once
        } else {
            element[key] = attributes[key];
        }
    }
    //element.innerHTML(someElement);
    appendChild.appendChild(element);
    return element;
}


function startHeader() {
    const form = createMyElement('form', null, appRoot);
    form.addEventListener('change', selectValueCheck);
    const header = createMyElement('header', null, form);
    createMyElement('h1', 'Countries Search', header);
    const divForSel = createMyElement('div', null, header, {
        class: 'divForSel'
    });

    const divForRadioButton = createMyElement('div', null, divForSel, {'class': 'divForRadioButton'});
    createMyElement('p', 'Please choose the type of search:', divForRadioButton);

    const divForLabel = createMyElement('div', null, divForRadioButton, {'class': 'divForLabel'});
    const divForLabel1 = createMyElement('div', null, divForLabel);
    const divForLabel2 = createMyElement('div', null, divForLabel);
    createMyElement('input', null, divForLabel1, {
        type: 'radio',
        id: 'radio-region',
        name: 'radioChoose',
        onclick: listOfSelect,
        onchange: checkRadio
    });
    createMyElement('label', 'By Region', divForLabel1, {for: 'radio-region'});

    createMyElement('input', null, divForLabel2, {
        type: 'radio',
        id: 'radio-language',
        name: 'radioChoose',
        onclick: listOfSelect,
        onchange: checkRadio
    });
    createMyElement('label', 'By language', divForLabel2, {for: 'radio-language'});
    const selectDiv = createMyElement('div', null, divForSel, {
        class: 'selectDiv'
    })
    createMyElement('label', 'Please choose search query:', selectDiv);
    const selectButton = createMyElement('select', null, selectDiv,
        {
            option: 'disabled',
            class: 'selectBtn',
            onchange: selectValueCheck
        })
    ;
    createMyElement('option', 'Select value', selectButton, {
        name: 'firstOpt',
        value: 'cardFirst'
    });

    function listOfSelect(event) {
        const regionList = externalService.getRegionsList();
        const languagesList = externalService.getLanguagesList();

        const optionReg = document.querySelectorAll('.radioRegionOption');
        const optionLang = document.querySelectorAll('.radioLanguageOption');

        for (let i = 0; i < regionList.length; i++) {
            if (event.target.id === 'radio-language') {
                optionLang.forEach(el => el.remove());
                optionReg.forEach(el => el.remove());
                createMyElement('option', languagesList[i], selectButton, {class: 'radioLanguageOption'});
            } else if (event.target.id === 'radio-region') {
                optionReg.forEach(el => el.remove());
                optionLang.forEach(el => el.remove());
                createMyElement('option', regionList[i], selectButton, {class: 'radioRegionOption'});
            }
        }
    }

    function checkRadio() {
        tableRemove();
        const selectBtn = document.querySelector('.selectBtn');
        const radioBtn = document.getElementsByName('radioChoose');
        if (radioBtn[0].checked || radioBtn[1].checked) {
            selectBtn.disabled = false;
        }
        selectValueCheck();
    }

    function disableSelect() {
        const selectBtn = document.querySelector('.selectBtn');
        selectBtn.disabled = true;
    }
    disableSelect();

    function selectValueCheck() {
        const selectBtn = document.querySelector('.selectBtn');
        if (document.querySelectorAll('.messageSelect')) {
            document.querySelectorAll('.messageSelect').forEach(el => el.remove());
        }

        if (selectBtn.value === 'cardFirst') {
            createMyElement('div', 'No items,please choose search query', divForSel, {
                class: 'messageSelect'
            });
        } else {
            if (document.querySelector('.messageSelect')) {
                document.querySelector('.messageSelect').remove();
            }
            prepareTableData();
        }
    }


    function prepareTableData() {
        const selectBtn = document.querySelector('.selectBtn');
        const radioBtn = document.getElementsByName('radioChoose');


        let valueSelect = selectBtn.value;

        if (radioBtn[0].checked) {
            arrForTable = externalService.getCountryListByRegion(valueSelect);
            tableCreate();
        } else {
            arrForTable = externalService.getCountryListByLanguage(valueSelect);
            tableCreate();
        }

    }
}

function tableRemove() {
    if (document.querySelector('.table')) {
        document.querySelector('.table').remove();
    }
}

function clearTable() {
    document.querySelectorAll('td').forEach(el => el.remove());
    document.querySelectorAll('tr').forEach(el => el.remove());
}

function tableCreate() {
    tableRemove();
    const divForSel = document.querySelector('.divForSel');

    const table = createMyElement('table', null, divForSel, {
        class: 'table'
    });
    document.querySelector('.table').onclick = (event) => {
        if (event.target.id === 'arrowCountryName') {
            if (isSortingByName === false) {
                arrForTable = arrForTable.reverse();
            }
            renderTable(table);
        }

        if (event.target.id === 'arrowAreaId') {
            if (isSortingByIndex === false) {
                arrForTable = arrForTable.sort((a, b) => a.area - b.area);
                isSortingByIndex = true;
            } else if (isSortingByIndex === true) {
                arrForTable = arrForTable.sort((a, b) => b.area - a.area);
                isSortingByIndex = false;
            }
            renderTable(table);
        }
        console.log(event.target.id)
        renderTable(table);
    }

    const valueForTable = ['Country name', 'Capital', 'World region', 'Languages', 'Area', 'Flag'];
    arrForTable = arrForTable.sort((a, b) => a.name.localeCompare(b.name));
    for (let i = 0; i < valueForTable.length; i++) {
        if (valueForTable[i] === 'Country name') {
            createMyElement('th', valueForTable[i], table, {
                id: 'arrowCountryName'
            })

        } else if (valueForTable[i] === 'Area') {
            createMyElement('th', valueForTable[i], table, {
                id: 'arrowAreaId'
            })
        } else {
            createMyElement('th', valueForTable[i], table);
        }
    }
    renderTable(table);
}

function renderTable(table) {
    clearTable();
    for (let j = 0; j < arrForTable.length; j++) {
        const trForTable = createMyElement('tr', null, table);

        createMyElement('td', arrForTable[j].name, trForTable);
        createMyElement('td', arrForTable[j].capital, trForTable);
        createMyElement('td', arrForTable[j].region, trForTable);
        let lang = Object.values(arrForTable[j].languages).join(', ');
        createMyElement('td', lang, trForTable);
        createMyElement('td', arrForTable[j].area, trForTable);
        let imgTd = createMyElement('td', null, trForTable);
        createMyElement('img', null, imgTd, {
            src: arrForTable[j].flagURL
        });

    }
}

startHeader();
