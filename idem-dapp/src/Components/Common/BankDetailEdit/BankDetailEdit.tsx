import { useState } from "react";
import { User } from "../../../data";
import Input from "../Input";
import './BankDetailEdit.scss'
export default function BankDetailEdit({ data }: { data: User }) {
  const [bankDetails, setBankDetails] = useState({
    visibleTo:[],name:"",accountNumber:"",ifsc:12345,bankName:"",branchName:""
  })
  function changeHandler(){

  }
  return (
    <div className="bankDetailsContainer">
      <div className="bank">
      <Input label="Name" name="name" onChange={changeHandler} value={String(bankDetails.name)} />
      <Input label="Account Number" name="accountNumber" onChange={changeHandler} value={String(bankDetails.accountNumber)} />
      <Input label="IFSC" name="ifsc" onChange={changeHandler} value={String(bankDetails.ifsc)} />
      <Input label="Branch Name" name="branchName" onChange={changeHandler} value={String(bankDetails.branchName)} />
      </div>
    </div>
  )
}
