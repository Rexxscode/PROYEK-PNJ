<?php

namespace Database\Seeders;

use App\Models\Major;
use App\Models\RoadmapMilestone;
use App\Models\RoadmapResource;
use Illuminate\Database\Seeder;

class RoadmapSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedRoadmapForMajor('Rekayasa Perangkat Lunak', 'RPL', 'rpl');
        $this->seedRoadmapForMajor('Desain Komunikasi Visual', 'DKV', 'dkv');
        $this->seedRoadmapForMajor('Teknik Komputer dan Jaringan', 'TKJ', 'tkj');
        $this->seedRoadmapForMajor('Teknik Transmisi', 'TT', 'tt');
    }

    private function seedRoadmapForMajor(string $majorName, string $majorShortCode, string $majorIdPrefix): void
    {
        $major = Major::where('short_code', $majorShortCode)->first();

        if (!$major) {
            return;
        }

        $majorId = $major->short_code;

        $levels = [
            'fundamental' => $this->getFundamentalMilestones($majorIdPrefix),
            'intermediate' => $this->getIntermediateMilestones($majorIdPrefix),
            'advanced' => $this->getAdvancedMilestones($majorIdPrefix),
        ];

        foreach ($levels as $level => $milestones) {
            foreach ($milestones as $ms) {
                RoadmapMilestone::updateOrCreate(
                    ['id' => $ms['id']],
                    [
                        'title' => $ms['title'],
                        'description' => $ms['description'],
                        'level' => $ms['level'],
                        'estimated_hours' => $ms['estimatedHours'],
                        'major_id' => $majorId,
                    ]
                );

                foreach ($ms['resources'] as $resource) {
                    RoadmapResource::updateOrCreate(
                        ['milestone_id' => $ms['id'], 'title' => $resource['title']],
                        [
                            'url' => $resource['url'],
                            'type' => $resource['type'],
                        ]
                    );
                }
            }
        }
    }

    private function getFundamentalMilestones(string $majorIdPrefix): array
    {
        if ($majorIdPrefix === 'rpl') {
            return [
                ['id' => 'rpl-f1', 'title' => 'HTML & CSS Fundamental', 'description' => 'Pelajari struktur markup HTML dan styling CSS dari nol. Pahami selector, box model, flexbox, dan responsive design.', 'status' => 'available', 'skills' => ['HTML/CSS'], 'estimatedHours' => 20, 'level' => 'fundamental', 'resources' => [
                    ['title' => 'MDN Web Docs: HTML Basics', 'url' => 'https://developer.mozilla.org/en-US/docs/Learn/HTML', 'type' => 'article'],
                    ['title' => 'W3Schools: CSS Tutorial Lengkap', 'url' => 'https://www.w3schools.com/css/', 'type' => 'article'],
                    ['title' => 'CSS Flexbox Crash Course', 'url' => 'https://www.youtube.com/watch?v=fYq5PXgSsbE', 'type' => 'video'],
                    ['title' => 'HTML & CSS Full Course (freeCodeCamp)', 'url' => 'https://www.youtube.com/watch?v=qz0aGYrrlhU', 'type' => 'video'],
                    ['title' => 'freeCodeCamp: Responsive Web Design', 'url' => 'https://www.freecodecamp.org/learn/2022/responsive-web-design/', 'type' => 'course'],
                    ['title' => 'Coursera: Web Design for Everybody', 'url' => 'https://www.coursera.org/specializations/web-design', 'type' => 'course'],
                    ['title' => 'Build a Landing Page with HTML/CSS', 'url' => 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Create_a_html_layout', 'type' => 'practice'],
                    ['title' => 'Build a Portfolio Website', 'url' => 'https://www.frontendmentor.io/challenges', 'type' => 'practice'],
                ]],
                ['id' => 'rpl-f2', 'title' => 'JavaScript Dasar', 'description' => 'Kuasai variabel, tipe data, fungsi, array, object, conditional, loop, dan DOM manipulation.', 'status' => 'locked', 'skills' => ['JavaScript'], 'estimatedHours' => 25, 'level' => 'fundamental', 'resources' => [
                    ['title' => 'JavaScript.info: The Modern Tutorial', 'url' => 'https://javascript.info/', 'type' => 'article'],
                    ['title' => 'MDN: JavaScript Guide', 'url' => 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide', 'type' => 'article'],
                    ['title' => 'JavaScript Crash Course for Beginners', 'url' => 'https://www.youtube.com/watch?v=hdI2bqOjy3c', 'type' => 'video'],
                    ['title' => 'JavaScript Full Course (SuperSimpleDev)', 'url' => 'https://www.youtube.com/watch?v=SBmABt2qD2k', 'type' => 'video'],
                    ['title' => 'The Odin Project: JS Fundamentals', 'url' => 'https://www.theodinproject.com/paths/foundations/courses/foundations', 'type' => 'course'],
                    ['title' => 'Coursera: Programming with JavaScript', 'url' => 'https://www.coursera.org/learn/programming-with-javascript', 'type' => 'course'],
                    ['title' => 'Build a Calculator App', 'url' => 'https://javascript.info/task/calculator', 'type' => 'practice'],
                    ['title' => 'Build a Todo List with Vanilla JS', 'url' => 'https://javascript.info/task/article-behind-the-scene/confirmation', 'type' => 'practice'],
                ]],
                ['id' => 'rpl-f3', 'title' => 'Version Control dengan Git', 'description' => 'Pelajari branch, commit, merge, pull request, dan workflow Git untuk kolaborasi tim.', 'status' => 'locked', 'skills' => ['Git'], 'estimatedHours' => 10, 'level' => 'fundamental', 'resources' => [
                    ['title' => 'Pro Git Book (Free)', 'url' => 'https://git-scm.com/book/en/v2', 'type' => 'article'],
                    ['title' => 'Atlassian: Git Tutorial', 'url' => 'https://www.atlassian.com/git/tutorials', 'type' => 'article'],
                    ['title' => 'Git & GitHub Crash Course', 'url' => 'https://www.youtube.com/watch?v=SWYqp7iY_Tc', 'type' => 'video'],
                    ['title' => 'Git for Professionals (freeCodeCamp)', 'url' => 'https://www.youtube.com/watch?v=UscaqWoUWH0', 'type' => 'video'],
                    ['title' => 'GitHub Learning Lab', 'url' => 'https://lab.github.com/', 'type' => 'course'],
                    ['title' => 'Udacity: Version Control with Git', 'url' => 'https://www.udacity.com/course/version-control-with-git--ud123', 'type' => 'course'],
                    ['title' => 'Create a Repo & Make 5 Commits', 'url' => 'https://github.com/new', 'type' => 'practice'],
                    ['title' => 'Fork a Repo & Open a Pull Request', 'url' => 'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request', 'type' => 'practice'],
                ]],
                ['id' => 'rpl-f4', 'title' => 'Node.js & npm Fundamental', 'description' => 'Kenali runtime JavaScript di server, package manager npm, dan membuat REST API sederhana.', 'status' => 'locked', 'skills' => ['Node.js'], 'estimatedHours' => 15, 'level' => 'fundamental', 'resources' => [
                    ['title' => 'Node.js Official Docs', 'url' => 'https://nodejs.org/en/docs/', 'type' => 'article'],
                    ['title' => 'W3Schools: Node.js Tutorial', 'url' => 'https://www.w3schools.com/nodejs/', 'type' => 'article'],
                    ['title' => 'Node.js Crash Course', 'url' => 'https://www.youtube.com/watch?v=fBNz5xF-Kx4', 'type' => 'video'],
                    ['title' => 'Node.js Full Course (Bro Code)', 'url' => 'https://www.youtube.com/watch?v=f2EqmEfI7XI', 'type' => 'video'],
                    ['title' => 'Node.js Intro (The Odin Project)', 'url' => 'https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs', 'type' => 'course'],
                    ['title' => 'Udemy: Node.js for Beginners', 'url' => 'https://www.udemy.com/course/nodejs-the-complete-guide/', 'type' => 'course'],
                    ['title' => 'Build a Simple REST API', 'url' => 'https://expressjs.com/en/starter/hello-world.html', 'type' => 'practice'],
                    ['title' => 'Build a File Upload Server', 'url' => 'https://nodejs.org/en/learn/getting-started/drag-and-drop', 'type' => 'practice'],
                ]],
            ];
        }

        if ($majorIdPrefix === 'dkv') {
            return [
                ['id' => 'dkv-f1', 'title' => 'Color Theory & Typography', 'description' => 'Pelajari dasar-dasar warna, harmoni warna, dan tipografi yang efektif untuk desain.', 'status' => 'available', 'skills' => ['Color Theory', 'Typography'], 'estimatedHours' => 15, 'level' => 'fundamental', 'resources' => [
                    ['title' => 'Color Theory for Designers', 'url' => 'https://www.canva.com/learn/color-theory/', 'type' => 'article'],
                    ['title' => 'Color Theory Explained', 'url' => 'https://www.youtube.com/watch?v=Qj1K8QraAXY', 'type' => 'video'],
                    ['title' => 'Canva Design School', 'url' => 'https://www.canva.com/designschool/', 'type' => 'course'],
                    ['title' => 'Buat Color Palette Sendiri', 'url' => 'https://coolors.co/', 'type' => 'practice'],
                ]],
                ['id' => 'dkv-f2', 'title' => 'Adobe Photoshop Fundamental', 'description' => 'Kuasai tools dasar Photoshop: selection, layers, masking, retouching, dan export.', 'status' => 'locked', 'skills' => ['Adobe Photoshop', 'Image Editing'], 'estimatedHours' => 20, 'level' => 'fundamental', 'resources' => [
                    ['title' => 'Adobe Photoshop Tutorials', 'url' => 'https://helpx.adobe.com/photoshop/tutorials.html', 'type' => 'article'],
                    ['title' => 'Photoshop in 30 Minutes', 'url' => 'https://www.youtube.com/watch?v=IeGtiDdY1BE', 'type' => 'video'],
                    ['title' => 'Phlearn Photoshop 101', 'url' => 'https://phlearn.com/tutorial/photoshop-basics/', 'type' => 'course'],
                    ['title' => 'Edit & Retouch a Photo', 'url' => 'https://helpx.adobe.com/photoshop/tutorials.html', 'type' => 'practice'],
                ]],
                ['id' => 'dkv-f3', 'title' => 'Adobe Illustrator Dasar', 'description' => 'Belajar membuat vektor, logo, dan illustration menggunakan path, shape builder, dan pen tool.', 'status' => 'locked', 'skills' => ['Adobe Illustrator', 'Vector'], 'estimatedHours' => 18, 'level' => 'fundamental', 'resources' => [
                    ['title' => 'Illustrator Getting Started', 'url' => 'https://helpx.adobe.com/illustrator/get-started.html', 'type' => 'article'],
                    ['title' => 'Illustrator for Beginners', 'url' => 'https://www.youtube.com/watch?v=IZhGIEF-eHg', 'type' => 'video'],
                    ['title' => 'Tuts+ Illustrator Tutorials', 'url' => 'https://design.tutsplus.com/categories/illustrator', 'type' => 'course'],
                    ['title' => 'Design a Simple Logo', 'url' => 'https://helpx.adobe.com/illustrator/get-started.html', 'type' => 'practice'],
                ]],
                ['id' => 'dkv-f4', 'title' => 'Layout & Composition Principles', 'description' => 'Pelajari prinsip desain: alignment, contrast, repetition, proximity, hierarchy, dan balance.', 'status' => 'locked', 'skills' => ['Layout', 'Design Principles'], 'estimatedHours' => 12, 'level' => 'fundamental', 'resources' => [
                    ['title' => 'The Principles of Design', 'url' => 'https://www.interaction-design.org/literature/article/the-principles-of-design', 'type' => 'article'],
                    ['title' => 'Design Principles Crash Course', 'url' => 'https://www.youtube.com/watch?v=KkQX6VmT7bY', 'type' => 'video'],
                    ['title' => 'Coursera: Fundamentals of Graphic Design', 'url' => 'https://www.coursera.org/learn/fundamentals-of-graphic-design', 'type' => 'course'],
                    ['title' => 'Recreate a Magazine Layout', 'url' => 'https://www.canva.com/', 'type' => 'practice'],
                ]],
            ];
        }

        if ($majorIdPrefix === 'tkj') {
            return [
                ['id' => 'tkj-f1', 'title' => 'Networking Fundamental', 'description' => 'Pelajari model OSI, TCP/IP, subnetting, IP addressing, dan konsep dasar jaringan.', 'status' => 'available', 'skills' => ['Networking'], 'estimatedHours' => 20, 'level' => 'fundamental', 'resources' => [
                    ['title' => 'Cisco Networking Academy', 'url' => 'https://www.netacad.com/', 'type' => 'article'],
                    ['title' => 'Networking Fundamentals', 'url' => 'https://www.youtube.com/watch?v=qiQR5rda7zk', 'type' => 'video'],
                    ['title' => 'CCNA Full Course', 'url' => 'https://www.netacad.com/courses/ccna', 'type' => 'course'],
                    ['title' => 'Setup Home Network Lab', 'url' => 'https://www.netacad.com/', 'type' => 'practice'],
                ]],
                ['id' => 'tkj-f2', 'title' => 'Linux Administration Dasar', 'description' => 'Kuasai command line, file system, permissions, user management, dan service management di Linux.', 'status' => 'locked', 'skills' => ['Linux Administration'], 'estimatedHours' => 25, 'level' => 'fundamental', 'resources' => [
                    ['title' => 'Linux Journey', 'url' => 'https://linuxjourney.com/', 'type' => 'article'],
                    ['title' => 'Linux for Beginners', 'url' => 'https://www.youtube.com/watch?v=sWbUDq4S6Y8', 'type' => 'video'],
                    ['title' => 'Linux Essentials (NDG)', 'url' => 'https://www.netacad.com/courses/os-it/ndg-linux-essentials', 'type' => 'course'],
                    ['title' => 'Install Ubuntu & Complete 10 Tasks', 'url' => 'https://ubuntu.com/download', 'type' => 'practice'],
                ]],
                ['id' => 'tkj-f3', 'title' => 'Cisco Router & Switch Basic', 'description' => 'Konfigurasi dasar router dan switch Cisco: CLI, VLAN, IP addressing, dan ping test.', 'status' => 'locked', 'skills' => ['Cisco Networking'], 'estimatedHours' => 20, 'level' => 'fundamental', 'resources' => [
                    ['title' => 'Cisco IOS Commands', 'url' => 'https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst_command_reference/command_ref/b_book.html', 'type' => 'article'],
                    ['title' => 'Cisco Packet Tracer Lab', 'url' => 'https://www.youtube.com/watch?v=HX5h5bH6tSg', 'type' => 'video'],
                    ['title' => 'Cisco Packet Tracer Labs', 'url' => 'https://skillsforall.com/course/getting-started-cisco-packet-tracer', 'type' => 'course'],
                    ['title' => 'Build a 3-Switch Network', 'url' => 'https://www.netacad.com/', 'type' => 'practice'],
                ]],
                ['id' => 'tkj-f4', 'title' => 'MikroTik RouterOS Basic', 'description' => 'Pelajari konfigurasi MikroTik: IP, firewall, NAT, DHCP server, dan wireless.', 'status' => 'locked', 'skills' => ['MikroTik'], 'estimatedHours' => 18, 'level' => 'fundamental', 'resources' => [
                    ['title' => 'MikroTik Wiki', 'url' => 'https://wiki.mikrotik.com/wiki/Manual:Table_of_contents', 'type' => 'article'],
                    ['title' => 'MikroTik Beginner Tutorial', 'url' => 'https://www.youtube.com/watch?v=aQMxZmVGDqQ', 'type' => 'video'],
                    ['title' => 'MikroTik Training', 'url' => 'https://mikrotik.com/training', 'type' => 'course'],
                    ['title' => 'Setup Hotspot with MikroTik', 'url' => 'https://mikrotik.com/products', 'type' => 'practice'],
                ]],
            ];
        }

        if ($majorIdPrefix === 'tt') {
            return [
                ['id' => 'tt-f1', 'title' => 'Telecom Fundamental & Signal Theory', 'description' => 'Pelajari konsep dasar sinyal analog/digital, frekuensi, bandwidth, dan modulasi.', 'status' => 'available', 'skills' => ['Networking Basics'], 'estimatedHours' => 20, 'level' => 'fundamental', 'resources' => [
                    ['title' => 'Data Communication Basics', 'url' => 'https://www.tutorialspoint.com/data_communication_computer_network/', 'type' => 'article'],
                    ['title' => 'Communication Systems Course', 'url' => 'https://www.youtube.com/watch?v=8e4Sf6rL3zk', 'type' => 'video'],
                    ['title' => 'MIT OCW: Signals & Systems', 'url' => 'https://ocw.mit.edu/courses/res-6-007-signals-and-systems-spring-2011/', 'type' => 'course'],
                    ['title' => 'Lab: Analisis Spektrum Sinyal', 'url' => 'https://octave-online.net/', 'type' => 'practice'],
                ]],
                ['id' => 'tt-f2', 'title' => 'Fiber Optic Fundamentals', 'description' => 'Pelajari struktur kabel fiber, jenis (SMF/MMF), princip kerja, dan keuntungan vs kabel tembaga.', 'status' => 'locked', 'skills' => ['Fiber Optics'], 'estimatedHours' => 18, 'level' => 'fundamental', 'resources' => [
                    ['title' => 'Fiber Optic Basics (Corning)', 'url' => 'https://www.corning.com/worldwide/en/products/communications/cables/fundamentals-of-fiber-optics.html', 'type' => 'article'],
                    ['title' => 'Fiber Optic Explained', 'url' => 'https://www.youtube.com/watch?v=zAVsTubdd_Q', 'type' => 'video'],
                    ['title' => 'FOA Fiber Optic Association', 'url' => 'https://foa.org/', 'type' => 'course'],
                    ['title' => 'Identifikasi Jenis Kabel FO', 'url' => 'https://foa.org/', 'type' => 'practice'],
                ]],
                ['id' => 'tt-f3', 'title' => 'Radio Frequency (RF) Basic', 'description' => 'Pelajari konsep RF: frekuensi, gelombang, antena, dan propagasi sinyal radio.', 'status' => 'locked', 'skills' => ['Radio Frequency'], 'estimatedHours' => 18, 'level' => 'fundamental', 'resources' => [
                    ['title' => 'RF Basics', 'url' => 'https://www.everythingrf.com/community/radio-frequency-rf-basics', 'type' => 'article'],
                    ['title' => 'RF Engineering Crash Course', 'url' => 'https://www.youtube.com/watch?v=Rvti1TYI5NE', 'type' => 'video'],
                    ['title' => 'MIT OCW: Circuits & Electronics', 'url' => 'https://ocw.mit.edu/courses/6-002-circuits-and-electronics-spring-2007/', 'type' => 'course'],
                    ['title' => 'Analisis Spesifikasi Antena', 'url' => 'https://www.everythingrf.com/', 'type' => 'practice'],
                ]],
                ['id' => 'tt-f4', 'title' => 'Network Engineering Basic', 'description' => 'Pelajari konsep jaringan transmisi: OSI model, TCP/IP, dan protokol dasar telekomunikasi.', 'status' => 'locked', 'skills' => ['Networking Basics'], 'estimatedHours' => 15, 'level' => 'fundamental', 'resources' => [
                    ['title' => 'Telecom Network Overview', 'url' => 'https://en.wikipedia.org/wiki/Telecommunications_network', 'type' => 'article'],
                    ['title' => 'Telecom Networking 101', 'url' => 'https://www.youtube.com/watch?v=qiQR5rda7zk', 'type' => 'video'],
                    ['title' => 'Cisco Networking Academy', 'url' => 'https://www.netacad.com/', 'type' => 'course'],
                    ['title' => 'Build a Simple Network Diagram', 'url' => 'https://app.diagrams.net/', 'type' => 'practice'],
                ]],
            ];
        }

        return [];
    }

    private function getIntermediateMilestones(string $majorIdPrefix): array
    {
        if ($majorIdPrefix === 'rpl') {
            return [
                ['id' => 'rpl-i1', 'title' => 'React & Component Architecture', 'description' => 'Pelajari komponen, props, state, hooks, dan lifecycle dalam React.', 'status' => 'available', 'skills' => ['React/Next.js'], 'estimatedHours' => 30, 'level' => 'intermediate', 'resources' => [
                    ['title' => 'React Official Tutorial', 'url' => 'https://react.dev/learn', 'type' => 'article'],
                    ['title' => 'MDN: React Tutorial', 'url' => 'https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_tools_frameworks/React_getting_started', 'type' => 'article'],
                    ['title' => 'React Full Course for Free', 'url' => 'https://www.youtube.com/watch?v=bMknfKXIFA8', 'type' => 'video'],
                    ['title' => 'React Tutorial for Beginners ( Programming with Mosh)', 'url' => 'https://www.youtube.com/watch?v=LDB4uaJ87e0', 'type' => 'video'],
                    ['title' => 'Scrimba: Learn React', 'url' => 'https://scrimba.com/learn/learnreact', 'type' => 'course'],
                    ['title' => 'Coursera: Meta Front-End Developer (React)', 'url' => 'https://www.coursera.org/professional-certificates/meta-front-end-developer', 'type' => 'course'],
                    ['title' => 'Build a Todo App with React', 'url' => 'https://react.dev/learn/thinking-in-react', 'type' => 'practice'],
                    ['title' => 'Build a Weather App with React API', 'url' => 'https://react.dev/learn/synchronizing-with-effects', 'type' => 'practice'],
                ]],
                ['id' => 'rpl-i2', 'title' => 'REST API & Backend Development', 'description' => 'Bangun API RESTful dengan Express.js, pelajari routing, middleware, error handling, dan autentikasi.', 'status' => 'locked', 'skills' => ['Express.js', 'REST API'], 'estimatedHours' => 25, 'level' => 'intermediate', 'resources' => [
                    ['title' => 'Express.js Guide', 'url' => 'https://expressjs.com/guide/routing.html', 'type' => 'article'],
                    ['title' => 'MDN: Express Tutorial', 'url' => 'https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs', 'type' => 'article'],
                    ['title' => 'Build a REST API with Node.js & Express', 'url' => 'https://www.youtube.com/watch?v=CnH3kAXSFBc', 'type' => 'video'],
                    ['title' => 'Express.js Crash Course (Traversia Media)', 'url' => 'https://www.youtube.com/watch?v=CnH3kAXSFBc', 'type' => 'video'],
                    ['title' => 'Udemy: RESTful API with Node.js', 'url' => 'https://www.udemy.com/course/nodejs-the-complete-guide/', 'type' => 'course'],
                    ['title' => 'freeCodeCamp: APIs and Microservices', 'url' => 'https://www.freecodecamp.org/learn/back-end-development-and-apis/', 'type' => 'course'],
                    ['title' => 'Build a CRUD API', 'url' => 'https://expressjs.com/en/starter/hello-world.html', 'type' => 'practice'],
                    ['title' => 'Build an Auth API with JWT', 'url' => 'https://expressjs.com/en/advanced/best-practice-security.html', 'type' => 'practice'],
                ]],
                ['id' => 'rpl-i3', 'title' => 'Database SQL & ORM', 'description' => 'Pelajari desain database, SQL queries, relasi, dan ORM seperti Prisma atau Sequelize.', 'status' => 'locked', 'skills' => ['SQL/Database'], 'estimatedHours' => 20, 'level' => 'intermediate', 'resources' => [
                    ['title' => 'SQLBolt Interactive Tutorial', 'url' => 'https://sqlbolt.com/', 'type' => 'article'],
                    ['title' => 'Mode: SQL Tutorial', 'url' => 'https://mode.com/sql-tutorial/', 'type' => 'article'],
                    ['title' => 'Database Design Course', 'url' => 'https://www.youtube.com/watch?v=ztHopE5Wnpc', 'type' => 'video'],
                    ['title' => 'SQL Full Course (freeCodeCamp)', 'url' => 'https://www.youtube.com/watch?v=HXV3zeQKqGY', 'type' => 'video'],
                    ['title' => 'Prisma Docs', 'url' => 'https://www.prisma.io/docs/getting-started', 'type' => 'course'],
                    ['title' => 'PostgreSQL Tutorial', 'url' => 'https://www.postgresqltutorial.com/', 'type' => 'course'],
                    ['title' => 'Design & Query a Library DB', 'url' => 'https://sqlbolt.com/', 'type' => 'practice'],
                    ['title' => 'Build a Blog Database Schema', 'url' => 'https://dbdiagram.io/', 'type' => 'practice'],
                ]],
                ['id' => 'rpl-i4', 'title' => 'Linux & Command Line Basics', 'description' => 'Pelajari dasar-dasar Linux: command line, file system, permissions, dan shell scripting.', 'status' => 'locked', 'skills' => ['Linux Basics'], 'estimatedHours' => 15, 'level' => 'intermediate', 'resources' => [
                    ['title' => 'Linux Journey', 'url' => 'https://linuxjourney.com/', 'type' => 'article'],
                    ['title' => 'Linuxcommand.org Tutorial', 'url' => 'https://linuxcommand.org/lc3_lts0010.php', 'type' => 'article'],
                    ['title' => 'Linux Command Line Crash Course', 'url' => 'https://www.youtube.com/watch?v=sWbUDq4S6Y8', 'type' => 'video'],
                    ['title' => 'Linux Full Course (freeCodeCamp)', 'url' => 'https://www.youtube.com/watch?v=sWbUDq4S6Y8', 'type' => 'video'],
                    ['title' => 'Linux Essentials (NDG)', 'url' => 'https://www.netacad.com/courses/os-it/ndg-linux-essentials', 'type' => 'course'],
                    ['title' => 'KodeKloud: Linux Basics', 'url' => 'https://kodekloud.com/courses/linux-basics/', 'type' => 'course'],
                    ['title' => 'Complete 10 Linux Tasks', 'url' => 'https://linuxjourney.com/', 'type' => 'practice'],
                    ['title' => 'Build a Shell Script Automation', 'url' => 'https://linuxcommand.org/lc3_lts0020.php', 'type' => 'practice'],
                ]],
            ];
        }

        if ($majorIdPrefix === 'dkv') {
            return [
                ['id' => 'dkv-i1', 'title' => 'UI/UX Design & User Research', 'description' => 'Pelajari user persona, journey map, wireframing, dan prototyping untuk design yang user-centric.', 'status' => 'available', 'skills' => ['UI/UX', 'User Research', 'Wireframing'], 'estimatedHours' => 25, 'level' => 'intermediate', 'resources' => [
                    ['title' => 'Google UX Design Certificate', 'url' => 'https://www.coursera.org/professional-certificates/google-ux-design', 'type' => 'article'],
                    ['title' => 'UX Design Full Course', 'url' => 'https://www.youtube.com/watch?v=wIuVvCuiJhU', 'type' => 'video'],
                    ['title' => 'Coursera: UX Design Professional Certificate', 'url' => 'https://www.coursera.org/professional-certificates/google-ux-design', 'type' => 'course'],
                    ['title' => 'Buat Wireframe untuk App', 'url' => 'https://www.figma.com/', 'type' => 'practice'],
                ]],
                ['id' => 'dkv-i2', 'title' => 'Figma Intermediate: Components & Auto Layout', 'description' => 'Bangun design system dengan komponen reusable, auto layout, dan variabel di Figma.', 'status' => 'locked', 'skills' => ['Figma', 'Components', 'Auto Layout'], 'estimatedHours' => 20, 'level' => 'intermediate', 'resources' => [
                    ['title' => 'Figma Official Blog', 'url' => 'https://www.figma.com/blog/', 'type' => 'article'],
                    ['title' => 'Figma Intermediate Tutorial', 'url' => 'https://www.youtube.com/watch?v=FTFaQWZBqQ8', 'type' => 'video'],
                    ['title' => 'Figma Academy', 'url' => 'https://www.figma.com/resources/learn-design/', 'type' => 'course'],
                    ['title' => 'Build a Mini Design System', 'url' => 'https://www.figma.com/', 'type' => 'practice'],
                ]],
                ['id' => 'dkv-i3', 'title' => 'Motion Graphics & Video Editing', 'description' => 'Buat animasi dan video editing menggunakan After Effects atau CapCut untuk konten digital.', 'status' => 'locked', 'skills' => ['Motion Graphics', 'Video Editing'], 'estimatedHours' => 20, 'level' => 'intermediate', 'resources' => [
                    ['title' => 'After Effects Tutorials', 'url' => 'https://helpx.adobe.com/after-effects/tutorials.html', 'type' => 'article'],
                    ['title' => 'Motion Graphics Tutorial', 'url' => 'https://www.youtube.com/watch?v=5p1nK7uAMCg', 'type' => 'video'],
                    ['title' => 'School of Motion', 'url' => 'https://www.schoolofmotion.com/', 'type' => 'course'],
                    ['title' => 'Buat Logo Animation 5 Detik', 'url' => 'https://www.capcut.com/', 'type' => 'practice'],
                ]],
                ['id' => 'dkv-i4', 'title' => 'Digital Marketing Design', 'description' => 'Desain konten untuk social media, iklan digital, dan campaign marketing visual.', 'status' => 'locked', 'skills' => ['Digital Marketing', 'Social Media Design'], 'estimatedHours' => 15, 'level' => 'intermediate', 'resources' => [
                    ['title' => 'Social Media Design Guide', 'url' => 'https://www.canva.com/designschool/courses/social-media-design/', 'type' => 'article'],
                    ['title' => 'Social Media Design Tips', 'url' => 'https://www.youtube.com/watch?v=0aM3vZCxmBc', 'type' => 'video'],
                    ['title' => 'HubSpot Social Media Course', 'url' => 'https://academy.hubspot.com/courses/social-media-marketing', 'type' => 'course'],
                    ['title' => 'Create Instagram Campaign', 'url' => 'https://www.canva.com/', 'type' => 'practice'],
                ]],
            ];
        }

        if ($majorIdPrefix === 'tkj') {
            return [
                ['id' => 'tkj-i1', 'title' => 'Advanced Routing & Switching', 'description' => 'Pelajari OSPF, EIGRP, STP, VLAN trunking, dan inter-VLAN routing.', 'status' => 'available', 'skills' => ['Networking', 'Cisco Networking'], 'estimatedHours' => 25, 'level' => 'intermediate', 'resources' => [
                    ['title' => 'CCNA Routing & Switching', 'url' => 'https://www.netacad.com/courses/ccna', 'type' => 'article'],
                    ['title' => 'CCNA Full Course', 'url' => 'https://www.youtube.com/watch?v=8zVbui6dGbE', 'type' => 'video'],
                    ['title' => 'Cisco NetAcad CCNA', 'url' => 'https://www.netacad.com/courses/ccna', 'type' => 'course'],
                    ['title' => 'OSPF Lab in Packet Tracer', 'url' => 'https://www.netacad.com/', 'type' => 'practice'],
                ]],
                ['id' => 'tkj-i2', 'title' => 'Cloud Computing AWS/GCP', 'description' => 'Deploy VM, storage, dan networking di cloud public; pelajari VPC, EC2, S3.', 'status' => 'locked', 'skills' => ['Cloud (AWS/GCP)'], 'estimatedHours' => 25, 'level' => 'intermediate', 'resources' => [
                    ['title' => 'AWS Well-Architected', 'url' => 'https://aws.amazon.com/architecture/well-architected/', 'type' => 'article'],
                    ['title' => 'AWS Cloud Practitioner', 'url' => 'https://www.youtube.com/watch?v=SOTamWNgDKc', 'type' => 'video'],
                    ['title' => 'AWS Free Tier Training', 'url' => 'https://aws.amazon.com/free/', 'type' => 'course'],
                    ['title' => 'Deploy a Web App on EC2', 'url' => 'https://aws.amazon.com/console/', 'type' => 'practice'],
                ]],
                ['id' => 'tkj-i3', 'title' => 'Cybersecurity & Ethical Hacking', 'description' => 'Pelajari vulnerability assessment, penetration testing, dan keamanan jaringan dasar.', 'status' => 'locked', 'skills' => ['Cybersecurity Basics'], 'estimatedHours' => 20, 'level' => 'intermediate', 'resources' => [
                    ['title' => 'OWASP Top 10', 'url' => 'https://owasp.org/www-project-top-ten/', 'type' => 'article'],
                    ['title' => 'Ethical Hacking Full Course', 'url' => 'https://www.youtube.com/watch?v=fNzpcB7ODxQ', 'type' => 'video'],
                    ['title' => 'TryHackMe Platform', 'url' => 'https://tryhackme.com/', 'type' => 'course'],
                    ['title' => 'Complete 5 TryHackMe Rooms', 'url' => 'https://tryhackme.com/', 'type' => 'practice'],
                ]],
                ['id' => 'tkj-i4', 'title' => 'Docker & Containerization', 'description' => 'Pelajari containerization dengan Docker: image, container, compose, dan deployment.', 'status' => 'locked', 'skills' => ['Docker'], 'estimatedHours' => 15, 'level' => 'intermediate', 'resources' => [
                    ['title' => 'Docker Docs', 'url' => 'https://docs.docker.com/get-started/', 'type' => 'article'],
                    ['title' => 'Docker Crash Course', 'url' => 'https://www.youtube.com/watch?v=fqMOX6JJhGo', 'type' => 'video'],
                    ['title' => 'Docker 101 Tutorial (Resmi)', 'url' => 'https://www.docker.com/101-tutorial/', 'type' => 'course'],
                    ['title' => 'Dockerize a Web App', 'url' => 'https://docs.docker.com/get-started/', 'type' => 'practice'],
                ]],
            ];
        }

        if ($majorIdPrefix === 'tt') {
            return [
                ['id' => 'tt-i1', 'title' => 'Fiber Optic Splicing & Testing', 'description' => 'Pelajari fusion splicing, connector termination, penggunaan OTDR, dan Power Meter.', 'status' => 'available', 'skills' => ['Fiber Optics'], 'estimatedHours' => 20, 'level' => 'intermediate', 'resources' => [
                    ['title' => 'Fiber Optic Communication (Wikipedia)', 'url' => 'https://en.wikipedia.org/wiki/Fiber-optic_communication', 'type' => 'article'],
                    ['title' => 'OTDR Tutorial', 'url' => 'https://www.youtube.com/watch?v=qZU6fPnoEvg', 'type' => 'video'],
                    ['title' => 'FOA Fiber Optics Guide', 'url' => 'https://www.thefoa.org/tech/', 'type' => 'course'],
                    ['title' => 'Hands-on Splicing & OTDR Test', 'url' => 'https://www.thefoa.org/tech/', 'type' => 'practice'],
                ]],
                ['id' => 'tt-i2', 'title' => 'RF Link Planning & Calculations', 'description' => 'Hitung link budget, fade margin, rain fade, dan perencanaan radio link point-to-point.', 'status' => 'locked', 'skills' => ['Radio Frequency'], 'estimatedHours' => 20, 'level' => 'intermediate', 'resources' => [
                    ['title' => 'RF Link Budget Calculator', 'url' => 'https://www.pasternack.com/tutorials/rf-link-budget.aspx', 'type' => 'article'],
                    ['title' => 'Radio Link Planning', 'url' => 'https://www.youtube.com/watch?v=EzFh8OTVBjQ', 'type' => 'video'],
                    ['title' => 'MikroTik Wireless Training', 'url' => 'https://mikrotik.com/training', 'type' => 'course'],
                    ['title' => 'Rencanakan Link 5km di RouterOS', 'url' => 'https://mikrotik.com/products', 'type' => 'practice'],
                ]],
                ['id' => 'tt-i3', 'title' => 'Tower Installation & Mekanik Radio', 'description' => 'Pelajari instalasi tower, guy wire, grounding, wind load calculation, dan antenna alignment.', 'status' => 'locked', 'skills' => ['Teknik Mekanik Radio'], 'estimatedHours' => 18, 'level' => 'intermediate', 'resources' => [
                    ['title' => 'Radio Masts & Towers (Wikipedia)', 'url' => 'https://en.wikipedia.org/wiki/Radio_masts_and_towers', 'type' => 'article'],
                    ['title' => 'Tower Climbing Safety', 'url' => 'https://www.youtube.com/watch?v=qCOLcE9iR2I', 'type' => 'video'],
                    ['title' => 'Tower Safety Certification', 'url' => 'https://www.comtrain.org/', 'type' => 'course'],
                    ['title' => 'Tower Site Survey Report', 'url' => 'https://www.comtrain.org/', 'type' => 'practice'],
                ]],
                ['id' => 'tt-i4', 'title' => 'MikroTik Advanced & RouterOS', 'description' => 'Konfigurasi advanced: routing, VPN, QoS, hotspot, bandwidth management dengan MikroTik.', 'status' => 'locked', 'skills' => ['Networking Basics'], 'estimatedHours' => 18, 'level' => 'intermediate', 'resources' => [
                    ['title' => 'MikroTik Advanced Guide', 'url' => 'https://wiki.mikrotik.com/wiki/Manual:TOC', 'type' => 'article'],
                    ['title' => 'MikroTik Advanced Tutorial', 'url' => 'https://www.youtube.com/watch?v=aQMxZmVGDqQ', 'type' => 'video'],
                    ['title' => 'MikroTik MTCNA Training', 'url' => 'https://mikrotik.com/training', 'type' => 'course'],
                    ['title' => 'Setup VPN & QoS on RouterOS', 'url' => 'https://mikrotik.com/products', 'type' => 'practice'],
                ]],
            ];
        }

        return [];
    }

    private function getAdvancedMilestones(string $majorIdPrefix): array
    {
        if ($majorIdPrefix === 'rpl') {
            return [
                ['id' => 'rpl-a1', 'title' => 'TypeScript untuk Skala Besar', 'description' => 'Kuasai type system, generics, utility types, dan best practices TypeScript dalam project besar.', 'status' => 'available', 'skills' => ['TypeScript'], 'estimatedHours' => 20, 'level' => 'advanced', 'resources' => [
                    ['title' => 'TypeScript Handbook', 'url' => 'https://www.typescriptlang.org/docs/handbook/', 'type' => 'article'],
                    ['title' => 'Total TypeScript: TypeScript Tips', 'url' => 'https://www.totaltypescript.com/tips', 'type' => 'article'],
                    ['title' => 'TypeScript Full Course', 'url' => 'https://www.youtube.com/watch?v=BwuLxPH8IDs', 'type' => 'video'],
                    ['title' => 'TypeScript Crash Course (Traversy)', 'url' => 'https://www.youtube.com/watch?v=gp5H0Vw39yw', 'type' => 'video'],
                    ['title' => 'Total TypeScript', 'url' => 'https://www.totaltypescript.com/', 'type' => 'course'],
                    ['title' => 'Coursera: TypeScript for Node.js', 'url' => 'https://www.coursera.org/learn/typescript-for-node-js', 'type' => 'course'],
                    ['title' => 'Convert JS Project to TS', 'url' => 'https://www.typescriptlang.org/docs/handbook/', 'type' => 'practice'],
                    ['title' => 'Build a Type-Safe API with Zod', 'url' => 'https://zod.dev/', 'type' => 'practice'],
                ]],
                ['id' => 'rpl-a2', 'title' => 'Testing & CI/CD', 'description' => 'Pelajari unit testing, integration testing, dan setup pipeline CI/CD untuk deploy otomatis.', 'status' => 'locked', 'skills' => ['CI/CD'], 'estimatedHours' => 15, 'level' => 'advanced', 'resources' => [
                    ['title' => 'Jest Official Docs', 'url' => 'https://jestjs.io/docs/getting-started', 'type' => 'article'],
                    ['title' => 'GitHub Actions Documentation', 'url' => 'https://docs.github.com/en/actions', 'type' => 'article'],
                    ['title' => 'Testing JavaScript Course', 'url' => 'https://www.youtube.com/watch?v=7r4FfJ1x7to', 'type' => 'video'],
                    ['title' => 'CI/CD Pipeline Tutorial (freeCodeCamp)', 'url' => 'https://www.youtube.com/watch?v=scEDHsr3APg', 'type' => 'video'],
                    ['title' => 'GitHub Actions Docs', 'url' => 'https://docs.github.com/en/actions', 'type' => 'course'],
                    ['title' => 'Udemy: Testing Node.js Applications', 'url' => 'https://www.udemy.com/course/test-nodejs-apps/', 'type' => 'course'],
                    ['title' => 'Write Tests & Setup CI', 'url' => 'https://jestjs.io/docs/getting-started', 'type' => 'practice'],
                    ['title' => 'Setup GitHub Actions for Next.js', 'url' => 'https://nextjs.org/docs/deploying', 'type' => 'practice'],
                ]],
                ['id' => 'rpl-a3', 'title' => 'DevOps & Docker', 'description' => 'Pelajari containerization dengan Docker, image management, Docker Compose, dan deployment.', 'status' => 'locked', 'skills' => ['Docker'], 'estimatedHours' => 20, 'level' => 'advanced', 'resources' => [
                    ['title' => 'Docker Getting Started', 'url' => 'https://docs.docker.com/get-started/', 'type' => 'article'],
                    ['title' => 'Docker Curriculum: Beginner Guide', 'url' => 'https://docker-curriculum.com/', 'type' => 'article'],
                    ['title' => 'Docker Crash Course', 'url' => 'https://www.youtube.com/watch?v=fqMOX6JJhGo', 'type' => 'video'],
                    ['title' => 'Docker Tutorial for Beginners (TechWorld with Nana)', 'url' => 'https://www.youtube.com/watch?v=3c-iBn73dDE', 'type' => 'video'],
                    ['title' => 'Docker for Beginners (KodeKloud)', 'url' => 'https://kodekloud.com/courses/docker-for-the-absolute-beginner/', 'type' => 'course'],
                    ['title' => 'Coursera: DevOps and Docker', 'url' => 'https://www.coursera.org/learn/devops-with-docker', 'type' => 'course'],
                    ['title' => 'Dockerize a Web App', 'url' => 'https://docs.docker.com/get-started/', 'type' => 'practice'],
                    ['title' => 'Build a Multi-Container App with Docker Compose', 'url' => 'https://docs.docker.com/compose/getting-started/', 'type' => 'practice'],
                ]],
                ['id' => 'rpl-a4', 'title' => 'React Native Mobile Development', 'description' => 'Bangun aplikasi mobile cross-platform dengan React Native: components, navigation, dan native APIs.', 'status' => 'locked', 'skills' => ['React Native', 'Mobile UI/UX'], 'estimatedHours' => 25, 'level' => 'advanced', 'resources' => [
                    ['title' => 'React Native Official Docs', 'url' => 'https://reactnative.dev/docs/getting-started', 'type' => 'article'],
                    ['title' => 'Expo Documentation', 'url' => 'https://docs.expo.dev/', 'type' => 'article'],
                    ['title' => 'React Native Course for Beginners', 'url' => 'https://www.youtube.com/watch?v=0-S5a0eXPoc', 'type' => 'video'],
                    ['title' => 'React Native Tutorial (Programming with Mosh)', 'url' => 'https://www.youtube.com/watch?v=0-TJY5WHZKM', 'type' => 'video'],
                    ['title' => 'Expo: Start React Native', 'url' => 'https://docs.expo.dev/', 'type' => 'course'],
                    ['title' => 'Coursera: Meta React Native', 'url' => 'https://www.coursera.org/learn/meta-react-native', 'type' => 'course'],
                    ['title' => 'Build a Todo Mobile App', 'url' => 'https://reactnative.dev/docs/tutorial', 'type' => 'practice'],
                    ['title' => 'Build a Weather App with Expo', 'url' => 'https://docs.expo.dev/get-started/set-up-your-environment/', 'type' => 'practice'],
                ]],
            ];
        }

        if ($majorIdPrefix === 'dkv') {
            return [
                ['id' => 'dkv-a1', 'title' => 'Design System & Brand Guideline', 'description' => 'Buat design system lengkap dari komponen atom hingga dokumentasi brand.', 'status' => 'available', 'skills' => ['Design System', 'Brand Identity'], 'estimatedHours' => 25, 'level' => 'advanced', 'resources' => [
                    ['title' => 'Design Systems Repo', 'url' => 'https://designsystemsrepo.com/', 'type' => 'article'],
                    ['title' => 'Building Design Systems', 'url' => 'https://www.youtube.com/watch?v=wc1T7MeBgZA', 'type' => 'video'],
                    ['title' => 'Design Systems Course (Figma)', 'url' => 'https://www.figma.com/resources/learn-design/', 'type' => 'course'],
                    ['title' => 'Buat Design System Sendiri', 'url' => 'https://www.figma.com/', 'type' => 'practice'],
                ]],
                ['id' => 'dkv-a2', 'title' => 'Advanced Prototyping & Interaction Design', 'description' => 'Prototipe tingkat lanjut: animasi transisi, micro-interaction, dan conditional logic di Figma.', 'status' => 'locked', 'skills' => ['Prototyping', 'Interaction Design'], 'estimatedHours' => 20, 'level' => 'advanced', 'resources' => [
                    ['title' => 'Figma Prototyping Docs', 'url' => 'https://help.figma.com/hc/en-us/articles/360040318013', 'type' => 'article'],
                    ['title' => 'Advanced Figma Prototyping', 'url' => 'https://www.youtube.com/watch?v=kyKbHxUvb2E', 'type' => 'video'],
                    ['title' => 'Figma Advanced Features', 'url' => 'https://www.figma.com/resources/learn-design/', 'type' => 'course'],
                    ['title' => 'Prototipe App dengan Transisi', 'url' => 'https://www.figma.com/', 'type' => 'practice'],
                ]],
                ['id' => 'dkv-a3', 'title' => 'Accessibility & Responsive Web Design', 'description' => 'Desain yang accessible untuk semua pengguna, WCAG compliance, dan responsive untuk semua device.', 'status' => 'locked', 'skills' => ['Accessibility', 'WCAG', 'Responsive'], 'estimatedHours' => 15, 'level' => 'advanced', 'resources' => [
                    ['title' => 'WCAG 2.1 Guidelines', 'url' => 'https://www.w3.org/WAI/WCAG21/quickref/', 'type' => 'article'],
                    ['title' => 'Accessibility in Design', 'url' => 'https://www.youtube.com/watch?v=5tlh8mN_rGI', 'type' => 'video'],
                    ['title' => 'Accessibility Course (Deque)', 'url' => 'https://dequeuniversity.com/', 'type' => 'course'],
                    ['title' => 'Audit & Fix an Existing Design', 'url' => 'https://wave.webaim.org/', 'type' => 'practice'],
                ]],
            ];
        }

        if ($majorIdPrefix === 'tkj') {
            return [
                ['id' => 'tkj-a1', 'title' => 'Infrastructure as Code (Terraform)', 'description' => 'Kelola infrastruktur cloud menggunakan kode: provision VM, network, dan storage secara otomatis.', 'status' => 'available', 'skills' => ['Cloud (AWS/GCP)'], 'estimatedHours' => 20, 'level' => 'advanced', 'resources' => [
                    ['title' => 'Terraform Docs', 'url' => 'https://developer.hashicorp.com/terraform/tutorials', 'type' => 'article'],
                    ['title' => 'Terraform Full Course', 'url' => 'https://www.youtube.com/watch?v=l5k1ai_GBDE', 'type' => 'video'],
                    ['title' => 'HashiCorp Learn', 'url' => 'https://developer.hashicorp.com/terraform/tutorials', 'type' => 'course'],
                    ['title' => 'Provision EC2 with Terraform', 'url' => 'https://developer.hashicorp.com/terraform/tutorials', 'type' => 'practice'],
                ]],
                ['id' => 'tkj-a2', 'title' => 'Zero Trust & Advanced Security', 'description' => 'Implement zero trust architecture, SIEM, IDS/IPS, dan incident response.', 'status' => 'locked', 'skills' => ['Cybersecurity Basics'], 'estimatedHours' => 20, 'level' => 'advanced', 'resources' => [
                    ['title' => 'NIST Zero Trust Framework', 'url' => 'https://csrc.nist.gov/publications/detail/sp/800-207/final', 'type' => 'article'],
                    ['title' => 'Zero Trust Explained', 'url' => 'https://www.youtube.com/watch?v=oLT7Krc-YZg', 'type' => 'video'],
                    ['title' => 'Splunk Free Training', 'url' => 'https://www.splunk.com/en_us/training/free-courses.html', 'type' => 'course'],
                    ['title' => 'Setup ELK Stack Monitoring', 'url' => 'https://www.elastic.co/guide/en/elastic-stack/current/index.html', 'type' => 'course'],
                ]],
                ['id' => 'tkj-a3', 'title' => 'Kubernetes & Cloud Orchestration', 'description' => 'Deploy dan manage aplikasi di Kubernetes: pods, services, deployments, dan scaling.', 'status' => 'locked', 'skills' => ['Docker'], 'estimatedHours' => 25, 'level' => 'advanced', 'resources' => [
                    ['title' => 'Kubernetes Docs', 'url' => 'https://kubernetes.io/docs/home/', 'type' => 'article'],
                    ['title' => 'Kubernetes Course for Beginners', 'url' => 'https://www.youtube.com/watch?v=X48VuDVv4do', 'type' => 'video'],
                    ['title' => 'KodeKloud', 'url' => 'https://kodekloud.com/', 'type' => 'course'],
                    ['title' => 'Deploy App to Minikube', 'url' => 'https://minikube.sigs.k8s.io/docs/start/', 'type' => 'practice'],
                ]],
            ];
        }

        if ($majorIdPrefix === 'tt') {
            return [
                ['id' => 'tt-a1', 'title' => 'DWDM & Coherent Optics', 'description' => 'Pelajari DWDM technology, coherent detection, amplifikasi optik (EDFA), dan managed wavelength.', 'status' => 'available', 'skills' => ['Fiber Optics'], 'estimatedHours' => 20, 'level' => 'advanced', 'resources' => [
                    ['title' => 'DWDM Technology (Cisco)', 'url' => 'https://www.cisco.com/c/en/us/products/optical-networking/dense-wavelength-division-multiplexing-dwdm-technology.html', 'type' => 'article'],
                    ['title' => 'DWDM Explained', 'url' => 'https://www.youtube.com/watch?v=pLEUX2C0qgc', 'type' => 'video'],
                    ['title' => 'Corning Optical Communications', 'url' => 'https://www.corning.com/worldwide/en/products/communications', 'type' => 'course'],
                    ['title' => 'Design a DWDM Link', 'url' => 'https://www.viavisolutions.com/', 'type' => 'practice'],
                ]],
                ['id' => 'tt-a2', 'title' => '5G & Next-Gen Wireless', 'description' => 'Pelajari arsitektur 5G NR, Massive MIMO, beamforming, dan network slicing.', 'status' => 'locked', 'skills' => ['Radio Frequency'], 'estimatedHours' => 20, 'level' => 'advanced', 'resources' => [
                    ['title' => '5G Architecture Overview', 'url' => 'https://www.3gpp.org/technologies/5g-system-overview', 'type' => 'article'],
                    ['title' => '5G Technology Explained', 'url' => 'https://www.youtube.com/watch?v=ULEjpsSc5pU', 'type' => 'video'],
                    ['title' => '5G Training (Nokia)', 'url' => 'https://www.nokia.com/networks/5g-training/', 'type' => 'course'],
                    ['title' => '5G Network Design Simulator', 'url' => 'https://www.3gpp.org/', 'type' => 'practice'],
                ]],
                ['id' => 'tt-a3', 'title' => 'Network Monitoring & SLA Management', 'description' => 'Setup monitoring (SNMP, Zabbix/PRTG), SLA measurement (latency, jitter, availability), dan reporting.', 'status' => 'locked', 'skills' => ['Networking Basics'], 'estimatedHours' => 18, 'level' => 'advanced', 'resources' => [
                    ['title' => 'SNMP Monitoring Guide', 'url' => 'https://www.manageengine.com/network-monitoring/what-is-snmp.html', 'type' => 'article'],
                    ['title' => 'Zabbix Full Course', 'url' => 'https://www.youtube.com/watch?v=W_HIIvuZFUg', 'type' => 'video'],
                    ['title' => 'Zabbix Official Training', 'url' => 'https://www.zabbix.com/documentation/current/en/manual', 'type' => 'course'],
                    ['title' => 'Setup Monitoring untuk 3 Link', 'url' => 'https://www.zabbix.com/', 'type' => 'practice'],
                ]],
            ];
        }

        return [];
    }
}