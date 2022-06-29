import { Button, TextField } from "@mui/material";

export default function DescriptionEdit({ data }: { data: string }) {
  return (
    <div style={{display:"flex", justifyContent: "center", flexDirection:"column"}}>
      <TextField
        placeholder="Description"
        multiline
        sx={{ width: "100%" }}
        rows={10}
      />
      <div style={{textAlign:"center", marginTop:"1.5rem"}}>
        <Button variant="contained" size="medium" >Save</Button>
      </div>
    </div>
  )
}
