"use client";

import React, { useState } from "react";
import { Modal } from "@/app/components/modal";
import { X } from "lucide-react";
import { editBoard } from "@/app/lib/actions/board";
import { useAlertDialogStore } from "@/app/providers/alert-dialog-provider";

type Column = { id: string; name: string; color: string  };
type Board = { id: string; name: string; userId: string; columns: Column[] };

export default function BoardEditForm({ board }: { board: Board }) {
  const [name, setName] = useState(board.name);
  const [columns, setColumns] = useState<Column[]>(board.columns);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const alert = useAlertDialogStore((s) => s.alert);

  const updateColumn = (id: string, field: "name" | "color", val: string) =>
    setColumns((prev) =>
      prev.map((col) => (col.id === id ? { ...col, [field]: val } : col))
    );

  const removeColumn = (id: string) =>
    setColumns((prev) => prev.filter((col) => col.id !== id));

  const addColumn = () =>
    setColumns((prev) => [
      ...prev,
      { id: `new-${Date.now()}`, name: "", color: "#635fc7" },
    ]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await editBoard({
      id: board.id,
      name,
      columns,
    });

    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    if (result.success) {
      alert({
        title: "Board updated",
        description: "Your changes have been saved.",
        variant: "success",
        duration: 2000,
      });
    }
  };

  return (
    <Modal showFooter={false} title="" returnUrl="/dashboard">
      <form onSubmit={handleSubmit} className="min-w-105">
        <h2 className="text-lg font-bold text-black dark:text-white mb-4">
          Edit Board
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-black dark:text-white mb-2"
          >
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            type="text"
            required
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
                    onChange={(e) => updateColumn(col.id, "color", e.target.value)}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  />
                </div>

                <input
                  type="text"
                  value={col.name}
                  onChange={(e) => updateColumn(col.id, "name", e.target.value)}
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

          <button
            type="button"
            onClick={addColumn}
            className="w-full py-2.5 mt-3 rounded-full bg-white dark:bg-white text-[#635fc7] text-sm font-bold hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors"
          >
            + Add New Column
          </button>
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center mb-2">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-full bg-[#635fc7] text-white text-sm font-bold hover:bg-[#a8a4ff] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </Modal>
  );
}