//  Next
import { NextPage } from 'next'

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
  Container
} from '@mui/material';

// ** Components
import CustomTextField from 'src/components/text-field';

// ** Form
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

type TProps = {}

const LoginPage: NextPage<TProps> = () => {
  // yup là một thư viện giúp bạn định nghĩa các schema cho việc xác thực dữ liệu.
  // yup.object().shape tạo ra một schema đối tượng.
  // email: yup.string().required() xác định rằng trường email là một chuỗi và là bắt buộc.
  // password: yup.string().required() tương tự, xác định rằng trường password là một chuỗi và là bắt buộc.
  // required() ở cuối định nghĩa schema làm cho toàn bộ đối tượng là bắt buộc.
  // useForm là một hook từ thư viện react-hook-form, cung cấp các công cụ để quản lý form trong React.
  // defaultValues thiết lập các giá trị mặc định cho các trường trong form, ở đây là email và password đều có giá trị rỗng ban đầu.
  // mode: 'onBlur' xác định rằng xác thực sẽ được kích hoạt khi trường input mất focus (blur).
  // resolver: yupResolver(schema) sử dụng yupResolver để tích hợp schema của yup vào react-hook-form để xử lý xác thực.
  // handleSubmit là một hàm dùng để xử lý việc submit form. formState: {errors} cung cấp thông tin về các lỗi xác thực, nếu có, trong quá trình nhập liệu của người dùng. validate nếu có lỗi thì sẽ hiện ra
  const schema = yup.object().shape(({
    email: yup.string().required(),
    password: yup.string().required(),
  })).required();
  const {  handleSubmit, formState: {errors} } = useForm({
    defaultValues: {
      email : '',
      password: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: {email: string, password: string}) => {
    console.log("data", { data });
    
  }

  return (
      <Container component="main" maxWidth="xs">
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
            <CustomTextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <CustomTextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
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
      </Container>
  );
}

export default LoginPage