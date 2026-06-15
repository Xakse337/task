import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "@/store/slices/authSlice";
import type { RootState } from "@/store/store";
import { useGetUsersQuery } from "@/store/slices/apiSlice";
import { useState } from "react";
import { UserRow } from "@/components/userComponent";

function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentEmail = useSelector((state: RootState) => state.auth.email);

  const { data: users = [], isLoading, isError, refetch } = useGetUsersQuery();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [sortField, setSortField] = useState<
    "id" | "email" | "status" | "lastLoginAt"
  >("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (field: "id" | "email" | "status" | "lastLoginAt") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];

    if (sortField === "lastLoginAt") {
      valA = valA ? new Date(valA).getTime() : 0;
      valB = valB ? new Date(valB).getTime() : 0;
    }

    if (valA === null || valA === undefined) {
      return 1;
    }
    if (valB === null || valB === undefined) {
      return -1;
    }

    if (valA < valB) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (valA > valB) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/login");
  };

  const handleSelectUser = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(users.map((u) => u.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          Admin Dashboard
        </h1>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-xs text-slate-400 font-medium">Logged in as</p>
            <p className="text-sm font-semibold text-slate-700">
              {currentEmail || "admin@example.com"}
            </p>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleLogout}
            className="font-medium"
          >
            Logout
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-6xl w-full mx-auto space-y-6">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="default"
              size="sm"
              disabled={selectedIds.length === 0}
            >
              Block
            </Button>
            <Button
              variant="secondary"
              size="sm"
              disabled={selectedIds.length === 0}
            >
              Unblock
            </Button>
            <Button
              variant="destructive"
              size="sm"
              disabled={selectedIds.length === 0}
            >
              Delete
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
              className="ml-2 border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              {isLoading ? "Refreshing..." : "Refresh"}
            </Button>
          </div>

          <div className="text-xs text-slate-400 font-medium">
            Selected: {selectedIds.length} users
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {isLoading && users.length === 0 ? (
            <div className="p-12 text-center text-slate-500 font-medium">
              Loading users from database...
            </div>
          ) : isError ? (
            <div className="p-12 text-center text-red-500 font-medium">
              Error fetching users. Check your server or logs.
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-100 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <tr>
                  <th className="p-4 w-12 text-center">
                    <input
                      type="checkbox"
                      checked={
                        users.length > 0 && selectedIds.length === users.length
                      }
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-slate-950 focus:ring-slate-950 cursor-pointer"
                    />
                  </th>

                  <th
                    className="p-4 cursor-pointer select-none hover:bg-slate-200 transition-colors"
                    onClick={() => handleSort("id")}
                  >
                    ID {sortField === "id" && (sortOrder === "asc" ? "▲" : "▼")}
                  </th>

                  <th
                    className="p-4 cursor-pointer select-none hover:bg-slate-200 transition-colors"
                    onClick={() => handleSort("email")}
                  >
                    Email{" "}
                    {sortField === "email" && (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th
                    className="p-4 cursor-pointer select-none hover:bg-slate-200 transition-colors"
                    onClick={() => handleSort("status")}
                  >
                    Status{" "}
                    {sortField === "status" &&
                      (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th
                    className="p-4 cursor-pointer select-none hover:bg-slate-200 transition-colors"
                    onClick={() => handleSort("lastLoginAt")}
                  >
                    Last Login{" "}
                    {sortField === "lastLoginAt" &&
                      (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
                {sortedUsers.map((user) => (
                  <UserRow
                    key={user.id}
                    user={user}
                    isSelected={selectedIds.includes(user.id)}
                    onSelect={handleSelectUser}
                  />
                ))}

                {users.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400">
                      No users found in database.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
