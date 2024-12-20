export default function Navbar() {
    return (
      <nav className="bg-purple-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold tracking-wide">Daily Planner</h1>
            </div>
            <div>
              <button className="bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow transition-all duration-300">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }