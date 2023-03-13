import React from "react";

export function NotificationPing() {
  return (
    // ping notification animation
    // absolute is used here relative to the NavButton, set top right and shifted 1/4 its size to the corner
    <span className="absolute top-0 right-0 z-[100] inline-flex -translate-y-1/4 translate-x-1/2">
      {/* relative to the span container, this is the animated transparent background */}
      <span className="relative inline-flex h-4 w-4 animate-ping rounded-full bg-green-400/75"></span>
      {/* absolute to the circle's background, inset is zero to sit it completed within it */}
      <span className="absolute inset-0 inline-flex h-4 w-4 rounded-full border border-green-200 bg-green-500"></span>
    </span>
  );
}
