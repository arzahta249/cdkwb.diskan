'use client';

import React, { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Leaf, TreePine, Droplets, Globe, Users, BarChart3, 
  ChevronRight, ChevronLeft, Wind, Sun, Shield, ArrowRight, 
  Eye, X, Target, Layers, MapPin, Calendar, CheckCircle2,
  Check, Phone, AlertTriangle, Search
} from 'lucide-react';
import Link from 'next/link';

const useInView = (threshold = 0.15) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, isVisible] as const;
};

const stats = [
  { value: '125.000+', unit: 'Bibit', label: 'Realisasi Ditanam', icon: <Leaf className="w-5 h-5" />, rotate: '-rotate-1' },
  { value: '48', unit: 'Ha', label: 'Lahan Terehabilitasi', icon: <Globe className="w-5 h-5" />, rotate: 'rotate-1' },
  { value: '250.000', unit: 'Bibit', label: 'Target Rehabilitasi 2029', icon: <Target className="w-5 h-5" />, isTarget: true, rotate: '-rotate-1 -translate-y-2' },
  { value: '85%', unit: '', label: 'Tingkat Kelulusan Hidup', icon: <BarChart3 className="w-5 h-5" />, rotate: 'rotate-1' },
  { value: '12', unit: 'Desa', label: 'Desa Pesisir Binaan', icon: <Users className="w-5 h-5" />, rotate: '-rotate-1' },
];

const stages = [
  {
    number: '01',
    title: 'Survei & Perencanaan',
    desc: 'Identifikasi lokasi degradasi mangrove, analisis kondisi substrat, dan perencanaan zonasi penanaman berdasarkan jenis spesies yang cocok.',
    offset: 'translate-y-0',
  },
  {
    number: '02',
    title: 'Pembibitan',
    desc: 'Pengembangan bibit mangrove di persemaian lokal yang dikelola masyarakat, melibatkan petani mangrove terlatih untuk menjaga kualitas bibit.',
    offset: 'lg:translate-y-6',
  },
  {
    number: '03',
    title: 'Penanaman',
    desc: 'Penanaman dilakukan secara sistematis dengan jarak tanam optimal, menggunakan metode tabela (tanam benih langsung) dan transplantasi bibit.',
    offset: 'translate-y-0',
  },
  {
    number: '04',
    title: 'Monitoring & Pemeliharaan',
    desc: 'Pemantauan pertumbuhan, penyulaman tanaman yang mati, dan evaluasi berkala setiap 3 bulan untuk memastikan keberhasilan program.',
    offset: 'lg:translate-y-6',
  },
];

const plantingTechniques = [
  {
    number: '01',
    title: 'Metode Guludan & Bronjong Bambu (APO)',
    badge: 'Zona Berombak Tinggi & Pantai Terbuka',
    badgeStyle: 'bg-emerald-100/80 text-emerald-900 border-emerald-300',
    desc: 'Pemasangan konstruksi Alat Pemecah Ombak (APO) berbahan bambu/kayu yang diisi ranting atau batu untuk menstabilkan lumpur dan meredam energi gelombang sebelum penanaman bibit.',
    keunggulan: 'Melindungi bibit muda dari hanyut dan mempercepat penumpukan sedimen pantai alami.',
    spesiesCocok: 'Avicennia marina & Rhizophora apiculata',
    jarakTanam: '1 × 1 meter atau 1 × 2 meter',
  },
  {
    number: '02',
    title: 'Metode Tabela (Tanam Benih Langsung / Propagul)',
    badge: 'Zona Substrat Lumpur Lunak Tenang',
    badgeStyle: 'bg-teal-100/80 text-teal-900 border-teal-300',
    desc: 'Penanaman langsung buah propagul mangrove matang ke dalam lumpur sedalam sepertiga panjang buah saat surut terendah tanpa melalui proses persemaian polybag.',
    keunggulan: 'Efisien dalam biaya dan tenaga kerja, sistem perakaran tunjang tumbuh lebih kuat mencengkeram substrat asli.',
    spesiesCocok: 'Rhizophora apiculata & Bruguiera gymnorrhiza',
    jarakTanam: '1 × 1 meter',
  },
  {
    number: '03',
    title: 'Metode Transplantasi Bibit Polybag',
    badge: 'Lahan Terdegradasi Berat & Pasir Berlumpur',
    badgeStyle: 'bg-amber-100/80 text-amber-900 border-amber-300',
    desc: 'Bibit dipelihara di persemaian lokal selama 3–4 bulan hingga berdaun 4–6 helai, lalu ditanam di lokasi dengan ajir bambu penopang dan ikatan tali ijuk.',
    keunggulan: 'Tingkat kelulusan hidup (survival rate) sangat tinggi (>85%) karena bibit telah memiliki perakaran kuat.',
    spesiesCocok: 'Sonneratia caseolaris, Ceriops tagal, & Rhizophora',
    jarakTanam: '2 × 2 meter',
  },
  {
    number: '04',
    title: 'Metode Rumpun Berjarak (Cluster Planting)',
    badge: 'Mitigasi Angin Kencang & Ekowisata',
    badgeStyle: 'bg-sky-100/80 text-sky-900 border-sky-300',
    desc: 'Penanaman berkelompok rapat (3–5 bibit per titik rumpun) dengan jarak antar rumpun 2–3 meter untuk menciptakan formasi perlindungan saling menopang.',
    keunggulan: 'Mempercepat penutupan tajuk kanopi dan menciptakan mikroklimat yang kondusif bagi fauna pesisir.',
    spesiesCocok: 'Semua Spesies Mangrove Sejati',
    jarakTanam: '3–5 bibit/titik, antar titik 2.5 meter',
  },
];

const plantingData = [
  {
    lokasi: 'Muara Sambong',
    wilayah: 'Kabupaten Batang',
    luas: '14.5 Ha',
    bibit: '38.000 Bibit',
    target: '50.000 Bibit',
    spesies: 'Rhizophora apiculata & Sonneratia caseolaris',
    survival: '88%',
    tahun: '2019–2024',
    status: 'Pemeliharaan & Pengayaan',
  },
  {
    lokasi: 'Pantai Sigandu & Klidang Lor',
    wilayah: 'Kabupaten Batang',
    luas: '12.0 Ha',
    bibit: '32.500 Bibit',
    target: '60.000 Bibit',
    spesies: 'Avicennia marina & Bruguiera gymnorrhiza',
    survival: '86%',
    tahun: '2018–2024',
    status: 'Konservasi & Ekowisata',
  },
  {
    lokasi: 'Pesisir Ujungnegoro & Roban',
    wilayah: 'Kabupaten Batang',
    luas: '9.2 Ha',
    bibit: '24.000 Bibit',
    target: '45.000 Bibit',
    spesies: 'Rhizophora apiculata & Ceriops tagal',
    survival: '82%',
    tahun: '2021–2024',
    status: 'Pemantauan Rutin',
  },
  {
    lokasi: 'Muara Wonokerto & Api-Api',
    wilayah: 'Kabupaten Pekalongan',
    luas: '8.3 Ha',
    bibit: '20.500 Bibit',
    target: '55.000 Bibit',
    spesies: 'Avicennia marina & Rhizophora apiculata',
    survival: '84%',
    tahun: '2020–2024',
    status: 'Pengendalian Abrasi & Rob',
  },
  {
    lokasi: 'Kawasan Konservasi Karang Jeruk',
    wilayah: 'Kabupaten Tegal / Batang',
    luas: '4.0 Ha',
    bibit: '10.000 Bibit',
    target: '40.000 Bibit',
    spesies: 'Bruguiera gymnorrhiza & Avicennia marina',
    survival: '85%',
    tahun: '2022–2024',
    status: 'Zona Inti Konservasi',
  },
];

