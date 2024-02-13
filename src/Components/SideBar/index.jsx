import Icons from "../../Icons";
import sidebarList from "../../data/sidebar";
import Images from "../../Images";
import { useUser } from "../../Providers/UserContext";

//css
import {
  Container,
  Icon,
  List,
  ListItem,
  ListItemLink,
  LogoContainer,
  LogoImg,
  SideBarContainer,
  SignOut,
  SignOutIcon,
} from "./index.styles";

const SideBar = () => {
  const { logout } = useUser();

  const signOut = async () => {
    await logout();
  };

  return (
    <SideBarContainer>
      <LogoContainer>
        <LogoImg src={Images.SmallLogo} alt="logo" />
        ADUDU
      </LogoContainer>
      <Container>
        <List>
          {sidebarList &&
            sidebarList.map((listItem, index) => (
              <ListItemLink key={`sidebar list ${index}`} to={listItem.url}>
                <ListItem>
                  <Icon src={listItem.icon} alt="icon" />
                  {listItem.title}
                </ListItem>
              </ListItemLink>
            ))}
        </List>
        <SignOut onClick={signOut}>
          Sign Out <SignOutIcon src={Icons.LogoutIcon} alt="sign out icon" />
        </SignOut>
      </Container>
    </SideBarContainer>
  );
};

export default SideBar;
