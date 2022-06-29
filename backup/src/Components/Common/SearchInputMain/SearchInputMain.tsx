
import './SearchInputMain.scss'
import {Search} from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../../Hooks/hooks';
import { searchCardAsync } from '../../AllCards/AllCardsSlice';

type SearchValue = {
    value:string
}
export default function SearchInputMain() {
    const dispatch = useAppDispatch()
    const [searchValue, setSearchValue] = useState<SearchValue>({
        value : ""
    })
    const InputRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const [switchSearch, setSwitchSearch] = useState(false) //false close
    // const [switchSearchInput, setSwitchSearchInput] = useState(false)
    // const [switchSearchButton, setSwitchSearchButton] = useState(false)

    function changeHandler(event:React.ChangeEvent<HTMLInputElement>){
        setSearchValue({value : event.target.value})
        if(event.target.value===""){
            dispatch(searchCardAsync(""))
        }

    }
    function onBlurButton(){
        searchValue.value==="" && setSwitchSearch(false)
    }
    function onBlurInput(){
        searchValue.value ? setSwitchSearch(true) : setSwitchSearch(false)     
    }
    function focusHandler(){
        setSwitchSearch(true)
    }
 
  
    function buttonClickHandler(){
        
        
        searchValue.value  && switchSearch ? dispatch(searchCardAsync(searchValue.value)) : setSwitchSearch(!switchSearch)
        console.log(switchSearch)
        // if(switchSearch){
        //     setTimeout(()=>{
        //         InputRef.current.focus()
        //     }, 200)
        // }
        // else{
        //     setSwitchSearch(true)
        // }
    }

  return (
    <div className='searchBarMain'>
    <input type="text" className={switchSearch? "activeInput":""} ref={InputRef} value={searchValue.value} placeholder="Search..."  onChange={changeHandler} onFocus={focusHandler} onBlur={onBlurInput} onKeyPress={(e)=>{e.key==='Enter' && dispatch(searchCardAsync(searchValue.value))}}/>
    <button className="searchIcon" onClick={buttonClickHandler} onBlur={onBlurButton}><Search sx={{ fontSize: 25 }}  /></button>
    </div>
  )
}
