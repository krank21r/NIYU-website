import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import ScrollToTop from '../ScrollToTop'

const pageNames = {
  '/terms': 'Terms & Conditions',
  '/privacy': 'Privacy Policy',
  '/refund': 'Refund Policy',
  '/shipping': 'Shipping Policy',
}

export default function LegalLayout({ title, lastUpdated, children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const pageName = pageNames[location.pathname] || title

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://niyuperfumes.vercel.app/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: pageName,
        item: `https://niyuperfumes.vercel.app${location.pathname}`,
      },
    ],
  }

  return (
    <div className="bg-white min-h-screen relative">
      <ScrollToTop />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" aria-hidden="true"
        style={{
          backgroundImage: 'linear-gradient(110deg, transparent 25%, rgba(28,28,28,0.4) 50%, transparent 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer-gold 5s linear infinite',
        }}
      />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-20">
        {/* Visual breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 text-[12px] font-body text-ink-subtle">
            <li>
              <button onClick={() => navigate('/')} className="hover:text-gold transition-colors min-h-[44px] inline-flex items-center">
                Home
              </button>
            </li>
            <li aria-hidden="true" className="text-ink/20">/</li>
            <li aria-current="page" className="text-ink-soft font-medium">
              {pageName}
            </li>
          </ol>
        </nav>

        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm font-body text-ink-subtle hover:text-gold transition-colors mb-10 min-h-[44px]"
          aria-label="Back to home"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to NIYU
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          <h1 className="font-heading text-3xl sm:text-4xl tracking-[0.15em] text-ink mb-3">{title}</h1>
          <p className="text-xs font-body text-ink-subtle mb-12">Last updated: {lastUpdated}</p>

          <div className="prose prose-sm font-body text-ink/80 leading-relaxed space-y-6">
            {children}
          </div>
        </motion.div>

        {/* Bottom nav */}
        <div className="mt-16 pt-8 border-t border-ink/5 flex flex-wrap gap-4 text-xs font-body">
          <button onClick={() => navigate('/terms')} className="text-ink-subtle hover:text-gold transition-colors">Terms & Conditions</button>
          <button onClick={() => navigate('/privacy')} className="text-ink-subtle hover:text-gold transition-colors">Privacy Policy</button>
          <button onClick={() => navigate('/refund')} className="text-ink-subtle hover:text-gold transition-colors">Refund Policy</button>
          <button onClick={() => navigate('/shipping')} className="text-ink-subtle hover:text-gold transition-colors">Shipping Policy</button>
        </div>
      </div>
    </div>
  )
}
