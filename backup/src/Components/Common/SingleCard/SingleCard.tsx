import { Avatar, Button, Paper, Tooltip } from "@mui/material";
import './SingleCard.scss';
import {UnfoldMore, Add, Share , Language , Instagram, LinkedIn, Facebook, YouTube, Check, Close, LocationOn} from '@mui/icons-material';
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactModal from "react-modal";
import Input from "../Input";
type CardProp = {
    userid:string
    businessName: string,
    websiteMain: string,
    name : string[],
    email?: string,
    number?: string,
    designation?:string,
    address?: string,
    isInHolder:boolean,
    isMyCard?:boolean,
    logo:string
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: "50%",
        overflow: "auto scroll",
        maxHeight: "85%",
        minHeight:"15em"
  
  
    },
    overlay: {
        backgroundColor: "rgb(47 137 104 / 40%)",
        zIndex: "111"
    }
  };


export default function SingleCard({ userid, businessName, websiteMain, name = [""], email = "", number="", designation="", address, isInHolder, isMyCard=false, logo }: CardProp) {
        const [isHolder, setIsHolder] = useState(isInHolder)
        const [modalIsOpen, setIsOpen] = useState(false);
        const navigate = useNavigate();
        const location = useLocation();
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
    function stringAvatar(name: string) {
        return {
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }
    function changeHandler(){

    }
 function addToHolderHandler(){
            setIsHolder(!isHolder)
    }
    function handleCardClick(){
            navigate(`/card/${userid}`, {state:location, replace:true})
    }
    function handleButtonClicked(e:React.MouseEvent<HTMLDivElement>){
            e.stopPropagation()
    }
    function openModal() {
        setIsOpen(true);
      }
      function closeModal() {
        setIsOpen(false);
      }
    return (
        <>
        <div className="singleCard">
            <div className="flip">
                <div className="front">
                    {logo === ""?<Avatar {...stringAvatar(businessName)} sx={{ fontSize: 25, width: 100, height: 100, backgroundColor: "#459d7c" }} />:<Avatar src={logo}sx={{ fontSize: 25, width: 100, height: 100, backgroundColor: "#459d7c" }} />}
                    <div>
                        <h3>{businessName}</h3>
                        <p>{name[0]}</p>
                    </div>
                </div>
                <div className="back" onClick={handleCardClick}>
                    <div className="buttonTop" onClick={handleButtonClicked}>
                        {isMyCard ? "":<Tooltip placement="top" title={isHolder?"Remove from my holder":"Add to my holder"}><button onClick={addToHolderHandler} className="addToHolder">{isHolder?<Check/>:<Add />}</button></Tooltip>}         
                        <Tooltip placement="top" title="Share card"><button onClick={openModal}><Share/></button></Tooltip>
                    </div>
                    <p className="businessNameBack">{businessName}</p>
                    <div>
                    <p className="heading">{name[0]}</p>
                    <p className="designation">{designation}</p>
                    <div className="details">
                        <p>{email}</p>
                        <p>{number}</p>   
                    </div>
                    </div>
                    <p className="address">{address}</p>
                    <div className="buttonBottom" onClick={handleButtonClicked}>
                    <Tooltip placement="bottom" title="Open website"><button><Language/></button></Tooltip >
                        <Tooltip placement="bottom" title="Open instagram"><button><Instagram/></button></Tooltip>
                        <Tooltip placement="bottom" title="Open linkedIn"><button><LinkedIn/></button></Tooltip>
                        <Tooltip placement="bottom" title="Open facebook"><button><Facebook/></button></Tooltip>
                        <Tooltip placement="bottom" title="Open youtube"><button><YouTube/></button></Tooltip>
                    </div>
                </div>
            </div>
        </div>
        <ReactModal
     ariaHideApp={false}
     isOpen={modalIsOpen}
     onRequestClose={closeModal}
     style={customStyles}
     contentLabel="Example Modal">
         <div className="headerModal">
             <h4>Share</h4>
         <button className="closeModal" onClick={closeModal}><Close /></button>
         </div>
     <div className="content">
            <div className="cardToShare">
            {logo === ""?<Avatar {...stringAvatar(businessName)} sx={{ fontSize: 25, width: 80, height: 80, backgroundColor: "#459d7c" }} />:<Avatar src={logo}sx={{ fontSize: 25, width: 80, height: 80, backgroundColor: "#459d7c" }} />}
                <div className="details">
                <h4>{businessName}</h4>
                <p className="address"><LocationOn sx={{fontSize:15}}/>{address}</p>
                {name.map(n=><p className="name" key={n}>{n}</p>)}
                </div>
              
            </div>
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
                    return <p className="name" style={{fontSize: "12px", margin: "0px", padding: "0px"}}>{r.name}</p>
                })}
        </div>
        {results.isVisible ? <Button variant="contained" size="small">Stop sharing</Button> : <Button variant="contained" size="small">Share</Button>}
        </div>
        })}
        </div>
     </div>

 </ReactModal>
        </>
    )
}
