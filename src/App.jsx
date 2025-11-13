import React, { useMemo, useRef, useState, useEffect } from 'react'
import { Github, Linkedin, Mail, FileText, ArrowDown, MapPin, Camera, Briefcase, GraduationCap } from 'lucide-react'
import PixelMap, { COUNTRY_META } from './components/PixelMap'
import Section from './components/Section'

const HERO_PALETTE = {
  sky: '#e0f2fe',
  sun: '#fde68a',
  cloud: '#ffffff',
}

function PixelHero() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-b from-sky-100 to-amber-50 p-6">
      <div className="flex items-center gap-4">
        <div className="pixel-avatar shrink-0">
          <div className="w-20 h-20 bg-[repeating-linear-gradient(45deg,#111827_0_2px,#f59e0b_2px_4px)] border-2 border-black rounded shadow-[4px_4px_0_#111]" />
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
            My 64‑bit World
n          </h1>
          <p className="text-neutral-700 mt-2 max-w-prose">
            Scroll through a playful, 80s‑style world map to discover where I'm from, studied, and worked.
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <InfoBadge icon={<MapPin className="w-4 h-4" />} label="From" value="Bulgaria" color="bg-amber-300" />
        <InfoBadge icon={<GraduationCap className="w-4 h-4" />} label="Studied" value="France • USA • Singapore" color="bg-lime-300" />
        <InfoBadge icon={<Briefcase className="w-4 h-4" />} label="Worked" value="Bulgaria • USA • UK • Singapore" color="bg-sky-300" />
        <InfoBadge icon={<Camera className="w-4 h-4" />} label="Gallery" value="Tap countries to view" color="bg-rose-300" />
      </div>

      <div className="mt-6 flex items-center gap-2 text-neutral-700 text-sm">
        <ArrowDown className="w-4 h-4" />
        Scroll to explore
      </div>
    </div>
  )
}

function InfoBadge({ icon, label, value, color }) {
  return (
    <div className="flex items-center gap-2 rounded border border-black bg-white p-2 shadow-[3px_3px_0_#111]">
      <span className={`inline-flex items-center justify-center w-6 h-6 border border-black ${color}`}>
        {icon}
      </span>
      <div className="leading-tight">
        <div className="text-[10px] uppercase tracking-wide text-neutral-600">{label}</div>
        <div className="font-bold text-neutral-900">{value}</div>
      </div>
    </div>
  )
}

const GALLERY = {
  BULGARIA: [
    'https://images.unsplash.com/photo-1548266651-4b8c3c5a8f16?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1548266651-b1d6d61bb64e?q=80&w=1200&auto=format&fit=crop',
  ],
  FRANCE: [
    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop',
  ],
  USA: [
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
  ],
  UK: [
    'https://images.unsplash.com/photo-1473959383412-b19c1f3b2613?q=80&w=1200&auto=format&fit=crop',
  ],
  SINGAPORE: [
    'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?q=80&w=1200&auto=format&fit=crop',
  ],
}

function Gallery({ country }) {
  const items = GALLERY[country] || []
  if (!country) return null
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {items.map((src, idx) => (
        <div key={idx} className="relative rounded-lg overflow-hidden border border-black shadow-[3px_3px_0_#111]">
          <img src={src} alt={`${country} ${idx}`} className="w-full h-32 object-cover" />
        </div>
      ))}
      {items.length === 0 && (
        <div className="col-span-full text-sm text-neutral-600">No photos yet.</div>
      )}
    </div>
  )
}

