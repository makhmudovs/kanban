import TaskForm from "@/app/components/task/task-form";
import { getColumns } from "@/app/lib/actions/board";
import { redirect } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const columns = await getColumns(id);
  if (!columns) {
    redirect(`/dashboard/${id}`);
  }
  return <TaskForm columns={columns} boardId={id} />;
}
