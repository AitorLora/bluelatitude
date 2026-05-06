// ─────────────────────────────────────────
//  APP — navegación y arranque
// ─────────────────────────────────────────

function goPage(id, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  btn.classList.add('active');
  document.getElementById('fab').style.display = id === 'res' ? 'flex' : 'none';
  render();
}

function render() {
  renderKPIs();
  renderChart();
  renderMotos();
  renderBookings();
}

function toast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = 'position:fixed;bottom:90px;left:50%;transform:translateX(-50%);background:var(--blue-dark);color:white;padding:10px 20px;border-radius:20px;font-size:13px;font-weight:600;box-shadow:0 4px 16px rgba(0,0,0,0.2);z-index:999;';
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2000);
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('p-fecha').value = new Date().toISOString().split('T')[0];
  document.getElementById('f-fecha').value = new Date().toISOString().split('T')[0];
  populateMotoSelect();
  render();
});
