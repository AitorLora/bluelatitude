// ─────────────────────────────────────────
//  RESERVAS
// ─────────────────────────────────────────

function renderBookings() {
  const done = bookings.filter(b => b.status === 'done').reduce((s, b) => s + b.amount, 0);
  const proj = bookings.reduce((s, b) => s + b.amount, 0);

  document.getElementById('sum-cobrado').textContent    = '€' + done;
  document.getElementById('sum-proyectado').textContent = '€' + proj;
  document.getElementById('sum-count').textContent      = bookings.length;

  const statusClass = { done: 'status-done', confirmed: 'status-confirmed', pending: 'status-pending' };
  const statusLabel = { done: 'Completada',  confirmed: 'Confirmada',       pending: 'Pendiente'      };
  const sorted = [...bookings].sort((a, b) => a.date.localeCompare(b.date));

  document.getElementById('booking-list').innerHTML = sorted.map(b => `
    <div class="res-item">
      <div class="res-top">
        <div style="display:flex;align-items:center;gap:10px;">
          <div class="res-moto">${b.moto}</div>
          <div style="font-size:11px;color:var(--text-muted);">${b.date.slice(5)} · ${b.type}</div>
        </div>
        <div class="res-amount">€${b.amount}</div>
      </div>
      <div class="res-bottom">
        <div class="res-client">${b.client}</div>
        <div style="display:flex;align-items:center;gap:8px;">
          <span class="status-pill ${statusClass[b.status]}" onclick="cycleStatus(${b.id});render();">
            ${statusLabel[b.status]}
          </span>
          <span style="font-size:16px;color:var(--text-muted);cursor:pointer;" onclick="deleteBooking(${b.id});render();">×</span>
        </div>
      </div>
    </div>`).join('');
}

// FORM
function openForm()  { document.getElementById('form-overlay').classList.add('open'); }

function closeFormIfBg(e) {
  if (e.target === document.getElementById('form-overlay'))
    document.getElementById('form-overlay').classList.remove('open');
}

function saveBooking() {
  const date   = document.getElementById('f-fecha').value;
  const client = document.getElementById('f-client').value.trim();
  if (!date || !client) { alert('Rellena fecha y cliente'); return; }

  const type = document.getElementById('f-type').value;
  addBooking({
    moto:   document.getElementById('f-moto').value,
    date, type, client,
    amount: CONFIG.precios[type],
    status: document.getElementById('f-status').value,
  });

  document.getElementById('f-fecha').value  = '';
  document.getElementById('f-client').value = '';
  document.getElementById('form-overlay').classList.remove('open');
  render();
}

// Populate moto select dynamically
function populateMotoSelect() {
  const sel = document.getElementById('f-moto');
  sel.innerHTML = CONFIG.motos.map(m => `<option>${m}</option>`).join('');
}
