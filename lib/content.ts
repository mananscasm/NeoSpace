import {
  BarChart3,
  BatteryCharging,
  Building2,
  Cable,
  CheckCircle2,
  Factory,
  Gauge,
  Globe2,
  Landmark,
  Leaf,
  LineChart,
  MonitorCog,
  Network,
  Recycle,
  ShieldCheck,
  SunMedium,
  Wrench
} from "lucide-react";

export const editableContentStorageKey = "neospace-editable-content-v1";

export const iconMap = {
  BarChart3,
  BatteryCharging,
  Building2,
  Cable,
  CheckCircle2,
  Factory,
  Gauge,
  Globe2,
  Landmark,
  Leaf,
  LineChart,
  MonitorCog,
  Network,
  Recycle,
  ShieldCheck,
  SunMedium,
  Wrench
};

export type IconName = keyof typeof iconMap;

export type EditableContent = {
  brandName: string;
  navItems: { label: string; href: string }[];
  hero: {
    badge: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    image: string;
  };
  stats: { value: string; label: string }[];
  offices: string[];
  about: {
    eyebrow: string;
    title: string;
    description: string;
    image: string;
    imageTitle: string;
    imageText: string;
    bullets: string[];
  };
  direction: {
    eyebrow: string;
    title: string;
    description: string;
    cards: { title: string; text: string; icon: IconName }[];
  };
  servicesSection: {
    eyebrow: string;
    title: string;
    description: string;
  };
  services: { title: string; description: string; icon: IconName }[];
  strengthsSection: {
    eyebrow: string;
    title: string;
    description: string;
  };
  strengths: string[];
  proofPoints: { title: string; text: string; icon: IconName }[];
  projectsSection: {
    eyebrow: string;
    title: string;
    description: string;
  };
  clients: string[];
  projectHighlights: string[];
  gallerySection: {
    eyebrow: string;
    title: string;
  };
  galleryImages: {
    src: string;
    alt: string;
    className: string;
  }[];
  contactSection: {
    eyebrow: string;
    title: string;
    description: string;
  };
  contact: {
    address: string;
    email: string;
    phones: string[];
    website: string;
  };
  footerText: string;
};

