"use client";

import { createBoard } from "@/app/lib/actions/board";
import { useAlertDialogStore } from "@/app/providers/alert-dialog-provider";
import { X } from "lucide-react";
import { useState, type SyntheticEvent } from "react";
import { Modal } from "../modal";

const COLUMN_COLORS = [
  { label: "Sky", value: "#0ea5e9" },
  { label: "Violet", value: "#8b5cf6" },
  { label: "Green", value: "#22c55e" },
  { label: "Rose", value: "#f43f5e" },
  { label: "Amber", value: "#f59e0b" },
  { label: "Teal", value: "#14b8a6" },
  { label: "Orange", value: "#f97316" },
  { label: "Pink", value: "#ec4899" },
];

type Column = { id: number; value: string; color: string };

export default function BoardForm() {
  const [name, setName] = useState("");
  const [columns, setColumns] = useState<Column[]>([
    { id: 1, value: "", color: COLUMN_COLORS[0].value },
  ]);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const alert = useAlertDialogStore((s) => s.alert);

  const addColumn = () =>
    setColumns((prev) => [
      ...prev,
      {
        id: Date.now(),
        value: "",
        color: COLUMN_COLORS[prev.length % COLUMN_COLORS.length].value,
      },
    ]);

  const removeColumn = (id: number) =>
    setColumns((prev) => prev.filter((col) => col.id !== id));

  const updateColumn = (id: number, field: "value" | "color", val: string) =>
    setColumns((prev) =>
      prev.map((col) => (col.id === id ? { ...col, [field]: val } : col)),
    );

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const columnData = columns
      .filter((c) => c.value.trim())
      .map((c) => ({ name: c.value, color: c.color }));

    const result = await createBoard(name, columnData);

    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    if (result.success) {
      alert({
        title: "Board created",
        description: "The board has been created",
        variant: "success",
        duration: 1500,
      });
    }
  };

  return (
    <Modal showFooter={false} title="" returnUrl="/dashboard">
      <form onSubmit={handleSubmit} className="min-w-105">
        <h2 className="text-lg font-bold text-black dark:text-white mb-2">
          Add New Board
        </h2>

        {/* Name */}
        <div className="mb-2">
          <label
            htmlFor="board-name"
            className="block text-sm font-semibold text-black dark:text-white mb-2"
          >
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="board-name"
            type="text"
            placeholder="e.g. Web Design"
            className="block w-full rounded-md bg-transparent px-4 py-2.5 text-sm text-black dark:text-white border border-gray-300 dark:border-[#3e3f4e] placeholder:text-gray-400 focus:outline-none focus:border-[#635fc7] dark:focus:border-[#635fc7] transition-colors"
          />
        </div>

        {/* Columns */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-black dark:text-white mb-2">
            Columns
          </label>
          <div className="flex flex-col gap-3">
            {columns.map((col) => (
              <div key={col.id} className="flex items-center gap-2">
                {/* Color picker */}
                <div className="relative shrink-0">
                  <div
                    className="w-9 h-9 rounded-md border border-gray-300 dark:border-[#3e3f4e] cursor-pointer"
                    style={{ backgroundColor: col.color }}
                  />
                  <input
                    type="color"
                    value={col.color}
                    onChange={(e) =>
                      updateColumn(col.id, "color", e.target.value)
                    }
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  />
                </div>

                <input
                  type="text"
                  value={col.value}
                  onChange={(e) =>
                    updateColumn(col.id, "value", e.target.value)
                  }
                  placeholder="e.g. Todo"
                  className="block w-full rounded-md bg-transparent px-4 py-2.5 text-sm text-black dark:text-white border border-gray-300 dark:border-[#3e3f4e] placeholder:text-gray-400 focus:outline-none focus:border-[#635fc7] dark:focus:border-[#635fc7] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => removeColumn(col.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
                  aria-label="Remove column"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Color presets */}
          <div className="flex flex-wrap gap-2 mt-3">
            {COLUMN_COLORS.map((c) => (
              <button
                key={c.value}
                type="button"
                title={c.label}
                className="w-6 h-6 rounded-full border-2 border-transparent hover:border-white transition-all"
                style={{ backgroundColor: c.value }}
              />
            ))}
          </div>
        </div>

        {/* Add Column */}
        <button
          type="button"
          onClick={addColumn}
          className="w-full py-2.5 mb-4 rounded-full bg-white dark:bg-white text-[#635fc7] text-sm font-bold hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors"
        >
          + Add New Column
        </button>

        {error && <p className="text-sm text-red-500 text-center mb-2">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-full bg-[#635fc7] text-white text-sm font-bold hover:bg-[#a8a4ff] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Creating..." : "Create New Board"}
        </button>
      </form>
    </Modal>
  );
}
