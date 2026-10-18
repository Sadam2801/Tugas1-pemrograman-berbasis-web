const btnAdd = document.getElementById("btnAdd");
const dialog = document.getElementById("stockDialog");
const closeBtn = document.getElementById("closeDialog");
const stockForm = document.getElementById("stockForm");
const stockTable = document.getElementById("stockTable");

// Render table
function renderTable() {
  stockTable.innerHTML = dataBahanAjar
    .map(
      (item) => `
      <tr>
        <td>${item.kodeBarang}</td>
        <td>${item.kodeLokasi}</td>
        <td>${item.namaBarang}</td>
        <td>${item.jenisBarang}</td>
        <td>${item.edisi}</td>
        <td>${item.stock}</td>
      </tr>
    `
    )
    .join("");
}

renderTable();

// Open modal
btnAdd.addEventListener("click", () => dialog.showModal());

// Close modal
closeBtn.addEventListener("click", () => dialog.close());

// Submit form
stockForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newItem = {
    kodeBarang: document.getElementById("kodeBarang").value.trim().toUpperCase(),
    kodeLokasi: document.getElementById("kodeLokasi").value.trim().toUpperCase(),
    namaBarang: document.getElementById("namaBarang").value.trim(),
    jenisBarang: document.getElementById("jenisBarang").value,
    edisi: document.getElementById("edisi").value.trim(),
    stock: parseInt(document.getElementById("stock").value, 10)
  };

  // Validasi
  if (!newItem.kodeBarang || !newItem.kodeLokasi || !newItem.namaBarang || !newItem.jenisBarang || !newItem.edisi) {
    alert('Semua kolom wajib diisi!');
    return;
  }
  if (Number.isNaN(newItem.stock) || newItem.stock < 0) {
    alert('Stock harus berupa angka dan tidak boleh negatif!');
    return;
  }
  if (dataBahanAjar.some((item) => item.kodeBarang === newItem.kodeBarang)) {
    alert(`Kode barang '${newItem.kodeBarang}' sudah terdaftar!`);
    return;
  }

  // Tambahkan ke data
  dataBahanAjar.push(newItem);

  // Render ulang table
  renderTable();

  // Reset form & tutup modal
  stockForm.reset();
  dialog.close();
  alert('Berhasil tambah stok!')
});
