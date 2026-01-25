    import createTextareaField from "../Elements/TextareaField";

    export interface NotesSectionReturn{
        container:HTMLDivElement;
        textarea:HTMLTextAreaElement;
    }
    function createNotesSection():NotesSectionReturn{
        return createTextareaField({
            id:'note',
            name:'note',
            label:'Notes/Description (optional)',
            placeholder:'Add any additional notes..',
        });
    }

    export default createNotesSection;