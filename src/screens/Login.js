import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Saparator";
import routes from "../routes";
import { useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, ...formState },
  } = useForm({ mode: "onChange" });

  const onSubmitValid=(data)=>{
  };

  return (
    <AuthLayout>
      <Helmet>
        <title>Log in | Instaclone</title>
      </Helmet>
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("username", {
              required: "Username is required.",
              minLength: {
                value: 5,
                message: "Username should be logger than 5 chars.",
              },
            })}
            type="text"
            placeholder="Username"
            hasError={Boolean(errors?.username?.message)}
          />
          <FormError message={errors?.username?.message}/>

          <Input
            {...register("password", { required: "Password is required." })}
            type="password"
            placeholder="Password"
            hasError={Boolean(errors?.password?.message)}
          />
          <FormError message={errors?.password?.message}/>
          <Button type="submit" value="Log in" disabled={!isValid} />
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        cta="Don't have an account?"
        linkText="Sign up"
        link={routes.signUp}
      />
    </AuthLayout>
  );
}
  export default Login;
