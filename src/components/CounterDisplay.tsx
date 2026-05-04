"use client";

interface CounterDisplayProps {
  count: number;
}

export default function CounterDisplay({ count }: CounterDisplayProps) {
  return (
    <div className="text-center">
      <div className="inline-block">
        <div className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 drop-shadow-lg">
          {count}
        </div>
        <div className="text-white/80 text-xl font-semibold mt-2">
          veces hoy
        </div>
      </div>
    </div>
  );
}