export default function App() {
  const [stage, setStage] = useState(0)
  const [selected, setSelected] = useState(null)

  // Scroll-driven highlight stages
  const stages = [
    { key: 'from', title: "Where I'm from", subtitle: 'Home base that shaped me', highlight: ['BULGARIA'] },
    { key: 'study', title: 'Where I studied', subtitle: 'Academic stops around the globe', highlight: ['FRANCE', 'USA', 'SINGAPORE'] },
    { key: 'work', title: 'Where I worked', subtitle: 'Professional adventures', highlight: ['BULGARIA', 'USA', 'UK', 'SINGAPORE'] },
    { key: 'gallery', title: 'Photo memories', subtitle: 'Hover or click a country', highlight: [] },
  ]

  // Track scroll to switch stages
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const h = window.innerHeight
      const s = Math.min(stages.length - 1, Math.floor((y + 100) / (h * 0.9)))
      setStage(s)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen w-full bg-[#fff9ed] text-neutral-900">
      {/* Hero */}
      <div className="sticky top-0 z-10 border-b border-neutral-200 bg-white/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
          <div className="font-black tracking-tight text-xl">64‑bit Me</div>
          <div className="flex items-center gap-3 text-sm">
            <a className="inline-flex items-center gap-2 px-3 py-1 border border-black bg-white shadow-[3px_3px_0_#111] rounded" href="#contact">
              <Mail className="w-4 h-4" /> Contact
            </a>
            <a className="inline-flex items-center gap-2 px-3 py-1 border border-black bg-white shadow-[3px_3px_0_#111] rounded" href="#cv">
              <FileText className="w-4 h-4" /> CV
            </a>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-8 pb-24">
        <div className="py-12">
          <PixelHero />
        </div>

        {/* Map sections scrolled narrative */}
        {stages.map((s, idx) => (
          <Section
            key={s.key}
            id={s.key}
            title={s.title}
            subtitle={s.subtitle}
          >
            <PixelMap
              highlighted={idx === stage ? s.highlight : []}
              onSelect={(id) => setSelected(id)}
              selected={selected}
            />

            {/* Context text */}
            <div className="mt-4 text-sm text-neutral-700">
              {idx === 0 && (
                <p>Bulgaria glows bright — that\'s home. Think cozy pixel sunrises and strong coffee.</p>
              )}
              {idx === 1 && (
                <p>Study checkpoints unlocked: France, USA, Singapore. Each added a new power‑up.</p>
              )}
              {idx === 2 && (
                <p>Work quests across Bulgaria, USA, UK, and Singapore. Boss battles included.</p>
              )}
              {idx === 3 && (
                <p>Hover or click any highlighted country to load photo tiles from my adventures.</p>
              )}
            </div>

            {/* Gallery appears when a country is selected */}
            {idx === 3 && (
              <div className="mt-6">
                <div className="mb-3 font-bold flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  {selected ? `Photos from ${COUNTRY_META[selected]?.label || selected}` : 'Select a country'}
                </div>
                <Gallery country={selected} />
              </div>
            )}
          </Section>
        ))}

        {/* Contact */}
        <Section id="contact" title="Contact" subtitle="Let\'s connect">
          <div className="grid gap-4 sm:grid-cols-3">
            <a className="flex items-center gap-3 px-4 py-3 border border-black bg-white rounded shadow-[3px_3px_0_#111]" href="mailto:you@example.com">
              <Mail className="w-5 h-5" /> you@example.com
            </a>
            <a className="flex items-center gap-3 px-4 py-3 border border-black bg-white rounded shadow-[3px_3px_0_#111]" href="https://linkedin.com" target="_blank" rel="noreferrer">
              <Linkedin className="w-5 h-5" /> LinkedIn
            </a>
            <a className="flex items-center gap-3 px-4 py-3 border border-black bg-white rounded shadow-[3px_3px_0_#111]" href="https://github.com" target="_blank" rel="noreferrer">
              <Github className="w-5 h-5" /> GitHub
            </a>
          </div>
        </Section>

        {/* CV */}
        <Section id="cv" title="CV" subtitle="Quick download">
          <div className="flex flex-wrap items-center gap-3">
            <a className="inline-flex items-center gap-2 px-4 py-2 border border-black bg-white rounded shadow-[3px_3px_0_#111]" href="#" onClick={(e) => e.preventDefault()}>
              <FileText className="w-4 h-4" /> Download PDF
            </a>
            <p className="text-sm text-neutral-600">Add your actual CV link in the button.</p>
          </div>
        </Section>

      </main>

      <footer className="py-10 text-center text-xs text-neutral-500">
        Built with a love for retro, pixel vibes.
      </footer>
    </div>
  )
}
