import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="p-6 bg-green-700 text-white shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold">Paradise Nursery</h1>
      <div className="space-x-6 text-lg font-semibold">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/checkout" className="hover:underline">Checkout</Link>
        <Link to="/payment" className="hover:underline">Payment</Link>
      </div>
    </nav>
  );
}

function PlantPage({ cart, setCart, plants }) {
  const navigate = useNavigate();

  const addToCart = (plantId) => {
    setCart({ ...cart, [plantId]: (cart[plantId] || 0) + 1 });
  };

  const removeFromCart = (plantId) => {
    if (cart[plantId] > 0) {
      setCart({ ...cart, [plantId]: cart[plantId] - 1 });
    }
  };

  const goToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Plant Shop</h1>
      <div className="flex space-x-6 overflow-x-auto pb-4">
        {plants.map((plant) => (
          <div key={plant.id} className="min-w-[250px] bg-white rounded-xl shadow-md p-4 flex-shrink-0">
            <img
              src={plant.image}
              alt={plant.name}
              className="w-full h-48 object-cover rounded-md mb-3"
            />
            <h2 className="text-xl font-semibold">{plant.name}</h2>
            <p className="text-green-700 font-bold mb-2">${plant.price}</p>
            <p className="text-sm text-gray-600 mb-3">{plant.description}</p>
            <div className="flex items-center gap-2 mb-3">
              <button onClick={() => removeFromCart(plant.id)} className="px-2 py-1 bg-red-200 rounded">-</button>
              <span>{cart[plant.id] || 0}</span>
              <button onClick={() => addToCart(plant.id)} className="px-2 py-1 bg-green-200 rounded">+</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <button
          onClick={goToCheckout}
          className="bg-green-600 text-white px-6 py-2 rounded shadow"
        >
          Done - Go to Checkout
        </button>
      </div>
    </div>
  );
}

function CheckoutPage({ cart, plants }) {
  const navigate = useNavigate();

  const total = Object.entries(cart).reduce((sum, [plantId, qty]) => {
    const plant = plants.find(p => p.id === parseInt(plantId));
    return sum + (plant ? plant.price * qty : 0);
  }, 0);

  const goToPayment = () => {
    navigate('/payment');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Checkout Summary</h2>
      <ul className="mb-4">
        {Object.entries(cart).map(([plantId, qty]) => {
          const plant = plants.find(p => p.id === parseInt(plantId));
          return plant && qty > 0 ? (
            <li key={plantId} className="mb-2">
              {plant.name} × {qty} = ${plant.price * qty}
            </li>
          ) : null;
        })}
      </ul>
      <p className="text-lg font-bold mb-4">Total: ${total}</p>
      <button
        onClick={goToPayment}
        className="bg-green-600 text-white px-5 py-2 rounded shadow"
      >
        Proceed to Payment
      </button>
    </div>
  );
}

function PaymentPage() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen text-lg">
      Thank you for your purchase! 🪴
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState({});

  const plants = [
    {
      id: 1,
      name: 'red ross',
      price: 12.99,
      image: 'public/Screenshot 2025-04-02 202010.png',
      description: 'A healing plant that thrives in sunlight.'
    },
    {
      id: 2,
      name: 'Peace Lily',
      price: 18.5,
      image: 'public/Screenshot 2025-04-02 202123.png',
      description: 'Beautiful white flowers and easy care.'
    },
    {
      id: 3,
      name: 'Snake Plant',
      price: 22,
      image: 'public/image.png',
      description: 'Low maintenance and great air purifier.'
    }
  ];

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<PlantPage cart={cart} setCart={setCart} plants={plants} />} />
        <Route path="/checkout" element={<CheckoutPage cart={cart} plants={plants} />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </>
  );
}