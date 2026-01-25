import { element } from "../../../utils/dom";
import createInputField from "../Elements/InputFields";

export interface LocationTagsSectionReturn{
    row:HTMLDivElement,
    locationInput:HTMLInputElement,
    tagsInput:HTMLInputElement,
}
function createLocationTagsSection():LocationTagsSectionReturn{
    const row=element('div') as HTMLDivElement;
    row.className='form-row';

    const {container:locationContainer, input:locationInput}=createInputField({
        id:'loc',
        name:'loc',
        type:'text',
        label:'Location (optional)',
        placeholder:'Start typing a location',
    });

    const {container:tagsContainer, input:tagsInput}=createInputField({
        id:'tags',
        name:'tags',
        type:'text',
        label:'Tags (optional)',
        placeholder:'e.g, work, personal, urgent (comma-separated)',
    });    
    row.appendChild(locationContainer);
    row.appendChild(tagsContainer);

    return {row,locationInput,tagsInput};
}

export default createLocationTagsSection;