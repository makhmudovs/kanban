import FeedbackBoard from "@/app/components/FeedbackBoard";
import { getFeedbacks } from "./lib/feedback-actions";

export default async function Home() {
  const feedbacks = await getFeedbacks();

  return <FeedbackBoard feedbacks={feedbacks} />;
}
