import { pgTable, text, uuid, integer, boolean } from "drizzle-orm/pg-core";
import { tasks } from "./tasks";

export const subtasks = pgTable("subtasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  completed: boolean("completed").default(false).notNull(),
  order: integer("order").notNull(),
  taskId: uuid("task_id")
    .notNull()
    .references(() => tasks.id, { onDelete: "cascade" }),
});
