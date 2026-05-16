"use client";

import React, { useState } from "react";
import { Modal } from "@/app/components/modal";
import { LockKeyhole, LockKeyholeOpen, MoreVertical } from "lucide-react";
import { motion } from "framer-motion";
import { deleteTask, editTask } from "@/app/lib/actions/board";
import { useAlertDialogStore } from "@/app/providers/alert-dialog-provider";
import type { Task } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";
import { useConfirmDialogStore } from "@/app/providers/confirm-dialog-provider";

export default function TaskDetailModal({ task }: { task: Task }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [subtasks, setSubtasks] = useState(task.subtasks);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const completedCount = subtasks.filter((s) => s.completed).length;

  const confirm = useConfirmDialogStore((s) => s.confirm);
  const alert = useAlertDialogStore((s) => s.alert);
  const router = useRouter();

  const toggleSubtask = (id: string) =>
    setSubtasks((prev) =>
      prev.map((s) => (s.id === id ? { ...s, completed: !s.completed } : s)),
    );

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await editTask({
      id: task.id,
      title,
      description,
      subtaskArray: subtasks,
    });

    setLoading(false);

    if (res.error) {
      setError(res.error);
      return;
    }

    if (res.success) {
      alert({
        title: "Task updated",
        description: "Your changes have been saved.",
        variant: "success",
        duration: 2000,
      });
      setEditable(false);
    }
  };

  const handleDelete = (id: string) => {
    confirm({
      title: "Delete Task",
      description: "Are you sure you want to delete the task?",
      variant: "danger",
      confirmLabel: "Delete",
      cancelLabel: "Go back",
      onConfirm: async () => {
        const result = await deleteTask(id);
        if (result.success) {
          router.back();
        }
      },
    });
  };

  return (
    <Modal
      showFooter={false}
      title=""
      returnUrl={`/dashboard/${task.columnId}`}
    >
      <form onSubmit={handleSubmit} className="min-w-105">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-[#20212c] rounded-lg py-3 mb-4">
            <LockKeyhole
              className={`w-4 h-4 transition-colors ${editable ? "text-gray-300" : "text-[#635fc7]"}`}
            />
            <button
              type="button"
              onClick={() => setEditable(!editable)}
              className={`w-10 h-5 rounded-full relative transition-colors ${
                editable ? "bg-[#635fc7]" : "bg-gray-300 dark:bg-gray-600"
              }`}
            >
              <motion.span
                animate={{ x: editable ? 20 : 2 }}
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow"
              />
            </button>
            <LockKeyholeOpen
              className={`w-4 h-4 transition-colors ${editable ? "text-[#635fc7]" : "text-gray-300"}`}
            />
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="p-2 rounded-md border border-gray-400 dark:border-[#828fa3] text-gray-400 dark:text-[#828fa3] hover:border-gray-600 transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white dark:bg-[#20212c] border border-gray-200 dark:border-[#3e3f4e] rounded-lg overflow-hidden z-10 min-w-40 shadow-lg">
                <button
                  onClick={() => handleDelete(task.id)}
                  className="block w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-gray-50 dark:hover:bg-[#2b2c37]"
                >
                  Delete task
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mb-2">
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-black dark:text-white mb-2"
          >
            Title
          </label>
          <input
            disabled={!editable}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            type="text"
            className="block w-full rounded-md bg-transparent px-4 py-2.5 text-sm text-black dark:text-white border border-gray-300 dark:border-[#3e3f4e] placeholder:text-gray-400 focus:outline-none focus:border-[#635fc7] dark:focus:border-[#635fc7] transition-colors"
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-black dark:text-white mb-2"
          >
            Description
          </label>
          <textarea
            disabled={!editable}
            value={description || ""}
            rows={3}
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            className="block w-full rounded-md bg-transparent px-4 py-2.5 text-sm text-black dark:text-white border border-gray-300 dark:border-[#3e3f4e] placeholder:text-gray-400 focus:outline-none focus:border-[#635fc7] dark:focus:border-[#635fc7] transition-colors"
          >
            {description}
          </textarea>
        </div>

        <p className="text-xs font-bold tracking-wide text-black dark:text-white mb-3">
          Subtasks ({completedCount} of {subtasks.length})
        </p>

        <div className="flex flex-col gap-4 mb-6">
          {subtasks.map((subtask) => (
            <label
              key={subtask.id}
              className="flex items-center gap-3 bg-gray-100 dark:bg-[#41424c] rounded-md px-4 py-3 cursor-pointer"
            >
              <input
                disabled={!editable}
                type="checkbox"
                checked={subtask.completed}
                onChange={() => toggleSubtask(subtask.id)}
                className="w-4 h-4 accent-[#635fc7] cursor-pointer shrink-0"
              />
              <span
                className={`text-sm font-bold transition-colors ${
                  subtask.completed
                    ? "line-through text-gray-400 dark:text-[#828fa3]"
                    : "text-black dark:text-white"
                }`}
              >
                {subtask.title}
              </span>
            </label>
          ))}
        </div>
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        <div className="flex items-center justify-end mt-4">
          {editable && (
            <button
              disabled={!editable}
              type="submit"
              className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              {loading ? "Editing..." : "Edit task"}
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
}
