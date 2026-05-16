// app/dashboard/page.tsx
import Link from "next/link";
import { getOverview } from "@/app/lib/actions/data";

export default async function OverviewPage() {
  const boards = await getOverview();

  const totalTasks = boards.reduce((sum, b) => sum + b.totalTasks, 0);
  const completedTasks = boards.reduce((sum, b) => sum + b.completedTasks, 0);
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-black dark:text-white">
            Overview
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {boards.length} boards · {totalTasks} tasks total
          </p>
        </div>
        <Link
          href="/dashboard/board/new"
          className="px-4 py-2 rounded-full bg-[#635fc7] text-white text-sm font-bold hover:bg-[#a8a4ff] transition-colors"
        >
          + Add new board
        </Link>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { label: "Total boards", value: boards.length },
          { label: "Total tasks", value: totalTasks },
          { label: "Completed tasks", value: completedTasks },
          { label: "Completion rate", value: `${completionRate}%` },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-gray-100 dark:bg-[#2B2C37] rounded-lg p-4"
          >
            <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-black dark:text-white">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <p className="text-xs font-bold tracking-[2px] uppercase text-gray-500 mb-3">
        Your boards
      </p>

      {boards.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-gray-500 text-sm mb-4">No boards yet.</p>
          <Link
            href="/dashboard/add"
            className="px-4 py-2 rounded-full bg-[#635fc7] text-white text-sm font-bold hover:bg-[#a8a4ff] transition-colors"
          >
            Create your first board
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {boards.map((board) => {
            const progress =
              board.totalTasks > 0
                ? Math.round((board.completedTasks / board.totalTasks) * 100)
                : 0;

            return (
              <div
                key={board.id}
                className="bg-white dark:bg-[#2b2c37] border border-gray-100 dark:border-transparent rounded-xl p-5 flex flex-col gap-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-bold text-black dark:text-white">
                      {board.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Created{" "}
                      {new Date(board.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-md bg-[#635fc7]/10 text-[#635fc7] font-semibold">
                    Active
                  </span>
                </div>

                {/* Columns with task counts */}
                <div className="flex flex-col gap-1.5">
                  {board.columns.map((col) => (
                    <div
                      key={col.id}
                      className="flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: col.color ?? "#635fc7" }}
                        />
                        <span className="text-gray-500">{col.name}</span>
                      </div>
                      <span className="font-bold text-black dark:text-white">
                        {col.taskCount}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="border-t border-gray-100 dark:border-[#3e3f4e] pt-3">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-bold text-black dark:text-white">
                      {progress}%
                    </span>
                  </div>
                  <div className="h-1 bg-gray-100 dark:bg-[#20212c] rounded-full">
                    <div
                      className="h-full bg-[#635fc7] rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <Link
                  href={`/dashboard/${board.id}`}
                  className="w-full py-2 rounded-full border border-gray-200 dark:border-[#3e3f4e] text-xs font-bold text-center text-gray-500 hover:text-[#635fc7] hover:border-[#635fc7] transition-colors"
                >
                  Open board
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
