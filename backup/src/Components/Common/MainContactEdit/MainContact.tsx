import { Add, Contacts, Delete, Remove } from '@mui/icons-material';
import { Button, Checkbox, FormControlLabel, Tooltip } from '@mui/material';
import { MouseEvent, useState } from 'react';
import { User } from '../../../data';
import Input from '../Input';
import './MainContact.scss'

type ErrorMain = {
    organisationName?: string,
    name?: string,
    email?: string
}

type MainContactState = {
    account: {
        organisationName: string,
        logo: string,
        showNameFront: boolean,
        contacts: {
            prefix: string,
            name: string,
            designation: string,
            number: string[],
            email: string[]
        }[],
    }
    error: null | ErrorMain
}

export default function MainContact({ data }: { data: User }) {
    const [main, setMain] = useState<MainContactState>(
        {
            account: {
                organisationName: "",
                logo: "",
                showNameFront: true,
                contacts: [{
                    prefix: "",
                    name: "",
                    designation: "",
                    number: [""],
                    email: [""]
                }]
            },
            error: null
        })
    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target;
        console.log(reader, file)
        // reader.onloadend = () => {
        //     setMain({...main, logo : file})
        //   this.setState({
        //     file: file,
        //     imagePreviewUrl: reader.result
        //   });
        // }
        // reader.readAsDataURL(file);
    }
    function changeHandler() {

    }
    function addContact(event: MouseEvent) {
        event.preventDefault()
        setMain(preState => { return { ...preState, contacts: main.account.contacts.push({
            prefix: "",
            name: "",
            designation: "",
            number: [""],
            email: [""]
        })  } })
    }

    function removeContact(event: MouseEvent,index:number){
        event.preventDefault()
        setMain(preState => { return { ...preState, contacts: main.account.contacts.splice(index, 1) } })
    }

    function addNumberorEmail(event: MouseEvent, value: string, index: number) {
        event.preventDefault()
        if (value === "num") {
            setMain(preState => { return { ...preState, number: main.account.contacts[index].number.push("") } })
        } else {
            setMain(preState => { return { ...preState, email: main.account.contacts[index].email.push("") } })
        }
    }
    function removeNumberorEmail(event: MouseEvent, value: string, indexContact: number, indexSpecific: number) {
        event.preventDefault()
        if (value === "num") {
            setMain(preState => { return { ...preState, number: main.account.contacts[indexContact].number.splice(indexSpecific, 1) } })
        } else {
            setMain(preState => { return { ...preState, email: main.account.contacts[indexContact].email.splice(indexSpecific, 1) } })
        }
    }
   
    return (
        <div className='contactDetails'>
            <form>
                <label htmlFor="photo-upload" className="custom-file-upload fas">
                    <div className="img-wrap img-upload" >
                        <img src={main.account.logo} />
                    </div>
                    <input id="photo-upload" type="file" onChange={onChange} />
                </label>
                <Input label="Business Name" name="organisationName" onChange={changeHandler} value={main.account.organisationName} validator={main.error?.organisationName} />
                <div className="persons">               
                {main.account.contacts.map((contact, index) => {
                    return <div key={index} className="personWithRmove">
                        {main.account.contacts.length>1 && <Tooltip placement="bottom" title="Remove more Person"><button className="rmoveButton" onClick={(e)=>removeContact(e,index)}><Delete/></button></Tooltip >}
                        <div>
                        <div className="name" >
                            <Input label="Prefix" name="prefix" onChange={changeHandler} value={contact.prefix} />
                            <Input label="Name" name="name" onChange={changeHandler} value={contact.name} />
                        </div>
                        <div className="numberAndEmail">
                            <div className="addNumber">
                                {contact.number.map((num, indexNumber) => {
                                    return <div className="number" key={indexNumber}>
                                        <Input label="Number" name="number" onChange={changeHandler} value={num} />
                                        {indexNumber === contact.number.length - 1 ? <Tooltip placement="bottom" title="Add more Number"><button className="AddButton" onClick={(e) => addNumberorEmail(e, "num", index)}><Add /></button></Tooltip > : contact.number.length && <Tooltip placement="bottom" title="Remove number"><button className="RemoveButton" onClick={(e) => removeNumberorEmail(e, "num", index, indexNumber)}><Delete /></button></Tooltip >}
                                    </div>
                                })}
                            </div>
                            <div className="addEmail">
                                {contact.email.map((emailSingle, indexEmail) => {
                                    return <div className="email" key={indexEmail}>
                                        <Input label="Email" name="email" onChange={changeHandler} value={emailSingle} />
                                        {indexEmail === contact.email.length - 1 ? <Tooltip placement="bottom" title="Add more Email"><button className="AddButton" onClick={(e) => addNumberorEmail(e, "email", index)}><Add /></button></Tooltip > : contact.email.length && <Tooltip placement="bottom" title="Remove email"><button className="RemoveButton" onClick={(e) => removeNumberorEmail(e, "email", index, indexEmail)}><Delete /></button></Tooltip >}
                                    </div>
                                })}
                            </div>

                        </div>
                        <div className="shownameOnFront">
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Show name/s on the fron of the card" />
                        </div>
                        </div>
                       
                    </div>

                })}
                <div className='addContactsButton'>

                <Button variant="contained" size="small" disabled={main.account.contacts.length>4} onClick={addContact}>Add a Person</Button>
                </div>
                </div>
                <Button variant="contained" size="medium" >Save</Button>
            </form>
            
        </div >
    )
}
