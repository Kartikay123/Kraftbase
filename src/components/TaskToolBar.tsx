import { useState, type ChangeEvent } from "react";
import { Search, Filter, SortAsc } from "lucide-react";

interface TaskToolbarProps {
  onSearch: (query: string) => void;
  onFilter: (label: string) => void;
  onSort: (sortBy: "dateAsc" | "dateDesc") => void;
  labels: string[];
}

export default function TaskToolbar({
  onSearch,
  onFilter,
  onSort,
  labels,
}: TaskToolbarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-wrap gap-4 mb-6 items-center p-4 rounded-xl shadow-sm">
      {/* Search */}
      <div className="relative flex-1 min-w-[220px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={searchQuery}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(e.target.value);
            onSearch(e.target.value);
          }}
        />
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        <Filter className="text-gray-500 w-5 h-5" />
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => onFilter(e.target.value)}
        >
          <option value="">All Labels</option>
          {labels.map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Sort */}
      <div className="flex items-center gap-2">
        <SortAsc className="text-gray-500 w-5 h-5" />
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => onSort(e.target.value as "dateAsc" | "dateDesc")}
        >
          <option value="dateAsc">Date Ascending</option>
          <option value="dateDesc">Date Descending</option>
        </select>
      </div>
    </div>
  );
}
