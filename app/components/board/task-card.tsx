import Link from "next/link";

type Props = {
  task: {
    id: string;
    title: string;
    subtasks: { completed: boolean }[];
  };
};

export default function TaskCard({ task }: Props) {
  const completedCount = task.subtasks.filter((s) => s.completed).length;
  const totalCount = task.subtasks.length;

  return (
    <Link href={`/dashboard/task/${task.id}`}>
      <div className="bg-white dark:bg-[#2b2c37] p-5 rounded-lg shadow-sm border border-gray-100 dark:border-transparent">
        <h3 className="text-sm font-bold mb-2">{task.title}</h3>
        <p className="text-xs font-bold text-gray-500">
          {completedCount} of {totalCount}{" "}
          {totalCount === 1 ? "task" : "tasks"}
        </p>
      </div>
    </Link>
  );
}