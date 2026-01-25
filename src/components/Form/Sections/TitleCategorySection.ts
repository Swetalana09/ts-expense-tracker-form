import { element } from "../../../utils/dom";
import createInputField from "../Elements/InputFields";
import createSelectField from "../Elements/SelectFields";

export interface TitleCategorySectionReturn{
    row:HTMLDivElement;
    titleInput:HTMLInputElement;
    categorySelect:HTMLSelectElement;
}

function createTitleCategorySection():TitleCategorySectionReturn{
    const row=element('div') as HTMLDivElement;
    row.className='form-row';

    const {container:titleContainer, input:titleInput}=createInputField({
        id:'exptitle',
        name:'exptitle',
        type:'text',
        label:'Expense Title',
        placeholder:'e.g, Lunch at restaurant',
        required:true,
    });
    titleContainer.classList.add('flex-2')

    const {container:categoryContainer, select: categorySelect}=createSelectField({
        id:'category',
        name:'category',
        label:'Category',
        options:['---select---','Housing','Food','Transportation','Health','Shopping','Entertainment','Technology','Miscellaneous expenses'],
        required:true,
    });
categoryContainer.classList.add('flex-1');

row.appendChild(titleContainer);
row.appendChild(categoryContainer);

return {row, titleInput, categorySelect};
}

export default createTitleCategorySection;