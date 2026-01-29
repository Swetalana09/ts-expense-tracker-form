import { useState } from "react";
import type { ExpenseForm, AppState } from "../types";
import { useLocalStorage, useModal} from "../hooks";
import { expenseService } from "../services";
import ExpenseFormComponent from '../components/Form/ExpenseForm';
import ExpenseTable from '../components/Table/ExpenseTable';
import Modal from '../components/Modal/Modal';
import ThemeToggle from '../components/ThemeToggle';


function ExpenseTrackerPage(){
    const [appState, setAppState]=useLocalStorage<AppState>({
        records:[],
        editIndex:null
    });

    const [editRecord,setEditRecord]=useState<ExpenseForm|null>(null);
    const {modal,showSuccessModal,showConfirmModal,closeModal}=useModal();

    const handleSubmit=(data:ExpenseForm)=>{
        setAppState(prev=>expenseService.addExpense(prev,data));
        console.log('Record added,state saved');
    };

    const handleUpdate=(data:ExpenseForm)=>{
        if(appState.editIndex!==null){
            setAppState(prev=>expenseService.updateExpense(prev,appState.editIndex!,data));
            setEditRecord(null);
            console.log('Record updated, state saved');
        }
    };

    const handleEdit=(index:number)=>{
        setAppState(prev=>expenseService.setEditMode(prev,index));
        setEditRecord(expenseService.getExpense(appState,index));
        console.log('Edit mode: index', index);
    };

    const handleDelete=(index:number)=>{
        showConfirmModal('Are you sure you want to delete this expense?',()=>{
        setAppState(prev=>expenseService.deleteExpense(prev,index));
        setEditRecord(null);
        console.log('Record deleted');
    });
};

return(
    <div className='page-layout'>
    <ThemeToggle/>
    <div className="container">
    <div className="main">
    <h2>EXPENSE TRACKER FORM</h2>
    <p className="id1">~ Keep Track of Your Spending</p>
    </div>
    <ExpenseFormComponent
    editIndex={appState.editIndex}
    editRecord={editRecord}
    onSubmit={handleSubmit}
    onUpdate={handleUpdate}
    showModal={showSuccessModal}
    />
    </div>

    <div className="table-box">
    <div className="table-heading">
    <h2>EXPENSE RECORDS</h2>
    </div>
    <ExpenseTable
    records={appState.records}
    editIndex={appState.editIndex}
    onEdit={handleEdit}
    onDelete={handleDelete}
    />
    </div>

    <Modal 
    show={modal.show}
    type={modal.type}
    title={modal.title}
    message={modal.message}
    onClose={closeModal}
    onConfirm={modal.onConfirm}
    />
    </div>
);
}

export default ExpenseTrackerPage;
