import { Link } from "react-router-dom";
import styled from "styled-components";

export const SideBarContainer = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100vh;
  width: 200px;
  background: #f9fafb;
  padding: 14px 16px;
  box-sizing: border-box;
  border-right: 1px solid var(--gray-300, #d1d5db);
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #db551b;
  font-size: 15.446px;
  font-weight: 800;
`;

export const LogoImg = styled.img`
  width: 22px;
  height: 17px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: -webkit-fill-available;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  gap: 3px;
  margin-top: 30px;
`;

export const ListItemLink = styled(Link)`
  text-decoration: none;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 9px;
  width: 100%;
  box-sizing: border-box;
  gap: 9px;
  color: #111827;
  font-size: 11.233px;
  font-weight: 400;
  line-height: 16.85px;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid transparent;

  &:hover {
    border: 1px solid grey;
    background: lightgrey;
  }
`;

export const Icon = styled.img`
  cursor: pointer;
  width: 17px;
  height: 17px;
`;

export const SignOut = styled.button`
  display: flex;
  align-items: center;
  justify-self: end;
  cursor: pointer;
  color: var(--peak-primary, #384d6c);
  font-family: Montserrat;
  font-size: 20px;
  font-weight: 400;
  gap: 20px;
  background: #fff;
  padding: 12px 20px;
  box-shadow: 6px 6px 26px 5px rgba(236, 236, 236, 0.38);
  border-radius: 28px;
  outline: none;
  border: 1px solid var(--peak-primary, #384d6c);
`;

export const SignOutIcon = styled.img`
  width: 18px;
  height: 18px;
`;
