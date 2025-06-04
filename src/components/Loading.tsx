"use client";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-[#16a34a] border-dashed rounded-full animate-spin"></div>
        <p className="text-[#16a34a] text-lg font-semibold animate-pulse">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default Loading;
