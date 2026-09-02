<?php

namespace Database\Seeders;

use App\Models\Job;
use App\Models\Industry;
use App\Models\Student;
use App\Models\Skill;
use App\Repositories\JobRepository;
use Illuminate\Database\Seeder;

class JobSeeder extends Seeder
{
    public function __construct(
        private JobRepository $jobs,
    ) {}

    public function run(): void
    {
        $industries = Industry::all();
        if ($industries->isEmpty()) {
            return;
        }

        $students = Student::all();
        $approvedIndustries = $industries->where('status', 'approved')->values();

        if ($approvedIndustries->isEmpty()) {
            $approvedIndustries = $industries;
        }

        $jobs = [
            ['title' => 'Junior Fullstack Developer', 'type' => 'fulltime', 'location' => 'Jakarta', 'description' => 'Mengembangkan fitur frontend dan backend aplikasi web menggunakan React dan Node.js.', 'salary' => 'Rp 6.000.000 - 8.000.000'],
            ['title' => 'Frontend Developer Intern', 'type' => 'magang', 'location' => 'Remote', 'description' => 'Magang membangun komponen UI responsif dengan React/Next.js.', 'salary' => 'Rp 1.500.000'],
            ['title' => 'Backend Engineer', 'type' => 'fulltime', 'location' => 'Bandung', 'description' => 'Membangun REST API dan microservices menggunakan Node.js/Express.', 'salary' => 'Rp 8.000.000 - 10.000.000'],
            ['title' => 'UI/UX Designer', 'type' => 'fulltime', 'location' => 'Jakarta', 'description' => 'Merancang antarmuka produk digital dengan Figma.', 'salary' => 'Rp 7.000.000 - 9.000.000'],
            ['title' => 'Graphic Designer Freelance', 'type' => 'freelance', 'location' => 'Remote', 'description' => 'Membuat visual branding dan social media content.', 'salary' => 'Rp 2.000.000 - 3.000.000'],
            ['title' => 'Network Administrator', 'type' => 'fulltime', 'location' => 'Surabaya', 'description' => 'Mengelola dan memelihara jaringan perusahaan (Cisco, MikroTik).', 'salary' => 'Rp 6.500.000 - 8.000.000'],
            ['title' => 'IT Support Specialist', 'type' => 'fulltime', 'location' => 'Jakarta', 'description' => 'Troubleshooting hardware, software, dan dukungan pengguna.', 'salary' => 'Rp 4.500.000 - 5.500.000'],
            ['title' => 'Cloud Engineer', 'type' => 'parttime', 'location' => 'Remote', 'description' => 'Mengelola infrastruktur cloud AWS/GCP dan deployment.', 'salary' => 'Rp 5.000.000 - 6.500.000'],
            ['title' => 'Cybersecurity Analyst', 'type' => 'fulltime', 'location' => 'Yogyakarta', 'description' => 'Memantau keamanan sistem dan melakukan penilaian kerentanan.', 'salary' => 'Rp 8.500.000 - 11.000.000'],
            ['title' => 'Telecom Technician', 'type' => 'fulltime', 'location' => 'Surabaya', 'description' => 'Instalasi dan maintenance sistem telekomunikasi dan fiber optic.', 'salary' => 'Rp 5.000.000 - 6.000.000'],
            ['title' => 'Product Designer', 'type' => 'fulltime', 'location' => 'Jakarta', 'description' => 'Mendesain produk digital dari riset hingga prototype.', 'salary' => 'Rp 9.000.000 - 12.000.000'],
            ['title' => 'Data Analyst', 'type' => 'fulltime', 'location' => 'Jakarta', 'description' => 'Menganalisis data bisnis dan membuat laporan visualisasi.', 'salary' => 'Rp 7.500.000 - 9.500.000'],
        ];

        $jobSkills = [
            'Junior Fullstack Developer' => ['React/Next.js', 'Node.js', 'TypeScript', 'SQL/Database'],
            'Frontend Developer Intern' => ['React/Next.js', 'TypeScript', 'HTML/CSS', 'JavaScript'],
            'Backend Engineer' => ['Node.js', 'Express.js', 'SQL/Database', 'REST API'],
            'UI/UX Designer' => ['Figma', 'UI/UX Design', 'Adobe Photoshop'],
            'Graphic Designer Freelance' => ['Adobe Photoshop', 'Adobe Illustrator', 'UI/UX Design'],
            'Network Administrator' => ['Networking', 'Cisco Networking', 'MikroTik', 'TCP/IP'],
            'IT Support Specialist' => ['Networking', 'Linux Administration', 'Windows Server'],
            'Cloud Engineer' => ['Cloud (AWS/GCP)', 'Docker', 'Linux Administration'],
            'Cybersecurity Analyst' => ['Cybersecurity Basics', 'Linux Administration', 'Networking'],
            'Telecom Technician' => ['Fiber Optics', 'Networking Basics', 'Radio Frequency'],
            'Product Designer' => ['Figma', 'UI/UX Design', 'Adobe Photoshop'],
            'Data Analyst' => ['SQL/Database', 'Python', 'REST API'],
        ];

        $count = 0;
        foreach ($jobs as $i => $jobData) {
            if ($count >= 30) {
                break;
            }

            $industry = $approvedIndustries[$i % count($approvedIndustries)];

            $job = Job::create([
                'industry_id' => $industry->id,
                'title' => $jobData['title'],
                'type' => $jobData['type'],
                'location' => $jobData['location'],
                'description' => $jobData['description'],
                'match_percentage' => 0,
                'posted_at' => now()->subDays(rand(1, 60)),
                'deadline' => now()->addDays(rand(15, 90))->toDateString(),
                'salary' => $jobData['salary'],
            ]);

            $this->jobs->syncSkills($job, $jobSkills[$jobData['title']] ?? []);
            $count++;
        }

        // Seed a few job applications (history) across students & jobs.
        $jobsCreated = Job::with('industry')->get();
        if ($jobsCreated->isEmpty() || $students->isEmpty()) {
            return;
        }

        $statuses = ['pending', 'accepted', 'rejected'];
        $appCount = 0;
        foreach ($students as $student) {
            $n = rand(1, 3);
            $usedJobs = [];
            for ($i = 0; $i < $n && $appCount < 30; $i++) {
                $job = $jobsCreated->random();
                if (isset($usedJobs[$job->id])) {
                    continue;
                }
                $usedJobs[$job->id] = true;
                $appCount++;
                \App\Models\JobApplication::create([
                    'job_id' => $job->id,
                    'student_id' => $student->id,
                    'status' => $statuses[array_rand($statuses)],
                    'applied_at' => now()->subDays(rand(1, 40)),
                ]);
            }
        }
    }
}