export const defaultContent: EditableContent = {
  brandName: "NeoSpace Engineering",
  navItems: [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Strengths", href: "#strengths" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" }
  ],
  hero: {
    badge: "Solar EPC provider in India since 2013",
    title: "Providing Efficient Energy Solutions",
    description:
      "NeoSpace Engineering, a subsidiary of Enspace Energy Systems, delivers world-class, cost-effective solar EPC and renewable energy solutions for commercial, industrial, and institutional customers.",
    primaryCta: "Get Consultation",
    secondaryCta: "Our Services",
    image: "/images/solar-farm-real.jpg"
  },
  stats: [
    { value: "15+", label: "Years Experience" },
    { value: "2+ MW", label: "Installed Capacity" },
    { value: "50+", label: "Projects & Assignments" },
    { value: "4", label: "Regional Offices" }
  ],
  offices: ["Udaipur", "Kanpur", "Mathura", "Faridabad"],
  about: {
    eyebrow: "About NeoSpace",
    title: "A focused Solar EPC partner with deep execution capability.",
    description:
      "NeoSpace Engineering is a subsidiary of Enspace Energy Systems. Incorporated in 2013, the company is among India's leading Solar EPC solution providers, focused on world-class, cost-effective renewable energy systems tailored to customer needs.",
    image: "/images/solar-technician-panel.jpg",
    imageTitle: "Built for accountable solar delivery",
    imageText: "Design, engineering, procurement, commissioning, monitoring, and long-term support.",
    bullets: [
      "Seasoned professionals with B.E. and MBA qualifications",
      "Team experience of more than 15 years in the energy industry",
      "In-house EPC capabilities and engineering expertise",
      "Procurement from reputed brands with quality assurance"
    ]
  },
  direction: {
    eyebrow: "Direction",
    title: "Purpose shaped by performance, reliability, and measurable customer value.",
    description:
      "The company combines engineering discipline with a practical renewable energy roadmap for industrial and institutional customers.",
    cards: [
      {
        title: "Vision",
        text: "To be a global, innovative, and competitive renewable energy organization offering comprehensive solutions for renewable energy products and services in local and international markets.",
        icon: "SunMedium"
      },
      {
        title: "Mission",
        text: "To deliver state-of-the-art products and customized renewable energy solutions through excellence in execution, well-defined processes, and unwavering customer satisfaction.",
        icon: "Leaf"
      }
    ]
  },
  servicesSection: {
    eyebrow: "Services",
    title: "End-to-end renewable energy services for serious operating environments.",
    description:
      "From rooftop solar and solar parks to carbon studies, audits, EMS, O&M, and trading advisory, NeoSpace supports the complete lifecycle of a renewable energy decision."
  },
  services: [
    {
      title: "Commercial / Industrial Solutions",
      description:
        "Bankable solar systems engineered for factories, institutions, hotels, and high-consumption facilities.",
      icon: "Factory"
    },
    {
      title: "Rooftop Solar Solutions",
      description:
        "High-performance rooftop plants with optimized layouts, safety margins, and durable components.",
      icon: "Building2"
    },
    {
      title: "Solar Products",
      description:
        "Procurement support for trusted modules, inverters, cables, and balance-of-system equipment.",
      icon: "SunMedium"
    },
    {
      title: "Turn-key EPC Services",
      description:
        "Design, engineering, supply, installation, testing, commissioning, and documentation under one accountable team.",
      icon: "Wrench"
    },
    {
      title: "Solar Parks",
      description:
        "Consulting and project execution support for developers, park owners, and distributed generation platforms.",
      icon: "SunMedium"
    },
    {
      title: "Operations & Maintenance",
      description:
        "Preventive maintenance, plant health checks, cleaning plans, remote monitoring, and AMC programs.",
      icon: "MonitorCog"
    },
    {
      title: "Energy Audits",
      description:
        "BEE-led energy studies that identify losses, load patterns, efficiency opportunities, and ROI-backed improvements.",
      icon: "Gauge"
    },
    {
      title: "Net Zero Consulting",
      description:
        "Practical decarbonization pathways for campuses, industries, and organizations moving toward net zero.",
      icon: "Leaf"
    },
    {
      title: "Carbon Study",
      description:
        "Carbon baseline assessments, reduction planning, and renewable integration strategy for ESG goals.",
      icon: "Recycle"
    },
    {
      title: "Energy Management Systems",
      description:
        "Digital energy visibility, monitoring architecture, and operating controls for smarter consumption.",
      icon: "BarChart3"
    },
    {
      title: "Power & Control Cables",
      description:
        "Cable selection and supply guidance with safety margins, authorized vendors, and quality checks.",
      icon: "Cable"
    },
    {
      title: "Exchange Power Trading Consulting",
      description:
        "Advisory for exchange power trading, developer parks, and commercial renewable procurement models.",
      icon: "LineChart"
    }
  ],
  strengthsSection: {
    eyebrow: "Why Choose Us",
    title: "Certified people, controlled processes, and operating discipline.",
    description:
      "NeoSpace brings the practical strengths customers look for in renewable energy partners: licensing, empanelment, certified managers, quality checks, monitoring, and long-term service."
  },
  strengths: [
    "Licensed electrical contractors",
    "DISCOM empaneled vendors for solar installations",
    "BEE Certified Energy Managers",
    "IGBC certified team capability",
    "Net Zero consultancy and carbon study experience",
    "PV syst-based design and engineering",
    "Authorized vendor procurement and inward quality checks",
    "QAP for in-process and final inspection",
    "Remote monitoring and predictive maintenance",
    "AMC solutions for long-term plant performance"
  ],
  proofPoints: [
    { title: "Assured Execution", text: "In-house EPC capabilities from design through commissioning.", icon: "ShieldCheck" },
    { title: "Quality Procurement", text: "High-quality, reputed brands and authorized vendor channels.", icon: "CheckCircle2" },
    { title: "ROI Focus", text: "On-time project commissioning to protect financial performance.", icon: "BatteryCharging" },
    { title: "Global Outlook", text: "Renewable energy relationships and experience across broader markets.", icon: "Globe2" }
  ],
  projectsSection: {
    eyebrow: "Projects & Clients",
    title: "Trusted across public sector, industry, institutions, and infrastructure.",
    description:
      "NeoSpace has supported solar plant installation, reconditioning, maintenance, audits, net zero consulting, and renewable projects for prominent Indian organizations."
  },
  clients: [
    "BHEL",
    "NTPC",
    "NPCIL",
    "IOCL",
    "HPCL",
    "IIT Kanpur",
    "Hindustan Zinc",
    "Indian Railways"
  ],
  projectHighlights: [
    "BHEL, Jhansi - reconditioning of 50 MW plant",
    "NTPC, Devikot - maintenance contract for 240 MW solar plant",
    "NPCIL, Kota - 50 kW solar plant",
    "IOCL, Faridabad - 100 kW solar plant",
    "Tempsens Instruments - 250 kW solar plant",
    "Payorite Print Media - 100 kW solar plant",
    "HPCL, Kota - 80 kW solar plant",
    "IIT Kanpur - Net Zero Consulting"
  ],
  gallerySection: {
    eyebrow: "Gallery",
    title: "Solar assets, field work, and energy infrastructure with a performance-first lens."
  },
  galleryImages: [
    {
      src: "/images/industrial-rooftop-solar.jpg",
      alt: "Industrial rooftop covered with solar panels",
      className: "md:col-span-2 md:row-span-2"
    },
    {
      src: "/images/solar-technician-panel.jpg",
      alt: "Technician installing hardware on a solar panel",
      className: ""
    },
    {
      src: "/images/rooftop-solar-system.jpg",
      alt: "Rooftop solar system on a residential building",
      className: ""
    },
    {
      src: "/images/solar-panels-closeup.jpg",
      alt: "Aerial close-up of photovoltaic solar panel rows",
      className: "md:col-span-2"
    },
    {
      src: "/images/solar-farm-real.jpg",
      alt: "Ground-mounted solar farm under a clear sky",
      className: "md:col-span-2"
    }
  ],
  contactSection: {
    eyebrow: "Contact",
    title: "Plan your next solar, audit, or net zero project with NeoSpace.",
    description:
      "Share the basics of your site or requirement and the team can guide you toward a practical, cost-effective renewable energy path."
  },
  contact: {
    address: "58-Kardhar Complex, Sector-14, Udaipur (Rajasthan)",
    email: "neospace.engineering@outlook.com",
    phones: ["+91 9937294271", "+91 8764022107"],
    website: "www.neospaceengineering.com"
  },
  footerText:
    "A Solar EPC and renewable energy solutions company delivering cost-effective engineering, installation, audits, O&M, and net zero consulting."
};