const targetsByYear = [
  {
    periode: 'TAHUN 2025',
    targetBibit: '40.000 Bibit',
    targetLuas: '15 Ha',
    fokus: 'Restorasi Muara Wonokerto & Pantai Sigandu',
    status: 'Tahap Persiapan Pembibitan',
  },
  {
    periode: 'TAHUN 2026',
    targetBibit: '50.000 Bibit',
    targetLuas: '18 Ha',
    fokus: 'Penguatan Sabuk Hijau Ujungnegoro & Roban Timur',
    status: 'Perencanaan Zonasi',
  },
  {
    periode: 'TAHUN 2027–2029',
    targetBibit: '160.000 Bibit',
    targetLuas: '67 Ha',
    fokus: 'Koridor Hijau Pesisir Terpadu Batang–Pekalongan',
    status: 'Rencana Strategis Jangka Panjang',
    isHighlight: true,
  },
];

const benefits = [
  {
    icon: <Shield className="w-7 h-7 text-[#72d499]" />,
    title: 'Perlindungan Pantai',
    desc: 'Mangrove berfungsi sebagai sabuk hijau yang melindungi garis pantai dari abrasi, gelombang tinggi, dan intrusi air laut.',
  },
  {
    icon: <Droplets className="w-7 h-7 text-[#72d499]" />,
    title: 'Penyerap Karbon',
    desc: 'Hutan mangrove mampu menyerap karbon 4–5 kali lebih efisien dibanding hutan tropis daratan, berkontribusi pada mitigasi perubahan iklim.',
  },
  {
    icon: <Leaf className="w-7 h-7 text-[#72d499]" />,
    title: 'Habitat Biota',
    desc: 'Akar mangrove menyediakan tempat berlindung dan memijah bagi ikan, kepiting, udang, dan berbagai biota pesisir yang bernilai ekonomi.',
  },
  {
    icon: <Users className="w-7 h-7 text-[#72d499]" />,
    title: 'Pemberdayaan Masyarakat',
    desc: 'Program melibatkan nelayan lokal sebagai pengelola, membuka lapangan kerja hijau dan meningkatkan pendapatan masyarakat pesisir.',
  },
  {
    icon: <Wind className="w-7 h-7 text-[#72d499]" />,
    title: 'Pemecah Angin',
    desc: 'Vegetasi mangrove yang lebat berperan sebagai windbreaker alami yang melindungi pemukiman dan tambak dari angin kencang musim barat.',
  },
  {
    icon: <Sun className="w-7 h-7 text-[#72d499]" />,
    title: 'Ekowisata',
    desc: 'Hutan mangrove yang pulih membuka peluang ekowisata berbasis komunitas — jelajah mangrove, wisata edukasi, dan spot fotografi alam.',
  },
];

export interface MangrovePhoto {
  url: string;
  label: string;
  type: 'flower' | 'grown';
  desc: string;
}

export interface MangroveSpecies {
  id: string;
  name: string;
  local: string;
  family: string;
  habitat: string;
  zonasi: string;
  rootType: string;
  photos: MangrovePhoto[];
  summary: string;
  ciriKhas: string[];
  manfaat: string[];
  sebaran: string;
  tinggi: string;
  iucnStatus: string;
  fenologi: string;
  morfologi: string;
  ancaman: string[];
  klasifikasi: { ordo: string; famili: string; genus: string; };
}

