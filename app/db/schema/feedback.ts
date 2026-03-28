import { pgTable, text, timestamp, index, pgEnum, integer } from "drizzle-orm/pg-core";
import { user } from "./user";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

// Matches your FilterCard categories
export const categoryEnum = pgEnum("category", [
  "Feature",
  "UI",
  "UX",
  "Enhancement",
  "Bug",
]);

// Matches your Roadmap status columns
export const statusEnum = pgEnum("status", [
  "Suggestion",
  "Planned",
  "In-Progress",
  "Live",
]);

export const feedback = pgTable(
  "feedback",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    category: categoryEnum("category").notNull().default("Feature"),
    status: statusEnum("status").notNull().default("Suggestion"),
    detail: text("detail").notNull(),
    
    // Use an integer for upvotes instead of calculating array lengths
    upvotes: integer("upvotes").notNull().default(0),

    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("feedback_userId_idx").on(table.userId),
    index("feedback_status_idx").on(table.status), // Important for the Roadmap page
  ],
);

export type FeedbackType = InferSelectModel<typeof feedback>;
export type FeedbackTableInsertType = InferInsertModel<typeof feedback>;