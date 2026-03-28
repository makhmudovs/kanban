"use client";

import { useState } from "react";
import { BrandCard } from "./BrandCard";
import { FilterCard } from "./FilterCard";
import { RoadmapCard } from "./RoadMapCard";
import { EmptyState } from "./EmptyState";
import { SortBar } from "./SortBar";
import { FeedbackCard } from "./FeedbackCard";

export type Category = "All" | "UI" | "UX" | "Enhancement" | "Bug" | "Feature";
export type SortOption =
  | "Most Upvotes"
  | "Least Upvotes"
  | "Most Comments"
  | "Least Comments";

export type feedbackItems = {
  id: string;
  title: string;
  category: string;
  status: string;
  detail: string;
  upvotes: number;
  createdAt: string;
  updatedAt: string;
};
type props = {
  feedbacks: feedbackItems[];
};


export default function FeedbackBoard({ feedbacks }: props) {
  // Initialize state with the server-fetched feedbacks
  const [items, setItems] = useState<feedbackItems[]>(feedbacks);
  const [activeFilter, setActiveFilter] = useState<Category>("All");
  const [sort, setSort] = useState<SortOption>("Most Upvotes");

  // Simple upvote handler (local UI state update)
  const toggleUpvote = (id: string) => {
    setItems((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, upvotes: f.upvotes + 1 } : f
      )
    );
  };

  // Logic for Filter and Sort
  const filteredAndSorted = [...items]
    .filter((f) => activeFilter === "All" || f.category === activeFilter)
    .sort((a, b) => {
      if (sort === "Most Upvotes") return b.upvotes - a.upvotes;
      if (sort === "Least Upvotes") return a.upvotes - b.upvotes;
      
      // If your schema doesn't have a comment count field yet, 
      // you might need to default to 0 or use createdAt
      const commentsA = (a as any).comments || 0;
      const commentsB = (b as any).comments || 0;

      if (sort === "Most Comments") return commentsB - commentsA;
      return commentsA - commentsB;
    });

  return (
    <div className="min-h-screen bg-[#F2F4FF] p-4 md:p-10 lg:p-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="grid grid-cols-1 md:grid-cols-3 lg:flex lg:flex-col gap-6">
          <BrandCard />
          <FilterCard active={activeFilter} onSelect={setActiveFilter} />
          <RoadmapCard />
        </aside>

        <main className="lg:col-span-3 flex flex-col gap-6">
          <SortBar 
            count={filteredAndSorted.length} 
            sort={sort} 
            setSort={setSort} 
          />

          <div className="flex flex-col gap-4">
            {filteredAndSorted.length === 0 ? (
              <EmptyState />
            ) : (
              filteredAndSorted.map((item) => (
                <FeedbackCard
                  key={item.id}
                  item={item}
                />
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
