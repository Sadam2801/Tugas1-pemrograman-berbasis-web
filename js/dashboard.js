// ====== Cek login ======
const user = JSON.parse(localStorage.getItem('user'));
if (!user) {
  alert('Silakan login terlebih dahulu.');
  window.location.href = 'index.html';
}

// ====== Greeting berdasarkan waktu lokal ======
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Selamat pagi";
  if (hour < 15) return "Selamat siang";
  if (hour < 18) return "Selamat sore";
  return "Selamat malam";
}

const userName = user ? user.name : '';
document.getElementById("greeting").textContent = `${getGreeting()}, ${userName}!`;
document.getElementById("userName").textContent = userName;
document.getElementById("userAvatar").textContent = userName.charAt(0);

// ====== Jam & tanggal lokal ======
const clock = document.getElementById("clock");
function updateClock() {
  clock.textContent = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}
updateClock();
setInterval(updateClock, 1000);

document.getElementById("todayDate").textContent = new Date().toLocaleDateString("id-ID", {
  weekday: "long", day: "numeric", month: "long", year: "numeric"
});

// ====== Statistik dari data dummy ======
const selesai = trackingData.filter(d => d.progress === 100).length;
document.getElementById("statBahanAjar").textContent = dataBahanAjar.length;
document.getElementById("statDikirim").textContent = trackingData.length - selesai;
document.getElementById("statSelesai").textContent = selesai;

// ====== Render Table ======
function renderTable(headers, rows, footer = "") {
  const headerRow = headers.map(h => `<th>${h}</th>`).join("");
  const bodyRows = rows
    .map(r => `<tr>${r.map(v => `<td>${v}</td>`).join("")}</tr>`)
    .join("");
  return `<table>
    <thead><tr>${headerRow}</tr></thead>
    <tbody>${bodyRows}</tbody>
    ${footer ? `<tfoot>${footer}</tfoot>` : ""}
  </table>`;
}

const formatRupiah = (value) => `Rp ${value.toLocaleString("id-ID")}`;

// ====== Isi laporan ======
const reports = {
  monitoring: {
    title: "Monitoring Progress DO Bahan Ajar",
    render: () => renderTable(
      ["Nomor DO", "Nama Mahasiswa", "Ekspedisi", "Status", "Progress"],
      trackingData.map(d => [
        d.nomorDO,
        d.mahasiswa.nama,
        d.kurir,
        d.status,
        `<progress value="${d.progress}" max="100"></progress> ${d.progress}%`
      ])
    )
  },
  rekap: {
    title: "Rekap Bahan Ajar",
    render: () => {
      const totalStock = dataBahanAjar.reduce((sum, item) => sum + item.stock, 0);
      return renderTable(
        ["Kode Barang", "Kode Lokasi", "Nama Barang", "Jenis Barang", "Edisi", "Stock"],
        dataBahanAjar.map(item => [item.kodeBarang, item.kodeLokasi, item.namaBarang, item.jenisBarang, item.edisi, item.stock]),
        `<tr><td colspan="5">Total Stock</td><td>${totalStock}</td></tr>`
      );
    }
  },
  histori: {
    title: "Histori Transaksi Bahan Ajar",
    render: () => {
      const totalBayar = trackingData.reduce((sum, d) => sum + d.total_paid, 0);
      return renderTable(
        ["Nomor DO", "Tanggal Kirim", "Nama Mahasiswa", "Jenis Paket", "Total Pembayaran"],
        trackingData.map(d => [d.nomorDO, d.tanggal_pengiriman, d.mahasiswa.nama, d.jenis_paket, formatRupiah(d.total_paid)]),
        `<tr><td colspan="4">Total</td><td>${formatRupiah(totalBayar)}</td></tr>`
      );
    }
  }
};

// ====== Modal laporan ======
const reportDialog = document.getElementById("reportDialog");
const reportTitle = document.getElementById("reportTitle");
const reportContent = document.getElementById("reportContent");

function openReport(name) {
  const report = reports[name];
  reportTitle.textContent = report.title;
  reportContent.innerHTML = report.render();
  setLaporanOpen(false);
  reportDialog.showModal();
}

document.querySelectorAll(".report-btn").forEach(btn => {
  btn.addEventListener("click", () => openReport(btn.dataset.report));
});

document.getElementById("closeReport").addEventListener("click", () => reportDialog.close());

// ====== Submenu Laporan ======
const laporanToggle = document.getElementById("laporanToggle");
const laporanSubmenu = document.getElementById("laporanSubmenu");

function setLaporanOpen(open) {
  laporanSubmenu.hidden = !open;
  laporanToggle.setAttribute("aria-expanded", String(open));
}

laporanToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  setLaporanOpen(laporanSubmenu.hidden);
});

// Tutup dropdown ketika klik di luar atau tekan Escape
document.addEventListener("click", (e) => {
  if (!laporanSubmenu.contains(e.target)) setLaporanOpen(false);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setLaporanOpen(false);
});

//HANDLE LOGOUT BUTTON
const btnLogout = document.getElementById('btn-logout')
btnLogout.addEventListener('click',(e)=>{
  localStorage.removeItem('user')
  window.location.href = 'index.html'
})
