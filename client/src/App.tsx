import { Routes, Route, BrowserRouter } from "react-router-dom";

import { AddTechnician, AllServices, Home, AllClients } from "./pages";
import { SharedLayout } from "./components";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route path="services" element={<AllServices />} />
          <Route path="technicians" element={<AddTechnician />} />
          <Route path="clients" element={<AllClients />} />
        </Route>
        <Route path="/login" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
