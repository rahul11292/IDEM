import { LocationOn } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";
import { User } from "../../../data";
import Input from "../Input";

const nameDisplay = {fontSize: "12px", margin: "0px", padding: "0px"}
export default function VisibiltySearchAdd({ data }: { data: User }) {
    const [searchValue, setSearchValue] = useState('')
    const [searchResults, setSearchResults] = useState([
            {
                organisationName : "Dickinson and Sons",
                location:"4112 Ruthe Parkway Apt. 012, Carolynehaven, North Carolina, 05021-5305, Malaysia",
                contacts:[
                    {
                        name : "Adrien Schiller"
                    }
                ],
                isVisible: false
            }

    ])
    function changeHandler(){

    }
  return (
    <div>
        <Input label="Search business to share with" name="name" onChange={changeHandler} value={searchValue} />
        <div>
        {searchResults.map((results)=>{
            return <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginTop:"0.8rem"}}>
                <div style={{display: "flex", flexDirection:"column", justifyContent: "flex-start", alignItems: "flex-start"}}>
                <h4 style={{margin:"0px", padding:"0px"}}>{results.organisationName} </h4>
                <div style={{display:"flex", alignItems:"center"}}>
                <LocationOn sx={{fontSize:15, color:"#6a6a6a"}}/>
                <p className="location" style={{color:"#6a6a6a",fontSize: "10px"}}>{results.location}</p>
                </div>
                {results.contacts.map((r)=>{
                    return <p className="name" style={nameDisplay}>{r.name}</p>
                })}
        </div>
        {results.isVisible ? <Button variant="contained" size="small">Remove</Button> : <Button variant="contained" size="small">Add</Button>}
        </div>
        })}
        </div>
    </div>
  )
}
