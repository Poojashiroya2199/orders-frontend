import { useState } from "react";

import { useUser } from "../../Providers/UserContext";
import Icons from "../../Icons/index";

// css
import {
  Edit,
  ForgotPasswordContainer,
  Input,
  Item,
  Name,
  ProfileContainer,
  PropertyVal,
  Submit,
  Title,
  UserDetailsContainer,
  Status,
} from "./index.styles";

const Admin = () => {
  const {user, updateUser, updateError, resetPasswordError, resetPassword } = useUser();
  // update
  const [editEnable, setEditEnable] = useState([]);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [editStatus, setEditStatus] = useState("");

  // reset password
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
 const [status, setStatus] = useState("");

  const handleEditEnable = (property) => {
    setEditEnable([...editEnable, property]);
  };

  const handleUpdate = async() => {
    // update profile
    let newUser = {};
    setEditEnable([]);
    if (firstName) {
      newUser = { ...newUser, firstName };
    }
    if (lastName) {
      newUser = { ...newUser, lastName };
    }
    if (email) {
      newUser = { ...newUser, email };
    }
    if (phoneNumber) {
      newUser = { ...newUser, phoneNumber };
    }
    if (firstName || lastName || email || phoneNumber)
      await updateUser(newUser);

    if (!updateError) {
      setEditStatus("User updated Successfully.");
    } else {
      setEditStatus(updateError);
    }
  };

  const handleResetSubmit = async() => {
    if (
      oldPassword &&
      newPassword &&
      confirmNewPassword &&
      oldPassword.length > 6 &&
      newPassword.length > 6 &&
      confirmNewPassword.length > 6
    ) {
      if (oldPassword !== newPassword && newPassword === confirmNewPassword) {
        await resetPassword(oldPassword, newPassword);
      }
      if (!resetPasswordError) {
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setStatus("Password Updated");
      } else {
        setStatus(resetPasswordError);
      }
    }
  };

  return (
    <ProfileContainer>
      <Title>User Profile</Title>
      <UserDetailsContainer>
        <Item>
          <Name>First Name:</Name>
          <PropertyVal>{user?.firstName}</PropertyVal>
          {editEnable.includes("firstName") && (
            <Input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          )}
          <Edit onClick={() => handleEditEnable("firstName")}>
            <img src={Icons.EditIcon} alt="edit" width="22px" height="22px" />
          </Edit>
        </Item>
        <Item>
          <Name>Last Name:</Name>
          <PropertyVal>{user?.lastName}</PropertyVal>
          {editEnable.includes("lastName") && (
            <Input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          )}
          <Edit onClick={() => handleEditEnable("lastName")}>
            <img src={Icons.EditIcon} alt="edit" width="22px" height="22px" />
          </Edit>
        </Item>
        <Item>
          <Name>Email:</Name>
          <PropertyVal>{user?.email}</PropertyVal>
          {editEnable.includes("email") && (
            <Input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
          )}
          <Edit onClick={() => handleEditEnable("email")}>
            <img src={Icons.EditIcon} alt="edit" width="22px" height="22px" />
          </Edit>
        </Item>
        <Item>
          <Name>Phone Number:</Name>
          <PropertyVal>{user?.phoneNumber}</PropertyVal>
          {editEnable.includes("phoneNumber") && (
            <Input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          )}
          <Edit onClick={() => handleEditEnable("phoneNumber")}>
            <img src={Icons.EditIcon} alt="edit" width="22px" height="22px" />
          </Edit>
        </Item>
        {editStatus && <Status>{editStatus}</Status>}
        <Submit disabled={editEnable.length === 0} onClick={handleUpdate}>Update</Submit>
        <ForgotPasswordContainer>
          <Title>Reset Password</Title>
          <Item>
            <Name>Old Password:</Name>
            <Input type="password" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
          </Item>
          <Item>
            <Name>New Password:</Name>
            <Input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
          </Item>
          <Item>
            <Name>Confirm New Password:</Name>
            <Input type="password" placeholder="Confirm New Password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
          </Item>
          {status && <Status>{status}</Status>}
          <Submit onClick={handleResetSubmit}>Submit</Submit>
        </ForgotPasswordContainer>
      </UserDetailsContainer>
    </ProfileContainer>
  );
};

export default Admin;
