"use client";

import React, { useState, type SyntheticEvent } from "react";
import { Modal } from "@/app/components/modal";
import { addTask } from "@/app/lib/actions/board";
import { getColumns } from "@/app/lib/actions/board";
import { useAlertDialogStore } from "@/app/providers/alert-dialog-provider";
import { X } from "lucide-react";

type Props = {
  columns: Awaited<ReturnType<typeof getColumns>>;
  boardId: string;
};

type Subtask = { id: number; value: string };

export default function TaskForm({ columns, boardId }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subtasks, setSubtasks] = useState<Subtask[]>([{ id: 1, value: "" }]);
  const [columnId, setColumnId] = useState(columns[0]?.id ?? "");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const alert = useAlertDialogStore((s) => s.alert);

  const addSubtask = () =>
    setSubtasks((prev) => [...prev, { id: Date.now(), value: "" }]);

  const removeSubtask = (id: number) =>
    setSubtasks((prev) => prev.filter((s) => s.id !== id));

  const updateSubtask = (id: number, value: string) =>
    setSubtasks((prev) =>
      prev.map((s) => (s.id === id ? { ...s, value } : s))
    );

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const subtaskTitles = subtasks
      .map((s) => s.value.trim())
      .filter(Boolean);

    const result = await addTask({
      title,
      description,
      columnId,
      boardId,
      subtasks: subtaskTitles,
    });

    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    if (result.success) {
      alert({
        title: "Task created",
        description: "The task has been created successfully.",
        variant: "success",
        duration: 1500,
      });
    }
  };

  return (
    <Modal showFooter={false} title="" returnUrl={`/dashboard/${boardId}`}>
      <form onSubmit={handleSubmit} className="min-w-105">
        <h2 className="text-lg font-bold text-black dark:text-white mb-4">
          Add New Task
        </h2>

        {/* Title */}
        <div className="mb-3">
          <label htmlFor="title" className="block text-sm font-semibold text-black dark:text-white mb-2">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            type="text"
            required
            placeholder="e.g. Build login page"
            className="block w-full rounded-md bg-transparent px-4 py-2.5 text-sm text-black dark:text-white border border-gray-300 dark:border-[#3e3f4e] placeholder:text-gray-400 focus:outline-none focus:border-[#635fc7] dark:focus:border-[#635fc7] transition-colors"
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label htmlFor="description" className="block text-sm font-semibold text-black dark:text-white mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            rows={3}
            placeholder="e.g. Implement OAuth login with Google..."
            className="block w-full rounded-md bg-transparent px-4 py-2.5 text-sm text-black dark:text-white border border-gray-300 dark:border-[#3e3f4e] placeholder:text-gray-400 focus:outline-none focus:border-[#635fc7] dark:focus:border-[#635fc7] transition-colors"
          />
        </div>

        {/* Subtasks */}
        <div className="mb-3">
          <label className="block text-sm font-semibold text-black dark:text-white mb-2">
            Subtasks
          </label>
          <div className="flex flex-col gap-2">
            {subtasks.map((subtask) => (
              <div key={subtask.id} className="flex items-center gap-2">
                <input
                  type="text"
                  value={subtask.value}
                  onChange={(e) => updateSubtask(subtask.id, e.target.value)}
                  placeholder="e.g. Design mockup"
                  className="block w-full rounded-md bg-transparent px-4 py-2.5 text-sm text-black dark:text-white border border-gray-300 dark:border-[#3e3f4e] placeholder:text-gray-400 focus:outline-none focus:border-[#635fc7] dark:focus:border-[#635fc7] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => removeSubtask(subtask.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
                  aria-label="Remove subtask"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addSubtask}
            className="w-full py-2.5 mt-2 rounded-full bg-white dark:bg-white text-[#635fc7] text-sm font-bold hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors"
          >
            + Add New Subtask
          </button>
        </div>

        {/* Status */}
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-semibold text-black dark:text-white mb-2">
            Status
          </label>
          <select
            value={columnId}
            onChange={(e) => setColumnId(e.target.value)}
            id="status"
            required
            className="block w-full rounded-md bg-white dark:bg-[#2b2c37] px-4 py-2.5 text-sm text-black dark:text-white border border-gray-300 dark:border-[#3e3f4e] focus:outline-none focus:border-[#635fc7] transition-colors"
          >
            {columns.map((col) => (
              <option key={col.id} value={col.id}>
                {col.name}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center mb-2">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-full bg-[#635fc7] text-white text-sm font-bold hover:bg-[#a8a4ff] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </Modal>
  );
}