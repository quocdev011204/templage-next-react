// ** Mui Imports
import { TextFieldProps, TextField } from '@mui/material'

const CustomTextField = (props : TextFieldProps) => {
  const {InputLabelProps, size = "small", ...rests} = props
  
  return <TextField size={size} InputLabelProps= {{...InputLabelProps, shrink : true}} {...rests} />
}

export default CustomTextField