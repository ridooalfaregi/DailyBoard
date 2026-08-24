function simpanStorage() {
    localStorage.setItem("daftarTugas", JSON.stringify(daftarTugas));
}

function muatStorage() {
    const data = localStorage.getItem("daftarTugas");
    daftarTugas = data ? JSON.parse(data) : [];

    renderTugas();
}

const kepala = document.getElementById("header");


const app = document.getElementById("panggilan");
app.className = "satuan";

const tugas = document.createElement("section");
tugas.className = "bgtugas";
const JudulT = document.createElement("h3");
JudulT.className = "tugas";
JudulT.textContent = "Daftar Tugas";
const mode = document.createElement("button");
mode.textContent = "Dark Mode";
mode.id = "darkmode";
const konyol = document.createElement("article");
const inputTugas = document.createElement("input");
inputTugas.className = "Tugas";
const tombolTambah = document.createElement("button");
tombolTambah.className = "tmbh";
tombolTambah.textContent = "Tambah";

const ibuCantik = document.createElement("article");
ibuCantik.className =  "filter";
const semua = document.createElement("button");
semua.className = "smua";
semua.textContent = "Semua";
const selesai = document.createElement("button");
selesai.className = "beres";
selesai.textContent = "Selesai";
const belum = document.createElement("button");
belum.className = "acan";
belum.textContent = "Belum Selesai";

const capek = document.createElement("article");
capek.className = "capek";
const cari = document.createElement("input");
cari.className = "teang";
cari.id = "serch";
cari.placeholder = "Cari...";
const baganAtas = document.createElement("section");
const baganBawah = document.createElement("section");



app.appendChild(tugas);
kepala.appendChild(mode);

tugas.appendChild(JudulT);
capek.appendChild(cari);
capek.appendChild(konyol);
tugas.appendChild(capek)
tugas.appendChild(inputTugas);
tugas.appendChild(tombolTambah);

tugas.appendChild(konyol);
ibuCantik.appendChild(semua);
ibuCantik.appendChild(selesai);
ibuCantik.appendChild(belum);
tugas.appendChild(ibuCantik);


let daftarTugas = [
    { id: 1, nama: "Belajar JavaScript", selesai: false },
    { id: 2, nama: "Olahraga pagi", selesai: false },
];

let wadahDragDrop = null;

let nextId = 3;

inputTugas.addEventListener("input", (e) => {
    console.log("Input tugas:", e.target.value);
});

document.getElementById("serch").addEventListener("input", (e) => {
    const katKun = e.target.value.trim();
    const kaKu = katKun.toLowerCase();
    console.log(kaKu);
    
    const liAll = document.querySelectorAll("li");

    liAll.forEach(listTugas => {
        const ambilInfo = listTugas.firstChild.textContent.toLowerCase();
        if (ambilInfo.includes(kaKu)){
            listTugas.classList.remove("hide");
        }
        else {
            listTugas.classList.add("hide");
        }
        console.log(ambilInfo);        
    })

});

tombolTambah.addEventListener("click", () => {
    const namaTugas = inputTugas.value.trim();
    if (validasiInput(namaTugas)) {
        tambahTugas(namaTugas);
    }

    inputTugas.value = "";
});

semua.addEventListener("click", () => {
    renderTugas("semua");
});

selesai.addEventListener("click", () => {
    renderTugas("selesai");
});

belum.addEventListener("click", () => {
    renderTugas("belum");
});

muatStorage();

function tambahTugas(nama) {
    daftarTugas.push({ id: nextId, nama, selesai: false });
    renderTugas();
    nextId++;
    simpanStorage();
}

function hapsTugas(id) {
    daftarTugas = daftarTugas.filter((t) => t.id !== id);
    renderTugas();
    simpanStorage();
}

function toggleSelesai(id) {
    daftarTugas = daftarTugas.map((t) =>
        t.id === id ? { ...t, selesai: !t.selesai } : t
    );
    renderTugas();
    simpanStorage();
}

function editTugas(id, namaBaru) {
    daftarTugas = daftarTugas.map((t) =>
        t.id === id ? { ...t, nama: namaBaru } : t
    );
    renderTugas();
    simpanStorage();
}

