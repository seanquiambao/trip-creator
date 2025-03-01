import Navigation from "@/components/navigation";
type LayoutProps = {
  children: React.ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navigation />
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
};

export default Layout;
