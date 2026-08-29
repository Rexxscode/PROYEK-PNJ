<?php
// Roadmap seeder from major-roadmap.ts
// Seeds ALL milestones and resources for all 4 majors

$pdo = new PDO('mysql:host=localhost;dbname=pnj;charset=utf8mb4', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$pdo->exec("SET FOREIGN_KEY_CHECKS=0");

// Clear existing
$pdo->exec("TRUNCATE roadmap_milestones");
$pdo->exec("TRUNCATE roadmap_resources");

// RPL Roadmap from major-roadmap.ts
$rplFundamental = [
    ['title' => 'HTML & CSS Fundamental', 'description' => 'Pelajari struktur markup HTML dan styling CSS dari nol. Pahami selector, box model, flexbox, dan responsive design.', 'level' => 'fundamental', 'estimated_hours' => 20],
    ['title' => 'JavaScript Dasar', 'description' => 'Kuasai variabel, tipe data, fungsi, array, object, conditional, loop, dan DOM manipulation.', 'level' => 'fundamental', 'estimated_hours' => 25],
    ['title' => 'Version Control dengan Git', 'description' => 'Pelajari branch, commit, merge, pull request, dan workflow Git untuk kolaborasi tim.', 'level' => 'fundamental', 'estimated_hours' => 10],
    ['title' => 'Node.js & npm Fundamental', 'description' => 'Kenali runtime JavaScript di server, package manager npm, dan membuat REST API sederhana.', 'level' => 'fundamental', 'estimated_hours' => 15],
];

$rplIntermediate = [
    ['title' => 'React & Component Architecture', 'description' => 'Pelajari komponen, props, state, hooks, dan lifecycle dalam React.', 'level' => 'intermediate', 'estimated_hours' => 30],
    ['title' => 'REST API & Backend Development', 'description' => 'Bangun API RESTful dengan Express.js, pelajari routing, middleware, error handling, dan autentikasi.', 'level' => 'intermediate', 'estimated_hours' => 25],
    ['title' => 'Database SQL & ORM', 'description' => 'Pelajari desain database, SQL queries, relasi, dan ORM seperti Prisma atau Sequelize.', 'level' => 'intermediate', 'estimated_hours' => 20],
    ['title' => 'Linux & Command Line Basics', 'description' => 'Pelajari dasar-dasar Linux: command line, file system, permissions, dan shell scripting.', 'level' => 'intermediate', 'estimated_hours' => 15],
];

$rplAdvanced = [
    ['title' => 'TypeScript untuk Skala Besar', 'description' => 'Kuasai type system, generics, utility types, dan best practices TypeScript dalam project besar.', 'level' => 'advanced', 'estimated_hours' => 20],
    ['title' => 'Testing & CI/CD', 'description' => 'Pelajari unit testing, integration testing, dan setup pipeline CI/CD untuk deploy otomatis.', 'level' => 'advanced', 'estimated_hours' => 15],
    ['title' => 'DevOps & Docker', 'description' => 'Pelajari containerization dengan Docker, image management, Docker Compose, dan deployment.', 'level' => 'advanced', 'estimated_hours' => 20],
];

// DKV Roadmap
$dkvFundamental = [
    ['title' => 'Color Theory & Typography', 'description' => 'Pelajari dasar-dasar warna, harmoni warna, dan tipografi yang efektif untuk desain.', 'level' => 'fundamental', 'estimated_hours' => 15],
    ['title' => 'Adobe Photoshop Fundamental', 'description' => 'Kuasai tools dasar Photoshop: selection, layers, masking, retouching, dan export.', 'level' => 'fundamental', 'estimated_hours' => 20],
    ['title' => 'Adobe Illustrator Dasar', 'description' => 'Belajar membuat vektor, logo, dan illustration menggunakan path, shape builder, dan pen tool.', 'level' => 'fundamental', 'estimated_hours' => 18],
    ['title' => 'Layout & Composition Principles', 'description' => 'Pelajari prinsip desain: alignment, contrast, repetition, proximity, hierarchy, dan balance.', 'level' => 'fundamental', 'estimated_hours' => 12],
];

$dkvIntermediate = [
    ['title' => 'UI/UX Design & User Research', 'description' => 'Pelajari user persona, journey map, wireframing, dan prototyping untuk design yang user-centric.', 'level' => 'intermediate', 'estimated_hours' => 25],
    ['title' => 'Figma Intermediate: Components & Auto Layout', 'description' => 'Bangun design system dengan komponen reusable, auto layout, dan variabel di Figma.', 'level' => 'intermediate', 'estimated_hours' => 20],
    ['title' => 'Motion Graphics & Video Editing', 'description' => 'Buat animasi dan video editing menggunakan After Effects atau CapCut untuk konten digital.', 'level' => 'intermediate', 'estimated_hours' => 20],
    ['title' => 'Digital Marketing Design', 'description' => 'Desain konten untuk social media, iklan digital, dan campaign marketing visual.', 'level' => 'intermediate', 'estimated_hours' => 15],
];

$dkvAdvanced = [
    ['title' => 'Design System & Brand Guideline', 'description' => 'Buat design system lengkap dari komponen atom hingga dokumentasi brand.', 'level' => 'advanced', 'estimated_hours' => 25],
    ['title' => 'Advanced Prototyping & Interaction Design', 'description' => 'Prototipe tingkat lanjut: animasi transisi, micro-interaction, dan conditional logic di Figma.', 'level' => 'advanced', 'estimated_hours' => 20],
    ['title' => 'Accessibility & Responsive Web Design', 'description' => 'Desain yang accessible untuk semua pengguna, WCAG compliance, dan responsive untuk semua device.', 'level' => 'advanced', 'estimated_hours' => 15],
];

// TKJ Roadmap
$tkjFundamental = [
    ['title' => 'Networking Fundamental', 'description' => 'Pelajari model OSI, TCP/IP, subnetting, IP addressing, dan konsep dasar jaringan.', 'level' => 'fundamental', 'estimated_hours' => 20],
    ['title' => 'Linux Administration Dasar', 'description' => 'Kuasai command line, file system, permissions, user management, dan service management di Linux.', 'level' => 'fundamental', 'estimated_hours' => 25],
    ['title' => 'Cisco Router & Switch Basic', 'description' => 'Konfigurasi dasar router dan switch Cisco: CLI, VLAN, IP addressing, dan ping test.', 'level' => 'fundamental', 'estimated_hours' => 20],
    ['title' => 'MikroTik RouterOS Basic', 'description' => 'Pelajari konfigurasi MikroTik: IP, firewall, NAT, DHCP server, dan wireless.', 'level' => 'fundamental', 'estimated_hours' => 18],
];

$tkjIntermediate = [
    ['title' => 'Advanced Routing & Switching', 'description' => 'Pelajari OSPF, EIGRP, STP, VLAN trunking, dan inter-VLAN routing.', 'level' => 'intermediate', 'estimated_hours' => 25],
    ['title' => 'Cloud Computing AWS/GCP', 'description' => 'Deploy VM, storage, dan networking di cloud public; pelajari VPC, EC2, S3.', 'level' => 'intermediate', 'estimated_hours' => 25],
    ['title' => 'Cybersecurity & Ethical Hacking', 'description' => 'Pelajari vulnerability assessment, penetration testing, dan keamanan jaringan dasar.', 'level' => 'intermediate', 'estimated_hours' => 20],
    ['title' => 'Docker & Containerization', 'description' => 'Pelajari containerization dengan Docker: image, container, compose, dan deployment.', 'level' => 'intermediate', 'estimated_hours' => 15],
];

$tkjAdvanced = [
    ['title' => 'Infrastructure as Code (Terraform)', 'description' => 'Kelola infrastruktur cloud menggunakan kode: provision VM, network, dan storage secara otomatis.', 'level' => 'advanced', 'estimated_hours' => 20],
    ['title' => 'Zero Trust & Advanced Security', 'description' => 'Implement zero trust architecture, SIEM, IDS/IPS, dan incident response.', 'level' => 'advanced', 'estimated_hours' => 20],
    ['title' => 'Kubernetes & Cloud Orchestration', 'description' => 'Deploy dan manage aplikasi di Kubernetes: pods, services, deployments, dan scaling.', 'level' => 'advanced', 'estimated_hours' => 25],
];

// TT Roadmap
$ttFundamental = [
    ['title' => 'Telecom Fundamental & Signal Theory', 'description' => 'Pelajari konsep dasar sinyal analog/digital, frekuensi, bandwidth, dan modulasi.', 'level' => 'fundamental', 'estimated_hours' => 20],
    ['title' => 'Fiber Optic Fundamentals', 'description' => 'Pelajari struktur kabel fiber, jenis (SMF/MMF), princip kerja, dan keuntungan vs kabel tembaga.', 'level' => 'fundamental', 'estimated_hours' => 18],
    ['title' => 'Radio Frequency (RF) Basic', 'description' => 'Pelajari konsep RF: frekuensi, gelombang, antena, dan propagasi sinyal radio.', 'level' => 'fundamental', 'estimated_hours' => 18],
    ['title' => 'Network Engineering Basic', 'description' => 'Pelajari konsep jaringan transmisi: OSI model, TCP/IP, dan protokol dasar telekomunikasi.', 'level' => 'fundamental', 'estimated_hours' => 15],
];

$ttIntermediate = [
    ['title' => 'Fiber Optic Splicing & Testing', 'description' => 'Pelajari fusion splicing, connector termination, penggunaan OTDR, dan Power Meter.', 'level' => 'intermediate', 'estimated_hours' => 20],
    ['title' => 'RF Link Planning & Calculations', 'description' => 'Hitung link budget, fade margin, rain fade, dan perencanaan radio link point-to-point.', 'level' => 'intermediate', 'estimated_hours' => 20],
    ['title' => 'Tower Installation & Mekanik Radio', 'description' => 'Pelajari instalasi tower, guy wire, grounding, wind load calculation, dan antenna alignment.', 'level' => 'intermediate', 'estimated_hours' => 18],
    ['title' => 'MikroTik Advanced & RouterOS', 'description' => 'Konfigurasi advanced: routing, VPN, QoS, hotspot, bandwidth management dengan MikroTik.', 'level' => 'intermediate', 'estimated_hours' => 18],
];

$ttAdvanced = [
    ['title' => 'DWDM & Coherent Optics', 'description' => 'Pelajari DWDM technology, coherent detection, amplifikasi optik (EDFA), dan managed wavelength.', 'level' => 'advanced', 'estimated_hours' => 20],
    ['title' => '5G & Next-Gen Wireless', 'description' => 'Pelajari arsitektur 5G NR, Massive MIMO, beamforming, dan network slicing.', 'level' => 'advanced', 'estimated_hours' => 20],
    ['title' => 'Network Monitoring & SLA Management', 'description' => 'Setup monitoring (SNMP, Zabbix/PRTG), SLA measurement (latency, jitter, availability), dan reporting.', 'level' => 'advanced', 'estimated_hours' => 18],
];

// Function to insert milestones
function insertMilestones($pdo, $milestones, $majorId) {
    foreach ($milestones as $ms) {
        $stmt = $pdo->prepare("INSERT INTO roadmap_milestones (major_id, title, description, level, estimated_hours) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([
            $majorId,
            $ms['title'],
            $ms['description'],
            $ms['level'],
            $ms['estimated_hours']
        ]);
    }
}

