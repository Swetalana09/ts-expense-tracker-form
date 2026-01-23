import logic from "../app.logic";
import { state } from "../app.state";
import { renderApp } from "./App";
import { element } from "../utils/dom";

export function Table():HTMLTableElement{
    const table=element('table') as HTMLTableElement;
    table.id='expenseTable';
    
    const thead=element('thead');
    const headerRow=element('tr');
    const headers=['Title','Category','Amount','Currency','Date','Time','Payment Method','TransactionID','Vendor','Location','Tags','Notes/Description','Receipt','Recurring','Save Expense','Actions'];
    headers.forEach(h=>{
        const th=element('th');
        th.textContent=h;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead); 

    const tbody=element('tbody');

    if(state.records.length===0){
        const noDataRow=element('tr');
        noDataRow.id='noData';
        const noDataCell=element('td') as HTMLTableCellElement;
        noDataCell.colSpan=headers.length;
        noDataCell.textContent='No data found';
        noDataRow.appendChild(noDataCell);
        tbody.appendChild(noDataRow);
    }else{
    state.records.forEach((rec,i)=>{
        const trow=element('tr');

        if(state.editIndex===i){
            trow.className='editing';
        }

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
        const editBtn=element("button") as HTMLButtonElement;
        editBtn.className='edit-btn';
        editBtn.textContent='EDIT';
        editBtn.onclick=():void=>{
            logic.editRecord(i);
            renderApp();

            setTimeout(()=>{
                const form=document.querySelector('form');
                if(form){
                    form.scrollIntoView({behavior:'smooth',block:'start'});
                }
            },100);
        };

        const delBtn=element('button') as HTMLButtonElement;
        delBtn.className='del-btn';
        delBtn.textContent='DELETE';
        delBtn.onclick=():void=>{
            if(confirm('Are you sure you want to delete this expense?')){
            logic.deleteRecord(i);
            renderApp();
            }
        };

        actionTd.appendChild(editBtn);
        actionTd.appendChild(document.createElement('br'));
        actionTd.appendChild(delBtn);

        trow.appendChild(actionTd);
        tbody.appendChild(trow);
    });
}
    table.appendChild(tbody);
    return table;
}