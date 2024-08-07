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
  Grid,
  Box,
  Typography,
  InputAdornment,
  IconButton
} from '@mui/material';

// ** Components
import CustomTextField from 'src/components/text-field';
import Icon from 'src/components/Icon';

// ** Form
import { useForm, Controller  } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex';

// ** Image
import LoginDark from "/public/images/login-dark.png"
import LoginLight from "/public/images/login-light.png"
import { useTheme } from '@mui/material';

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
  })).required();
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
          width: "100vw",
          height: "100vh",
          backgroundColor : theme.palette.background.paper
        }
      }>
        <Box sx={ { display: "flex", alignItems: "center", justifyContent: "center", backgroundColor : theme.palette.customColors.bodyBg} }>
          <Image src={LoginLight} alt='login image light' style={ { height: "auto", width: "auto"} }/>
        </Box>
        <Box>
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Box>
  );
}

export default LoginPage