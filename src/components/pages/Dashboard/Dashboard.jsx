import React, { useMemo, useState, useContext, useEffect } from "react";
import { UserContext } from "../../../context/UserProvider";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Eye, X } from "lucide-react";
import { MessageContext } from "../../../context/MessageProvider";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const { toast } = useContext(MessageContext);
  const { allUsers } = useContext(UserContext);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const perPage = 8;

  // Filter + sort
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = Array.isArray(allUsers)
      ? allUsers.filter(
          (u) =>
            u.name?.toLowerCase().includes(q) ||
            u.email?.toLowerCase().includes(q) ||
            u.role?.toLowerCase().includes(q)
        )
      : [];
    list.sort((a, b) => {
      if (sortKey === "name") return a.name.localeCompare(b.name);
      if (sortKey === "role") return a.role.localeCompare(b.role);
      return 0;
    });
    return list;
  }, [allUsers, query, sortKey]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
    if (page < 1) setPage(1);
  }, [page, totalPages]);
  const pageSlice = filtered.slice((page - 1) * perPage, page * perPage);

  // Chart
  const chartData = useMemo(() => {
    const counts = {};
    filtered.forEach((u) => {
      const month = new Date(u.createdAt).toLocaleString("default", { month: "short" });
      counts[month] = (counts[month] || 0) + 1;
    });
    return Object.entries(counts).map(([month, count]) => ({ month, count }));
  }, [filtered]);

 const Logout = () =>{
      localStorage.removeItem('auth_token');
      toast.success('Logout Success');
      setTimeout(()=>{
        window.location.reload();
        navigate('/admin/login');
      }, 3500);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-6">
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
        <button
          onClick={Logout}
          className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 text-sm shadow-md w-full md:w-auto"
        >
          Sign out
        </button>
      </header>

      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800/50 rounded-xl p-4 flex flex-col justify-center shadow-md">
          <h3 className="text-gray-400 text-sm">Total Users</h3>
          <p className="text-2xl font-semibold">{filtered.length}</p>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-4 flex flex-col justify-center shadow-md">
          <h3 className="text-gray-400 text-sm">Admins</h3>
          <p className="text-2xl font-semibold">{filtered.filter(u => u.role === "admin").length}</p>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-4 flex flex-col justify-center shadow-md">
          <h3 className="text-gray-400 text-sm">Users</h3>
          <p className="text-2xl font-semibold">{filtered.filter(u => u.role === "user").length}</p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto rounded-xl bg-gray-800/40 p-4 shadow-lg mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, role..."
            className="w-full md:w-80 bg-gray-900/50 px-3 py-2 rounded-md text-sm outline-none"
          />
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            className="bg-gray-900/40 px-2 py-2 rounded-md text-sm w-full md:w-auto"
          >
            <option value="name">Sort by name</option>
            <option value="role">Sort by role</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700 text-sm">
            <thead className="text-left text-gray-400">
              <tr>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Role</th>
                <th className="px-3 py-2">Created</th>
                <th className="px-3 py-2">Password</th>
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {pageSlice.map((u, i) => (
                <tr key={i} className="hover:bg-gray-900/30">
                  <td className="px-3 py-3">{u.name}</td>
                  <td className="px-3 py-3">{u.email}</td>
                  <td className="px-3 py-3">{u.role}</td>
                  <td className="px-3 py-3">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="px-3 py-3 text-gray-400">••••••••</td>
                  <td className="px-3 py-3 flex gap-2">
                    <button onClick={() => setSelectedUser(u)} className="p-1.5 rounded bg-blue-600 hover:bg-blue-500">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="text-sm text-gray-400">Page {page} of {totalPages}</div>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 rounded-md bg-gray-700/40 w-full md:w-auto">Prev</button>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1 rounded-md bg-gray-700/40 w-full md:w-auto">Next</button>
          </div>
        </div>
      </main>

      <section className="max-w-7xl mx-auto bg-gray-800/40 rounded-xl p-4 shadow-lg">
        <h2 className="text-lg font-semibold mb-3">Users per Month</h2>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="month" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#4ade80" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {selectedUser && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md relative shadow-lg">
            <button onClick={() => setSelectedUser(null)} className="absolute top-3 right-3 text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4">User Details</h2>
            <div className="space-y-2 text-sm">
              <p><span className="text-gray-400">Name:</span> {selectedUser.name}</p>
              <p><span className="text-gray-400">Email:</span> {selectedUser.email}</p>
              <p><span className="text-gray-400">Role:</span> {selectedUser.role}</p>
              <p><span className="text-gray-400">Created:</span> {new Date(selectedUser.createdAt).toLocaleString()}</p>
              <p><span className="text-gray-400">Password:</span> ••••••••</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
