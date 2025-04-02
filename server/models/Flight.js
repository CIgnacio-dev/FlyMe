import mongoose from 'mongoose';



const seatSchema = new mongoose.Schema({
  number: String,
  reserved: {
    type: Boolean,
    default: false,
  },
  passengerName: String,
  passengerEmail: String,
}, { _id: false }); 

const flightSchema = new mongoose.Schema({
  airline: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  departureDate: {
    type: Date,
    required: true,
  },
  arrivalDate: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  seatsAvailable: {
    type: Number,
    required: true,
  },
  seats: [seatSchema],
}, {
  timestamps: true,
});

const Flight = mongoose.model('Flight', flightSchema);

export default Flight;
