import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GloabalStyles from "./styles/GloabalStyles";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Cabins from "./pages/Cabins";
import Booking from "./pages/Booking";
import Bookings from "./pages/Bookings";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import PageNotFound from "./pages/PageNotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppLayout from "./ui/AppLayout";
import { Toaster } from "react-hot-toast";
import Checkin from "./pages/Checkin";
import ProtectedRoutes from "./features/authentication/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";
function App() {
  const clientQuery = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });
  return (
    <DarkModeProvider>
      <QueryClientProvider client={clientQuery}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <GloabalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoutes>
                  <AppLayout />
                </ProtectedRoutes>
              }
            >
              <Route
                index
                element={<Navigate replace to={"/dashboard"} />}
              ></Route>
              <Route path="dashboard" element={<Dashboard />}></Route>
              <Route path="account" element={<Account />}></Route>
              <Route path="bookings" element={<Bookings />}></Route>
              <Route path="bookings/:bookingId" element={<Booking />}></Route>
              <Route path="checkin/:bookingId" element={<Checkin />}></Route>
              <Route path="cabins" element={<Cabins />}></Route>
              <Route path="settings" element={<Settings />}></Route>
              <Route path="users" element={<Users />}></Route>
              <Route path="*" element={<PageNotFound />}></Route>
            </Route>
            <Route path="login" element={<Login />}></Route>
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter="12"
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: { duration: 3000 },
            error: { duration: 5000 },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
