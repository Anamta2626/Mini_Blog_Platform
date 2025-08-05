import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BlogDetail from './pages/BlogDetail';
import CreateBlog from './pages/CreateBlog';
import EditBlog from './pages/EditBlog';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route
          path="/create"
          element={<ProtectedRoute><CreateBlog /></ProtectedRoute>}
        />
        <Route
          path="/edit/:id"
          element={<ProtectedRoute><EditBlog /></ProtectedRoute>}
        />
      </Routes>
    </>
  );
};

export default App;
