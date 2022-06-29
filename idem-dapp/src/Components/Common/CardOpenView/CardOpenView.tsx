import { Edit, KeyboardOptionKey, ArrowBack, Close, Add } from "@mui/icons-material";
import { Avatar, Tooltip } from "@mui/material";
import { useLocation, useNavigate, useParams, Location } from "react-router-dom"
import './CardOpenView.scss';
import GoogleMapReact from 'google-map-react';
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { CSSProperties, ReactElement, useEffect, useState } from "react";
import { getUserById } from "./CardOpenViewSlice";
import { PropagateLoader } from "react-spinners";
import SharedWithTable from "./SharedWithTable";
import Modal from 'react-modal'
import MainContact from "../MainContactEdit/MainContact";
import SocialMediaEdit from "../SocialMediaEdit/SocialMediaEdit";
import AddressEdit from "../AddressEdit/AddressEdit";
import DescriptionEdit from "../DescriptionEdit/DescriptionEdit";
import BankDetailEdit from "../BankDetailEdit/BankDetailEdit";
import VisibiltySearchAdd from "../BankDetailEdit/VisibiltySearchAdd";

const override: CSSProperties = {
    position: "absolute",
    zIndex: "111",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#f7f7f77a",

};
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

export default function CardOpenView() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [modalheading, setModalheading] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const card = useAppSelector(state => state.cardView)
    const dispatch = useAppDispatch();
    const savedId = localStorage.getItem("userId")
    useEffect(() => {
        dispatch(getUserById(id!))
    }, [])
    function stringAvatar(name: string) {
        return {
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }
    function openModal(value: string) {
        setIsOpen(true);
        setModalContent(value)
    }
    function closeModal() {
        setIsOpen(false);
    }
    function modalContentLoad(value:string){
            const modalContent : {body: ReactElement | null, header:string} = {body:null, header:""};
        switch(value){
            case "mainContact":modalContent.body= <MainContact data={card.data?.response[0]!}/>; modalContent.header = "Contact"; break; 
            case "socialMedia" :modalContent.body= <SocialMediaEdit data={card.data?.response[0].socialMedia!}/>; modalContent.header = "Social media"; break;
            case "address" :modalContent.body= <AddressEdit data={card.data?.response[0]!}/>; modalContent.header = "Location"; break;
            case "about" :modalContent.body= <DescriptionEdit data={card.data?.response[0].about!}/>; modalContent.header = "Description"; break;
            case "bank" :modalContent.body= <BankDetailEdit data={card.data?.response[0]!}/>; modalContent.header = "Bank details"; break;
            case "bankVisibility" :modalContent.body= <VisibiltySearchAdd data={card.data?.response[0]!}/>; modalContent.header = "Add Visibility for Bank Details"; break;
            default: modalContent.body= <MainContact data={card.data?.response[0]!}/>; modalContent.header = "Contact"; break;
        }
        return modalContent
        // switch(value){
        //     case "mainContact":return <MainContact data={card.data?.response[0]!}/>
        //     case "socialMedia" :return <SocialMediaEdit data={card.data?.response[0].socialMedia!}/>
        //     case "address" :return <AddressEdit data={card.data?.response[0]!}/>
        //     case "about" :return <DescriptionEdit data={card.data?.response[0].about!}/>
        //     case "bank" :return <BankDetailEdit data={card.data?.response[0]!}/>
        //     default: return <MainContact data={card.data?.response[0]!}/>
        // }
       
    }


    return (<div className="cardOpenView">
        <PropagateLoader color={"#459d7c"} loading={card.isLoading} size={20} css={override} />
        <Tooltip placement="top" title="Back"><button className="backButton" onClick={() => { navigate((location.state as Location).pathname) }}><ArrowBack /></button></Tooltip>
        <div className="row1">
            <div className="logoName">
                {savedId === card.data?.response[0].Userid && <Tooltip placement="bottom" title="Edit"><button className="editButton" onClick={() => openModal("mainContact")}><Edit /></button></Tooltip >}
                {card.data?.response[0].logo === "" ? <Avatar {...stringAvatar("Test User")} sx={{ fontSize: 25, width: 150, height: 150, backgroundColor: "#459d7c" }} variant="rounded" /> : <Avatar src={card.data?.response[0].logo} sx={{ width: 150, height: 150 }} variant="rounded" />}
                <div className="details">
                    <h3>{card.data?.response[0].organisationName}</h3>
                    {
                        card.data?.response[0].contacts.map((person) => {
                            return <div key={person.number[0]}>
                                <p className="designation">{person.designation}</p>
                                <p className="name">{person.name}</p>
                                <p className="number">{person.number[0]}</p>
                                <p className="email">{person.email[0]}</p>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className="socialMedia">
                {savedId === card.data?.response[0].Userid && <Tooltip placement="bottom" title="Edit"><button className="editButton" onClick={() => openModal("socialMedia")}><Edit /></button></Tooltip >}
                <h4>Social Media</h4>
                <div className="mediaList">
                    {
                        card.data?.response[0].socialMedia.map((media) => {
                            return <p key={media.name}><span>{media.name}</span> : <a href={media.link} target="_blank">{media.link}</a></p>
                        })
                    }
                </div>
            </div>
            <div className="address">
                {savedId === card.data?.response[0].Userid && <Tooltip placement="bottom" title="Edit"><button className="editButton" onClick={() => openModal("address")}><Edit /></button></Tooltip >}
                <div className="mapGoogle">
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyD-OLJqa7_cx1bfGeOvKk1idS_GlH-eQCo&v=3" }}
                        center={{
                            lat: Number(card.data?.response[0].location.position.latitude) || 0,
                            lng: Number(card.data?.response[0].location.position.longitude) || 0
                        }}
                        defaultZoom={11}
                    >
                    </GoogleMapReact>
                </div>
                <div className="textAddress">
                    <div className="mainAddress">
                        <h4>Address</h4>
                        <p>{card.data?.response[0].location.address}, {card.data?.response[0].location.city}, {card.data?.response[0].location.state}, {card.data?.response[0].location.zip}, {card.data?.response[0].location.country}</p>
                    </div>
                    {card.data?.response[0].branches.length && <div className="branchAddress">
                        <h4>Branches</h4>
                        {card.data?.response[0].branches.map(branch => {
                            return <a key={branch.zip} href={`https://www.google.com/maps/search/?api=1&query=${branch.position.latitude}%2C${branch.position.longitude}`} target="_blank"><KeyboardOptionKey />{branch.address}, {branch.city}, {branch.state}, {branch.zip}, {branch.country}</a>
                        })}
                    </div>}

                </div>
            </div>
            <div className="description">
                {savedId === card.data?.response[0].Userid && <Tooltip placement="bottom" title="Edit"><button className="editButton" onClick={() => openModal("about")}><Edit /></button></Tooltip >}
                <h4>Description</h4>
                <p className="designation">{card.data?.response[0].about}</p>
            </div>

        </div>
        <div className="row2">
            <div className="bankDetails">
                {savedId === card.data?.response[0].Userid && <Tooltip placement="bottom" title="Edit"><button className="editButton" onClick={() => openModal("bank")}><Edit /></button></Tooltip >}
                <h4>Bank details</h4>
                <div className="mainBankBlock">
                    <div className="details">

                        <p><span>Bank name</span>{card.data?.response[0].bankDetails.bankName}</p>
                        <p><span>Account number</span> {card.data?.response[0].bankDetails.accountNumber}</p>
                        <p><span>IFSC Code</span> {card.data?.response[0].bankDetails.ifsc}</p>
                        <p><span>Branch Name</span> {card.data?.response[0].bankDetails.branchName}</p>
                    </div>
                    <div className="sharedWithBank">
                        <div className="visibleHeading">
                        <h5>Visible to</h5>
                        <Tooltip placement="top" title="Add to share with"><button className="AddButton" onClick={()=>openModal("bankVisibility")}><Add /></button></Tooltip>
                        </div>
                        
                        <SharedWithTable />
                    </div>
                </div>

            </div>
        </div>

        <Modal
            ariaHideApp={false}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal">
                <div className="headerModal">
                    <h4>{modalContentLoad(modalContent).header}</h4>
                <button className="closeModal" onClick={closeModal}><Close /></button>
                </div>
            
            {/* <MainContact data={card.data?.response[0]!}/> */}
            {/* <SocialMediaEdit data={card.data?.response[0].socialMedia!}/> */}
            {modalContentLoad(modalContent).body}
        </Modal>
    </div>
    )
}


