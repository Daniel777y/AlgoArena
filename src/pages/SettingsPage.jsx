import React from "react";

import BaseBody from "../templates/BaseBody";
import SettingUser from "../components/SettingUser";
import SettingAccount from "../components/SettingAccount";

const SettingsPage = () => {
  return (
    <BaseBody>
      <div className="row">
        <SettingAccount />
        <SettingUser />
      </div>
    </BaseBody>
  );
};

export default SettingsPage;
