"use server";

import { db } from "@/app/db";
import { boards, columns, tasks } from "@/app/db/schema";
import { validateUser } from "./auth";
import { eq } from "drizzle-orm";

export async function getMenuItems() {
  const userId = await validateUser();

  const boardsArray = await db
    .select({
      id: boards.id,
      name: boards.name,
      userId: boards.userId,
      createdAt: boards.createdAt,
    })
    .from(boards)
    .where(eq(boards.userId, userId));

  return boardsArray;
}


export async function getOverview() {
  const userId = await validateUser();

  const userBoards = await db
    .select()
    .from(boards)
    .where(eq(boards.userId, userId));

  const overview = await Promise.all(
    userBoards.map(async (board) => {
      const boardColumns = await db
        .select()
        .from(columns)
        .where(eq(columns.boardId, board.id))
        .orderBy(columns.order);

      const boardTasks = await db
        .select()
        .from(tasks)
        .where(eq(tasks.boardId, board.id));

      const completedTasks = boardTasks.filter(
        (t) => boardColumns.find((c) => c.id === t.columnId)
      ).length;

      return {
        ...board,
        columns: boardColumns.map((col) => ({
          ...col,
          taskCount: boardTasks.filter((t) => t.columnId === col.id).length,
        })),
        totalTasks: boardTasks.length,
        completedTasks,
      };
    })
  );

  return overview;
}