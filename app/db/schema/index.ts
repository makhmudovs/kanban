// Tables - direct exports (required for drizzle-kit)
export { user } from "@/app/db/schema/user";
export { session } from "@/app/db/schema/session";
export { account } from "@/app/db/schema/account";
export { verification } from "@/app/db/schema/verification";

// Tables for the app
export { boards } from "@/app/db/schema/boards";
export { columns } from "@/app/db/schema/columns";
export { tasks } from "@/app/db/schema/tasks";
export { subtasks } from "@/app/db/schema/subtasks";

// Relations
export {
  userRelations,
  sessionRelations,
  accountRelations,
} from "@/app/db/schema/relations";
