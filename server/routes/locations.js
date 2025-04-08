import express from "express";
import Flight from "../models/Flight.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const origins = await Flight.distinct("origin");
    const destinations = await Flight.distinct("destination");
    
    res.json({ origins, destinations });
  } catch (error) {
    console.error("Error en /api/locations:", error.message);
    res.status(500).json({ message: "Error al obtener ubicaciones" });
  }
});

export default router;
