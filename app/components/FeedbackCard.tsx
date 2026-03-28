import { MessageCircle } from "lucide-react";
import { CategoryBadge } from "./CategoryBadge";
import { UpvoteButton } from "./UpvoteButton";
import { feedbackItems } from "./FeedbackBoard";
import Link from "next/link";

export function FeedbackCard({
  item,
  horizontal = true,
}: {
  item: feedbackItems;
  horizontal?: boolean;
}) {
  if (!horizontal) {
    // Mobile layout
    return (
      <div className="bg-white rounded-2xl p-6">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <Link
              className="text-[#3A4374] font-bold text-[15px] mb-1 leading-snug"
              href={`/${item.id}`}
            >
              {item.title}
            </Link>
            <p className="text-[#647196] text-[13px] mb-3 leading-relaxed">
              {item.detail}
            </p>
            <CategoryBadge label={item.category} />
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          {/* <UpvoteButton
            count={item.upvotes}
            upvoted={item.upvotes}
            onToggle={() => onUpvote(item.id)}
          /> */}
          <div className="flex items-center gap-2 text-[#3A4374] font-bold text-[13px]">
            <MessageCircle
              size={16}
              className="text-[#CDD2EE]"
              fill="#CDD2EE"
            />
            comments here
          </div>
        </div>
      </div>
    );
  }

  // Desktop / tablet layout
  return (
    <div className="bg-white rounded-2xl p-6 flex items-start gap-8">
      {/* <UpvoteButton
        count={item.upvotes}
        upvoted={item.upvoted}
        onToggle={() => onUpvote(item.id)}
        vertical
      /> */}
      <div className="flex-1">
        <Link
          className="text-[#3A4374] font-bold text-[15px] mb-1 leading-snug"
          href={`/${item.id}`}
        >
          {item.title}
        </Link>
        <p className="text-[#647196] text-[15px] mb-3 leading-relaxed">
          {item.detail}
        </p>
        <CategoryBadge label={item.category} />
      </div>
      <div className="flex items-center gap-2 text-[#3A4374] font-bold text-[15px] ml-auto self-center">
        <MessageCircle size={18} className="text-[#CDD2EE]" fill="#CDD2EE" />
        comments here
        {/* {item.comments} */}
      </div>
    </div>
  );
}