// Insert RPL milestones
insertMilestones($pdo, $rplFundamental, 'RPL');
insertMilestones($pdo, $rplIntermediate, 'RPL');
insertMilestones($pdo, $rplAdvanced, 'RPL');

// Insert DKV milestones
insertMilestones($pdo, $dkvFundamental, 'DKV');
insertMilestones($pdo, $dkvIntermediate, 'DKV');
insertMilestones($pdo, $dkvAdvanced, 'DKV');

// Insert TKJ milestones
insertMilestones($pdo, $tkjFundamental, 'TKJ');
insertMilestones($pdo, $tkjIntermediate, 'TKJ');
insertMilestones($pdo, $tkjAdvanced, 'TKJ');

// Insert TT milestones
insertMilestones($pdo, $ttFundamental, 'TT');
insertMilestones($pdo, $ttIntermediate, 'TT');
insertMilestones($pdo, $ttAdvanced, 'TT');

// Now insert resources for each milestone
// We need to get the milestone IDs that were just inserted
$stmt = $pdo->query("SELECT id, major_id FROM roadmap_milestones ORDER BY id");
$milestones = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Build a map: milestone title -> id
$milestoneMap = [];
foreach ($milestones as $ms) {
    $key = $ms['major_id'] . '-' . str_replace(['fundamental', 'intermediate', 'advanced', ' '], ['f', 'i', 'a', '-'], strtolower($ms['title']));
    // Try to find matching key - use simpler approach
    $milestoneMap[$ms['major_id'] . '[' . $ms['level'] . ']'] = $ms['id'];
}

