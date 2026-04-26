// ==========================================
// CONTOH.JS - ADMIN PANEL ONLY (KOSONG AWAL)
// ==========================================

let daftarKomputer = [];
const NAMA_KOTAK = 'komputer_lab';

// SAAT HALAMAN SIAP
document.addEventListener('DOMContentLoaded', function() {
    siapinSemua();
    ambilData();  // AWAL KOSONG, TAPI CEK LOCALSTORAGE
    tampilkanSemua();
});

function siapinSemua() {
    window.tombolAdmin = document.getElementById('toggleForm');
    window.formTambah = document.getElementById('adminFormSection');
    window.galeri = document.getElementById('gallery');
    window.noData = document.getElementById('noData');
    window.formUtama = document.getElementById('inventoryForm');
    window.tombolCancel = document.getElementById('cancelForm');
    
    tombolAdmin.onclick = bukaTutupForm;
    tombolCancel.onclick = bukaTutupForm;
    
    // FORM SUBMIT
    formUtama.addEventListener('submit', function(e) {
        e.preventDefault();
        tambahKomputer();
    });
    
    // FILTER BUTTONS
    let filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.onclick = function() {
            let kategori = this.getAttribute('data-category');
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            tampilkanFilter(kategori);
        };
    });
}

// 🔥 HAPUS DATA CONTOH - AWAL KOSONG!
function ambilData() {
    let dataLama = localStorage.getItem(NAMA_KOTAK);
    if(dataLama) {
        daftarKomputer = JSON.parse(dataLama);
        console.log('📱 Data lama ditemukan:', daftarKomputer.length, 'komputer');
    } else {
        daftarKomputer = [];  // KOSONG!
        console.log('📭 Mulai kosong - tambahkan data pertama!');
    }
}

function simpanData() {
    localStorage.setItem(NAMA_KOTAK, JSON.stringify(daftarKomputer));
}

function bukaTutupForm() {
    if(formTambah.classList.contains('hidden')) {
        formTambah.classList.remove('hidden');
        tombolAdmin.innerHTML = '❌ Tutup Form';
    } else {
        formTambah.classList.add('hidden');
        tombolAdmin.innerHTML = '✨ Admin Panel';
    }
}

// TAMBAH KOMPUTER BARU
function tambahKomputer() {
    let nama = document.getElementById('deviceName').value.trim();
    let foto = document.getElementById('deviceImage').value.trim();
    let kategori = document.getElementById('category').value;
    let status = document.getElementById('status').value;
    
    if(!nama || !foto || !kategori || !status) {
        alert('❌ Lengkapi semua field!');
        return;
    }
    
    let komputerBaru = {
        id: Date.now(),
        nama: nama,
        foto: foto,
        kategori: kategori,
        status: status
    };
    
    daftarKomputer.unshift(komputerBaru);
    simpanData();
    formUtama.reset();
    tampilkanSemua();
    bukaTutupForm();
    
    alert('✅ ' + nama + ' ditambahkan!');
}

function hapusKomputer(id) {
    if(confirm('🗑️ Yakin hapus?')) {
        daftarKomputer = daftarKomputer.filter(k => k.id != id);
        simpanData();
        tampilkanSemua();
    }
}

function tampilkanFilter(filter) {
    let dataTampil = filter === 'all' ? 
        daftarKomputer : 
        daftarKomputer.filter(k => k.kategori === filter);
    
    if(dataTampil.length === 0) {
        galeri.innerHTML = '';
        noData.classList.remove('hidden');
        noData.innerHTML = '📭 Belum ada data. Tambahkan melalui Admin Panel!';
        return;
    }
    
    noData.classList.add('hidden');
    galeri.innerHTML = '';
    
    dataTampil.forEach(komputer => {
        let kartu = buatKartu(komputer);
        galeri.appendChild(kartu);
    });
}

function tampilkanSemua() {
    tampilkanFilter('all');
}

function buatKartu(komputer) {
    let div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
        <div style="position: relative;">
            <button onclick="hapusKomputer(${komputer.id})" 
                    style="position:absolute; top:10px; right:10px; background:#e74c3c; color:white; border:none; border-radius:50%; width:35px; height:35px; cursor:pointer; opacity:0; transition:0.3s;" 
                    onmouseover="this.style.opacity=1" 
                    onmouseout="this.style.opacity=0">🗑️</button>
            <img src="${komputer.foto}" class="card-image" onerror="this.src='https://picsum.photos/300/200?error'">
            <div class="card-content">
                <h3 class="card-title">${komputer.nama}</h3>
                <span class="card-category">${komputer.kategori}</span>
                <div class="card-status status-${komputer.status.toLowerCase()}">
                    📊 Status: <strong>${komputer.status}</strong>
                </div>
            </div>
        </div>
    `;
    return div;
}

// GLOBAL
window.hapusKomputer = hapusKomputer;
window.tambahKomputer = tambahKomputer;