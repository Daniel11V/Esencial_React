import { NavBar } from './components/NavBar/NavBar';
// import { Footer } from './components/Footer/Footer';
import { MyProducts } from './pages/MyProducts/MyProducts';
import { MyMoney } from './pages/MyMoney/MyMoney';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Layout } from './components/Layout/Layout';
import { Provider, useSelector } from 'react-redux';
import { store } from './store/store';
import { BankCreator } from './components/BankCreator/BankCreator';
import { OperationCreator } from './components/OperationCreator/OperationCreator';
import { ReasonCreator } from './components/ReasonCreator/ReasonCreator';

const PrivateOutlet = () => {
  const user = useSelector(state => state.user)

  return user.name ? <Outlet /> : <Navigate to="/login" />;
}

const LoginOutlet = () => {
  const user = useSelector(state => state.user)

  return user.name ? <Navigate to="/" /> : <h3>Hola! Inicia sesion para comenzar...</h3>;
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>


        <NavBar />

        <Routes>
          <Route element={<Layout />}>

            <Route path="/login" element={<LoginOutlet />} />

            <Route element={<PrivateOutlet />}>
              <Route path="/" element={<MyMoney />} />
              <Route path="/products/:categoryId" element={<MyProducts />} />
              <Route path="/banks/new" element={<BankCreator />} />
              <Route path="/reasons/new" element={<ReasonCreator />} />
              <Route path="/operations/new" element={<OperationCreator />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />

          </Route>
        </Routes>


      </BrowserRouter>
    </Provider>
  );

}

export default App;