// For each major, insert appropriate resources
// RPL resources - keyed by level
$allResources = [
    'RPL' => [
        'fundamental' => [
            ['title' => 'MDN Web Docs: HTML Basics', 'url' => 'https://developer.mozilla.org/en-US/docs/Learn/HTML', 'type' => 'article'],
            ['title' => 'W3Schools: CSS Tutorial Lengkap', 'url' => 'https://www.w3schools.com/css/', 'type' => 'article'],
            ['title' => 'CSS Flexbox Crash Course', 'url' => 'https://www.youtube.com/watch?v=fYq5PXgSsbE', 'type' => 'video'],
        ],
        'intermediate' => [
            ['title' => 'React Official Documentation', 'url' => 'https://reactjs.org/docs/hello-world.html', 'type' => 'article'],
            ['title' => 'Express.js Guide', 'url' => 'https://expressjs.com/en/starter/hello-world.html', 'type' => 'article'],
        ],
        'advanced' => [
            ['title' => 'TypeScript Handbook', 'url' => 'https://www.typescriptlang.org/docs/handbook/intro.html', 'type' => 'article'],
            ['title' => 'Docker Documentation', 'url' => 'https://docs.docker.com/', 'type' => 'article'],
        ],
    ],
    'DKV' => [
        'fundamental' => [
            ['title' => 'Color Theory for Designers', 'url' => 'https://www.canva.com/learn/color-theory/', 'type' => 'article'],
            ['title' => 'Color Theory Explained', 'url' => 'https://www.youtube.com/watch?v=Qj1K8QraAXY', 'type' => 'video'],
        ],
        'intermediate' => [
            ['title' => 'Figma Design System', 'url' => 'https://www.figma.com/', 'type' => 'article'],
            ['title' => 'After Effects Tutorials', 'url' => 'https://www.youtube.com/@AfterEffects', 'type' => 'video'],
        ],
        'advanced' => [
            ['title' => 'Design System Resources', 'url' => 'https://www.smashingmagazine.com/2014/01/designing-a-design-system/', 'type' => 'article'],
        ],
    ],
    'TKJ' => [
        'fundamental' => [
            ['title' => 'Cisco Networking Academy', 'url' => 'https://www.netacad.com/', 'type' => 'article'],
        ],
        'intermediate' => [
            ['title' => 'AWS Free Tier', 'url' => 'https://aws.amazon.com/free/', 'type' => 'article'],
        ],
        'advanced' => [
            ['title' => 'Terraform Documentation', 'url' => 'https://developer.hashicorp.com/terraform/docs', 'type' => 'article'],
        ],
    ],
    'TT' => [
        'fundamental' => [
            ['title' => 'Data Communication Basics', 'url' => 'https://www.tutorialspoint.com/data_communication_computer_network/', 'type' => 'article'],
        ],
        'intermediate' => [
            ['title' => 'Fiber Optic Testing Guide', 'url' => 'https://www.fiberoptics4sale.com/learn/fiber-optic-testing/', 'type' => 'article'],
        ],
        'advanced' => [
            ['title' => 'DWDM Technology Overview', 'url' => 'https://www.fiberoptics.com/dwdm/', 'type' => 'article'],
        ],
    ],
];

