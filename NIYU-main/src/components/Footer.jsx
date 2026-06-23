import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RevealUp from './RevealUp'

const features = [
  { title: 'Free Shipping', desc: '' },
  { title: 'Secure Payment', desc: 'UPI only' },
  { title: 'Premium Quality', desc: 'Pure oils only' },
]

export default function Footer() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  return (
    <footer className="bg-surface-secondary">
      {/* ─── Features Bar ─── */}
      <div className="border-b border-[rgba(38,38,38,0.08)]">
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-[rgba(38,38,38,0.08)]">
            {features.map((f, i) => (
              <RevealUp key={f.title} delay={i * 100}>
                <div className="text-center md:px-6">
                  <p className="font-heading font-black text-sm uppercase tracking-[0.15em] text-text-primary mb-1">
                    {f.title}
                  </p>
                  {f.desc && (
                    <p className="font-body text-xs text-text-secondary/70">
                      {f.desc}
                    </p>
                  )}
                </div>
              </RevealUp>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Main Footer Content ─── */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <RevealUp>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-16 border-b border-[rgba(38,38,38,0.08)]">
            {/* Brand — 4 cols */}
            <div className="md:col-span-4">
              <div className="flex items-baseline gap-1 mb-5">
                <span className="text-3xl font-heading font-bold tracking-[0.2em] text-text-primary leading-none">
                  NIYU
                </span>
                <sup className="text-[11px] font-body text-text-tertiary">&reg;</sup>
              </div>
              <p className="text-sm font-body font-light text-text-secondary leading-relaxed max-w-sm mb-8">
                Pure oils, pure luxury. Handcrafted fragrances that tell your story.
              </p>
              {/* Newsletter */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-4 font-body">
                  Get Updates
                </p>
                <div className="flex gap-2 max-w-xs">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="flex-1 bg-white/60 border border-[rgba(38,38,38,0.12)] px-4 py-2.5 text-sm font-body text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                  />
                  <button className="bg-text-primary text-white text-[10px] font-bold uppercase tracking-[0.15em] px-5 py-2.5 hover:bg-accent transition-colors duration-300 font-body">
                    Join
                  </button>
                </div>
              </div>
            </div>

            {/* Navigate — 2 cols */}
            <div className="md:col-span-2 md:col-start-7">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-6 font-body">
                Navigate
                <span className="block w-6 h-[1px] bg-accent mt-2" />
              </h3>
              <ul className="space-y-3">
                <li><button onClick={() => { navigate('/'); document.getElementById('specials')?.scrollIntoView({ behavior: 'smooth' })}} className="text-sm font-body font-light text-text-secondary hover:text-accent transition-colors duration-200">Shop</button></li>
                <li><button onClick={() => { navigate('/'); document.getElementById('attars')?.scrollIntoView({ behavior: 'smooth' })}} className="text-sm font-body font-light text-text-secondary hover:text-accent transition-colors duration-200">Attars</button></li>
                <li><button onClick={() => { navigate('/'); document.getElementById('car-perfumes')?.scrollIntoView({ behavior: 'smooth' })}} className="text-sm font-body font-light text-text-secondary hover:text-accent transition-colors duration-200">Aero Drive</button></li>
                <li><button onClick={() => { navigate('/'); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}} className="text-sm font-body font-light text-text-secondary hover:text-accent transition-colors duration-200">About</button></li>
                <li><button onClick={() => { navigate('/'); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}} className="text-sm font-body font-light text-text-secondary hover:text-accent transition-colors duration-200">Contact</button></li>
              </ul>
            </div>

            {/* Legal — 2 cols */}
            <div className="md:col-span-2">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-6 font-body">
                Legal
                <span className="block w-6 h-[1px] bg-accent mt-2" />
              </h3>
              <ul className="space-y-3">
                <li><a href="/terms" className="text-sm font-body font-light text-text-secondary hover:text-accent transition-colors duration-200" onClick={(e) => { e.preventDefault(); navigate('/terms'); window.scrollTo(0,0) }}>Terms &amp; Conditions</a></li>
                <li><a href="/privacy" className="text-sm font-body font-light text-text-secondary hover:text-accent transition-colors duration-200" onClick={(e) => { e.preventDefault(); navigate('/privacy'); window.scrollTo(0,0) }}>Privacy Policy</a></li>
                <li><a href="/refund" className="text-sm font-body font-light text-text-secondary hover:text-accent transition-colors duration-200" onClick={(e) => { e.preventDefault(); navigate('/refund'); window.scrollTo(0,0) }}>Refund Policy</a></li>
                <li><a href="/shipping" className="text-sm font-body font-light text-text-secondary hover:text-accent transition-colors duration-200" onClick={(e) => { e.preventDefault(); navigate('/shipping'); window.scrollTo(0,0) }}>Shipping Policy</a></li>
              </ul>
            </div>

            {/* Need Help? — 2 cols */}
            <div className="md:col-span-2">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-6 font-body">
                Need Help?
                <span className="block w-6 h-[1px] bg-accent mt-2" />
              </h3>
              <ul className="space-y-3">
                <li><a href="https://wa.me/916302040779" target="_blank" rel="noopener noreferrer" className="text-sm font-body font-light text-text-secondary hover:text-accent transition-colors duration-200">WhatsApp Us</a></li>
                <li><a href="mailto:support@niyuperfumes.com" className="text-sm font-body font-light text-text-secondary hover:text-accent transition-colors duration-200">Email Support</a></li>
              </ul>
            </div>
          </div>
        </RevealUp>

        {/* ─── Bottom Bar ─── */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-body text-text-primary">
              &copy; {new Date().getFullYear()} NIYU Perfumes
            </span>
            <span className="text-sm font-body text-text-primary">·</span>
            <span className="text-sm font-body text-text-primary">India</span>
            <span className="text-sm font-body text-text-primary">·</span>
            <span className="text-sm font-body text-text-primary">Crafted by Krank</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/terms" className="text-sm font-body text-text-primary hover:text-accent transition-colors" onClick={(e) => { e.preventDefault(); navigate('/terms'); window.scrollTo(0,0) }}>
              Terms
            </a>
            <a href="/privacy" className="text-sm font-body text-text-primary hover:text-accent transition-colors" onClick={(e) => { e.preventDefault(); navigate('/privacy'); window.scrollTo(0,0) }}>
              Privacy
            </a>
            <a href="/refund" className="text-sm font-body text-text-primary hover:text-accent transition-colors" onClick={(e) => { e.preventDefault(); navigate('/refund'); window.scrollTo(0,0) }}>
              Refund
            </a>
            <a href="/shipping" className="text-sm font-body text-text-primary hover:text-accent transition-colors" onClick={(e) => { e.preventDefault(); navigate('/shipping'); window.scrollTo(0,0) }}>
              Shipping
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
