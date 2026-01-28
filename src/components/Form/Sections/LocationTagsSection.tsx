import React from "react";
import InputField from "../Elements/InputField";

interface LocationTagsSectionProps{
    location:string;
    tags:string;
    onLocationChange:(value:string)=>void;
    onTagsChange:(value:string)=>void;
}
const LocationTagsSection:React.FC<LocationTagsSectionProps>=({
    location,
    tags,
    onLocationChange,
    onTagsChange
})=>{
    return(
        <div className="form-row">
            <InputField
            id='loc'
            name='loc'
            type='text'
            label='Location (optional)'
            value={location}
            onChange={(e)=>onLocationChange(e.target.value)}
            placeholder="Start typing a location"
            />
            <InputField
            id='tags'
            name='tags'
            type='text'
            label='Tags (optional)'
            value={tags}
            onChange={(e)=>onTagsChange(e.target.value)}
            placeholder="e.g, work, personal, urgent (comma-separated)"
            />
        </div>
    );
};
export default LocationTagsSection;