"use client";

import Link from "next/link";
import { RoadmapCard } from "@/app/components/RoadMapCard"; // We'll create this next
import { RoadmapItem } from "../components/RoadMapItem";
import { ChevronLeft } from "lucide-react";

const roadmapData = {
  planned: [
    {
      id: 1,
      status: "Planned",
      title: "More comprehensive reports",
      description:
        "It would be great to see a more detailed breakdown of solutions.",
      category: "Feature",
      upvotes: 123,
      comments: 2,
      color: "#F49F3F",
    },
    {
      id: 2,
      status: "Planned",
      title: "Learning paths",
      description:
        "Sequenced projects for different goals to help people improve.",
      category: "Feature",
      upvotes: 28,
      comments: 1,
      color: "#F49F3F",
    },
  ],
  inProgress: [
    {
      id: 3,
      status: "In Progress",
      title: "One-click portfolio generation",
      description:
        "Add ability to create professional looking portfolio from profile.",
      category: "Feature",
      upvotes: 62,
      comments: 1,
      color: "#AD1FEA",
    },
    {
      id: 4,
      status: "In Progress",
      title: "Bookmark challenges",
      description: "Be able to bookmark challenges to take later on.",
      category: "Feature",
      upvotes: 31,
      comments: 1,
      color: "#AD1FEA",
    },
  ],
  live: [
    {
      id: 5,
      status: "Live",
      title: "Add micro-interactions",
      description: "Small animations at specific points can add delight.",
      category: "Enhancement",
      upvotes: 71,
      comments: 2,
      color: "#62BCFA",
    },
  ],
};

export default function page() {
  return (
    <div className="min-h-screen bg-[#F2F4FF] p-6 md:p-14 lg:p-20">
      <div className="max-w-6xl mx-auto">
        {/* Header - Dark Slate Bar */}
        <header className="bg-[#373F68] rounded-lg p-6 md:px-8 md:py-7 flex items-center justify-between mb-12">
          <div>
            <Link
              href="/"
              className="text-white text-sm font-bold flex items-center gap-4 hover:underline mb-2"
            >
              <span className="text-[#CDD2EE]">
                <ChevronLeft className="h-3 w-3" />
              </span>{" "}
              Go Back
            </Link>
            <h1 className="text-white text-2xl font-bold">Roadmap</h1>
          </div>
          <button className="bg-[#AD1FEA] hover:bg-[#C75AF6] text-white text-sm font-bold px-6 py-3 rounded-lg transition">
            + Add Feedback
          </button>
        </header>

        {/* Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Planned Column */}
          <section>
            <div className="mb-8">
              <h2 className="text-[#3A4374] text-lg font-bold">
                Planned ({roadmapData.planned.length})
              </h2>
              <p className="text-[#647196] text-sm">
                Ideas prioritized for research
              </p>
            </div>
            <div className="flex flex-col gap-6">
              {roadmapData.planned.map((item) => (
                <RoadmapItem key={item.id} {...item} />
              ))}
            </div>
          </section>

          {/* In-Progress Column */}
          <section>
            <div className="mb-8">
              <h2 className="text-[#3A4374] text-lg font-bold">
                In-Progress ({roadmapData.inProgress.length})
              </h2>
              <p className="text-[#647196] text-sm">
                Currently being developed
              </p>
            </div>
            <div className="flex flex-col gap-6">
              {roadmapData.inProgress.map((item) => (
                <RoadmapItem key={item.id} {...item} />
              ))}
            </div>
          </section>

          {/* Live Column */}
          <section>
            <div className="mb-8">
              <h2 className="text-[#3A4374] text-lg font-bold">
                Live ({roadmapData.live.length})
              </h2>
              <p className="text-[#647196] text-sm">Released features</p>
            </div>
            <div className="flex flex-col gap-6">
              {roadmapData.live.map((item) => (
                <RoadmapItem key={item.id} {...item} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
