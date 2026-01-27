import TableComponent from './Table.js';
import { element } from '../utils/dom.js';
import ThemeToggle from './ThemeToggle.js';
import FormComponent from './Form/Form.js';

let tableInstance: TableComponent|null=null;
let formInstance: FormComponent|null=null;
let themeToggleInstance: ThemeToggle|null=null;

export function renderApp():void{
    const root=document.getElementById('app');
    if(!root){
        throw new Error('Root element #app not found');
    }

    root.innerHTML='';
    const layout=document.createElement('div');
    layout.className='page-layout';

    const header=element('div') as HTMLDivElement;
    header.className='app-header';
    themeToggleInstance=new ThemeToggle();
    header.appendChild(themeToggleInstance.render());
    layout.appendChild(header);

    const container=element('div');
    container.className='container';

    const main=element('div');
    main.className='main';
    const h2=element('h2');
    h2.textContent='EXPENSE TRACKER FORM';
    const p=element('p');
    p.className='id1';
    p.textContent='~ Keep Track of Your Spending';
    main.append(h2,p);

    formInstance=new FormComponent();
    container.append(main, formInstance.render());

    //Table box
    const tableBox=element('div');
    tableBox.className='table-box';

    const tableHeading=element('div');
    tableHeading.className='table-heading';
    const h3=element('h2');
    h3.textContent='EXPENSE RECORDS';
    tableHeading.append(h3);
    tableBox.append(tableHeading);

    const tableMain=element('div');
    tableMain.className='table-main';
    tableMain.id='table-main-container';
    tableBox.append(tableMain);

    layout.appendChild(container);
    layout.appendChild(tableBox);
    root.appendChild(layout);

    tableInstance=new TableComponent('table-main-container');
    console.log('App rendered. Form instance:',formInstance);
}
export function getTableInstance():TableComponent|null{
    return tableInstance;
}

export function getFormInstance():FormComponent|null{
    return formInstance;
}