import React from "react";

import BaseBody from "../templates/BaseBody";
import SettingForm from "../components/SettingForm";

const SettingsPage = () => {
  return (
    <BaseBody>
      <h1>Settings Page</h1>
      <SettingForm />
    </BaseBody>
  );
};

export default SettingsPage;
