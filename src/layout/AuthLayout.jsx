import { Outlet } from "react-router-dom";
export const AuthLayout = () => {
  return (
    <>
      <main className="container mx-auto md:grid md:grid-cols-2 gap-14 p-8 items-center h-screen">
        <Outlet />
      </main>
    </>
  );
};
