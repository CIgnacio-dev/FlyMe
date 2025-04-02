// server/models/Booking.js
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  flight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flight',
    required: true,
  },
  bookedAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true,
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
