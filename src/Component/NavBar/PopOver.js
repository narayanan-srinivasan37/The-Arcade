import React ,{useState}from "react";
import { Popover, Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { logOutUser } from "../../ReduxStore/Reducers/AuthReducer";
import './NavBar.css'
const PopOver = ({ navigate, user, dispatch }) => {
    
    const [anchorEl, setAnchorEl] = useState(false);
    const divRef = React.useRef();
    const handleClick = (event) => {
      setAnchorEl(divRef.current);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    const handleLogout = () => {
      dispatch(logOutUser());
      navigate("/");
    };
    return (
      <div>
        <Avatar ref={divRef} onClick={handleClick}>
          {user.firstName[0]}
        </Avatar>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
  
          }}
        >
          <div style={{display:'flex', flexDirection:'column'}}>
          <Button onClick={handleLogout}>Logout</Button>
          <Button onClick={()=>navigate("/myorders")}>My Orders</Button>
          </div>
        </Popover>
       
      </div>
    );
  };
export default PopOver