// Insert resources per major
foreach (['RPL', 'DKV', 'TKJ', 'TT'] as $major) {
    $majorResources = $allResources[$major];
    // Get milestones for this major
    $majorMilestones = array_filter($milestones, function($ms) use ($major) { return $ms['major_id'] === $major; });
    
    foreach ($majorMilestones as $ms) {
        $level = $ms['level'];
        if (isset($majorResources[$level])) {
            foreach ($majorResources[$level] as $resource) {
                $stmt = $pdo->prepare("INSERT INTO roadmap_resources (milestone_id, title, url, type, description) VALUES (?, ?, ?, ?, ?)");
                $stmt->execute([
                    $ms['id'],
                    $resource['title'],
                    $resource['url'],
                    $resource['type'],
                    ''
                ]);
            }
        }
    }
}

// Also add some generic resources that don't map to specific milestones
// Generic resources per major
$genericResources = [
    'RPL' => [
        ['title' => 'Git Documentation', 'url' => 'https://git-scm.com/docs', 'type' => 'article'],
        ['title' => 'Node.js Docs', 'url' => 'https://nodejs.org/en/docs/', 'type' => 'article'],
    ],
    'DKV' => [
        ['title' => 'Adobe Photoshop tutorials', 'url' => 'https://helpx.adobe.com/photoshop/tutorials.html', 'type' => 'article'],
    ],
    'TKJ' => [
        ['title' => 'MikroTik Manual', 'url' => 'https://help.mikrotik.com/docs/', 'type' => 'article'],
    ],
    'TT' => [
        ['title' => 'Radio Frequency Guide', 'url' => 'https://www.radio-electronics.com/info/rf-technology/fundamentals.php', 'type' => 'article'],
    ],
];

