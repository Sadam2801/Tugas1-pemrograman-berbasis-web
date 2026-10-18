

const trackingData = [
  {
    nomorDO: "DO2025001",
    resi: "JNE1234567890",
    jenis_paket: "Reguler",
    progress: 75,
    kurir: "JNE Express",
    tanggal_pengiriman:'2025-10-30',
    total_paid: 180000,
    mahasiswa: {
      nama: "Andi Saputra",
      alamat: "Jl. Melati No. 45, Depok, Jawa Barat",
      telepon: "081234567890",
    },
    status: "Sedang dikirim",
    estimasi_sampai: "2025-11-02",
    history: [
      { 
        tanggal: "2025-10-30 08:15",
        lokasi: "Jakarta Gateway",
        keterangan: "Paket diterima di gudang pusat Jakarta",
      },
      {
        tanggal: "2025-10-30 14:40",
        lokasi: "Jakarta Gateway",
        keterangan: "Paket sedang diproses untuk pengiriman ke Depok",
      },
      {
        tanggal: "2025-10-31 07:30",
        lokasi: "Depok Hub",
        keterangan: "Paket telah tiba di Depok",
      },
      {
        tanggal: "2025-10-31 10:45",
        lokasi: "Depok",
        keterangan: "Kurir sedang mengantarkan paket ke alamat tujuan",
      },
    ],
  },
  {
    nomorDO: "DO2025002",
    resi: "JNT9988776655",
    jenis_paket: "Express",
    progress: 100,
    kurir: "J&T Express",
    tanggal_pengiriman:'2025-10-30',
    total_paid: 230000,
    mahasiswa: {
      nama: "Siti Rahmawati",
      alamat: "Perum Bumi Asri Blok C3 No.2, Bogor",
      telepon: "082112345678",
    },
    status: "Sudah diterima",
    estimasi_sampai: "2025-10-31",
    history: [
      {
        tanggal: "2025-10-29 09:00",
        lokasi: "Surabaya Gateway",
        keterangan: "Paket diterima di gudang pusat Surabaya",
      },
      {
        tanggal: "2025-10-30 05:30",
        lokasi: "Cikarang Hub",
        keterangan: "Paket transit di gudang Cikarang",
      },
      {
        tanggal: "2025-10-30 14:00",
        lokasi: "Bogor Hub",
        keterangan: "Paket telah tiba di Bogor",
      },
      {
        tanggal: "2025-10-31 09:20",
        lokasi: "Bogor",
        keterangan: "Paket telah diterima oleh penerima",
      },
    ],
  },
  {
    nomorDO: "DO2025003",
    resi: "SICEPAT11223344",
    jenis_paket: "Reguler",
    progress: 60,
    kurir: "SiCepat Ekspres",
    tanggal_pengiriman:'2025-10-30',
    total_paid: 120000,
    mahasiswa: {
      nama: "Budi Santoso",
      alamat: "Jl. Kenanga No.12, Bandung",
      telepon: "081345678912",
    },
    status: "Dalam perjalanan ke Bandung",
    estimasi_sampai: "2025-11-01",
    history: [
      {
        tanggal: "2025-10-29 07:00",
        lokasi: "Yogyakarta Hub",
        keterangan: "Paket diterima di gudang Yogyakarta",
      },
      {
        tanggal: "2025-10-30 10:00",
        lokasi: "Bandung Gateway",
        keterangan: "Paket sedang transit di Bandung Gateway",
      },
      {
        tanggal: "2025-10-31 09:30",
        lokasi: "Bandung",
        keterangan: "Kurir sedang menuju alamat penerima",
      },
    ],
  },
];

const dataUsers = [
  {
    email:'admin@gmail.com',
    password:'Password123',
    name: 'adam'
  },
  {
    email:'adminatang@gmail.com',
    password:'Password123',
    name: 'Atang'
  },
]

const dataBahanAjar = [
  {
    kodeBarang: "BA001",
    kodeLokasi: "LOC01",
    namaBarang: "Matematika Dasar",
    jenisBarang: "Buku",
    edisi: "Edisi 1",
    stock: 10
  },
  {
    kodeBarang: "BA002",
    kodeLokasi: "LOC02",
    namaBarang: "Bahasa Indonesia",
    jenisBarang: "Buku",
    edisi: "Edisi 2",
    stock: 5
  },
  {
    kodeBarang: "BA003",
    kodeLokasi: "LOC01",
    namaBarang: "Fisika Dasar",
    jenisBarang: "Buku",
    edisi: "Edisi 3",
    stock: 8
  }
];
