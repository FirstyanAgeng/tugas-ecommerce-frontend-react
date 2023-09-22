import SideBar from "./SideBar";
import NavAdmin from "./NavAdmin";

const LayoutAdmin = ({ children }) => {
  return (
    <>
      <NavAdmin />
      <div className="row">
        <div className="col-3">
          <SideBar />
        </div>
        <div className="col-9">{children}</div>
      </div>
    </>
  );
};

export default LayoutAdmin;
