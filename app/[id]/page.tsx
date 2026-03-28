import Link from "next/link";
import { getFeedbackDetail } from "@/app/lib/feedback-actions";
import { FeedbackCard } from "@/app/components/FeedbackCard";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const item = await getFeedbackDetail(id);

  if (!item) notFound();

  return (
    <div className="min-h-screen bg-[#F2F4FF] p-4 md:p-10 lg:p-20">
      <div className="max-w-3xl mx-auto py-14 px-6">
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="text-[#647196] font-bold text-sm flex items-center gap-4 hover:underline"
          >
            <span className="text-[#4661E6]">{"<"}</span> Go Back
          </Link>
          <button className="bg-[#4661E6] hover:bg-[#7C91F9] text-white font-bold text-sm px-6 py-3 rounded-lg transition">
            Edit Feedback
          </button>
        </div>

        {/* Main Feedback Card */}
        <div className="mb-6">
          <FeedbackCard item={item} />
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-lg p-8 mb-6">
          {/* <h2 className="text-[#3A4374] text-lg font-bold mb-7">
          {item.comments.length} Comments
        </h2>
        <div className="flex flex-col gap-8">
          {item.comments.map((comment: any) => (
            <div key={comment.id} className="border-b border-[#8C92B3]/10 last:border-none pb-8 last:pb-0">
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-8">
                  <Image
                    src={comment.user.image} 
                    alt={comment.user.name} 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-[#3A4374] font-bold text-sm">{comment.user.name}</h4>
                    <p className="text-[#647196] text-sm">@{comment.user.name.split(' ').join('').toLowerCase()}</p>
                  </div>
                </div>
                <button className="text-[#4661E6] font-semibold text-xs hover:underline">Reply</button>
              </div>
              <p className="text-[#647196] text-sm ml-[72px]">
                {comment.content}
              </p>
            </div>
          ))}
        </div> */}
        </div>

        {/* Add Comment Form */}
        <div className="bg-white rounded-lg p-8">
          <h3 className="text-[#3A4374] text-lg font-bold mb-6">Add Comment</h3>
          <form className="flex flex-col gap-4">
            <textarea
              placeholder="Type your comment here"
              className="bg-[#F7F8FD] rounded-md p-4 text-sm text-[#3A4374] focus:ring-1 focus:ring-[#4661E6] outline-none min-h-[80px]"
              maxLength={250}
            />
            <div className="flex items-center justify-between">
              <p className="text-[#647196] text-sm">250 Characters left</p>
              <button className="bg-[#AD1FEA] hover:bg-[#C75AF6] text-white font-bold text-sm px-6 py-3 rounded-lg transition">
                Post Comment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
