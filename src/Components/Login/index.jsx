/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../Providers/UserContext";
import Icons from "../../Icons";
import Images from "../../Images";
import ReactModal from "react-modal";

// css
import {
  CardImg,
  CreateAccount,
  Error,
  Feature,
  // FeatureDescription,
  FeatureTitle,
  ForgetPassword,
  Input,
  Label,
  LoginContainer,
  LoginContent,
  LoginLeft,
  LoginRight,
  Logo,
  NewAccount,
  // RememberCheckbox,
  // RememberMe,
  SignInBtn,
  SupportContainer,
  SupportImg,
  Title,
  DetailsContainer,
  ButtonsContainer,
  ModalContainer
} from "./index.styles";
import {  CloseModal, Submit } from "../SellOrders/index.styles";

const Login = () => {
  const {user, login, loginError, setLoginError, forgetPassword, forgetPasswordError} = useUser();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showForgetModal, setShowForgetModal] = useState(false);
  const [forgetEmail, setForgetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPasword] = useState("");

  const navigate = useNavigate();
  
  const handleLogin = async () => {
   await login(userName, password);
  };
  
  const handleCancelForgetPwd = () => {
    setShowForgetModal(false);
    setConfirmNewPasword("");
    setNewPassword("");
    setForgetEmail("")
  }

  const handleForgetPwd = async() => {
    setShowForgetModal(false)
    if(newPassword === confirmNewPassword){
      await forgetPassword(forgetEmail, newPassword);
      setConfirmNewPasword("");
      setNewPassword("");
      setForgetEmail("")
    }
    else {
      setLoginError("New Password and Confirm New password not matched.")
      setConfirmNewPasword("");
      setNewPassword("");
      setForgetEmail("")
    }
  }

  useEffect(() => {
    if (user) {
      const email = localStorage.getItem("id");
      if (user.email === email) {
        navigate("/");
      }
    }
  }, [user]);

  return (
    <LoginContainer>
      <LoginLeft>
        <Logo src={Images.Logo} alt="logo" />
        <LoginContent>
          <Title>Sign Up</Title>
          <NewAccount>
            Don’t have an account? <CreateAccount to={"/signup"}>Create Now</CreateAccount>
          </NewAccount>
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="abc@gmail.com" value={userName} onChange={(e) => setUserName(e.target.value)}/>
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" placeholder="@#*%"  value={password} onChange={(e) => setPassword(e.target.value)}/>
          {loginError && <Error>{loginError}</Error>}
          {forgetPasswordError && <Error>{forgetPasswordError}</Error>}
           <ForgetPassword onClick={() => setShowForgetModal(true)}>Forget Password?</ForgetPassword>
          <SignInBtn onClick={handleLogin}>Sign in</SignInBtn>
        </LoginContent>
      </LoginLeft>
      <LoginRight>
        <SupportContainer>
          <SupportImg src={Icons.Support} alt="support" />
          Support
        </SupportContainer>
        <CardImg src={Images.Card} alt="card" />
        <Feature>
          <FeatureTitle>Introducing new features</FeatureTitle>
          {/* <FeatureDescription>
            Analyzing previous trends ensures that businesses always make the
            right decision. And as the scale of the decision and it’s impact
            magnifies...
          </FeatureDescription> */}
        </Feature>
      </LoginRight>
       {/* forget modal */}
       <ReactModal isOpen={showForgetModal}
        onRequestClose={() => setShowForgetModal(false)}
        ariaHideApp={false}
       >
        <ModalContainer>
          <DetailsContainer>
          <Label htmlFor="forgetEmail">Email</Label>
          <Input type="email" id="forgetEmail" value={forgetEmail} onChange={(e) => setForgetEmail(e.target.value)}/>
          <Label htmlFor="newPassword">New Password</Label>
          <Input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
          <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
          <Input type="password" id="confirmNewPassword" value={confirmNewPassword} onChange={(e) => setConfirmNewPasword(e.target.value)}/>
          </DetailsContainer>
          <ButtonsContainer>
            <CloseModal onClick={handleCancelForgetPwd}> Cancel</CloseModal>
            <Submit onClick={handleForgetPwd}>Submit</Submit>
          </ButtonsContainer>
        </ModalContainer>
       </ReactModal>
    </LoginContainer>

  );
};

export default Login;
