import React from "react";
import SettingsContent from "./components/SettingsContent";
import ProtectedRoute from "@/components/ProtectedRoute";
import PageTitle from "@/components/PageTitle";

const Settings = () => {
  return (
    <ProtectedRoute>
      <PageTitle>Settings</PageTitle>
      <SettingsContent />
    </ProtectedRoute>
  );
};

export default Settings;
