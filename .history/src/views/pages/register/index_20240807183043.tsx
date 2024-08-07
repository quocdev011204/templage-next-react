//  Next
import { NextPage } from 'next'
import Image from 'next/image';

// * React
import { useState } from 'react';

//* MUI
import {
  Checkbox,
  Button,
  CssBaseline,
  FormControlLabel,
  Link,
  Box,
  Typography,
  InputAdornment,
  IconButton
} from '@mui/material';
import { useTheme } from '@mui/material';

// ** Components
import CustomTextField from 'src/components/text-field';
import Icon from 'src/components/Icon';

// ** Form
import { useForm, Controller  } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex';

// ** Image
// import RegisterDark from "/public/images/register-dark.png"
import RegisterLight from "/public/images/register-light.png"


type TProps = {}

const LoginPage: NextPage<TProps> = () => {
  // yup là một thư viện giúp bạn định nghĩa các schema cho việc xác thực dữ liệu.
  // yup.object().shape tạo ra một schema đối tượng.
  // email: yup.string().required() xác định rằng trường email là một chuỗi và là bắt buộc.
  // password: yup.string().required() tương tự, xác định rằng trường password là một chuỗi và là bắt buộc.
  // required() ở cuối định nghĩa schema làm cho toàn bộ đối tượng là bắt buộc.
  // useForm là một hook từ thư viện react-hook-form, cung cấp các công cụ để quản lý form trong React.
  // defaultValues thiết lập các giá trị mặc định cho các trường trong form, ở đây là email và password đều có giá trị rỗng ban đầu.
  // mode: 'onBlur' xác định rằng xác thực sẽ được kích hoạt khi trường input mất focus (blur). nếu khi t nhấp chuột ra ngoài khỏi trường input mà thông tin cần nhập không đúng nó sẽ báo lỗi, ví dụ như là email phải có @.
  // resolver: yupResolver(schema) sử dụng yupResolver để tích hợp schema của yup vào react-hook-form để xử lý xác thực.
  // handleSubmit là một hàm dùng để xử lý việc submit form. formState: {errors} cung cấp thông tin về các lỗi xác thực, nếu có, trong quá trình nhập liệu của người dùng. validate nếu có lỗi thì sẽ hiện ra
  // schema ta cứ hiểu đơn giản nó là ta đang khai báo những cái type của các field trong input như là email là string, password cũng là string như ở bên dưới

  // State show and hidden password
  const [showPassword, setShowPassword ]= useState(false)
  const [rememberMe, setRememberMe] = useState(true)

  // Theme
  const theme = useTheme()

  const schema = yup.object().shape(({
    email: yup.string().required("The field is required").matches(EMAIL_REG, "The field is must email type"),
    password: yup.string().required("The field is required").matches(PASSWORD_REG, "The field is must password type"),
  }))
  const {  handleSubmit, formState: {errors}, control } = useForm({
    defaultValues: {
      email : '',
      password: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: {email: string, password: string}) => {
    // data chính là type của phần defaultValues cho 2 trường email và password ở trên
    console.log("data", { data });
    
  }

  return (
      <Box sx={
        {
          height: "100vh",
          width: "100vw",
          backgroundColor : theme.palette.background.paper,
          display: "flex",
          alignItems: 'center',
          padding: '40px',
        }
      }>
        <Box 
          display={{
            xs: 'none',
            sm: 'flex'
          }}
          sx={ 
            {  
              alignItems: "center", justifyContent: "center", backgroundColor : theme.palette.customColors.bodyBg,height:"100%", borderRadius: '20px', minWidth: '50vw'
            } 
              }>
          <Image src={RegisterLight} alt='login image light' style={ { height: '100%', width: 'auto'} }/>
        </Box>
        <Box sx={ {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1
        } }>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
              <Box sx={ {mt: 2} }>
                <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomTextField
                        required
                        fullWidth
                        label="Email"
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        error={Boolean(errors?.email)}
                        placeholder='Input email'
                        helperText={errors?.email?.message}
                      />
                    )}
                    name="email"
                  />
              </Box>
              <Box sx={ {mt: 2} }>
                <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomTextField
                        required
                        fullWidth
                        label="Password"
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        error={Boolean(errors?.password)}
                        placeholder='Input password'
                        helperText={errors?.password?.message}
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? 
                                <Icon icon="material-symbols-light:visibility-outline"/> : 
                                <Icon icon="material-symbols-light:visibility-off-outline"/>}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                    name="password"
                  />
              </Box>
              <Box sx={ { display: 'flex', alignItems: 'center', justifyContent: 'space-between'} }>
                <FormControlLabel
                  control={
                    <Checkbox 
                      value="remember"
                      checked = {rememberMe}
                      onChange={ e => setRememberMe(e.target.checked)}
                      color="primary" />
                    }
                    label="Remember me"
                    />
                    <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Box sx={ { display: 'flex', alignItems: 'center', justifyContent: 'space-between'} }>
                <Typography>{"Don't have an account?"}</Typography>    
                  <Link href="#" variant="body2">
                    {"Sign Up"}
                  </Link>
              </Box>
              <Typography sx={ {textAlign: 'center', mt: 2, mb: 2} }>Or</Typography>
              <Box sx={ {display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'} }>
                <IconButton sx={ { color: '#497ce2'} }>
                <svg xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true" 
                  role="img" font-size="1.375rem"  width="1em"
                  height="1em" viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z">
                  </path>
                </svg>
                </IconButton>
                <IconButton sx={ { color: theme.palette.error.main} }>
                  <svg xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true" role="img" font-size="1.375rem" width="1em"
                    height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor"
                      d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81Z">
                    </path>
                  </svg>
                </IconButton>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
  );
}

export default LoginPage