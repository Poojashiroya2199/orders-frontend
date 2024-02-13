/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState, useMemo } from "react";

import { useUser } from "./UserContext";

const SellOrderContext = createContext();

export const SellOrderProvider = ({ children }) => {
  const { user } = useUser();
  const [sellOrders, setSellOrders] = useState();
  const [sellOrder, setSellOrder] = useState({});
  const [createOrderError, setCreateOrderError] = useState("");
  const [updateOrderError, setUpdateOrderError] = useState("");
  const [orderRemoveError, setOrderRemoveError] = useState("");
  const [getOrderError, setSellOrderError] = useState("");
  const [getOrdersError, setSellOrdersError] = useState("");  

  const getSellOrder = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/sellOrder/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3001",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        if (data.code === "existOrder") {
          setSellOrderError("");
          setSellOrder(data.order);
          return data.order;
        }
        if (data.code === "notFoundOrder") {
          setSellOrder({});
          setSellOrderError("Order Not Found");
          return;
        }
      }
    } catch (error) {
      console.log("error", error);
      setSellOrderError("Internal Error");
      setSellOrder({});
      return;
    }
  };

  const getSellOrders = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/sellOrder/orders/${user.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3001",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.code === "sellOrdersFound") {
          setSellOrders(data.orders);
          setSellOrdersError("");
        }
        if (data.code === "OrderNotExist") {
          setSellOrders([]);
          setSellOrdersError("Orders Not Found");
        }
      }
    } catch (error) {
      console.log("error", error);
      setSellOrders([]);
      setSellOrdersError("Internal error");
    }
  };

  const createSellOrder = async (orderDetails) => {
    const copyOrderDetails = {...orderDetails, email: user.email, phoneNumber: user.phoneNumber}
    try {
      const response = await fetch(
        "http://localhost:3001/api/sellOrder/orderCreate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3001",
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
        if (data.code === "SellOrderCreate") {
          setCreateOrderError("");
          await getSellOrders();
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

  const updateSellOrder = async (id, updateOrderDetails) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/sellOrder/orderUpdate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3001",
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
          await getSellOrders();
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

  const removeSellOrder = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/sellOrder/orderRemove",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3001",
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
          await getSellOrders();
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
      sellOrders,
      setSellOrders,
      createSellOrder,
      updateSellOrder,
      removeSellOrder,
      getSellOrder,
      getSellOrders,
      createOrderError,
      setCreateOrderError,
      orderRemoveError,
      setOrderRemoveError,
      updateOrderError,
      setUpdateOrderError,
      getOrderError,
      setSellOrderError,
      getOrdersError,
      setSellOrdersError,
      sellOrder,
      setSellOrder,
    }),
    [
      sellOrders,
      setSellOrders,
      createSellOrder,
      updateSellOrder,
      removeSellOrder,
      getSellOrder,
      getSellOrders,
      createOrderError,
      setCreateOrderError,
      orderRemoveError,
      setOrderRemoveError,
      updateOrderError,
      setUpdateOrderError,
      getOrderError,
      setSellOrderError,
      getOrdersError,
      setSellOrdersError,
      sellOrder,
      setSellOrder,
    ]
  );

  useEffect(() => {
    const fetchOrders = async() => {
      if(user && user.email){
        await getSellOrders();
      }
    }
    fetchOrders();
  }, []);

  return (
    <SellOrderContext.Provider value={value}>
      {children}
    </SellOrderContext.Provider>
  );
};

export const useSellOrder = () => useContext(SellOrderContext);
