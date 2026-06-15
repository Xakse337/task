import type { User } from "@/types/user";

interface UserRowProps {
  user: User;
  isSelected: boolean;
  onSelect: (id: number, checked: boolean) => void;
}

export function UserRow({ user, isSelected, onSelect }: UserRowProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) {
      return "Never";
    }

    return new Date(dateString).toLocaleString("ru-RU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <tr className="hover:bg-slate-50 transition-colors border-b border-slate-200">
      <td className="p-4 text-center w-12">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(user.id, e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-slate-950 focus:ring-slate-950 cursor-pointer"
        />
      </td>

      <td className="p-4 font-mono text-xs text-slate-500 w-20">#{user.id}</td>

      <td className="p-4 font-medium text-slate-900">{user.email}</td>

      <td className="p-4 w-32">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide ${
            user.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {user.status === "active" ? "Active" : "Blocked"}
        </span>
      </td>

      <td className="p-4 text-slate-500 text-xs w-44">
        {formatDate(user.lastLoginAt)}
      </td>
    </tr>
  );
}
