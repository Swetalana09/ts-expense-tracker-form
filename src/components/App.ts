import {Form} from './Form.js';
import { Table } from './Table.js';
export function renderApp():void{
    const root=document.getElementById('app');

    if(!root){
        throw new Error('Root element #app not found');
    }

    root.innerHTML='';
    const layout=document.createElement('div');
    layout.className='app';

    layout.appendChild(Form());
    layout.appendChild(Table());
    root.appendChild(layout);
}
