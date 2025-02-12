import Navigation from "@/components/navigation";
import ProtectedPage from "@/components/protected-page";
type LayoutProps = {
  children: React.ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  return (
    <ProtectedPage>
      <div className="flex flex-col h-full">
        <Navigation />
        {children}
      </div>
    </ProtectedPage>
  );
};

export default Layout;
