/* eslint-disable react-hooks/exhaustive-deps */
// import Footer from "../Footer";
import { useEffect } from "react";
import SideBar from "../SideBar";
import { Content, LayoutContainer } from "./index.styles";
import { useUser } from "../../Providers/UserContext";
import { useNavigate } from "react-router-dom";

const PostLayout = ({ children }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("id");
     if(!user || !email) {
      navigate("/login");
    }
  }, []);

  return (
    <LayoutContainer>
      <SideBar />
      <Content>
        {children}
        {/* <Footer /> */}
      </Content>
    </LayoutContainer>
  );
};

export default PostLayout;
