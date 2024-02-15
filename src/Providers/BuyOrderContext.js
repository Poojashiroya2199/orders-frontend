/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState, useMemo } from "react";
// import orders from "../data/order";

import { useUser } from "./UserContext";

const BuyOrderContext = createContext();

export const BuyOrderProvider = ({ children }) => {
  const { user } = useUser();
  const [buyOrders, setBuyOrders] = useState();
  const [buyOrder, setBuyOrder] = useState({});
  const [createOrderError, setCreateOrderError] = useState("");
  const [updateOrderError, setUpdateOrderError] = useState("");
  const [orderRemoveError, setOrderRemoveError] = useState("");
  const [getOrderError, setBuyOrderError] = useState("");
  const [getOrdersError, setBuyOrdersError] = useState("");  

 

  const getBuyOrder = async (id) => {
    try {
      const response = await fetch(`https://dark-lime-moth-wear.cyclic.app/api/buyOrder/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://dark-lime-moth-wear.cyclic.app",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        if (data.code === "existOrder") {
          setBuyOrderError("");
          setBuyOrder(data.order);
          return data.order;
        }
        if (data.code === "notFoundOrder") {
          setBuyOrder({});
          setBuyOrderError("Order Not Found");
          return;
        }
      }
    } catch (error) {
      console.log("error", error);
      setBuyOrderError("Internal Error");
      setBuyOrder({});
      return;
    }
  };

  const getOrders = async () => {
    try {
      const response = await fetch(
        `https://dark-lime-moth-wear.cyclic.app/api/buyOrder/orders/${user.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://dark-lime-moth-wear.cyclic.app",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.code === "buyOrdersFound") {
          setBuyOrders(data.orders);
          setBuyOrdersError("");
        }
        if (data.code === "OrderNotExist") {
          setBuyOrders([]);
          setBuyOrdersError("Orders Not Found");
        }
      }
    } catch (error) {
      console.log("error", error);
      setBuyOrders([]);
      setBuyOrdersError("Internal error");
    }
  };

  const createBuyOrder = async (orderDetails) => {
    const copyOrderDetails = {...orderDetails, email: user.email, phoneNumber: user.phoneNumber}
    try {
      const response = await fetch(
        "https://dark-lime-moth-wear.cyclic.app/api/buyOrder/orderCreate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://dark-lime-moth-wear.cyclic.app",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
          body: JSON.stringify({orderDetails: copyOrderDetails }),
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.code === "BuyOrderCreate") {
          setCreateOrderError("");
          await getOrders();
        }
        if (data.code === "userNotFound") {
          setCreateOrderError("User Not Found");
        }
      }
    } catch (error) {
      console.log("error", error);
      setCreateOrderError("Internal Error");
    }
  };

  const updateBuyOrder = async (id, updateOrderDetails) => {
    try {
      const response = await fetch(
        "https://dark-lime-moth-wear.cyclic.app/api/buyOrder/orderUpdate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://dark-lime-moth-wear.cyclic.app",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
          body: JSON.stringify({ id, updateDetails: updateOrderDetails }),
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.code === "OrderUpdate") {
          setCreateOrderError("");
          await getOrders();
        }
        if (data.code === "OrderNotFound") {
          setCreateOrderError("Order Not Found");
        }
      }
    } catch (error) {
      console.log("error", error);
      setUpdateOrderError("Internal Error");
    }
  };

  const removeBuyOrder = async (id) => {
    try {
      const response = await fetch(
        "https://dark-lime-moth-wear.cyclic.app/api/buyOrder/orderRemove",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://dark-lime-moth-wear.cyclic.app",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
          body: JSON.stringify({ id }),
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.code === "OrderRemoved") {
          setOrderRemoveError("");
          await getOrders();
        }
        if (data.code === "OrderNotFound") {
          setOrderRemoveError("Order Not Found");
        }
      }
    } catch (error) {
      console.log("error", error);
      setOrderRemoveError("Internal Error");
    }
  };

  const value = useMemo(
    () => ({
      buyOrders,
      setBuyOrders,
      createBuyOrder,
      updateBuyOrder,
      removeBuyOrder,
      getBuyOrder,
      getOrders,
      createOrderError,
      setCreateOrderError,
      orderRemoveError,
      setOrderRemoveError,
      updateOrderError,
      setUpdateOrderError,
      getOrderError,
      setBuyOrderError,
      getOrdersError,
      setBuyOrdersError,
      buyOrder,
      setBuyOrder,
    }),
    [
      buyOrders,
      setBuyOrders,
      createBuyOrder,
      updateBuyOrder,
      removeBuyOrder,
      getBuyOrder,
      getOrders,
      createOrderError,
      setCreateOrderError,
      orderRemoveError,
      setOrderRemoveError,
      updateOrderError,
      setUpdateOrderError,
      getOrderError,
      setBuyOrderError,
      getOrdersError,
      setBuyOrdersError,
      buyOrder,
      setBuyOrder,
    ]
  );

  useEffect(() => {
    const fetchOrders = async() => {
      if(user && user.email){
        await getOrders();
      }
    }
    fetchOrders();
  }, []);

  return (
    <BuyOrderContext.Provider value={value}>
      {children}
    </BuyOrderContext.Provider>
  );
};

export const useBuyOrder = () => useContext(BuyOrderContext);
