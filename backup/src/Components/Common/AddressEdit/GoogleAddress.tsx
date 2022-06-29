import { InputProps, TextField} from "@mui/material";
import { LegacyRef, MutableRefObject, RefObject, useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";

export default  function AutoCompleteGoogle() {
  const [address, setAddress] = useState("")
  const { ref } = usePlacesWidget<HTMLDivElement>({
    apiKey: "AIzaSyD-OLJqa7_cx1bfGeOvKk1idS_GlH-eQCo&v=3",
    onPlaceSelected: (place) => {
      console.log(place);
    },
    options: {
      types: ["(regions)"],
    },
  });
  function changeHandler(){

  }

  return <TextField size="small" sx={{width:"100%"}} ref ={ref} label="Search address" name="address" onChange={changeHandler} value={address} />;
};