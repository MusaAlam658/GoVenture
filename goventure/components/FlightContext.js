import React, { createContext, useContext, useState } from 'react';

const FlightContext = createContext();

export const FlightProvider = ({ children }) => {
  const [availableFlights, setAvailableFlights] = useState([
    {
      id: 1,
      name: 'American Airlines Flight FA123',
      flightID: 'FA123',
      airlineName: 'American Airlines',
      seatClass: 'Economy',
      departureCity: 'New York',
      departureTime: '01-12-2025',
      terminalAndGateInfo: 'Terminal 4, Gate 22',
      destinationCity: 'London',
      destinationTime: '02-04-2025',
      flightDuration: '7h 0m',
      baggageAllowance: '2 pieces, up to 23 kg each',
      visa: true,
      inFlightServices: 'Meals, Wi-Fi, Entertainment',
      reviews: [],
    },
    {
      id: 2,
      name: 'Delta Airlines Flight DA456',
      flightID: 'DA456',
      airlineName: 'Delta Airlines',
      seatClass: 'Business',
      departureCity: 'Los Angeles',
      departureTime: '2025-12-02 15:30',
      terminalAndGateInfo: 'Terminal 2, Gate 15',
      destinationCity: 'Tokyo',
      destinationTime: '2024-12-03 18:45',
      flightDuration: '12h 15m',
      baggageAllowance: '3 pieces, up to 32 kg each',
      visa: false,
      inFlightServices: 'Premium Meals, Lounge Access, Wi-Fi',
      reviews: [],
    },
    {
      id: 3,
      name: 'British Airways Flight BA789',
      flightID: 'BA789',
      airlineName: 'British Airways',
      seatClass: 'Economy',
      departureCity: 'London',
      departureTime: '2025-12-04 08:00',
      terminalAndGateInfo: 'Terminal 5, Gate 12',
      destinationCity: 'Dubai',
      destinationTime: '2024-12-04 17:00',
      flightDuration: '7h 0m',
      baggageAllowance: '2 pieces, up to 23 kg each',
      visa: true,
      inFlightServices: 'Meals, In-flight Entertainment',
      reviews: [],
    },
    {
      id: 4,
      name: 'Emirates Flight EK111',
      flightID: 'EK111',
      airlineName: 'Emirates',
      seatClass: 'First Class',
      departureCity: 'Dubai',
      departureTime: '2025-12-05 22:00',
      terminalAndGateInfo: 'Terminal 3, Gate 7',
      destinationCity: 'New York',
      destinationTime: '2024-12-06 06:00',
      flightDuration: '14h 0m',
      baggageAllowance: 'Unlimited',
      visa: false,
      inFlightServices: 'Gourmet Meals, Onboard Spa, Private Suites',
      reviews: [],
    },
    {
      id: 5,
      name: 'Qatar Airways Flight QR234',
      flightID: 'QR234',
      airlineName: 'Qatar Airways',
      seatClass: 'Economy',
      departureCity: 'Doha',
      departureTime: '2025-12-06 09:00',
      terminalAndGateInfo: 'Terminal 1, Gate 3',
      destinationCity: 'Paris',
      destinationTime: '2024-12-06 15:00',
      flightDuration: '6h 0m',
      baggageAllowance: '2 pieces, up to 23 kg each',
      visa: true,
      inFlightServices: 'Meals, Wi-Fi',
      reviews: [],
    },
    {
      id: 6,
      name: 'Singapore Airlines Flight SQ567',
      flightID: 'SQ567',
      airlineName: 'Singapore Airlines',
      seatClass: 'Premium Economy',
      departureCity: 'Singapore',
      departureTime: '2025-12-07 23:55',
      terminalAndGateInfo: 'Terminal 2, Gate 20',
      destinationCity: 'Sydney',
      destinationTime: '2024-12-08 09:25',
      flightDuration: '7h 30m',
      baggageAllowance: '2 pieces, up to 30 kg each',
      visa: true,
      inFlightServices: 'Meals, In-flight Entertainment, Extra Legroom',
      reviews: [],
    },
    {
      id: 7,
      name: 'Lufthansa Flight LH890',
      flightID: 'LH890',
      airlineName: 'Lufthansa',
      seatClass: 'Business',
      departureCity: 'Frankfurt',
      departureTime: '2025-12-08 13:45',
      terminalAndGateInfo: 'Terminal 1, Gate 9',
      destinationCity: 'Rome',
      destinationTime: '2024-12-08 15:45',
      flightDuration: '2h 0m',
      baggageAllowance: '2 pieces, up to 32 kg each',
      visa: true,
      inFlightServices: 'Meals, Lounge Access',
      reviews: [],
    },
    {
      id: 8,
      name: 'Air France Flight AF678',
      flightID: 'AF678',
      airlineName: 'Air France',
      seatClass: 'Economy',
      departureCity: 'Paris',
      departureTime: '2025-12-09 07:00',
      terminalAndGateInfo: 'Terminal 2E, Gate K',
      destinationCity: 'New York',
      destinationTime: '2024-12-09 10:00',
      flightDuration: '8h 0m',
      baggageAllowance: '2 pieces, up to 23 kg each',
      visa: true,
      inFlightServices: 'Meals, In-flight Entertainment',
      reviews: [],
    },
    {
      id: 9,
      name: 'United Airlines Flight UA345',
      flightID: 'UA345',
      airlineName: 'United Airlines',
      seatClass: 'Economy',
      departureCity: 'Chicago',
      departureTime: '2025-12-10 14:30',
      terminalAndGateInfo: 'Terminal 1, Gate C4',
      destinationCity: 'San Francisco',
      destinationTime: '2024-12-10 17:30',
      flightDuration: '4h 0m',
      baggageAllowance: '2 pieces, up to 23 kg each',
      visa: false,
      inFlightServices: 'Snacks, Wi-Fi',
      reviews: [],
    },
    {
      id: 10,
      name: 'Turkish Airlines Flight TK912',
      flightID: 'TK912',
      airlineName: 'Turkish Airlines',
      seatClass: 'Business',
      departureCity: 'Istanbul',
      departureTime: '2025-12-11 20:00',
      terminalAndGateInfo: 'Terminal 1, Gate B12',
      destinationCity: 'Singapore',
      destinationTime: '2024-12-12 10:00',
      flightDuration: '10h 0m',
      baggageAllowance: '2 pieces, up to 32 kg each',
      visa: false,
      inFlightServices: 'Premium Meals, Lounge Access, Wi-Fi',
      reviews: [],
    },
  ]);

  const [bookedFlights, setBookedFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);

  // Function to book a flight
  const bookFlight = (flightId) => {
    const flightToBook = availableFlights.find((flight) => flight.id === flightId);
    if (flightToBook) {
      setBookedFlights((prev) => [...prev, flightToBook]);
      setAvailableFlights((prev) => prev.filter((flight) => flight.id !== flightId));
    }
  };

  // Function to add a review
  const addReview = (flightId, reviewText) => {
    setBookedFlights((prevFlights) =>
      prevFlights.map((flight) =>
        flight.id === flightId
          ? { ...flight, reviews: [...flight.reviews, reviewText] }
          : flight
      )
    );
  };

  // Function to show flight details
  const showFlightDetails = (flightId) => {
    const flight = availableFlights.find((flight) => flight.id === flightId);
    setSelectedFlight(flight || null);
  };

  return (
    <FlightContext.Provider
      value={{
        availableFlights,
        bookedFlights,
        selectedFlight,
        bookFlight,
        addReview,
        showFlightDetails,
      }}
    >
      {children}
    </FlightContext.Provider>
  );
};

// Hook to use FlightContext
export const useFlightContext = () => {
  const context = useContext(FlightContext);
  if (!context) {
    throw new Error('useFlightContext must be used within a FlightProvider');
  }
  return context;
};


