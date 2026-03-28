import { pgTable, text, timestamp, index } from "drizzle-orm/pg-core";
import { user } from "./user";
import { feedback } from "./feedback"; // Assuming your feedback schema file
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const comment = pgTable(
  "comment",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    
    // Who commented (Foreign Key)
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    // On what post (Foreign Key)
    feedbackId: text("feedback_id")
      .notNull()
      .references(() => feedback.id, { onDelete: "cascade" }),

    content: text("content").notNull(),

    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("comment_userId_idx").on(table.userId),
    index("comment_feedbackId_idx").on(table.feedbackId),
  ],
);

export type CommentType = InferSelectModel<typeof comment>;
export type CommentTableInsertType = InferInsertModel<typeof comment>;