import { Footer } from "@/components/footer";
import { Sidebar } from "./components/sidebar";
import { Header } from "./components/header";

const AuthenticatedLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="md:ml-64 grow">
        <Header />
        <div className="min-h-[calc(100vh-4rem-7rem)] h-full px-2 md:px-8 lg:px-20 py-5">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
