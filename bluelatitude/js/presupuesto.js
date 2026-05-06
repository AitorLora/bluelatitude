// ─────────────────────────────────────────
//  PRESUPUESTO
// ─────────────────────────────────────────

let sH = 2, sM = 1, waMsg = '', aiMsg = '';

function selH(h, el) {
  el.closest('.sel-grid-4').querySelectorAll('.sel-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  sH = h;
}

function selM(n, el) {
  el.closest('.sel-grid-4').querySelectorAll('.sel-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  sM = n;
}

function calcular() {
  const fecha  = document.getElementById('p-fecha').value;
  const hora   = document.getElementById('p-hora').value;
  const nombre = document.getElementById('p-nombre').value.trim();

  const precioUnit = CONFIG.precios[sH + 'h'];
  const total      = precioUnit * sM;
  const fianza     = CONFIG.fianza * sM;
  const fechaStr   = fecha
    ? new Date(fecha + 'T12:00:00').toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'fecha por confirmar';

  document.getElementById('r-total').textContent = '€' + total;
  document.getElementById('r-desc').textContent  = `${sM} moto${sM > 1 ? 's' : ''} · ${sH} horas${nombre ? ' · ' + nombre : ''}`;
  document.getElementById('r-fianza').textContent = '€' + fianza;

  document.getElementById('r-breakdown').innerHTML = `
    <div class="brow"><span class="bl">Tarifa ${sH}h × ${sM} unidad${sM > 1 ? 'es' : ''}</span><span class="bv">€${precioUnit} × ${sM}</span></div>
    <div class="brow"><span class="bl">Combustible</span><span class="bv">Cliente</span></div>
    <div class="brow"><span class="bl">Fecha</span><span class="bv">${fechaStr}</span></div>
    <div class="brow"><span class="bl">Salida</span><span class="bv">${hora}</span></div>
    <div class="brow" style="margin-top:4px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.2);">
      <span class="bl">Total</span><span class="bv" style="font-size:16px;">€${total}</span>
    </div>`;

  waMsg = `Hola${nombre ? ' ' + nombre : ''}! 🌊\n\nTu presupuesto ${CONFIG.negocio}:\n\n🛥 ${sM} moto${sM > 1 ? 's' : ''} Sea-Doo GTX\n⏱ ${sH} horas\n📅 ${fechaStr} a las ${hora}\n⛽ Combustible a tu cargo\n\n💶 *Total: €${total}*\n🔒 Fianza: €${fianza} (reembolsable)\n\nResponde para confirmar. ¡Te esperamos! ⚓`;

  document.getElementById('btn-wa').href = `https://wa.me/${CONFIG.whatsapp}?text=` + encodeURIComponent(waMsg);
  document.getElementById('result-box').style.display = 'block';
  document.getElementById('result-box').scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  generarIA(nombre, fechaStr, hora, total, fianza);
}

async function generarIA(nombre, fecha, hora, total, fianza) {
  const box    = document.getElementById('ai-box');
  const bubble = document.getElementById('ai-bubble');
  box.style.display = 'block';
  bubble.textContent = 'Generando mensaje personalizado...';

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `Eres el asistente de ${CONFIG.negocio}, alquiler de motos de agua en ${CONFIG.ubicacion}. Genera un mensaje de WhatsApp breve y cálido para: cliente=${nombre || 'cliente'}, ${sM} moto${sM > 1 ? 's' : ''}, ${sH}h, fecha=${fecha}, hora=${hora}, total=€${total}, fianza=€${fianza} reembolsable, combustible a cargo del cliente. Máximo 100 palabras. Solo el mensaje.`
        }]
      })
    });
    const data = await res.json();
    aiMsg = data.content?.map(b => b.text || '').join('') || '';
    bubble.textContent = aiMsg;
  } catch (e) {
    bubble.textContent = 'Error al generar el mensaje.';
  }
}

function copiarMsg() { navigator.clipboard.writeText(waMsg); toast('Mensaje copiado ✓'); }
function copiarIA()  { navigator.clipboard.writeText(aiMsg); toast('Mensaje IA copiado ✓'); }
