import React from "react";
import SettingsContent from "./components/SettingsContent";
import ProtectedRoute from "@/components/ProtectedRoute";

const Settings = () => {
  return (
    <ProtectedRoute>
      <h1 className="font-bold tracking-wider text-2xl mb-4">Settings</h1>
      <SettingsContent />
    </ProtectedRoute>
  );
};

export default Settings;
