import React from "react";
import SettingsContent from "./components/SettingsContent";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";

const Settings = () => {
  return (
    <>
      <ProtectedRoute>
        <Navbar />
        <SettingsContent />
      </ProtectedRoute>
    </>
  );
};

export default Settings;
