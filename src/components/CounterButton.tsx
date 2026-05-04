"use client";

interface CounterButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "negative";
}

export default function CounterButton({
  label,
  onClick,
  variant = "primary",
}: CounterButtonProps) {
  const baseStyles =
    "px-6 py-3 rounded-xl font-bold text-lg transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/30";

  const variants = {
    primary: "bg-gradient-to-r from-pink-400 to-rose-400 text-white hover:shadow-lg hover:shadow-pink-400/50",
    secondary: "bg-gradient-to-r from-blue-400 to-cyan-400 text-white hover:shadow-lg hover:shadow-blue-400/50",
    negative: "bg-gradient-to-r from-red-400 to-orange-400 text-white hover:shadow-lg hover:shadow-red-400/50",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {label}
    </button>
  );
}
