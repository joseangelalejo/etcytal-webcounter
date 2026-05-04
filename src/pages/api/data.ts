import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import initialData from "@/data.json";

// Almacenamiento en memoria para cambios (en Vercel donde fs no está disponible)
let memoryData = JSON.parse(JSON.stringify(initialData));

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      // Intentar leer desde el filesystem primero (desarrollo)
      try {
        const dataPath = path.join(process.cwd(), "public", "data.json");
        const data = fs.readFileSync(dataPath, "utf-8");
        res.status(200).json(JSON.parse(data));
      } catch {
        // Fallback a datos en memoria si el filesystem no está disponible (Vercel)
        res.status(200).json(memoryData);
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to read data" });
    }
  } else if (req.method === "POST") {
    try {
      const dataPath = path.join(process.cwd(), "public", "data.json");

      // Actualizar en memoria
      memoryData = {
        ...memoryData,
        ...req.body,
      };

      // Intentar guardar en filesystem (funciona en desarrollo)
      try {
        const existingData = JSON.parse(
          fs.readFileSync(dataPath, "utf-8")
        );

        const updatedData = {
          ...existingData,
          ...req.body,
        };

        fs.writeFileSync(
          dataPath,
          JSON.stringify(updatedData, null, 2),
          "utf-8"
        );

        res.status(200).json({
          success: true,
          data: updatedData,
        });
      } catch {
        // En Vercel, fs no funciona pero devolvemos éxito con datos en memoria
        res.status(200).json({
          success: true,
          data: memoryData,
          note: "Data saved in memory (Vercel environment)",
        });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to save data" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
