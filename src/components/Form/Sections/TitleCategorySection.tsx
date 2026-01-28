import React from 'react';
import InputField from '../Elements/InputField';
import SelectField from '../Elements/SelectField';

interface TitleCategorySectionProps{
    title:string;
    category:string;
    onTitleChange:(value:string)=>void;
    onCategoryChange:(value:string)=>void;
    onTitleBlur:()=>void;
    titleError?:string;
    categoryError?:string;
}

const TitleCategorySection: React.FC<TitleCategorySectionProps>=({
    title,category,onTitleChange,onCategoryChange,onTitleBlur,titleError,categoryError
})=>{
    return (
        <div className='form-row'>
            <InputField
            id='exptitle'
            name='exptitle'
            type='text'
            label='Expense Title'
            value={title}
            onChange={(e)=>onTitleChange(e.target.value)}
            onBlur={onTitleBlur}
            placeholder='e.g, Lunch at restaurant'
            required
            error={titleError}
            className='flex-2'
            />
            <SelectField
            id='category'
            name='category'
            label='Category'
            value={category}
            onChange={(e)=>onCategoryChange(e.target.value)}
            options={['---select---','Housing','Transportation','Health','Shopping','Entertainment','Technology',
                'Miscellaneous expenses'
            ]}
            required
            error={categoryError}
            className='flex-1'
            />
        </div>
    );
};
export default TitleCategorySection;