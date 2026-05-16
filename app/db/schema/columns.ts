import { pgTable, text, uuid, integer } from "drizzle-orm/pg-core";
import { boards } from "./boards";

export const columns = pgTable("columns", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(), // "Todo", "Doing", "Done"
  color: text("color"), // the dot color in the UI
  order: integer("order").notNull(), // column position left to right
  boardId: uuid("board_id")
    .notNull()
    .references(() => boards.id, { onDelete: "cascade" }),
});
