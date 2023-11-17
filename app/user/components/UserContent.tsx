"use client";

import { useAuth } from "@/contexts/AuthContext";
import React from "react";
import UserDisplay from "./UserDisplay";

const UserContent = () => {
  const { user } = useAuth();

  return (
    <div>
      <UserDisplay user={user} />
    </div>
  );
};

export default UserContent;
