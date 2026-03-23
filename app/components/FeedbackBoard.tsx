"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandCard } from "./BrandCard";
import { FilterCard } from "./FileterCard";
import { RoadmapCard } from "./RoadMapCard";
import { EmptyState } from "./EmptyState";
import { SortBar } from "./SortBar";
import { FeedbackCard } from "./FeedbackCard";


export type Category = "All" | "UI" | "UX" | "Enhancement" | "Bug" | "Feature";
export type SortOption = "Most Upvotes" | "Least Upvotes" | "Most Comments" | "Least Comments";



export const initialFeedback = [
  {
    id: 1,
    title: "Add tags for solutions",
    description: "Easier to search for solutions based on a specific stack.",
    category: "Enhancement",
    upvotes: 112,
    comments: 2,
    upvoted: false,
  },
  {
    id: 2,
    title: "Add a dark theme option",
    description:
      "It would help people with light sensitivities and who prefer dark mode.",
    category: "Feature",
    upvotes: 99,
    comments: 4,
    upvoted: false,
  },
  {
    id: 3,
    title: "Q&A within the challenge hubs",
    description: "Challenge-specific Q&A would make for easy reference.",
    category: "Feature",
    upvotes: 65,
    comments: 1,
    upvoted: false,
  },
  {
    id: 4,
    title: "Allow image/video upload to feedback",
    description: "Images and screencasts can enhance comments on solutions.",
    category: "Enhancement",
    upvotes: 51,
    comments: 2,
    upvoted: false,
  },
  {
    id: 5,
    title: "Ability to follow others",
    description: "Stay updated on comments and solutions other people post.",
    category: "Feature",
    upvotes: 42,
    comments: 3,
    upvoted: false,
  },
  {
    id: 6,
    title: "Preview images not loading",
    description:
      "Challenge preview images are missing when you apply a filter.",
    category: "Bug",
    upvotes: 3,
    comments: 0,
    upvoted: false,
  },
];


export default function FeedbackBoard() {
  const [feedback, setFeedback] = useState(initialFeedback);
  const [activeFilter, setActiveFilter] = useState<Category>("All");
  const [sort, setSort] = useState<SortOption>("Most Upvotes");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleUpvote = (id: number) => {
    setFeedback((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, upvoted: !f.upvoted, upvotes: f.upvoted ? f.upvotes - 1 : f.upvotes + 1 } : f
      )
    );
  };

  const filtered = feedback.filter((f) => activeFilter === "All" || f.category === activeFilter);

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "Most Upvotes") return b.upvotes - a.upvotes;
    if (sort === "Least Upvotes") return a.upvotes - b.upvotes;
    if (sort === "Most Comments") return b.comments - a.comments;
    return a.comments - b.comments;
  });

  return (
    <div className="min-h-screen bg-[#F2F4FF]">

      {/* ── MOBILE (< md) ───────────────────────────────────── */}
      <div className="md:hidden">
        {/* Mobile top nav */}
        <div className="flex items-center justify-between px-6 py-5"
          style={{ background: "linear-gradient(135deg, #28A7ED 0%, #A337F6 53%, #E84D70 100%)" }}>
          <div>
            <h2 className="text-white font-bold text-base">Frontend Mentor</h2>
            <p className="text-white/75 text-[13px] font-medium">Feedback Board</p>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white p-1">
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile slide-out overlay */}
        {mobileMenuOpen && (
          <>
            <div className="fixed inset-0 bg-[#3A4374]/50 z-30" onClick={() => setMobileMenuOpen(false)} />
            <div className="fixed top-18 right-0 bottom-0 w-72 bg-[#F2F4FF] z-40 p-6 flex flex-col gap-4 overflow-y-auto">
              <FilterCard active={activeFilter} onSelect={(c) => { setActiveFilter(c); setMobileMenuOpen(false); }} />
              <RoadmapCard />
            </div>
          </>
        )}

        {/* Sort bar */}
        <div className="px-0">
          <SortBar count={sorted.length} sort={sort} setSort={setSort} onAdd={() => {}} />
        </div>

        {/* Cards */}
        <div className="p-6 flex flex-col gap-4">
          {sorted.length === 0 ? (
            <EmptyState />
          ) : (
            sorted.map((item) => (
              <FeedbackCard key={item.id} item={item} onUpvote={toggleUpvote} horizontal={false} />
            ))
          )}
        </div>
      </div>

      {/* ── TABLET (md, < lg) ───────────────────────────────── */}
      <div className="hidden md:block lg:hidden max-w-3xl mx-auto px-6 py-8">
        {/* Top row: brand + filters + roadmap */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <BrandCard />
          <FilterCard active={activeFilter} onSelect={setActiveFilter} />
          <RoadmapCard />
        </div>
        <SortBar count={sorted.length} sort={sort} setSort={setSort} onAdd={() => {}} />
        <div className="flex flex-col gap-4 mt-6">
          {sorted.length === 0 ? <EmptyState /> : sorted.map((item) => (
            <FeedbackCard key={item.id} item={item} onUpvote={toggleUpvote} />
          ))}
        </div>
      </div>

      {/* ── DESKTOP (lg+) ───────────────────────────────────── */}
      <div className="hidden lg:flex max-w-277.5 mx-auto px-6 py-14 gap-7">
        {/* Left sidebar */}
        <aside className="w-63.75 min-w-63.75 flex flex-col gap-5 h-fit">
          <BrandCard />
          <FilterCard active={activeFilter} onSelect={setActiveFilter} />
          <RoadmapCard />
        </aside>

        {/* Main content */}
        <main className="flex-1 flex flex-col gap-5">
          <SortBar count={sorted.length} sort={sort} setSort={setSort} onAdd={() => {}} />
          <div className="flex flex-col gap-4">
            {sorted.length === 0 ? <EmptyState /> : sorted.map((item) => (
              <FeedbackCard key={item.id} item={item} onUpvote={toggleUpvote} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

