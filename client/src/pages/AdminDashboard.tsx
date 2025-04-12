import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "../lib/queryClient";

// Simple admin dashboard to view franchise requests
const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Admin authentication - simple password check
  // In a real app, you would use proper authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") { // Simple password for demo purposes
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid password");
    }
  };

  // Query franchise requests
  const { data: franchiseRequests = [], isLoading } = useQuery<any[]>({
    queryKey: ['/api/admin/franchise-requests'],
    queryFn: getQueryFn({ on401: "returnNull" }),
    enabled: isAuthenticated
  });

  // Query contact messages
  const { data: contactMessages = [], isLoading: loadingMessages } = useQuery<any[]>({
    queryKey: ['/api/admin/contact-messages'],
    queryFn: getQueryFn({ on401: "returnNull" }),
    enabled: isAuthenticated
  });

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6 text-brown-600">Admin Dashboard</h1>
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>
            
            {error && (
              <div className="mb-4 text-red-500 text-sm">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-500 transition-colors"
            >
              Login
            </button>
          </form>
          
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>Use password: admin123</p>
            <p className="mt-1">(For demo purposes only)</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Franchise Requests Section */}
        <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Franchise Requests</h2>
          
          {isLoading ? (
            <div className="text-center py-4">Loading franchise requests...</div>
          ) : franchiseRequests && franchiseRequests.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {franchiseRequests.map((request: any) => (
                    <tr key={request.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(request.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">No franchise requests yet.</div>
          )}
        </div>
        
        {/* Contact Messages Section */}
        <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Messages</h2>
          
          {loadingMessages ? (
            <div className="text-center py-4">Loading contact messages...</div>
          ) : contactMessages && contactMessages.length > 0 ? (
            <div className="space-y-4">
              {contactMessages.map((message: any) => (
                <div key={message.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{message.name}</h3>
                      <p className="text-sm text-gray-500">{message.email}</p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-700">{message.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">No contact messages yet.</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;