"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Eye,
  Image as ImageIcon,
  LogOut,
  Plus,
  RotateCcw,
  Save,
  Trash2,
  Upload
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  defaultContent,
  editableContentStorageKey,
  iconMap,
  mergeEditableContent,
  readEditableContent,
  type EditableContent,
  type IconName
} from "@/lib/content";
import { cn } from "@/lib/utils";

const tabs = [
  "Brand",
  "Hero",
  "About",
  "Services",
  "Strengths",
  "Projects",
  "Gallery",
  "Contact"
] as const;

type TabName = (typeof tabs)[number];

function Field({
  label,
  value,
  onChange,
  multiline = false,
  placeholder
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-forest">
      {label}
      {multiline ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="min-h-28 w-full rounded-lg border border-forest/10 bg-white px-4 py-3 text-sm font-normal leading-6 text-graphite outline-none transition focus:border-leaf"
        />
      ) : (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-11 w-full rounded-lg border border-forest/10 bg-white px-4 text-sm font-normal text-graphite outline-none transition focus:border-leaf"
        />
      )}
    </label>
  );
}

function ListEditor({
  label,
  values,
  onChange,
  placeholder
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}) {
  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-forest">{label}</p>
        <button
          type="button"
          onClick={() => onChange([...values, ""])}
          className="button-focus inline-flex h-9 items-center gap-2 rounded-full bg-forest px-4 text-xs font-bold text-white hover:bg-pine"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add
        </button>
      </div>
      <div className="grid gap-2">
        {values.map((value, index) => (
          <div key={`${label}-${index}`} className="grid gap-2 sm:grid-cols-[1fr_auto]">
            <input
              value={value}
              onChange={(event) => {
                const nextValues = [...values];
                nextValues[index] = event.target.value;
                onChange(nextValues);
              }}
              placeholder={placeholder}
              className="h-11 rounded-lg border border-forest/10 bg-white px-4 text-sm text-graphite outline-none transition focus:border-leaf"
            />
            <button
              type="button"
              aria-label={`Remove ${label} item ${index + 1}`}
              onClick={() => onChange(values.filter((_, itemIndex) => itemIndex !== index))}
              className="button-focus grid h-11 w-11 place-items-center rounded-full border border-forest/10 text-forest hover:bg-mint"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function IconSelect({
  value,
  onChange
}: {
  value: IconName;
  onChange: (value: IconName) => void;
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value as IconName)}
      className="h-11 rounded-lg border border-forest/10 bg-white px-3 text-sm text-graphite outline-none transition focus:border-leaf"
    >
      {Object.keys(iconMap).map((iconName) => (
        <option key={iconName} value={iconName}>
          {iconName}
        </option>
      ))}
    </select>
  );
}

export default function AdminPage() {
  const [content, setContent] = useState<EditableContent>(defaultContent);
  const [activeTab, setActiveTab] = useState<TabName>("Brand");
  const [status, setStatus] = useState("Loaded default content.");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const downloadableJson = useMemo(() => JSON.stringify(content, null, 2), [content]);

  useEffect(() => {
    setContent(readEditableContent());
    setStatus("Loaded saved website settings.");
  }, []);

  function saveContent(nextContent = content) {
    window.localStorage.setItem(editableContentStorageKey, JSON.stringify(nextContent));
    window.dispatchEvent(new Event("neospace-content-updated"));
    setStatus(`Saved at ${new Date().toLocaleTimeString()}. Open the homepage to see updates.`);
  }

  function updateContent(updater: (current: EditableContent) => EditableContent) {
    setContent((current) => updater(current));
  }

  function resetContent() {
    setContent(defaultContent);
    window.localStorage.removeItem(editableContentStorageKey);
    window.dispatchEvent(new Event("neospace-content-updated"));
    setStatus("Reset to the original website content.");
  }

  function importSettings(file: File | undefined) {
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const nextContent = mergeEditableContent(JSON.parse(String(reader.result)));
        setContent(nextContent);
        saveContent(nextContent);
      } catch {
        setStatus("That file could not be imported. Use a valid exported JSON file.");
      }
    };
    reader.readAsText(file);
  }

  return (
    <main className="min-h-screen bg-mint/45 text-graphite">
      <header className="border-b border-forest/10 bg-white">
        <div className="container-px mx-auto flex max-w-7xl flex-col gap-5 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link href="/" className="button-focus inline-flex items-center gap-2 rounded-md text-sm font-semibold text-forest hover:text-leaf">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to website
            </Link>
            <h1 className="mt-3 font-display text-3xl font-semibold text-forest">Admin Portal</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-graphite/68">
              Change website copy, images, lists, services, project highlights, and contact details from one place.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="button-focus inline-flex h-11 items-center gap-2 rounded-full border border-forest/10 bg-white px-5 text-sm font-bold text-forest hover:bg-mint"
            >
              <Eye className="h-4 w-4" aria-hidden="true" />
              Preview
            </Link>
            <button
              type="button"
              onClick={() => saveContent()}
              className="button-focus inline-flex h-11 items-center gap-2 rounded-full bg-forest px-5 text-sm font-bold text-white hover:bg-pine"
            >
              <Save className="h-4 w-4" aria-hidden="true" />
              Save
            </button>
            <form action="/api/admin/logout" method="post">
              <button
                type="submit"
                className="button-focus inline-flex h-11 items-center gap-2 rounded-full border border-forest/10 bg-white px-5 text-sm font-bold text-forest hover:bg-mint"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="container-px mx-auto grid max-w-7xl gap-6 py-6 lg:grid-cols-[250px_1fr]">
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="grid gap-2 rounded-lg border border-forest/10 bg-white p-2 shadow-[0_10px_35px_rgba(5,46,26,0.06)]">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "button-focus rounded-md px-4 py-3 text-left text-sm font-semibold transition",
                  activeTab === tab ? "bg-forest text-white" : "text-forest hover:bg-mint"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="mt-4 grid gap-3 rounded-lg border border-forest/10 bg-white p-4">
            <p className="text-sm leading-6 text-graphite/70">{status}</p>
            <a
              download="neospace-website-settings.json"
              href={`data:application/json;charset=utf-8,${encodeURIComponent(downloadableJson)}`}
              className="button-focus inline-flex h-10 items-center justify-center gap-2 rounded-full border border-forest/10 text-sm font-bold text-forest hover:bg-mint"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Export
            </a>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="button-focus inline-flex h-10 items-center justify-center gap-2 rounded-full border border-forest/10 text-sm font-bold text-forest hover:bg-mint"
            >
              <Upload className="h-4 w-4" aria-hidden="true" />
              Import
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(event) => importSettings(event.target.files?.[0])}
            />
            <button
              type="button"
              onClick={resetContent}
              className="button-focus inline-flex h-10 items-center justify-center gap-2 rounded-full border border-forest/10 text-sm font-bold text-forest hover:bg-mint"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Reset
            </button>
          </div>
        </aside>

        <section className="rounded-lg border border-forest/10 bg-white p-5 shadow-[0_10px_35px_rgba(5,46,26,0.06)] sm:p-6">
          {activeTab === "Brand" ? (
            <div className="grid gap-5">
              <Field label="Brand name" value={content.brandName} onChange={(brandName) => updateContent((current) => ({ ...current, brandName }))} />
              <ListEditor
                label="Navigation labels"
                values={content.navItems.map((item) => item.label)}
                onChange={(labels) =>
                  updateContent((current) => ({
                    ...current,
                    navItems: labels.map((label, index) => ({ label, href: current.navItems[index]?.href || "#" }))
                  }))
                }
              />
              <Field label="Footer text" value={content.footerText} onChange={(footerText) => updateContent((current) => ({ ...current, footerText }))} multiline />
            </div>
          ) : null}

          {activeTab === "Hero" ? (
            <div className="grid gap-5">
              <Field label="Badge" value={content.hero.badge} onChange={(badge) => updateContent((current) => ({ ...current, hero: { ...current.hero, badge } }))} />
              <Field label="Headline" value={content.hero.title} onChange={(title) => updateContent((current) => ({ ...current, hero: { ...current.hero, title } }))} />
              <Field label="Description" value={content.hero.description} onChange={(description) => updateContent((current) => ({ ...current, hero: { ...current.hero, description } }))} multiline />
              <Field label="Primary button" value={content.hero.primaryCta} onChange={(primaryCta) => updateContent((current) => ({ ...current, hero: { ...current.hero, primaryCta } }))} />
              <Field label="Secondary button" value={content.hero.secondaryCta} onChange={(secondaryCta) => updateContent((current) => ({ ...current, hero: { ...current.hero, secondaryCta } }))} />
              <Field label="Hero image URL" value={content.hero.image} onChange={(image) => updateContent((current) => ({ ...current, hero: { ...current.hero, image } }))} />
              <ListEditor label="Office chips" values={content.offices} onChange={(offices) => updateContent((current) => ({ ...current, offices }))} />
              <div className="grid gap-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-forest">Stats</p>
                  <button
                    type="button"
                    onClick={() => updateContent((current) => ({ ...current, stats: [...current.stats, { value: "", label: "" }] }))}
                    className="button-focus inline-flex h-9 items-center gap-2 rounded-full bg-forest px-4 text-xs font-bold text-white hover:bg-pine"
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                    Add
                  </button>
                </div>
                {content.stats.map((stat, index) => (
                  <div key={`stat-${index}`} className="grid gap-2 sm:grid-cols-[0.45fr_1fr_auto]">
                    <input
                      value={stat.value}
                      onChange={(event) => updateContent((current) => ({ ...current, stats: current.stats.map((item, itemIndex) => itemIndex === index ? { ...item, value: event.target.value } : item) }))}
                      className="h-11 rounded-lg border border-forest/10 px-4 text-sm outline-none focus:border-leaf"
                      placeholder="Value"
                    />
                    <input
                      value={stat.label}
                      onChange={(event) => updateContent((current) => ({ ...current, stats: current.stats.map((item, itemIndex) => itemIndex === index ? { ...item, label: event.target.value } : item) }))}
                      className="h-11 rounded-lg border border-forest/10 px-4 text-sm outline-none focus:border-leaf"
                      placeholder="Label"
                    />
                    <button
                      type="button"
                      aria-label={`Remove stat ${index + 1}`}
                      onClick={() => updateContent((current) => ({ ...current, stats: current.stats.filter((_, itemIndex) => itemIndex !== index) }))}
                      className="button-focus grid h-11 w-11 place-items-center rounded-full border border-forest/10 text-forest hover:bg-mint"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {activeTab === "About" ? (
            <div className="grid gap-5">
              <Field label="Eyebrow" value={content.about.eyebrow} onChange={(eyebrow) => updateContent((current) => ({ ...current, about: { ...current.about, eyebrow } }))} />
              <Field label="Title" value={content.about.title} onChange={(title) => updateContent((current) => ({ ...current, about: { ...current.about, title } }))} />
              <Field label="Description" value={content.about.description} onChange={(description) => updateContent((current) => ({ ...current, about: { ...current.about, description } }))} multiline />
              <Field label="Image URL" value={content.about.image} onChange={(image) => updateContent((current) => ({ ...current, about: { ...current.about, image } }))} />
              <Field label="Image caption title" value={content.about.imageTitle} onChange={(imageTitle) => updateContent((current) => ({ ...current, about: { ...current.about, imageTitle } }))} />
              <Field label="Image caption text" value={content.about.imageText} onChange={(imageText) => updateContent((current) => ({ ...current, about: { ...current.about, imageText } }))} multiline />
              <ListEditor label="About bullets" values={content.about.bullets} onChange={(bullets) => updateContent((current) => ({ ...current, about: { ...current.about, bullets } }))} />
            </div>
          ) : null}

          {activeTab === "Services" ? (
            <div className="grid gap-5">
              <Field label="Section eyebrow" value={content.servicesSection.eyebrow} onChange={(eyebrow) => updateContent((current) => ({ ...current, servicesSection: { ...current.servicesSection, eyebrow } }))} />
              <Field label="Section title" value={content.servicesSection.title} onChange={(title) => updateContent((current) => ({ ...current, servicesSection: { ...current.servicesSection, title } }))} />
              <Field label="Section description" value={content.servicesSection.description} onChange={(description) => updateContent((current) => ({ ...current, servicesSection: { ...current.servicesSection, description } }))} multiline />
              <div className="grid gap-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-forest">Service cards</p>
                  <button
                    type="button"
                    onClick={() => updateContent((current) => ({ ...current, services: [...current.services, { title: "", description: "", icon: "SunMedium" }] }))}
                    className="button-focus inline-flex h-9 items-center gap-2 rounded-full bg-forest px-4 text-xs font-bold text-white hover:bg-pine"
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                    Add
                  </button>
                </div>
                {content.services.map((service, index) => (
                  <div key={`service-${index}`} className="grid gap-3 rounded-lg border border-forest/10 bg-mint/35 p-4">
                    <div className="grid gap-3 md:grid-cols-[1fr_180px_auto]">
                      <input
                        value={service.title}
                        onChange={(event) => updateContent((current) => ({ ...current, services: current.services.map((item, itemIndex) => itemIndex === index ? { ...item, title: event.target.value } : item) }))}
                        className="h-11 rounded-lg border border-forest/10 px-4 text-sm outline-none focus:border-leaf"
                        placeholder="Service title"
                      />
                      <IconSelect value={service.icon} onChange={(icon) => updateContent((current) => ({ ...current, services: current.services.map((item, itemIndex) => itemIndex === index ? { ...item, icon } : item) }))} />
                      <button
                        type="button"
                        aria-label={`Remove service ${index + 1}`}
                        onClick={() => updateContent((current) => ({ ...current, services: current.services.filter((_, itemIndex) => itemIndex !== index) }))}
                        className="button-focus grid h-11 w-11 place-items-center rounded-full border border-forest/10 bg-white text-forest hover:bg-mint"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                    <textarea
                      value={service.description}
                      onChange={(event) => updateContent((current) => ({ ...current, services: current.services.map((item, itemIndex) => itemIndex === index ? { ...item, description: event.target.value } : item) }))}
                      className="min-h-24 rounded-lg border border-forest/10 bg-white px-4 py-3 text-sm leading-6 outline-none focus:border-leaf"
                      placeholder="Service description"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {activeTab === "Strengths" ? (
            <div className="grid gap-5">
              <Field label="Section eyebrow" value={content.strengthsSection.eyebrow} onChange={(eyebrow) => updateContent((current) => ({ ...current, strengthsSection: { ...current.strengthsSection, eyebrow } }))} />
              <Field label="Section title" value={content.strengthsSection.title} onChange={(title) => updateContent((current) => ({ ...current, strengthsSection: { ...current.strengthsSection, title } }))} />
              <Field label="Section description" value={content.strengthsSection.description} onChange={(description) => updateContent((current) => ({ ...current, strengthsSection: { ...current.strengthsSection, description } }))} multiline />
              <ListEditor label="Strength list" values={content.strengths} onChange={(strengths) => updateContent((current) => ({ ...current, strengths }))} />
            </div>
          ) : null}

          {activeTab === "Projects" ? (
            <div className="grid gap-5">
              <Field label="Section eyebrow" value={content.projectsSection.eyebrow} onChange={(eyebrow) => updateContent((current) => ({ ...current, projectsSection: { ...current.projectsSection, eyebrow } }))} />
              <Field label="Section title" value={content.projectsSection.title} onChange={(title) => updateContent((current) => ({ ...current, projectsSection: { ...current.projectsSection, title } }))} />
              <Field label="Section description" value={content.projectsSection.description} onChange={(description) => updateContent((current) => ({ ...current, projectsSection: { ...current.projectsSection, description } }))} multiline />
              <ListEditor label="Clients" values={content.clients} onChange={(clients) => updateContent((current) => ({ ...current, clients }))} />
              <ListEditor label="Project highlights" values={content.projectHighlights} onChange={(projectHighlights) => updateContent((current) => ({ ...current, projectHighlights }))} />
            </div>
          ) : null}

          {activeTab === "Gallery" ? (
            <div className="grid gap-5">
              <Field label="Section eyebrow" value={content.gallerySection.eyebrow} onChange={(eyebrow) => updateContent((current) => ({ ...current, gallerySection: { ...current.gallerySection, eyebrow } }))} />
              <Field label="Section title" value={content.gallerySection.title} onChange={(title) => updateContent((current) => ({ ...current, gallerySection: { ...current.gallerySection, title } }))} />
              {content.galleryImages.map((image, index) => (
                <div key={`gallery-${index}`} className="grid gap-3 rounded-lg border border-forest/10 bg-mint/35 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-forest">
                    <ImageIcon className="h-4 w-4" aria-hidden="true" />
                    Image {index + 1}
                  </div>
                  <Field label="Image URL" value={image.src} onChange={(src) => updateContent((current) => ({ ...current, galleryImages: current.galleryImages.map((item, itemIndex) => itemIndex === index ? { ...item, src } : item) }))} />
                  <Field label="Alt text" value={image.alt} onChange={(alt) => updateContent((current) => ({ ...current, galleryImages: current.galleryImages.map((item, itemIndex) => itemIndex === index ? { ...item, alt } : item) }))} />
                </div>
              ))}
            </div>
          ) : null}

          {activeTab === "Contact" ? (
            <div className="grid gap-5">
              <Field label="Section eyebrow" value={content.contactSection.eyebrow} onChange={(eyebrow) => updateContent((current) => ({ ...current, contactSection: { ...current.contactSection, eyebrow } }))} />
              <Field label="Section title" value={content.contactSection.title} onChange={(title) => updateContent((current) => ({ ...current, contactSection: { ...current.contactSection, title } }))} />
              <Field label="Section description" value={content.contactSection.description} onChange={(description) => updateContent((current) => ({ ...current, contactSection: { ...current.contactSection, description } }))} multiline />
              <Field label="Email" value={content.contact.email} onChange={(email) => updateContent((current) => ({ ...current, contact: { ...current.contact, email } }))} />
              <Field label="Address" value={content.contact.address} onChange={(address) => updateContent((current) => ({ ...current, contact: { ...current.contact, address } }))} multiline />
              <Field label="Website" value={content.contact.website} onChange={(website) => updateContent((current) => ({ ...current, contact: { ...current.contact, website } }))} />
              <ListEditor label="Phone numbers" values={content.contact.phones} onChange={(phones) => updateContent((current) => ({ ...current, contact: { ...current.contact, phones } }))} />
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
