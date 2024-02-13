/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import CryptoJs from "crypto-js";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loginError, setLoginError] = useState("");
  const [logoutError, setLogoutError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [getUserError, setUserError] = useState("");
  const [forgetPasswordError, setForgetPasswordError] = useState("");
  const [resetPasswordError, setResetPasswordError] = useState("");
  const [updateError, setUpdateError] = useState("");
  const navigate = useNavigate();

  const login = async (email, password) => {
    //encrypt password
    const encryptedPwd = CryptoJs.AES.encrypt(password, "login").toString();

    const response = await fetch(`http://localhost:3001/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3001",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
      body: JSON.stringify({ email, password: encryptedPwd }),
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      if (data.code === "loggedIn") {
        navigate("/");
        localStorage.setItem("id", email);

        const userRes = await fetch(`http://localhost:3001/api/auth/${email}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": `http://localhost:3001`,
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
          credentials: "include",
        });
        if (userRes.ok) {
          const userData = await userRes.json();
          setUser(userData.user);
        }
        setLoginError("");
        setUser(data.user);
      }
      if (data.code === "alreadyLoggedIn") {
        setLoginError("User Already LoggedIn");
      }
      if (data.code === "incorrectPassword") {
        setLoginError("Incorrect Password");
      }
      if (data.code === "userNotFound") {
        setLoginError("USer Not Found");
      }
    } else {
      // Handle authentication error
      setUser({});
      setLoginError("Internal Error");
    }
  };

  const logout = async () => {
    const response = await fetch(`http://localhost:3001/api/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3001",
      },
      body: JSON.stringify({ email: user.email }),
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      if (data.code === "logout") {
        localStorage.removeItem("id");
        navigate("/login");
        setLogoutError("");
        setUser({});
      }
      if (data.code === "userNotFound") {
        setLogoutError("USer Not Found");
      }
    } else {
      // Handle authentication error
      setLogoutError("Internal Error");
    }
  };

  const register = async (userData) => {
    //encrypt password
    const ciphertext = CryptoJs.AES.encrypt(
      userData.password,
      "register"
    ).toString();
    const userWithCiphertext = {user:userData, password: ciphertext };

    const response = await fetch(`http://localhost:3001/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": `http://localhost:3001`,
      },
      body: JSON.stringify(userWithCiphertext),
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      if (data.code === "registered") {
        navigate("/login");
        setRegisterError("");
      }
      if (data.code === "existUser") {
        setRegisterError("User Already Exist");
      }
    } else {
      setRegisterError("Internal Error");
      console.log("error");
    }
  };

  const forgetPassword = async (email, newPassword) => {
    //encrypt password
    const ciphertext = CryptoJs.AES.encrypt(
      newPassword,
      "forgetPassword"
    ).toString();

    const response = await fetch(
      `http://localhost:3001/api/auth/forgetpassword`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": `http://localhost:3001`,
        },
        body: JSON.stringify({ email, newPassword: ciphertext }),
        credentials: "include",
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (data.code === "passwordChanged") {
        navigate("/login");
        setForgetPasswordError("");
      }
      if (data.code === "userNotFound") {
        setForgetPasswordError("User Not Found");
      }
    }
  };

  const resetPassword = async (oldPassword, newPassword) => {
    const oldCiphertext = CryptoJs.AES.encrypt(oldPassword, "resetPassword").toString();
    const ciphertext = CryptoJs.AES.encrypt(newPassword, "resetPassword").toString();
    const response = await fetch(
      `http://localhost:3001/api/auth/resetpassword`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": `http://localhost:3001`,
        },
        body: JSON.stringify({
          email: user.email,
          oldPassword: oldCiphertext,
          newPassword: ciphertext,
        }),
        credentials: "include",
      }
    );
    if (response.ok) {
      const data = await response.json();
      if (data.code === "resetPwdSuccess") {
        setResetPasswordError("");
      }
      if (data.code === "passwordNotMatch") {
        setResetPasswordError("Incorrect Passwords");
      }
      if (data.code === "userNotFound") {
        setResetPasswordError("User Not Found");
      }
    }
  };

  const updateUser = async (userDetails) => {
    const response = await fetch(`http://localhost:3001/api/auth/updateuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": `http://localhost:3001`,
      },
      body: JSON.stringify({
        email: user.email,
        userDetails,
      }),
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      if (data.code === "updateUserSuccess" && user) {
        const updatedUser = {...user, ...userDetails};
        setUser(updatedUser);
        setUpdateError("");
      }
      if (data.code === "userNotFound") {
        setUpdateError("User Not Found");
      }
    } else {
      setLogoutError("Internal Error");
      console.log("error");
    }
  };

  const getUser = useCallback(async (email = user.email) => {
    const response = await fetch(`http://localhost:3001/api/auth/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3001",
      },
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      if (data.code === "userExist") {
        setUser(data.user);
        setUserError("");
      }
      if (data.code === "userNotFound") {
        setUserError("USer Not Found");
      }
    } else {
      // Handle authentication error
      setUserError("Internal Error");
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
      login,
      logout,
      logoutError,
      setLogoutError,
      loginError,
      setLoginError,
      getUser,
      getUserError,
      setUserError,
      register,
      registerError,
      setRegisterError,
      updateUser,
      updateError,
      setUpdateError,
      forgetPassword,
      forgetPasswordError,
      setForgetPasswordError,
      resetPassword,
      resetPasswordError,
      setResetPasswordError,
    }),
    [
      user,
      setUser,
      login,
      logout,
      logoutError,
      setLogoutError,
      loginError,
      setLoginError,
      getUser,
      getUserError,
      setUserError,
      register,
      registerError,
      setRegisterError,
      updateUser,
      updateError,
      setUpdateError,
      forgetPassword,
      forgetPasswordError,
      setForgetPasswordError,
      resetPassword,
      resetPasswordError,
      setResetPasswordError
    ]
  );

  useEffect(() => {
    const fetchData = async () => {
      const email = localStorage.getItem("id");
      if (email) {
        const response = await fetch(
          `http://localhost:3001/api/auth/${email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": `http://localhost:3001`,
              "Access-Control-Allow-Credentials": "true",
              "Access-Control-Allow-Methods": "POST",
              "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      }
    };
    fetchData();
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
