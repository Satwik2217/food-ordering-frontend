import React, { useState } from "react";

const FOOD_ITEMS = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Classic delight with 100% real mozzarella cheese.",
    price: 799, // ₹799
    image:
      "https://images.unsplash.com/photo-1601924582977-3bdc1d81f203?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Veggie Burger",
    description: "Loaded with fresh veggies and tasty sauce.",
    price: 499, // ₹499
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Caesar Salad",
    description: "Fresh romaine with parmesan and croutons.",
    price: 399, // ₹399
    image:
      "https://images.unsplash.com/photo-1552332386-f8dd00dc2fbb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    name: "Spaghetti Bolognese",
    description: "Hearty Italian pasta with a rich meat sauce.",
    price: 849, // ₹849
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 5,
    name: "Chocolate Cake",
    description: "Decadent and moist chocolate layered cake.",
    price: 299, // ₹299
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 6,
    name: "Sushi Platter",
    description: "Assorted fresh sushi rolls with wasabi and soy sauce.",
    price: 1299, // ₹1299
    image:
      "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=400&q=80",
  },
];

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Add item to cart, or increase quantity
  function addToCart(item) {
    setCartItems((prev) => {
      const exists = prev.find((ci) => ci.id === item.id);
      if (exists) {
        return prev.map((ci) =>
          ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  }

  function increaseQuantity(id) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }
  function decreaseQuantity(id) {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }
  function removeItem(id) {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }
  function handleCheckout() {
    alert(`Thank you for your order! Your total is ₹${totalPrice.toFixed(2)}.`);
    setCartItems([]);
    setIsCartOpen(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col w-full overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-20 bg-white shadow-md flex items-center justify-between px-4 sm:px-8 h-16 w-full">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-indigo-600 select-none">
            🍽️
          </span>
          <span className="text-xl sm:text-2xl font-semibold text-gray-800 select-none">
            Potato Bites
          </span>
        </div>
        <button
          onClick={() => setIsCartOpen(true)}
          aria-label="Open Shopping Cart"
          className="relative"
        >
          <svg
            className="w-7 h-7 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13l-2 6m5-6v6m4-6v6m1-10h.01"
            />
          </svg>
          {totalQuantity > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full text-xs px-1.5 py-0.5 font-semibold select-none">
              {totalQuantity}
            </span>
          )}
        </button>
      </header>

      {/* Main */}
      <main className="flex-1 pt-16 w-full">
        {/* Hero Section */}
        <section
          className="relative bg-cover bg-center flex items-center justify-center text-center w-full"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1470&q=80')",
            minHeight: "70vh",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-b-3xl"></div>
          <div className="relative max-w-2xl mx-auto text-white space-y-6 px-4 py-10">
            <h2 className="text-4xl sm:text-5xl font-bold drop-shadow-lg">
              Crave. Click. Delivered.
            </h2>
            <p className="text-lg sm:text-xl drop-shadow-md">
              Your favorite meals, delivered fast and fresh to your door.
            </p>
            <button
              onClick={() =>
                document
                  .getElementById("menu-section")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-full font-semibold text-white shadow-md transition"
            >
              Explore Menu
            </button>
          </div>
        </section>

        {/* Menu Section */}
        <section
          id="menu-section"
          className="w-full max-w-7xl mx-auto mt-12 px-4 sm:px-8 pb-12 flex flex-col"
        >
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center sm:text-left">
            Our Menu
          </h3>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {FOOD_ITEMS.map((food) => (
              <div
                key={food.id}
                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
              >
                <img
                  src={food.image}
                  alt={food.name}
                  className="h-44 w-full object-cover"
                  loading="lazy"
                />
                <div className="p-4 flex flex-col flex-1">
                  <h4 className="text-xl font-semibold text-gray-900 mb-1">
                    {food.name}
                  </h4>
                  <p className="text-gray-600 flex-1 mb-4 text-sm">
                    {food.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-indigo-600 text-lg">
                      ₹{food.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => addToCart(food)}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 transition rounded-md text-white font-semibold shadow-sm"
                      aria-label={`Add ${food.name} to cart`}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Cart Side Panel and Overlay - Only When Open */}
      {isCartOpen && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
            aria-hidden="true"
          />
          {/* Sidebar */}
          <aside
            className="fixed top-0 right-0 h-full max-w-md w-full bg-white shadow-xl z-50 flex flex-col transition-transform duration-300"
            aria-hidden={false}
          >
            {/* Cart Header */}
            <header className="flex items-center justify-between p-4 border-b border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900">
                Your Cart ({totalQuantity} items)
              </h4>
              <button
                onClick={() => setIsCartOpen(false)}
                aria-label="Close Cart"
                className="text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </header>
            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.length === 0 ? (
                <p className="text-gray-700 text-center mt-12 select-none">
                  Your cart is empty.
                </p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 border rounded-lg p-3 bg-gray-50"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                      loading="lazy"
                    />
                    <div className="flex flex-col flex-1 min-w-0">
                      <h5 className="font-semibold text-gray-900 truncate">
                        {item.name}
                      </h5>
                      <p className="text-indigo-600 font-bold mt-1">
                        ₹{(item.price * item.quantity).toFixed(2)}{" "}
                        <span className="text-gray-500 font-normal text-sm">
                          (₹{item.price.toFixed(2)} each)
                        </span>
                      </p>
                      <div className="mt-2 flex items-center space-x-2">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="px-2 py-1 bg-indigo-100 text-indigo-600 rounded-md hover:bg-indigo-200 transition focus:outline-none"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          −
                        </button>
                        <span
                          className="w-7 text-center"
                          aria-live="polite"
                          aria-atomic="true"
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="px-2 py-1 bg-indigo-100 text-indigo-600 rounded-md hover:bg-indigo-200 transition focus:outline-none"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto text-red-500 hover:text-red-700 focus:outline-none"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {/* Cart Footer */}
            {cartItems.length > 0 && (
              <footer className="p-4 border-t border-gray-200 bg-white">
                <p className="text-lg font-semibold text-gray-900 mb-4 flex justify-between">
                  <span>Total:</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </p>
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition focus:outline-none"
                >
                  Checkout
                </button>
              </footer>
            )}
          </aside>
        </>
      )}
    </div>
  );
}
