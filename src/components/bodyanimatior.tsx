"use client";
import React from "react";

const BorderAnimation = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative p-[2px] rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-border">
      <div className="rounded-xl bg-white dark:bg-black p-4 h-full w-full">
        {children}
      </div>
    </div>
  );
};

export default BorderAnimation;