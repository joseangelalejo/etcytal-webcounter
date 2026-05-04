import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const dataPath = path.join(process.cwd(), "public", "data.json");
      const data = fs.readFileSync(dataPath, "utf-8");
      res.status(200).json(JSON.parse(data));
    } catch (error) {
      res.status(500).json({ error: "Failed to read data" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