export const MANGROVE_SPECIES: MangroveSpecies[] = [
  {
    id: 'rhizophora-apiculata',
    name: 'Rhizophora apiculata',
    local: 'Bakau Kurap / Bakau Minyak',
    family: 'Rhizophoraceae',
    habitat: 'Zona intertidal tengah hingga bawah yang tergenang pasang surut reguler',
    zonasi: 'Zona Tengah (Intertidal)',
    rootType: 'Akar Tunjang (Stilt Roots)',
    photos: [
      {
        url: '/leading/mangroves/Rhizophora-flowers.jpg',
        label: 'Bunga & Buah (Propagul)',
        type: 'flower',
        desc: 'Bunga berkelopak 4 kekuningan dengan buah silindris (propagul) panjang mencapai 20–40 cm yang siap jatuh tegak lurus ke lumpur.'
      },
      {
        url: '/leading/mangroves/rhizophora-apiculata.jpg',
        label: 'Pohon Dewasa & Akar Tunjang',
        type: 'grown',
        desc: 'Pohon mangrove dewasa dengan formasi akar tunjang melengkung rapat yang kokoh menahan gempuran ombak pesisir.'
      }
    ],
    summary: 'Spesies mangrove utama dengan sistem perakaran tunjang masif, menjadi pilar terpenting penahan abrasi dan perangkap sedimen lumpur pesisir.',
    ciriKhas: [
      'Akar tunjang kokoh bercabang banyak keluar dari batang bawah hingga 1–2 meter di atas permukaan lumpur.',
      'Daun elips tebal mengkilap dengan bintik hitam halus di permukaan bawah daun.',
      'Propagul silindris cokelat-kehijauan siap tumbuh mandiri setelah lepas dari pohon induk.'
    ],
    manfaat: [
      'Peredam energi ombak dan penahan abrasi paling tangguh.',
      'Penjebak sedimen lumpur untuk memperluas daratan pesisir secara alami.',
      'Tempat memijah dan mencari makan kepiting bakau (Scylla serrata) dan ikan bandeng.'
    ],
    sebaran: 'Muara Sambong Batang, Pesisir Ujungnegoro, Pantai Claket, & Muara Wonokerto.',
    tinggi: 'Hingga 30 meter',
    iucnStatus: 'Least Concern (LC) — IUCN Red List',
    fenologi: 'Berbunga sepanjang tahun; puncak propagul Mei–Oktober',
    morfologi: 'Pohon berukuran besar dengan batang tegak berdiameter hingga 50 cm, berkulit kayu abu-abu gelap kehitaman beralur kasar. Daun elips memanjang (10–14 × 5–7 cm), tebal berkulit, mengkilap hijau tua di atas dan lebih pucat dengan bintik-bintik kelenjar hitam di bawah. Bunga tersusun di ketiak daun, berkelopak 4 berwarna putih kekuningan. Propagul silindris cokelat-kehijauan sepanjang 20–40 cm menggantung dari ranting sebelum jatuh tegak lurus ke substrat lumpur untuk berkecambah secara vivipar.',
    ancaman: [
      'Konversi lahan menjadi tambak udang intensif dan permukiman pesisir',
      'Penebangan liar untuk kayu bakar, arang, dan bahan bangunan pesisir',
      'Sedimentasi berlebih akibat erosi dari hulu Daerah Aliran Sungai',
      'Pencemaran minyak dan limbah domestik dari muara sungai'
    ],
    klasifikasi: { ordo: 'Rhizophorales', famili: 'Rhizophoraceae', genus: 'Rhizophora' }
  },
  {
    id: 'avicennia-marina',
    name: 'Avicennia marina',
    local: 'Api-api Putih',
    family: 'Acanthaceae',
    habitat: 'Zona supratidal & intertidal luar, memiliki toleransi salinitas sangat tinggi',
    zonasi: 'Zona Terluar / Garis Depan Pantai',
    rootType: 'Akar Napas (Pneumatophores)',
    photos: [
      {
        url: '/leading/mangroves/avicennia-marina.jpeg',
        label: 'Bunga & Daun',
        type: 'flower',
        desc: 'Bunga majemuk kecil berwarna oranye cerah kekuningan dengan daun berlapis kelenjar garam di bagian bawah.'
      },
      {
        url: '/leading/mangroves/avicennia-marina-grown.jpg',
        label: 'Pohon Dewasa & Hamparan Akar Napas',
        type: 'grown',
        desc: 'Pohon api-api dewasa dengan ribuan akar pensil menyembul ke permukaan lumpur untuk mengambil oksigen saat pasang.'
      }
    ],
    summary: 'Spesies pionir sejati yang berada di garis terdepan pantai, mampu hidup pada kadar garam ekstrem dan mengekskresikan garam berlebih lewat daun.',
    ciriKhas: [
      'Akar napas pensil (pneumatofora) tegak lurus mencuat 10–30 cm di atas permukaan lumpur.',
      'Permukaan bawah daun berwarna putih keperakan dan terasa asin bila disentuh karena butiran kristal garam.',
      'Bunga harum berukuran kecil berwarna jingga kekuningan yang sangat disukai lebah madu mangrove.'
    ],
    manfaat: [
      'Stabilisasi lumpur lunak di garis terdepan pantai terbuka.',
      'Biofilter polutan dan perangkap logam berat dari perairan muara.',
      'Daun dan bunganya mendukung budidaya lebah madu mangrove pesisir.'
    ],
    sebaran: 'Pantai Sigandu, Pantai Celong, Pesisir Pekalongan Utara, dan Laguna Roban.',
    tinggi: 'Hingga 14 meter',
    iucnStatus: 'Least Concern (LC) — IUCN Red List',
    fenologi: 'Berbunga Maret–Juni; buah masak Juli–September',
    morfologi: 'Pohon atau perdu dengan batang berlekuk berdiameter hingga 30 cm, berkulit kayu abu-abu terang kecokelatan. Daun tebal berdaging berbentuk elips-oval (4–9 × 2–5 cm), permukaan atas hijau mengkilap, permukaan bawah putih keperakan bertekstur halus — terasa asin bila dijilat karena kelenjar garam aktif yang mengekskresikan NaCl berlebih.',
    ancaman: [
      'Reklamasi pantai untuk kawasan industri dan pengembangan pelabuhan',
      'Peningkatan salinitas ekstrem akibat musim kemarau panjang dan perubahan iklim',
      'Serangan hama penggerek batang dan ulat daun mangrove',
      'Pencemaran logam berat dari limbah industri di muara sungai'
    ],
    klasifikasi: { ordo: 'Lamiales', famili: 'Acanthaceae', genus: 'Avicennia' }
  },
  {
    id: 'sonneratia-caseolaris',
    name: 'Sonneratia caseolaris',
    local: 'Pedada / Bogem / Pidada',
    family: 'Lythraceae',
    habitat: 'Zona intertidal atas, tepi muara sungai dan perairan dengan pengaruh air tawar cukup tinggi',
    zonasi: 'Zona Estuari / Tepi Sungai',
    rootType: 'Akar Napas Kerucut (Cone Roots)',
    photos: [
      {
        url: '/leading/mangroves/sonneratia-caseolaris-bulbjpg.jpg',
        label: 'Kuncup Bunga & Buah Pedada',
        type: 'flower',
        desc: 'Bunga mekar malam hari berbenang sari merah cerah lebat dengan buah bulat pipih berujung lancip berasa asam segar.'
      },
      {
        url: '/leading/mangroves/sonneratia-caseolaris-grown.jpg',
        label: 'Pohon Dewasa & Kanopi Rindang',
        type: 'grown',
        desc: 'Pohon besar mencapai ketinggian 15–20 meter dengan akar napas kerucut kokoh dan kanopi lebat tempat kunang-kunang bersarang.'
      }
    ],
    summary: 'Mangrove pohon besar berkanopi rindang dengan buah berasa asam segar yang kaya vitamin C dan dapat diolah menjadi sirup serta dodol mangrove oleh UMKM binaan.',
    ciriKhas: [
      'Akar napas berbentuk kerucut tumpul besar dan kokoh terbuat dari kayu lunak gabus.',
      'Bunga mekar sempurna saat senja/malam dengan benang sari merah marun mencolok.',
      'Buah berbentuk bulat pipih menyerupai roda dengan kelopak bintang membungkus pangkalnya.'
    ],
    manfaat: [
      'Buah dapat diolah menjadi produk bernilai ekonomi tinggi (Sirup Pedada, Dodol Mangrove).',
      'Pohon peneduh utama yang menjadi habitat hidup kunang-kunang dan burung pemakan buah.',
      'Menjaga tebing muara sungai dari erosi aliran air tawar.'
    ],
    sebaran: 'Sepanjang bantaran Muara Sambong, Hutan Mangrove Klidang Lor, & Sungai Kupang Pekalongan.',
    tinggi: 'Hingga 20 meter',
    iucnStatus: 'Least Concern (LC) — IUCN Red List',
    fenologi: 'Berbunga nokturnal (senja–tengah malam); buah tersedia sepanjang tahun',
    morfologi: 'Pohon besar berkanopi lebar dengan batang berdiameter hingga 80 cm dan kulit kayu putih keabuan yang khas. Daun berbentuk elips lebar (5–11 × 3–7 cm) berwarna hijau cerah mengkilap, duduk bersilangan. Akar napas berbentuk kerucut tumpul besar dan keras menyembul dari tanah lunak di sekeliling pohon.',
    ancaman: [
      'Penebangan untuk kayu bakar dan arang berkualitas tinggi',
      'Konversi lahan menjadi tambak udang intensif dan kolam ikan',
      'Penurunan populasi kelelawar penyerbuk utama nokturnal',
      'Banjir rob berkepanjangan yang merusak perakaran'
    ],
    klasifikasi: { ordo: 'Myrtales', famili: 'Lythraceae', genus: 'Sonneratia' }
  },
  {
    id: 'bruguiera-gymnorrhiza',
    name: 'Bruguiera gymnorrhiza',
    local: 'Tancang / Lindur / Putut',
    family: 'Rhizophoraceae',
    habitat: 'Zona intertidal tengah hingga pedalaman, substrat lumpur padat dengan sedikit genangan air tawar',
    zonasi: 'Zona Tengah - Pedalaman',
    rootType: 'Akar Lutut (Knee Roots)',
    photos: [
      {
        url: '/leading/mangroves/Bruguiera gymnorrhiza-bulb.jpg',
        label: 'Bunga Merah & Propagul',
        type: 'flower',
        desc: 'Bunga tunggal merah tua menyala dengan kelopak tebal 10–14 cuping dan propagul berbentuk silinder bersudut.'
      },
      {
        url: '/leading/mangroves/Bruguiera-roots-grown.jpg',
        label: 'Pohon Dewasa & Akar Lutut',
        type: 'grown',
        desc: 'Pohon tinggi berbatang gelap dengan susunan akar lutut melengkung dramatis keluar masuk permukaan tanah berlumpur.'
      }
    ],
    summary: 'Mangrove hutan daratan pantai dengan kayu berkualitas tinggi, bunga merah berkarakter kuat, dan buah propagul yang memiliki kandungan karbohidrat alternatif.',
    ciriKhas: [
      'Sistem perakaran lutut (knee roots) yang melengkung naik turun menyerupai lutut ditekuk.',
      'Bunga berwarna merah tua kontras dengan kelopak kaku berbentuk mahkota bintang.',
      'Propagul berwarna hijau gelap kecokelatan dengan permukaan bergaris memanjang.'
    ],
    manfaat: [
      'Buah lindur dapat diolah sebagai sumber karbohidrat dan tepung olahan alternatif.',
      'Struktur akar mengikat sedimen padat di zona peralihan air laut ke air tawar.',
      'Ekstrak kulit dan daun mengandung senyawa antioksidan dan antibakteri alami.'
    ],
    sebaran: 'Kawasan Konservasi Karang Jeruk, Pesisir Kuripan Subah, & Hutan Mangrove Pantai Sigandu.',
    tinggi: 'Hingga 30 meter',
    iucnStatus: 'Least Concern (LC) — IUCN Red List',
    fenologi: 'Berbunga Agustus–November; propagul matang Desember–Maret',
    morfologi: 'Pohon besar dengan batang lurus berdiameter hingga 60 cm, berkulit kayu cokelat gelap beralur dangkal. Daun elips lonjong (10–16 × 5–8 cm), hijau tua mengkilap di atas, lebih pucat di bawah. Sistem akar lutut (knee roots) terbentuk dari akar horizontal yang melengkung naik-turun menembus permukaan tanah berulang kali.',
    ancaman: [
      'Penebangan untuk kayu konstruksi dan perkapalan tradisional',
      'Ekstraksi kulit kayu berlebihan sebagai bahan penyamak industri',
      'Perubahan hidrologi akibat pembangunan tanggul rob dan tambak',
      'Kompetisi ekologis dengan spesies invasif nipah di zona pedalaman'
    ],
    klasifikasi: { ordo: 'Malpighiales', famili: 'Rhizophoraceae', genus: 'Bruguiera' }
  },
  {
    id: 'ceriops-tagal',
    name: 'Ceriops tagal',
    local: 'Tengar / Palun / Tingi',
    family: 'Rhizophoraceae',
    habitat: 'Zona intertidal atas berdrainase baik, substrat lumpur berpasir atau tanah liat berkapur',
    zonasi: 'Zona Daratan Pesisir / Atas',
    rootType: 'Akar Papan / Banir Rendah (Buttress Roots)',
    photos: [
      {
        url: '/leading/mangroves/Ceriops tagal-bulb.jpg',
        label: 'Bunga & Buah Menggantung',
        type: 'flower',
        desc: 'Bunga putih kecil bergerombol dengan buah berbentuk kerucut dan propagul ramping yang menggantung vertikal.'
      },
      {
        url: '/leading/mangroves/Ceriops tagal-grown.jpg',
        label: 'Pohon Dewasa & Formasi Kanopi',
        type: 'grown',
        desc: 'Pohon berukuran sedang dengan pangkal batang berbanir tipis dan daun hijau kekuningan mengkilap yang tahan terpaan angin laut.'
      }
    ],
    summary: 'Spesies mangrove penghasil bahan pewarna alami (tanin tingi) legendaris untuk kain Batik pesisir Pekalongan dan pengawet alami jaring nelayan tradisional.',
    ciriKhas: [
      'Akar banir (papan) pendek berlekuk di pangkal batang disertai tonjolan akar lutut kecil.',
      'Daun berwarna hijau kekuningan cerah mengilap dengan tepi agak melengkung ke bawah.',
      'Propagul ramping panjang 15–25 cm dengan leher kelopak yang melengkung ke atas.'
    ],
    manfaat: [
      'Kulit kayu kaya tanin untuk pewarna cokelat alami kain Batik Pekalongan-Batang.',
      'Penguat jaring tradisional nelayan agar lebih awet dan tahan pembusukan air laut.',
      'Menstabilkan lapisan tanah pesisir berpasir dari erosi angin dan hempasan badai.'
    ],
    sebaran: 'Kawasan Pantai Batang Timur, Teluk Ujungnegoro, & Zona Penyangga Roban.',
    tinggi: 'Hingga 10 meter',
    iucnStatus: 'Least Concern (LC) — IUCN Red List',
    fenologi: 'Berbunga Mei–Agustus; propagul matang September–Januari',
    morfologi: 'Pohon atau perdu berukuran sedang dengan batang berdiameter 10–20 cm, berkulit kayu cokelat kemerahan sangat kaya tanin dan bernilai industri tinggi. Daun berbentuk obovate (5–9 × 3–5 cm), hijau kekuningan mengkilap, tepi sedikit melengkung ke bawah.',
    ancaman: [
      'Pemanenan kulit kayu berlebihan untuk industri pewarna batik tradisional',
      'Degradasi substrat berpasir akibat erosi angin dan gelombang musim barat',
      'Gangguan penyerbukan akibat hilangnya serangga polinator alami',
      'Perambahan habitat oleh aktivitas wisata yang tidak terkontrol'
    ],
    klasifikasi: { ordo: 'Malpighiales', famili: 'Rhizophoraceae', genus: 'Ceriops' }
  }
];

