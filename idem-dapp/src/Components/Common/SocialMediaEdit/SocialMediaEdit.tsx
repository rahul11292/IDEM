
import { useEffect, useState } from "react"
import "./SocialMediaEdit.scss"
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Input from "../Input";
import { Button, Tooltip } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
const filter = createFilterOptions<MediaName>();
type MediaName = {
    title: string,
    inputValue?: string
}
export default function SocialMediaEdit({ data }: { data: { name: string, link: string }[] }) {
    const [media, setMedia] = useState<{ name: string, link: string }[]>([
        { name: "", link: "" }
    ])
    const [value, setValue] = useState<MediaName | null>(null);
    function changeHandler() {

    }
    function addSocialMedia() {
        setMedia(prevState=>[...prevState, {name:"", link:''}])
    }
    function removeMedia(index:number) {
        setMedia(prevState=>{
            const arrTemp = prevState;
            arrTemp.splice(index, 1)
            return [...arrTemp]
        })
    }
    return (<>
        {media.map((m, index) => {
            return <div key={index} className="socialMediaMain">
                {index === media.length - 1 ? <Tooltip placement="left" title="Add more media"><button className="AddButton" onClick={addSocialMedia}><Add /></button></Tooltip > : media.length && <Tooltip placement="left" title="Remove media"><button className="RemoveButton" onClick={() => removeMedia(index)}><Delete /></button></Tooltip >}
                <Autocomplete
                    value={value}
                    onChange={(event, newValue) => {
                        if (typeof newValue === 'string') {
                            setValue({
                                title: newValue,
                            });
                        } else if (newValue && newValue.inputValue) {
                            // Create a new value from the user input
                            setValue({
                                title: newValue.inputValue,
                            });
                            mediaName.push({ title: newValue.inputValue }) // adding the value to the list
                        } else {
                            setValue(newValue);
                        }
                    }}
                    filterOptions={(options, params) => {
                        const filtered = filter(options, params);

                        const { inputValue } = params;
                        // Suggest the creation of a new value
                        const isExisting = options.some((option) => inputValue === option.title);
                        if (inputValue !== '' && !isExisting) {
                            filtered.push({
                                inputValue,
                                title: `Add "${inputValue}"`,
                            });
                        }

                        return filtered;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    id="free-solo-with-text-demo"
                    options={mediaName}
                    sx={{width:"50%", marginRight:"0.5rem", marginBottom:"1rem"}}
                    getOptionLabel={(option) => {
                        // Value selected with enter, right from the input
                        if (typeof option === 'string') {
                            return option;
                        }
                        // Add "xxx" option created dynamically
                        if (option.inputValue) {
                            return option.inputValue;
                        }
                        // Regular option
                        return option.title;
                    }}
                    renderOption={(props, option) => <li {...props}>{option.title}</li>}
                    freeSolo
                    renderInput={(params) => (
                        <TextField {...params} label="Platform" size="small" />
                    )}
                />
                <Input label="Link" name="name" onChange={changeHandler} value={""} />
            </div>
        })}
        <div className="buttonSave">
                <Button variant="contained" size="medium" >Save</Button>
        </div>
    </>

    )
}


const mediaName: MediaName[] = [{
    title: "Website",
},
{
    title: "Youtube",
},
{
    title: "Instagram",
},
{
    title: "Facebook",
},
{
    title: "LinkedIn",
},
{
    title: "Twitter",
},
{
    title: "Indeed",
},
]