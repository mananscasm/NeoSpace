"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Award,
  Check,
  ChevronRight,
  ExternalLink,
  Facebook,
  Linkedin,
  LockKeyhole,
  Mail,
  MapPin,
  Menu,
  Phone,
  Send,
  Sparkles,
  X
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  defaultContent,
  iconMap,
  readEditableContent,
  type EditableContent
} from "@/lib/content";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

const getMapUrl = (address: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

type ContentProps = {
  content: EditableContent;
};

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light"
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className={cn("mx-auto max-w-3xl", align === "center" ? "text-center" : "mx-0 text-left")}
    >
      <p className={cn("mb-3 font-display text-sm font-semibold uppercase tracking-[0.24em]", tone === "dark" ? "text-limeglow" : "text-leaf")}>{eyebrow}</p>
      <h2 className={cn("font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl", tone === "dark" ? "text-white" : "text-forest")}>
        {title}
      </h2>
      {description ? <p className={cn("mt-5 text-base leading-8 sm:text-lg", tone === "dark" ? "text-white/70" : "text-graphite/70")}>{description}</p> : null}
    </motion.div>
  );
}

function Navbar({ content }: ContentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSolid, setIsSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        isSolid ? "bg-white/90 shadow-sm backdrop-blur-xl" : "bg-transparent"
      )}
    >
      <nav className="container-px mx-auto flex h-20 max-w-7xl items-center justify-between">
        <Link href="#home" className="button-focus flex items-center gap-3 rounded-md" aria-label={`${content.brandName} home`}>
          <span
            className={cn(
              "grid h-11 w-11 place-items-center rounded-full border",
              isSolid ? "border-forest/10 bg-forest text-limeglow" : "border-white/20 bg-white/10 text-limeglow"
            )}
          >
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className={cn("font-display text-lg font-semibold", isSolid ? "text-forest" : "text-white")}>
            {content.brandName}
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {content.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "button-focus rounded-md text-sm font-medium transition-colors hover:text-leaf",
                isSolid ? "text-graphite/76" : "text-white/82"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="#contact"
          className={cn(
            "button-focus hidden items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition lg:inline-flex",
            isSolid
              ? "bg-forest text-white hover:bg-pine"
              : "bg-white text-forest hover:bg-mint"
          )}
        >
          {content.hero.primaryCta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>

        <button
          type="button"
          className={cn(
            "button-focus inline-flex h-11 w-11 items-center justify-center rounded-full border lg:hidden",
            isSolid ? "border-forest/10 bg-white text-forest" : "border-white/20 bg-white/10 text-white"
          )}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </nav>

      {isOpen ? (
        <div className="container-px pb-5 lg:hidden">
          <div className="rounded-2xl border border-forest/10 bg-white p-4 shadow-premium">
            {content.navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between rounded-xl px-3 py-3 font-medium text-forest hover:bg-mint"
              >
                {item.label}
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white"
            >
              {content.hero.primaryCta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function Hero({ content }: ContentProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 120]);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-forest text-white">
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src={content.hero.image}
          alt="Large solar power installation"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(5,46,26,0.92)_0%,rgba(5,46,26,0.72)_42%,rgba(5,46,26,0.18)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-forest to-transparent" />

      <div className="container-px relative z-10 mx-auto flex min-h-screen max-w-7xl items-center pb-20 pt-28">
        <div className="grid w-full gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-4xl"
          >
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.65 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/10 px-4 py-2 text-sm text-white/86 backdrop-blur-md"
            >
              <Award className="h-4 w-4 text-limeglow" aria-hidden="true" />
              {content.hero.badge}
            </motion.div>
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="text-balance font-display text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl"
            >
              {content.hero.title}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="mt-6 max-w-2xl text-lg leading-8 text-white/78 sm:text-xl"
            >
              {content.hero.description}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#contact"
                className="button-focus inline-flex items-center justify-center gap-2 rounded-full bg-limeglow px-7 py-4 text-sm font-bold text-forest transition hover:bg-white"
              >
                {content.hero.primaryCta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="#services"
                className="button-focus inline-flex items-center justify-center gap-2 rounded-full border border-white/22 bg-white/10 px-7 py-4 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/18"
              >
                {content.hero.secondaryCta} <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="grid gap-4 sm:grid-cols-2 lg:pb-8"
          >
            {content.stats.map((stat) => (
              <div key={stat.label} className="dark-glass rounded-2xl p-5">
                <p className="font-display text-3xl font-semibold text-white">{stat.value}</p>
                <p className="mt-2 text-sm leading-6 text-white/70">{stat.label}</p>
              </div>
            ))}
            <div className="dark-glass rounded-2xl p-5 sm:col-span-2">
              <p className="text-sm uppercase tracking-[0.22em] text-limeglow">Offices</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {content.offices.map((office) => (
                  <span key={office} className="rounded-full bg-white/10 px-3 py-1.5 text-sm text-white/84">
                    {office}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function About({ content }: ContentProps) {
  return (
    <section id="about" className="section-y bg-white">
      <div className="container-px mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative min-h-[460px] overflow-hidden rounded-[2rem] bg-forest shadow-premium"
        >
          <Image
            src={content.about.image}
            alt="Solar engineer reviewing plant performance"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/10 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/18 bg-white/12 p-5 text-white backdrop-blur-xl">
            <p className="font-display text-2xl font-semibold">{content.about.imageTitle}</p>
            <p className="mt-2 text-sm leading-6 text-white/75">{content.about.imageText}</p>
          </div>
        </motion.div>

        <div>
          <SectionHeading
            align="left"
            eyebrow={content.about.eyebrow}
            title={content.about.title}
            description={content.about.description}
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mt-8 grid gap-4 sm:grid-cols-2"
          >
            {content.about.bullets.map((item) => (
              <motion.div key={item} variants={fadeUp} className="rounded-2xl border border-forest/10 bg-mint/60 p-5">
                <Check className="mb-4 h-5 w-5 text-leaf" aria-hidden="true" />
                <p className="font-medium leading-7 text-forest">{item}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function VisionMission({ content }: ContentProps) {
  return (
    <section className="section-y bg-forest text-white">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          tone="dark"
          eyebrow={content.direction.eyebrow}
          title={content.direction.title}
          description={content.direction.description}
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-12 grid gap-6 md:grid-cols-2"
        >
          {content.direction.cards.map((card) => {
            const Icon = iconMap[card.icon] || Sparkles;
            return (
            <motion.article
              key={card.title}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className="group rounded-[2rem] border border-white/12 bg-white/[0.06] p-8 backdrop-blur-xl transition hover:bg-white/[0.09]"
            >
              <div className="mb-8 grid h-14 w-14 place-items-center rounded-2xl bg-limeglow text-forest">
                <Icon className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="font-display text-3xl font-semibold">{card.title}</h3>
              <p className="mt-5 text-lg leading-8 text-white/72">{card.text}</p>
            </motion.article>
          );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function Services({ content }: ContentProps) {
  const [selectedService, setSelectedService] = useState<EditableContent["services"][number] | null>(null);

  return (
    <section id="services" className="section-y grid-pattern bg-white">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={content.servicesSection.eyebrow}
          title={content.servicesSection.title}
          description={content.servicesSection.description}
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {content.services.map((service) => {
            const Icon = iconMap[service.icon] || iconMap.SunMedium;
            return (
            <motion.article
              key={service.title}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className="group flex min-h-[260px] flex-col rounded-2xl border border-forest/10 bg-white p-6 shadow-[0_10px_40px_rgba(5,46,26,0.07)] transition hover:border-leaf/40 hover:shadow-premium"
            >
              <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-mint text-forest transition group-hover:bg-forest group-hover:text-limeglow">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-semibold leading-7 text-forest">{service.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-graphite/68">{service.description}</p>
              <button
                type="button"
                onClick={() => setSelectedService(service)}
                className="button-focus mt-6 inline-flex w-fit items-center gap-2 rounded-md text-sm font-bold text-pine hover:text-leaf"
              >
                Learn more <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </motion.article>
          );
          })}
        </motion.div>
      </div>
      {selectedService ? (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-forest/72 p-5 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-dialog-title"
          onClick={() => setSelectedService(null)}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="relative w-full max-w-2xl rounded-[2rem] bg-white p-6 shadow-glass sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="button-focus absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-mint text-forest hover:bg-forest hover:text-white"
              aria-label="Close service details"
              onClick={() => setSelectedService(null)}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-forest text-limeglow">
              {(() => {
                const Icon = iconMap[selectedService.icon] || iconMap.SunMedium;
                return <Icon className="h-7 w-7" aria-hidden="true" />;
              })()}
            </div>
            <h3 id="service-dialog-title" className="mt-6 font-display text-3xl font-semibold text-forest">
              {selectedService.title}
            </h3>
            <p className="mt-4 leading-8 text-graphite/70">{selectedService.description}</p>
            <div className="mt-6 rounded-2xl bg-mint/70 p-5">
              <p className="font-semibold text-forest">What NeoSpace can support</p>
              <p className="mt-2 text-sm leading-7 text-graphite/68">
                Site assessment, design and engineering, equipment selection, quality checks, commissioning support, monitoring, and long-term service planning.
              </p>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`#contact`}
                onClick={() => setSelectedService(null)}
                className="button-focus inline-flex items-center justify-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-bold text-white hover:bg-pine"
              >
                Discuss this service <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={`mailto:${content.contact.email}?subject=${encodeURIComponent(`Enquiry for ${selectedService.title}`)}`}
                className="button-focus inline-flex items-center justify-center gap-2 rounded-full border border-forest/12 px-6 py-3 text-sm font-bold text-forest hover:bg-mint"
              >
                Email enquiry <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </div>
      ) : null}
    </section>
  );
}

function Strengths({ content }: ContentProps) {
  return (
    <section id="strengths" className="section-y bg-mint/55">
      <div className="container-px mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading
            align="left"
            eyebrow={content.strengthsSection.eyebrow}
            title={content.strengthsSection.title}
            description={content.strengthsSection.description}
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {content.proofPoints.map((point) => {
              const Icon = iconMap[point.icon] || iconMap.ShieldCheck;
              return (
              <div key={point.title} className="rounded-2xl bg-white p-5 shadow-[0_10px_35px_rgba(5,46,26,0.08)]">
                <Icon className="mb-4 h-6 w-6 text-leaf" aria-hidden="true" />
                <p className="font-display text-lg font-semibold text-forest">{point.title}</p>
                <p className="mt-2 text-sm leading-6 text-graphite/65">{point.text}</p>
              </div>
            );
            })}
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="relative"
        >
          <div className="absolute bottom-0 left-6 top-0 hidden w-px bg-gradient-to-b from-leaf via-forest/20 to-transparent sm:block" />
          <div className="space-y-4">
            {content.strengths.map((strength, index) => (
              <motion.div
                key={strength}
                variants={fadeUp}
                className="relative rounded-2xl border border-forest/10 bg-white p-5 shadow-[0_12px_40px_rgba(5,46,26,0.06)] sm:ml-16"
              >
                <span className="mb-4 inline-grid h-10 w-10 place-items-center rounded-full bg-forest font-display text-sm font-semibold text-limeglow sm:absolute sm:-left-[4.75rem] sm:top-5">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="font-medium leading-7 text-forest">{strength}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Projects({ content }: ContentProps) {
  return (
    <section id="projects" className="section-y bg-white">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={content.projectsSection.eyebrow}
          title={content.projectsSection.title}
          description={content.projectsSection.description}
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2"
          >
            {content.clients.map((client) => (
              <motion.div
                key={client}
                variants={fadeUp}
                whileHover={{ scale: 1.03 }}
                className="grid min-h-28 place-items-center rounded-2xl border border-forest/10 bg-mint/50 p-5 text-center font-display text-lg font-semibold text-forest"
              >
                {client}
              </motion.div>
            ))}
          </motion.div>
          <div className="rounded-[2rem] bg-forest p-6 text-white shadow-premium sm:p-8">
            <div className="grid gap-4 sm:grid-cols-3">
              {content.stats.slice(0, 3).map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/12 bg-white/[0.07] p-5">
                  <p className="font-display text-3xl font-semibold text-limeglow">{stat.value}</p>
                  <p className="mt-2 text-sm text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-3">
              {content.projectHighlights.map((project) => (
                <div key={project} className="flex gap-3 rounded-2xl bg-white/[0.06] p-4">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-limeglow" aria-hidden="true" />
                  <p className="text-sm leading-6 text-white/78">{project}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery({ content }: ContentProps) {
  return (
    <section className="section-y bg-forest text-white">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          tone="dark"
          eyebrow={content.gallerySection.eyebrow}
          title={content.gallerySection.title}
        />
        <div className="mt-12 grid auto-rows-[250px] gap-5 md:grid-cols-4">
          {content.galleryImages.map((image) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              whileHover={{ scale: 0.985 }}
              transition={{ duration: 0.6 }}
              className={cn("group relative overflow-hidden rounded-[1.75rem]", image.className)}
            >
              <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 25vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/65 via-transparent to-transparent opacity-80" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ content }: ContentProps) {
  const [formStatus, setFormStatus] = useState<"idle" | "sent">("idle");
  const mapUrl = getMapUrl(content.contact.address);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "");
    const company = String(formData.get("company") || "");
    const email = String(formData.get("email") || "");
    const phone = String(formData.get("phone") || "");
    const requirement = String(formData.get("requirement") || "");
    const body = [
      `Name: ${name}`,
      `Company: ${company}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      "",
      "Requirement:",
      requirement
    ].join("\n");

    setFormStatus("sent");
    window.location.href = `mailto:${content.contact.email}?subject=${encodeURIComponent(`New project enquiry from ${content.brandName} website`)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section id="contact" className="section-y bg-white">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow={content.contactSection.eyebrow}
              title={content.contactSection.title}
              description={content.contactSection.description}
            />
            <form onSubmit={handleSubmit} className="mt-10 grid gap-4 rounded-[2rem] border border-forest/10 bg-mint/45 p-5 sm:grid-cols-2 sm:p-6">
              {[
                ["Name", "name", "text"],
                ["Company", "company", "text"],
                ["Email", "email", "email"],
                ["Phone", "phone", "tel"]
              ].map(([field, name, type]) => (
                <label key={field} className="text-sm font-semibold text-forest">
                  {field}
                  <input
                    name={name}
                    className="mt-2 h-12 w-full rounded-xl border border-forest/10 bg-white px-4 text-base font-normal text-graphite outline-none transition focus:border-leaf"
                    placeholder={field}
                    type={type}
                    required={field === "Name" || field === "Email" || field === "Phone"}
                  />
                </label>
              ))}
              <label className="text-sm font-semibold text-forest sm:col-span-2">
                Requirement
                <textarea
                  name="requirement"
                  className="mt-2 min-h-32 w-full rounded-xl border border-forest/10 bg-white px-4 py-3 text-base font-normal text-graphite outline-none transition focus:border-leaf"
                  placeholder="Tell us about your project, site, capacity, or consulting requirement"
                  required
                />
              </label>
              <button
                type="submit"
                className="button-focus inline-flex items-center justify-center gap-2 rounded-full bg-forest px-7 py-4 text-sm font-bold text-white transition hover:bg-pine sm:col-span-2 sm:w-fit"
              >
                Send Enquiry <Send className="h-4 w-4" aria-hidden="true" />
              </button>
              {formStatus === "sent" ? (
                <p className="rounded-xl bg-white px-4 py-3 text-sm font-medium text-forest sm:col-span-2">
                  Your email app is opening with a prefilled enquiry for {content.brandName}.
                </p>
              ) : null}
            </form>
          </div>

          <div className="grid gap-5">
            <div className="rounded-[2rem] bg-forest p-6 text-white shadow-premium">
              <p className="font-display text-2xl font-semibold">{content.brandName}</p>
              <div className="mt-6 space-y-5">
                <a href={`mailto:${content.contact.email}`} className="flex gap-4 text-white/78 hover:text-limeglow">
                  <Mail className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" />
                  <span>{content.contact.email}</span>
                </a>
                {content.contact.phones.map((phone) => (
                  <a key={phone} href={`tel:${phone.replace(/\s/g, "")}`} className="flex gap-4 text-white/78 hover:text-limeglow">
                    <Phone className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" />
                    <span>{phone}</span>
                  </a>
                ))}
                <a href={mapUrl} target="_blank" rel="noreferrer" className="flex gap-4 text-white/78 hover:text-limeglow">
                  <MapPin className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" />
                  <span>{content.contact.address}</span>
                </a>
              </div>
            </div>
            <a href={mapUrl} target="_blank" rel="noreferrer" className="button-focus relative block min-h-[340px] overflow-hidden rounded-[2rem] bg-mint shadow-[0_12px_50px_rgba(5,46,26,0.12)]">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(5,46,26,0.08)_25%,transparent_25%,transparent_50%,rgba(5,46,26,0.08)_50%,rgba(5,46,26,0.08)_75%,transparent_75%,transparent)] bg-[length:38px_38px]" />
              <div className="absolute inset-6 rounded-[1.5rem] border border-forest/10 bg-white/72 p-6 backdrop-blur">
                <p className="flex items-center gap-2 font-display text-xl font-semibold text-forest">
                  Open Location <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </p>
                <p className="mt-3 leading-7 text-graphite/68">{content.contact.address}</p>
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-forest p-4 text-white">
                  <p className="text-sm text-white/68">Primary office</p>
                  <p className="mt-1 font-semibold">Sector-14, Udaipur, Rajasthan</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ content }: ContentProps) {
  const mapUrl = getMapUrl(content.contact.address);
  const socialLinks = [
    {
      label: `Find ${content.brandName} on LinkedIn`,
      href: `https://www.linkedin.com/search/results/companies/?keywords=${encodeURIComponent(content.brandName)}`,
      icon: Linkedin
    },
    {
      label: `Find ${content.brandName} on Facebook`,
      href: `https://www.facebook.com/search/top?q=${encodeURIComponent(content.brandName)}`,
      icon: Facebook
    },
    {
      label: `Email ${content.brandName}`,
      href: `mailto:${content.contact.email}`,
      icon: Mail
    }
  ];

  return (
    <footer className="bg-forest text-white">
      <div className="container-px mx-auto grid max-w-7xl gap-10 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
        <div>
          <p className="font-display text-2xl font-semibold">{content.brandName}</p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/62">
            {content.footerText}
          </p>
          <div className="mt-6 flex gap-3">
            {socialLinks.map((item) => (
              <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined} aria-label={item.label} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-limeglow hover:text-forest">
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="font-display font-semibold">Quick Links</p>
          <div className="mt-4 grid gap-3">
            {content.navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-white/62 hover:text-limeglow">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-display font-semibold">Services</p>
          <div className="mt-4 grid gap-3">
            {content.services.slice(0, 5).map((service) => (
              <Link key={service.title} href="#services" className="text-sm text-white/62 hover:text-limeglow">
                {service.title}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-display font-semibold">Reach Us</p>
          <div className="mt-4 grid gap-3 text-sm text-white/62">
            <a href={mapUrl} target="_blank" rel="noreferrer" className="hover:text-limeglow">{content.contact.address}</a>
            <a href={`mailto:${content.contact.email}`} className="hover:text-limeglow">{content.contact.email}</a>
            {content.contact.phones.map((phone) => (
              <a key={phone} href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-limeglow">{phone}</a>
            ))}
            <Link href="/admin" className="inline-flex items-center gap-2 text-white/62 hover:text-limeglow">
              <LockKeyhole className="h-4 w-4" aria-hidden="true" />
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/46">
        Copyright {new Date().getFullYear()} {content.brandName}. All rights reserved.
      </div>
    </footer>
  );
}

export default function HomePage() {
  const [content, setContent] = useState<EditableContent>(defaultContent);

  useEffect(() => {
    const refreshContent = () => setContent(readEditableContent());
    refreshContent();
    window.addEventListener("storage", refreshContent);
    window.addEventListener("neospace-content-updated", refreshContent);
    return () => {
      window.removeEventListener("storage", refreshContent);
      window.removeEventListener("neospace-content-updated", refreshContent);
    };
  }, []);

  return (
    <main>
      <Navbar content={content} />
      <Hero content={content} />
      <About content={content} />
      <VisionMission content={content} />
      <Services content={content} />
      <Strengths content={content} />
      <Projects content={content} />
      <Gallery content={content} />
      <Contact content={content} />
      <Footer content={content} />
    </main>
  );
}