function validasiInput(nilai) {
    if (nilai.trim() === "") {
        alert("Input tidak boleh kosong!");
        return false;
    }
    if (nilai.length > 100) {
        alert("Input maksimal 100 karakter!");
        return false;
    }
    return true;
}

function renderTugas(filter = "semua") {
    konyol.innerHTML = "";
    const list = document.createElement("ul");
    konyol.appendChild(list);

    const tugasTersaring = daftarTugas.filter((t) => {
        if (filter === "selesai") return t.selesai;
        if (filter === "belum") return !t.selesai;
        return true;
    });

    tugasTersaring.forEach((tugas) => {
        const li = document.createElement("li");
        li.textContent = tugas.nama;
        li.style.textDecoration = tugas.selesai ? "line-through" : "none";
        li.addEventListener("click", () => toggleSelesai(tugas.id));
        li.className = "list-tugas";

        const tombolHapus = document.createElement("button");
        tombolHapus.textContent = "Hapus";
        tombolHapus.addEventListener("click", () => hapsTugas(tugas.id));

        const tombolEdit = document.createElement("button");
        tombolEdit.textContent = "Edit";
        tombolEdit.addEventListener("click", () => {
            const namaBaru = prompt("Masukkan nama tugas baru:", tugas.nama);
            if (validasiInput(namaBaru)) {
                editTugas(tugas.id, namaBaru);
            }
        });

        console.log(li.firstChild.textContent);

        li.appendChild(tombolHapus);
        li.appendChild(tombolEdit);
        list.appendChild(li);

        li.setAttribute("draggable", true);


        li.addEventListener("dragstart", ()=> {
            wadahDragDrop = li;
            console.log(wadahDragDrop);
        })
    });
    list.addEventListener("dragover", (e) => e.preventDefault() );
    list.addEventListener("drop", (e) => {
        e.preventDefault();
        const tempat = e.target.closest("li");

        console.log (tempat)

        if (wadahDragDrop !== tempat){
            tempat.before(wadahDragDrop);
        }
    })
}


renderTugas();




function simpanCatatan() {
    localStorage.setItem("catatan", JSON.stringify(cttan));
}

function muatCatatan() {
    const data = localStorage.getItem("catatan");
    cttan = data ? JSON.parse(data) : [];

    renderCatatan();
}

//catatan
const catatan = document.createElement("section");
catatan.className = "catatan";
const JudulC = document.createElement("h3");
JudulC.textContent = "Catatan";
const konyol2 = document.createElement("article");
const inputCatatan = document.createElement("textarea");
const tombolTambah2 = document.createElement("button");
tombolTambah2.textContent = "Tambah";

app.appendChild(catatan);
catatan.appendChild(JudulC);
catatan.appendChild(inputCatatan);
catatan.appendChild(tombolTambah2);
catatan.appendChild(konyol2);

// mulai
let cttan = []; 

inputCatatan.addEventListener("input", (e) => {
    console.log(e.target.value);
});

for (const catatan of cttan) {
    console.log(catatan.isi);
}
    

tombolTambah2.addEventListener("click", () => {
    const namaCatatan = inputCatatan.value.trim();
    if (validasiCatatan(namaCatatan)) {
        tambahCatatan(namaCatatan);
    }
    inputCatatan.value = "";
});

muatCatatan();

function tambahCatatan(isi) {
    cttan.push({ id: Date.now(), isi, tanggal: new Date().toLocaleDateString()});
    simpanCatatan();
    renderCatatan();
}

function hapusCatatan(id) {
    cttan = cttan.filter((c) => c.id !== id);
    renderCatatan();
    simpanCatatan();
}

function editCatatan(id, isiBaru) {
    cttan = cttan.map((c) =>
        c.id === id ? { ...c, isi: isiBaru } : c
    );
    simpanCatatan();
    renderCatatan();
}

function validasiCatatan(nilai) {
    if (nilai.trim() === "") {
        alert("Catatan tidak boleh kosong!");
        return false;
    }   
    return true;
}

