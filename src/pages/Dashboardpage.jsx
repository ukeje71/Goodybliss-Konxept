import React, { useState } from "react";
import { Link } from "react-router";
import {
  DollarSign,
  ImagePlus,
  Brush,
  Eye,
  PlusCircle,
  MessageCircle,
  Heart,
  CreditCard,
  BarChart2,
  Clock,
  TrendingUp,
} from "lucide-react";
import Sidebar from "../components/Layouts/Dashboard/Sidebar";

const Dashboardpage = () => {
  // Sample data
  const [recentSales] = useState([
    {
      id: 1,
      artworkName: "Ephemeral Dreams",
      artworkImage: "https://via.placeholder.com/40",
      clientName: "Sarah Johnson",
      clientEmail: "sarah@example.com",
      date: "2023-06-15",
      amount: 1200,
      status: "Completed",
    },
    {
      id: 2,
      artworkName: "Ocean Serenity",
      artworkImage: "https://via.placeholder.com/40",
      clientName: "Michael Chen",
      clientEmail: "michael@example.com",
      date: "2023-06-10",
      amount: 850,
      status: "Shipped",
    },
    {
      id: 3,
      artworkName: "Urban Reflections",
      artworkImage: "https://via.placeholder.com/40",
      clientName: "Emma Rodriguez",
      clientEmail: "emma@example.com",
      date: "2023-06-05",
      amount: 1500,
      status: "Pending",
    },
  ]);

  const [recentActivities] = useState([
    {
      id: 1,
      type: "sale",
      message: "Your artwork 'Ephemeral Dreams' was purchased by Sarah Johnson",
      timeAgo: "2 days ago",
    },
    {
      id: 2,
      type: "comment",
      message: "New comment received on 'Ocean Serenity'",
      timeAgo: "3 days ago",
    },
    {
      id: 3,
      type: "like",
      message: "Your artwork received 12 new likes",
      timeAgo: "5 days ago",
    },
  ]);

  const [upcomingTasks] = useState([
    {
      id: 1,
      title: "Ship order #12345 to Michael Chen",
      dueDate: "tomorrow",
      completed: false,
    },
    {
      id: 2,
      title: "Prepare commission draft for client review",
      dueDate: "in 3 days",
      completed: false,
    },
    {
      id: 3,
      title: "Update artwork descriptions",
      dueDate: "next week",
      completed: true,
    },
  ]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content Section with Footer */}
      <div className="flex flex-row min-h-screen">
        <Sidebar />
        <main className="flex-1 overflow-y-auto md:ml- p-6 sm:p-8 pb-24 md:pb-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, Artist
            </h1>
            <p className="text-gray-600">
              Here's what's happening with your art business today
            </p>
          </div>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Sales */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-500 font-medium">Total Sales</h3>
                <DollarSign className="text-green-500 h-5 w-5" />
              </div>
              <p className="text-2xl font-bold mt-2">₦12,450</p>
              <p className="text-sm text-green-500 mt-1 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" /> 12% from last month
              </p>
            </div>

            {/* Artworks */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-500 font-medium">Artworks</h3>
                <ImagePlus className="text-blue-500 h-5 w-5" />
              </div>
              <p className="text-2xl font-bold mt-2">24</p>
              <p className="text-sm text-gray-500 mt-1">5 new this month</p>
            </div>

            {/* Commissions */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-500 font-medium">Commissions</h3>
                <Brush className="text-purple-500 h-5 w-5" />
              </div>
              <p className="text-2xl font-bold mt-2">8</p>
              <p className="text-sm text-gray-500 mt-1">3 in progress</p>
            </div>

            {/* Monthly Visitors */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-500 font-medium">Gallery Views</h3>
                <Eye className="text-amber-500 h-5 w-5" />
              </div>
              <p className="text-2xl font-bold mt-2">1,240</p>
              <p className="text-sm text-amber-500 mt-1 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" /> 24% from last month
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Link
              to="/admin/newproduct"
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <PlusCircle className="h-8 w-8 text-blue-500 mb-2" />
              <span className="font-medium">Add New Artwork</span>
            </Link>

            <Link
              to="/commissions"
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <Brush className="h-8 w-8 text-purple-500 mb-2" />
              <span className="font-medium">Manage Commissions</span>
            </Link>

            <Link
              to="/sales"
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <CreditCard className="h-8 w-8 text-green-500 mb-2" />
              <span className="font-medium">View Sales</span>
            </Link>

            <Link
              to="/analytics"
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <BarChart2 className="h-8 w-8 text-amber-500 mb-2" />
              <span className="font-medium">View Analytics</span>
            </Link>
          </div>

          {/* Two-column section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Recent Sales Table */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Recent Sales</h2>
                <Link
                  to="/sales"
                  className="text-sm text-blue-500 hover:underline"
                >
                  View all
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 whitespace-nowrap">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Artwork
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Client
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentSales.map((sale) => (
                      <tr key={sale.id}>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={sale.artworkImage}
                                alt={sale.artworkName}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {sale.artworkName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {sale.clientName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {sale.clientEmail}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(sale.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          ₦{sale.amount}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ₦{
                              sale.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : sale.status === "Shipped"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {sale.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Activity Feed */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start">
                    <div
                      className={`flex-shrink-0 rounded-full p-2 ₦{
                        activity.type === "sale"
                          ? "bg-green-100 text-green-600"
                          : activity.type === "comment"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-purple-100 text-purple-600"
                      }`}
                    >
                      {activity.type === "sale" ? (
                        <DollarSign className="h-5 w-5" />
                      ) : activity.type === "comment" ? (
                        <MessageCircle className="h-5 w-5" />
                      ) : (
                        <Heart className="h-5 w-5" />
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.message}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <Clock className="h-4 w-4 mr-1" /> {activity.timeAgo}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-16 md:mb-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Upcoming Tasks</h2>
              <Link
                to="/tasks"
                className="text-sm text-blue-500 hover:underline"
              >
                View all
              </Link>
            </div>

            <ul className="divide-y divide-gray-200">
              {upcomingTasks.map((task) => (
                <li key={task.id} className="py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => {}}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span
                        className={`ml-3 ₦{
                          task.completed
                            ? "line-through text-gray-400"
                            : "text-gray-700"
                        }`}
                      >
                        {task.title}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      Due {task.dueDate}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* Close main content section */}
        </main>
      </div>
    </div>
  );
};
export default Dashboardpage;
