import { NavBar } from './components/NavBar/NavBar';
// import { Footer } from './components/Footer/Footer';
import { MyProducts } from './pages/MyProducts/MyProducts';
import { MyOperations } from './pages/MyOperations/MyOperations';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './pages/pages.scss';
import { UserProvider } from "./context/UserContext";
import { ProductProvider } from './context/ProductContext';


function App() {

  return (
    <UserProvider>
      <ProductProvider>

        <BrowserRouter>


          <NavBar />

          <Routes>
            <Route path="/" element={<MyProducts />} />
            <Route path="/products/:categoryId" element={<MyProducts />} />
            <Route path="/operations" element={<MyOperations />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>

          {/* <Footer /> */}


        </BrowserRouter>

      </ProductProvider>
    </UserProvider>
  );

}

export default App;
