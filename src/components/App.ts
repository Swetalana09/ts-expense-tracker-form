import {Form} from './Form.js';
import { Table } from './Table.js';
import { element } from '../utils/dom.js';
export function renderApp():void{
    const root=document.getElementById('app');

    if(!root){
        throw new Error('Root element #app not found');
    }

    root.innerHTML='';
    const layout=document.createElement('div');
    layout.className='app';
    const container=element('div');

    const tableHeading=element('div');
    tableHeading.className='table-heading';
    const h3=element('h3');
    h3.textContent='EXPENSE RECORDS';
    tableHeading.append(h3);
    const tableBox=element('div');
    tableBox.className='table-main';
    tableBox.append(tableHeading,Table());
    
    const main=element('div');
    main.className='main';
    const h2=element('h2');
    h2.textContent='EXPENSE TRACKER FORM';
    const p=element('p');
    p.className='id1';
    p.textContent='~ Keep Track of Your Spending';
    main.append(h2,p);
    container.append(main,Form());

    layout.appendChild(container);
    layout.appendChild(tableBox);
    root.appendChild(layout);
}
