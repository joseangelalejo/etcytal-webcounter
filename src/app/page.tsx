"use client";

import { useEffect, useState, useCallback } from "react";
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
  const [isSyncing, setIsSyncing] = useState(false);

  const today = new Date();
  const todayKey = today.toISOString().split("T")[0];

  // Obtener datos iniciales desde la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/data");
        const jsonData = await response.json();
        setData(jsonData);

        // Usar el valor del servidor como fuente de verdad
        const serverCount = jsonData[todayKey] || 0;
        setTodayCount(serverCount);
        
        // Guardar en localStorage como caché
        localStorage.setItem(`counter-${todayKey}`, String(serverCount));
      } catch (error) {
        console.error("Error cargando datos:", error);
        
        // Fallback a localStorage si la API falla
        const cachedCount = localStorage.getItem(`counter-${todayKey}`);
        if (cachedCount) {
          setTodayCount(Number(cachedCount));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [todayKey]);

  // Verificar cambio de día cada minuto
  useEffect(() => {
    let lastKnownDate = todayKey;
    
    const dateCheckInterval = setInterval(() => {
      const currentDate = new Date().toISOString().split("T")[0];
      
      // Si cambió el día, refrescar datos
      if (currentDate !== lastKnownDate) {
        lastKnownDate = currentDate;
        // Forzar un re-render para actualizar todayKey
        setLoading(true);
        
        setTimeout(async () => {
          try {
            const response = await fetch("/api/data");
            const jsonData = await response.json();
            setData(jsonData);
            
            const serverCount = jsonData[currentDate] || 0;
            setTodayCount(serverCount);
            localStorage.setItem(`counter-${currentDate}`, String(serverCount));
          } catch (error) {
            console.error("Error refrescando datos al cambiar de día:", error);
          } finally {
            setLoading(false);
          }
        }, 100);
      }
    }, 60000); // Verificar cada minuto

    return () => clearInterval(dateCheckInterval);
  }, [todayKey]);

  // Guardar cambios en el servidor cuando todayCount cambia
  useEffect(() => {
    if (loading) return; // No guardar durante la carga inicial
    
    const saveToServer = async () => {
      setIsSyncing(true);
      try {
        const response = await fetch("/api/data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            [todayKey]: todayCount,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          setData(result.data);
          // Actualizar localStorage con los datos del servidor
          localStorage.setItem(`counter-${todayKey}`, String(todayCount));
        } else {
          console.error("Error guardando datos en el servidor");
        }
      } catch (error) {
        console.error("Error sincronizando contador:", error);
        // El contador local se mantiene incluso si falla la sincronización
      } finally {
        setIsSyncing(false);
      }
    };

    // Usar un debounce para evitar demasiadas peticiones
    const debounceTimer = setTimeout(saveToServer, 300);
    return () => clearTimeout(debounceTimer);
  }, [todayCount, todayKey, loading]);

  const handleIncrement = useCallback(() => {
    setTodayCount((prev) => prev + 1);
  }, []);

  const handleDecrement = useCallback(() => {
    if (todayCount > 0) {
      setTodayCount((prev) => prev - 1);
    }
  }, [todayCount]);

  const handleReset = useCallback(() => {
    setTodayCount(0);
  }, []);

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

          {/* Indicador de sincronización */}
          {isSyncing && (
            <div className="text-center mt-4 text-sm text-white/60">
              Sincronizando...
            </div>
          )}

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
