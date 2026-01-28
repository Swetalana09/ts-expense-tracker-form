import React from "react";
import CheckboxField from "../Elements/CheckboxField";

interface PreferencesSectionProps{
    receipt:boolean;
    saveRecurring:boolean;
    saveExpense:boolean;
    onReceiptChange:(checked:boolean)=>void;
    onSaveRecurringChange:(checked:boolean)=>void;
    onSaveExpenseChange:(checked:boolean)=>void;
    saveExpenseError?:string;
}

const PreferencesSection: React.FC<PreferencesSectionProps>=({
    receipt,
    saveRecurring,
    saveExpense,
    onReceiptChange,
    onSaveRecurringChange,
    onSaveExpenseChange,
    saveExpenseError
})=>{
    return(
        <fieldset>
            <legend>Expense Preferences</legend>
            <CheckboxField
            id='receipt_available'
            name='receipt'
            label='Receipt available'
            checked={receipt}
            onChange={(e)=>onReceiptChange(e.target.checked)}
            />
            <br/>
            <CheckboxField
            id='save_recurring'
            name='save_recurring'
            label='Save this recurring expense'
            checked={saveRecurring}
            onChange={(e)=>onSaveRecurringChange(e.target.checked)}
            />
            <br/>
            <CheckboxField
            id='save_expense'
            name='save_expense'
            label='Save this expense'
            checked={saveExpense}
            onChange={(e)=>onSaveExpenseChange(e.target.checked)}
            required />
            {saveExpenseError && <div className="error">{saveExpenseError}</div>}
        </fieldset>
    );
};
export default PreferencesSection;

