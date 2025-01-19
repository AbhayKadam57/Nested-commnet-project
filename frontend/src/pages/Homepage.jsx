import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Homepage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser?.username) {
      navigate("/login");
    }

    setUser(storedUser);
  }, []);
  return (
    <div className="w-full bg-red-200 flex flex-col">
      <div> Welocome {user?.username}</div>
    </div>
  );
};

export default Homepage;
