import { editRecord, deleteRecord } from "../app.logic";
import { state } from "../app.state";
import { renderApp } from "./App";
import { element } from "../utils/dom";

export function Table():HTMLTableElement{
    const table=element('table') as HTMLTableElement;
    table.className='expense-table';

    const thead=element('thead');
    const headerRow=element('tr');
    const headers=['Title','Category','Amount','Currency','Date','Time','Payment','TransactionID','Vendor','Location','Tags','Notes','Receipt','Recurring','Save Expense','Actions'];
    headers.forEach(h=>{
        const th=element('th');
        th.textContent=h;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody=element('tbody');
    state.records.forEach((rec,i)=>{
        const trow=element('tr');

        const cells=[
            rec.title,
            rec.category,
            rec.amount,
            rec.currency,
            rec.date,
            rec.time||'',
            rec.payments,
            rec.transactionID||'',
            rec.vendorName||'',
            rec.location||'',
            rec.tags||'',
            rec.notes||'',
            rec.receipt?'Yes':'No',
            rec.saveRecurring?'Yes':'No',
            rec.saveExpense?'Yes':'No'
        ];

        cells.forEach(c=>{
            const td=element('td');
            td.textContent=c.toString();
            trow.appendChild(td);
        });

        const actionTd=element('td');
        const editBtn=element("button");
        editBtn.textContent='EDIT';
        editBtn.onclick=()=>{
            editRecord(i);
            renderApp();
        };

        const delBtn=element('button');
        delBtn.textContent='DELETE';
        delBtn.onclick=()=>{
            deleteRecord(i);
            renderApp();
        };

        actionTd.appendChild(editBtn);
        actionTd.appendChild(delBtn);
        trow.appendChild(actionTd);

        tbody.appendChild(trow);
    });
    table.appendChild(tbody);
    return table;
}