function renderCatatan() {
    konyol2.innerHTML = "";
    
    cttan.forEach((catatan) => {
        const div = document.createElement("div");
        div.className = "catatan-item";
        div.innerHTML = `<p>${catatan.isi}</p><small>${catatan.tanggal}</small>`;
        const tombolHapus = document.createElement("button");
        tombolHapus.textContent = "Hapus";
        tombolHapus.addEventListener("click", () => hapusCatatan(catatan.id));
        div.appendChild(tombolHapus);
        
        const tombolEdit = document.createElement("button");
        tombolEdit.textContent = "Edit";
        tombolEdit.addEventListener("click", () => {  
            const isiBaru = prompt("Masukkan isi catatan baru:", catatan.isi);
            if (validasiCatatan(isiBaru)) {
                editCatatan(catatan.id, isiBaru);
            }
        });
        div.appendChild(tombolEdit);
        konyol2.appendChild(div);
    }); 
}

const bagianCuaca = document.createElement("section");
bagianCuaca.className = "cuaca";

const bagianKutipan = document.createElement("section")
bagianKutipan.className = "kutip";

const tuisan = document.createElement("article");
tuisan.className = "kutipan";
const JudulKutip = document.createElement("h3");
const simpanKutip = document.createElement("p")
const refresh = document.createElement("button")
refresh.textContent = "\u21BB";
JudulKutip.textContent = "Kutipan Harian";
tuisan.appendChild(JudulKutip);
tuisan.appendChild(simpanKutip);
tuisan.appendChild(refresh);
bagianKutipan.appendChild(tuisan);
refresh.addEventListener("click", () => ambilKutiopan());

async function ambilKutiopan() {
    try {
        const res = await fetch("https://motivational-spark-api.vercel.app/api/quotes/random");
        const data = await res.json();
        
        simpanKutip.textContent = data.quote;
    } catch(error) {
        console.log("Gagal mengambil kutipan:", error);
    }
}
ambilKutiopan();

const kota = document.createElement("input");
const city = document.createElement("button");
const weather = document.createElement("article");
weather.className = "Weather";
const judulWeather = document.createElement("h3");
judulWeather.textContent = "Cuaca";
const simpanWeather = document.createElement("h3");
const cerah = document.createElement("div");
bagianCuaca.appendChild(weather);
weather.appendChild(judulWeather);
weather.appendChild(kota);
weather.appendChild(city);
weather.appendChild(simpanWeather);
weather.appendChild(cerah);


city.textContent = "Tambah";
city.addEventListener("click", () => {
    cuaca(kota.value.trim())
    console.log(kota.value.trim());
});


const variable = kota.value.trim();
async function cuaca(kota){
    const apiKey = "18841e293493445a30cd12b4f150c108";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${kota}&appid=${apiKey}&units=metric`;

    try{
        const res = await fetch(url);
        if (!res.ok) throw new Error("Kota tidak ditemukan");
        const data = await res.json();

        cerah.innerHTML = `
            <p>${data.name}, ${data.main.temp}°C</p>
            <p>${data.weather[0].description}</p>
        `;
    } catch (error){
        cerah.innerHTML = error.message;
    }
}

 async function semuaKutipan(){
     document.getElementById("status").textContent = "Memuat Data...";
     await Promise.all(ambilKutiopan(), cuaca("Jakarta"));
     document.getElementById("status").textContent = "Data Berhasil dimuat";
 }
 window.addEventListener("DOMContentLoaded", semuaKutipan);


const toggleTema = document.getElementById("darkmode");
toggleTema.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const modeAktif = document.body.classList.contains("dark-mode");
    localStorage.setItem("tema", modeAktif ? "gelap" : "terang") 
});

window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("tema") === "gelap") {
        document.body.classList.add("dark-mode");
    }
});

baganAtas.appendChild(tugas);
baganAtas.className = "warnaAtas";
baganAtas.appendChild(bagianCuaca);
baganBawah.appendChild(catatan);
baganBawah.className = "warnaBawah";
baganBawah.appendChild(bagianKutipan);

app.appendChild(baganAtas);
app.appendChild(baganBawah);
