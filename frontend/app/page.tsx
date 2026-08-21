import Navbar from "./components/layout/navbar";
import {
  Brain,
  Target,
  Map,
  Briefcase,
  ArrowRight,
  Users,
  Building2,
  Star,
  Zap,
  ChevronRight,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Know Yourself",
    description: "Asesmen skill interaktif untuk memetakan kemampuan teknis dan soft skill kamu secara akurat.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Target,
    title: "Know Your Path",
    description: "Career matching berbasis skill dengan analisis gap untuk menunjukkan jalan karier terbaikmu.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Map,
    title: "Build Your Future",
    description: "Roadmap belajar personal dan pembuatan portfolio otomatis untuk meningkatkan kesiapan kerja.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Briefcase,
    title: "Get Hired",
    description: "Smart job board yang mencocokkan skill kamu dengan peluang magang dan kerja yang relevan.",
    color: "from-emerald-500 to-teal-500",
  },
];

const stats = [
  { value: "248+", label: "Siswa Terdaftar", icon: Users },
  { value: "85%", label: "Match Rate", icon: Target },
  { value: "50+", label: "Lowongan Tersedia", icon: Building2 },
  { value: "95%", label: "User Satisfaction", icon: Star },
];

const steps = [
  { step: 1, title: "Isi Asesmen", description: "Jawab pertanyaan tentang skill yang kamu kuasai" },
  { step: 2, title: "Dapatkan Rekomendasi", description: "Sistem menganalisis dan memberikan rekomendasi karier" },
  { step: 3, title: "Ikuti Roadmap", description: "Belajar mengikuti jalur yang sudah disiapkan" },
  { step: 4, title: "Lamar Pekerjaan", description: "Gunakan portfolio untuk melamar posisi impian" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Career Readiness Platform</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Temukan{" "}
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Jalur Kariermu
                </span>
              </h1>
              <p className="text-lg text-muted max-w-lg">
                SkillMatch menjembatani kesenjangan kompetensi antara siswa SMK dan kebutuhan industri.
                Mulai dari asesmen skill hingga rekomendasi pekerjaan yang terpersonalisasi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/auth/register"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
                >
                  Mulai Asesmen Gratis
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Pelajari Lebih Lanjut
                </a>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
                <div className="relative bg-card rounded-3xl border border-border p-8 shadow-2xl">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground">Career Readiness Score</p>
                        <p className="text-xs text-muted">Mulai asesmen untuk melihat hasilmu</p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Star className="w-4 h-4 text-amber-500" />
                        <span className="text-sm font-semibold text-primary">Fitur Utama</span>
                      </div>
                      <p className="text-sm text-muted">
                        Kenali <strong>skill-mu</strong>, temukan <strong>karier yang tepat</strong>, dan raih impianmu!
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: "Asesmen", icon: "📋", color: "from-blue-500 to-cyan-500" },
                        { label: "Career Match", icon: "🎯", color: "from-purple-500 to-pink-500" },
                        { label: "Roadmap", icon: "🗺️", color: "from-emerald-500 to-teal-500" },
                      ].map((item) => (
                        <div key={item.label} className="rounded-xl p-3 text-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600">
                          <div className="text-2xl mb-1">{item.icon}</div>
                          <div className="text-xs text-foreground font-semibold">{item.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <div className="flex -space-x-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white" />
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white" />
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 border-2 border-white" />
                      </div>
                      <span className="text-xs text-muted"><strong>248+ siswa</strong> sudah bergabung</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-20 bg-white dark:bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Fitur Unggulan
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Empat modul utama yang dirancang untuk membantu kamu memahami diri sendiri,
              menemukan karier yang tepat, dan mempersiapkan diri untuk dunia kerja.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-primary to-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-8 h-8 text-white/80 mx-auto mb-3" />
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="about" className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Cara Kerja
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Empat langkah sederhana untuk memulai perjalanan karier kamu bersama SkillMatch.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.step} className="relative text-center">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(50%+2.5rem)] w-[calc(100%-3rem)] border-t-2 border-dashed border-primary/30" />
                )}
                <div className="relative z-10 w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">{step.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-12 sm:py-20 bg-white dark:bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="text-2xl sm:text-3xl font-semibold text-foreground leading-relaxed mb-8">
            &ldquo;SkillMatch berkomitmen untuk menciptakan masa depan di mana setiap siswa vokasi memiliki kesempatan
            yang setara dalam mengakses peluang kerja yang layak dan berkualitas.&rdquo;
          </blockquote>
          <p className="text-muted max-w-2xl mx-auto">
            Platform ini dirancang untuk menjembatani kesenjangan antara pendidikan vokasi dan kebutuhan industri,
            sehingga mengurangi pengangguran terdidik dan meningkatkan daya saing tenaga kerja Indonesia.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-primary via-primary-dark to-secondary rounded-3xl p-6 sm:p-10 lg:p-12 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Siap Memulai Perjalanan Kariermu?
              </h2>
              <p className="text-white/80 mb-8 max-w-lg mx-auto">
                Daftar sekarang dan temukan potensi terbaikmu. Gratis untuk semua siswa SMK!
              </p>
              <a
                href="/auth/register"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-100 transition-colors shadow-lg"
              >
                Daftar Sekarang - Gratis
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  SkillMatch
                </span>
              </div>
              <p className="text-sm text-muted">
                Career Readiness Platform untuk siswa vokasi Indonesia.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Fitur</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li><a href="#features" className="hover:text-primary transition-colors">Know Yourself</a></li>
                <li><a href="#features" className="hover:text-primary transition-colors">Know Your Path</a></li>
                <li><a href="#features" className="hover:text-primary transition-colors">Build Your Future</a></li>
                <li><a href="#features" className="hover:text-primary transition-colors">Get Hired</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Tentang</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li><a href="#about" className="hover:text-primary transition-colors">Cara Kerja</a></li>
                <li><a href="#impact" className="hover:text-primary transition-colors">Dampak</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Tim Kami</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Kontak</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li>info@skillmatch.id</li>
                <li>Jakarta, Indonesia</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}