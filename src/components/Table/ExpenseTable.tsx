import type { ExpenseForm } from "../../types";

interface ExpenseTableProps{
    records:ExpenseForm[];
    editIndex:number|null;
    onEdit:(index:number)=>void;
    onDelete:(index:number)=>void;
}

function ExpenseTable({
    records,
    editIndex,
    onEdit,
    onDelete
}:ExpenseTableProps){
    const handleEdit=(index:number)=>{
        onEdit(index);
        setTimeout(()=>{
            const form=document.querySelector('form');
            if(form){
                form.scrollIntoView({behavior:'smooth', block:'start'});
            }
        },100);
    };
const headers=['Title','Category','Amount','Currency','Date','Time','Payment Method','TransactionID','Vendor','Location','Tags',
    'Notes/Description','Receipt','Recurring','Save Expense','Actions'];

    return(
        <div className="table-main">
            <table id='expenseTable'>
                <thead>
                    <tr>
                        {headers.map((header)=>(
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {records.length===0?(
                        <tr id='noData'>
                            <td colSpan={headers.length}>No data found</td>
                        </tr>
                    ):(
                        records.map((record,index)=>(
                            <tr
                            key={index}
                            className={editIndex===index?'editing':''}>
                                <td>{record.title}</td>
                                <td>{record.category}</td>
                                <td>{record.amount}</td>
                                <td>{record.currency}</td>
                                <td>{record.date}</td>
                                <td>{record.time}</td>
                                <td>{record.payments}</td>
                                <td>{record.transactionID||''}</td>
                                <td>{record.vendorName}</td>
                                <td>{record.location}</td>
                                <td>{record.tags}</td>
                                <td>{record.notes}</td>
                                <td>{record.receipt?'Yes':'No'}</td>
                                <td>{record.saveRecurring?'Yes':'No'}</td>
                                <td>{record.saveExpense?'Yes':'No'}</td>
                                <td>
                                    <button className="edit-btn"
                                    onClick={()=>handleEdit(index)}>
                                        EDIT
                                    </button>
                                    <br />
                                    <button
                                    className="del-btn"
                                    onClick={()=>onDelete(index)}>
                                        DELETE
                                        </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};
export default ExpenseTable;