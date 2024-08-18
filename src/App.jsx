import { Routes, Route } from 'react-router-dom';
import CustomerList from './components/CustomerList';
import NotFound from './components/NotFound';
import NavigationBar from "./components/NavigationBar";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import "./AppStyles.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import CustomerFormWrapper from './components/CustomerFormWrapper';
import HomePage from './components/HomePage';
import OrderForm from './components/OrderForm';

function App() {
  return (
    <div className="app-container">
      <NavigationBar />
      <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/add-customer/' element={<CustomerFormWrapper />} />
          <Route path='/edit-customer/:id' element={<CustomerFormWrapper />} />
          <Route path='/customers' element={<CustomerList />} />
          <Route path='/add-product' element={<ProductForm />} />
          <Route path='/edit-product/:id' element={<ProductForm />} />
          <Route path='/products' element={<ProductList />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/add-order' element={<OrderForm />} />
      </Routes>
    </div>
  )
}
export default App
