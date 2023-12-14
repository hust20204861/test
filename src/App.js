import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

import Home from './components/Home'
import ProductDetails from './components/product/ProductDetails'

// Cart Imports
import Cart from './components/cart/Cart'
import Shipping from './components/cart/Shipping'
import ConfirmOrder from './components/cart/ConfirmOrder'
import Payment from './components/cart/Payment'
import OrderSuccess from './components/cart/OrderSuccess'

// Order Imports
import ListOrders from './components/order/ListOrders'
import OrderDetails from './components/order/OrderDetails'

// Auth or User imports
import Login from './components/user/Login'
import Register from './components/user/Register'
import Profile from './components/user/Profile'
import UpdateProfile from './components/user/UpdateProfile'
import UpdatePassword from './components/user/UpdatePassword'
import ForgotPassword from './components/user/ForgotPassword'
import NewPassword from './components/user/NewPassword'

// Admin Imports
import Dashboard from './components/admin/Dashboard'
import ProductsList from './components/admin/ProductsList'
import NewProduct from './components/admin/NewProduct'
import UpdateProduct from './components/admin/UpdateProduct'
import OrdersList from './components/admin/OrdersList'
import ProcessOrder from './components/admin/ProcessOrder'
import UsersList from './components/admin/UsersList'
import UpdateUser from './components/admin/UpdateUser'
import ProductReviews from './components/admin/ProductReviews'


import ProtectedRoute from './components/route/ProtectedRoute'
import { loadUser } from './actions/userActions'
import { useSelector } from 'react-redux'
import store from './store'
import axios from 'axios'


// Payment
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

function App() {

  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {
    store.dispatch(loadUser())

    async function getStripApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');

      setStripeApiKey(data.stripeApiKey)
    }

    getStripApiKey();

  }, [])

  const { user, isAuthenticated, loading } = useSelector(state => state.auth)

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
          <Route path="/" element={<Home/>} exact />
          <Route path="/search/:keyword" element={<Home/>} />
          <Route path="/product/:id" element={<ProductDetails/>} exact />

          <Route path="/cart" element={<Cart/>} exact />
          <Route path="/shipping" element={<Shipping/>} />
          <Route path="/confirm" element={<ConfirmOrder/>} exact />
          <Route path="/success" element={<OrderSuccess/>} />
          {/* {stripeApiKey &&
            <Elements stripe={loadStripe(stripeApiKey)}>
              <Routes>
           <Route path="/payment" element={<Payment/>} />
           </Routes>
            </Elements>
          }  */}
 
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/password/forgot" element={<ForgotPassword/>} exact />
          <Route path="/password/reset/:token" element={<NewPassword/>} exact />
          <Route path="/me" element={<Profile/>} exact />
          <Route path="/me/update" element={<UpdateProfile/>} exact />
          <Route path="/password/update" element={<UpdatePassword/>} exact />

          <Route path="/orders/me" element={<ListOrders/>} exact />
          <Route path="/order/:id" element={<OrderDetails/>} exact />
          </Routes>
        </div>
        <Routes>
        <Route path="/dashboard" isAdmin={true} element={<Dashboard/>} exact />
        <Route path="/admin/products" isAdmin={true} element={<ProductsList/>} exact />
        <Route path="/admin/product" isAdmin={true} element={<NewProduct/>} exact />
        <Route path="/admin/product/:id" isAdmin={true} element={<UpdateProduct/>} exact />
        <Route path="/admin/orders" isAdmin={true} element={<OrdersList/>} exact />
        <Route path="/admin/order/:id" isAdmin={true} element={<ProcessOrder/>} exact />
        <Route path="/admin/users" isAdmin={true} element={<UsersList/>} exact />
        <Route path="/admin/user/:id" isAdmin={true} element={<UpdateUser/>} exact />
        <Route path="/admin/reviews" isAdmin={true} element={<ProductReviews/>} exact />
        </Routes>

        {!loading && (!isAuthenticated || user.role !== 'admin') && (
          <Footer />
        )}
      </div>
    </Router>
  );
}

export default App;
