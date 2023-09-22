import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { PRODUCT, ORDER, MANAGE_PRODUCT, ORDER_ITEM } from "../router";
const SideBar = () => {
  return (
    <Sidebar style={{ height: "100vh" }}>
      <Menu
        menuItemStyles={{
          button: {
            "&.active": {
              backgroundColor: "#13395e",
              color: "#b6c8d9",
            },
          },
        }}
      >
        <MenuItem>
          <Link to={MANAGE_PRODUCT}>Products</Link>
        </MenuItem>
        <MenuItem>
          <Link to={ORDER}>Order</Link>
        </MenuItem>
        <MenuItem>
          <Link to={ORDER_ITEM}>Order Item</Link>
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SideBar;
