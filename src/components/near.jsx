import React, { useState } from 'react';
import { Search, MapPin, Calendar, ShoppingBag, LogIn, Menu, X } from 'lucide-react';

const Nearbuy = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Sample data for demonstration
  const businesses = [
    { 
      id: 1, 
      name: "Green Grocer", 
      category: "Grocery", 
      rating: 4.5, 
      distance: "0.3 miles",
      address: "123 Oak Street",
      products: ["Organic Vegetables", "Fresh Fruits", "Local Honey"],
      hasAppointments: false,
      image: ""
    },
    { 
      id: 2, 
      name: "Sage Salon", 
      category: "Beauty", 
      rating: 4.8, 
      distance: "0.5 miles",
      address: "456 Maple Avenue",
      products: ["Haircut", "Color", "Styling"],
      hasAppointments: true,
      image: "/api/placeholder/120/80"
    },
    { 
      id: 3, 
      name: "Local Hardware", 
      category: "Home Improvement", 
      rating: 4.2, 
      distance: "0.7 miles",
      address: "789 Pine Boulevard",
      products: ["Tools", "Paint", "Garden Supplies"],
      hasAppointments: false,
      image: "/api/placeholder/120/80"
    }
  ];

  const filteredBusinesses = businesses.filter(business => 
    business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    business.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    business.products.some(product => product.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <MapPin className="mr-2" />
              <h1 className="text-2xl font-bold">nearbuy</h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <nav className="flex items-center space-x-6">
                <button 
                  className={`px-3 py-2 rounded-md ${activeTab === 'explore' ? 'bg-green-600' : ''}`}
                  onClick={() => setActiveTab('explore')}
                >
                  Explore
                </button>
                <button 
                  className={`px-3 py-2 rounded-md ${activeTab === 'appointments' ? 'bg-green-600' : ''}`}
                  onClick={() => setActiveTab('appointments')}
                >
                  Appointments
                </button>
                <button 
                  className={`px-3 py-2 rounded-md ${activeTab === 'orders' ? 'bg-green-600' : ''}`}
                  onClick={() => setActiveTab('orders')}
                >
                  Orders
                </button>
              </nav>
              
              {isLoggedIn ? (
                <button 
                  onClick={handleLogout}
                  className="bg-sage-500 bg-green-800 px-4 py-2 rounded-md"
                >
                  Logout
                </button>
              ) : (
                <button 
                  onClick={handleLogin}
                  className="bg-sage-500 bg-green-800 px-4 py-2 rounded-md flex items-center"
                >
                  <LogIn className="mr-2" size={18} />
                  Login
                </button>
              )}
            </div>
            
            <button className="md:hidden" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="mt-4 md:hidden">
              <nav className="flex flex-col space-y-2">
                <button 
                  className={`px-3 py-2 rounded-md ${activeTab === 'explore' ? 'bg-green-600' : ''}`}
                  onClick={() => {
                    setActiveTab('explore');
                    setMobileMenuOpen(false);
                  }}
                >
                  Explore
                </button>
                <button 
                  className={`px-3 py-2 rounded-md ${activeTab === 'appointments' ? 'bg-green-600' : ''}`}
                  onClick={() => {
                    setActiveTab('appointments');
                    setMobileMenuOpen(false);
                  }}
                >
                  Appointments
                </button>
                <button 
                  className={`px-3 py-2 rounded-md ${activeTab === 'orders' ? 'bg-green-600' : ''}`}
                  onClick={() => {
                    setActiveTab('orders');
                    setMobileMenuOpen(false);
                  }}
                >
                  Orders
                </button>
                
                {isLoggedIn ? (
                  <button 
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="bg-sage-500 bg-green-800 px-4 py-2 rounded-md"
                  >
                    Logout
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      handleLogin();
                      setMobileMenuOpen(false);
                    }}
                    className="bg-sage-500 bg-green-800 px-4 py-2 rounded-md flex items-center"
                  >
                    <LogIn className="mr-2" size={18} />
                    Login
                  </button>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-6">
        {!isLoggedIn && activeTab === 'explore' && (
          <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-8 rounded-lg mb-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Discover local businesses in your neighborhood</h2>
            <p className="mb-6 text-lg">Find products, book services, and support your local economy</p>
            <button 
              onClick={handleLogin}
              className="bg-white text-green-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
            >
              Login to get started
            </button>
          </div>
        )}

        {/* Search bar */}
        <div className="relative mb-8">
          <div className="flex items-center bg-white rounded-lg shadow-md">
            <span className="p-3 text-gray-400">
              <Search size={24} />
            </span>
            <input
              type="text"
              placeholder="Search for businesses, products, or services..."
              className="w-full py-3 px-2 rounded-lg focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'explore' && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Nearby Businesses</h2>
            
            {/* Map placeholder */}
            <div className="bg-gray-200 h-64 rounded-lg mb-6 flex items-center justify-center">
              <p className="text-gray-600">Interactive Neighborhood Map</p>
            </div>
            
            {/* Business listings */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBusinesses.map(business => (
                <div key={business.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                  <div className="h-40 bg-gray-200 relative">
                    <img src={business.image} alt={business.name} className="w-full h-full object-cover" />
                    <span className="absolute top-2 right-2 bg-green-700 text-white px-2 py-1 rounded-md text-sm">
                      {business.rating} ★
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800">{business.name}</h3>
                    <p className="text-gray-600 mb-2">{business.category} • {business.distance}</p>
                    <p className="text-gray-500 text-sm mb-3">{business.address}</p>
                    
                    <div className="flex justify-between mt-4">
                      {business.hasAppointments ? (
                        <button className="flex items-center text-green-700 bg-green-100 px-3 py-2 rounded-md">
                          <Calendar size={18} className="mr-1" />
                          Book
                        </button>
                      ) : (
                        <button className="flex items-center text-gray-400 px-3 py-2 rounded-md" disabled>
                          <Calendar size={18} className="mr-1" />
                          No Booking
                        </button>
                      )}
                      <button className="flex items-center text-green-700 bg-green-100 px-3 py-2 rounded-md">
                        <ShoppingBag size={18} className="mr-1" />
                        Products
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Appointments</h2>
            {isLoggedIn ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-600">You have no upcoming appointments.</p>
                <button className="mt-4 bg-green-700 text-white px-4 py-2 rounded-md">
                  Find Services
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p className="text-gray-600 mb-4">Please log in to view and manage your appointments</p>
                <button 
                  onClick={handleLogin}
                  className="bg-green-700 text-white px-4 py-2 rounded-md"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Orders</h2>
            {isLoggedIn ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-600">You have no recent orders.</p>
                <button className="mt-4 bg-green-700 text-white px-4 py-2 rounded-md">
                  Shop Now
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p className="text-gray-600 mb-4">Please log in to view your order history</p>
                <button 
                  onClick={handleLogin}
                  className="bg-green-700 text-white px-4 py-2 rounded-md"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <MapPin className="mr-2" />
                <h2 className="text-xl font-bold">nearbuy</h2>
              </div>
              <p className="text-green-200 mt-2">Connecting local businesses with nearby customers</p>
            </div>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
              <div>
                <h3 className="font-semibold mb-2">For Customers</h3>
                <ul className="space-y-1 text-green-200">
                  <li>Find Businesses</li>
                  <li>Book Services</li>
                  <li>Shop Local</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">For Businesses</h3>
                <ul className="space-y-1 text-green-200">
                  <li>List Your Business</li>
                  <li>Manage Bookings</li>
                  <li>Sell Products</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Company</h3>
                <ul className="space-y-1 text-green-200">
                  <li>About Us</li>
                  <li>Contact</li>
                  <li>Privacy Policy</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-green-700 text-center text-green-200">
            <p>© 2025 Nearbuy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Nearbuy;