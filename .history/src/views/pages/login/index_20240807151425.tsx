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