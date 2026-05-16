import { getTask } from "@/app/lib/actions/board";
import TaskDetailModal from "@/app/components/task/task-detail";

export default async function TaskDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const task = await getTask(id);
  console.log('task is',task);
  return <TaskDetailModal task={task} />;
}