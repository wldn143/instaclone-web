import {faInstagram,} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Saparator";
import { FatLink } from "../components/shared";
import routes from "../routes";
import { gql,useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const HeaderContatiner = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
`;

const Subtitle=styled(FatLink)`
    font-size:16px;
    text-align:center;
    margin-top:10px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

function SignUp() {
  const history = useHistory();

  const onCompleted = (data) => {
    const {username,password} = getValues();
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return;
    }
    history.push(routes.home, {
      message: "Account created. please log in.",
      username,
      password,
    });
  };

  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid, ...formState },
  } = useForm({ mode: "onChange" });
  const onSubmitValid=(data)=>{
    if(loading){
      return false;
    }
    createAccount({
      variables: {
        ...data,
      },
    });
  };

  return (
    <AuthLayout>
      <Helmet>
        <title>Sign up | Instaclone</title>
      </Helmet>
      <FormBox>
        <HeaderContatiner>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HeaderContatiner>
        <Button type="submit" value="Log in with the Facebook" />
        <Separator />
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("firstName", {
              required: "First Name is required.",
            })}
            type="text"
            placeholder="First Name"
            hasError={Boolean(errors?.firstname?.message)}
          />
          <FormError message={errors?.username?.message} />

          <Input
            {...register("lastName")}
            type="text"
            placeholder="Last Name"
          />
          <Input
            {...register("email", {
              required: "email is required.",
            })}
            type="text"
            placeholder="Email"
          />
          <Input
            {...register("username", {
              required: "Username is required.",
            })}
            type="text"
            placeholder="Username"
          />
          <Input
            {...register("password", {
              required: "Password is required.",
            })}
            type="password"
            placeholder="Password"
          />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign up"}
            disabled={!isValid || loading}
          />
        </form>
      </FormBox>
      <BottomBox cta="have an account?" linkText="Log in" link={routes.home} />
    </AuthLayout>
  );
}

export default SignUp;