foreach (['RPL', 'DKV', 'TKJ', 'TT'] as $major) {
    foreach ($genericResources[$major] as $resource) {
        $stmt = $pdo->prepare("INSERT INTO roadmap_resources (milestone_id, title, url, type, description) VALUES (?, ?, ?, ?, ?)");
        // Use the first milestone for this major
        $firstMs = $milestones[array_rand($milestones)];
        // Make sure it's the right major
        while ($firstMs['major_id'] !== $major) {
            $firstMs = $milestones[array_rand($milestones)];
        }
        $stmt->execute([
            $firstMs['id'],
            $resource['title'],
            $resource['url'],
            $resource['type'],
            ''
        ]);
    }
}

$pdo->exec("SET FOREIGN_KEY_CHECKS=1");

$stmt = $pdo->query("SELECT COUNT(*) as count FROM roadmap_milestones");
$row = $stmt->fetch();
echo "Total roadmap_milestones in DB: " . $row['count'] . "\n";

$stmt2 = $pdo->query("SELECT COUNT(*) as count FROM roadmap_resources");
$row2 = $stmt2->fetch();
echo "Total roadmap_resources in DB: " . $row2['count'] . "\n";

// Breakdown by major
$stmt3 = $pdo->query("SELECT major_id, COUNT(*) as cnt FROM roadmap_milestones GROUP BY major_id");
echo "Milestones by major:\n";
while ($row3 = $stmt3->fetch()) {
    echo "  " . $row3['major_id'] . ": " . $row3['cnt'] . "\n";
}

$stmt4 = $pdo->query("SELECT major_id, COUNT(*) as cnt FROM roadmap_resources GROUP BY major_id");
echo "Resources by major:\n";
while ($row4 = $stmt4->fetch()) {
    echo "  " . $row4['major_id'] . ": " . $row4['cnt'] . "\n";
}