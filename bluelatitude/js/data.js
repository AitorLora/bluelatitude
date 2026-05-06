// ─────────────────────────────────────────
//  SUPABASE — conexión a base de datos real
// ─────────────────────────────────────────

const SUPABASE_URL = 'https://aescddtowduorhejsleu.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlc2NkZHRvd2R1b3JoZWpzbGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwODMxNDgsImV4cCI6MjA5MzY1OTE0OH0.YU73Nq273n8_UWUkl68FMOpsKd89k-Tf1BcLoRrqm-k';

const HEADERS = {
  'Content-Type': 'application/json',
  'apikey': SUPABASE_KEY,
  'Authorization': 'Bearer ' + SUPABASE_KEY,
};

// Estado local
let bookings = [];

// ── LEER todas las reservas ──
async function loadBookings() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/reservas?select=*&order=date.asc`, {
      headers: HEADERS,
    });
    bookings = await res.json();
    render();
  } catch (e) {
    console.error('Error cargando reservas:', e);
  }
}

// ── AÑADIR reserva ──
async function addBooking(b) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/reservas`, {
      method: 'POST',
      headers: { ...HEADERS, 'Prefer': 'return=representation' },
      body: JSON.stringify({
        moto:   b.moto,
        date:   b.date,
        type:   b.type,
        client: b.client,
        amount: b.amount,
        status: b.status,
      }),
    });
    const data = await res.json();
    bookings.push(data[0]);
    render();
  } catch (e) {
    console.error('Error añadiendo reserva:', e);
  }
}

// ── ELIMINAR reserva ──
async function deleteBooking(id) {
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/reservas?id=eq.${id}`, {
      method: 'DELETE',
      headers: HEADERS,
    });
    bookings = bookings.filter(b => b.id !== id);
    render();
  } catch (e) {
    console.error('Error eliminando reserva:', e);
  }
}

// ── CAMBIAR estado ──
async function cycleStatus(id) {
  const order = ['pending', 'confirmed', 'done'];
  const booking = bookings.find(b => b.id === id);
  if (!booking) return;

  const newStatus = order[(order.indexOf(booking.status) + 1) % 3];

  try {
    await fetch(`${SUPABASE_URL}/rest/v1/reservas?id=eq.${id}`, {
      method: 'PATCH',
      headers: { ...HEADERS, 'Prefer': 'return=representation' },
      body: JSON.stringify({ status: newStatus }),
    });
    bookings = bookings.map(b => b.id === id ? { ...b, status: newStatus } : b);
    render();
  } catch (e) {
    console.error('Error actualizando estado:', e);
  }
}
