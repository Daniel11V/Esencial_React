import { NavBar } from './components/NavBar/NavBar';
// import { Footer } from './components/Footer/Footer';
import { MyProducts } from './pages/MyProducts/MyProducts';
import { MyMoney } from './pages/MyMoney/MyMoney';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Layout } from './components/Layout/Layout';
import { Welcome } from './pages/Welcome/Welcome';
import { Provider, useSelector } from 'react-redux';
import { store } from './store/store';

const PrivateOutlet = () => {
  const user = useSelector(state => state.user)

  return user.name ? <Outlet /> : <Navigate to="/login" />;
}

const LoginOutlet = () => {
  const user = useSelector(state => state.user)

  return user.name ? <Navigate to="/operations" /> : <h3>Inicia Sesion para comenzar...</h3>;
}

const WelcomeOutlet = () => {
  const user = useSelector(state => state.user)

  return user.name ? <Navigate to="/operations" /> : <Welcome />;
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>


        <NavBar />

        <Routes>
          <Route element={<Layout />}>

            <Route path="/" element={<WelcomeOutlet />} />
            <Route path="/login" element={<LoginOutlet />} />

            <Route element={<PrivateOutlet />}>
              <Route path="/products/:categoryId" element={<MyProducts />} />
              <Route path="/operations" element={<MyMoney />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />

          </Route>
        </Routes>

        {/* <Footer /> */}


      </BrowserRouter>
    </Provider>
  );

}

export default App;
