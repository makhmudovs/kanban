import { getColumns } from "@/app/lib/actions/board";
import ColumnView from "./column-view";

type Props = {
  columns: Awaited<ReturnType<typeof getColumns>>;
};

export default function BoardView({ columns }: Props) {
  return (
    <div className="flex gap-6 min-w-max items-start">
      {columns.map((col) => (
        <ColumnView key={col.id} column={col} />
      ))}
    </div>
  );
}