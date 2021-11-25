import { useState } from "react"
import { NavBar } from './components/NavBar/NavBar';
import { Footer } from './components/Footer/Footer';
import { MyProducts } from './pages/MyProducts/MyProducts';

function App() {
  const [user, setUser] = useState({});

  // const products = [];
  // const cart = [{ name: 'Zapas', stock: 10, price: 2000, imgUrl: '' }];

  return (
    <div id="header-wrapper" className="App">
      <NavBar user={user} setUser={setUser} />
      <MyProducts />
      <Footer />
    </div>
  );
}

export default App;
