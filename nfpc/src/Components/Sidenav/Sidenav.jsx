import { AppBar } from "@mui/material";
import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HelpIcon from "@mui/icons-material/Help";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import "./Sidenav.modules.css";
import { Link } from "react-router-dom";
import { MdOutlineHistoryEdu } from "react-icons/md";

export default function Sidenav(props) {
  return (
    <div className="sidenav">
      <div>
        <DashboardIcon className="nav-icont-c" />
        <Link to="/homeDashboard/Dashboard">
          <h3>Dashboard</h3>
        </Link>
      </div>

      <div>
        <SettingsApplicationsIcon />
        <Link to="/homeDashboard/Configuration">
          <h3>Configuration</h3>
        </Link>
      </div>

      <div>
      <MdOutlineHistoryEdu />
      <Link to="/homeDashboard/changedata">
        
        <h3>Change Data</h3></Link>
        
      </div>

      <div>
        <HelpIcon />
        <Link to="/homeDashboard/help">
          <h3>Help</h3>
        </Link>
      </div>
    </div>
  );
}
