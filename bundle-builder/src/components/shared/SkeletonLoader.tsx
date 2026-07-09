export const SkeletonLoader = () => {
  return (
    <div className="min-h-screen bg-brand-bg py-2 md:pb-12">
      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>

      <div className="max-w-360 mx-auto flex flex-col xl:flex-row justify-center items-start gap-7 md:pt-5 pt-3 px-0 md:px-6">
        <div className="w-full xl:w-4xl flex flex-col gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="relative h-16 w-full overflow-hidden rounded-xl bg-brand-primary"
            >
              <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent [animation:shimmer_1.5s_infinite]" />
            </div>
          ))}
        </div>

        <div className="relative hidden h-125 w-full overflow-hidden rounded-xl bg-brand-primary xl:block xl:w-96">
          <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent [animation:shimmer_1.5s_infinite]" />
        </div>
      </div>
    </div>
  );
};