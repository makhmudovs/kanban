import TaskCard from "./task-card";

type Props = {
  column: {
    id: string;
    name: string;
    color: string | null;
    tasks: {
      id: string;
      title: string;
      subtasks: { completed: boolean }[];
    }[];
  };
};

export default function ColumnView({ column }: Props) {
  return (
    <div className="w-70 flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <span
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: column.color || "#871817" }}
        />
        <span className="text-xs font-bold tracking-[2.5px] uppercase text-gray-500">
          {column.name}
        </span>
      </div>
      {column.tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}