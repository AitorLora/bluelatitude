// ─────────────────────────────────────────
//  DASHBOARD
// ─────────────────────────────────────────

function renderKPIs() {
  const done = bookings.filter(b => b.status === 'done').reduce((s, b) => s + b.amount, 0);
  const proj = bookings.reduce((s, b) => s + b.amount, 0);

  document.getElementById('kpi-grid').innerHTML = [
    { label: 'Cobrado',    value: '€' + done,        sub: 'completadas',    color: '#2a8a4a'         },
    { label: 'Proyectado', value: '€' + proj,        sub: 'todas',          color: 'var(--blue)'     },
    { label: 'Reservas',   value: bookings.length,   sub: 'temporada',      color: '#a06020'         },
    { label: 'Unidades',   value: CONFIG.motos.length + '/' + CONFIG.motos.length,
                                                       sub: 'Sea-Doo GTX',   color: 'var(--blue-dark)'},
  ].map(k => `
    <div class="kpi">
      <div class="kpi-label">${k.label}</div>
      <div class="kpi-value" style="color:${k.color}">${k.value}</div>
      <div class="kpi-sub">${k.sub}</div>
    </div>`).join('');
}

function renderChart() {
  const byM = {};
  CONFIG.mesesKeys.forEach(m => { byM[m] = { done: 0, proj: 0 }; });
  bookings.forEach(b => {
    const m = b.date.slice(5, 7);
    if (byM[m]) {
      byM[m].proj += b.amount;
      if (b.status === 'done') byM[m].done += b.amount;
    }
  });
  const max = Math.max(...CONFIG.mesesKeys.map(m => byM[m].proj), 1);

  document.getElementById('chart').innerHTML = CONFIG.mesesKeys.map((m, i) => {
    const p = byM[m].proj, d = byM[m].done;
    const hp = (p / max) * 85;
    const hd = p > 0 ? (d / p) * hp : 0;
    return `<div class="bar-col">
      <div class="bar-amt">${p ? '€' + p : '—'}</div>
      <div class="bar-outer" style="height:${Math.max(hp, 4)}px;">
        <div class="bar-inner" style="height:${hd}px;"></div>
      </div>
      <div class="bar-lbl">${CONFIG.meses[i]}</div>
    </div>`;
  }).join('');
}

function renderMotos() {
  const bm = {};
  CONFIG.motos.forEach(m => { bm[m] = { rev: 0, trips: 0 }; });
  bookings.forEach(b => {
    if (bm[b.moto]) { bm[b.moto].rev += b.amount; bm[b.moto].trips++; }
  });
  const maxR = Math.max(...CONFIG.motos.map(m => bm[m].rev), 1);

  document.getElementById('moto-bars').innerHTML = CONFIG.motos.map(m => `
    <div class="moto-row">
      <div class="moto-name">${m}</div>
      <div class="moto-bar-bg">
        <div class="moto-bar-fill" style="width:${(bm[m].rev / maxR) * 100}%"></div>
      </div>
      <div class="moto-rev">€${bm[m].rev}</div>
      <div class="moto-trips">${bm[m].trips} sal.</div>
    </div>`).join('');
}