const legacyImageMap: Record<string, string> = {
  "photo-1509391366360-2e959784a276": "/images/solar-farm-real.jpg",
  "photo-1545209575-704158327940": "/images/solar-technician-panel.jpg",
  "photo-1497440001374-f26997328c1b": "/images/solar-panels-closeup.jpg",
  "photo-1559302504-64aae6ca6b6d": "/images/industrial-rooftop-solar.jpg",
  "/images/renewable-infrastructure.jpg": "/images/industrial-rooftop-solar.jpg",
  "/images/solar-engineer-review.jpg": "/images/solar-technician-panel.jpg",
  "/images/solar-farm-sunset.jpg": "/images/solar-panels-closeup.jpg",
  "/images/solar-hero.jpg": "/images/solar-farm-real.jpg",
  "/images/solar-panels-industrial.jpg": "/images/industrial-rooftop-solar.jpg"
};

function normalizeImageSrc(src: string): string {
  const match = Object.entries(legacyImageMap).find(([legacyId]) => src.includes(legacyId));
  return match ? match[1] : src;
}

export function mergeEditableContent(saved: Partial<EditableContent> | null): EditableContent {
  if (!saved) {
    return defaultContent;
  }

  const content = {
    ...defaultContent,
    ...saved,
    hero: { ...defaultContent.hero, ...saved.hero },
    about: { ...defaultContent.about, ...saved.about },
    direction: { ...defaultContent.direction, ...saved.direction },
    servicesSection: { ...defaultContent.servicesSection, ...saved.servicesSection },
    strengthsSection: { ...defaultContent.strengthsSection, ...saved.strengthsSection },
    projectsSection: { ...defaultContent.projectsSection, ...saved.projectsSection },
    gallerySection: { ...defaultContent.gallerySection, ...saved.gallerySection },
    contactSection: { ...defaultContent.contactSection, ...saved.contactSection },
    contact: { ...defaultContent.contact, ...saved.contact }
  };

  return {
    ...content,
    hero: { ...content.hero, image: normalizeImageSrc(content.hero.image) },
    about: { ...content.about, image: normalizeImageSrc(content.about.image) },
    galleryImages: content.galleryImages.map((image) => ({
      ...image,
      src: normalizeImageSrc(image.src)
    }))
  };
}

export function readEditableContent(): EditableContent {
  if (typeof window === "undefined") {
    return defaultContent;
  }

  try {
    const rawContent = window.localStorage.getItem(editableContentStorageKey);
    return mergeEditableContent(rawContent ? JSON.parse(rawContent) : null);
  } catch {
    return defaultContent;
  }
}
