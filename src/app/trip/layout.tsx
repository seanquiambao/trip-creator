import Navigation from "@/components/navigation";
type LayoutProps = {
  children: React.ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col h-full">
      <Navigation />
      {children}
    </div>
  );
};

export default Layout;
