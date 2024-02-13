import { useState } from "react";
import Images from "../../Images";
import { useUser } from "../../Providers/UserContext";

//css
import {
  AlreadyExist,
  CreateAccount,
  Detail,
  DetailsContainer,
  Error,
  Img,
  Input,
  LoginLink,
  LoginLinkContainer,
  Logo,
  SignUpContainer,
  SignUpLeft,
  SignUpRight,
  Submit,
} from "./index.styles";

const SignUp = () => {
  const { registerError, setRegisterError, register } = useUser();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const handleChange = (event, property) => {
    const value = event.target.value;
   let copyUser = {...user};
    if (property === "firstName") {
     copyUser = { ...user, firstName: value };
    }
    if (property === "lastName") {
      copyUser = { ...user, lastName: value };
    }
    if (property === "email") {
      copyUser = { ...user, email: value };
    }
    if (property === "password") {
     copyUser = { ...user, password: value };
    }
    if (property === "phoneNumber") {
      copyUser = { ...user, phoneNumber: value };
    }
    setUser(copyUser);
  };

  const createUser = async () => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i;
    const validEmail = emailRegex.test(user.email);
    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const validPassword = passwordRegex.test(user.password);

    if (
      user.email &&
      validEmail &&
      user.password &&
      user.password.length > 6 &&
      validPassword &&
      user.firstName &&
      user.lastName &&
      user.phoneNumber &&
      user.phoneNumber.length === 10
    ) {
      await register(user);
    }
    if (!user.email || !validEmail) {
      setRegisterError("Invalid Email");
    }
    if (!user.password || !validPassword) {
      setRegisterError("Invalid Password");
    }
    if (!user.firstName) {
      setRegisterError("Enter First Name");
    }
    if (!user.lastName) setRegisterError("Enter Last Name");
    if (!user.phoneNumber || user.phoneNumber.length !== 10) {
      setRegisterError("Invalid Phone Number");
    }
  };

  return (
    <SignUpContainer>
      <SignUpLeft>
        <Logo to="/">
          <img src={Images.SignUp} alt="signup-logo" />
        </Logo>
        <Img src={Images.SignUpImg} alt="img" />
      </SignUpLeft>
      <SignUpRight>
        <CreateAccount>Create Account</CreateAccount>
        <DetailsContainer>
          <Detail>
            <Input
              type="text"
              id="firstName"
              placeholder="First Name"
              value={user.firstName}
              onChange={(e) => handleChange(e, "firstName")}
            />
          </Detail>
          <Detail>
            <Input
              type="text"
              id="lastName"
              placeholder="Last Name"
              value={user.lastName}
              onChange={(e) => handleChange(e, "lastName")}
            />
          </Detail>
          <Detail>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => handleChange(e, "email")}
            />
          </Detail>
          <Detail>
            <Input
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => handleChange(e, "password")}
            />
          </Detail>
          <Detail>
            <Input
              type="text"
              id="phoneNo"
              placeholder="Phone Number"
              value={user.phoneNumber}
              onChange={(e) => handleChange(e, "phoneNumber")}
            />
          </Detail>
        </DetailsContainer>
        {registerError && <Error>{registerError}</Error>}
        <Submit onClick={createUser}>Create Account</Submit>
        <LoginLinkContainer>
          <AlreadyExist>Already have an account ?</AlreadyExist>
          <LoginLink to="/login">Login</LoginLink>
        </LoginLinkContainer>
      </SignUpRight>
    </SignUpContainer>
  );
};

export default SignUp;
