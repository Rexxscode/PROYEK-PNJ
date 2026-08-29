<?php

namespace Database\Seeders;
use App\Models\AssessmentQuestion;
use Illuminate\Database\Seeder;

class AssessmentQuestionSeeder extends Seeder
{
    public function run(): void
    {
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-01'],
            ['major_id' => 'RPL', 'question' => 'Tag HTML apa yang digunakan untuk membuat paragraf teks?', 'options' => array (
  0 => '<div>',
  1 => '<p>',
  2 => '<span>',
  3 => '<text>',
  4 => '<para>',
), 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'HTML/CSS']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-02'],
            ['major_id' => 'RPL', 'question' => 'Apa kepanjangan dari CSS?', 'options' => array (
  0 => 'Cascading Style Sheets',
  1 => 'Creative Style System',
  2 => 'Colorful Style Syntax',
  3 => 'Computer Style Sheet',
  4 => 'Cascading Syntax Styling',
), 'correct' => 0, 'difficulty' => 'basic', 'skill' => 'HTML/CSS']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-03'],
            ['major_id' => 'RPL', 'question' => 'Apa fungsi utama CSS Flexbox?', 'options' => array (
  0 => 'Membuat animasi transisi',
  1 => 'Mengatur layout satu dimensi (baris atau kolom)',
  2 => 'Membuat efek bayangan pada elemen',
  3 => 'Mengelola style sheet secara dinamis',
  4 => 'Membuat grid dua dimensi',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'HTML/CSS']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-04'],
            ['major_id' => 'RPL', 'question' => 'Manakah yang merupakan selector CSS untuk mengambil elemen dengan id \'header\'?', 'options' => array (
  0 => '.header',
  1 => '#header',
  2 => 'header',
  3 => '*header',
  4 => '@header',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'HTML/CSS']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-05'],
            ['major_id' => 'RPL', 'question' => 'Apa perbedaan utama antara \'display: block\' dan \'display: inline\' di CSS?', 'options' => array (
  0 => 'Block memiliki warna latar belakang, inline tidak',
  1 => 'Block menempati lebar penuh, inline hanya selebar kontennya',
  2 => 'Block bisa dibuat transparan, inline tidak',
  3 => 'Block hanya bisa berisi teks, inline bisa berisi elemen lain',
  4 => 'Block di-render secara vertical, inline di-render secara horizontal',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'HTML/CSS']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-06'],
            ['major_id' => 'RPL', 'question' => 'Apa itu CSS specificity dan bagaimana urutan prioritasnya dari yang tertinggi?', 'options' => array (
  0 => 'Element > Class > ID > Inline',
  1 => 'Inline > ID > Class > Element',
  2 => 'ID > Inline > Class > Element',
  3 => 'Class > ID > Element > Inline',
  4 => 'Inline > Class > ID > Element',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'HTML/CSS']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-07'],
            ['major_id' => 'RPL', 'question' => 'Apa tujuan penggunaan CSS custom properties (CSS variables) dengan awalan \'--\'?', 'options' => array (
  0 => 'Untuk membuat animasi lebih cepat',
  1 => 'Menyimpan nilai yang dapat digunakan kembali di seluruh stylesheet',
  2 => 'Untuk mengompresi ukuran file CSS',
  3 => 'Untuk menambahkan komentar pada kode CSS',
  4 => 'Untuk mengenkripsi properti CSS',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'HTML/CSS']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-08'],
            ['major_id' => 'RPL', 'question' => 'Manakah properti CSS yang paling efisien untuk melakukan animasi transformasi tanpa memicu reflow?', 'options' => array (
  0 => 'width dan height',
  1 => 'top dan left',
  2 => 'transform dan opacity',
  3 => 'margin dan padding',
  4 => 'font-size dan line-height',
), 'correct' => 2, 'difficulty' => 'advanced', 'skill' => 'HTML/CSS']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-09'],
            ['major_id' => 'RPL', 'question' => 'Apa fungsi CSS \'contain\' property dalam konteks optimasi performa rendering?', 'options' => array (
  0 => 'Menggabungkan beberapa file CSS',
  1 => 'Membatasi area rendering untuk meminimalkan scope repaint dan reflow',
  2 => 'Mengenkripsi konten halaman',
  3 => 'Menyembunyikan elemen dari DOM tree',
  4 => 'Mengubah ukuran viewport browser',
), 'correct' => 1, 'difficulty' => 'expert', 'skill' => 'HTML/CSS']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-10'],
            ['major_id' => 'RPL', 'question' => 'Teknik apa yang digunakan untuk mengurangi render-blocking CSS agar halaman dimuat lebih cepat?', 'options' => array (
  0 => 'Inline seluruh CSS ke dalam tag <script>',
  1 => 'Gunakan critical CSS secara inline dan load CSS non-kritis secara asinkron',
  2 => 'Gabungkan seluruh CSS ke dalam satu file tanpa kompresi',
  3 => 'Gunakan JavaScript untuk menghapus semua CSS saat loading',
  4 => 'Gunakan attribute \'defer\' pada tag <link rel=\'stylesheet\'>',
), 'correct' => 1, 'difficulty' => 'expert', 'skill' => 'HTML/CSS']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-11'],
            ['major_id' => 'RPL', 'question' => 'Apa perbedaan utama antara keyword \'let\' dan \'var\' di JavaScript?', 'options' => array (
  0 => 'let hanya bisa digunakan di dalam fungsi',
  1 => 'let memiliki block scope, var memiliki function scope',
  2 => 'let mendukung hoisting, var tidak',
  3 => 'var lebih cepat dari let saat eksekusi',
  4 => 'let hanya bisa menyimpan string, var bisa menyimpan tipe apapun',
), 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'JavaScript']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-12'],
            ['major_id' => 'RPL', 'question' => 'Bagaimana cara yang benar untuk mendeklarasikan sebuah array kosong di JavaScript?', 'options' => array (
  0 => 'array();',
), 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'JavaScript']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-13'],
            ['major_id' => 'RPL', 'question' => 'Apa perbedaan antara operator \'==\' dan \'===\' di JavaScript?', 'options' => array (
  0 => 'Tidak ada perbedaan, keduanya sama',
  1 => '\'==\' melakukan perbandingan dengan type coercion, \'===\' melakukan strict comparison tanpa konversi tipe',
  2 => '\'==\' lebih cepat dari \'===\'',
  3 => '\'===\' hanya bisa membandingkan angka, \'==\' bisa membandingkan semua tipe',
  4 => '\'==\' mengembalikan string, \'===\' mengembalikan boolean',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'JavaScript']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-14'],
            ['major_id' => 'RPL', 'question' => 'Apa yang dikembalikan oleh metode Array.prototype.map() di JavaScript?', 'options' => array (
  0 => 'Array yang sama dengan dimodifikasi secara langsung',
  1 => 'Array baru dengan nilai hasil pemetaan dari setiap elemen',
  2 => 'Satu nilai (bukan array) dari operasi reduksi',
  3 => 'Boolean yang menandakan apakah semua elemen lolos filter',
  4 => 'Object dengan elemen array sebagai key',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'JavaScript']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-15'],
            ['major_id' => 'RPL', 'question' => 'Bagaimana mekanisme event loop bekerja di JavaScript untuk menangani operasi asinkron?', 'options' => array (
  0 => 'JavaScript menjalankan semua kode secara paralel di thread terpisah',
  1 => 'Event loop memproses call stack terlebih dahulu, lalu mengambil callback dari task queue saat call stack kosong',
  2 => 'Semua operasi asinkron langsung dieksekusi tanpa menunggu call stack kosong',
  3 => 'Event loop hanya bekerja di browser, tidak di Node.js',
  4 => 'JavaScript menggunakan multiple thread untuk menangani semua operasi',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'JavaScript']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-16'],
            ['major_id' => 'RPL', 'question' => 'Apa yang dimaksud dengan closure di JavaScript?', 'options' => array (
  0 => 'Fungsi yang tidak memiliki return value',
  1 => 'Fungsi yang mengakses variabel dari scope luar meskipun fungsi outer sudah selesai dieksekusi',
  2 => 'Fungsi yang dijalankan secara otomatis tanpa dipanggil',
  3 => 'Fungsi yang hanya bisa dijalankan satu kali',
  4 => 'Variabel yang dideklarasikan di dalam blok if-else',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'JavaScript']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-17'],
            ['major_id' => 'RPL', 'question' => 'Apa tujuan penggunaan \'use strict\' di awal file JavaScript atau fungsi?', 'options' => array (
  0 => 'Mengaktifkan fitur ES6 terbaru secara otomatis',
  1 => 'Mengaktifkan mode ketat yang mencegah penggunaan fitur yang tidak aman atau error umum',
  2 => 'Mengompresi kode agar lebih ringan',
  3 => 'Mengaktifkan kompilasi tipe statis pada JavaScript',
  4 => 'Mengubah semua variabel menjadi konstanta',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'JavaScript']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-18'],
            ['major_id' => 'RPL', 'question' => 'Apa perbedaan antara method .call(), .apply(), dan .bind() pada fungsi di JavaScript?', 'options' => array (
  0 => 'Ketiganya memiliki fungsi yang sama persis',
  1 => 'call() dan apply() langsung menjalankan fungsi dengan this yang ditentukan, bind() mengembalikan fungsi baru dengan this yang sudah diikat',
  2 => 'apply() mengembalikan nilai, call() mengembalikan fungsi baru',
  3 => 'bind() langsung menjalankan fungsi, call() dan apply() tidak',
  4 => 'call() hanya bisa digunakan di browser, apply() hanya di Node.js',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'JavaScript']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-19'],
            ['major_id' => 'RPL', 'question' => 'Bagaimana mekanisme garbage collection bekerja di JavaScript untuk mengelola memori?', 'options' => array (
  0 => 'JavaScript tidak memiliki garbage collection, memori dikelola secara manual oleh programmer',
  1 => 'Menggunakan mark-and-sweep algorithm yang menandai objek yang masih diakses dan menghapus yang tidak terpakai',
  2 => 'Seluruh memori dialokasikan ulang setiap kali fungsi baru dipanggil',
  3 => 'Garbage collection hanya bekerja saat browser ditutup',
  4 => 'Setiap variabel dihapus dari memori segera setelah fungsi selesai dieksekusi',
), 'correct' => 1, 'difficulty' => 'expert', 'skill' => 'JavaScript']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-20'],
            ['major_id' => 'RPL', 'question' => 'Apa itu prototype pollution di JavaScript dan mengapa hal ini merupakan kerentanan keamanan?', 'options' => array (
  0 => 'Teknik menambahkan properti pada prototype Object.prototype yang bisa mempengaruhi semua objek dan digunakan untuk serangan',
  1 => 'Proses normal JavaScript dalam menambahkan method ke prototype',
  2 => 'Bug internal di JavaScript engine V8 yang sudah diperbaiki',
  3 => 'Teknik untuk mengoptimasi performa dengan menambahkan properti ke prototype',
  4 => 'Cara menghapus seluruh prototype dari sebuah objek',
), 'correct' => 0, 'difficulty' => 'expert', 'skill' => 'JavaScript']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-21'],
            ['major_id' => 'RPL', 'question' => 'Apa fungsi utama type annotation di TypeScript?', 'options' => array (
  0 => 'Mengkompresi ukuran file JavaScript',
  1 => 'Menentukan tipe data variabel, parameter, dan return value untuk deteksi error saat compile time',
  2 => 'Menambahkan komentar otomatis pada kode',
  3 => 'Mengubah semua variabel menjadi konstanta',
  4 => 'Mengaktifkan mode debug pada kode',
), 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'TypeScript']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-22'],
            ['major_id' => 'RPL', 'question' => 'Bagaimana cara mendeklarasikan sebuah interface di TypeScript?', 'options' => array (
  0 => 'type NamaInterface { properti: tipe }',
  1 => 'interface NamaInterface { properti: tipe }',
  2 => 'class NamaInterface { properti: tipe }',
  3 => 'struct NamaInterface { properti: tipe }',
  4 => 'enum NamaInterface { properti: tipe }',
), 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'TypeScript']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-23'],
            ['major_id' => 'RPL', 'question' => 'Apa perbedaan utama antara \'type\' dan \'interface\' di TypeScript?', 'options' => array (
  0 => 'Tidak ada perbedaan, keduanya bisa digunakan secara bergantian',
  1 => 'Interface tidak bisa di-extend, type bisa digunakan untuk union types dan lebih fleksibel',
  2 => 'Type tidak bisa digunakan untuk mendeklarasikan object, interface hanya untuk primitive',
  3 => 'Interface hanya bisa menyimpan satu properti, type bisa banyak',
  4 => 'Type hanya bisa digunakan di browser, interface hanya di Node.js',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'TypeScript']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-24'],
            ['major_id' => 'RPL', 'question' => 'Apa fungsi generic types di TypeScript dan kapan menggunakannya?', 'options' => array (
  0 => 'Tipe yang hanya bisa menyimpan string dan angka',
  1 => 'Membuat fungsi, interface, atau class yang bekerja dengan berbagai tipe data secara fleksibel',
  2 => 'Tipe yang dibuat secara otomatis oleh TypeScript compiler',
  3 => 'Tipe yang hanya bisa digunakan di dalam fungsi async',
  4 => 'Tipe yang memaksa semua value menjadi tipe yang sama',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'TypeScript']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-25'],
            ['major_id' => 'RPL', 'question' => 'Apa itu type assertion di TypeScript dan apa tujuannya?', 'options' => array (
  0 => 'Memaksa TypeScript untuk mengubah tipe data saat runtime',
  1 => 'Memberitahu TypeScript compiler tentang tipe data yang lebih spesifik dari apa yang bisa disimpulkan secara otomatis',
  2 => 'Membuat TypeScript mengabaikan semua error tipe',
  3 => 'Menambahkan tipe data baru yang tidak tersedia di TypeScript',
  4 => 'Menghapus semua tipe dari kode TypeScript',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'TypeScript']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-26'],
            ['major_id' => 'RPL', 'question' => 'Apa itu mapped type di TypeScript dan bagaimana cara kerjanya?', 'options' => array (
  0 => 'Tipe yang hanya bisa digunakan untuk Map object',
  1 => 'Tipe yang dibuat dengan memodifikasi properti dari tipe yang sudah ada menggunakan loop key pada tipe tersebut',
  2 => 'Tipe yang menghubungkan dua file TypeScript',
  3 => 'Tipe yang hanya bisa menyimpan pasangan key-value',
  4 => 'Tipe yang otomatis mengubah semua properti menjadi optional',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'TypeScript']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-27'],
            ['major_id' => 'RPL', 'question' => 'Apa itu conditional type di TypeScript dan bagaimana contoh penggunaannya?', 'options' => array (
  0 => 'Tipe yang hanya bisa digunakan di dalam blok if-else',
  1 => 'Tipe yang memilih tipe hasil berdasarkan kondisi type-level seperti T extends U ? X : Y',
  2 => 'Tipe yang hanya bisa menyimpan nilai boolean',
  3 => 'Tipe yang mengecek apakah variabel sudah dideklarasikan',
  4 => 'Tipe yang memaksa semua kondisi harus bernilai true',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'TypeScript']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-28'],
            ['major_id' => 'RPL', 'question' => 'Apa perbedaan antara tipe \'unknown\' dan \'any\' di TypeScript, dan mengapa \'unknown\' lebih disarankan?', 'options' => array (
  0 => 'Tidak ada perbedaan, keduanya bisa digunakan secara bergantian',
  1 => '\'unknown\' lebih aman karena memaksa pengecekan tipe sebelum digunakan, \'any\' mematikan semua pengecekan tipe',
  2 => '\'any\' lebih aman karena memiliki lebih banyak validasi',
  3 => '\'unknown\' hanya bisa digunakan di variabel global, \'any\' di dalam fungsi',
  4 => '\'any\' otomatis dikonversi ke tipe yang sesuai, \'unknown\' tidak bisa dikonversi',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'TypeScript']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-29'],
            ['major_id' => 'RPL', 'question' => 'Apa yang dimaksud dengan distributive conditional type di TypeScript?', 'options' => array (
  0 => 'Conditional type yang mendistribusikan properti ke semua objek di dalam array',
  1 => 'Conditional type yang diterapkan secara otomatis pada setiap anggota union type, menghasilkan union hasil',
  2 => 'Conditional type yang hanya bekerja pada type primitive',
  3 => 'Conditional type yang mendistribusikan nilai ke beberapa variabel sekaligus',
  4 => 'Conditional type yang menyebar (spread) ke seluruh properti object',
), 'correct' => 1, 'difficulty' => 'expert', 'skill' => 'TypeScript']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-30'],
            ['major_id' => 'RPL', 'question' => 'Apa kegunaan template literal types di TypeScript dan bagaimana cara kerjanya?', 'options' => array (
  0 => 'Tipe yang hanya bisa menyimpan template string kosong',
  1 => 'Membuat tipe literal baru dengan mendeskripsikan pola string yang valid menggunakan sintaksis template literal',
  2 => 'Tipe yang hanya bisa digunakan untuk mendeklarasikan HTML templates',
  3 => 'Tipe yang otomatis mengisi variabel dengan string template',
  4 => 'Tipe yang hanya bisa digunakan di dalam tag template literals',
), 'correct' => 1, 'difficulty' => 'expert', 'skill' => 'TypeScript']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-31'],
            ['major_id' => 'RPL', 'question' => 'Apa fungsi utama hook useState di React?', 'options' => array (
  0 => 'Mengelola efek samping seperti fetching data',
  1 => 'Mengelola dan memperbarui state lokal di functional component',
  2 => 'Mengelola routing antar halaman',
  3 => 'Mengelola context global aplikasi',
  4 => 'Mengoptimasi performa rendering komponen',
), 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'React/Next.js']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-32'],
            ['major_id' => 'RPL', 'question' => 'Bagaimana cara mengimpor sebuah komponen React dari file lain dalam format ES Module?', 'options' => array (
  0 => 'require(\'./Komponen\')',
  1 => 'import Komponen from \'./Komponen\'',
  2 => 'load Komponen from \'./Komponen\'',
  3 => 'include Komponen from \'./Komponen\'',
  4 => 'fetch Komponen from \'./Komponen\'',
), 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'React/Next.js']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-33'],
            ['major_id' => 'RPL', 'question' => 'Apa perbedaan utama antara state dan props di React?', 'options' => array (
  0 => 'State hanya bisa digunakan di class component, props di functional component',
  1 => 'State dimiliki dan dikelola oleh komponen itu sendiri dan bisa diubah, props dikirim dari parent dan bersifat read-only',
  2 => 'Props bisa diubah oleh komponen penerima, state tidak bisa diubah',
  3 => 'State hanya menyimpan data string, props bisa menyimpan semua tipe data',
  4 => 'Tidak ada perbedaan, keduanya berfungsi sama persis',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'React/Next.js']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-34'],
            ['major_id' => 'RPL', 'question' => 'Kapan useEffect dijalankan di lifecycle React functional component?', 'options' => array (
  0 => 'Hanya saat komponen pertama kali dimount',
  1 => 'Setelah render, dan bisa dikonfigurasi dengan dependency array untuk menentukan kapan dijalankan ulang',
  2 => 'Sebelum komponen di-mount ke DOM',
  3 => 'Hanya saat komponen di-unmount',
  4 => 'Hanya saat state berubah tanpa melihat dependency array',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'React/Next.js']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-35'],
            ['major_id' => 'RPL', 'question' => 'Bagaimana cara kerja Virtual DOM di React sehingga membuat UI lebih efisien?', 'options' => array (
  0 => 'React mengubah DOM secara langsung tanpa perantara',
  1 => 'React membandingkan Virtual DOM baru dengan yang sebelumnya menggunakan diffing algorithm, lalu hanya memperbarui bagian DOM yang benar-benar berubah',
  2 => 'React membuat salinan DOM di memori setiap kali ada perubahan data',
  3 => 'Virtual DOM membuat semua komponen di-render ulang secara penuh',
  4 => 'React mengabaikan perubahan kecil dan hanya memperbarui komponen utama',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'React/Next.js']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-36'],
            ['major_id' => 'RPL', 'question' => 'Apa tujuan penggunaan React.memo() pada sebuah komponen?', 'options' => array (
  0 => 'Untuk menambahkan komentar pada kode React',
  1 => 'Untuk mencegah re-render yang tidak perlu dengan meng-cache hasil render berdasarkan props',
  2 => 'Untuk menghapus state dari komponen secara permanen',
  3 => 'Untuk mengoptimasi bundle size dengan menghapus kode yang tidak terpakai',
  4 => 'Untuk membuat komponen bisa diakses dari luar komponen',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'React/Next.js']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-37'],
            ['major_id' => 'RPL', 'question' => 'Apa itu React Context dan kapan sebaiknya menggunakannya?', 'options' => array (
  0 => 'API yang hanya tersedia di React Native untuk mengakses hardware',
  1 => 'Cara membagikan data (state, tema, bahasa) ke komponen dalam tree tanpa harus meneruskan props secara manual di setiap level',
  2 => 'Fitur untuk menyimpan data di localStorage browser',
  3 => 'Cara untuk membuat komponen baru dari komponen yang sudah ada',
  4 => 'Sistem routing built-in React untuk navigasi halaman',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'React/Next.js']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-38'],
            ['major_id' => 'RPL', 'question' => 'Apa perbedaan utama antara Server-Side Rendering (SSR) dan Client-Side Rendering (CSR) di Next.js?', 'options' => array (
  0 => 'SSR menggunakan JavaScript, CSR menggunakan HTML',
  1 => 'SSR merender halaman di server setiap request, CSR merender halaman di browser setelah JavaScript dimuat',
  2 => 'CSR hanya bisa digunakan di mobile, SSR untuk desktop',
  3 => 'SSR tidak mendukung dynamic data, CSR mendukung',
  4 => 'Tidak ada perbedaan dalam hal performa',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'React/Next.js']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-39'],
            ['major_id' => 'RPL', 'question' => 'Apa itu React Server Components (RSC) di Next.js 13+ dan bagaimana cara kerjanya?', 'options' => array (
  0 => 'Komponen yang hanya bisa digunakan di server Express.js',
  1 => 'Komponen yang dijalankan dan dirender di server, mengurangi bundle JavaScript yang dikirim ke client',
  2 => 'Komponen yang menggunakan WebSocket untuk komunikasi real-time',
  3 => 'Komponen yang bisa mengakses file system di client',
  4 => 'Komponen yang dibuat khusus untuk virtualisasi list panjang',
), 'correct' => 1, 'difficulty' => 'expert', 'skill' => 'React/Next.js']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-40'],
            ['major_id' => 'RPL', 'question' => 'Manakah strategi yang paling efektif untuk mengoptimasi performance aplikasi Next.js yang memiliki banyak halaman gambar?', 'options' => array (
  0 => 'Gunakan tag <img> HTML biasa untuk semua gambar',
  1 => 'Gunakan komponen Image dari Next.js yang mendukung lazy loading, responsive images, dan optimasi format otomatis',
  2 => 'Kompres semua gambar secara manual lalu upload langsung ke public folder',
  3 => 'Gunakan CSS background-image untuk menampilkan semua gambar',
  4 => 'Muat semua gambar sekaligus di awal menggunakan array iterasi',
), 'correct' => 1, 'difficulty' => 'expert', 'skill' => 'React/Next.js']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-41'],
            ['major_id' => 'RPL', 'question' => 'Apa fungsi module.exports di Node.js?', 'options' => array (
  0 => 'Menghapus modul dari cache',
  1 => 'Mengekspor fungsi, objek, atau variabel agar bisa digunakan di file lain dengan require atau import',
  2 => 'Mengimpor modul dari package eksternal',
  3 => 'Mengompresi modul agar lebih ringan',
  4 => 'Menjalankan modul secara otomatis saat server dimulai',
), 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'Node.js']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-42'],
            ['major_id' => 'RPL', 'question' => 'Perintah apa yang digunakan untuk menginstall sebuah package dari npm ke dalam project Node.js?', 'options' => array (
  0 => 'node install nama-package',
  1 => 'npm install nama-package',
  2 => 'npm start nama-package',
  3 => 'node add nama-package',
  4 => 'npm get nama-package',
), 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'Node.js']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-43'],
            ['major_id' => 'RPL', 'question' => 'Apa itu EventEmitter di Node.js dan bagaimana cara kerjanya?', 'options' => array (
  0 => 'Class untuk mengirim email dari server',
  1 => 'Class yang memungkinkan pembuatan dan penanganan custom events dengan metode .on() untuk listen dan .emit() untuk memicu event',
  2 => 'Modul untuk mengirim data ke database',
  3 => 'Fungsi untuk membuat HTTP request',
  4 => 'Modul untuk mengelola file di file system',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'Node.js']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-44'],
            ['major_id' => 'RPL', 'question' => 'Apa perbedaan antara process.nextTick() dan setImmediate() di Node.js?', 'options' => array (
  0 => 'Tidak ada perbedaan, keduanya menjalankan callback secara synchronous',
  1 => 'process.nextTick() menjalankan callback sebelum fase I/O, setImmediate() menjalankan setelah fase I/O dalam event loop',
  2 => 'setImmediate() hanya bisa digunakan di Windows, process.nextTick() di semua OS',
  3 => 'process.nextTick() menjalankan callback secara asynchronous, setImmediate() secara synchronous',
  4 => 'Keduanya hanya bisa digunakan di dalam modul http',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'Node.js']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-45'],
            ['major_id' => 'RPL', 'question' => 'Apa itu middleware di Express.js dan apa peran utamanya dalam request handling?', 'options' => array (
  0 => 'Fungsi yang hanya digunakan untuk logging request ke console',
  1 => 'Fungsi yang dijalankan sebelum request handler utama, bisa melakukan validasi, autentikasi, atau transformasi request',
  2 => 'Fungsi yang hanya bisa dijalankan setelah response dikirim ke client',
  3 => 'Komponen React yang digunakan di server',
  4 => 'Fungsi yang digunakan untuk membuat database connection',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'Node.js']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-46'],
            ['major_id' => 'RPL', 'question' => 'Apa fungsi cluster module di Node.js dan kapan sebaiknya menggunakannya?', 'options' => array (
  0 => 'Untuk mengelola database connection pooling',
  1 => 'Untuk membuat child process yang menjalankan instance aplikasi Node.js secara paralel di beberapa CPU core',
  2 => 'Untuk mengelola multiple npm package sekaligus',
  3 => 'Untuk membuat file backup dari project',
  4 => 'Untuk mengelola environment variables',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'Node.js']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-47'],
            ['major_id' => 'RPL', 'question' => 'Bagaimana event loop di Node.js menangani operasi I/O asinkron seperti pembacaan file?', 'options' => array (
  0 => 'Node.js menggunakan thread pool di belakang layar untuk menjalankan operasi I/O, lalu callback dikembalikan ke event loop saat selesai',
  1 => 'Semua operasi I/O dijalankan secara synchronous di Node.js',
  2 => 'Node.js menghentikan seluruh event loop saat operasi I/O berjalan',
  3 => 'Operasi I/O hanya ditangani oleh libuv di Linux',
  4 => 'Node.js membuat thread baru untuk setiap operasi I/O tanpa menggunakan event loop',
), 'correct' => 0, 'difficulty' => 'advanced', 'skill' => 'Node.js']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-48'],
            ['major_id' => 'RPL', 'question' => 'Apa itu stream di Node.js dan mengapa stream penting untuk menangani data dalam jumlah besar?', 'options' => array (
  0 => 'Fitur untuk melakukan streaming video langsung di Node.js',
  1 => 'Mekanisme untuk membaca atau menulis data secara bertahap tanpa memuat seluruh data ke dalam memori sekaligus',
  2 => 'Fungsi untuk mengirim data ke client menggunakan WebSocket',
  3 => 'Modul untuk mengelola database stream',
  4 => 'Cara untuk menampilkan animasi di browser menggunakan Node.js',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'Node.js']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-49'],
            ['major_id' => 'RPL', 'question' => 'Apa itu Worker Threads di Node.js dan apa keunggulannya dibandingkan menggunakan child_process?', 'options' => array (
  0 => 'Worker Threads hanya bisa menjalankan kode Python',
  1 => 'Worker Threads bisa menjalankan JavaScript secara paralel dan berbagi memori dengan thread utama, sedangkan child_process membuat proses terpisah dengan overhead lebih besar',
  2 => 'Worker Threads hanya tersedia untuk file handling',
  3 => 'Worker Threads sama persis dengan child_process dalam hal performa',
  4 => 'Worker Threads digunakan untuk menggantikan event loop',
), 'correct' => 1, 'difficulty' => 'expert', 'skill' => 'Node.js']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-50'],
            ['major_id' => 'RPL', 'question' => 'Manakah strategi yang paling efektif untuk mengoptimasi performa aplikasi Node.js yang menerima banyak request bersamaan?', 'options' => array (
  0 => 'Gunakan callback sebanyak mungkin untuk setiap operasi',
  1 => 'Gunakan caching untuk data yang jarang berubah, connection pooling untuk database, dan non-blocking I/O untuk semua operasi',
  2 => 'Gunakan synchronous code agar tidak ada race condition',
  3 => 'Tambahkan lebih banyak variabel global agar data mudah diakses',
  4 => 'Hapus semua log untuk mengurangi overhead',
), 'correct' => 1, 'difficulty' => 'expert', 'skill' => 'Node.js']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-51'],
            ['major_id' => 'RPL', 'question' => 'Apa keyword yang digunakan untuk mendeklarasikan sebuah fungsi di Python?', 'options' => array (
  0 => 'function',
  1 => 'def',
  2 => 'func',
  3 => 'fun',
  4 => 'define',
), 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'Python']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-52'],
            ['major_id' => 'RPL', 'question' => 'Bagaimana cara mendeklarasikan sebuah list kosong di Python?', 'options' => array (
  0 => 'list();',
), 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'Python']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-53'],
            ['major_id' => 'RPL', 'question' => 'Apa perbedaan utama antara list dan tuple di Python?', 'options' => array (
  0 => 'List hanya bisa menyimpan angka, tuple bisa menyimpan semua tipe data',
  1 => 'List bersifat mutable (bisa diubah setelah dibuat), tuple bersifat immutable (tidak bisa diubah)',
  2 => 'Tuple lebih cepat dibuat dari list',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'Python']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-54'],
            ['major_id' => 'RPL', 'question' => 'Apa itu list comprehension di Python dan apa manfaat utamanya?', 'options' => array (
  0 => 'Fitur untuk mengompresi list agar lebih kecil ukurannya',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'Python']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-55'],
            ['major_id' => 'RPL', 'question' => 'Apa itu virtual environment di Python dan mengapa penting untuk digunakan dalam project?', 'options' => array (
  0 => 'Fitur bawaan Python untuk mengenkripsi kode',
  1 => 'Isolated environment yang memisahkan dependency project dari system-wide packages, mencegah konflik versi antar project',
  2 => 'Tipe data baru yang hanya bisa menyimpan environment variables',
  3 => 'Cara untuk menjalankan Python di dalam Docker container',
  4 => 'Modul untuk mengelola file system di Python',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'Python']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-56'],
            ['major_id' => 'RPL', 'question' => 'Apa itu decorator di Python dan bagaimana cara kerjanya?', 'options' => array (
  0 => 'Fungsi yang digunakan untuk menambahkan dekorasi visual pada output',
  1 => 'Fungsi yang menerima fungsi lain sebagai argumen dan mengembalikan fungsi baru dengan perilaku yang dimodifikasi',
  2 => 'Fungsi yang hanya bisa digunakan pada class',
  3 => 'Modul untuk mengubah tampilan terminal',
  4 => 'Tipe data untuk menyimpan konfigurasi visual',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'Python']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-57'],
            ['major_id' => 'RPL', 'question' => 'Apa itu generator di Python dan bagaimana cara menggunakannya?', 'options' => array (
  0 => 'Fungsi yang membuat file baru secara otomatis',
  1 => 'Fungsi yang menggunakan yield untuk menghasilkan nilai secara bertahap tanpa memuat seluruh data ke dalam memori sekaligus',
  2 => 'Fungsi yang hanya bisa menghasilkan angka random',
  3 => 'Fungsi yang membuat objek baru dari class',
  4 => 'Fungsi yang hanya bisa digunakan dalam loop',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'Python']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-58'],
            ['major_id' => 'RPL', 'question' => 'Apa perbedaan antara *args dan **kwargs di Python?', 'options' => array (
  0 => 'Tidak ada perbedaan, keduanya berfungsi sama',
  1 => '*args menerima parameter positional sebagai tuple, **kwargs menerima parameter keyword sebagai dictionary',
  2 => '*args hanya bisa menyimpan string, **kwargs hanya menyimpan angka',
  3 => '*args digunakan untuk class, **kwargs untuk fungsi',
  4 => '*args otomatis mengkonversi tipe data, **kwargs tidak',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'Python']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-59'],
            ['major_id' => 'RPL', 'question' => 'Apa itu metaclass di Python dan apa peran utamanya?', 'options' => array (
  0 => 'Class yang hanya bisa digunakan untuk inheritance',
  1 => 'Class yang mendefinisikan bagaimana class lain dibuat, memungkinkan modifikasi perilaku class saat pembuatan',
  2 => 'Class yang digunakan untuk mengelola database connection',
  3 => 'Class yang hanya tersedia di Python 2',
  4 => 'Class yang berfungsi sebagai interface',
), 'correct' => 1, 'difficulty' => 'expert', 'skill' => 'Python']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-60'],
            ['major_id' => 'RPL', 'question' => 'Apa itu GIL (Global Interpreter Lock) di Python dan bagaimana dampaknya terhadap multithreading?', 'options' => array (
  0 => 'Fitur untuk mengunci seluruh interpreter agar tidak bisa dieksekusi',
  1 => 'Mekanisme yang membatasi hanya satu thread yang bisa menjalankan bytecode Python pada satu waktu, mengurangi efektivitas multithreading untuk CPU-bound tasks',
  2 => 'Alat debugging untuk menemukan error di kode Python',
  3 => 'Modul untuk mengelola lock di database',
  4 => 'Fitur untuk mengenkripsi semua thread yang berjalan',
), 'correct' => 1, 'difficulty' => 'expert', 'skill' => 'Python']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-61'],
            ['major_id' => 'RPL', 'question' => 'Apa fungsi utama perintah SELECT dalam SQL?', 'options' => array (
  0 => 'Membuat tabel baru di database',
  1 => 'Mengambil dan menampilkan data dari satu atau lebih tabel',
  2 => 'Menghapus data dari tabel',
  3 => 'Memodifikasi struktur tabel',
  4 => 'Membuat user baru di database',
), 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'SQL/Database']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-62'],
            ['major_id' => 'RPL', 'question' => 'Perintah SQL apa yang digunakan untuk membuat tabel baru di dalam database?', 'options' => array (
  0 => 'INSERT TABLE nama_tabel',
  1 => 'CREATE TABLE nama_tabel',
  2 => 'NEW TABLE nama_tabel',
  3 => 'MAKE TABLE nama_tabel',
  4 => 'BUILD TABLE nama_tabel',
), 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'SQL/Database']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-63'],
            ['major_id' => 'RPL', 'question' => 'Apa perbedaan antara klausa WHERE dan HAVING dalam SQL?', 'options' => array (
  0 => 'WHERE digunakan untuk mengurutkan data, HAVING untuk memfilter data',
  1 => 'WHERE memfilter baris sebelum aggregasi, HAVING memfilter hasil aggregasi (group)',
  2 => 'WHERE hanya bisa digunakan dengan SELECT, HAVING dengan UPDATE',
  3 => 'WHERE mendukung semua operator, HAVING hanya mendukung operator sama dengan',
  4 => 'Tidak ada perbedaan, keduanya bisa digunakan secara bergantian',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'SQL/Database']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-64'],
            ['major_id' => 'RPL', 'question' => 'Apa fungsi utama perintah JOIN dalam SQL dan kapan menggunakannya?', 'options' => array (
  0 => 'Untuk menggabungkan kolom dari satu tabel saja',
  1 => 'Untuk menggabungkan baris dari dua atau lebih tabel berdasarkan kolom yang berelasi',
  2 => 'Untuk menghapus data dari beberapa tabel sekaligus',
  3 => 'Untuk membuat tabel baru dari hasil query',
  4 => 'Untuk mengurutkan data dari beberapa tabel',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'SQL/Database']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-65'],
            ['major_id' => 'RPL', 'question' => 'Apa itu primary key dalam database relasional dan apa fungsinya?', 'options' => array (
  0 => 'Kolom yang bisa berisi nilai NULL untuk menandai data kosong',
  1 => 'Kolom atau kombinasi kolom yang memastikan setiap baris dalam tabel memiliki nilai unik dan tidak boleh NULL',
  2 => 'Kolom yang hanya bisa menyimpan tipe data string',
  3 => 'Kolom yang digunakan untuk menyimpan password user',
  4 => 'Kolom yang otomatis terisi angka acak',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'SQL/Database']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-66'],
            ['major_id' => 'RPL', 'question' => 'Apa fungsi index di database dan bagaimana cara kerjanya dalam mempercepat query?', 'options' => array (
  0 => 'Index digunakan untuk mengenkripsi data di tabel',
  1 => 'Index membuat struktur data khusus (biasanya B-Tree) yang mempercepat pencarian data dengan mengurangi jumlah baris yang harus dibaca',
  2 => 'Index digunakan untuk menggabungkan beberapa tabel menjadi satu',
  3 => 'Index berfungsi sebagai backup otomatis dari data',
  4 => 'Index hanya bisa dibuat pada kolom primary key',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'SQL/Database']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-67'],
            ['major_id' => 'RPL', 'question' => 'Apa perbedaan antara INNER JOIN, LEFT JOIN, dan RIGHT JOIN dalam SQL?', 'options' => array (
  0 => 'INNER JOIN hanya mengembalikan baris yang cocok di kedua tabel, LEFT JOIN mengembalikan semua baris dari tabel kiri dan yang cocok dari tabel kanan, RIGHT JOIN kebalikannya',
  1 => 'INNER JOIN lebih cepat dari LEFT JOIN',
  2 => 'LEFT JOIN mengembalikan semua baris dari kedua tabel',
  3 => 'RIGHT JOIN hanya bisa digunakan dengan dua tabel',
  4 => 'Ketiga JOIN tersebut memiliki fungsi yang sama persis',
), 'correct' => 0, 'difficulty' => 'advanced', 'skill' => 'SQL/Database']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-68'],
            ['major_id' => 'RPL', 'question' => 'Apa itu database normalization dan apa tujuan utamanya dalam desain database?', 'options' => array (
  0 => 'Proses menghapus semua data duplikat dari database secara permanen',
  1 => 'Teknik memecah tabel besar menjadi tabel-tabel lebih kecil dan terhubung untuk mengurangi duplikasi data dan meningkatkan integritas data',
  2 => 'Proses menambahkan lebih banyak kolom ke tabel',
  3 => 'Cara untuk mengubah database dari SQL ke NoSQL',
  4 => 'Teknik untuk mengompresi ukuran database',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'SQL/Database']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-69'],
            ['major_id' => 'RPL', 'question' => 'Apa itu transaction dalam database dan mengapa transaksi penting untuk menjaga integritas data?', 'options' => array (
  0 => 'Fitur untuk mengirim notifikasi ke user saat data berubah',
  1 => 'Kumpulan operasi database yang dijalankan sebagai satu unit atomik, dijamin semua berhasil atau semua gagal untuk menjaga konsistensi data',
  2 => 'Fungsi untuk membuat backup database secara otomatis',
  3 => 'Cara untuk mengurutkan data dalam tabel',
  4 => 'Modul untuk mengelola user permissions',
), 'correct' => 1, 'difficulty' => 'expert', 'skill' => 'SQL/Database']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-70'],
            ['major_id' => 'RPL', 'question' => 'Apa yang dimaksud dengan prinsip ACID di database dan apa singkatan dari masing-masing komponennya?', 'options' => array (
  0 => 'Authentication, Connection, Identification, Database',
  1 => 'Atomicity (operasi tidak bisa dibagi), Consistency (data valid), Isolation (transaksi tidak mengganggu satu sama lain), Durability (data tersimpan permanen setelah commit)',
  2 => 'Access, Control, Index, Data',
  3 => 'Add, Check, Insert, Delete',
  4 => 'Asynchronous, Concurrent, Independent, Distributed',
), 'correct' => 1, 'difficulty' => 'expert', 'skill' => 'SQL/Database']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-71'],
            ['major_id' => 'RPL', 'question' => 'Apa fungsi utama perintah \'git clone\' di Git?', 'options' => array (
  0 => 'Membuat branch baru dari branch yang sedang aktif',
  1 => 'Membuat salinan lengkap dari repository remote ke komputer lokal',
  2 => 'Menggabungkan dua branch menjadi satu',
  3 => 'Menghapus repository dari remote',
  4 => 'Melihat perbedaan antara dua commit',
), 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'Git']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-72'],
            ['major_id' => 'RPL', 'question' => 'Bagaimana cara melakukan commit perubahan di Git dengan pesan commit?', 'options' => array (
  0 => 'git save -m \'pesan\'',
  1 => 'git commit -m \'pesan\'',
  2 => 'git push -m \'pesan\'',
  3 => 'git log -m \'pesan\'',
  4 => 'git add -m \'pesan\'',
), 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'Git']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-73'],
            ['major_id' => 'RPL', 'question' => 'Apa perbedaan antara \'git pull\' dan \'git fetch\' di Git?', 'options' => array (
  0 => 'git pull hanya bisa digunakan di GitHub, git fetch di GitLab',
  1 => 'git fetch hanya mengambil perubahan dari remote tanpa menggabungkan, git pull mengambil dan langsung menggabungkan ke branch lokal',
  2 => 'git pull menghapus branch remote, git fetch membuat branch baru',
  3 => 'git fetch lebih cepat dari git pull',
  4 => 'Keduanya memiliki fungsi yang sama persis',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'Git']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-74'],
            ['major_id' => 'RPL', 'question' => 'Apa fungsi perintah \'git branch\' di Git?', 'options' => array (
  0 => 'Menghapus branch yang sudah tidak digunakan',
  1 => 'Membuat branch baru, atau melihat daftar branch yang ada di repository lokal',
  2 => 'Menggabungkan dua branch menjadi satu',
  3 => 'Menampilkan history commit dari branch tertentu',
  4 => 'Mengatur remote repository',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'Git']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-75'],
            ['major_id' => 'RPL', 'question' => 'Bagaimana cara menggabungkan branch \'feature-login\' ke branch \'main\' di Git?', 'options' => array (
  0 => 'git rebase feature-login main',
  1 => 'git merge feature-login (saat branch \'main\' sedang aktif)',
  2 => 'git push feature-login main',
  3 => 'git add feature-login main',
  4 => 'git checkout feature-login main',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'Git']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-76'],
            ['major_id' => 'RPL', 'question' => 'Apa yang dilakukan \'git rebase\' dan apa perbedaannya dengan \'git merge\'?', 'options' => array (
  0 => 'git rebase menggabungkan branch dengan membuat merge commit, sedangkan git merge mengubah history',
  1 => 'git rebase mengambil commit dari branch lain dan menempatkannya di atas branch saat ini tanpa membuat merge commit, sedangkan git merge membuat merge commit',
  2 => 'git rebase hanya bisa digunakan untuk repository kosong',
  3 => 'git merge menghapus history, git rebase mempertahankannya',
  4 => 'Keduanya memiliki hasil yang sama persis tanpa perbedaan',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'Git']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-77'],
            ['major_id' => 'RPL', 'question' => 'Apa itu \'git stash\' dan kapan sebaiknya menggunakannya?', 'options' => array (
  0 => 'Fitur untuk menghapus semua perubahan secara permanen',
  1 => 'Menyimpan perubahan yang belum di-commit secara sementara agar bisa beralih branch tanpa kehilangan pekerjaan',
  2 => 'Cara untuk mengunci repository agar tidak bisa diubah',
  3 => 'Perintah untuk menghapus stash yang sudah tidak dibutuhkan',
  4 => 'Fitur untuk membuat backup branch',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'Git']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-78'],
            ['major_id' => 'RPL', 'question' => 'Apa fungsi \'git cherry-pick\' dan bagaimana cara menggunakannya?', 'options' => array (
  0 => 'Untuk menghapus commit tertentu dari branch',
  1 => 'Untuk mengambil commit tertentu dari branch lain dan menerapkannya ke branch saat ini tanpa menggabungkan seluruh branch',
  2 => 'Untuk membuat salinan repository',
  3 => 'Untuk mengurutkan commit berdasarkan waktu',
  4 => 'Untuk menandai commit sebagai penting',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'Git']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-79'],
            ['major_id' => 'RPL', 'question' => 'Bagaimana cara yang benar untuk menyelesaikan merge conflict di Git?', 'options' => array (
  0 => 'Gunakan \'git reset --hard\' untuk menghapus semua perubahan yang konflik',
  1 => 'Edit file yang mengalami konflik untuk menyelesaikan perbedaan, lalu stage file yang sudah diperbaiki dan buat commit',
  2 => 'Hapus branch yang menyebabkan konflik lalu buat branch baru',
  3 => 'Gunakan \'git push --force\' untuk menimpa perubahan',
  4 => 'Tutup terminal dan buka repository baru',
), 'correct' => 1, 'difficulty' => 'expert', 'skill' => 'Git']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-80'],
            ['major_id' => 'RPL', 'question' => 'Apa fungsi \'git bisect\' dan bagaimana cara kerjanya?', 'options' => array (
  0 => 'Untuk membandingkan ukuran file di antara commit',
  1 => 'Melakukan binary search secara otomatis di antara commit untuk menemukan commit yang memperkenalkan bug',
  2 => 'Untuk membagi repository menjadi beberapa bagian',
  3 => 'Untuk memotong branch menjadi beberapa commit kecil',
  4 => 'Untuk memeriksa integritas repository',
), 'correct' => 1, 'difficulty' => 'expert', 'skill' => 'Git']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-81'],
            ['major_id' => 'RPL', 'question' => 'Apa fungsi utama Dockerfile dalam ekosistem Docker?', 'options' => array (
  0 => 'Mengelola jaringan antar container',
  1 => 'Mendefinisikan instruksi dan konfigurasi untuk membangun sebuah Docker image secara otomatis',
  2 => 'Menjalankan container di production',
  3 => 'Mengelola volume data di container',
  4 => 'Mengatur akses user ke Docker Hub',
), 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'Docker']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-82'],
            ['major_id' => 'RPL', 'question' => 'Perintah apa yang digunakan untuk membangun Docker image dari Dockerfile?', 'options' => array (
  0 => 'docker create -t nama-image .',
  1 => 'docker build -t nama-image .',
  2 => 'docker make -t nama-image .',
  3 => 'docker run -t nama-image .',
  4 => 'docker start -t nama-image .',
), 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'Docker']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-83'],
            ['major_id' => 'RPL', 'question' => 'Apa fungsi Docker Compose dan kapan sebaiknya menggunakannya?', 'options' => array (
  0 => 'Untuk menginstall Docker di komputer lokal',
  1 => 'Untuk mendefinisi dan menjalankan aplikasi multi-container dengan satu perintah menggunakan file YAML konfigurasi',
  2 => 'Untuk mengompresi image Docker agar lebih kecil',
  3 => 'Untuk mengelola single container secara manual',
  4 => 'Untuk membuat Dockerfile secara otomatis',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'Docker']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-84'],
            ['major_id' => 'RPL', 'question' => 'Apa perbedaan antara Docker image dan Docker container?', 'options' => array (
  0 => 'Image dan container memiliki fungsi yang sama persis',
  1 => 'Image adalah template/read-only yang berisi instruksi untuk membuat container, container adalah instance yang sedang berjalan dari image',
  2 => 'Container bisa dijalankan tanpa image',
  3 => 'Image hanya bisa dibuat dari Docker Hub, container dari file lokal',
  4 => 'Container bersifat read-only, image bersifat mutable',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'Docker']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-85'],
            ['major_id' => 'RPL', 'question' => 'Bagaimana cara menjalankan Docker container dari image dan membuka port 3000 di container ke port 8080 di host?', 'options' => array (
  0 => 'docker run -p 8080:3000 nama-image',
  1 => 'docker start -p 3000:8080 nama-image',
  2 => 'docker run -p 3000:8080 nama-image',
  3 => 'docker run --port 8080:3000 nama-image',
  4 => 'docker create -p 8080:3000 nama-image',
), 'correct' => 0, 'difficulty' => 'intermediate', 'skill' => 'Docker']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-86'],
            ['major_id' => 'RPL', 'question' => 'Apa itu multi-stage build di Docker dan apa keuntungannya?', 'options' => array (
  0 => 'Cara untuk menjalankan container dalam beberapa tahap secara manual',
  1 => 'Teknik menggunakan beberapa FROM dalam satu Dockerfile untuk membangun dan mengompresi aplikasi, menghasilkan image production yang jauh lebih kecil',
  2 => 'Fitur untuk menjalankan beberapa container dalam satu image',
  3 => 'Cara untuk membuat backup image dalam beberapa tahap',
  4 => 'Teknik untuk menggabungkan beberapa Dockerfile menjadi satu',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'Docker']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-87'],
            ['major_id' => 'RPL', 'question' => 'Apa itu Docker volume dan mengapa digunakan daripada menyimpan data di dalam container?', 'options' => array (
  0 => 'Volume adalah fitur untuk mempercepat akses ke container',
  1 => 'Volume menyimpan data secara persisten di luar container, sehingga data tidak hilang saat container dihentikan atau dihapus',
  2 => 'Volume hanya bisa digunakan dengan Docker Compose',
  3 => 'Volume berfungsi untuk mengenkripsi data di container',
  4 => 'Volume mengurangi ukuran Docker image secara otomatis',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'Docker']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-88'],
            ['major_id' => 'RPL', 'question' => 'Apa fungsi Docker network dan bagaimana cara containers berkomunikasi satu sama lain?', 'options' => array (
  0 => 'Docker network hanya digunakan untuk menghubungkan container dengan internet',
  1 => 'Docker network memungkinkan containers berkomunikasi satu sama lain menggunakan nama service sebagai hostname dalam network yang sama',
  2 => 'Docker network berfungsi untuk mengenkripsi komunikasi antar container',
  3 => 'Docker network hanya tersedia di Docker Desktop',
  4 => 'Docker network otomatis membuat container bisa diakses dari luar jaringan',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'Docker']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-89'],
            ['major_id' => 'RPL', 'question' => 'Bagaimana cara mengoptimasi ukuran Docker image agar lebih kecil untuk production?', 'options' => array (
  0 => 'Gunakan base image yang besar agar lebih banyak fitur yang tersedia',
  1 => 'Gunakan base image minimal seperti alpine, manfaatkan multi-stage build, dan buat .dockerignore untuk mengecualikan file tidak perlu',
  2 => 'Kompres Dockerfile agar lebih ringan',
  3 => 'Gunakan semua perintah RUN dalam satu baris tanpa memperhatikan layer caching',
  4 => 'Hapus semua dependency agar image sekecil mungkin',
), 'correct' => 1, 'difficulty' => 'expert', 'skill' => 'Docker']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-90'],
            ['major_id' => 'RPL', 'question' => 'Apa itu Docker layer caching dan bagaimana cara kerjanya mempercepat proses build?', 'options' => array (
  0 => 'Fitur untuk menyimpan cache di browser saat mengakses aplikasi Docker',
  1 => 'Mekanisme yang menyimpan setiap layer (instruksi) Dockerfile secara terpisah, sehingga layer yang tidak berubah tidak perlu dibangun ulang saat rebuild image',
  2 => 'Cara untuk mengompresi semua layer menjadi satu layer',
  3 => 'Fitur untuk menyimpan log build di folder khusus',
  4 => 'Mekanisme untuk menyinkronkan layer antar komputer',
), 'correct' => 1, 'difficulty' => 'expert', 'skill' => 'Docker']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-91'],
            ['major_id' => 'RPL', 'question' => 'Apa fungsi dari metode HTTP GET dalam sebuah REST API?', 'options' => array (
  0 => 'Membuat data baru di server',
  1 => 'Mengambil atau membaca data dari resource di server',
  2 => 'Memperbarui data yang sudah ada di server',
  3 => 'Menghapus data dari server',
  4 => 'Mengganti seluruh data di server',
), 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'REST API']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-92'],
            ['major_id' => 'RPL', 'question' => 'Apa yang dimaksud dengan REST API dalam konteks pengembangan web?', 'options' => array (
  0 => 'Database yang digunakan untuk menyimpan data secara terdistribusi',
  1 => 'Arsitektur interface untuk komunikasi antara client dan server menggunakan protokol HTTP dengan resource yang diakses melalui URL',
  2 => 'Bahasa pemrograman untuk membuat frontend',
  3 => 'Sistem operasi khusus untuk server',
  4 => 'Framework CSS untuk membuat tampilan API',
), 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'REST API']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-93'],
            ['major_id' => 'RPL', 'question' => 'Apa perbedaan antara metode HTTP PUT dan PATCH dalam REST API?', 'options' => array (
  0 => 'PUT mengganti seluruh resource dengan data baru, PATCH hanya memperbarui sebagian field dari resource yang sudah ada',
  1 => 'PUT hanya bisa digunakan untuk data string, PATCH untuk semua tipe data',
  2 => 'PUT menghapus resource, PATCH membuat resource baru',
  3 => 'PUT lebih cepat dari PATCH',
  4 => 'PATCH bisa mengubah URL resource, PUT tidak bisa',
), 'correct' => 0, 'difficulty' => 'intermediate', 'skill' => 'REST API']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-94'],
            ['major_id' => 'RPL', 'question' => 'Apa arti HTTP status code 404 dalam response REST API?', 'options' => array (
  0 => 'Request berhasil dan data dikembalikan',
  1 => 'Terjadi error di server saat memproses request',
  2 => 'Resource yang diminta tidak ditemukan di server',
  3 => 'User tidak memiliki akses ke resource',
  4 => 'Request terlalu besar untuk diproses',
), 'correct' => 2, 'difficulty' => 'intermediate', 'skill' => 'REST API']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-95'],
            ['major_id' => 'RPL', 'question' => 'Apa format data yang paling umum digunakan untuk pertukaran data dalam REST API?', 'options' => array (
  0 => 'XML',
  1 => 'JSON (JavaScript Object Notation)',
  2 => 'CSV',
  3 => 'YAML',
  4 => 'HTML',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'REST API']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-96'],
            ['major_id' => 'RPL', 'question' => 'Apa itu authentication dalam REST API dan apa perbedaannya dengan authorization?', 'options' => array (
  0 => 'Authentication dan authorization memiliki fungsi yang sama',
  1 => 'Authentication memverifikasi identitas user (siapa Anda), authorization menentukan akses resource (apa yang boleh Anda lakukan)',
  2 => 'Authentication hanya digunakan untuk admin, authorization untuk semua user',
  3 => 'Authentication dilakukan di client, authorization di server',
  4 => 'Authentication hanya berlaku untuk GET request',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'REST API']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-97'],
            ['major_id' => 'RPL', 'question' => 'Apa itu rate limiting dalam REST API dan mengapa penting untuk diterapkan?', 'options' => array (
  0 => 'Fitur untuk mempercepat response API',
  1 => 'Membatasi jumlah request yang bisa dikirim client dalam periode waktu tertentu untuk mencegah penyalahgunaan dan menjaga kestabilan server',
  2 => 'Cara untuk mengurangi ukuran response body',
  3 => 'Teknik untuk meng-cache response di browser',
  4 => 'Fitur untuk mengompresi request payload',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'REST API']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-98'],
            ['major_id' => 'RPL', 'question' => 'Apa itu CORS (Cross-Origin Resource Sharing) di REST API dan mengapa diperlukan?', 'options' => array (
  0 => 'Teknik untuk mengenkripsi data antar server',
  1 => 'Mekanisme keamanan browser yang mengizinkan atau memblokir resource dari origin berbeda, diperlukan agar aplikasi di satu domain bisa mengakses API di domain lain',
  2 => 'Cara untuk mengompresi data agar lebih ringan',
  3 => 'Fitur untuk mengelola cache di browser',
  4 => 'Protokol untuk komunikasi WebSocket',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'REST API']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-99'],
            ['major_id' => 'RPL', 'question' => 'Apa itu API versioning dan mengapa penting untuk diterapkan dalam REST API yang sudah digunakan di production?', 'options' => array (
  0 => 'Cara untuk mengubah URL API setiap kali ada perubahan kode',
  1 => 'Teknik untuk membuat beberapa versi API secara bersamaan agar perubahan tidak memecah client yang sudah ada, contohnya /api/v1/users dan /api/v2/users',
  2 => 'Fitur untuk menampilkan versi JavaScript yang digunakan',
  3 => 'Cara untuk menghapus versi lama dari server secara otomatis',
  4 => 'Teknik untuk mengganti format response dari JSON ke XML',
), 'correct' => 1, 'difficulty' => 'expert', 'skill' => 'REST API']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'rpl-100'],
            ['major_id' => 'RPL', 'question' => 'Apa itu HATEOAS (Hypermedia as the Engine of Application State) dalam REST API dan apa manfaatnya?', 'options' => array (
  0 => 'Teknik kompresi data untuk mengurangi ukuran response',
  1 => 'Prinsip REST yang menambahkan link navigasi dalam response sehingga client bisa menjelajahi resource tanpa mengetahui URL secara hardcoded',
  2 => 'Protokol autentikasi baru untuk REST API',
  3 => 'Cara untuk membuat API documentation otomatis',
  4 => 'Teknik caching untuk mempercepat response',
), 'correct' => 1, 'difficulty' => 'expert', 'skill' => 'REST API']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-01'],
            ['major_id' => 'DKV', 'question' => 'Apa yang dimaksud dengan \'Component\' di Figma?', 'options' => array (
  0 => 'File yang belum disimpan',
  1 => 'Library berisi ikon-ikon bawaan Figma',
  2 => 'Elemen reusable yang dapat digunakan berulang kali dengan konsisten',
  3 => 'Efek visual pada layer tertentu',
  4 => 'Sistem pembagian proyek dengan tim',
), 'correct' => 2, 'difficulty' => 'basic', 'skill' => 'Figma']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-02'],
            ['major_id' => 'DKV', 'question' => 'Apa fungsi utama dari fitur \'Auto Layout\' di Figma?', 'options' => array (
  0 => 'Membuat elemen otomatis mengatur posisi, ukuran, dan spacing di dalam frame',
  1 => 'Membuat animasi transisi antar frame',
  2 => 'Mengunci posisi elemen agar tidak bisa dipindahkan',
  3 => 'Mengubah warna elemen secara otomatis',
  4 => 'Membuat duplikat elemen secara otomatis',
), 'correct' => 0, 'difficulty' => 'basic', 'skill' => 'Figma']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-03'],
            ['major_id' => 'DKV', 'question' => 'Fitur \'Variants\' di Figma digunakan untuk?', 'options' => array (
  0 => 'Membuat backup file proyek',
  1 => 'Mengekspor file ke format PDF',
  2 => 'Menambahkan komentar pada desain',
  3 => 'Mengelola beberapa versi state dari sebuah komponen dalam satu bundle',
  4 => 'Mengatur permission akses tim',
), 'correct' => 3, 'difficulty' => 'intermediate', 'skill' => 'Figma']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-04'],
            ['major_id' => 'DKV', 'question' => 'Apa kegunaan \'Constraints\' dalam Figma?', 'options' => array (
  0 => 'Membatasi jumlah layer yang bisa dibuat',
  1 => 'Mengatur bagaimana elemen merespons perubahan ukuran parent frame',
  2 => 'Membatasi akses pengguna terhadap file tertentu',
  3 => 'Membatasi ukuran file proyek',
  4 => 'Membatasi resolusi gambar yang diimpor',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'Figma']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-05'],
            ['major_id' => 'DKV', 'question' => 'Perbedaan antara \'Instance\' dan \'Master Component\' di Figma adalah?', 'options' => array (
  0 => 'Instance adalah komponen utama, Master Component adalah salinannya',
  1 => 'Master Component hanya bisa dibuat di versi premium',
  2 => 'Instance adalah salinan dari Master Component yang tetap terhubung dengannya',
  3 => 'Tidak ada perbedaan, keduanya adalah hal yang sama',
  4 => 'Master Component tidak bisa dimodifikasi setelah dibuat',
), 'correct' => 4, 'difficulty' => 'intermediate', 'skill' => 'Figma']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-06'],
            ['major_id' => 'DKV', 'question' => 'Fungsi \'Dev Mode\' di Figma dirancang untuk?', 'options' => array (
  0 => 'Mengedit kode sumber dari desain',
  1 => 'Memberikan spesifikasi desain seperti spacing, warna, dan kode untuk pengembang',
  2 => 'Membuat animasi CSS secara otomatis',
  3 => 'Mengompresi file desain agar lebih kecil',
  4 => 'Membuat repository Git dari desain',
), 'correct' => 2, 'difficulty' => 'advanced', 'skill' => 'Figma']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-07'],
            ['major_id' => 'DKV', 'question' => 'Apa yang dimaksud dengan \'Branching\' dalam Figma?', 'options' => array (
  0 => 'Fitur untuk membuat salinan kerja dari file utama agar bisa diedit secara paralel tanpa mengubah versi utama',
  1 => 'Membuat salinan file untuk diunduh',
  2 => 'Menggabungkan dua file menjadi satu',
  3 => 'Membuat versi cetak dari desain digital',
  4 => 'Membagi layar menjadi beberapa bagian',
), 'correct' => 0, 'difficulty' => 'advanced', 'skill' => 'Figma']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-08'],
            ['major_id' => 'DKV', 'question' => 'Bagaimana cara membuat prototipe interaktif dengan \'Smart Animate\' di Figma?', 'options' => array (
  0 => 'Menambahkan efek blur pada kedua frame',
  1 => 'Menggunakan plugin animasi pihak ketiga',
  2 => 'Mengubah format file menjadi GIF',
  3 => 'Membuat frame dengan nama yang sama pada layer yang berbeda lalu menghubungkannya dengan prototype connection',
  4 => 'Menambahkan keyframe pada timeline Figma',
), 'correct' => 3, 'difficulty' => 'advanced', 'skill' => 'Figma']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-09'],
            ['major_id' => 'DKV', 'question' => 'Dalam Figma, \'Auto Layout\' dengan properti \'Wrap\' berfungsi untuk?', 'options' => array (
  0 => 'Membungkus teks agar tidak keluar dari frame',
  1 => 'Membungkus elemen ke baris baru jika tidak muat dalam satu baris',
  2 => 'Mengunci elemen agar tidak bisa di-wrap oleh designer lain',
  3 => 'Membuat efek bayangan melingkar',
  4 => 'Mengubah orientasi desain dari vertikal ke horizontal',
), 'correct' => 4, 'difficulty' => 'expert', 'skill' => 'Figma']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-10'],
            ['major_id' => 'DKV', 'question' => 'Bagaimana cara menghubungkan variabel desain (Design Tokens) dengan komponen di Figma menggunakan fitur \'Variables\'?', 'options' => array (
  0 => 'Mengimpor file JSON ke dalam plugin Figma',
  1 => 'Membuat variabel warna, spacing, dan ukuran, lalu menghubungkannya ke properti komponen melalui mode collections',
  2 => 'Menggunakan panel CSS langsung di Figma',
  3 => 'Membuat style manual dengan menyalin kode warna',
  4 => 'Variabel hanya bisa digunakan untuk warna, bukan untuk spacing',
), 'correct' => 1, 'difficulty' => 'expert', 'skill' => 'Figma']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-11'],
            ['major_id' => 'DKV', 'question' => 'Apa fungsi dari tool \'Magic Wand\' di Adobe Photoshop?', 'options' => array (
  0 => 'Menggambar bentuk bebas dengan tangan',
  1 => 'Memilih area berdasarkan kesamaan warna',
  2 => 'Membuat teks pada gambar',
  3 => 'Menghapus background gambar',
  4 => 'Mengatur kecerahan gambar',
), 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'Adobe Photoshop']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-12'],
            ['major_id' => 'DKV', 'question' => 'Format file apa yang mendukung transparansi dan biasa digunakan untuk logo di Photoshop?', 'options' => array (
  0 => 'JPEG (.jpg)',
  1 => 'BMP (.bmp)',
  2 => 'PNG (.png)',
  3 => 'TIFF (.tiff)',
  4 => 'GIF (.gif)',
), 'correct' => 3, 'difficulty' => 'basic', 'skill' => 'Adobe Photoshop']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-13'],
            ['major_id' => 'DKV', 'question' => 'Apa perbedaan antara \'Layer Mask\' dan \'Clipping Mask\' di Photoshop?', 'options' => array (
  0 => 'Layer Mask menampilkan bagian layer tertentu menggunakan hitam-putih, Clipping Mask membuat satu layer mengikuti bentuk transparansi layer di bawahnya',
  1 => 'Keduanya memiliki fungsi yang sama persis',
  2 => 'Layer Mask hanya digunakan untuk teks, Clipping Mask untuk gambar',
  3 => 'Clipping Mask menghapus layer, Layer Mask menyimpannya',
  4 => 'Layer Mask berwarna putih, Clipping Mask berwarna hitam',
), 'correct' => 0, 'difficulty' => 'intermediate', 'skill' => 'Adobe Photoshop']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-14'],
            ['major_id' => 'DKV', 'question' => 'Fitur \'Smart Object\' di Photoshop memungkinkan pengguna untuk?', 'options' => array (
  0 => 'Mengedit gambar secara langsung tanpa merusak kualitas asli',
  1 => 'Mengimpor video ke dalam proyek Photoshop',
  2 => 'Membuat animasi GIF dengan mudah',
  3 => 'Menghapus semua layer dalam satu klik',
  4 => 'Mengubah resolusi gambar menjadi lebih rendah',
), 'correct' => 4, 'difficulty' => 'intermediate', 'skill' => 'Adobe Photoshop']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-15'],
            ['major_id' => 'DKV', 'question' => 'Blend mode \'Multiply\' di Photoshop berfungsi untuk?', 'options' => array (
  0 => 'Mencerahkan gambar dengan menggabungkan dua layer',
  1 => 'Menggelapkan gambar dengan mengalikan nilai warna kedua layer',
  2 => 'Membuat efek transparan pada gambar',
  3 => 'Menambahkan ketajaman pada gambar',
  4 => 'Membuat gambar menjadi monokrom',
), 'correct' => 2, 'difficulty' => 'intermediate', 'skill' => 'Adobe Photoshop']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-16'],
            ['major_id' => 'DKV', 'question' => 'Perbedaan antara \'Adjustment Layer\' dan mengatur langsung melalui menu \'Image > Adjustments\' adalah?', 'options' => array (
  0 => 'Adjustment Layer bersifat non-destruktif dan bisa dihapus kapan saja, sedangkan pengaturan langsung merusak pixel asli',
  1 => 'Tidak ada perbedaan, keduanya menghasilkan output yang sama persis',
  2 => 'Adjustment Layer hanya berfungsi di versi Photoshop tertentu',
  3 => 'Pengaturan langsung lebih cepat daripada Adjustment Layer',
  4 => 'Adjustment Layer hanya bisa digunakan untuk saturasi warna',
), 'correct' => 3, 'difficulty' => 'advanced', 'skill' => 'Adobe Photoshop']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-17'],
            ['major_id' => 'DKV', 'question' => 'Dalam Photoshop, \'Channel Mixer\' digunakan untuk?', 'options' => array (
  0 => 'Menggabungkan beberapa gambar menjadi satu',
  1 => 'Mengatur kontribusi masing-masing channel warna (RGB/CMYK) terhadap output gambar',
  2 => 'Mengubah format warna dari RGB ke grayscale',
  3 => 'Membuat efek blur pada gambar',
  4 => 'Mengatur opacity layer secara otomatis',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'Adobe Photoshop']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-18'],
            ['major_id' => 'DKV', 'question' => 'Apa fungsi dari \'Action\' di Photoshop?', 'options' => array (
  0 => 'Membuat efek artistik pada gambar',
  1 => 'Merekam dan menjalankan serangkaian langkah editing secara otomatis untuk batch processing',
  2 => 'Mengedit metadata gambar',
  3 => 'Mengatur preferensi tampilan workspace',
  4 => 'Membuat watermark pada gambar',
), 'correct' => 4, 'difficulty' => 'advanced', 'skill' => 'Adobe Photoshop']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-19'],
            ['major_id' => 'DKV', 'question' => 'Fitur \'Content-Aware Fill\' di Photoshop bekerja dengan cara?', 'options' => array (
  0 => 'Menghapus seluruh gambar dan menggantinya dengan warna solid',
  1 => 'Menganalisis piksel di sekitar area seleksi dan mengisinya dengan konten yang sesuai secara cerdas',
  2 => 'Mengimpor gambar dari perpustakaan Adobe Stock',
  3 => 'Membuat seleksi berdasarkan bentuk geometris',
  4 => 'Mengubah ukuran gambar secara otomatis',
), 'correct' => 0, 'difficulty' => 'expert', 'skill' => 'Adobe Photoshop']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-20'],
            ['major_id' => 'DKV', 'question' => 'Dalam alur kerja Photoshop profesional, apa yang dimaksud dengan \'Non-Destructive Editing\' dan bagaimana penerapannya?', 'options' => array (
  0 => 'Teknik editing yang menggunakan filter untuk mengubah gambar secara permanen',
  1 => 'Proses menyalin gambar ke clipboard sebelum diedit',
  2 => 'Pendekatan editing yang mempertahankan pixel asli menggunakan Smart Objects, Adjustment Layers, dan Layer Masks',
  3 => 'Menggunakan hanya layer background saat mengedit',
  4 => 'Teknik untuk menghapus semua history editing',
), 'correct' => 2, 'difficulty' => 'expert', 'skill' => 'Adobe Photoshop']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-21'],
            ['major_id' => 'DKV', 'question' => 'Perbedaan utama antara gambar vektor dan raster di Illustrator adalah?', 'options' => array (
  0 => 'Gambar vektor menggunakan piksel, gambar raster menggunakan matematika',
  1 => 'Gambar vektor menggunakan persamaan matematika sehingga bisa di-skalakan tanpa kehilangan kualitas',
  2 => 'Gambar raster lebih cocok untuk cetak, gambar vektor untuk web',
  3 => 'Gambar vektor tidak bisa berwarna, gambar raster bisa berwarna',
  4 => 'Tidak ada perbedaan keduanya adalah format yang sama',
), 'correct' => 3, 'difficulty' => 'basic', 'skill' => 'Adobe Illustrator']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-22'],
            ['major_id' => 'DKV', 'question' => 'Apa fungsi dari tool \'Pen Tool\' di Adobe Illustrator?', 'options' => array (
  0 => 'Menggambar garis lurus saja',
  1 => 'Membuat path vektor dengan anchor point dan bezier curve secara presisi',
  2 => 'Mengisi warna pada bentuk yang sudah ada',
  3 => 'Menghapus objek yang dipilih',
  4 => 'Mengatur ukuran artboard',
), 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'Adobe Illustrator']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-23'],
            ['major_id' => 'DKV', 'question' => 'Fitur \'Image Trace\' di Illustrator berfungsi untuk?', 'options' => array (
  0 => 'Menambahkan watermark pada gambar raster',
  1 => 'Mengonversi gambar raster menjadi gambar vektor secara otomatis',
  2 => 'Mengubah ukuran gambar raster',
  3 => 'Menghapus background dari gambar raster',
  4 => 'Menggabungkan dua gambar raster',
), 'correct' => 4, 'difficulty' => 'intermediate', 'skill' => 'Adobe Illustrator']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-24'],
            ['major_id' => 'DKV', 'question' => 'Apa yang dimaksud dengan \'Compound Path\' di Illustrator?', 'options' => array (
  0 => 'Dua atau lebih path yang digabungkan sehingga area tumpang tindih menjadi transparan (lubang)',
  1 => 'Garis yang menghubungkan dua objek',
  2 => 'Path yang sudah di-kunci dan tidak bisa diedit',
  3 => 'Semua objek dalam satu layer',
  4 => 'Path yang dibuat menggunakan mouse',
), 'correct' => 0, 'difficulty' => 'intermediate', 'skill' => 'Adobe Illustrator']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-25'],
            ['major_id' => 'DKV', 'question' => 'Apa fungsi dari panel \'Appearance\' di Adobe Illustrator?', 'options' => array (
  0 => 'Mengatur ukuran dan orientasi artboard',
  1 => 'Mengelola dan mengedit multiple fill, stroke, dan efek pada satu objek dalam satu panel',
  2 => 'Menampilkan preview cetak dari desain',
  3 => 'Mengatur pengaturan koneksi printer',
  4 => 'Mengelola bookmark dokumen',
), 'correct' => 2, 'difficulty' => 'intermediate', 'skill' => 'Adobe Illustrator']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-26'],
            ['major_id' => 'DKV', 'question' => 'Teknik \'Clipping Mask\' di Illustrator digunakan untuk?', 'options' => array (
  0 => 'Membatasi tampilan objek di atas agar hanya menampilkan area yang tertutup oleh objek di bawahnya',
  1 => 'Membuat objek menjadi lebih gelap',
  2 => 'Menggabungkan dua objek menjadi satu',
  3 => 'Membuat efek bayangan pada objek',
  4 => 'Mengatur urutan layer',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'Adobe Illustrator']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-27'],
            ['major_id' => 'DKV', 'question' => 'Fitur \'Mesh Gradient\' di Illustrator memungkinkan designer untuk?', 'options' => array (
  0 => 'Membuat gradient dengan dua warna saja',
  1 => 'Menggabungkan dua gradient menjadi satu',
  2 => 'Membuat gradient hanya pada tepi objek',
  3 => 'Membuat gradient multi-warna yang kompleks dengan kontrol titik-titik kontrol di dalam area objek',
  4 => 'Mengubah gradient menjadi pola',
), 'correct' => 3, 'difficulty' => 'advanced', 'skill' => 'Adobe Illustrator']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-28'],
            ['major_id' => 'DKV', 'question' => 'Apa perbedaan antara \'Artboard\' dan \'Canvas\' dalam konteks Illustrator?', 'options' => array (
  0 => 'Artboard adalah area kerja yang bisa diekspor, Canvas adalah area di luar artboard untuk menempatkan elemen sementara',
  1 => 'Canvas adalah area kerja yang bisa diekspor, Artboard adalah area di luar canvas',
  2 => 'Keduanya adalah istilah yang sama untuk area kerja',
  3 => 'Canvas hanya ada di versi Illustrator tertentu',
  4 => 'Artboard tidak bisa diekspor, Canvas bisa diekspor',
), 'correct' => 0, 'difficulty' => 'advanced', 'skill' => 'Adobe Illustrator']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-29'],
            ['major_id' => 'DKV', 'question' => 'Dalam alur kerja Illustrator profesional, \'Global Swatch\' berfungsi untuk?', 'options' => array (
  0 => 'Membuat warna yang hanya bisa digunakan sekali',
  1 => 'Mengunci warna agar tidak bisa diubah',
  2 => 'Mengatur warna yang jika diubah akan otomatis memperbarui semua objek yang menggunakannya di seluruh dokumen',
  3 => 'Mengekspor palet warna ke format lain',
  4 => 'Menghapus semua warna dari dokumen',
), 'correct' => 2, 'difficulty' => 'expert', 'skill' => 'Adobe Illustrator']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-30'],
            ['major_id' => 'DKV', 'question' => 'Apa yang dimaksud dengan \'Artboards\' multiple dalam satu dokumen Illustrator dan bagaimana strategi penggunaannya untuk proyek multi-halaman?', 'options' => array (
  0 => 'Artboards multiple hanya untuk versi cetak, tidak untuk digital',
  1 => 'Artboards multiple memungkinkan beberapa halaman/ukuran dalam satu file, memudahkan manajemen aset untuk brosur, poster, dan media sosial dalam satu proyek',
  2 => 'Artboards multiple hanya bisa berukuran sama',
  3 => 'Artboards multiple tidak bisa diekspor secara terpisah',
  4 => 'Artboards multiple hanya bisa berisi teks, bukan gambar',
), 'correct' => 4, 'difficulty' => 'expert', 'skill' => 'Adobe Illustrator']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-31'],
            ['major_id' => 'DKV', 'question' => 'Apa perbedaan utama antara UI (User Interface) dan UX (User Experience)?', 'options' => array (
  0 => 'UI fokus pada tampilan dan interaksi visual, UX fokus pada keseluruhan pengalaman dan kepuasan pengguna',
  1 => 'UI adalah proses riset pengguna, UX adalah tampilan visual aplikasi',
  2 => 'UI dan UX adalah hal yang sama',
  3 => 'UI hanya untuk mobile, UX hanya untuk desktop',
  4 => 'UX adalah bagian dari UI, UI lebih luas dari UX',
), 'correct' => 0, 'difficulty' => 'basic', 'skill' => 'UI/UX Design']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-32'],
            ['major_id' => 'DKV', 'question' => 'Apa yang dimaksud dengan \'User Persona\' dalam desain UX?', 'options' => array (
  0 => 'Profil palsu yang dibuat untuk mengisi formulir registrasi',
  1 => 'Representasi fiksi dari pengguna ideal yang dibuat berdasarkan riset untuk memahami kebutuhan dan perilaku target audiens',
  2 => 'Foto profil yang digunakan di media sosial',
  3 => 'Template desain yang bisa langsung digunakan',
  4 => 'Jenis font yang digunakan dalam desain UI',
), 'correct' => 2, 'difficulty' => 'basic', 'skill' => 'UI/UX Design']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-33'],
            ['major_id' => 'DKV', 'question' => 'Apa itu \'User Journey Map\'?', 'options' => array (
  0 => 'Peta lokasi pengguna di seluruh dunia',
  1 => 'Visualisasi langkah-langkah yang dilalui pengguna saat berinteraksi dengan produk dari awal hingga tujuan tercapai',
  2 => 'Diagram arsitektur informasi website',
  3 => 'Jadwal rilis produk',
  4 => 'Peta kompetitor dalam industri',
), 'correct' => 4, 'difficulty' => 'intermediate', 'skill' => 'UI/UX Design']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-34'],
            ['major_id' => 'DKV', 'question' => 'Prinsip \'Fitts\'s Law\' dalam UX Design menyatakan bahwa?', 'options' => array (
  0 => 'Ukuran elemen tidak mempengaruhi waktu pengguna menekan tombol',
  1 => 'Waktu untuk menjangkau target tergantung pada ukuran dan jarak target dari posisi saat ini',
  2 => 'Pengguna selalu lebih suka tombol kecil',
  3 => 'Jarak antar elemen tidak penting dalam desain',
  4 => 'Semua elemen harus memiliki ukuran yang sama',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'UI/UX Design']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-35'],
            ['major_id' => 'DKV', 'question' => 'Dalam UX Design, \'Wireframe\' berfungsi untuk?', 'options' => array (
  0 => 'Menampilkan versi akhir desain dengan warna dan detail visual',
  1 => 'Membuat cetak biru layout halaman yang menunjukkan struktur dan hierarki elemen tanpa detail visual',
  2 => 'Membuat animasi transisi antar halaman',
  3 => 'Mengkodekan halaman web',
  4 => 'Membuat presentasi klien',
), 'correct' => 3, 'difficulty' => 'intermediate', 'skill' => 'UI/UX Design']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-36'],
            ['major_id' => 'DKV', 'question' => 'Prinsip \'Hick\'s Law\' dalam UX Design menjelaskan bahwa?', 'options' => array (
  0 => 'Semakin banyak pilihan yang tersedia, semakin lama waktu pengguna untuk mengambil keputusan',
  1 => 'Warna-warna cerah selalu lebih baik untuk pengguna',
  2 => 'Teks harus selalu berukuran besar',
  3 => 'Animasi harus selalu ditambahkan dalam desain',
  4 => 'Pengguna tidak menyukai perubahan',
), 'correct' => 0, 'difficulty' => 'advanced', 'skill' => 'UI/UX Design']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-37'],
            ['major_id' => 'DKV', 'question' => 'Apa yang dimaksud dengan \'Usability Testing\' dan bagaimana metode pelaksanaannya?', 'options' => array (
  0 => 'Menguji kecepatan server website',
  1 => 'Mengobservasi pengguna nyata saat menyelesaikan tugas-tugas tertentu pada produk untuk mengidentifikasi masalah kegunaan',
  2 => 'Menguji kompatibilitas browser',
  3 => 'Mengukur jumlah unduhan aplikasi',
  4 => 'Menguji kekuatan infrastruktur IT',
), 'correct' => 2, 'difficulty' => 'advanced', 'skill' => 'UI/UX Design']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-38'],
            ['major_id' => 'DKV', 'question' => 'Apa perbedaan antara \'Responsive Design\' dan \'Adaptive Design\' dalam UI/UX?', 'options' => array (
  0 => 'Responsive menggunakan fluid grid yang berubah secara dinamis, Adaptive menggunakan beberapa layout khusus untuk ukuran layar tertentu',
  1 => 'Responsive menggunakan breakpoint tetap, Adaptive menggunakan fluid layout',
  2 => 'Responsive hanya untuk desktop, Adaptive hanya untuk mobile',
  3 => 'Tidak ada perbedaan, keduanya adalah istilah yang sama',
  4 => 'Adaptive selalu lebih baik daripada Responsive',
), 'correct' => 4, 'difficulty' => 'advanced', 'skill' => 'UI/UX Design']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-39'],
            ['major_id' => 'DKV', 'question' => 'Bagaimana penerapan \'A/B Testing\' dalam UX Research dan apa yang membedakannya dari usability testing tradisional?', 'options' => array (
  0 => 'A/B Testing hanya untuk menguji warna, usability testing untuk semua aspek',
  1 => 'A/B Testing membandingkan dua versi desain secara simultan pada pengguna nyata untuk mengukur metrik kinerja spesifik, sedangkan usability testing lebih kualitatif untuk mengidentifikasi masalah',
  2 => 'A/B Testing dilakukan tanpa pengguna, usability testing melibatkan pengguna',
  3 => 'A/B Testing hanya untuk website, usability testing untuk aplikasi mobile',
  4 => 'Keduanya selalu dilakukan secara bersamaan',
), 'correct' => 3, 'difficulty' => 'expert', 'skill' => 'UI/UX Design']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-40'],
            ['major_id' => 'DKV', 'question' => 'Dalam konteks UI/UX profesional, apa yang dimaksud dengan \'Design System\' dan komponen utamanya?', 'options' => array (
  0 => 'Sistem operasi yang digunakan untuk mengedit desain',
  1 => 'Kumpulan pedoman, komponen, dan pola desain yang bisa digunakan konsisten di seluruh produk, mencakup style guide, component library, dan dokumentasi',
  2 => 'Software untuk mengelola file desain',
  3 => 'Pola desain yang hanya berlaku untuk mobile',
  4 => 'Template email marketing',
), 'correct' => 1, 'difficulty' => 'expert', 'skill' => 'UI/UX Design']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-41'],
            ['major_id' => 'DKV', 'question' => 'Apa yang dimaksud dengan \'serif\' pada sebuah font?', 'options' => array (
  0 => 'Tanda baca berupa garis kecil yang menghias ujung-ujung huruf',
  1 => 'Jenis font tanpa dekorasi di ujung huruf',
  2 => 'Ukuran font yang digunakan untuk judul',
  3 => 'Jarak antar huruf dalam sebuah kata',
  4 => 'Jenis dekorasi visual di akhir stroke huruf yang membedakannya dari sans-serif',
), 'correct' => 4, 'difficulty' => 'basic', 'skill' => 'Typography']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-42'],
            ['major_id' => 'DKV', 'question' => 'Apa itu \'kerning\' dalam tipografi?', 'options' => array (
  0 => 'Jarak antara baris teks',
  1 => 'Jarak antara seluruh karakter dalam blok teks',
  2 => 'Pengaturan jarak antara dua karakter tertentu agar terlihat seimbang secara visual',
  3 => 'Ukuran font yang digunakan',
  4 => 'Tebal huruf pada sebuah teks',
), 'correct' => 2, 'difficulty' => 'basic', 'skill' => 'Typography']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-43'],
            ['major_id' => 'DKV', 'question' => 'Apa fungsi dari \'Typographic Hierarchy\' dalam desain?', 'options' => array (
  0 => 'Membuat semua teks memiliki ukuran yang sama',
  1 => 'Mengatur ukuran, bobot, warna, dan gaya teks untuk menunjukkan urutan informasi dan membimbing pembaca melalui konten',
  2 => 'Membuat teks menjadi lebih rumit',
  3 => 'Mengatur jumlah paragraf dalam halaman',
  4 => 'Membuat font menjadi lebih dekoratif',
), 'correct' => 0, 'difficulty' => 'intermediate', 'skill' => 'Typography']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-44'],
            ['major_id' => 'DKV', 'question' => 'Perbedaan antara \'Leading\' dan \'Tracking\' dalam tipografi adalah?', 'options' => array (
  0 => 'Leading mengatur jarak antar huruf, Tracking mengatur jarak antar baris',
  1 => 'Leading adalah jarak antar baris teks, Tracking adalah jarak antar seluruh karakter dalam blok teks',
  2 => 'Leading adalah ukuran font, Tracking adalah tebal font',
  3 => 'Leading hanya digunakan untuk judul, Tracking untuk body text',
  4 => 'Tidak ada perbedaan, keduanya adalah hal yang sama',
), 'correct' => 3, 'difficulty' => 'intermediate', 'skill' => 'Typography']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-45'],
            ['major_id' => 'DKV', 'question' => 'Apa yang dimaksud dengan \'Widow\' dan \'Orphan\' dalam tipografi?', 'options' => array (
  0 => 'Jenis font dekoratif yang digunakan untuk judul',
  1 => 'Widow adalah satu kata di akhir paragraf yang terisolasi di baris baru, Orphan adalah satu kata di awal baris yang terpisah dari paragraf asalnya',
  2 => 'Istilah untuk font yang sudah tidak dipakai',
  3 => 'Nama teknik cetak tradisional',
  4 => 'Ukuran margin halaman',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'Typography']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-46'],
            ['major_id' => 'DKV', 'question' => 'Apa itu \'Type Scale\' dan bagaimana penggunaannya dalam desain web?', 'options' => array (
  0 => 'Timbangan fisik untuk mengukur ukuran huruf cetak',
  1 => 'Sistem proporsional berbasis rasio matematika untuk menentukan ukuran font yang harmonis di seluruh hierarki desain',
  2 => 'Daftar semua jenis font yang tersedia',
  3 => 'Jenis ukuran font yang hanya berlaku untuk mobile',
  4 => 'Rasio yang menentukan berapa banyak teks yang boleh ada di halaman',
), 'correct' => 4, 'difficulty' => 'advanced', 'skill' => 'Typography']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-47'],
            ['major_id' => 'DKV', 'question' => 'Dalam tipografi profesional, berapa rentang ukuran font yang direkomendasikan untuk body text di web agar tetap mudah dibaca?', 'options' => array (
  0 => '8px - 10px untuk kenyamanan membaca maksimal',
  1 => '16px - 18px adalah rentang standar yang nyaman untuk body text di web',
  2 => '24px - 32px agar mudah dilihat dari jauh',
  3 => '4px - 6px untuk menghemat ruang',
  4 => '48px - 72px untuk keterbacaan optimal',
), 'correct' => 2, 'difficulty' => 'advanced', 'skill' => 'Typography']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-48'],
            ['major_id' => 'DKV', 'question' => 'Perbedaan antara \'Font Family\', \'Font Weight\', dan \'Font Style\' dalam CSS adalah?', 'options' => array (
  0 => 'Font Family menentukan ukuran, Font Weight menentukan warna, Font Style menentukan posisi',
  1 => 'Font Family menentukan jenis font, Font Weight menentukan ketebalan, Font Style menentukan gaya seperti italic atau normal',
  2 => 'Ketiganya adalah hal yang sama',
  3 => 'Font Family hanya ada di Photoshop, yang lain di CSS',
  4 => 'Font Weight hanya untuk font serif',
), 'correct' => 0, 'difficulty' => 'advanced', 'skill' => 'Typography']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-49'],
            ['major_id' => 'DKV', 'question' => 'Apa yang dimaksud dengan \'Font Licensing\' dan mengapa ini penting dalam proyek desain komersial?', 'options' => array (
  0 => 'Proses memilih font yang paling mahal untuk proyek',
  1 => 'Hak legal untuk menggunakan font tertentu, termasuk izin penggunaan komersial, modifikasi, dan distribusi yang berbeda di setiap lisensi',
  2 => 'Proses mencetak font di atas kertas',
  3 => 'Aturan tentang berapa banyak font yang boleh digunakan dalam satu desain',
  4 => 'Cara memasang font di komputer',
), 'correct' => 3, 'difficulty' => 'expert', 'skill' => 'Typography']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-50'],
            ['major_id' => 'DKV', 'question' => 'Bagaimana memilih kombinasi font yang tepat untuk proyek desain profesional dan apa prinsip-prinsip yang harus diperhatikan?', 'options' => array (
  0 => 'Menggunakan satu font saja untuk semua kebutuhan',
  1 => 'Menggunakan minimal 5 font berbeda agar desain lebih menarik',
  2 => 'Menggunakan font yang paling populer tanpa memperhatikan konteks',
  3 => 'Menggunakan font dekoratif untuk semua jenis konten',
  4 => 'Mengombinasikan font dengan kontras yang jelas namun harmonis, memperhatikan keseimbangan, personality brand, dan keterbacaan di berbagai ukuran',
), 'correct' => 1, 'difficulty' => 'expert', 'skill' => 'Typography']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-51'],
            ['major_id' => 'DKV', 'question' => 'Tiga warna primer dalam model warna RYB (Red Yellow Blue) adalah?', 'options' => array (
  0 => 'Merah, Hijau, Biru',
  1 => 'Cyan, Magenta, Kuning',
  2 => 'Merah, Kuning, Biru',
  3 => 'Hitam, Putih, Abu-abu',
  4 => 'Oranye, Ungu, Hijau',
), 'correct' => 3, 'difficulty' => 'basic', 'skill' => 'Color Theory']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-52'],
            ['major_id' => 'DKV', 'question' => 'Apa yang dimaksud dengan \'Color Wheel\' dalam teori warna?', 'options' => array (
  0 => 'Alat visual lingkaran yang menunjukkan hubungan antara warna-warna berdasarkan campuran cahaya atau pigmen',
  1 => 'Roda gila yang digunakan untuk mengukur kecepatan',
  2 => 'Program komputer untuk mengedit warna',
  3 => 'Jenis filter pada kamera',
  4 => 'Format file untuk menyimpan warna',
), 'correct' => 0, 'difficulty' => 'basic', 'skill' => 'Color Theory']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-53'],
            ['major_id' => 'DKV', 'question' => 'Skema warna \'Analogous\' dalam desain menggunakan?', 'options' => array (
  0 => 'Dua warna yang berhadapan di color wheel',
  1 => 'Tiga atau lebih warna yang bersebelahan di color wheel, menciptakan kombinasi yang harmonis dan nyaman dilihat',
  2 => 'Warna-warna yang sangat kontras',
  3 => 'Hanya satu warna dengan variasi tint dan shade',
  4 => 'Semua warna pelangi secara bersamaan',
), 'correct' => 2, 'difficulty' => 'intermediate', 'skill' => 'Color Theory']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-54'],
            ['major_id' => 'DKV', 'question' => 'Apa yang dimaksud dengan \'Complementary Colors\' (warna komplementer)?', 'options' => array (
  0 => 'Warna-warna yang berada di sebelah satu sama lain di color wheel',
  1 => 'Dua warna yang saling melengkapi dan berada berhadapan langsung di color wheel, menciptakan kontras tinggi saat dipadukan',
  2 => 'Warna-warna yang memiliki saturation sama',
  3 => 'Semua warna primer',
  4 => 'Warna-warna yang sama persis',
), 'correct' => 4, 'difficulty' => 'intermediate', 'skill' => 'Color Theory']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-55'],
            ['major_id' => 'DKV', 'question' => 'Apa perbedaan antara \'Hue\', \'Saturation\', dan \'Value\' dalam model warna HSV?', 'options' => array (
  0 => 'Hue adalah kecerahan, Saturation adalah warna, Value adalah kedalaman',
  1 => 'Hue adalah nama/jenis warna, Saturation adalah intensitas/kejenuhan warna, Value adalah tingkat kecerahan atau kegelapan warna',
  2 => 'Hue adalah ukuran font, Saturation adalah teks, Value adalah angka',
  3 => 'Hue hanya untuk warna merah, Saturation untuk warna biru',
  4 => 'HSV adalah format file gambar',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'Color Theory']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-56'],
            ['major_id' => 'DKV', 'question' => 'Apa itu \'Color Psychology\' dan bagaimana penerapannya dalam branding?', 'options' => array (
  0 => 'Ilmu memprediksi cuaca berdasarkan warna langit',
  1 => 'Studi tentang bagaimana warna mempengaruhi emosi, perilaku, dan persepsi manusia yang digunakan untuk membangun identitas visual brand yang tepat',
  2 => 'Teknik mencampur warna dengan proporsi yang tepat',
  3 => 'Cara mengatur kecerahan layar komputer',
  4 => 'Jenis software untuk mengedit warna',
), 'correct' => 3, 'difficulty' => 'advanced', 'skill' => 'Color Theory']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-57'],
            ['major_id' => 'DKV', 'question' => 'Dalam desain digital, apa perbedaan antara model warna RGB dan CMYK?', 'options' => array (
  0 => 'RGB untuk cetak, CMYK untuk layar',
  1 => 'RGB adalah model warna additive untuk layar digital, CMYK adalah model warna subtractive untuk pencetakan',
  2 => 'RGB hanya untuk warna hitam-putih',
  3 => 'CMYK hanya untuk fotografi',
  4 => 'Keduanya adalah model warna yang sama',
), 'correct' => 0, 'difficulty' => 'advanced', 'skill' => 'Color Theory']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-58'],
            ['major_id' => 'DKV', 'question' => 'Masalah \'Contrast Ratio\' yang rendah antara teks dan latar belakang berdampak pada?', 'options' => array (
  0 => 'Mempercepat loading website',
  1 => 'Menurunkan aksesibilitas dan keterbacaan, terutama bagi pengguna dengan gangguan penglihatan',
  2 => 'Meningkatkan estetika desain',
  3 => 'Mengurangi ukuran file gambar',
  4 => 'Meningkatkan jumlah pengunjung website',
), 'correct' => 2, 'difficulty' => 'advanced', 'skill' => 'Color Theory']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-59'],
            ['major_id' => 'DKV', 'question' => 'Dalam alur kerja desain profesional, bagaimana memastikan konsistensi warna dari layar ke cetak menggunakan profil warna ICC?', 'options' => array (
  0 => 'Menggunakan profil ICC tidak diperlukan, warna akan selalu sama',
  1 => 'ICC Profile mengkalibrasi warna antara perangkat, memastikan bahwa warna yang terlihat di monitor mendekati hasil cetak dengan menggunakan color management system yang tepat',
  2 => 'ICC Profile hanya untuk monitor CRT',
  3 => 'ICC Profile otomatis mengatur semua warna tanpa intervensi',
  4 => 'ICC Profile hanya digunakan di Photoshop',
), 'correct' => 4, 'difficulty' => 'expert', 'skill' => 'Color Theory']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-60'],
            ['major_id' => 'DKV', 'question' => 'Apa itu \'Color Gamut\' dan mengapa penting untuk dipertimbangkan saat bekerja dengan desain untuk berbagai media?', 'options' => array (
  0 => 'Jenis permainan teka-teki warna',
  1 => 'Rentang warna yang dapat direproduksi oleh perangkat atau media tertentu, penting untuk memastikan konsistensi warna antara layar dan cetak',
  2 => 'Jumlah warna yang tersedia di komputer',
  3 => 'Format file gambar',
  4 => 'Jenis printer yang digunakan',
), 'correct' => 1, 'difficulty' => 'expert', 'skill' => 'Color Theory']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-61'],
            ['major_id' => 'DKV', 'question' => 'Perbedaan antara \'Logo\' dan \'Brand\' adalah?', 'options' => array (
  0 => 'Logo dan Brand adalah hal yang sama persis',
  1 => 'Logo adalah simbol visual, Brand adalah keseluruhan persepsi dan pengalaman yang dirasakan konsumen terhadap sebuah perusahaan',
  2 => 'Logo adalah simbol visual yang mewakili brand, sementara brand mencakup seluruh persepsi, emosi, dan pengalaman konsumen terhadap perusahaan',
  3 => 'Brand hanya untuk perusahaan besar',
  4 => 'Logo berubah-ubah, Brand tetap selamanya',
), 'correct' => 2, 'difficulty' => 'basic', 'skill' => 'Brand Identity']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-62'],
            ['major_id' => 'DKV', 'question' => 'Apa yang termasuk dalam elemen \'Brand Identity\'?', 'options' => array (
  0 => 'Hanya logo saja',
  1 => 'Library berisi aset visual yang dijual',
  2 => 'Logo, warna, tipografi, gaya visual, tone of voice, dan elemen desain lain yang membentuk citra brand',
  3 => 'Hanya nama brand dan slogan',
  4 => 'Hanya nama domain website',
), 'correct' => 4, 'difficulty' => 'basic', 'skill' => 'Brand Identity']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-63'],
            ['major_id' => 'DKV', 'question' => 'Apa itu \'Visual Identity\' dalam konteks branding?', 'options' => array (
  0 => 'Hanya foto profil di media sosial',
  1 => 'Kumpulan elemen visual yang digunakan untuk mewakili brand, termasuk logo, warna, tipografi, ikon, dan pola grafis',
  2 => 'Panduan SEO untuk website',
  3 => 'Strategi pemasaran digital',
  4 => 'Rencana bisnis perusahaan',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'Brand Identity']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-64'],
            ['major_id' => 'DKV', 'question' => 'Apa yang dimaksud dengan \'Brand Guideline\' atau \'Brand Book\'?', 'options' => array (
  0 => 'Dokumen yang berisi aturan penggunaan elemen-elemen brand seperti logo, warna, font, dan tone of voice agar konsisten di semua media',
  1 => 'Buku panduan untuk karyawan baru tentang tata tertib kantor',
  2 => 'Daftar kompetitor dalam industri',
  3 => 'Laporan keuangan tahunan perusahaan',
  4 => 'Buku petunjuk penggunaan software desain',
), 'correct' => 0, 'difficulty' => 'intermediate', 'skill' => 'Brand Identity']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-65'],
            ['major_id' => 'DKV', 'question' => 'Mengapa \'Consistency\' (konsistensi) penting dalam implementasi Brand Identity?', 'options' => array (
  0 => 'Agar desain terlihat membosankan',
  1 => 'Konsistensi membantu membangun pengenalan dan kepercayaan konsumen dengan menciptakan identitas yang mudah dikenali di semua touchpoint',
  2 => 'Agar tidak perlu membuat desain baru',
  3 => 'Konsistensi hanya diperlukan untuk media cetak',
  4 => 'Konsistensi mengurangi biaya produksi',
), 'correct' => 3, 'difficulty' => 'intermediate', 'skill' => 'Brand Identity']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-66'],
            ['major_id' => 'DKV', 'question' => 'Dalam merancang Logo, apa yang dimaksud dengan \'Logo Mark\' dan \'Logo Type\'?', 'options' => array (
  0 => 'Logo Mark adalah watermark, Logo Type adalah judul',
  1 => 'Logo Mark adalah simbol/grafis, Logo Type adalah representasi teks dari nama brand',
  2 => 'Logo Mark hanya untuk digital, Logo Type hanya untuk cetak',
  3 => 'Logo Mark berwarna, Logo Type hitam-putih',
  4 => 'Keduanya adalah ukuran logo yang berbeda',
), 'correct' => 2, 'difficulty' => 'advanced', 'skill' => 'Brand Identity']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-67'],
            ['major_id' => 'DKV', 'question' => 'Apa pertimbangan utama saat merancang Logo untuk berbagai ukuran dan media (responsiveness)?', 'options' => array (
  0 => 'Logo harus selalu menggunakan detail sebanyak mungkin',
  1 => 'Logo harus tetap dikenali dan dapat dibaca dari ukuran yang sangat kecil hingga sangat besar, dengan variasi yang disesuaikan untuk berbagai konteks',
  2 => 'Logo tidak perlu diuji untuk ukuran yang berbeda',
  3 => 'Logo harus selalu berupa gambar, tidak boleh teks',
  4 => 'Logo hanya perlu terlihat bagus di layar komputer',
), 'correct' => 4, 'difficulty' => 'advanced', 'skill' => 'Brand Identity']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-68'],
            ['major_id' => 'DKV', 'question' => 'Apa yang dimaksud dengan \'Brand Positioning\' dan bagaimana pengaruhnya terhadap desain identitas visual?', 'options' => array (
  0 => 'Posisi logo di halaman website',
  1 => 'Menentukan posisi unik brand di benak konsumen dibandingkan kompetitor, yang menjadi dasar pengambilan keputusan desain visual',
  2 => 'Lokasi kantor perusahaan',
  3 => 'Jumlah produk yang dijual',
  4 => 'Harga jual produk',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'Brand Identity']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-69'],
            ['major_id' => 'DKV', 'question' => 'Bagaimana proses mendesain lengkap Brand Identity System untuk startup dari nol?', 'options' => array (
  0 => 'Langsung membuat logo tanpa riset',
  1 => 'Melakukan riset brand, menentukan positioning, membuat moodboard, merancang elemen visual, membuat brand guideline, dan mengimplementasikan di semua touchpoint secara konsisten',
  2 => 'Menyalin identitas visual dari kompetitor',
  3 => 'Membuat logo di Microsoft Word',
  4 => 'Menggunakan template gratis tanpa penyesuaian',
), 'correct' => 0, 'difficulty' => 'expert', 'skill' => 'Brand Identity']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-70'],
            ['major_id' => 'DKV', 'question' => 'Dalam konteks branding digital modern, bagaimana memastikan Brand Identity tetap relevan dan adaptif terhadap tren desain yang terus berubah?', 'options' => array (
  0 => 'Mengikuti semua tren tanpa mempertahankan konsistensi',
  1 => 'Tidak perlu berubah karena brand sudah mapan',
  2 => 'Membuat logo baru setiap bulan agar tetap trendy',
  3 => 'Menerapkan prinsip desain timeless dengan fleksibilitas sistem yang memungkinkan evolusi bertahap tanpa mengorbankan recognition',
  4 => 'Mengabaikan tren dan menggunakan desain yang sudah usang',
), 'correct' => 3, 'difficulty' => 'expert', 'skill' => 'Brand Identity']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-71'],
            ['major_id' => 'DKV', 'question' => 'Apa yang dimaksud dengan \'Keyframe\' dalam animasi motion graphics?', 'options' => array (
  0 => 'Frame pertama dari sebuah animasi',
  1 => 'Titik waktu tertentu di mana properti objek seperti posisi, rotasi, atau skala ditentukan nilainya',
  2 => 'Jenis frame yang hanya ada di video editing',
  3 => 'Jumlah total frame dalam animasi',
  4 => 'Frame yang dihapus dari animasi',
), 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'Motion Graphics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-72'],
            ['major_id' => 'DKV', 'question' => 'Apa fungsi dari panel \'Timeline\' dalam software motion graphics seperti After Effects?', 'options' => array (
  0 => 'Untuk mengedit teks',
  1 => 'Untuk mengatur urutan, durasi, dan timing elemen animasi dari waktu ke waktu',
  2 => 'Untuk memilih warna',
  3 => 'Untuk mengimpor gambar',
  4 => 'Untuk membuat effek suara',
), 'correct' => 3, 'difficulty' => 'basic', 'skill' => 'Motion Graphics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-73'],
            ['major_id' => 'DKV', 'question' => 'Perbedaan antara \'Frame Rate\' 24fps, 30fps, dan 60fps dalam motion graphics adalah?', 'options' => array (
  0 => '24fps standar sinema, 30fps standar video, 60fps untuk animasi yang sangat halus dan game interaktif',
  1 => 'Semua frame rate menghasilkan animasi yang sama',
  2 => '24fps adalah yang paling halus',
  3 => '60fps hanya untuk video hitam-putih',
  4 => 'Frame rate tidak mempengaruhi kualitas animasi',
), 'correct' => 0, 'difficulty' => 'intermediate', 'skill' => 'Motion Graphics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-74'],
            ['major_id' => 'DKV', 'question' => 'Apa itu \'Motion Path\' dalam After Effects?', 'options' => array (
  0 => 'Jenis efek suara pada animasi',
  1 => 'Garis panduan visual yang menunjukkan jalur pergerakan objek dari satu titik ke titik lain dalam ruang dua dimensi',
  2 => 'Format file animasi',
  3 => 'Jenis mask yang digunakan untuk rotoscoping',
  4 => 'Alat untuk membuat teks bergerak',
), 'correct' => 4, 'difficulty' => 'intermediate', 'skill' => 'Motion Graphics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-75'],
            ['major_id' => 'DKV', 'question' => 'Apa yang dimaksud dengan \'Easing\' atau \'Ease In/Out\' dalam motion graphics?', 'options' => array (
  0 => 'Membuat animasi bergerak dengan kecepatan konstan dari awal hingga akhir',
  1 => 'Teknik yang membuat animasi dimulai atau berakhir dengan kecepatan yang melambat atau mempercepat untuk terlihat lebih natural',
  2 => 'Efek blur pada animasi',
  3 => 'Menghapus keyframe dari timeline',
  4 => 'Membuat animasi bergerak lebih cepat',
), 'correct' => 2, 'difficulty' => 'intermediate', 'skill' => 'Motion Graphics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-76'],
            ['major_id' => 'DKV', 'question' => 'Perbedaan antara \'Linear Keyframes\' dan \'Bezier Keyframes\' dalam motion graphics adalah?', 'options' => array (
  0 => 'Linear Keyframes hanya untuk posisi, Bezier untuk warna',
  1 => 'Linear menghasilkan gerakan konstan, Bezier memungkinkan kontrol kurva kecepatan dengan handle untuk gerakan yang lebih organik',
  2 => 'Linear lebih cepat dari Bezier',
  3 => 'Bezier hanya untuk rotasi, Linear untuk skala',
  4 => 'Tidak ada perbedaan',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'Motion Graphics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-77'],
            ['major_id' => 'DKV', 'question' => 'Apa yang dimaksud dengan \'Rotoscoping\' dalam motion graphics dan VFX?', 'options' => array (
  0 => 'Teknik membuat animasi 3D dari model',
  1 => 'Teknik membuat mask frame-by-frame untuk memisahkan objek dari backgroundnya, memungkinkan manipulasi elemen secara terpisah',
  2 => 'Mengedit audio dari video',
  3 => 'Membuat subtitle otomatis',
  4 => 'Teknik mengompresi video',
), 'correct' => 3, 'difficulty' => 'advanced', 'skill' => 'Motion Graphics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-78'],
            ['major_id' => 'DKV', 'question' => 'Apa fungsi dari \'Pre-composition\' dalam After Effects?', 'options' => array (
  0 => 'Menggabungkan beberapa layer menjadi satu composition baru yang bisa dianimasikan sebagai satu unit, memudahkan pengelolaan proyek kompleks',
  1 => 'Menghapus semua layer dalam composition',
  2 => 'Membuat rendering lebih cepat',
  3 => 'Mengimpor file video',
  4 => 'Menambahkan efek suara',
), 'correct' => 0, 'difficulty' => 'advanced', 'skill' => 'Motion Graphics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-79'],
            ['major_id' => 'DKV', 'question' => 'Apa yang dimaksud dengan \'Motion Design Principles\' dan bagaimana penerapannya untuk menciptakan animasi yang efektif dan engaging?', 'options' => array (
  0 => 'Prinsip yang hanya berlaku untuk animasi kartun',
  1 => 'Prinsip-prinsip seperti timing, anticipation, follow-through, squash and stretch yang diterapkan untuk menciptakan komunikasi visual yang jelas dan emosional melalui gerakan',
  2 => 'Aturan tentang berapa lama animasi harus berlangsung',
  3 => 'Panduan untuk memilih software animasi',
  4 => 'Cara menghitung biaya produksi animasi',
), 'correct' => 4, 'difficulty' => 'expert', 'skill' => 'Motion Graphics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-80'],
            ['major_id' => 'DKV', 'question' => 'Dalam produksi motion graphics profesional, bagaimana mengoptimalkan workflow untuk proyek dengan banyak elemen animasi kompleks?', 'options' => array (
  0 => 'Membuat semua animasi dalam satu layer',
  1 => 'Menggunakan pre-composition, expression untuk animasi otomatis, file proxy untuk performa, dan organisasi layer yang sistematis',
  2 => 'Menggunakan komputer yang lebih mahal',
  3 => 'Mengurangi jumlah keyframe seminimal mungkin',
  4 => 'Tidak menggunakan efek apapun',
), 'correct' => 2, 'difficulty' => 'expert', 'skill' => 'Motion Graphics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-81'],
            ['major_id' => 'DKV', 'question' => 'Apa fungsi dari tag HTML div?', 'options' => array (
  0 => 'Sebagai container atau pembungkus elemen untuk pengelompokan dan styling konten',
  1 => 'Membuat teks tebal',
  2 => 'Membuat tabel data',
  3 => 'Mengimpor gambar',
  4 => 'Membuat link ke halaman lain',
), 'correct' => 0, 'difficulty' => 'basic', 'skill' => 'HTML/CSS']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-82'],
            ['major_id' => 'DKV', 'question' => 'Apa perbedaan antara class dan id sebagai selector CSS?', 'options' => array (
  0 => 'Tidak ada perbedaan',
  1 => 'Class bisa digunakan untuk banyak elemen, ID hanya boleh digunakan untuk satu elemen dalam halaman',
  2 => 'ID hanya untuk JavaScript, Class untuk CSS',
  3 => 'Class berfungsi untuk JavaScript, ID untuk CSS',
  4 => 'ID bisa digunakan untuk banyak elemen, Class hanya untuk satu',
), 'correct' => 4, 'difficulty' => 'basic', 'skill' => 'HTML/CSS']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-83'],
            ['major_id' => 'DKV', 'question' => 'Apa kegunaan dari CSS Flexbox dalam layout web?', 'options' => array (
  0 => 'Membuat animasi transisi',
  1 => 'Sistem layout satu dimensi untuk mengatur distribusi dan perataan elemen dalam satu sumbu (horizontal atau vertical)',
  2 => 'Membuat efek hover',
  3 => 'Mengatur font style',
  4 => 'Membuat border style',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'HTML/CSS']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-84'],
            ['major_id' => 'DKV', 'question' => 'Perbedaan antara Flexbox dan CSS Grid dalam layout web adalah?', 'options' => array (
  0 => 'Flexbox dan Grid adalah hal yang sama',
  1 => 'Flexbox adalah layout satu dimensi, Grid adalah layout dua dimensi yang bisa mengontrol baris dan kolom secara simultan',
  2 => 'Grid hanya untuk mobile, Flexbox untuk desktop',
  3 => 'Flexbox lebih tua dari Grid sehingga tidak direkomendasikan',
  4 => 'Grid tidak mendukung responsive design',
), 'correct' => 3, 'difficulty' => 'intermediate', 'skill' => 'HTML/CSS']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-85'],
            ['major_id' => 'DKV', 'question' => 'Apa yang dimaksud dengan CSS Box Model?', 'options' => array (
  0 => 'Model 3D untuk membuat efek bayangan',
  1 => 'Konsep CSS yang terdiri dari content, padding, border, dan margin sebagai komponen pembentuk elemen',
  2 => 'Format file CSS khusus',
  3 => 'Framework CSS populer',
  4 => 'Teknik untuk membuat grid layout',
), 'correct' => 2, 'difficulty' => 'intermediate', 'skill' => 'HTML/CSS']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-86'],
            ['major_id' => 'DKV', 'question' => 'Apa kegunaan dari CSS position sticky dan bagaimana cara kerjanya?', 'options' => array (
  0 => 'Elemen berperilaku relatif hingga mencapai batas scroll tertentu, lalu berubah menjadi fixed di posisi yang ditentukan',
  1 => 'Membuat elemen menghilang dari halaman',
  2 => 'Membuat elemen bergerak secara otomatis',
  3 => 'Mengunci posisi elemen di semua perangkat',
  4 => 'Membuat elemen transparan',
), 'correct' => 0, 'difficulty' => 'advanced', 'skill' => 'HTML/CSS']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-87'],
            ['major_id' => 'DKV', 'question' => 'Apa yang dimaksud dengan CSS Media Queries?', 'options' => array (
  0 => 'Query database yang menggunakan CSS',
  1 => 'Fitur CSS yang memungkinkan penerapan gaya berbeda berdasarkan kondisi perangkat seperti ukuran layar, resolusi, atau orientasi',
  2 => 'Alat untuk mengukur kecepatan internet',
  3 => 'Jenis query SQL untuk desain web',
  4 => 'Teknik untuk mengoptimalkan gambar',
), 'correct' => 4, 'difficulty' => 'advanced', 'skill' => 'HTML/CSS']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-88'],
            ['major_id' => 'DKV', 'question' => 'Apa itu CSS Specificity dan bagaimana urutan prioritasnya?', 'options' => array (
  0 => 'Tingkat kejelasan font yang ditampilkan',
  1 => 'Aturan yang menentukan style mana yang diterapkan jika ada konflik, dengan prioritas: inline style, ID, class, element, inheritance',
  2 => 'Urutan file CSS yang diimpor',
  3 => 'Jumlah selector yang digunakan dalam satu file',
  4 => 'Tingkat kompresi file CSS',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'HTML/CSS']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-89'],
            ['major_id' => 'DKV', 'question' => 'Bagaimana menerapkan CSS Custom Properties (CSS Variables) secara efektif dalam proyek desain sistem (design system)?', 'options' => array (
  0 => 'CSS Variables hanya bisa digunakan untuk warna',
  1 => 'Mendefinisikan variabel untuk token desain seperti warna, spacing, ukuran font di root, lalu menggunakannya untuk memastikan konsistensi dan kemudahan maintenance di seluruh komponen design system',
  2 => 'CSS Variables tidak mendukung komponen reusable',
  3 => 'CSS Variables hanya berfungsi di browser Chrome',
  4 => 'CSS Variables membuat kode CSS lebih rumit',
), 'correct' => 3, 'difficulty' => 'expert', 'skill' => 'HTML/CSS']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-90'],
            ['major_id' => 'DKV', 'question' => 'Dalam konteks aksesibilitas web (web accessibility), mengapa penggunaan tag HTML semantik seperti header, nav, main, dan article sangat penting?', 'options' => array (
  0 => 'Hanya untuk SEO, tidak ada manfaat lain',
  1 => 'Memberikan makna struktural bagi screen reader dan teknologi assistive, meningkatkan SEO, dan membuat kode lebih mudah dipahami oleh developer lain',
  2 => 'Tag semantik hanya berfungsi di browser tertentu',
  3 => 'Tag semantik membuat website lebih cepat',
  4 => 'Tag semantik tidak bisa di-style dengan CSS',
), 'correct' => 2, 'difficulty' => 'expert', 'skill' => 'HTML/CSS']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-91'],
            ['major_id' => 'DKV', 'question' => 'Istilah Cut, Fade, dan Transition dalam video editing merujuk pada?', 'options' => array (
  0 => 'Jenis file video',
  1 => 'Teknik pengeditan dasar: Cut adalah perubahan langsung antar shot, Fade adalah perubahan bertahap ke atau dari warna tertentu, Transition adalah efek visual perpindahan antar shot',
  2 => 'Format rendering video',
  3 => 'Teknik perekaman video',
  4 => 'Jenis kamera yang digunakan',
), 'correct' => 2, 'difficulty' => 'basic', 'skill' => 'Video Editing']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-92'],
            ['major_id' => 'DKV', 'question' => 'Apa perbedaan antara format video lossy dan lossless?', 'options' => array (
  0 => 'Lossy adalah format yang sudah tidak digunakan',
  1 => 'Lossy mengompresi data dengan menghapus sebagian informasi, lossless mempertahankan semua data asli meskipun ukuran file tetap besar',
  2 => 'Lossless hanya untuk audio',
  3 => 'Lossy lebih unggul dari lossless dalam semua aspek',
  4 => 'Tidak ada perbedaan antara keduanya',
), 'correct' => 0, 'difficulty' => 'basic', 'skill' => 'Video Editing']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-93'],
            ['major_id' => 'DKV', 'question' => 'Apa yang dimaksud dengan Timeline dalam software video editing?', 'options' => array (
  0 => 'Daftar riwayat edit yang sudah dilakukan',
  1 => 'Panel kerja horizontal yang menampilkan urutan klip video, audio, dan efek dari waktu ke waktu untuk mengatur editing',
  2 => 'Format file video output',
  3 => 'Jenis transisi yang digunakan',
  4 => 'Alat untuk mengukur durasi video',
), 'correct' => 3, 'difficulty' => 'intermediate', 'skill' => 'Video Editing']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-94'],
            ['major_id' => 'DKV', 'question' => 'Apa fungsi dari Color Grading dalam video editing?', 'options' => array (
  0 => 'Menghapus suara dari video',
  1 => 'Mengatur dan menyesuaikan warna video untuk menciptakan mood, nuansa, dan konsistensi visual yang sesuai dengan cerita',
  2 => 'Menambahkan efek suara',
  3 => 'Membuat subtitle',
  4 => 'Mengatur kecepatan video',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'Video Editing']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-95'],
            ['major_id' => 'DKV', 'question' => 'Perbedaan antara J-Cut dan L-Cut dalam video editing adalah?', 'options' => array (
  0 => 'J-Cut untuk audio, L-Cut untuk video',
  1 => 'J-Cut: audio klip berikutnya muncul sebelum video berubah; L-Cut: audio klip sebelumnya masih terdengar setelah video berpindah ke shot berikutnya',
  2 => 'J-Cut untuk film horor, L-Cut untuk film komedi',
  3 => 'J-Cut lebih cepat dari L-Cut',
  4 => 'Keduanya adalah jenis transisi yang sama',
), 'correct' => 4, 'difficulty' => 'intermediate', 'skill' => 'Video Editing']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-96'],
            ['major_id' => 'DKV', 'question' => 'Perbedaan antara Rendering, Exporting, dan Encoding dalam konteks video editing adalah?', 'options' => array (
  0 => 'Semua istilah tersebut memiliki arti yang sama',
  1 => 'Rendering memproses efek menjadi video, Encoding mengubah format, Exporting menghasilkan file akhir, ketiganya berbeda dalam konteks dan tujuannya',
  2 => 'Encoding hanya untuk audio',
  3 => 'Exporting adalah istilah lama untuk Rendering',
  4 => 'Rendering hanya dilakukan secara otomatis',
), 'correct' => 2, 'difficulty' => 'advanced', 'skill' => 'Video Editing']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-97'],
            ['major_id' => 'DKV', 'question' => 'Apa itu Non-Linear Editing (NLE) dan bagaimana cara kerjanya dibandingkan dengan editing linear tradisional?', 'options' => array (
  0 => 'NLE hanya untuk editing audio',
  1 => 'NLE memungkinkan editing tanpa urutan kronologis, memungkinkan akses ke bagian manapun dari footage secara acak, berbeda dengan linear yang harus dilakukan secara berurutan dari awal',
  2 => 'NLE selalu lebih lambat dari editing linear',
  3 => 'NLE tidak mendukung multi-track editing',
  4 => 'Linear editing adalah metode modern yang lebih baik',
), 'correct' => 0, 'difficulty' => 'advanced', 'skill' => 'Video Editing']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-98'],
            ['major_id' => 'DKV', 'question' => 'Apa yang dimaksud dengan B-Roll dalam produksi video?', 'options' => array (
  0 => 'Video yang gagal saat perekaman',
  1 => 'Rekaman pendukung yang dipotong ke shot utama (A-Roll) untuk memberikan konteks visual, transisi yang lebih halus, dan kedalaman cerita',
  2 => 'Jenis kamera kedua yang digunakan',
  3 => 'Footage yang dihapus dari video akhir',
  4 => 'Efek visual yang ditambahkan pasca-produksi',
), 'correct' => 3, 'difficulty' => 'advanced', 'skill' => 'Video Editing']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-99'],
            ['major_id' => 'DKV', 'question' => 'Dalam video editing profesional, apa itu Proxy Editing dan kapan strategi ini sebaiknya digunakan?', 'options' => array (
  0 => 'Mengedit video di komputer orang lain',
  1 => 'Mengedit menggunakan salinan resolusi rendah dari footage asli untuk performa yang lebih baik, lalu melakukan final render menggunakan file resolusi penuh',
  2 => 'Mengedit video tanpa audio',
  3 => 'Mengedit hanya bagian tertentu dari video',
  4 => 'Mengedit video di komputer dengan RAM rendah',
), 'correct' => 1, 'difficulty' => 'expert', 'skill' => 'Video Editing']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'dkv-100'],
            ['major_id' => 'DKV', 'question' => 'Bagaimana alur kerja (workflow) lengkap produksi video profesional dari pra-produksi hingga distribusi digital?', 'options' => array (
  0 => 'Langsung rekam dan upload ke YouTube',
  1 => 'Perencanaan (script, storyboard, shot list), Pra-produksi (casting, lokasi, jadwal), Produksi (perekaman), Pasca-produksi (editing, color grading, audio mixing, rendering), Distribusi (platform, encoding, metadata)',
  2 => 'Rekam video lalu langsung edit',
  3 => 'Hanya melakukan editing tanpa perencanaan',
  4 => 'Upload video mentah ke media sosial',
), 'correct' => 4, 'difficulty' => 'expert', 'skill' => 'Video Editing']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-01'],
            ['major_id' => 'TKJ', 'question' => 'Sistem operasi Windows Server merupakan server yang dikembangkan oleh perusahaan?', 'options' => array (
  0 => 'IBM',
  1 => 'Oracle',
  2 => 'Microsoft',
  3 => 'Google',
  4 => 'Red Hat',
), 'correct' => 0, 'difficulty' => 'basic', 'skill' => 'Windows Server']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-02'],
            ['major_id' => 'TKJ', 'question' => 'Servis utama yang digunakan untuk membagikan file dan printer pada jaringan di Windows Server disebut?', 'options' => array (
  0 => 'DNS',
  1 => 'File and Printer Sharing',
  2 => 'DHCP',
  3 => 'IIS',
  4 => 'WSUS',
), 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'Windows Server']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-03'],
            ['major_id' => 'TKJ', 'question' => 'Fitur pada Windows Server yang dapat mengatur alokasi IP address otomatis kepada client disebut?', 'options' => array (
  0 => 'DNS Server',
  1 => 'Active Directory',
  2 => 'DHCP Server',
  3 => 'NAT',
  4 => 'Proxy Server',
), 'correct' => 2, 'difficulty' => 'intermediate', 'skill' => 'Windows Server']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-04'],
            ['major_id' => 'TKJ', 'question' => 'Untuk mengonfigurasi IP address pada Windows Server melalui command line, perintah yang digunakan adalah?', 'options' => array (
  0 => 'ipconfig /set',
  1 => 'ipaddr configure',
  2 => 'set-ip -static',
  3 => 'netsh interface ip set',
  4 => 'network-config set',
), 'correct' => 3, 'difficulty' => 'intermediate', 'skill' => 'Windows Server']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-05'],
            ['major_id' => 'TKJ', 'question' => 'Role Server yang berfungsi menerjemahkan nama domain menjadi IP address pada Windows Server adalah?', 'options' => array (
  0 => 'FTP Server',
  1 => 'DHCP Server',
  2 => 'WINS Server',
  3 => 'DNS Server',
  4 => 'RADIUS Server',
), 'correct' => 4, 'difficulty' => 'intermediate', 'skill' => 'Windows Server']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-06'],
            ['major_id' => 'TKJ', 'question' => 'Pada Windows Server, teknologi yang memungkinkan beberapa server bekerja sama untuk meningkatkan ketersediaan layanan disebut?', 'options' => array (
  0 => 'Failover Clustering',
  1 => 'Load Balancing',
  2 => 'Hyper-V Replica',
  3 => 'Storage Spaces',
  4 => 'BranchCache',
), 'correct' => 0, 'difficulty' => 'advanced', 'skill' => 'Windows Server']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-07'],
            ['major_id' => 'TKJ', 'question' => 'Group Policy Object (GPO) pada Windows Server digunakan untuk?', 'options' => array (
  0 => 'Membuat backup data server',
  1 => 'Mengatur jaringan wireless',
  2 => 'Mengatur keamanan dan konfigurasi komputer secara terpusat',
  3 => 'Menginstal aplikasi pada client',
  4 => 'Memantau lalu lintas jaringan',
), 'correct' => 2, 'difficulty' => 'advanced', 'skill' => 'Windows Server']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-08'],
            ['major_id' => 'TKJ', 'question' => 'Fitur Windows Server yang memungkinkan administrator melakukan remote desktop management dari jarak jauh disebut?', 'options' => array (
  0 => 'Remote Assistance',
  1 => 'Remote Desktop Services',
  2 => 'Windows Admin Center',
  3 => 'Server Manager Remote',
  4 => 'PowerShell Remoting',
), 'correct' => 3, 'difficulty' => 'advanced', 'skill' => 'Windows Server']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-09'],
            ['major_id' => 'TKJ', 'question' => 'Pada Windows Server 2022, fitur keamanan baru yang menyediakan isolasi mesin virtual (VM) disebut?', 'options' => array (
  0 => 'Secure Boot',
  1 => 'Credential Guard',
  2 => 'Shielded VM',
  3 => 'Host Guardian Service',
  4 => 'Virtual TPM',
), 'correct' => 1, 'difficulty' => 'expert', 'skill' => 'Windows Server']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-10'],
            ['major_id' => 'TKJ', 'question' => 'Arsitektur Windows Server yang menggunakan komponen modular untuk menginstal hanya fitur yang dibutuhkan disebut?', 'options' => array (
  0 => 'Nano Server',
  1 => 'Server Core',
  2 => 'Windows Server on ARM',
  3 => 'Minimal Server Interface',
  4 => 'Server with Desktop Experience',
), 'correct' => 4, 'difficulty' => 'expert', 'skill' => 'Windows Server']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-11'],
            ['major_id' => 'TKJ', 'question' => 'Distribusi Linux yang sering digunakan sebagai server di dunia perbankan adalah?', 'options' => array (
  0 => 'Ubuntu Desktop',
  1 => 'Linux Mint',
  2 => 'Red Hat Enterprise Linux (RHEL)',
  3 => ' elementary OS',
  4 => 'Zorin OS',
), 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'Linux Administration']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-12'],
            ['major_id' => 'TKJ', 'question' => 'Perintah dalam Linux untuk menampilkan isi direktori adalah?', 'options' => array (
  0 => 'cd',
  1 => 'pwd',
  2 => 'mkdir',
  3 => 'ls',
  4 => 'rm',
), 'correct' => 2, 'difficulty' => 'basic', 'skill' => 'Linux Administration']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-13'],
            ['major_id' => 'TKJ', 'question' => 'File konfigurasi utama untuk manajemen paket pada distribusi Debian/Ubuntu adalah?', 'options' => array (
  0 => '/etc/yum.conf',
  1 => '/etc/apt/sources.list',
  2 => '/etc/pacman.conf',
  3 => '/etc/dnf.conf',
  4 => '/etc/zypp/repos.d/',
), 'correct' => 3, 'difficulty' => 'intermediate', 'skill' => 'Linux Administration']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-14'],
            ['major_id' => 'TKJ', 'question' => 'Perintah untuk melihat dan mengedit crontab user saat ini di Linux adalah?', 'options' => array (
  0 => 'crontab -view',
  1 => 'crontab --edit',
  2 => 'cronedit',
  3 => 'nano /etc/crontab',
  4 => 'crontab -e',
), 'correct' => 4, 'difficulty' => 'intermediate', 'skill' => 'Linux Administration']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-15'],
            ['major_id' => 'TKJ', 'question' => 'Service yang berfungsi sebagai web server pada Linux dan merupakan web server paling populer di dunia adalah?', 'options' => array (
  0 => 'Nginx',
  1 => 'Lighttpd',
  2 => 'Apache HTTP Server (httpd)',
  3 => 'Caddy',
  4 => 'Cherokee',
), 'correct' => 0, 'difficulty' => 'intermediate', 'skill' => 'Linux Administration']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-16'],
            ['major_id' => 'TKJ', 'question' => 'Perintah Linux untuk mengubah izin akses file menjadi \'read, write, execute\' untuk owner dan \'read, execute\' untuk group dan other adalah?', 'options' => array (
  0 => 'chmod 644',
  1 => 'chmod 755',
  2 => 'chmod 777',
  3 => 'chmod 600',
  4 => 'chmod 744',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'Linux Administration']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-17'],
            ['major_id' => 'TKJ', 'question' => 'Pada Linux, logical volume management (LVM) memungkinkan administrator untuk?', 'options' => array (
  0 => 'Membuat RAID array secara otomatis',
  1 => 'Mempercepat akses disk hardware',
  2 => 'Mengubah ukuran partisi tanpa kehilangan data',
  3 => 'Mengenkripsi seluruh filesystem',
  4 => 'Membuat partisi boot UEFI',
), 'correct' => 2, 'difficulty' => 'advanced', 'skill' => 'Linux Administration']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-18'],
            ['major_id' => 'TKJ', 'question' => 'Untuk mengonfigurasi firewall pada Linux modern menggunakan framework netfilter, perintah yang digunakan adalah?', 'options' => array (
  0 => 'iptables',
  1 => 'ufw enable',
  2 => 'nftables',
  3 => 'firewalld-cmd',
  4 => 'netfilter-config',
), 'correct' => 3, 'difficulty' => 'advanced', 'skill' => 'Linux Administration']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-19'],
            ['major_id' => 'TKJ', 'question' => 'Daemon systemd pada Linux yang bertanggung jawab mengelola login pengguna dan sesi disebut?', 'options' => array (
  0 => 'systemd-logind',
  1 => 'systemd-session',
  2 => 'login.service',
  3 => 'pam_systemd',
  4 => 'session-manager',
), 'correct' => 0, 'difficulty' => 'expert', 'skill' => 'Linux Administration']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-20'],
            ['major_id' => 'TKJ', 'question' => 'Teknik hardening Linux server yang menerapkan prinsip \'least privilege\' pada layanan sistem dilakukan dengan cara?', 'options' => array (
  0 => 'Menginstal antivirus berbayar pada server',
  1 => 'Mengaktifkan remote desktop untuk semua user',
  2 => 'Menggunakan password yang sama untuk semua akun',
  3 => 'Menghapus firewall untuk mempercepat akses',
  4 => 'Menonaktifkan semua service yang tidak diperlukan dan menjalankan service dengan user non-root',
), 'correct' => 4, 'difficulty' => 'expert', 'skill' => 'Linux Administration']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-21'],
            ['major_id' => 'TKJ', 'question' => 'Active Directory merupakan layanan direktori yang dikembangkan oleh?', 'options' => array (
  0 => 'Google',
  1 => 'Novell',
  2 => 'Microsoft',
  3 => 'Oracle',
  4 => 'Cisco',
), 'correct' => 2, 'difficulty' => 'basic', 'skill' => 'Active Directory']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-22'],
            ['major_id' => 'TKJ', 'question' => 'Unit Organisasi (OU) dalam Active Directory digunakan untuk?', 'options' => array (
  0 => 'Membuat koneksi internet',
  1 => 'Menginstal sistem operasi',
  2 => 'Mengatur kecepatan jaringan',
  3 => 'Mengelola dan mengelompokkan objek seperti user, komputer, dan printer',
  4 => 'Membuat laporan keuangan',
), 'correct' => 3, 'difficulty' => 'basic', 'skill' => 'Active Directory']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-23'],
            ['major_id' => 'TKJ', 'question' => 'Protokol yang digunakan oleh Active Directory untuk melakukan autentikasi pengguna Windows adalah?', 'options' => array (
  0 => 'LDAP',
  1 => 'Kerberos',
  2 => 'RADIUS',
  3 => 'TACACS+',
  4 => 'SAML',
), 'correct' => 4, 'difficulty' => 'intermediate', 'skill' => 'Active Directory']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-24'],
            ['major_id' => 'TKJ', 'question' => 'Domain Controller (DC) dalam Active Directory berfungsi sebagai?', 'options' => array (
  0 => 'Server yang menyimpan database direktori dan memproses autentikasi',
  1 => 'Router utama jaringan',
  2 => 'Server backup data',
  3 => 'Firewall jaringan',
  4 => 'Proxy server internet',
), 'correct' => 0, 'difficulty' => 'intermediate', 'skill' => 'Active Directory']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-25'],
            ['major_id' => 'TKJ', 'question' => 'Group Policy adalah fitur Active Directory yang digunakan untuk?', 'options' => array (
  0 => 'Membuat account email baru',
  1 => 'Mengatur alokasi IP address',
  2 => 'Menerapkan kebijakan keamanan dan konfigurasi secara terpusat ke komputer dalam domain',
  3 => 'Memantau penggunaan bandwidth',
  4 => 'Membuat website perusahaan',
), 'correct' => 2, 'difficulty' => 'intermediate', 'skill' => 'Active Directory']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-26'],
            ['major_id' => 'TKJ', 'question' => 'Fungsi FSMO (Flexible Single Master Operation) role \'Schema Master\' dalam Active Directory adalah?', 'options' => array (
  0 => 'Mengelola dan memodifikasi skema direktori di seluruh forest',
  1 => 'Mengelola waktu sinting jaringan',
  2 => 'Menetapkan RID pool untuk semua domain',
  3 => 'Menjadi penanggung jawab PDC Emulator',
  4 => 'Mengelola DNS zone utama',
), 'correct' => 0, 'difficulty' => 'advanced', 'skill' => 'Active Directory']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-27'],
            ['major_id' => 'TKJ', 'question' => 'Trust relationship dalam Active Directory memungkinkan?', 'options' => array (
  0 => 'User di satu domain mengakses resource di domain lain dengan satu akun',
  1 => 'Server mengakses internet tanpa proxy',
  2 => 'Komputer client booting secara PXE',
  3 => 'Membuat VLAN baru pada switch',
  4 => 'Menginstal aplikasi secara remote',
), 'correct' => 0, 'difficulty' => 'advanced', 'skill' => 'Active Directory']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-28'],
            ['major_id' => 'TKJ', 'question' => 'Replikasi Active Directory antar Domain Controller menggunakan protokol berbasis RPC yang disebut?', 'options' => array (
  0 => 'DRSR (Directory Replication Service RPC)',
  1 => 'SMB',
  2 => 'WinRM',
  3 => 'WMI',
  4 => 'SNMP',
), 'correct' => 0, 'difficulty' => 'advanced', 'skill' => 'Active Directory']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-29'],
            ['major_id' => 'TKJ', 'question' => 'Fitur Active Directory Recycle Bin memungkinkan administrator untuk?', 'options' => array (
  0 => 'Memulihkan objek (user, grup, OU) yang telah terhapus tanpa memulihkan data',
  1 => 'Menghapus virus dari direktori',
  2 => 'Meng-cache halaman website',
  3 => 'Mempercepat proses login',
  4 => 'Membuat backup otomatis ke cloud',
), 'correct' => 0, 'difficulty' => 'expert', 'skill' => 'Active Directory']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-30'],
            ['major_id' => 'TKJ', 'question' => 'Ketika melakukan migrasi Active Directory dari Windows Server 2016 ke 2022, langkah kritis pertama yang harus dilakukan adalah?', 'options' => array (
  0 => 'Menjalankan adprep /forestprep dan adprep /domainprep untuk memperbarui skema',
  1 => 'Memformat ulang semua hard disk server',
  2 => 'Menghapus seluruh user account yang ada',
  3 => 'Mematikan firewall pada semua komputer client',
  4 => 'Menginstal ulang semua komputer client',
), 'correct' => 0, 'difficulty' => 'expert', 'skill' => 'Active Directory']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-31'],
            ['major_id' => 'TKJ', 'question' => 'Perangkat jaringan yang berfungsi untuk menghubungkan beberapa jaringan komputer dan meneruskan paket data berdasarkan alamat IP disebut?', 'options' => array (
  0 => 'Switch',
  1 => 'Hub',
  2 => 'Router',
  3 => 'Access Point',
  4 => 'Repeater',
), 'correct' => 0, 'difficulty' => 'basic', 'skill' => 'Networking']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-32'],
            ['major_id' => 'TKJ', 'question' => 'Pengalam IP yang termasuk dalam kelas C ditandai dengan oktet pertama bernilai?', 'options' => array (
  0 => '1–126',
  1 => '128–191',
  2 => '224–239',
  3 => '240–255',
  4 => '192–223',
), 'correct' => 4, 'difficulty' => 'basic', 'skill' => 'Networking']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-33'],
            ['major_id' => 'TKJ', 'question' => 'Subnet mask default untuk jaringan kelas B adalah?', 'options' => array (
  0 => '255.0.0.0',
  1 => '255.255.0.0',
  2 => '255.255.255.0',
  3 => '255.255.255.128',
  4 => '255.255.255.192',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'Networking']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-34'],
            ['major_id' => 'TKJ', 'question' => 'Teknologi VLAN (Virtual LAN) pada switch berfungsi untuk?', 'options' => array (
  0 => 'Mengelompokkan perangkat secara logis terlepas dari lokasi fisik untuk meningkatkan keamanan dan manajemen',
  1 => 'Membuat jaringan wireless baru',
  2 => 'Mempercepat koneksi internet',
  3 => 'Menggantikan firewall',
  4 => 'Membuat IP address baru secara otomatis',
), 'correct' => 2, 'difficulty' => 'intermediate', 'skill' => 'Networking']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-35'],
            ['major_id' => 'TKJ', 'question' => 'Protokol yang digunakan untuk menerjemahkan nama domain menjadi alamat IP adalah?', 'options' => array (
  0 => 'DHCP',
  1 => 'DNS',
  2 => 'ARP',
  3 => 'NAT',
  4 => 'SNMP',
), 'correct' => 3, 'difficulty' => 'intermediate', 'skill' => 'Networking']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-36'],
            ['major_id' => 'TKJ', 'question' => 'Pada jaringan dengan topologi star, jika satu kabel putus, maka yang terjadi adalah?', 'options' => array (
  0 => 'Hanya satu perangkat yang terputus dari jaringan',
  1 => 'Seluruh jaringan akan lumpuh',
  2 => 'Semua perangkat akan otomatis pindah ke jaringan lain',
  3 => 'Switch akan mati total',
  4 => 'Tidak ada pengaruh sama sekali',
), 'correct' => 0, 'difficulty' => 'advanced', 'skill' => 'Networking']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-37'],
            ['major_id' => 'TKJ', 'question' => 'Konfigurasi spanning tree protocol (STP) pada switch mencegah terjadinya?', 'options' => array (
  0 => 'Broadcast storm akibat loop pada jaringan switched',
  1 => 'Serangan DDoS dari luar jaringan',
  2 => 'Kehilangan data pada transmisi wireless',
  3 => 'Penurunan kecepatan CPU server',
  4 => 'Konflik IP address antar client',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'Networking']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-38'],
            ['major_id' => 'TKJ', 'question' => 'Port default yang digunakan oleh protokol HTTPS untuk komunikasi terenkripsi adalah?', 'options' => array (
  0 => '21',
  1 => '23',
  2 => '80',
  3 => '443',
  4 => '8080',
), 'correct' => 2, 'difficulty' => 'advanced', 'skill' => 'Networking']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-39'],
            ['major_id' => 'TKJ', 'question' => 'Teknik NAT overload (PAT) pada router memungkinkan banyak host private untuk berkomunikasi dengan internet menggunakan?', 'options' => array (
  0 => 'Satu alamat IP publik yang dibedakan berdasarkan nomor port',
  1 => 'Setiap host harus memiliki IP publik masing-masing',
  2 => 'Satu MAC address untuk semua host',
  3 => 'Satu VLAN untuk semua komunikasi',
  4 => 'Protokol ICMP untuk setiap paket',
), 'correct' => 0, 'difficulty' => 'expert', 'skill' => 'Networking']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-40'],
            ['major_id' => 'TKJ', 'question' => 'Dalam konfigurasi OSPF pada router, area 0 (area zero) berfungsi sebagai?', 'options' => array (
  0 => 'Backbone area yang menjadi pusat interkoneksi antar area OSPF',
  1 => 'Area khusus untuk manajemen wireless',
  2 => 'Area untuk subnet private saja',
  3 => 'Area cadangan jika backbone gagal',
  4 => 'Area yang hanya digunakan untuk DNS',
), 'correct' => 0, 'difficulty' => 'expert', 'skill' => 'Networking']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-41'],
            ['major_id' => 'TKJ', 'question' => 'Jenis serangan yang bertujuan membuat layanan tidak tersedia dengan mengirim lalu lintas data dalam jumlah besar disebut?', 'options' => array (
  0 => 'Phishing',
  1 => 'Brute Force',
  2 => 'DDoS (Distributed Denial of Service)',
  3 => 'SQL Injection',
  4 => 'Keylogger',
), 'correct' => 3, 'difficulty' => 'basic', 'skill' => 'Cybersecurity Basics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-42'],
            ['major_id' => 'TKJ', 'question' => 'Teknik enkripsi yang menggunakan satu kunci baik untuk enkripsi maupun dekripsi disebut?', 'options' => array (
  0 => 'Asymmetric Encryption',
  1 => 'Symmetric Encryption',
  2 => 'Hashing',
  3 => 'Digital Signature',
  4 => 'Steganography',
), 'correct' => 4, 'difficulty' => 'basic', 'skill' => 'Cybersecurity Basics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-43'],
            ['major_id' => 'TKJ', 'question' => 'Firewall berfungsi untuk?', 'options' => array (
  0 => 'Memfilter lalu lintas jaringan masuk dan keluar berdasarkan aturan keamanan',
  1 => 'Mempercepat koneksi internet',
  2 => 'Membuat backup data otomatis',
  3 => 'Mengelola user account',
  4 => 'Menginstal antivirus',
), 'correct' => 0, 'difficulty' => 'intermediate', 'skill' => 'Cybersecurity Basics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-44'],
            ['major_id' => 'TKJ', 'question' => 'Serangan social engineering yang menggunakan email palsu untuk mencuri data sensitif disebut?', 'options' => array (
  0 => 'Spoofing',
  1 => 'Phishing',
  2 => 'Sniffing',
  3 => 'Spamming',
  4 => 'Defacing',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'Cybersecurity Basics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-45'],
            ['major_id' => 'TKJ', 'question' => 'Port scanning adalah teknik yang digunakan untuk?', 'options' => array (
  0 => 'Mencari port terbuka pada target untuk menemukan celah keamanan',
  1 => 'Memindai barcode pada paket',
  2 => 'Memeriksa kesehatan hard disk',
  3 => 'Menghapus virus dari komputer',
  4 => 'Membuat laporan jaringan',
), 'correct' => 2, 'difficulty' => 'intermediate', 'skill' => 'Cybersecurity Basics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-46'],
            ['major_id' => 'TKJ', 'question' => 'Vulnerability assessment bertujuan untuk?', 'options' => array (
  0 => 'Mengidentifikasi dan mengklasifikasikan kerentanan keamanan pada sistem',
  1 => 'Mempercepat performa server',
  2 => 'Membuat desain jaringan baru',
  3 => 'Menginstal patch otomatis',
  4 => 'Mengelola hak akses user',
), 'correct' => 3, 'difficulty' => 'advanced', 'skill' => 'Cybersecurity Basics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-47'],
            ['major_id' => 'TKJ', 'question' => 'Man-in-the-middle attack (MITM) dilakukan dengan cara?', 'options' => array (
  0 => 'Penyerang menyusup di antara dua pihak yang berkomunikasi untuk memotong atau memodifikasi data',
  1 => 'Penyerang mengirim email berisi virus ke banyak korban',
  2 => 'Penyerang menebak password dengan cara brute force',
  3 => 'Penyerang mengambil alih DNS server',
  4 => 'Penyerang membobol firewall dengan exploit',
), 'correct' => 0, 'difficulty' => 'advanced', 'skill' => 'Cybersecurity Basics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-48'],
            ['major_id' => 'TKJ', 'question' => 'IDS (Intrusion Detection System) berbeda dengan IPS (Intrusion Prevention System) karena?', 'options' => array (
  0 => 'IDS hanya mendeteksi dan memberi peringatan, sedangkan IPS dapat mendeteksi sekaligus memblokir serangan',
  1 => 'IDS bekerja lebih cepat dari IPS',
  2 => 'IPS tidak memerlukan konfigurasi firewall',
  3 => 'IDS hanya bekerja pada jaringan wireless',
  4 => 'IPS tidak memerlukan update signature',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'Cybersecurity Basics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-49'],
            ['major_id' => 'TKJ', 'question' => 'Dalam kerangka kerja keamanan NIST Cybersecurity Framework, fungsi \'Identify\' mencakup?', 'options' => array (
  0 => 'Memulihkan sistem setelah terjadi serangan',
  1 => 'Mendeteksi malware secara real-time',
  2 => 'Mengidentifikasi aset, risiko, dan kerentanan untuk memahami konteks keamanan organisasi',
  3 => 'Membuat aturan password baru',
  4 => 'Menginstal software keamanan pada semua komputer',
), 'correct' => 2, 'difficulty' => 'expert', 'skill' => 'Cybersecurity Basics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-50'],
            ['major_id' => 'TKJ', 'question' => 'Teknik lateral movement dalam serangan siber merujuk pada?', 'options' => array (
  0 => 'Serangan dari luar jaringan langsung ke server utama',
  1 => 'Penggunaan wireless untuk menembus firewall',
  2 => 'Pencurian data melalui email phishing',
  3 => 'Serangan brute force pada password admin',
  4 => 'Tindakan penyerang bergerak dari satu sistem yang telah dibobol ke sistem lain dalam jaringan yang sama',
), 'correct' => 4, 'difficulty' => 'expert', 'skill' => 'Cybersecurity Basics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-51'],
            ['major_id' => 'TKJ', 'question' => 'Perangkat lunak virtualisasi yang dikembangkan oleh VMware untuk lingkungan desktop disebut?', 'options' => array (
  0 => 'VirtualBox',
  1 => 'VMware Workstation',
  2 => 'QEMU',
  3 => 'Xen',
  4 => 'Proxmox',
), 'correct' => 0, 'difficulty' => 'basic', 'skill' => 'Virtualization']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-52'],
            ['major_id' => 'TKJ', 'question' => 'Virtualisasi memungkinkan sebuah komputer fisik menjalankan beberapa sistem operasi secara bersamaan dengan bantuan?', 'options' => array (
  0 => 'BIOS',
  1 => 'Bootloader',
  2 => 'Firmware',
  3 => 'Hypervisor',
  4 => 'Driver',
), 'correct' => 3, 'difficulty' => 'basic', 'skill' => 'Virtualization']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-53'],
            ['major_id' => 'TKJ', 'question' => 'Hypervisor Type 1 (bare-metal) berjalan langsung di atas hardware, contohnya adalah?', 'options' => array (
  0 => 'VMware ESXi',
  1 => 'VMware Workstation',
  2 => 'VirtualBox',
  3 => 'Parallels',
  4 => 'QEMU',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'Virtualization']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-54'],
            ['major_id' => 'TKJ', 'question' => 'Snapshot pada mesin virtual berfungsi untuk?', 'options' => array (
  0 => 'Menyimpan kondisi mesin virtual pada waktu tertentu agar dapat dikembalikan',
  1 => 'Membuat copy fisik dari hard disk',
  2 => 'Meningkatkan performa CPU virtual',
  3 => 'Menghapus semua data virtual machine',
  4 => 'Membuat jaringan virtual baru',
), 'correct' => 4, 'difficulty' => 'intermediate', 'skill' => 'Virtualization']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-55'],
            ['major_id' => 'TKJ', 'question' => 'Fitur VMware vMotion memungkinkan?', 'options' => array (
  0 => 'Memindahkan mesin virtual yang sedang berjalan antar host tanpa downtime',
  1 => 'Menghapus mesin virtual secara permanen',
  2 => 'Membuat template baru untuk instalasi',
  3 => 'Mengatur firewall virtual',
  4 => 'Mengakses BIOS dari dalam VM',
), 'correct' => 0, 'difficulty' => 'intermediate', 'skill' => 'Virtualization']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-56'],
            ['major_id' => 'TKJ', 'question' => 'Jenis virtualisasi yang mensimulasikan perangkat keras komputer lengkap untuk menjalankan OS tamu disebut?', 'options' => array (
  0 => 'Para-virtualization',
  1 => 'Full Virtualization',
  2 => 'OS-level Virtualization',
  3 => 'Application Virtualization',
  4 => 'Desktop Virtualization',
), 'correct' => 2, 'difficulty' => 'advanced', 'skill' => 'Virtualization']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-57'],
            ['major_id' => 'TKJ', 'question' => 'Containerisasi berbeda dari virtualisasi tradisional karena?', 'options' => array (
  0 => 'Container berbagi kernel host OS dan hanya mengisolasi aplikasi, tidak menjalankan OS penuh',
  1 => 'Container memiliki hypervisor sendiri',
  2 => 'Container tidak memerlukan sistem operasi sama sekali',
  3 => 'Container berjalan lebih lambat dari VM',
  4 => 'Container tidak bisa dijalankan di Linux',
), 'correct' => 3, 'difficulty' => 'advanced', 'skill' => 'Virtualization']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-58'],
            ['major_id' => 'TKJ', 'question' => 'Pada konfigurasi virtual network, mode bridged memungkinkan VM untuk?', 'options' => array (
  0 => 'Mendapatkan IP address dari DHCP server yang sama dengan host fisik',
  1 => 'Hanya berkomunikasi dengan VM lain di host yang sama',
  2 => 'Berjalan tanpa koneksi jaringan',
  3 => 'Menggunakan IP statis tanpa konfigurasi',
  4 => 'Mengakses internet tanpa NAT',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'Virtualization']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-59'],
            ['major_id' => 'TKJ', 'question' => 'Fitur High Availability (HA) pada VMware vSphere Cluster berfungsi untuk?', 'options' => array (
  0 => 'Secara otomatis memulihkan mesin virtual ke host lain jika terjadi kegagalan host',
  1 => 'Membuat clone dari mesin virtual',
  2 => 'Meningkatkan jumlah CPU virtual',
  3 => 'Menghapus mesin virtual yang tidak aktif',
  4 => 'Membuat backup ke cloud',
), 'correct' => 2, 'difficulty' => 'expert', 'skill' => 'Virtualization']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-60'],
            ['major_id' => 'TKJ', 'question' => 'Resource pool pada cluster virtualisasi memungkinkan administrator untuk?', 'options' => array (
  0 => 'Mengalokasikan dan membatasi CPU, memory, dan storage untuk sekelompok VM secara hierarkis',
  1 => 'Membuat laporan penggunaan resource',
  2 => 'Menghapus VM yang sudah tidak digunakan',
  3 => 'Mengatur jaringan antar cluster',
  4 => 'Membuat user account baru',
), 'correct' => 0, 'difficulty' => 'expert', 'skill' => 'Virtualization']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-61'],
            ['major_id' => 'TKJ', 'question' => 'Shell scripting pada Linux menggunakan bahasa skrip yang paling umum adalah?', 'options' => array (
  0 => 'Bash',
  1 => 'VBScript',
  2 => 'C#',
  3 => 'Java',
  4 => 'PowerShell',
), 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'Shell Scripting']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-62'],
            ['major_id' => 'TKJ', 'question' => 'Untuk menjalankan file skrip Bash di Linux, perintah yang digunakan adalah?', 'options' => array (
  0 => 'run script.sh',
  1 => 'bash script.sh',
  2 => 'exec script.sh',
  3 => 'start script.sh',
  4 => 'cmd script.sh',
), 'correct' => 2, 'difficulty' => 'basic', 'skill' => 'Shell Scripting']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-63'],
            ['major_id' => 'TKJ', 'question' => 'Variabel dalam Bash dideklarasikan tanpa spasi di sekitar tanda sama dengan, contoh yang benar adalah?', 'options' => array (
  0 => '$name = Linux',
  1 => 'name = Linux',
  2 => 'name=Linux',
  3 => '$name:=Linux',
  4 => 'set name=Linux',
), 'correct' => 3, 'difficulty' => 'intermediate', 'skill' => 'Shell Scripting']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-64'],
            ['major_id' => 'TKJ', 'question' => 'Perintah conditional if-elif-else dalam Bash ditulis dengan sintaks?', 'options' => array (
), 'correct' => 4, 'difficulty' => 'intermediate', 'skill' => 'Shell Scripting']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-65'],
            ['major_id' => 'TKJ', 'question' => 'Looping dalam Bash yang mengulangi perintah untuk setiap item dalam sebuah list menggunakan?', 'options' => array (
  0 => 'for x in list; do ... done',
  1 => 'foreach x list { ... }',
  2 => 'loop list as x { ... }',
  3 => 'repeat x in list { ... }',
  4 => 'do while list x { ... }',
), 'correct' => 0, 'difficulty' => 'intermediate', 'skill' => 'Shell Scripting']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-66'],
            ['major_id' => 'TKJ', 'question' => 'Operator `$?` dalam Bash digunakan untuk mengecek?', 'options' => array (
  0 => 'Nilai variabel',
  1 => 'Exit status dari perintah terakhir yang dieksekusi',
  2 => 'Jumlah argumen',
  3 => 'Nama user saat ini',
  4 => 'Lokasi direktori kerja',
), 'correct' => 3, 'difficulty' => 'advanced', 'skill' => 'Shell Scripting']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-67'],
            ['major_id' => 'TKJ', 'question' => 'Cron job pada Linux digunakan untuk menjalankan skrip secara otomatis sesuai jadwal yang ditentukan. File crontab diakses dengan perintah?', 'options' => array (
  0 => 'cron -list',
  1 => 'crontab -e',
  2 => 'cronedit',
  3 => 'nano /etc/crontab -u',
  4 => 'scheduler -view',
), 'correct' => 0, 'difficulty' => 'advanced', 'skill' => 'Shell Scripting']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-68'],
            ['major_id' => 'TKJ', 'question' => 'Perintah `grep -r \'pattern\' /etc/` dalam Bash berfungsi untuk?', 'options' => array (
  0 => 'Mencari string \'pattern\' secara rekursif di dalam semua file di direktori /etc/',
  1 => 'Menghapus semua file di /etc/',
  2 => 'Mengganti semua teks \'pattern\' dengan teks baru',
  3 => 'Membuat backup direktori /etc/',
  4 => 'Mengompresi semua file di /etc/',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'Shell Scripting']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-69'],
            ['major_id' => 'TKJ', 'question' => 'Konsep pipes (`|`) dalam Bash memungkinkan?', 'options' => array (
  0 => 'Menjalankan dua perintah secara paralel',
  1 => 'Menghubungkan output satu perintah sebagai input perintah berikutnya secara berurutan',
  2 => 'Menyimpan output ke dalam variabel',
  3 => 'Membuat direktori baru',
  4 => 'Mengeksekusi perintah secara terbalik',
), 'correct' => 2, 'difficulty' => 'expert', 'skill' => 'Shell Scripting']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-70'],
            ['major_id' => 'TKJ', 'question' => 'Untuk menangkap input dari pengguna dalam Bash script dan menyimpannya ke variabel, digunakan perintah?', 'options' => array (
  0 => 'read -p \'Masukkan input: \' variabel',
  1 => 'input \'Masukkan input: \' variabel',
  2 => 'get \'Masukkan input: \' variabel',
  3 => 'scan \'Masukkan input: \' variabel',
  4 => 'ask \'Masukkan input: \' variabel',
), 'correct' => 4, 'difficulty' => 'expert', 'skill' => 'Shell Scripting']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-71'],
            ['major_id' => 'TKJ', 'question' => 'Komponen komputer yang berfungsi sebagai \'otak\' dan menjalankan instruksi program disebut?', 'options' => array (
  0 => 'RAM',
  1 => 'Hard Disk',
  2 => 'CPU (Central Processing Unit)',
  3 => 'GPU',
  4 => 'Power Supply',
), 'correct' => 2, 'difficulty' => 'basic', 'skill' => 'Hardware Troubleshooting']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-72'],
            ['major_id' => 'TKJ', 'question' => 'Perangkat yang berfungsi mengubah arus AC dari listrik menjadi arus DC yang dibutuhkan komponen komputer adalah?', 'options' => array (
  0 => 'Motherboard',
  1 => 'CPU',
  2 => 'RAM',
  3 => 'Power Supply Unit (PSU)',
  4 => 'Hard Disk',
), 'correct' => 3, 'difficulty' => 'basic', 'skill' => 'Hardware Troubleshooting']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-73'],
            ['major_id' => 'TKJ', 'question' => 'Jika komputer tidak menyala sama sekali setelah tombol power ditekan, komponen yang paling mungkin mengalami kerusakan adalah?', 'options' => array (
  0 => 'Monitor',
  1 => 'Keyboard',
  2 => 'Power Supply Unit (PSU)',
  3 => 'Mouse',
  4 => 'Speaker',
), 'correct' => 2, 'difficulty' => 'intermediate', 'skill' => 'Hardware Troubleshooting']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-74'],
            ['major_id' => 'TKJ', 'question' => 'Beep code pada POST (Power-On Self-Test) yang berbunyi satu panjang dan tiga pendek menandakan?', 'options' => array (
  0 => 'Kerusakan pada memori (RAM) atau masalah video adapter',
  1 => 'Hard disk tidak terdeteksi',
  2 => 'Prosesor tidak berfungsi',
  3 => 'Kipas CPU tidak berputar',
  4 => 'CD-ROM tidak terbaca',
), 'correct' => 4, 'difficulty' => 'intermediate', 'skill' => 'Hardware Troubleshooting']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-75'],
            ['major_id' => 'TKJ', 'question' => 'Jenis kerusakan hard disk yang menyebabkan bad sector disebabkan oleh?', 'options' => array (
  0 => 'Terlalu banyak file yang disimpan',
  1 => 'Penggunaan yang terus-menerus, panas berlebih, atau benturan fisik',
  2 => 'RAM yang tidak cukup',
  3 => 'Suhu ruangan yang terlalu dingin',
  4 => 'Koneksi internet yang lambat',
), 'correct' => 0, 'difficulty' => 'intermediate', 'skill' => 'Hardware Troubleshooting']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-76'],
            ['major_id' => 'TKJ', 'question' => 'Komponen GPU (Graphics Processing Unit) yang mengalami artifacting akan menampilkan gejala berupa?', 'options' => array (
  0 => 'Garis-garis aneh, piksel rusak, atau distorsi warna pada tampilan layar',
  1 => 'Komputer mati total',
  2 => 'Suara bising dari dalam casing',
  3 => 'Hard disk tidak terdeteksi',
  4 => 'Keyboard tidak berfungsi',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'Hardware Troubleshooting']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-77'],
            ['major_id' => 'TKJ', 'question' => 'Untuk menguji kesehatan hard disk secara profesional, tool diagnostik yang banyak digunakan adalah?', 'options' => array (
  0 => 'MemTest86',
  1 => 'CrystalDiskInfo / CrystalDiskMark',
  2 => 'CPU-Z',
  3 => 'FurMark',
  4 => 'HWMonitor',
), 'correct' => 4, 'difficulty' => 'advanced', 'skill' => 'Hardware Troubleshooting']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-78'],
            ['major_id' => 'TKJ', 'question' => 'RAM yang mengalami error pada modul tertentu dapat dideteksi dengan menggunakan tool diagnostik?', 'options' => array (
  0 => 'FurMark',
  1 => 'CrystalDiskInfo',
  2 => 'MemTest86+',
  3 => '3DMark',
  4 => 'GPU-Z',
), 'correct' => 2, 'difficulty' => 'advanced', 'skill' => 'Hardware Troubleshooting']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-79'],
            ['major_id' => 'TKJ', 'question' => 'Thermal throttling pada CPU terjadi ketika?', 'options' => array (
  0 => 'Suhu CPU mencapai batas tertentu sehingga clock speed diturunkan untuk mencegah kerusakan',
  1 => 'RAM terlalu penuh dengan data',
  2 => 'Hard disk mengalami fragmentasi',
  3 => 'Power supply tidak stabil',
  4 => 'Koneksi jaringan terputus',
), 'correct' => 0, 'difficulty' => 'expert', 'skill' => 'Hardware Troubleshooting']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-80'],
            ['major_id' => 'TKJ', 'question' => 'Teknik reballing pada GPU laptop dilakukan untuk mengatasi masalah?', 'options' => array (
  0 => 'Koneksi solder BGA (Ball Grid Array) pada GPU yang longgar akibat panas berlebih',
  1 => 'Hard disk yang mengalami bad sector',
  2 => 'RAM yang tidak kompatibel',
  3 => 'Keyboard yang tidak berfungsi',
  4 => 'Layar yang berkedip',
), 'correct' => 3, 'difficulty' => 'expert', 'skill' => 'Hardware Troubleshooting']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-81'],
            ['major_id' => 'TKJ', 'question' => 'Sistem Manajemen Basis Data (DBMS) yang merupakan produk open-source dan banyak digunakan pada web server Linux adalah?', 'options' => array (
  0 => 'Oracle Database',
  1 => 'Microsoft SQL Server',
  2 => 'MySQL/MariaDB',
  3 => 'DB2',
  4 => 'Access',
), 'correct' => 0, 'difficulty' => 'basic', 'skill' => 'Database Management']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-82'],
            ['major_id' => 'TKJ', 'question' => 'Perintah SQL untuk mengambil data dari tabel disebut?', 'options' => array (
  0 => 'INSERT',
  1 => 'SELECT',
  2 => 'UPDATE',
  3 => 'DELETE',
  4 => 'CREATE',
), 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'Database Management']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-83'],
            ['major_id' => 'TKJ', 'question' => 'Perintah SQL untuk memperbarui data yang sudah ada dalam tabel adalah?', 'options' => array (
  0 => 'SELECT',
  1 => 'INSERT',
  2 => 'ALTER',
  3 => 'UPDATE',
  4 => 'DROP',
), 'correct' => 2, 'difficulty' => 'intermediate', 'skill' => 'Database Management']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-84'],
            ['major_id' => 'TKJ', 'question' => 'Normalisasi dalam database bertujuan untuk?', 'options' => array (
  0 => 'Mengurangi data duplikat dan meningkatkan integritas data dengan memecah tabel menjadi tabel-tabel yang saling terkait',
  1 => 'Membuat query lebih lambat',
  2 => 'Menambah jumlah kolom pada tabel',
  3 => 'Menghapus semua index dari database',
  4 => 'Membuat tabel menjadi lebih kompleks',
), 'correct' => 3, 'difficulty' => 'intermediate', 'skill' => 'Database Management']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-85'],
            ['major_id' => 'TKJ', 'question' => 'Perintah SQL untuk menggabungkan data dari dua tabel berdasarkan kolom yang berhubungan disebut?', 'options' => array (
  0 => 'GROUP BY',
  1 => 'ORDER BY',
  2 => 'JOIN',
  3 => 'UNION',
  4 => 'HAVING',
), 'correct' => 4, 'difficulty' => 'intermediate', 'skill' => 'Database Management']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-86'],
            ['major_id' => 'TKJ', 'question' => 'Primary Key pada database berfungsi untuk?', 'options' => array (
  0 => 'Menjadi pengenal unik untuk setiap record/baris dalam tabel',
  1 => 'Mengurutkan data berdasarkan abjad',
  2 => 'Menyimpan data dalam format terenkripsi',
  3 => 'Membuat backup otomatis',
  4 => 'Menghapus data duplikat',
), 'correct' => 0, 'difficulty' => 'advanced', 'skill' => 'Database Management']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-87'],
            ['major_id' => 'TKJ', 'question' => 'Index pada database digunakan untuk?', 'options' => array (
  0 => 'Mempercepat proses pencarian dan query data',
  1 => 'Mengurangi ukuran database',
  2 => 'Membuat tabel baru secara otomatis',
  3 => 'Mengenkripsi data',
  4 => 'Membuat relasi antar tabel',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'Database Management']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-88'],
            ['major_id' => 'TKJ', 'question' => 'Perintah SQL berikut yang digunakan untuk membuat tabel baru dengan struktur tertentu adalah?', 'options' => array (
  0 => 'CREATE TABLE',
  1 => 'INSERT INTO',
  2 => 'ALTER TABLE',
  3 => 'DROP TABLE',
  4 => 'SELECT INTO',
), 'correct' => 2, 'difficulty' => 'advanced', 'skill' => 'Database Management']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-89'],
            ['major_id' => 'TKJ', 'question' => 'ACID dalam database merujuk pada empat sifat transaksi, yaitu?', 'options' => array (
  0 => 'Atomicity, Consistency, Isolation, Durability',
  1 => 'Access, Control, Integrity, Data',
  2 => 'Automated, Configured, Installed, Deployed',
  3 => 'Authentication, Connection, Identification, Division',
  4 => 'Aggregate, Computed, Indexed, Dynamic',
), 'correct' => 3, 'difficulty' => 'expert', 'skill' => 'Database Management']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-90'],
            ['major_id' => 'TKJ', 'question' => 'Replication pada MySQL memungkinkan?', 'options' => array (
  0 => 'Menyalin data dari server database utama ke server lain secara otomatis untuk ketersediaan dan redundansi',
  1 => 'Menghapus semua data dari database',
  2 => 'Membuat user account baru',
  3 => 'Mengubah struktur tabel',
  4 => 'Menginstal MySQL pada komputer baru',
), 'correct' => 4, 'difficulty' => 'expert', 'skill' => 'Database Management']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-91'],
            ['major_id' => 'TKJ', 'question' => 'Amazon Web Services (AWS) adalah layanan cloud computing yang dikembangkan oleh?', 'options' => array (
  0 => 'Microsoft',
  1 => 'Google',
  2 => 'Amazon',
  3 => 'IBM',
  4 => 'Oracle',
), 'correct' => 3, 'difficulty' => 'basic', 'skill' => 'Cloud Basics (AWS/Azure)']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-92'],
            ['major_id' => 'TKJ', 'question' => 'Layanan IaaS (Infrastructure as a Service) pada cloud computing menyediakan?', 'options' => array (
  0 => 'Virtualisasi server, penyimpanan, dan jaringan yang dapat dikonfigurasi sesuai kebutuhan',
  1 => 'Hanya software aplikasi siap pakai',
  2 => 'Hanya penyimpanan data saja',
  3 => 'Hanya layanan email',
  4 => 'Hanya layanan streaming video',
), 'correct' => 0, 'difficulty' => 'basic', 'skill' => 'Cloud Basics (AWS/Azure)']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-93'],
            ['major_id' => 'TKJ', 'question' => 'Layanan AWS EC2 (Elastic Compute Cloud) digunakan untuk?', 'options' => array (
  0 => 'Menyewa dan menjalankan virtual server (instance) di cloud AWS',
  1 => 'Menyimpan file di cloud',
  2 => 'Mengirim email',
  3 => 'Membuat website statis',
  4 => 'Menganalisis data big data',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'Cloud Basics (AWS/Azure)']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-94'],
            ['major_id' => 'TKJ', 'question' => 'Microsoft Azure adalah platform cloud computing yang menyediakan layanan computing, storage, dan networking melalui?', 'options' => array (
  0 => 'Data center global Microsoft yang terhubung melalui internet',
  1 => 'Server fisik yang disewakan langsung ke pengguna',
  2 => 'Jaringan peer-to-peer terdesentralisasi',
  3 => 'Satu data center yang berada di satu lokasi saja',
  4 => 'Koneksi radio frekuensi tinggi',
), 'correct' => 2, 'difficulty' => 'intermediate', 'skill' => 'Cloud Basics (AWS/Azure)']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-95'],
            ['major_id' => 'TKJ', 'question' => 'AWS S3 (Simple Storage Service) merupakan layanan penyimpanan objek yang cocok untuk?', 'options' => array (
  0 => 'Menyimpan backup, log aplikasi, static website, dan file multimedia',
  1 => 'Menjalankan database relasional',
  2 => 'Menjalankan aplikasi desktop',
  3 => 'Mengelola DNS domain',
  4 => 'Membuat VPN tunnel',
), 'correct' => 0, 'difficulty' => 'intermediate', 'skill' => 'Cloud Basics (AWS/Azure)']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-96'],
            ['major_id' => 'TKJ', 'question' => 'Pada AWS, Virtual Private Cloud (VPC) memungkinkan pengguna untuk?', 'options' => array (
  0 => 'Membuat jaringan virtual yang terisolasi dan terkontrol di dalam cloud AWS',
  1 => 'Menyewa server fisik di data center AWS',
  2 => 'Menginstal Windows langsung pada hardware AWS',
  3 => 'Membuat user account email',
  4 => 'Membeli domain name langsung dari AWS',
), 'correct' => 3, 'difficulty' => 'advanced', 'skill' => 'Cloud Basics (AWS/Azure)']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-97'],
            ['major_id' => 'TKJ', 'question' => 'Azure Active Directory (Azure AD) berbeda dari Active Directory lokal karena?', 'options' => array (
  0 => 'Azure AD berbasis cloud dan mendukung autentikasi untuk aplikasi SaaS modern seperti Microsoft 365',
  1 => 'Azure AD hanya bisa digunakan untuk komputer lokal',
  2 => 'Azure AD tidak mendukung multi-factor authentication',
  3 => 'Azure AD tidak memiliki fitur manajemen user',
  4 => 'Azure AD hanya tersedia untuk komputer Mac',
), 'correct' => 4, 'difficulty' => 'advanced', 'skill' => 'Cloud Basics (AWS/Azure)']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-98'],
            ['major_id' => 'TKJ', 'question' => 'Lambda Function pada AWS merupakan contoh layanan?', 'options' => array (
  0 => 'Serverless Computing yang menjalankan kode tanpa mengelola server',
  1 => 'Penyimpanan database relasional',
  2 => 'Layanan CDN global',
  3 => 'Mesin virtual khusus gaming',
  4 => 'Layanan email enterprise',
), 'correct' => 0, 'difficulty' => 'advanced', 'skill' => 'Cloud Basics (AWS/Azure)']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-99'],
            ['major_id' => 'TKJ', 'question' => 'Auto Scaling Group pada AWS memungkinkan infrastruktur cloud untuk?', 'options' => array (
  0 => 'Secara otomatis menambah atau mengurangi jumlah instance berdasarkan beban kerja',
  1 => 'Menghapus semua instance secara permanen',
  2 => 'Membuat instance baru secara manual',
  3 => 'Mengunci konfigurasi jaringan',
  4 => 'Menghapus semua data penyimpanan',
), 'correct' => 2, 'difficulty' => 'expert', 'skill' => 'Cloud Basics (AWS/Azure)']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tkj-100'],
            ['major_id' => 'TKJ', 'question' => 'Multi-region deployment pada cloud computing bertujuan untuk?', 'options' => array (
  0 => 'Meningkatkan ketersediaan aplikasi dan performa dengan mendekatkan layanan ke pengguna di berbagai wilayah geografis',
  1 => 'Mengurangi biaya infrastruktur',
  2 => 'Membuat backup hanya di satu lokasi',
  3 => 'Membatasi akses hanya untuk satu negara',
  4 => 'Membuat aplikasi berjalan lebih lambat',
), 'correct' => 1, 'difficulty' => 'expert', 'skill' => 'Cloud Basics (AWS/Azure)']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-01'],
            ['major_id' => 'TT', 'question' => 'Apa kepanjangan dari LAN?', 'options' => array (
  0 => 'Local Area Network',
  1 => 'Long Area Network',
  2 => 'Large Access Network',
  3 => 'Layered Area Network',
  4 => 'Local Access Node',
), 'correct' => 0, 'difficulty' => 'basic', 'skill' => 'Networking Basics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-02'],
            ['major_id' => 'TT', 'question' => 'Perangkat jaringan yang berfungsi menghubungkan beberapa jaringan dan mengirim paket data berdasarkan alamat IP disebut?', 'options' => array (
  0 => 'Hub',
  1 => 'Switch',
  2 => 'Router',
  3 => 'Repeater',
  4 => 'Bridge',
), 'correct' => 2, 'difficulty' => 'basic', 'skill' => 'Networking Basics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-03'],
            ['major_id' => 'TT', 'question' => 'Topologi jaringan yang memiliki satu titik pusat tempat semua perangkat terhubung secara langsung disebut topologi?', 'options' => array (
  0 => 'Mesh',
  1 => 'Ring',
  2 => 'Bus',
  3 => 'Star',
  4 => 'Tree',
), 'correct' => 3, 'difficulty' => 'intermediate', 'skill' => 'Networking Basics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-04'],
            ['major_id' => 'TT', 'question' => 'Dalam model OSI, layer yang bertanggung jawab untuk enkripsi dan dekripsi data disebut?', 'options' => array (
  0 => 'Session Layer',
  1 => 'Transport Layer',
  2 => 'Presentation Layer',
  3 => 'Application Layer',
  4 => 'Data Link Layer',
), 'correct' => 2, 'difficulty' => 'intermediate', 'skill' => 'Networking Basics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-05'],
            ['major_id' => 'TT', 'question' => 'Fungsi utama dari protokol ARP dalam jaringan adalah?', 'options' => array (
  0 => 'Menerjemahkan nama domain ke alamat IP',
  1 => 'Menerjemahkan alamat IP ke alamat MAC',
  2 => 'Mengatur koneksi TCP',
  3 => 'Mengenkripsi data yang dikirim',
  4 => 'Mengatur routing paket data',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'Networking Basics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-06'],
            ['major_id' => 'TT', 'question' => 'Manakah yang merupakan private IP address yang valid berdasarkan RFC 1918?', 'options' => array (
  0 => '172.32.1.1',
  1 => '192.168.256.1',
  2 => '172.16.0.1',
  3 => '10.0.0.256',
  4 => '192.169.1.1',
), 'correct' => 2, 'difficulty' => 'advanced', 'skill' => 'Networking Basics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-07'],
            ['major_id' => 'TT', 'question' => 'Dalam subnetting, jika suatu jaringan menggunakan subnet mask /26, berapa jumlah host yang tersedia di setiap subnet?', 'options' => array (
  0 => '128',
  1 => '64',
  2 => '32',
  3 => '62',
  4 => '30',
), 'correct' => 3, 'difficulty' => 'advanced', 'skill' => 'Networking Basics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-08'],
            ['major_id' => 'TT', 'question' => 'Teknik yang digunakan untuk menggabungkan beberapa link fisik menjadi satu link logis yang memiliki throughput lebih tinggi disebut?', 'options' => array (
  0 => 'Port Forwarding',
  1 => 'Link Aggregation',
  2 => 'Network Address Translation',
  3 => 'Virtual Private Network',
  4 => 'Dynamic Host Configuration',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'Networking Basics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-09'],
            ['major_id' => 'TT', 'question' => 'Konsep SDN (Software Defined Networking) memisahkan kontrol plane dari data plane. Komponen yang bertanggung jawab mengelola keputusan routing secara terpusat disebut?', 'options' => array (
  0 => 'Switch',
  1 => 'Router',
  2 => 'SDN Controller',
  3 => 'Firewall',
  4 => 'Gateway',
), 'correct' => 2, 'difficulty' => 'expert', 'skill' => 'Networking Basics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-10'],
            ['major_id' => 'TT', 'question' => 'Dalam arsitektur jaringan MPLS, label yang digunakan untuk mengidentifikasi Forwarding Equivalence Class (FEC) memiliki ukuran bit adalah?', 'options' => array (
  0 => '8 bit',
  1 => '16 bit',
  2 => '20 bit',
  3 => '32 bit',
  4 => '64 bit',
), 'correct' => 2, 'difficulty' => 'expert', 'skill' => 'Networking Basics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-11'],
            ['major_id' => 'TT', 'question' => 'Mode operasi default saat pertama kali mengakses console Cisco router disebut?', 'options' => array (
  0 => 'Privileged EXEC Mode',
  1 => 'Global Configuration Mode',
  2 => 'User EXEC Mode',
  3 => 'Interface Configuration Mode',
  4 => 'ROM Monitor Mode',
), 'correct' => 2, 'difficulty' => 'basic', 'skill' => 'Cisco IOS']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-12'],
            ['major_id' => 'TT', 'question' => 'Perintah Cisco IOS untuk menampilkan seluruh konfigurasi yang sedang berjalan di RAM adalah?', 'options' => array (
  0 => 'show startup-config',
  1 => 'show running-config',
  2 => 'show version',
  3 => 'show interfaces',
  4 => 'show ip route',
), 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'Cisco IOS']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-13'],
            ['major_id' => 'TT', 'question' => 'Untuk mengonfigurasi alamat IP pada interface FastEthernet0/0, perintah yang tepat adalah?', 'options' => array (
  0 => 'interface f0/0; ip address 192.168.1.1 255.255.255.0; shutdown',
  1 => 'interface f0/0; ip address 192.168.1.1 255.255.255.0; no shutdown',
  2 => 'ip interface f0/0 192.168.1.1 255.255.255.0',
  3 => 'set ip f0/0 192.168.1.1 255.255.255.0',
  4 => 'configure ip f0/0 192.168.1.1/24',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'Cisco IOS']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-14'],
            ['major_id' => 'TT', 'question' => 'Perintah Cisco IOS untuk mengatur banner login yang akan ditampilkan saat pengguna mengakses perangkat adalah?', 'options' => array (
  0 => 'banner message \'Selamat Datang\'',
  1 => 'banner login #Selamat Datang#',
  2 => 'set banner selamat datang',
  3 => 'login banner welcome',
  4 => 'message-of-the-day selamat datang',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'Cisco IOS']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-15'],
            ['major_id' => 'TT', 'question' => 'Konfigurasi DHCP pool pada Cisco router menggunakan perintah-mode sebagai berikut?', 'options' => array (
  0 => 'ip dhcp pool NAME; network NETWORK SUBNET; default-router GATEWAY',
  1 => 'dhcp pool create NAME; set network; set gateway',
  2 => 'service dhcp; pool NAME; ip network',
  3 => 'dhcp server NAME; add network; add gateway',
  4 => 'ip dhcp server NAME network SUBNET',
), 'correct' => 0, 'difficulty' => 'intermediate', 'skill' => 'Cisco IOS']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-16'],
            ['major_id' => 'TT', 'question' => 'Untuk mengamankan akses privileged EXEC mode dengan kata sandi enkripsi, perintah yang digunakan adalah?', 'options' => array (
  0 => 'enable password mypassword',
  1 => 'enable secret mypassword',
  2 => 'privileged password mypassword',
  3 => 'secret enable mypassword',
  4 => 'security password mypassword',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'Cisco IOS']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-17'],
            ['major_id' => 'TT', 'question' => 'Konfigurasi Static NAT pada Cisco router ditulis dengan syntax sebagai berikut?', 'options' => array (
  0 => 'ip nat inside source static LOCAL_IP PUBLIC_IP',
  1 => 'nat static add LOCAL_IP PUBLIC_IP',
  2 => 'ip nat static map LOCAL_IP to PUBLIC_IP',
  3 => 'static nat translate LOCAL_IP PUBLIC_IP',
  4 => 'ip nat inside static LOCAL_IP PUBLIC_IP',
), 'correct' => 0, 'difficulty' => 'advanced', 'skill' => 'Cisco IOS']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-18'],
            ['major_id' => 'TT', 'question' => 'Perintah Cisco IOS untuk melakukan backup konfigurasi ke TFTP server adalah?', 'options' => array (
  0 => 'copy running-config tftp:',
  1 => 'backup config tftp',
  2 => 'save config to tftp',
  3 => 'write tftp',
  4 => 'tftp copy running-config',
), 'correct' => 0, 'difficulty' => 'advanced', 'skill' => 'Cisco IOS']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-19'],
            ['major_id' => 'TT', 'question' => 'Untuk melakukan password recovery pada Cisco router agar tidak loading startup-config saat boot, perintah yang digunakan di ROMMON adalah?', 'options' => array (
  0 => 'confreg 0x2142',
  1 => 'config-register 0x2100',
  2 => 'rommon> reset -noconfig',
  3 => 'boot skip-config',
  4 => 'register 0x2142',
), 'correct' => 0, 'difficulty' => 'expert', 'skill' => 'Cisco IOS']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-20'],
            ['major_id' => 'TT', 'question' => 'Implementasi OSPF dengan multi-area pada Cisco router, perintah untuk mengaktifkan OSPF dan menetapkan area pada interface adalah?', 'options' => array (
  0 => 'router ospf 1; network IP_AREA AREA',
  1 => 'ip ospf process area AREA interface IF',
  2 => 'ospf enable area AREA on interface',
  3 => 'routing ospf 1; area AREA interface IF',
  4 => 'router ospf process-id; network address wildcard-mask area area-id',
), 'correct' => 4, 'difficulty' => 'expert', 'skill' => 'Cisco IOS']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-21'],
            ['major_id' => 'TT', 'question' => 'Jenis serat optik yang memiliki satu mode propagasi cahaya disebut?', 'options' => array (
  0 => 'Multi-mode',
  1 => 'Single-mode',
  2 => 'Dual-mode',
  3 => 'Multi-path',
  4 => 'Core-mode',
), 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'Fiber Optics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-22'],
            ['major_id' => 'TT', 'question' => 'Satuan yang digunakan untuk mengukur kekuatan sinyal cahaya pada serat optik disebut?', 'options' => array (
  0 => 'Watt',
  1 => 'Decibel-miliwatt (dBm)',
  2 => 'Hertz',
  3 => 'Volt',
  4 => 'Ohm',
), 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'Fiber Optics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-23'],
            ['major_id' => 'TT', 'question' => 'Standar serat optik multi-mode yang paling banyak digunakan untuk jarak hingga 2 km dengan kecepatan tinggi adalah?', 'options' => array (
  0 => 'OM1',
  1 => 'OM2',
  2 => 'OM3',
  3 => 'OS1',
  4 => 'OS2',
), 'correct' => 2, 'difficulty' => 'intermediate', 'skill' => 'Fiber Optics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-24'],
            ['major_id' => 'TT', 'question' => 'Pada splicing serat optik, kerugian loss yang dihasilkan oleh metode fusion splicing umumnya berkisar?', 'options' => array (
  0 => '0.5 - 1.0 dB',
  1 => '0.1 - 0.5 dB',
  2 => '0.01 - 0.05 dB',
  3 => '1.0 - 2.0 dB',
  4 => '2.0 - 5.0 dB',
), 'correct' => 2, 'difficulty' => 'intermediate', 'skill' => 'Fiber Optics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-25'],
            ['major_id' => 'TT', 'question' => 'Alat yang digunakan untuk mengukur panjang serat optik, titik putus, dan tingkat kerusakan pada serat disebut?', 'options' => array (
  0 => 'Optical Power Meter',
  1 => 'OTDR (Optical Time Domain Reflectometer)',
  2 => 'Fusion Splicer',
  3 => 'Light Source',
  4 => 'Visual Fault Locator',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'Fiber Optics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-26'],
            ['major_id' => 'TT', 'question' => 'Pada kabel serat optik dark fiber, istilah \'attenuation\' mengacu pada?', 'options' => array (
  0 => 'Peningkatan intensitas cahaya seiring jarak',
  1 => 'Penurunan kekuatan sinyal cahaya seiring jarak',
  2 => 'Pemantulan cahaya di dalam core',
  3 => 'Distorsi sinyal akibat chromatic dispersion',
  4 => 'Kehilangan sinyal akibat connectors yang longgar',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'Fiber Optics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-27'],
            ['major_id' => 'TT', 'question' => 'Dalam Wavelength Division Multiplexing (WDM) pada serat optik, jumlah channel yang dapat ditransmisikan secara bersamaan pada CWDM umumnya adalah?', 'options' => array (
  0 => 'Hingga 4 channel',
  1 => 'Hingga 8 channel',
  2 => 'Hingga 18 channel',
  3 => 'Hingga 64 channel',
  4 => 'Hingga 160 channel',
), 'correct' => 2, 'difficulty' => 'advanced', 'skill' => 'Fiber Optics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-28'],
            ['major_id' => 'TT', 'question' => 'Pengujian_Insertion Loss pada kabel serat optik connector mengacu pada berapa banyak sinyal yang hilang saat cahaya melewati connector tersebut. Standar insertion loss yang baik untuk connector LC adalah?', 'options' => array (
  0 => 'Kurang dari 0.5 dB',
  1 => 'Kurang dari 0.3 dB',
  2 => 'Kurang dari 1.0 dB',
  3 => 'Kurang dari 0.1 dB',
  4 => 'Kurang dari 2.0 dB',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'Fiber Optics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-29'],
            ['major_id' => 'TT', 'question' => 'Pada jaringan FTTH (Fiber To The Home), arsitektur jaringan yang menggunakan splitter pasif untuk membagi sinyal dari satu OLT ke banyak ONT disebut?', 'options' => array (
  0 => 'Active Ethernet',
  1 => 'Point-to-Point (P2P)',
  2 => 'Passive Optical Network (PON)',
  3 => 'Wavelength Division Multiplexing',
  4 => 'Cable Television (CATV) Network',
), 'correct' => 2, 'difficulty' => 'expert', 'skill' => 'Fiber Optics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-30'],
            ['major_id' => 'TT', 'question' => 'Standar ITU-T untuk GPON (Gigabit PON) yang mendefinisikan downstream 2.488 Gbps dan upstream 1.244 Gbps adalah?', 'options' => array (
  0 => 'ITU-T G.984',
  1 => 'ITU-T G.983',
  2 => 'ITU-T G.987',
  3 => 'ITU-T G.989',
  4 => 'ITU-T G.985',
), 'correct' => 0, 'difficulty' => 'expert', 'skill' => 'Fiber Optics']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-31'],
            ['major_id' => 'TT', 'question' => 'Sistem operasi berbasis Linux yang digunakan pada perangkat jaringan MikroTik disebut?', 'options' => array (
  0 => 'RouterOS',
  1 => 'SwitchOS',
  2 => 'NetOS',
  3 => 'MikroTOS',
  4 => 'Linux Router',
), 'correct' => 0, 'difficulty' => 'basic', 'skill' => 'Mikrotik']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-32'],
            ['major_id' => 'TT', 'question' => 'Aplikasi desktop yang digunakan untuk mengelola perangkat MikroTik dari jarak jauh melalui GUI disebut?', 'options' => array (
  0 => 'MikroTik Manager',
  1 => 'WinBox',
  2 => 'MikroTik WebControl',
  3 => 'RouterConfig',
  4 => 'NetManager',
), 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'Mikrotik']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-33'],
            ['major_id' => 'TT', 'question' => 'Pada MikroTik RouterOS, perintah CLI untuk melihat semua interface yang aktif adalah?', 'options' => array (
  0 => '/interface print',
  1 => '/system print',
  2 => '/ip print',
  3 => '/interface monitor',
  4 => '/show interfaces',
), 'correct' => 0, 'difficulty' => 'intermediate', 'skill' => 'Mikrotik']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-34'],
            ['major_id' => 'TT', 'question' => 'Fitur MikroTik yang berfungsi membatasi bandwidth pengguna berdasarkan profil yang telah ditetapkan disebut?', 'options' => array (
  0 => 'Queues',
  1 => 'Hotspot',
  2 => 'Firewall',
  3 => 'DHCP Server',
  4 => 'DNS Cache',
), 'correct' => 0, 'difficulty' => 'intermediate', 'skill' => 'Mikrotik']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-35'],
            ['major_id' => 'TT', 'question' => 'Untuk melakukan NAT (Network Address Translation) masuk di MikroTik agar komputer di dalam jaringan lokal dapat mengakses internet, tipe NAT yang digunakan adalah?', 'options' => array (
  0 => 'srcnat',
  1 => 'dstnat',
  2 => 'masquerade input',
  3 => 'forward nat',
  4 => 'redirect',
), 'correct' => 0, 'difficulty' => 'intermediate', 'skill' => 'Mikrotik']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-36'],
            ['major_id' => 'TT', 'question' => 'Fitur hotspot MikroTik yang mengharuskan pengguna login melalui halaman web sebelum mengakses internet disebut?', 'options' => array (
  0 => 'Captive Portal',
  1 => 'RADIUS Authentication',
  2 => 'PPPoE Server',
  3 => 'DHCP Relay',
  4 => 'Web Proxy',
), 'correct' => 0, 'difficulty' => 'advanced', 'skill' => 'Mikrotik']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-37'],
            ['major_id' => 'TT', 'question' => 'Pada konfigurasi bandwidth management MikroTik menggunakan Queue Tree, parent queue yang digunakan untuk membatasi total bandwidth upstream interface adalah?', 'options' => array (
  0 => 'global-in',
  1 => 'global-out',
  2 => 'global-total',
  3 => 'interface-queue',
  4 => 'upload-queue',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'Mikrotik']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-38'],
            ['major_id' => 'TT', 'question' => 'Protokol routing yang dapat dikonfigurasi pada MikroTik untuk membangun VPN tunnel antara dua site dengan enkripsi IPsec disebut?', 'options' => array (
  0 => 'L2TP with IPsec',
  1 => 'GRE with IPsec',
  2 => 'SSTP',
  3 => 'PPTP',
  4 => 'IPIP Tunnel',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'Mikrotik']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-39'],
            ['major_id' => 'TT', 'question' => 'Fitur RouterOS v7 yang memungkinkan pembuatan firewall rules dengan menggunakan parser rules stateful yang lebih efisien disebut?', 'options' => array (
  0 => 'FastTrack',
  1 => 'Connection Tracking v2',
  2 => 'Firewall Optimizer',
  3 => 'Flow Control',
  4 => 'Packet Accelerator',
), 'correct' => 0, 'difficulty' => 'expert', 'skill' => 'Mikrotik']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-40'],
            ['major_id' => 'TT', 'question' => 'Pada RouterOS, fitur yang memungkinkan load balancing secara automatic dengan menggunakan ECMP (Equal Cost Multi-Path) memerlukan konfigurasi pada menu?', 'options' => array (
  0 => '/ip route dengan multiple gateways',
  1 => '/interface bonding',
  2 => '/routing bgp',
  3 => '/ip dhcp-client',
  4 => '/ip firewall nat',
), 'correct' => 0, 'difficulty' => 'expert', 'skill' => 'Mikrotik']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-41'],
            ['major_id' => 'TT', 'question' => 'Standar IEEE 802.11 yang beroperasi pada frekuensi 5 GHz dan mendukung kecepatan hingga 54 Mbps disebut?', 'options' => array (
  0 => '802.11b',
  1 => '802.11g',
  2 => '802.11a',
  3 => '802.11n',
  4 => '802.11ac',
), 'correct' => 2, 'difficulty' => 'basic', 'skill' => 'Wireless Technology']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-42'],
            ['major_id' => 'TT', 'question' => 'Istilah yang digunakan untuk menggambarkan area cakupan sinyal wireless dari access point disebut?', 'options' => array (
  0 => 'Frequency range',
  1 => 'Signal strength',
  2 => 'Coverage area',
  3 => 'Channel width',
  4 => 'Transmission power',
), 'correct' => 2, 'difficulty' => 'basic', 'skill' => 'Wireless Technology']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-43'],
            ['major_id' => 'TT', 'question' => 'Pada wireless networking, teknik yang digunakan untuk menggabungkan beberapa channel menjadi satu channel yang lebih lebar untuk meningkatkan throughput disebut?', 'options' => array (
  0 => 'Channel bonding',
  1 => 'Frequency hopping',
  2 => 'Spread spectrum',
  3 => 'Preamble detection',
  4 => 'Beacon management',
), 'correct' => 0, 'difficulty' => 'intermediate', 'skill' => 'Wireless Technology']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-44'],
            ['major_id' => 'TT', 'question' => 'Pada standar 802.11n, teknologi yang menggunakan beberapa antena untuk transmit dan receive secara bersamaan disebut?', 'options' => array (
  0 => 'DSSS',
  1 => 'OFDM',
  2 => 'MIMO',
  3 => 'FHSS',
  4 => 'CDMA',
), 'correct' => 2, 'difficulty' => 'intermediate', 'skill' => 'Wireless Technology']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-45'],
            ['major_id' => 'TT', 'question' => 'Metode akses wireless yang digunakan untuk mengurangi collision pada jaringan wireless disebut?', 'options' => array (
  0 => 'CSMA/CD',
  1 => 'CSMA/CA',
  2 => 'TDMA',
  3 => 'Token Passing',
  4 => 'Polling',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'Wireless Technology']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-46'],
            ['major_id' => 'TT', 'question' => 'Access point wireless yang dikonfigurasi untuk meneruskan data dari satu client ke access point lain disebut sebagai?', 'options' => array (
  0 => 'Repeater',
  1 => 'Bridge',
  2 => 'Client Mode',
  3 => 'WDS Bridge',
  4 => 'Access Point Mode',
), 'correct' => 0, 'difficulty' => 'advanced', 'skill' => 'Wireless Technology']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-47'],
            ['major_id' => 'TT', 'question' => 'Pada wireless MikroTik, fitur yang memungkinkan pembagian bandwidth per-user secara otomatis pada wireless interface disebut?', 'options' => array (
  0 => 'Nstreme',
  1 => 'NV2',
  2 => 'Bandwidth Test',
  3 => 'Queue Simple',
  4 => 'Wireless QoS',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'Wireless Technology']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-48'],
            ['major_id' => 'TT', 'question' => 'Teknologi 802.11ax (Wi-Fi 6) menggunakan teknik yang memungkinkan access point berkomunikasi dengan banyak client secara bersamaan pada waktu yang sama disebut?', 'options' => array (
  0 => 'OFDM',
  1 => 'MU-MIMO',
  2 => 'OFDMA',
  3 => 'Beamforming',
  4 => 'QAM',
), 'correct' => 2, 'difficulty' => 'advanced', 'skill' => 'Wireless Technology']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-49'],
            ['major_id' => 'TT', 'question' => 'Pada wireless point-to-point (PtP) jarak jauh, faktor utama yang menentukan keberhasilan transmisi selain kekuatan sinyal adalah?', 'options' => array (
  0 => 'Ukuran antena dan line of sight (LoS)',
  1 => 'Jumlah client yang terkoneksi',
  2 => 'Kecepatan clock processor AP',
  3 => 'Tipe kabel yang digunakan',
  4 => 'Jumlah SSID yang dikonfigurasi',
), 'correct' => 0, 'difficulty' => 'expert', 'skill' => 'Wireless Technology']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-50'],
            ['major_id' => 'TT', 'question' => 'Channel utilization pada wireless dapat ditingkatkan dengan mengurangi idle time pada setiap frame. Teknik yang memungkinkan hal ini disebut?', 'options' => array (
  0 => 'TXOP (Transmission Opportunity)',
  1 => 'AIFS (Arbitration Inter-Frame Spacing)',
  2 => 'RTS/CTS',
  3 => 'Fragmentation',
  4 => 'Aggregation (A-MSDU/A-MPDU)',
), 'correct' => 3, 'difficulty' => 'expert', 'skill' => 'Wireless Technology']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-51'],
            ['major_id' => 'TT', 'question' => 'Apa kepanjangan dari TCP?', 'options' => array (
  0 => 'Transmission Control Protocol',
  1 => 'Transfer Connection Protocol',
  2 => 'Telecom Communication Protocol',
  3 => 'Transmission Central Protocol',
  4 => 'Transport Control Protocol',
), 'correct' => 0, 'difficulty' => 'basic', 'skill' => 'TCP/IP']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-52'],
            ['major_id' => 'TT', 'question' => 'Port number yang digunakan oleh protokol HTTP secara default adalah?', 'options' => array (
  0 => '21',
  1 => '25',
  2 => '80',
  3 => '443',
  4 => '8080',
), 'correct' => 2, 'difficulty' => 'basic', 'skill' => 'TCP/IP']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-53'],
            ['major_id' => 'TT', 'question' => 'Pada model TCP/IP, layer yang bertanggung jawab mengirim paket dari host sumber ke host tujuan disebut?', 'options' => array (
  0 => 'Application Layer',
  1 => 'Transport Layer',
  2 => 'Internet Layer',
  3 => 'Network Interface Layer',
  4 => 'Session Layer',
), 'correct' => 2, 'difficulty' => 'intermediate', 'skill' => 'TCP/IP']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-54'],
            ['major_id' => 'TT', 'question' => 'Proses yang dilakukan oleh TCP saat memulai koneksi antara dua host disebut?', 'options' => array (
  0 => 'Four-way Handshake',
  1 => 'Three-way Handshake',
  2 => 'Two-way Handshake',
  3 => 'One-way Handshake',
  4 => 'Connectionless Handshake',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'TCP/IP']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-55'],
            ['major_id' => 'TT', 'question' => 'Layanan DNS berfungsi untuk?', 'options' => array (
  0 => 'Menerjemahkan alamat IP ke alamat MAC',
  1 => 'Menerjemahkan nama domain ke alamat IP',
  2 => 'Mengenkripsi data jaringan',
  3 => 'Mengatur routing paket',
  4 => 'Mengatur IP address otomatis',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'TCP/IP']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-56'],
            ['major_id' => 'TT', 'question' => 'Jenis record DNS yang digunakan untuk mengonfigurasi mail server pada suatu domain disebut?', 'options' => array (
  0 => 'A Record',
  1 => 'CNAME Record',
  2 => 'MX Record',
  3 => 'TXT Record',
  4 => 'PTR Record',
), 'correct' => 2, 'difficulty' => 'advanced', 'skill' => 'TCP/IP']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-57'],
            ['major_id' => 'TT', 'question' => 'Pada TCP, mekanisme flow control yang digunakan untuk mengatur laju data yang dikirim agar tidak melebihi kemampuan penerima disebut?', 'options' => array (
  0 => 'Sliding Window',
  1 => 'Stop and Wait',
  2 => 'Polling',
  3 => 'Token Passing',
  4 => 'Round Robin',
), 'correct' => 0, 'difficulty' => 'advanced', 'skill' => 'TCP/IP']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-58'],
            ['major_id' => 'TT', 'question' => 'Jenis serangan yang memanfaatkan kelemahan three-way handshake TCP dengan mengirimkan SYN packet dalam jumlah besar disebut?', 'options' => array (
  0 => 'Ping Flood',
  1 => 'SYN Flood',
  2 => 'UDP Flood',
  3 => 'ICMP Redirect',
  4 => 'ARP Poisoning',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'TCP/IP']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-59'],
            ['major_id' => 'TT', 'question' => 'Pada protokol UDP, field yang berfungsi sebagai checksum untuk memverifikasi integritas data header dan payload disebut?', 'options' => array (
  0 => 'Sequence Number',
  1 => 'Acknowledgment Number',
  2 => 'Checksum Field',
  3 => 'Window Size',
  4 => 'Urgent Pointer',
), 'correct' => 2, 'difficulty' => 'expert', 'skill' => 'TCP/IP']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-60'],
            ['major_id' => 'TT', 'question' => 'Nilai Default TTL (Time To Live) pada sistem operasi Windows saat mengirim paket IP adalah?', 'options' => array (
  0 => '32',
  1 => '64',
  2 => '128',
  3 => '255',
  4 => '16',
), 'correct' => 2, 'difficulty' => 'expert', 'skill' => 'TCP/IP']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-61'],
            ['major_id' => 'TT', 'question' => 'Perangkat jaringan yang memfilter lalu lintas data berdasarkan aturan keamanan yang telah ditetapkan disebut?', 'options' => array (
  0 => 'Router',
  1 => 'Switch',
  2 => 'Firewall',
  3 => 'Hub',
  4 => 'Bridge',
), 'correct' => 2, 'difficulty' => 'basic', 'skill' => 'Network Security']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-62'],
            ['major_id' => 'TT', 'question' => 'Jenis serangan di mana penyerang mencoba mengambil alih session pengguna dengan cara menangkap dan memanfaatkan cookie atau token disebut?', 'options' => array (
  0 => 'Phishing',
  1 => 'Session Hijacking',
  2 => 'Brute Force',
  3 => 'SQL Injection',
  4 => 'Cross-Site Scripting',
), 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'Network Security']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-63'],
            ['major_id' => 'TT', 'question' => 'Protokol yang digunakan untuk mengamankan koneksi web dengan mengenkripsi data antara browser dan server disebut?', 'options' => array (
  0 => 'FTP',
  1 => 'SSH',
  2 => 'SSL/TLS',
  3 => 'Telnet',
  4 => 'SNMP',
), 'correct' => 2, 'difficulty' => 'intermediate', 'skill' => 'Network Security']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-64'],
            ['major_id' => 'TT', 'question' => 'Serangan yang dilakukan dengan cara membombardir target dengan ICMP Echo Request dalam jumlah besar disebut?', 'options' => array (
  0 => 'SYN Flood',
  1 => 'UDP Flood',
  2 => 'Ping Flood',
  3 => 'Smurf Attack',
  4 => 'Teardrop',
), 'correct' => 2, 'difficulty' => 'intermediate', 'skill' => 'Network Security']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-65'],
            ['major_id' => 'TT', 'question' => 'Teknik keamanan yang membagi jaringan menjadi beberapa segmen terpisah untuk membatasi penyebaran serangan disebut?', 'options' => array (
  0 => 'Network Address Translation',
  1 => 'Virtual Private Network',
  2 => 'Network Segmentation',
  3 => 'Port Forwarding',
  4 => 'Load Balancing',
), 'correct' => 2, 'difficulty' => 'intermediate', 'skill' => 'Network Security']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-66'],
            ['major_id' => 'TT', 'question' => 'Serangan ARP Poisoning bertujuan untuk?', 'options' => array (
  0 => 'Memutuskan koneksi internet korban',
  1 => 'Memetakan ulang alamat MAC ke alamat IP pada ARP cache korban',
  2 => 'Mengenkripsi lalu lintas jaringan korban',
  3 => 'Memperlambat kecepatan transfer data korban',
  4 => 'Menghapus tabel routing pada router korban',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'Network Security']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-67'],
            ['major_id' => 'TT', 'question' => 'Sistem yang memantau lalu lintas jaringan secara real-time dan memberikan peringatan saat mendeteksi aktivitas mencurigakan disebut?', 'options' => array (
  0 => 'NAT System',
  1 => 'DHCP Server',
  2 => 'IDS (Intrusion Detection System)',
  3 => 'Proxy Server',
  4 => 'VPN Gateway',
), 'correct' => 2, 'difficulty' => 'advanced', 'skill' => 'Network Security']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-68'],
            ['major_id' => 'TT', 'question' => 'Firewall yang beroperasi dengan memeriksa konten data pada layer application dari paket disebut?', 'options' => array (
  0 => 'Packet Filtering Firewall',
  1 => 'Circuit-Level Gateway Firewall',
  2 => 'Application-Level Gateway Firewall',
  3 => 'Stateless Firewall',
  4 => 'Network Address Translation Firewall',
), 'correct' => 2, 'difficulty' => 'advanced', 'skill' => 'Network Security']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-69'],
            ['major_id' => 'TT', 'question' => 'Teknik keamanan yang memungkinkan pengguna mengakses sistem hanya setelah melewati beberapa tahap verifikasi disebut?', 'options' => array (
  0 => 'Single Sign-On',
  1 => 'Multi-Factor Authentication (MFA)',
  2 => 'Role-Based Access Control',
  3 => 'Password Policy',
  4 => 'Token Authentication',
), 'correct' => 1, 'difficulty' => 'expert', 'skill' => 'Network Security']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-70'],
            ['major_id' => 'TT', 'question' => 'Dalam implementasi VPN IPsec, mode yang mengenkripsi seluruh paket IP termasuk header asli disebut?', 'options' => array (
  0 => 'Transport Mode',
  1 => 'Tunnel Mode',
  2 => 'Split Mode',
  3 => 'Encapsulation Mode',
  4 => 'Proxy Mode',
), 'correct' => 1, 'difficulty' => 'expert', 'skill' => 'Network Security']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-71'],
            ['major_id' => 'TT', 'question' => 'Perintah Linux yang digunakan untuk menampilkan isi direktori saat ini adalah?', 'options' => array (
  0 => 'cd',
  1 => 'ls',
  2 => 'pwd',
  3 => 'dir',
  4 => 'path',
), 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'Linux']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-72'],
            ['major_id' => 'TT', 'question' => 'Shell default yang digunakan oleh kebanyakan distribusi Linux modern adalah?', 'options' => array (
  0 => 'csh',
  1 => 'ksh',
  2 => 'bash',
  3 => 'zsh',
  4 => 'fish',
), 'correct' => 2, 'difficulty' => 'basic', 'skill' => 'Linux']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-73'],
            ['major_id' => 'TT', 'question' => 'Perintah Linux untuk mengatur hak akses file agar dapat dieksekusi oleh owner adalah?', 'options' => array (
  0 => 'chmod 744 file.txt',
  1 => 'chmod 644 file.txt',
  2 => 'chmod 555 file.txt',
  3 => 'chmod 755 file.txt',
  4 => 'chmod 444 file.txt',
), 'correct' => 0, 'difficulty' => 'intermediate', 'skill' => 'Linux']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-74'],
            ['major_id' => 'TT', 'question' => 'File konfigurasi di Linux yang berfungsi sebagai daemon untuk mengelola layanan DNS server BIND disebut?', 'options' => array (
  0 => '/etc/resolv.conf',
  1 => '/etc/dns.conf',
  2 => '/etc/named.conf',
  3 => '/etc/bind.conf',
  4 => '/etc/hosts',
), 'correct' => 2, 'difficulty' => 'intermediate', 'skill' => 'Linux']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-75'],
            ['major_id' => 'TT', 'question' => 'Perintah Linux untuk menampilkan isi dari sebuah file teks secara berurutan dari awal hingga akhir adalah?', 'options' => array (
  0 => 'more',
  1 => 'cat',
  2 => 'less',
  3 => 'head',
  4 => 'tail',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'Linux']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-76'],
            ['major_id' => 'TT', 'question' => 'Di Linux, direktori yang menyimpan log sistem (system logs) secara default adalah?', 'options' => array (
  0 => '/etc/logs',
  1 => '/var/log',
  2 => '/opt/logs',
  3 => '/tmp/log',
  4 => '/usr/log',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'Linux']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-77'],
            ['major_id' => 'TT', 'question' => 'Perintah Linux untuk memantau lalu lintas jaringan secara real-time secara continu adalah?', 'options' => array (
  0 => 'ping',
  1 => 'iftop',
  2 => 'nslookup',
  3 => 'dig',
  4 => 'host',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'Linux']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-78'],
            ['major_id' => 'TT', 'question' => 'Mekanisme di Linux yang memungkinkan proses menjalankan program dengan hak akses yang lebih tinggi dari yang dimilikinya disebut?', 'options' => array (
  0 => 'iptables',
  1 => 'sudo',
  2 => 'su',
  3 => 'chown',
  4 => 'setuid',
), 'correct' => 4, 'difficulty' => 'advanced', 'skill' => 'Linux']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-79'],
            ['major_id' => 'TT', 'question' => 'Perintah iptables pada Linux untuk membuat aturan NAT yang mengubah sumber alamat IP paket keluar dari interface eth0 disebut?', 'options' => array (
  0 => 'iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE',
  1 => 'iptables -t filter -A INPUT -o eth0 -j ACCEPT',
  2 => 'iptables -t mangle -A FORWARD -i eth0 -j DROP',
  3 => 'iptables -t raw -A PREROUTING -i eth0 -j REDIRECT',
  4 => 'iptables -t security -A OUTPUT -o eth0 -j LOG',
), 'correct' => 0, 'difficulty' => 'expert', 'skill' => 'Linux']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-80'],
            ['major_id' => 'TT', 'question' => 'Mekanisme systemd di Linux yang menggantikan init system digunakan untuk?', 'options' => array (
  0 => 'Mengelola file system dan mount point',
  1 => 'Mengelola layanan dan unit sistem secara paralel',
  2 => 'Mengelola jaringan dan firewall',
  3 => 'Mengelola user authentication',
  4 => 'Mengelola file permission',
), 'correct' => 1, 'difficulty' => 'expert', 'skill' => 'Linux']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-81'],
            ['major_id' => 'TT', 'question' => 'Kepanjangan dari VoIP adalah?', 'options' => array (
  0 => 'Voice over Internet Protocol',
  1 => 'Video over Internet Protocol',
  2 => 'Voice on IP',
  3 => 'Virtual over Internet Protocol',
  4 => 'Voice over IP Phone',
), 'correct' => 0, 'difficulty' => 'basic', 'skill' => 'VoIP']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-82'],
            ['major_id' => 'TT', 'question' => 'Protokol yang paling umum digunakan untuk mengontrol sesi panggilan VoIP disebut?', 'options' => array (
  0 => 'RTP',
  1 => 'SIP',
  2 => 'HTTP',
  3 => 'FTP',
  4 => 'SMTP',
), 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'VoIP']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-83'],
            ['major_id' => 'TT', 'question' => 'Codec yang digunakan untuk kompresi suara pada VoIP dengan kualitas tinggi dan bitrate rendah adalah?', 'options' => array (
  0 => 'G.711',
  1 => 'G.729',
  2 => 'G.726',
  3 => 'G.722',
  4 => 'G.718',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'VoIP']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-84'],
            ['major_id' => 'TT', 'question' => 'Pada protokol SIP, method yang digunakan untuk memulai panggilan baru disebut?', 'options' => array (
  0 => 'REGISTER',
  1 => 'INVITE',
  2 => 'BYE',
  3 => 'ACK',
  4 => 'CANCEL',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'VoIP']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-85'],
            ['major_id' => 'TT', 'question' => 'Fungsi utama dari PBX (Private Branch Exchange) dalam sistem VoIP adalah?', 'options' => array (
  0 => 'Mengatur routing panggilan antar ekstensi',
  1 => 'Menyimpan recording panggilan',
  2 => 'Mengirim email notifikasi',
  3 => 'Mengatur firewall jaringan',
  4 => 'Mengelola database pengguna',
), 'correct' => 0, 'difficulty' => 'intermediate', 'skill' => 'VoIP']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-86'],
            ['major_id' => 'TT', 'question' => 'Protokol yang digunakan untuk mentransfer media audio secara real-time setelah sesi panggilan SIP established disebut?', 'options' => array (
  0 => 'RTCP',
  1 => 'RTP',
  2 => 'SDP',
  3 => 'SIP',
  4 => 'TFTP',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'VoIP']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-87'],
            ['major_id' => 'TT', 'question' => 'Codec G.711 pada VoIP menghasilkan bitrate sebesar dan menggunakan teknik kompresi?', 'options' => array (
  0 => '64 Kbps dengan kompresi ADPCM',
  1 => '64 Kbps tanpa kompresi (PCM)',
  2 => '32 Kbps dengan kompresi ADPCM',
  3 => '8 Kbps dengan kompresi CS-ACELP',
  4 => '16 Kbps dengan kompresi LD-CELP',
), 'correct' => 1, 'difficulty' => 'advanced', 'skill' => 'VoIP']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-88'],
            ['major_id' => 'TT', 'question' => 'Perangkat yang mengubah sinyal analog dari telepon tradisional menjadi sinyal digital untuk jaringan VoIP IP disebut?', 'options' => array (
  0 => 'FXS Gateway',
  1 => 'FXO Gateway',
  2 => 'ATA (Analog Terminal Adapter)',
  3 => 'IP Phone',
  4 => 'Softphone',
), 'correct' => 2, 'difficulty' => 'advanced', 'skill' => 'VoIP']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-89'],
            ['major_id' => 'TT', 'question' => 'Quality of Service (QoS) pada VoIP sangat penting karena paket audio harus tiba dalam batas waktu yang ketat. Jika paket terlambat lebih dari 150ms, dampak yang terjadi adalah?', 'options' => array (
  0 => 'Koneksi terputus',
  1 => 'Munculnya delay yang terdengar dan jitter',
  2 => 'Kualitas video menurun',
  3 => 'Server menjadi lambat',
  4 => 'Bandwidth internet berkurang',
), 'correct' => 1, 'difficulty' => 'expert', 'skill' => 'VoIP']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-90'],
            ['major_id' => 'TT', 'question' => 'Pada VoIP, konsep SIP Trunk digunakan untuk menggantikan trunk tradisional (T1/E1) dengan cara?', 'options' => array (
  0 => 'Menghubungkan PBX ke PSTN melalui internet menggunakan protokol SIP',
  1 => 'Menghubungkan IP Phone langsung ke PSTN',
  2 => 'Membuat jalur dedicated melalui kabel fiber',
  3 => 'Menggunakan satellite link untuk panggilan internasional',
  4 => 'Menghubungkan dua PBX melalui jaringan telepon analog',
), 'correct' => 0, 'difficulty' => 'expert', 'skill' => 'VoIP']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-91'],
            ['major_id' => 'TT', 'question' => 'Jenis kamera CCTV yang paling umum digunakan untuk pemantauan indoor dengan gambar jernih dan harga terjangkau disebut?', 'options' => array (
  0 => 'PTZ Camera',
  1 => 'Box Camera',
  2 => 'Dome Camera',
  3 => 'Bullet Camera',
  4 => 'Thermal Camera',
), 'correct' => 2, 'difficulty' => 'basic', 'skill' => 'CCTV & Surveillance']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-92'],
            ['major_id' => 'TT', 'question' => 'Perangkat yang berfungsi merekam dan menyimpan video dari kamera CCTV secara terus-menerus disebut?', 'options' => array (
  0 => 'NVR (Network Video Recorder)',
  1 => 'DVR (Digital Video Recorder)',
  2 => 'Switch',
  3 => 'Router',
  4 => 'Modem',
), 'correct' => 1, 'difficulty' => 'basic', 'skill' => 'CCTV & Surveillance']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-93'],
            ['major_id' => 'TT', 'question' => 'Resolusi 1920x1080 pixel pada kamera CCTV disebut?', 'options' => array (
  0 => 'HD',
  1 => 'Full HD',
  2 => '4K',
  3 => 'QHD',
  4 => 'VGA',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'CCTV & Surveillance']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-94'],
            ['major_id' => 'TT', 'question' => 'Pada sistem CCTV IP, bandwidth yang dibutuhkan oleh satu kamera 4MP dengan kompresi H.264 streaming berkelanjutan umumnya berkisar?', 'options' => array (
  0 => '1-2 Mbps',
  1 => '4-8 Mbps',
  2 => '10-20 Mbps',
  3 => '50-100 Mbps',
  4 => '200-500 Mbps',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'CCTV & Surveillance']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-95'],
            ['major_id' => 'TT', 'question' => 'Kamera PTZ (Pan-Tilt-Zoom) berfungsi untuk?', 'options' => array (
  0 => 'Merekam audio di area surveilans',
  1 => 'Mengontrol gerakan kamera secara horizontal, vertikal, dan zoom',
  2 => 'Menyimpan video secara lokal',
  3 => 'Menghubungkan kamera ke internet',
  4 => 'Memberikan daya listrik ke kamera',
), 'correct' => 1, 'difficulty' => 'intermediate', 'skill' => 'CCTV & Surveillance']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-96'],
            ['major_id' => 'TT', 'question' => 'Pada CCTV IP, protokol yang digunakan untuk mengontrol dan mengoperasikan kamera PTZ dari jarak jauh disebut?', 'options' => array (
  0 => 'RTSP',
  1 => 'ONVIF',
  2 => 'CGI',
  3 => 'PACP',
  4 => 'IPFIX',
), 'correct' => 2, 'difficulty' => 'advanced', 'skill' => 'CCTV & Surveillance']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-97'],
            ['major_id' => 'TT', 'question' => 'Jenis kompresi video terbaru yang menghasilkan ukuran file lebih kecil dengan kualitas yang sama dibanding H.264 adalah?', 'options' => array (
  0 => 'MPEG-2',
  1 => 'MJPEG',
  2 => 'H.265/HEVC',
  3 => 'DivX',
  4 => 'WMV',
), 'correct' => 2, 'difficulty' => 'advanced', 'skill' => 'CCTV & Surveillance']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-98'],
            ['major_id' => 'TT', 'question' => 'Pada sistem surveilans modern, fitur yang memungkinkan kamera CCTV mendeteksi pergerakan objek manusia dan mengabaikan pergerakan lain seperti daun tertiup angin disebut?', 'options' => array (
  0 => 'Video Analytics - Motion Detection',
  1 => 'Video Analytics - Line Crossing Detection',
  2 => 'Video Analytics - Face Recognition',
  3 => 'Video Analytics - Object Classification',
  4 => 'Video Analytics - People Counting',
), 'correct' => 3, 'difficulty' => 'advanced', 'skill' => 'CCTV & Surveillance']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-99'],
            ['major_id' => 'TT', 'question' => 'Standar ONVIF pada sistem CCTV IP berfungsi untuk?', 'options' => array (
  0 => 'Mengatur keamanan wireless',
  1 => 'Memastikan kompatibilitas antara perangkat CCTV dari vendor berbeda',
  2 => 'Mengatur kualitas video',
  3 => 'Mengelola penyimpanan data',
  4 => 'Mengontrol akses fisik',
), 'correct' => 1, 'difficulty' => 'expert', 'skill' => 'CCTV & Surveillance']
        );
        AssessmentQuestion::updateOrCreate(
            ['id' => 'tt-100'],
            ['major_id' => 'TT', 'question' => 'Pada arsitektur Video Management System (VMS) berskala besar, konsep failover server berfungsi untuk?', 'options' => array (
  0 => 'Menyimpan backup video ke cloud',
  1 => 'Menggantikan server utama jika terjadi kegagalan untuk memastikan kontinuitas operasi',
  2 => 'Mengatur bandwidth jaringan',
  3 => 'Mengontrol akses pengguna',
  4 => 'Mengelola kamera secara terpusat',
), 'correct' => 1, 'difficulty' => 'expert', 'skill' => 'CCTV & Surveillance']
        );
    }
}
