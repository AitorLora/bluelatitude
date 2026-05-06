// ─────────────────────────────────────────
//  DATA — estado global de la app
// ─────────────────────────────────────────

let bookings = [
  { id:1, moto:'GTX-01', date:'2026-04-15', type:'2h', client:'García, M.',   amount:100, status:'done'      },
  { id:2, moto:'GTX-02', date:'2026-04-15', type:'4h', client:'Schmidt, K.',  amount:150, status:'done'      },
  { id:3, moto:'GTX-01', date:'2026-04-18', type:'2h', client:'López, A.',    amount:100, status:'done'      },
  { id:4, moto:'GTX-03', date:'2026-05-02', type:'8h', client:'Johnson, T.',  amount:250, status:'confirmed' },
  { id:5, moto:'GTX-04', date:'2026-05-10', type:'2h', client:'Martínez, P.', amount:100, status:'confirmed' },
  { id:6, moto:'GTX-02', date:'2026-07-20', type:'6h', client:'Rossi, L.',    amount:200, status:'pending'   },
];

let nextId = 10;

// Helpers
function getBookings()     { return bookings; }
function addBooking(b)     { bookings.push({ ...b, id: nextId++ }); }
function deleteBooking(id) { bookings = bookings.filter(b => b.id !== id); }
function cycleStatus(id) {
  const order = ['pending', 'confirmed', 'done'];
  bookings = bookings.map(b => {
    if (b.id !== id) return b;
    const i = order.indexOf(b.status);
    return { ...b, status: order[(i + 1) % 3] };
  });
}
