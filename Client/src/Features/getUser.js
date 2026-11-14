import { useDispatch } from "react-redux";
import { serverUrl } from "../App";

export const getUser = async () => {
  const options = {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${serverUrl}/api/user/getUser`, options);
  const data = await response.json();

  return data;
};
