import { useEffect, useState, useRef } from "react";
import {
  Box,
  Heading,
  Stack,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  Button,
  useToast,
  Icon,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { getMyBookings, cancelBooking } from "../services/api";
import { format } from "date-fns";
import { FaPlaneDeparture, FaUser, FaChair, FaTrashAlt } from "react-icons/fa";
import QRCode from "react-qr-code";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const cancelRef = useRef();
  const toast = useToast();

  const fetchBookings = async () => {
    try {
      const res = await getMyBookings();
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const openCancelDialog = (booking) => {
    setSelectedBooking(booking);
    setIsDialogOpen(true);
  };

  const handleCancel = async () => {
    try {
      await cancelBooking(selectedBooking._id);
      toast({
        title: "Reserva cancelada",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      fetchBookings();
    } catch (err) {
      toast({
        title: "Error al cancelar",
        description: err.response?.data?.message || "Error inesperado",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsDialogOpen(false);
    }
  };

  const handleDownloadPDF = async (booking) => {
    const element = document.getElementById(`qr-${booking._id}`);
    if (!element) return;
  
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
  
    const pdf = new jsPDF("p", "mm", "a4");
    const margin = 20;
    let y = margin;
  
    // Título sin emojis
    pdf.setFillColor(49, 130, 206); // azul
    pdf.rect(0, 0, 210, 30, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(20);
    pdf.text("FlyMe - Pase de Abordar", margin, y + 7);
  
    y += 40;
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
  
    // Valores con fallback
    pdf.text(`Pasajero: ${booking.passengerName || "N/A"}`, margin, y);
    y += 8;
    pdf.text(`Email: ${booking.passengerEmail || "N/A"}`, margin, y);
    y += 8;
    pdf.text(
      `Vuelo: ${booking.flight?.origin || "?"} → ${booking.flight?.destination || "?"}`,
      margin,
      y
    );
    y += 8;
    pdf.text(`Asiento: ${booking.seatNumber || "N/A"}`, margin, y);
    y += 8;
    const fecha = booking.flight?.departureDate
      ? format(new Date(booking.flight.departureDate), "PPpp")
      : "N/A";
    pdf.text(`Fecha: ${fecha}`, margin, y);
    y += 10;
  
    pdf.setDrawColor(180);
    pdf.line(margin, y, 210 - margin, y);
    y += 10;
  
    // Código QR centrado
    const qrWidth = 100;
    const centerX = (210 - qrWidth) / 2;
    pdf.addImage(imgData, "PNG", centerX, y, qrWidth, qrWidth);
    y += qrWidth + 10;
  
    pdf.setFontSize(10);
    pdf.setTextColor(100);
    pdf.text(`Código de reserva: ${booking._id}`, margin, y);
  
    pdf.save(`pase-${booking._id}.pdf`);
  };
  
  

  if (loading) return <Spinner size="xl" mt={10} />;

  return (
    <Box p={5}>
      <Heading mb={6}>Mis Reservas</Heading>

      {bookings.length === 0 ? (
        <Alert status="info">
          <AlertIcon />
          No tienes reservas aún.
        </Alert>
      ) : (
        <Stack
          spacing={4}
          direction={{ base: "column", md: "row" }}
          flexWrap="wrap"
        >
          {bookings.map((booking) => (
            <Box
              key={booking._id}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              mb={4}
              w="full"
              maxW="sm"
            >
              <Text fontWeight="bold" fontSize="lg">
                {booking.flight.origin} → {booking.flight.destination}
              </Text>
              <Text>Asiento: {booking.seatNumber}</Text>
              <Text>Pasajero: {booking.passengerName}</Text>
              <Text>Correo: {booking.passengerEmail}</Text>
              <Text>Fecha: {format(new Date(booking.flight.departureDate), "PPpp")}</Text>

              {/* Código QR */}
              <Box id={`qr-${booking._id}`} mt={4} p={2} bg="white" textAlign="center">
                <QRCode
                  value={JSON.stringify({
                    id: booking._id,
                    pasajero: booking.passengerName,
                    vuelo: `${booking.flight.origin} → ${booking.flight.destination}`,
                    asiento: booking.seatNumber,
                    correo: booking.passengerEmail,
                  })}
                  size={128}
                />
              </Box>

              <Button
                mt={3}
                size="sm"
                colorScheme="blue"
                onClick={() => handleDownloadPDF(booking)}
                w="full"
              >
                Descargar pase de abordar
              </Button>
            </Box>
          ))}
        </Stack>
      )}

      {/* Diálogo de confirmación */}
      <AlertDialog
        isOpen={isDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsDialogOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Cancelar reserva
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Estás seguro que deseas cancelar esta reserva?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsDialogOpen(false)}>
                No
              </Button>
              <Button colorScheme="red" onClick={handleCancel} ml={3}>
                Sí, cancelar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default MyBookings;
