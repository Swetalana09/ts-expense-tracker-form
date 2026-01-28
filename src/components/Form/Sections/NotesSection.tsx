import React from "react";
import TextareaField from "../Elements/TextareaField";

interface NotesSectionProps{
    notes:string;
    onNotesChange:(value:string)=>void;
}
const NotesSection:React.FC<NotesSectionProps>=({
    notes,
    onNotesChange
})=>{
    return(
        <TextareaField
        id='note'
        name='note'
        label='Notes/Description (optional)'
        value={notes}
        onChange={(e)=>onNotesChange(e.target.value)}
        placeholder="Add any additional notes..."
        />
    );
};
export default NotesSection;