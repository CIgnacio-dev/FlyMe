import express from "express";
import Flight from "../models/Flight.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const origin = await Flight.find().distinct("origin");
    const destinations = await Flight.find().distinct("destination");
    res.json({ origin, destinations });
  } catch (error) {
    console.error("Error en /api/locations:", error.message);
    res.status(500).json({ message: "Error al obtener ubicaciones" });
  }
});


export default router;
