import { userRelations, sessionRelations, accountRelations } from "./relations"; // If you need to import it specifically for some logic

export * from "./user";
export * from "./session";
export * from "./account";
export * from "./verification";
export * from './feedback';
export * from './comment';
export { userRelations, sessionRelations, accountRelations }; // Clean export
