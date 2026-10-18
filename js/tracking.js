const form = document.getElementById("searchForm");
const doInput = document.getElementById("doInput");
const feedback = document.getElementById("feedback");
const dialog = document.getElementById("trackingDialog");
const dialogContent = document.getElementById("trackingContent");
const closeBtn = document.getElementById("closeDialog");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nomorDO = doInput.value.trim().toUpperCase();
  const data = trackingData.find((item) => item.nomorDO === nomorDO);

  dialogContent.innerHTML = "";
  feedback.textContent = "";
  feedback.style.color = "";

  if (!nomorDO) {
    feedback.style.color = "red";
    feedback.textContent = "⚠️ Masukkan nomor Delivery Order terlebih dahulu.";
    return;
  }

  if (!data) {
    feedback.style.color = "red";
    feedback.textContent = `❌ Data dengan nomor DO '${nomorDO}' tidak ditemukan.`;
    return;
  }

  showTrackingResult(data);
  form.reset();
});

function showTrackingResult(data) {
  const { nomorDO, kurir, resi, jenis_paket, progress, total_paid, tanggal_pengiriman, mahasiswa, status, estimasi_sampai, history } = data;
  const statusColor = progress === 100 ? "var(--success)" : "var(--primary)";

  dialogContent.innerHTML = `
    <div class="tracking-card animate-fade-in">
      <h3>📦 Nomor DO: ${nomorDO}</h3>
      <p><strong>Nama Mahasiswa:</strong> ${mahasiswa.nama}</p>
      <p>${mahasiswa.alamat}</p>
      <p>📞 ${mahasiswa.telepon}</p>
      <hr>
      <p><strong>Status Pengiriman:</strong> <span style="color:${statusColor}; font-weight:600;">${status}</span></p>
      <progress value="${progress}" max="100" style="width:100%; accent-color:${statusColor};"></progress>
      <p class="hint small" style="text-align:right;">${progress}%</p>
      <hr>
      <p><strong>Ekspedisi:</strong> ${kurir} (Resi: ${resi})</p>
      <p><strong>Tanggal Kirim:</strong> ${tanggal_pengiriman}</p>
      <p><strong>Estimasi Tiba:</strong> ${estimasi_sampai}</p>
      <p><strong>Jenis Paket:</strong> ${jenis_paket}</p>
      <p><strong>Total Pembayaran:</strong> Rp ${total_paid.toLocaleString("id-ID")}</p>
      <h4>Riwayat Pengiriman:</h4>
      <ul class="timeline">
        ${history
          .map(
            (h, i) => `
          <li class="${i === history.length - 1 ? "active" : ""}">
            <div class="time">${h.tanggal}</div>
            <div class="detail">
              <strong>${h.lokasi}</strong><br>
              ${h.keterangan}
            </div>
          </li>`
          )
          .join("")}
      </ul>
    </div>
  `;

  dialog.showModal();
}

// Tombol close
closeBtn.addEventListener("click", () => dialog.close());

// Tutup dialog ketika klik area luar
dialog.addEventListener("click", (e) => {
  const rect = dialog.getBoundingClientRect();
  if (
    e.clientX < rect.left ||
    e.clientX > rect.right ||
    e.clientY < rect.top ||
    e.clientY > rect.bottom
  ) {
    dialog.close();
  }
});
