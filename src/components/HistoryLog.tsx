"use client";

import { useMemo } from "react";

interface HistoryLogProps {
  data: { [date: string]: number };
}

export default function HistoryLog({ data }: HistoryLogProps) {
  const sortedDates = useMemo(() => {
    return Object.entries(data)
      .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
      .slice(0, 30); // Últimos 30 días
  }, [data]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("es-ES", options);
  };

  const getDayColor = (count: number) => {
    if (count === 0) return "bg-gray-400/30 text-gray-200";
    if (count < 15) return "bg-green-400/30 text-green-200";
    if (count < 30) return "bg-yellow-400/30 text-yellow-200";
    if (count < 45) return "bg-orange-400/30 text-orange-200";
    return "bg-red-400/30 text-red-200";
  };

  return (
    <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
      {sortedDates.length === 0 ? (
        <div className="text-white/60 text-center py-8">
          No hay datos disponibles
        </div>
      ) : (
        sortedDates.map(([date, count]) => (
          <div
            key={date}
            className="flex justify-between items-center p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
          >
            <div className="flex-1">
              <div className="text-white font-semibold capitalize">
                {formatDate(date)}
              </div>
              <div className="text-white/60 text-sm">{date}</div>
            </div>
            <div className={`px-4 py-2 rounded-lg font-bold text-lg ${getDayColor(count)}`}>
              {count}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
