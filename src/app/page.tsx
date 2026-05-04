"use client";

import { useEffect, useState } from "react";
import CounterDisplay from "@/components/CounterDisplay";
import CounterButton from "@/components/CounterButton";
import HistoryLog from "@/components/HistoryLog";

interface CounterData {
  [date: string]: number;
}

export default function Home() {
  const [data, setData] = useState<CounterData>({});
  const [todayCount, setTodayCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Obtener datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        const jsonData = await response.json();
        setData(jsonData);

        // Cargar contador de hoy desde localStorage
        const today = new Date();
        const todayKey = today.toISOString().split("T")[0];
        const savedCount =
          localStorage.getItem(`counter-${todayKey}`) ||
          String(jsonData[todayKey] || 0);
        setTodayCount(Number(savedCount));
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Guardar contador en localStorage cuando cambie
  useEffect(() => {
    const today = new Date();
    const todayKey = today.toISOString().split("T")[0];
    localStorage.setItem(`counter-${todayKey}`, String(todayCount));
  }, [todayCount]);

  const handleIncrement = () => {
    setTodayCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (todayCount > 0) {
      setTodayCount((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setTodayCount(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Cargando datos...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-2">
            Etcytal WebCounter
          </h1>
          <p className="text-white/80 text-lg">
            Contando "etc y tal" desde el 15 de Septiembre
          </p>
        </div>

        {/* Card principal */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 mb-8 border border-white/20">
          <CounterDisplay count={todayCount} />

          {/* Botones de control */}
          <div className="flex gap-4 justify-center mt-8">
            <CounterButton
              label="➖ Menos"
              onClick={handleDecrement}
              variant="negative"
            />
            <CounterButton
              label="➕ Más"
              onClick={handleIncrement}
              variant="primary"
            />
            <CounterButton
              label="🔄 Reset"
              onClick={handleReset}
              variant="secondary"
            />
          </div>
        </div>

        {/* Historial */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">Historial</h2>
          <HistoryLog data={data} />
        </div>
      </div>
    </main>
  );
}
