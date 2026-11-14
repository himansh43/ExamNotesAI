import React, { useEffect } from "react";
import { serverUrl } from "../App";

const SideBar = () => {
  useEffect(() => {
    const fetchAllNotes = async () => {
      const url = `${serverUrl}/api/gemini-result/getAllNotes`;
      const options = {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
    };
    fetchAllNotes();
  }, []);
  return <div>SideBar</div>;
};

export default SideBar;
