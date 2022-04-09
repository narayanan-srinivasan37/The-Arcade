import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useNavigate, useLocation } from "react-router-dom";
import { NavOptions } from "../../Constants/NavBar_Link";
import "./BottomNavigation.css";
const Bottomnavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(location.pathname);

  const showBottomNavigation = () => {
    if (
      location.pathname.includes("checkout") ||
      location.pathname.includes("cart")
    ) {
      return <div></div>;
    } else {
      return (
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            navigate(newValue);
          }}
        >
          {NavOptions.map((value, index) => {
            return (
              <BottomNavigationAction
                key={index}
                to={value.path}
                value={value.path}
                label={value.name}
                icon={value.icon}
              />
            );
          })}
        </BottomNavigation>
      );
    }
  };
  return <div className="bottom-nav">{showBottomNavigation()}</div>;
};

export default Bottomnavigation;
