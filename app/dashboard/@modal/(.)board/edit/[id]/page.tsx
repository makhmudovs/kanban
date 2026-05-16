import BoardEditForm from "@/app/components/board/board-edit-form";
import TaskForm from "@/app/components/task/task-form";
import { getBoard, getColumns } from "@/app/lib/actions/board";
import { redirect } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const board = await getBoard(id);
  if (!board) {
    redirect(`/dashboard/${id}`);
  }
  return <BoardEditForm board={board} />;
}
