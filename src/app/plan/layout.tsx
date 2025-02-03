import { ReactElement } from "react";

type props = {
  children: ReactElement;
};
const Layout = ({ children }: props) => {
  return (
    <div>
      {/* TO DO: ADD NAVIGATION BAR*/}
      {children}
    </div>
  );
};

export default Layout;
