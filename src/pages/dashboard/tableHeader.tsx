type SortField = "id" | "email" | "status" | "lastLoginAt";

interface TableHeaderProps {
  sortField: SortField;
  sortOrder: "asc" | "desc";
  onSort: (field: SortField) => void;
  isAllSelected: boolean;
  onSelectAll: (checked: boolean) => void;
}

export function TableHeader({
  sortField,
  sortOrder,
  onSort,
  isAllSelected,
  onSelectAll,
}: TableHeaderProps) {
  const renderSortArrow = (field: SortField) => {
    if (sortField !== field) {
      return null;
    }
    return sortOrder === "asc" ? " ▲" : " ▼";
  };

  return (
    <thead className="bg-slate-100 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
      <tr>
        <th className="p-4 w-12 text-center">
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={(e) => onSelectAll(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-slate-950 focus:ring-slate-950 cursor-pointer"
          />
        </th>
        <th
          className="p-4 cursor-pointer select-none hover:bg-slate-200 transition-colors"
          onClick={() => onSort("id")}
        >
          ID {renderSortArrow("id")}
        </th>
        <th
          className="p-4 cursor-pointer select-none hover:bg-slate-200 transition-colors"
          onClick={() => onSort("email")}
        >
          Email {renderSortArrow("email")}
        </th>
        <th
          className="p-4 cursor-pointer select-none hover:bg-slate-200 transition-colors"
          onClick={() => onSort("status")}
        >
          Status {renderSortArrow("status")}
        </th>
        <th
          className="p-4 cursor-pointer select-none hover:bg-slate-200 transition-colors"
          onClick={() => onSort("lastLoginAt")}
        >
          Last Login {renderSortArrow("lastLoginAt")}
        </th>
      </tr>
    </thead>
  );
}
