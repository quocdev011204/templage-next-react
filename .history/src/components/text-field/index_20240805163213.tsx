// ** Mui Imports
import { TextFieldProps, TextField, styled } from '@mui/material'


const TextFieldStyled = styled(TextField)<TextFieldProps>(({theme}) => {
  console.log("theme", {theme});
  
  return {
    "& .MuiInputLabel-root":{
      transform: "none",
      lineHeight: 1.2, 
      position: "relative",
      marginBottom: theme.spacing(1),
      fontSize: theme.typography.body2.fontSize
    },
    "& .MuiInputBase-root":{
      borderRadius: 8,
      backgroundColor: "transparent !important",
      border: `1px solid rgba(${theme.palette.customColors.main}, 0.2)`,
      transition: theme.transitions.create(['border-color', 'box-shadow'],{
        duration: theme.transitions.duration.shorter
      }), 
    }
  }
})

const CustomTextField = (props : TextFieldProps) => {
  const {InputLabelProps, size = "small", variant = "filled", ...rests} = props

  return <TextFieldStyled size={size} variant= {variant} InputLabelProps= {{...InputLabelProps}} {...rests} />
}

export default CustomTextField


/**
 * CustomTextField là một functional component nhận vào props có kiểu là TextFieldProps.
 * TextFieldProps chứa tất cả các thuộc tính mà một TextField thông thường từ Material-UI có thể nhận.
 * InputLabelProps: Đây là một trong những thuộc tính của TextField và được sử dụng để tùy chỉnh thuộc tính của nhãn (label) cho trường nhập liệu. size = "small": Đây là một giá trị mặc định cho thuộc tính size của TextField. Nếu props không cung cấp giá trị cho size, thì nó sẽ mặc định là "small".,  ...rests: Đây là cú pháp spread operator, gom tất cả các thuộc tính còn lại vào một object rests.
 * {...rests}: Áp dụng tất cả các thuộc tính còn lại của props cho TextField.
 */