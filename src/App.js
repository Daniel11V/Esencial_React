import { NavBar } from './components/NavBar/NavBar';
// import { Footer } from './components/Footer/Footer';
import { MyProducts } from './pages/MyProducts/MyProducts';
import { MyOperations } from './pages/MyOperations/MyOperations';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { UserContext, UserProvider } from "./context/UserContext";
import { ProductProvider } from './context/ProductContext';
import { useContext } from 'react';
import { Layout } from './components/Layout/Layout';
import { Welcome } from './pages/Welcome/Welcome';

const PrivateOutlet = () => {
  let { user } = useContext(UserContext);

  return user.name ? <Outlet /> : <Navigate to="/login" />;
}

function App() {
  return (
    <UserProvider>
      <ProductProvider>

        <BrowserRouter>


          <NavBar />

          <Routes>
            <Route element={<Layout />}>

              <Route path="/" element={<Welcome />} />
              <Route path="/login" element={(<h3>Inicia Sesion para comenzar...</h3>)} />

              <Route element={<PrivateOutlet />}>
                <Route path="/products/:categoryId" element={<MyProducts />} />
                <Route path="/operations" element={<MyOperations />} />
              </Route>

              <Route path="*" element={<Navigate to="/" />} />

            </Route>
          </Routes>

          {/* <Footer /> */}


        </BrowserRouter>

      </ProductProvider>
    </UserProvider>
  );

}

export default App;
