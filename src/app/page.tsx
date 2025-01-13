export default function HomePage() {
  return (
    <div className="container mx-auto mt-8 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to User Profile Management</h1>
      <p className="text-gray-700 mb-6">Manage your user profiles easily with our CRUD functionality.</p>
      <div className="flex justify-center space-x-4">
        <a href="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Get Started
        </a>
        <a href="/login" className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
          Learn More
        </a>
      </div>
    </div>
  );
}
