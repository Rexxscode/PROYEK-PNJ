export const skillGroups: Record<string, string[]> = {
  RPL: [
    "JavaScript",
    "TypeScript",
    "React/Next.js",
    "Node.js",
    "Python",
    "HTML/CSS",
    "SQL/Database",
    "Git",
    "REST API",
    "Java",
    "Docker",
  ],
  DKV: [
    "Figma",
    "UI/UX Design",
    "Adobe Photoshop",
    "Adobe Illustrator",
    "Video Editing",
    "Motion Graphics",
    "Brand Identity",
    "Typography",
    "Copywriting",
    "Digital Marketing",
  ],
  TJKT: [
    "Cisco Networking",
    "MikroTik",
    "Linux Administration",
    "Cloud (AWS/GCP)",
    "Windows Server",
    "Networking",
    "Cybersecurity Basics",
    "Virtualization",
    "Fiber Optik",
    "Radio Frequency",
    "Network Engineering",
    "Teknik Mekanik Radio",
    "Operator Radio",
    "Cisco IOS",
    "TCP/IP",
    "VoIP",
  ],
};

export const skillFilterOptions = ["Semua", ...Object.keys(skillGroups)];

export const allSuggestedSkills = [...new Set(Object.values(skillGroups).flat())];