export default function RehabilitasiMangrovePage() {
  const [heroRef, heroVisible] = useInView(0.1);
  const [statsRef, statsVisible] = useInView(0.1);
  const [aboutRef, aboutVisible] = useInView(0.1);
  const [stagesRef, stagesVisible] = useInView(0.1);
  const [techniquesRef, techniquesVisible] = useInView(0.1);
  const [benefitsRef, benefitsVisible] = useInView(0.1);
  const [dataRef, dataVisible] = useInView(0.1);
  const [speciesRef, speciesVisible] = useInView(0.1);

  // Mangrove card interactive slideshow states
  const [cardPhotoIndex, setCardPhotoIndex] = useState<Record<string, number>>({});
  const [selectedSpecies, setSelectedSpecies] = useState<MangroveSpecies | null>(null);
  const [modalPhotoIdx, setModalPhotoIdx] = useState<number>(0);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedSpecies(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync modal photo index when species opened
  useEffect(() => {
    if (selectedSpecies) {
      setModalPhotoIdx(cardPhotoIndex[selectedSpecies.id] || 0);
    }
  }, [selectedSpecies, cardPhotoIndex]);

  // Hero automatic slideshow state
  const heroSlides = [
    { url: '/leading/mangrove hero1.jpeg', alt: 'Rehabilitasi Hutan Mangrove CDKWB 1' },
    { url: '/leading/mangrove-hero2.jpeg', alt: 'Rehabilitasi Hutan Mangrove CDKWB 2' },
  ];
  const [heroSlideIdx, setHeroSlideIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlideIdx((prev) => (prev + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const handlePrevPhoto = (speciesId: string, totalPhotos: number) => {
    setCardPhotoIndex((prev) => {
      const current = prev[speciesId] || 0;
      const nextIdx = current === 0 ? totalPhotos - 1 : current - 1;
      return { ...prev, [speciesId]: nextIdx };
    });
  };

  const handleNextPhoto = (speciesId: string, totalPhotos: number) => {
    setCardPhotoIndex((prev) => {
      const current = prev[speciesId] || 0;
      const nextIdx = (current + 1) % totalPhotos;
      return { ...prev, [speciesId]: nextIdx };
    });
  };

  return (
    <div className="min-h-screen bg-[#fafcfb] text-[#1b3426] flex flex-col selection:bg-[#74c69d] selection:text-[#0b2416]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        .font-display {
          font-family: 'Big Shoulders Display', sans-serif;
        }
      `}</style>

      <Navbar />

      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-[#122b1e] via-[#1a3829] to-[#0f241a] overflow-hidden pt-8 pb-32">
        {/* Background Subtle Dot Pattern */}
        <div 
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '6px 6px' }}
        />
        
        {/* Organic Glowing Shape */}
        <div 
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-[38%_62%_55%_45%/45%_40%_60%_55%] bg-[#2d6a4f]/30 blur-3xl pointer-events-none"
        />

        <div ref={heroRef} className="relative z-10 container mx-auto px-6 max-w-7xl pt-6">
          {/* Breadcrumbs */}
          <div
            className="flex items-center gap-2 text-emerald-200/60 text-xs sm:text-sm mb-12 transition-all duration-700"
            style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(20px)' }}
          >
            <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
            <span>›</span>
            <span className="text-emerald-200/80">Konservasi</span>
            <span>›</span>
            <span className="text-emerald-100 font-semibold">Rehabilitasi Mangrove</span>
          </div>

          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div
              className="transition-all duration-700 delay-100"
              style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(30px)' }}
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-[#a7f3d0] text-xs font-extrabold tracking-wider uppercase mb-6 shadow-sm">
                <Leaf className="w-3.5 h-3.5 text-[#52b788]" />
                Program Konservasi Pesisir
              </div>

              <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-[84px] leading-[0.95] text-white tracking-tight mb-6">
                Rehabilitasi<br />
                <span className="text-[#74c69d]">Hutan Mangrove</span>
              </h1>

              <p className="text-emerald-100/80 text-base sm:text-lg leading-relaxed max-w-xl mb-10">
                Program rehabilitasi mangrove CDKWB untuk memulihkan ekosistem pesisir yang terdegradasi, melindungi garis pantai, dan memberdayakan masyarakat nelayan di wilayah Batang dan Pekalongan.
              </p>

              <div className="flex flex-wrap gap-3">
                {['125.000+ Bibit Ditanam', '48 Ha Lahan Rehabilitasi', '12 Desa Terlibat'].map((tag, i) => (
                  <div 
                    key={i} 
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-xs sm:text-sm font-bold"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#52b788] shrink-0" />
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual Image Blob (Enlarged by 15% with 3s Slideshow) */}
            <div
              className="relative transition-all duration-700 delay-200 lg:h-[530px] flex items-center justify-center"
              style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(30px)' }}
            >
              <div className="relative w-full max-w-[510px] aspect-square rounded-[58%_42%_40%_60%/50%_55%_45%_50%] overflow-hidden shadow-2xl shadow-black/50 border-2 border-white/10 bg-[#1b4332]">
                {heroSlides.map((slide, idx) => (
                  <img
                    key={idx}
                    src={slide.url}
                    alt={slide.alt}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
                      heroSlideIdx === idx 
                        ? 'opacity-100 scale-100 z-10' 
                        : 'opacity-0 scale-105 pointer-events-none z-0'
                    }`}
                  />
                ))}

                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/20 pointer-events-none z-10" />

                {/* Slide Indicator Dots */}
                <div className="absolute bottom-5 right-6 flex items-center gap-1.5 z-20 pointer-events-none">
                  {heroSlides.map((_, idx) => (
                    <span
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-500 shadow-sm ${
                        heroSlideIdx === idx ? 'w-6 bg-[#74c69d]' : 'w-2 bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Floating Stat Badge */}
              <div className="absolute -bottom-4 sm:bottom-4 -left-2 sm:left-2 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-xl border border-emerald-100 flex items-center gap-3.5 z-30">
                <div className="w-11 h-11 rounded-xl bg-[#d8f3dc] flex items-center justify-center text-[#2d6a4f] shrink-0">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <div>
                  <div className="font-display font-extrabold text-2xl text-[#0b2416] leading-tight">
                    85%
                  </div>
                  <div className="text-xs text-slate-500 font-bold">
                    Kelulusan Hidup
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Ocean Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none overflow-hidden leading-none">
          <svg
            className="relative block w-full h-[50px] sm:h-[80px]"
            viewBox="0 0 1440 90"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,45 C 280,95 420,5 720,45 C 1020,85 1160,5 1440,45 L1440,90 L0,90 Z"
              fill="#eef8f2"
            />
          </svg>
        </div>
      </section>

      {/* ── STATS CARDS (STAGGERED ROTATED DESIGN) ── */}
      <section className="bg-[#eef8f2] px-6 pb-20 pt-2 relative z-30">
        <div
          ref={statsRef}
          className="container mx-auto max-w-7xl -mt-16 sm:-mt-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5"
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className={`rounded-2xl p-5 sm:p-6 shadow-xl transition-all duration-500 hover:rotate-0 hover:-translate-y-2 flex flex-col justify-between ${s.rotate} ${
                s.isTarget
                  ? 'bg-[#1b4332] text-white shadow-[#1b4332]/25 relative overflow-hidden border border-white/10'
                  : 'bg-white text-[#1b3426] border border-emerald-100/80 shadow-emerald-950/10'
              }`}
              style={{
                opacity: statsVisible ? 1 : 0,
                transform: statsVisible ? undefined : 'translateY(30px)',
                transitionDelay: `${i * 90}ms`,
              }}
            >
              {s.isTarget && (
                <div className="absolute top-0 right-0 bg-[#74c69d] text-[#081c10] text-[10px] font-extrabold uppercase px-3 py-0.5 rounded-bl-xl tracking-wider">
                  Target
                </div>
              )}
              
              <div>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${
                  s.isTarget ? 'bg-white/15 text-[#a7f3d0]' : 'bg-[#e8f7ee] text-[#2d6a4f]'
                }`}>
                  {s.icon}
                </div>
                
                <div className={`font-display font-extrabold text-3xl sm:text-4xl leading-none mb-1 ${
                  s.isTarget ? 'text-white' : 'text-[#0b2416]'
                }`}>
                  {s.value}
                  {s.unit && <span className="font-sans text-sm sm:text-base font-bold ml-1.5 opacity-80">{s.unit}</span>}
                </div>
              </div>

              <div className={`text-xs sm:text-sm font-bold leading-tight mt-2 ${
                s.isTarget ? 'text-emerald-200/90' : 'text-slate-500'
              }`}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── ABOUT PROGRAM SECTION ── */}
        <div ref={aboutRef} className="container mx-auto max-w-7xl mt-20 pt-4">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-center">
            {/* Left Dark Highlight Card */}
            <div
              className="bg-[#1b4332] rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-2xl shadow-[#1b4332]/30 border border-white/10 transition-all duration-700"
              style={{ opacity: aboutVisible ? 1 : 0, transform: aboutVisible ? 'translateY(0)' : 'translateY(30px)' }}
            >
              <div className="absolute -top-20 -left-20 w-48 h-48 rounded-full bg-[#52b788]/20 blur-2xl" />
              
              <div className="relative z-10 space-y-6">
                <div>
                  <div className="font-display font-extrabold text-5xl sm:text-6xl text-[#74c69d] leading-none">
                    125.000+
                  </div>
                  <p className="text-sm sm:text-base font-bold text-emerald-100/90 mt-2">
                    bibit mangrove ditanam sejak 2018
                  </p>
                </div>

                <div className="h-px bg-white/15 w-full" />

                <div>
                  <div className="font-display font-extrabold text-5xl sm:text-6xl text-[#74c69d] leading-none">
                    48 Ha
                  </div>
                  <p className="text-sm sm:text-base font-bold text-emerald-100/90 mt-2">
                    lahan pesisir terdegradasi dipulihkan
                  </p>
                </div>
              </div>
            </div>

            {/* Right Text Description */}
            <div
              className="transition-all duration-700 delay-100"
              style={{ opacity: aboutVisible ? 1 : 0, transform: aboutVisible ? 'translateY(0)' : 'translateY(30px)' }}
            >
              <span className="inline-block bg-[#d8f3dc] text-[#1b4332] text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
                Tentang Program
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#0b2416] leading-[1.05] mb-6">
                Mengembalikan Sabuk Hijau Pesisir
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
                Degradasi hutan mangrove di pesisir Jawa Tengah telah menyebabkan abrasi yang mengancam pemukiman, tambak, dan infrastruktur pesisir. CDKWB merespons dengan program rehabilitasi mangrove skala besar yang menggabungkan pendekatan ekologis, sosial, dan ekonomi secara terpadu.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Sejak 2018, program ini telah menanam lebih dari 125.000 bibit mangrove dari berbagai spesies asli di 48 hektare lahan terdegradasi, dengan target pencapaian 250.000 bibit pada 2029 serta melibatkan 12 desa pesisir sebagai mitra aktif dalam pengelolaan dan pemantauan kawasan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS / TAHAPAN PROGRAM ── */}
      <section className="bg-gradient-to-b from-[#24523d] via-[#1b4332] to-[#132e22] text-white py-24 px-6 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)', backgroundSize: '6px 6px' }}
        />

        <div ref={stagesRef} className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-[#a7f3d0] text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
              Tahapan Program
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight mb-4">
              Proses Rehabilitasi
            </h2>
            <p className="text-emerald-100/80 text-sm sm:text-base leading-relaxed">
              Dari perencanaan hingga pemantauan — setiap tahap dilakukan dengan pendekatan ilmiah dan pelibatan aktif komunitas pesisir.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stages.map((st, i) => (
              <div
                key={i}
                className={`bg-white rounded-3xl p-7 text-[#1b3426] shadow-xl relative overflow-hidden transition-all duration-500 hover:-translate-y-2 ${st.offset}`}
                style={{
                  opacity: stagesVisible ? 1 : 0,
                  transform: stagesVisible ? undefined : 'translateY(30px)',
                  transitionDelay: `${i * 120}ms`,
                }}
              >
                {/* Big Decorative Number */}
                <div className="font-display font-black text-7xl text-[#d8f3dc] leading-none absolute top-4 right-4 pointer-events-none select-none opacity-80">
                  {st.number}
                </div>

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    <div className="font-display font-extrabold text-sm text-[#2d6a4f] mb-8">
                      {st.number}
                    </div>
                    <h3 className="font-extrabold text-lg sm:text-xl text-[#0b2416] mb-3 leading-snug">
                      {st.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLANTING TECHNIQUES (SILVIKULTUR) ── */}
      <section className="bg-[#f3f9f5] py-24 px-6 relative border-b border-emerald-100">
        <div ref={techniquesRef} className="container mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-[#d8f3dc] text-[#1b4332] text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
              Silvikultur & Rekayasa Lapangan
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0b2416] tracking-tight mb-4">
              Teknik & Metode Penanaman
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Pemilihan metode penanaman disesuaikan secara presisi dengan kondisi hidro-oseanografi, energi gelombang, dan substrat lumpur di pesisir CDKWB.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {plantingTechniques.map((tech, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-7 sm:p-8 shadow-lg shadow-emerald-950/5 border border-emerald-100/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
                style={{
                  opacity: techniquesVisible ? 1 : 0,
                  transform: techniquesVisible ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: `${i * 120}ms`,
                }}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-[#d8f3dc] font-display font-extrabold text-sm text-[#1b4332] flex items-center justify-center shrink-0">
                      {tech.number}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${tech.badgeStyle}`}>
                      {tech.badge}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-lg sm:text-xl text-[#0b2416] mb-3">
                    {tech.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {tech.desc}
                  </p>
                </div>

                <div className="bg-[#f4faf6] rounded-2xl p-4 sm:p-5 space-y-2 border border-emerald-100/70 text-xs sm:text-sm">
                  <div>
                    <strong className="text-[#0b2416] font-bold">Keunggulan — </strong>
                    <span className="text-slate-600">{tech.keunggulan}</span>
                  </div>
                  <div>
                    <strong className="text-[#0b2416] font-bold">Spesies Cocok — </strong>
                    <span className="text-slate-600 italic">{tech.spesiesCocok}</span>
                  </div>
                  <div>
                    <strong className="text-[#0b2416] font-bold">Jarak Tanam — </strong>
                    <span className="text-slate-600">{tech.jarakTanam}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY MANGROVE / MANFAAT ── */}
      <section className="bg-gradient-to-br from-[#122b1e] via-[#1b4332] to-[#0f241a] text-white py-24 px-6 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)', backgroundSize: '6px 6px' }}
        />

        <div ref={benefitsRef} className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-[#a7f3d0] text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
              Manfaat Program
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight mb-4">
              Mengapa Mangrove Penting?
            </h2>
            <p className="text-emerald-100/80 text-sm sm:text-base leading-relaxed">
              Hutan mangrove adalah ekosistem multifungsi yang memberikan manfaat ekologis, ekonomi, dan sosial secara bersamaan.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-white/15 hover:bg-white/15 transition-all duration-300 flex flex-col justify-between"
                style={{
                  opacity: benefitsVisible ? 1 : 0,
                  transform: benefitsVisible ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: `${i * 90}ms`,
                }}
              >
                <div>
                  <div className="mb-4">{b.icon}</div>
                  <h3 className="font-extrabold text-lg text-white mb-2">
                    {b.title}
                  </h3>
                  <p className="text-emerald-100/80 text-xs sm:text-sm leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DATA PENANAMAN & TARGET ROADMAP ── */}
      <section className="bg-[#f3f9f5] py-24 px-6 relative">
        <div ref={dataRef} className="container mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-[#d8f3dc] text-[#1b4332] text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
              Transparansi & Akuntabilitas
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0b2416] tracking-tight mb-4">
              Data Penanaman & Target Capaian
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Catatan komprehensif realisasi penanaman per lokasi di wilayah kerja CDKWB Batang & Pekalongan, lengkap dengan peta target jangka panjang hingga tahun 2029.
            </p>
          </div>

          {/* Target Roadmap Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {targetsByYear.map((tgt, i) => (
              <div
                key={i}
                className={`rounded-3xl p-7 shadow-lg transition-all duration-300 flex flex-col justify-between ${
                  tgt.isHighlight 
                    ? 'bg-[#1b4332] text-white shadow-[#1b4332]/20 border border-white/10' 
                    : 'bg-white text-[#1b3426] border border-emerald-100 shadow-emerald-950/5'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className={`flex items-center gap-1.5 text-xs font-extrabold tracking-wider ${
                      tgt.isHighlight ? 'text-[#a7f3d0]' : 'text-[#2d6a4f]'
                    }`}>
                      <Calendar className="w-4 h-4" />
                      {tgt.periode}
                    </div>
                    <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                      tgt.isHighlight ? 'bg-[#74c69d] text-[#081c10]' : 'bg-[#1b4332] text-white'
                    }`}>
                      {tgt.status}
                    </span>
                  </div>

                  <div className={`font-display font-extrabold text-3xl sm:text-4xl leading-none mb-3 ${
                    tgt.isHighlight ? 'text-white' : 'text-[#0b2416]'
                  }`}>
                    {tgt.targetBibit}{' '}
                    <span className={`text-sm sm:text-base font-sans font-bold ${
                      tgt.isHighlight ? 'text-emerald-200' : 'text-slate-500'
                    }`}>({tgt.targetLuas})</span>
                  </div>

                  <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                    tgt.isHighlight ? 'text-emerald-100/90' : 'text-slate-600'
                  }`}>
                    <strong className={tgt.isHighlight ? 'text-white' : 'text-slate-800'}>Fokus Program: </strong>
                    {tgt.fokus}
                  </p>
                </div>

                <div className={`flex items-center gap-1.5 text-xs font-bold ${
                  tgt.isHighlight ? 'text-[#a7f3d0]' : 'text-[#2d6a4f]'
                }`}>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Prioritas Konservasi CDKWB</span>
                </div>
              </div>
            ))}
          </div>

          {/* Realization Table */}
          <div className="bg-white rounded-3xl shadow-xl shadow-emerald-950/5 border border-emerald-100 overflow-hidden">
            <div className="bg-gradient-to-r from-[#122b1e] to-[#1b4332] text-white p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-extrabold text-lg sm:text-xl">
                  Data Realisasi & Target per Lokasi Penanaman
                </h3>
                <p className="text-xs sm:text-sm text-emerald-200/80 mt-1">
                  Wilayah Pesisir CDKWB (Batang, Pekalongan, Tegal)
                </p>
              </div>
              <span className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 text-[#a7f3d0] text-xs font-extrabold px-3 py-1.5 rounded-full shrink-0">
                Total 5 Lokasi Inti
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#f4faf6] text-slate-600 uppercase font-extrabold text-[11px] tracking-wider border-b border-emerald-100">
                  <tr>
                    <th className="py-4 px-6">Lokasi & Wilayah</th>
                    <th className="py-4 px-4">Luas Lahan</th>
                    <th className="py-4 px-4">Realisasi Bibit</th>
                    <th className="py-4 px-4">Target 2029</th>
                    <th className="py-4 px-4">Spesies Dominan</th>
                    <th className="py-4 px-4">Kelulusan Hidup</th>
                    <th className="py-4 px-6">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-50 text-slate-700">
                  {plantingData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#f4faf6] transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-[#0b2416] text-sm sm:text-base">{row.lokasi}</div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-[#2d6a4f]" />
                          {row.wilayah} ({row.tahun})
                        </div>
                      </td>
                      <td className="py-4 px-4 font-semibold text-slate-800">{row.luas}</td>
                      <td className="py-4 px-4 font-extrabold text-[#2d6a4f]">{row.bibit}</td>
                      <td className="py-4 px-4 font-medium text-slate-600">{row.target}</td>
                      <td className="py-4 px-4 text-xs italic text-slate-600 max-w-[180px]">{row.spesies}</td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-[#d8f3dc] text-[#1b4332]">
                          {row.survival}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── SPECIES SHOWCASE ── */}
      <section className="bg-white py-24 px-6 relative border-t border-emerald-100">
        <div ref={speciesRef} className="container mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-[#d8f3dc] text-[#1b4332] text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
              Keanekaragaman Hayati CDKWB
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#0b2416] tracking-tight mb-4">
              Spesies Mangrove yang Ditanam
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Eksplorasi ragam spesies mangrove asli pesisir Batang & Pekalongan. Klik tombol slide untuk beralih antara foto fase <strong>Bunga/Buah</strong> dan <strong>Pohon Dewasa</strong>, atau klik kartu untuk membaca karakteristik lengkapnya.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {MANGROVE_SPECIES.map((sp) => {
              const activePhotoIdx = cardPhotoIndex[sp.id] || 0;
              const currentPhoto = sp.photos[activePhotoIdx];

              return (
                <div
                  key={sp.id}
                  className="bg-white rounded-3xl border border-emerald-100 shadow-lg shadow-emerald-950/5 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden group"
                >
                  {/* Photo Slider */}
                  <div className="relative h-60 w-full bg-slate-900 overflow-hidden select-none">
                    <img
                      src={currentPhoto.url}
                      alt={`${sp.name} - ${currentPhoto.label}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none z-10">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/50 text-white backdrop-blur-md border border-white/10 shadow-sm">
                        {sp.local}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-black/50 text-white/80 backdrop-blur-md border border-white/10 shadow-sm">
                        {activePhotoIdx + 1}/{sp.photos.length}
                      </span>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between z-20 pointer-events-none">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrevPhoto(sp.id, sp.photos.length);
                        }}
                        aria-label="Foto sebelumnya"
                        className="pointer-events-auto w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNextPhoto(sp.id, sp.photos.length);
                        }}
                        aria-label="Foto berikutnya"
                        className="pointer-events-auto w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Photo Label Bar */}
                    <div className="absolute bottom-3 inset-x-3 z-10">
                      <div className="flex items-center justify-between bg-black/50 backdrop-blur-md rounded-xl px-3 py-1.5 border border-white/10 text-white">
                        <span className="text-xs font-semibold truncate pr-2">
                          {currentPhoto.label}
                        </span>
                        <div className="flex gap-1 shrink-0 items-center">
                          {sp.photos.map((_, pIdx) => (
                            <button
                              key={pIdx}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setCardPhotoIndex(prev => ({ ...prev, [sp.id]: pIdx }));
                              }}
                              className={`h-1.5 rounded-full transition-all ${activePhotoIdx === pIdx ? 'bg-white w-4' : 'bg-white/40 w-1.5'}`}
                              aria-label={`Pilih foto ${pIdx + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-extrabold text-xl text-[#0b2416] italic mb-1">
                        {sp.name}
                      </h3>
                      <p className="text-xs font-bold text-[#2d6a4f] mb-3">
                        Famili: {sp.family} • {sp.zonasi}
                      </p>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
                        {sp.summary}
                      </p>

                      <div className="space-y-1 bg-[#f4faf6] p-3.5 rounded-xl border border-emerald-100/70 text-xs mb-5">
                        <div>
                          <strong className="text-[#0b2416] font-bold">Tipe Akar: </strong>
                          <span className="text-slate-600">{sp.rootType}</span>
                        </div>
                        <div>
                          <strong className="text-[#0b2416] font-bold">Habitat: </strong>
                          <span className="text-slate-600 truncate block">{sp.habitat}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedSpecies(sp)}
                      className="w-full py-3 px-4 rounded-xl bg-[#1b4332] hover:bg-[#122b1e] active:scale-95 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                    >
                      <span>Lihat Morfologi & Informasi Lengkap</span>
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── SPECIES DETAIL MODAL ── */}
        {selectedSpecies && (
          <div 
            className="fixed inset-0 z-[600] flex items-start justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-md"
            style={{ paddingTop: 'max(1.5rem, env(safe-area-inset-top))' }}
            onClick={() => setSelectedSpecies(null)}
          >
            <div
              className="bg-white rounded-3xl max-w-3xl w-full my-auto shadow-2xl overflow-hidden border border-emerald-100 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-[#122b1e] to-[#1b4332] text-white p-6 flex items-start justify-between relative">
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-white/10 text-[#a7f3d0] text-xs font-extrabold px-3 py-1 rounded-full mb-2">
                    <Leaf className="w-3.5 h-3.5 text-[#74c69d]" />
                    {selectedSpecies.local} • {selectedSpecies.family}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold italic text-white leading-tight">
                    {selectedSpecies.name}
                  </h3>
                  <p className="text-emerald-200 text-xs sm:text-sm mt-1">
                    {selectedSpecies.zonasi} • {selectedSpecies.rootType}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedSpecies(null)}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="Tutup modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 max-h-[75vh]">
                {/* Photo Viewer */}
                <div className="space-y-3">
                  <div className="relative h-64 sm:h-80 w-full rounded-2xl bg-slate-900 overflow-hidden shadow-inner border border-slate-200">
                    <img
                      src={selectedSpecies.photos[modalPhotoIdx]?.url}
                      alt={`${selectedSpecies.name} - ${selectedSpecies.photos[modalPhotoIdx]?.label}`}
                      className="w-full h-full object-cover transition-all duration-300"
                    />

                    <div className="absolute inset-y-0 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <button
                        type="button"
                        onClick={() => setModalPhotoIdx(prev => (prev === 0 ? selectedSpecies.photos.length - 1 : prev - 1))}
                        className="pointer-events-auto w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-md"
                        aria-label="Slide sebelumnya"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setModalPhotoIdx(prev => (prev + 1) % selectedSpecies.photos.length)}
                        className="pointer-events-auto w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-md"
                        aria-label="Slide berikutnya"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10">
                      {modalPhotoIdx + 1} / {selectedSpecies.photos.length}
                    </div>
                  </div>

                  {/* Photo Thumbnails / Tabs */}
                  <div className="grid grid-cols-2 gap-3">
                    {selectedSpecies.photos.map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setModalPhotoIdx(idx)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                          modalPhotoIdx === idx
                            ? 'bg-[#d8f3dc] border-[#2d6a4f] text-[#0b2416]'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <div className="w-12 h-12 rounded-lg bg-slate-900 overflow-hidden shrink-0">
                          <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                        </div>
                        <div className="truncate">
                          <div className="font-bold text-xs">{p.label}</div>
                          <div className="text-[11px] opacity-75 truncate">{p.type === 'flower' ? 'Fase Generatif' : 'Fase Dewasa'}</div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <p className="text-xs text-slate-500 italic bg-slate-50 p-3 rounded-xl border border-slate-200">
                    ℹ️ {selectedSpecies.photos[modalPhotoIdx]?.desc}
                  </p>
                </div>

                {/* Morfologi & Ciri Khas */}
                <div>
                  <h4 className="font-extrabold text-[#0b2416] text-base mb-2">
                    Deskripsi Morfologi
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-[#f4faf6] p-4 rounded-xl border border-emerald-100">
                    {selectedSpecies.morfologi}
                  </p>
                </div>

                {/* Ciri Khas List */}
                <div>
                  <h4 className="font-extrabold text-[#0b2416] text-base mb-2">
                    Ciri Khas Diagnostik
                  </h4>
                  <ul className="space-y-2">
                    {selectedSpecies.ciriKhas.map((item, cIdx) => (
                      <li key={cIdx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#2d6a4f] mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Manfaat Ekologis */}
                <div>
                  <h4 className="font-extrabold text-[#0b2416] text-base mb-2">
                    Manfaat Ekologis & Sosial-Ekonomi
                  </h4>
                  <ul className="space-y-2">
                    {selectedSpecies.manfaat.map((item, mIdx) => (
                      <li key={mIdx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#2d6a4f] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ancaman Kelestarian */}
                <div>
                  <h4 className="font-extrabold text-[#0b2416] text-base mb-2">
                    Ancaman & Tantangan Konservasi
                  </h4>
                  <ul className="space-y-2">
                    {selectedSpecies.ancaman.map((item, aIdx) => (
                      <li key={aIdx} className="text-xs sm:text-sm text-rose-900 bg-rose-50/70 p-2.5 rounded-xl border border-rose-100 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-br from-[#122b1e] via-[#1b4332] to-[#0f241a] text-white py-24 px-6 text-center relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)', backgroundSize: '6px 6px' }}
        />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#52b788]/20 blur-3xl pointer-events-none" />

        <div className="container mx-auto max-w-3xl relative z-10">
          <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight mb-6">
            Ikut Berkontribusi
          </h2>
          <p className="text-emerald-100/90 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Bergabunglah dalam program penanaman mangrove bersama komunitas dan relawan peduli lingkungan pesisir. Setiap bibit yang ditanam adalah investasi untuk generasi mendatang.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/kontak"
              className="inline-flex items-center gap-2 bg-white text-[#0b2416] font-extrabold text-sm px-8 py-4 rounded-xl shadow-xl hover:bg-emerald-50 active:scale-95 transition-all"
            >
              <span>Hubungi Kami</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pengaduan"
              className="inline-flex items-center gap-2 bg-transparent text-white font-extrabold text-sm px-8 py-4 rounded-xl border-2 border-white/40 hover:bg-white/10 active:scale-95 transition-all"
            >
              <span>Laporkan Kerusakan</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
