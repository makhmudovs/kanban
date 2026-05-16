import { notFound } from "next/navigation";

import { getColumns } from "@/app/lib/actions/board";
import BoardView from "@/app/components/board/board-view";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const columns = await getColumns(id);
  if (!columns) {
    notFound();
  }
  console.log('columns', columns);
  return <BoardView columns={columns} />;
}
