"use server";

import { db } from "@/app/db";
import { boards, columns, subtasks, tasks } from "@/app/db/schema";
import { and, eq } from "drizzle-orm";
import { validateUser } from "./auth";
import { revalidatePath } from "next/cache";
import { Subtask } from "../definitions";

export async function getColumns(boardId: string) {
  const columnsArray = await db
    .select({
      id: columns.id,
      name: columns.name,
      color: columns.color,
      order: columns.order,
      boardId: columns.boardId,
    })
    .from(columns)
    .where(eq(columns.boardId, boardId))
    .orderBy(columns.order);

  const tasksArray = await db
    .select({
      id: tasks.id,
      title: tasks.title,
      description: tasks.description,
      order: tasks.order,
      columnId: tasks.columnId,
      boardId: tasks.boardId,
      createdAt: tasks.createdAt,
    })
    .from(tasks)
    .where(eq(tasks.boardId, boardId)) // filter by boardId, not columnsArray.id
    .orderBy(tasks.order);

  const subtasksArray = await db
    .select({
      id: subtasks.id,
      title: subtasks.title,
      completed: subtasks.completed,
      order: subtasks.order,
      taskId: subtasks.taskId,
    })
    .from(subtasks)
    .orderBy(subtasks.order);

  // nest tasks into their columns in JS
  return columnsArray.map((column) => ({
    ...column,
    tasks: tasksArray
      .filter((task) => task.columnId === column.id)
      .map((task) => ({
        ...task,
        subtasks: subtasksArray.filter((s) => s.taskId === task.id),
      })),
  }));
}

export async function getTask(taskId: string) {
  const task = await db
    .select()
    .from(tasks)
    .where(eq(tasks.id, taskId))
    .then((rows) => rows[0]);

  if (!task) throw new Error("Task not found");

  const subtasksArray = await db
    .select()
    .from(subtasks)
    .where(eq(subtasks.taskId, taskId))
    .orderBy(subtasks.order);

  return {
    ...task,
    subtasks: subtasksArray,
  };
}

type EditTaskData = {
  id: string;
  title?: string;
  description?: string | null;
  subtaskArray?: Subtask[];
};

export async function editTask(data: EditTaskData) {
  try {
    await validateUser();

    await Promise.all([
      db
        .update(tasks)
        .set({ title: data.title, description: data.description })
        .where(eq(tasks.id, data.id)),

      ...(data.subtaskArray?.map((subtask) =>
        db
          .update(subtasks)
          .set({ completed: subtask.completed })
          .where(eq(subtasks.id, subtask.id)),
      ) ?? []),
    ]);

    revalidatePath(`/dashboard/task/${data.id}`);
    return { success: true };
  } catch (error) {
    console.error("Error editing task:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

export async function createBoard(
  name: string,
  columnData: { name: string; color: string }[],
) {
  if (!name.trim()) {
    return { error: "Board name is required" };
  }

  if (columnData.length === 0) {
    return { error: "At least one column is required" };
  }

  try {
    const userId = await validateUser();
    const [board] = await db
      .insert(boards)
      .values({ name, userId })
      .returning();

    await db.insert(columns).values(
      columnData.map((col, index) => ({
        name: col.name,
        color: col.color,
        order: index,
        boardId: board.id,
      })),
    );

    revalidatePath("/dashboard", "layout");
    return { success: true, board };
  } catch (e) {
    return { error: "Something went wrong. Please try again." };
  }
}

export async function deleteBoard(id: string) {
  try {
    const userId = await validateUser();

    await db
      .delete(boards)
      .where(and(eq(boards.id, id), eq(boards.userId, userId)));

    revalidatePath("/dashboard", "layout");
    return { success: true };
  } catch (error) {
    console.error("Error deleting board:", error);
    return { success: false, error: "Failed to delete board" };
  }
}

export async function deleteTask(id: string) {
  try {
    await validateUser();

    await db.delete(tasks).where(eq(tasks.id, id));

    revalidatePath("/dashboard", "layout");
    return { success: true };
  } catch (error) {
    console.error("Error deleting board:", error);
    return { success: false, error: "Failed to delete board" };
  }
}

export async function addTask({
  title,
  description,
  columnId,
  boardId,
  subtasks: subtaskTitles,
}: {
  title: string;
  description: string;
  columnId: string;
  boardId: string;
  subtasks: string[];
}) {
  try {
    await validateUser();

    const order = await db
      .select()
      .from(tasks)
      .where(eq(tasks.columnId, columnId))
      .then((rows) => rows.length);

    const [task] = await db
      .insert(tasks)
      .values({ title, description, columnId, boardId, order })
      .returning();

    if (subtaskTitles.length > 0) {
      await db.insert(subtasks).values(
        subtaskTitles.map((title, index) => ({
          title,
          order: index,
          taskId: task.id,
          completed: false,
        })),
      );
    }

    revalidatePath(`/dashboard/${boardId}`);
    return { success: true };
  } catch (error) {
    console.error("Error creating task:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

export async function getBoard(boardId: string) {
  const userId = await validateUser();

  const board = await db
    .select()
    .from(boards)
    .where(and(eq(boards.id, boardId), eq(boards.userId, userId)))
    .then((rows) => rows[0]);

  if (!board) throw new Error("Board not found");

  const boardColumns = await db
    .select({ id: columns.id, name: columns.name, color: columns.color })
    .from(columns)
    .where(eq(columns.boardId, boardId))
    .orderBy(columns.order)
    .then((rows) =>
      rows.map((col) => ({ ...col, color: col.color ?? "#635fc7" })),
    );

  return { ...board, columns: boardColumns };
}

export async function editBoard({
  id,
  name,
  columns: columnData,
}: {
  id: string;
  name: string;
  columns: { id: string; name: string; color: string }[];
}) {
  try {
    const userId = await validateUser();

    await db
      .update(boards)
      .set({ name })
      .where(and(eq(boards.id, id), eq(boards.userId, userId)));

    await Promise.all(
      columnData.map((col) =>
        col.id.startsWith("new-")
          ? db.insert(columns).values({
              name: col.name,
              color: col.color,
              order: 0,
              boardId: id,
            })
          : db
              .update(columns)
              .set({ name: col.name, color: col.color })
              .where(eq(columns.id, col.id)),
      ),
    );

    revalidatePath("/dashboard", "layout");
    return { success: true };
  } catch (error) {
    console.error("Error editing board:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
