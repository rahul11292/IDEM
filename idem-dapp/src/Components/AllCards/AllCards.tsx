

import { Close } from "@mui/icons-material";
import { Modal } from "@mui/material";
import { useEffect, CSSProperties, useState  } from "react";
import { PropagateLoader } from "react-spinners";
import { useAppDispatch, useAppSelector } from "../../Hooks/hooks";
import SingleCard from "../Common/SingleCard/SingleCard";
import "./AllCards.scss"
import { loadAllCardAsync } from "./AllCardsSlice";

const override: CSSProperties = {
  position: "absolute",
  zIndex: "111"
};



export default function AllCards() {

 const cards = useAppSelector(state=>state.allCards)
 const dispatch = useAppDispatch();
 const userId = localStorage.getItem("userId")
 useEffect(()=>{
  dispatch(loadAllCardAsync())
 },[])

  return (
    <>
    
    <div className='allCards'>
       <PropagateLoader color={"#459d7c"} loading={cards.isLoading} size={20} css={override}/>
      {cards.data.response?.map((card:any)=>{
           return  <SingleCard key={card.Userid} userid={card.Userid} businessName={card.organisationName} websiteMain={card.socialMedia.name==="website" && card.socialMedia.link} name={[card.contacts[0].name]} email={card.contacts[0].email[0]} number={card.contacts[0].number[0]} designation={card.contacts[0].designation} address={`${card.location.city}, ${card.location.state}, ${card.location.country}`} isInHolder={false} isMyCard={userId===card.Userid?true:false} logo={card.logo}/>
      })}
       
      
    </div>
    </>
  )
}
