import { FaUserCircle } from "react-icons/fa";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gray-50">
      <header className="container mx-auto mt-8 px-4 text-center">
        <div className="flex items-center justify-center mb-4">
          <FaUserCircle className="text-blue-600 text-5xl" /> {/* User icon */}
        </div>
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Welcome to User Profile Management</h1>
        <p className="text-gray-600 text-lg">Easily manage your user profiles with our CRUD functionality.</p>
      </header>

      <main className="container mx-auto px-4 flex-1 flex flex-col justify-center items-center">
        <div className="text-center mt-8">
          <p className="text-gray-700 text-xl font-semibold">Seamlessly create, edit, and delete user profiles.</p>
          <p className="text-gray-500 mt-2">A simple yet powerful solution for your user data management needs.</p>
        </div>
      </main>
    </div>
  );
}
