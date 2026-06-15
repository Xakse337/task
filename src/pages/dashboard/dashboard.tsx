import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "@/store/slices/authSlice";
import type { RootState } from "@/store/store";
import {
  useBlockUsersMutation,
  useDeleteUsersMutation,
  useGetUsersQuery,
  useUnblockUsersMutation,
} from "@/store/slices/apiSlice";
import { useState } from "react";
import { UserRow } from "@/components/userComponent";
import { useUserSort } from "@/hooks/useUserSort";
import { TableHeader } from "./tableHeader";

function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentEmail = useSelector((state: RootState) => state.auth.email);
  const currentUserId = useSelector((state: RootState) => state.auth.id);

  const [blockUsers, { isLoading: isBlocking }] = useBlockUsersMutation();
  const [unblockUsers, { isLoading: isUnblocking }] = useUnblockUsersMutation();
  const [deleteUsers, { isLoading: isDeleting }] = useDeleteUsersMutation();

  const checkSelfAction = (ids: number[]) => {
    if (currentUserId && ids.includes(currentUserId)) {
      handleLogout();
    }
  };

  const handleBlock = async () => {
    if (selectedIds.length === 0) return;
    try {
      await blockUsers({ ids: selectedIds }).unwrap();
      checkSelfAction(selectedIds);
      setSelectedIds([]);
    } catch (err) {
      console.error("Failed to block users:", err);
    }
  };

  const handleUnblock = async () => {
    if (selectedIds.length === 0) return;
    try {
      await unblockUsers({ ids: selectedIds }).unwrap();
      setSelectedIds([]);
    } catch (err) {
      console.error("Failed to unblock users:", err);
    }
  };

  const handleValuesDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm("Are you sure you want to delete selected users?")) return;

    try {
      await deleteUsers({ ids: selectedIds }).unwrap();
      checkSelfAction(selectedIds);
      setSelectedIds([]);
    } catch (err) {
      console.error("Failed to delete users:", err);
    }
  };

  const { data: users = [], isLoading, isError, refetch } = useGetUsersQuery();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const { sortedUsers, sortField, sortOrder, handleSort } = useUserSort(users);

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
              onClick={handleBlock}
              disabled={selectedIds.length === 0 || isBlocking}
            >
              {isBlocking ? "Blocking..." : "Block"}
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={handleUnblock}
              disabled={selectedIds.length === 0 || isUnblocking}
            >
              {isUnblocking ? "Unblocking..." : "Unblock"}
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={handleValuesDelete}
              disabled={selectedIds.length === 0 || isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
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
              <TableHeader
                sortField={sortField}
                sortOrder={sortOrder}
                onSort={handleSort}
                isAllSelected={
                  users.length > 0 && selectedIds.length === users.length
                }
                onSelectAll={handleSelectAll}
              />

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
