import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './admin/components/Navbar';
import Footer from './admin/components/Footer';
import Dashboard from './admin/pages/Dashboard';
import ShowProducts from './admin/pages/ShowProducts';
import AddProduct from './admin/pages/AddProduct';
import EditProduct from './admin/pages/EditProduct';

//Componente principal
/*
Aqui se configuran las rutas de los componentes
*/

const App: React.FC = () => {
  return (
      <BrowserRouter>
          <div className="App">
              <div className="main-content">
                  <Navbar />
                  <div className="container d-flex justify-content-center align-items-center ">
                      <Routes>
                          <Route path="/" element={<Dashboard />} />
                          <Route path="/admin/products" element={<ShowProducts />} />
                          <Route path="/admin/add-product" element={<AddProduct />} />
                          <Route path="/admin/edit-product/:id" element={<EditProduct />} />
                      </Routes>
                  </div>
                  <Footer />
              </div>
          </div>
      </BrowserRouter>
  );
};


export default App;