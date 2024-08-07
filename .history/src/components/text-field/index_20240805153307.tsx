// ** Mui Imports
import { TextFieldProps, TextField } from '@mui/material'

const CustomTextField = (props : TextFieldProps) => {
  const {InputLabelProps, size = "small", ...rests} = props

  return <TextField size={size} variant='filled' InputLabelProps= {{...InputLabelProps, shrink : true}} {...rests} />
}

export default CustomTextField


/**
 * CustomTextField là một functional component nhận vào props có kiểu là TextFieldProps.
 * TextFieldProps chứa tất cả các thuộc tính mà một TextField thông thường từ Material-UI có thể nhận.
 * InputLabelProps: Đây là một trong những thuộc tính của TextField và được sử dụng để tùy chỉnh thuộc tính của nhãn (label) cho trường nhập liệu. size = "small": Đây là một giá trị mặc định cho thuộc tính size của TextField. Nếu props không cung cấp giá trị cho size, thì nó sẽ mặc định là "small".,  ...rests: Đây là cú pháp spread operator, gom tất cả các thuộc tính còn lại vào một object rests.
 * {...rests}: Áp dụng tất cả các thuộc tính còn lại của props cho TextField.
 */