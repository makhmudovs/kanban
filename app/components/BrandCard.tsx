export function BrandCard() {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col justify-end h-fit min-h-35 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #28A7ED 0%, #A337F6 53%, #E84D70 100%)",
      }}
    >
      <h2 className="text-white font-bold text-lg leading-tight">
        Frontend Mentor
      </h2>
      <p className="text-white/75 text-sm font-medium mt-0.5">Feedback Board</p>
    </div>
  );
}
