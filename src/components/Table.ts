import LogicService from "../services/logic.service";
import StateService from "../services/state.service";
import { element } from "../utils/dom";
import { ModalService } from "./Modal";
import EventBus from "../services/eventbus.service";
import type { ExpenseForm } from "../types";

class TableComponent{
    private eventBus:EventBus;
    private logicService:LogicService;
    private stateService:StateService;
    private modalService:ModalService;
    private container:HTMLElement|null;

    constructor(containerId:string){
        this.eventBus=EventBus.getInstance();
        this.logicService=LogicService.getInstance();
        this.stateService=StateService.getInstance();
        this.modalService=ModalService.getInstance();
        this.container=document.getElementById(containerId);

        this.subscribeToEvents();
        this.render();
    }

    private subscribeToEvents():void{
        this.eventBus.subscribe('RECORDS_CHANGED',()=>{
            console.log('Table: RECORDS_CHANGED event received');
            this.render();
        });

        this.eventBus.subscribe('RECORD_ADDED',()=>{
            console.log('Table: RECORDS_ADDED event received');
            this.render();
        });

        this.eventBus.subscribe('RECORD_UPDATED',()=>{
            console.log('Table: RECORDS_UPDATED event received');
            this.render();
        });

        this.eventBus.subscribe('RECORD_DELETED',()=>{
            console.log('Table: RECORDS_DELETED event received');
            this.render();
        });    
        
        this.eventBus.subscribe('EDIT_MODE_CHANGED',()=>{
            console.log('Table: EDIT_MODE_CHANGED event received');
            this.render();
        });
    }

    public render():void{
        if(!this.container) return;

        const table=this.createTable();
        this.container.innerHTML='';
        this.container.appendChild(table);
    }

    private createTable():HTMLTableElement{
        const table=element('table') as HTMLTableElement;
        table.id='expenseTable';

        table.appendChild(this.createTableHeader());
        table.appendChild(this.createTableBody());

        return table;
    }

    private createTableHeader():HTMLTableSectionElement{
        const thead=element('thead') as HTMLTableSectionElement;
        const headerRow=element('tr') as HTMLTableRowElement;
        const headers=[
            'Title','Category','Amount','Currency','Date','Time','Payment Method','TransactionID','Vendor','Location',
            'Tags','Notes/Description','Receipt','Recurring','Save Expense','Actions'
        ];

        headers.forEach(h=>{
            const th=element('th');
            th.textContent=h;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        return thead;
    }

    private createTableBody():HTMLTableSectionElement{

        const tbody=element('tbody') as HTMLTableSectionElement;

        if(this.stateService.records.length===0){
            tbody.appendChild(this.createNoDataRow());
        }else{
            this.stateService.records.forEach((rec:ExpenseForm,i:number)=>{
                tbody.appendChild(this.createDataRow(rec,i));
            });
        }
            return tbody;
        }

        private createNoDataRow():HTMLTableRowElement{
            const noDataRow=element('tr') as HTMLTableRowElement;
            noDataRow.id='noData';

            const noDataCell=element('td') as HTMLTableCellElement;
            noDataCell.colSpan=16;
            noDataCell.textContent='No data found';

            noDataRow.appendChild(noDataCell);
            return noDataRow;
        }
        
        private createDataRow(rec:ExpenseForm,index:number):HTMLTableRowElement{
                const trow=element('tr') as HTMLTableRowElement;

                if(this.stateService.editIndex===index){
                    trow.className='editing';
                }

        const cellValues=[
            rec.title,
            rec.category,
            rec.amount.toString(),
            rec.currency,
            rec.date,
            rec.time || '',
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
        cellValues.forEach(value=>{
            const td=element('td') as HTMLTableCellElement;
            td.textContent=value;
            trow.appendChild(td);
        });

        trow.appendChild(this.createActionCell(index));
        return trow;
    }
    private createActionCell(index:number):HTMLTableCellElement{
        const actionTd=element('td') as HTMLTableCellElement;

        const editBtn=element("button") as HTMLButtonElement;
        editBtn.className='edit-btn';
        editBtn.textContent='EDIT';
        editBtn.onclick=()=>this.handleEdit(index);

        const delBtn=element('button') as HTMLButtonElement;
        delBtn.className='del-btn';
        delBtn.textContent='DELETE';
        delBtn.onclick=()=>this.handleDelete(index);

        actionTd.appendChild(editBtn);
        actionTd.appendChild(document.createElement('br'));
        actionTd.appendChild(delBtn);

        return actionTd;
    }

    private handleEdit(index:number):void{
        this.logicService.editRecord(index);
        setTimeout(()=>{
            const form=document.querySelector('form');
            if(form){
                form.scrollIntoView({behavior:'smooth',block:'start'});
            }
        },100);
    }

    private handleDelete(index:number):void{
        this.modalService.showConfirm(
            'Are you sure you want to delete this expense?',
            ()=>{
                this.logicService.deleteRecord(index);
            }
        );
    }
}
export default TableComponent;