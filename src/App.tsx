import { useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type Page =
  | 'home'
  | 'services'
  | 'about'
  | 'partners'
  | 'team'
  | 'pitch-deck'
  | 'contact'
  | 'get-started'

const navItems: { label: string; page: Page }[] = [
  { label: 'Services', page: 'services' },
  { label: 'About', page: 'about' },
  { label: 'Partners', page: 'partners' },
  { label: 'Team', page: 'team' },
  { label: 'Pitch Deck', page: 'pitch-deck' },
  { label: 'Contact', page: 'contact' },
]

const stats = [
  '100+ Successful Listings',
  '150+ Exchange Partners',
  'Top Web3 Consultancy',
  '$500M+ Combined Volume',
  '99% Success Rate',
  'Since 2021',
]

const services = [
  {
    title: 'Exchange Listing',
    text: 'Get your token prepared, positioned, and introduced to leading centralized and decentralized exchanges.',
    points: ['Tier-1 access', 'Fast-track readiness', 'Pre-approval support'],
  },
  {
    title: 'Marketing & PR',
    text: 'Build credible market visibility with launch narratives, content strategy, PR placement, and KOL coordination.',
    points: ['Content strategy', 'Community growth', 'PR management'],
  },
  {
    title: 'Token Creation & Audit',
    text: 'Create, review, and audit your token with technical guidance that keeps the project exchange-ready.',
    points: ['Smart contract dev', 'Security audit', 'Optimization'],
  },
  {
    title: 'Community Management',
    text: 'Run high-signal Telegram, Discord, X, and ambassador communities before and after listing.',
    points: ['Discord management', 'Social media', 'Engagement strategy'],
  },
  {
    title: 'Advertising Campaigns',
    text: 'Launch targeted crypto campaigns across paid media, exchange channels, and retargeting funnels.',
    points: ['Programmatic ads', 'Targeted reach', 'Performance tracking'],
  },
  {
    title: 'Advisory & Consultancy',
    text: 'Get strategic guidance on tokenomics, fundraising, roadmap planning, market making, and investor readiness.',
    points: ['Tokenomics design', 'Fundraising', 'Strategic planning'],
  },
]

const capabilities = [
  'CEX & DEX Listing Strategy',
  'Market Making & Liquidity',
  'Tokenomics Advisory',
  'Community Building',
  'Investor Relations',
  'Post-Listing Support',
]

const journey = [
  ['2021', 'Founded', 'Started as a focused Web3 advisory desk for exchange listing strategy.'],
  ['2022', 'Rapid Growth', 'Expanded into community, PR, and token launch preparation.'],
  ['2023', 'Trusted Network', 'Built broader relationships across exchange and launch partners.'],
  ['2024', 'Full-Suite Agency', 'Added audits, marketing campaigns, and post-listing execution.'],
  ['2025', 'Global Expansion', 'Supported founders across emerging and institutional Web3 markets.'],
  ['2026', 'Next-Gen Launches', 'Integrating AI-assisted strategy, data rooms, and DeFi market planning.'],
]

const exchanges = [
  ['Binance', 'World-leading crypto exchange', '$15B+ Daily Volume'],
  ['KuCoin', 'Global altcoin and Web3 market', '$2B+ Daily Volume'],
  ['Gate.io', 'Millions of traders worldwide', '$1B+ Daily Volume'],
  ['MEXC', 'High-speed listing ecosystem', '2,000+ Markets'],
  ['Bitget', 'Derivatives and spot liquidity', 'Copy-trading leader'],
  ['BingX', 'Social trading exchange', 'Global users'],
  ['CoinMarketCap', 'Market data visibility', 'Data listing'],
  ['CoinGecko', 'Market intelligence', 'Data listing'],
  ['TrustWallet', 'Wallet ecosystem visibility', 'Web3 access'],
  ['MetaMask', 'Wallet and DeFi access', 'On-chain users'],
  ['LBank', 'Global listing network', 'Tier-2 reach'],
  ['ProBit', 'International crypto marketplace', 'Global access'],
  ['BitMart', 'Spot listing and campaigns', 'Launch support'],
  ['Coinstore', 'Emerging-market access', 'Community reach'],
  ['WEEX', 'Fast-growing listing venue', 'Global spot access'],
]

const exchangeLogos: Record<string, string> = {
  Binance: '/exchanges/binance-logo.png',
  KuCoin: '/exchanges/kucoin-logo.png',
  'Gate.io': '/exchanges/gateio-logo.png',
  MEXC: '/exchanges/mexc-logo.png',
  Bitget: '/exchanges/bitget-logo.png',
  BingX: '/exchanges/bingx-logo.png',
  CoinMarketCap: '/exchanges/coinmarketcap-logo.png',
  CoinGecko: '/exchanges/coingecko-logo.png',
  TrustWallet: '/exchanges/trustwallet-logo.png',
  MetaMask: '/exchanges/metamask-logo.png',
  LBank: '/exchanges/lbank-logo.png',
  ProBit: '/exchanges/probit-logo.png',
  BitMart: '/exchanges/bitmart-logo.png',
  Coinstore: '/exchanges/coinstore-logo.png',
  WEEX: '/exchanges/weex-logo.png',
}

const team = [
  ['Listing Strategy', 'Exchange outreach, paperwork, due diligence, and launch-room coordination.'],
  ['Growth & PR', 'Narrative, media, KOLs, paid campaigns, and cross-channel reporting.'],
  ['Technical Advisory', 'Token creation, audit coordination, documentation, and security readiness.'],
]

const faqs = [
  [
    'What exchanges can you help with?',
    'We support CEX, DEX, and data aggregator readiness across exchanges such as Binance, KuCoin, Gate.io, MEXC, Bitget, LBank, ProBit, BitMart, CoinMarketCap, and CoinGecko.',
  ],
  [
    'How long does listing take?',
    'Timing depends on project readiness and the target exchange. Tier-2 listings can move in weeks, while top-tier exchange pathways usually require deeper preparation and review.',
  ],
  [
    'Do you guarantee approvals?',
    'Final decisions belong to exchanges, but we improve readiness, documentation, positioning, and communication so projects approach listing teams professionally.',
  ],
  [
    'Can you support marketing and community?',
    'Yes. We manage PR, community operations, launch campaigns, social channels, and post-listing communication.',
  ],
  [
    'Do you help with token creation and audits?',
    'Yes. We support token planning, deployment guidance, audit coordination, optimization, and exchange-facing technical documentation.',
  ],
]

const howItWorks = [
  ['01', 'Book a Slot', 'Pick a time that works for you through Calendly or start on Telegram.'],
  ['02', 'Strategy Call', 'We audit your project, token, market position, community, and listing fit.'],
  ['03', 'Execute & List', 'We coordinate outreach, paperwork, campaign rhythm, and launch support.'],
]

const founderStats = [
  ['98%', 'Client Satisfaction'],
  ['100+', 'Happy Clients'],
  ['24/7', 'Support Available'],
]

const assistantPrompts = [
  'How do I list on a CEX?',
  'Can you review my tokenomics?',
  'What do exchanges check first?',
  'How much PR do we need before listing?',
]

function getAssistantReply(question: string) {
  const lowerQuestion = question.toLowerCase()

  if (lowerQuestion.includes('cex') || lowerQuestion.includes('list')) {
    return 'For a CEX listing, start with legal/project documents, tokenomics, audit status, community traction, liquidity plan, market-maker readiness, and a clean pitch deck. JosehWeb3 can map the right exchange tier and prepare the listing route.'
  }

  if (lowerQuestion.includes('tokenomic')) {
    return 'A tokenomics review should cover supply, vesting, emissions, utility, liquidity allocation, treasury, team unlocks, and market sustainability. We can help turn that into an exchange-ready structure.'
  }

  if (lowerQuestion.includes('audit') || lowerQuestion.includes('security')) {
    return 'Exchanges usually want evidence that the token contract is secure, verified, and professionally audited. We can coordinate audit readiness, technical documentation, and risk cleanup before applications.'
  }

  if (lowerQuestion.includes('pr') || lowerQuestion.includes('marketing')) {
    return 'PR before listing should build credibility, not just noise. A good campaign includes narrative, media angles, KOLs, community announcements, social proof, and post-listing momentum.'
  }

  if (lowerQuestion.includes('exchange') || lowerQuestion.includes('check')) {
    return 'Exchanges first check project legitimacy, team transparency, token utility, liquidity, market demand, community quality, documentation, compliance posture, and technical safety.'
  }

  return 'Good question. The best next step is a quick readiness review covering your token, documentation, community, target exchanges, audit state, and timeline so JosehWeb3 can recommend the right launch path.'
}

const clientStories = [
  {
    quote:
      'JosehWeb3 transformed our listing strategy. Their exchange relationships and market insight helped us secure visibility faster than expected.',
    client: 'DeFi Protocol Founder',
    result: 'Tier-2 CEX launch support',
  },
  {
    quote:
      'The team gave us a practical roadmap for tokenomics, audit readiness, community growth, and exchange conversations.',
    client: 'GameFi Core Team',
    result: 'Community growth and PR sprint',
  },
  {
    quote:
      'We went from scattered documents to a proper listing data room with a stronger launch narrative and post-listing support plan.',
    client: 'Infrastructure Project',
    result: 'Listing readiness rebuild',
  },
]

function Logo() {
  return (
    <svg className="logo-svg" viewBox="0 0 64 64" role="img" aria-label="JosehWeb3 logo">
      <defs>
        <linearGradient id="logoGradient" x1="8" x2="56" y1="8" y2="58">
          <stop stopColor="#2df2bd" />
          <stop offset="0.54" stopColor="#f5c65b" />
          <stop offset="1" stopColor="#ff6b4a" />
        </linearGradient>
      </defs>
      <rect width="52" height="52" x="6" y="6" rx="16" fill="url(#logoGradient)" />
      <path
        d="M21 21h12v17c0 6-4 10-10 10-3 0-6-1-8-3l4-7c1 1 2 2 4 2s3-1 3-4v-8h-5v-7Zm18 0h10l-8 10c5 1 9 4 9 9 0 6-5 10-12 10-5 0-9-2-12-5l5-6c2 2 4 3 7 3 2 0 4-1 4-3s-2-3-5-3h-4v-5l6-7h-7v-3Z"
        fill="#06110f"
      />
    </svg>
  )
}

function ExchangeLogo({ name }: { name: string }) {
  const [failed, setFailed] = useState(false)
  const logo = exchangeLogos[name]
  const initials = name
    .split(/[ .]/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)

  if (logo && !failed) {
    return (
      <span className="exchange-svg real-logo">
        <img
          src={logo}
          alt={`${name} logo`}
          onError={() => setFailed(true)}
        />
      </span>
    )
  }

  return (
    <svg className="exchange-svg generic" viewBox="0 0 64 64" role="img" aria-label={`${name} badge`}>
      <rect width="64" height="64" rx="18" />
      <path d="M32 12 48 24v16L32 52 16 40V24L32 12Z" />
      <path d="M32 20 41 27v10l-9 7-9-7V27l9-7Z" />
      <text x="32" y="36" textAnchor="middle">
        {initials}
      </text>
    </svg>
  )
}

function AssistantIcon() {
  return (
    <svg className="assistant-icon" viewBox="0 0 64 64" role="img" aria-label="Joseh AI assistant">
      <defs>
        <linearGradient id="assistantGradient" x1="10" x2="54" y1="8" y2="58">
          <stop stopColor="#ffe27a" />
          <stop offset="0.55" stopColor="#f5c65b" />
          <stop offset="1" stopColor="#ff9f43" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="28" fill="url(#assistantGradient)" />
      <path
        d="M18 24c0-5 4-9 9-9h10c5 0 9 4 9 9v12c0 5-4 9-9 9h-7l-8 6v-7c-3-2-4-5-4-8V24Z"
        fill="#071014"
      />
      <circle cx="27" cy="31" r="3" fill="#ffe27a" />
      <circle cx="37" cy="31" r="3" fill="#ffe27a" />
    </svg>
  )
}

function SocialIcon({ name }: { name: string }) {
  const key = name.toLowerCase()

  if (key.includes('twitter') || key.includes('x')) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.6 10.4 22.3 2h-1.8l-6.7 7.3L8.5 2H2.4l8.1 11.1L2.4 22h1.8l7.1-7.8 5.7 7.8h6.1l-8.5-11.6Zm-2.5 2.7-.8-1.1L4.8 3.3h2.8l5.2 7 .8 1.1 6.9 9.3h-2.8l-5.6-7.6Z" />
      </svg>
    )
  }

  if (key.includes('telegram')) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21.8 4.2 18.5 20c-.2 1.1-.9 1.3-1.8.8l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.1L18 6.4c.4-.4-.1-.6-.6-.2L6 13.4l-4.9-1.5c-1.1-.3-1.1-1.1.2-1.6L20.5 3c.9-.3 1.7.2 1.3 1.2Z" />
      </svg>
    )
  }

  if (key.includes('whatsapp')) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2a9.8 9.8 0 0 0-8.5 14.7L2.2 22l5.4-1.4A9.9 9.9 0 1 0 12 2Zm0 18.2c-1.5 0-2.9-.4-4.1-1.1l-.3-.2-3.2.8.9-3.1-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.6-1.4-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.8.4s-1 1-1 2.4 1.1 2.8 1.2 3c.1.2 2.1 3.3 5.2 4.6.7.3 1.3.5 1.8.6.8.2 1.4.2 2-.1.6-.3 1.5-1.2 1.7-2.3.2-1 .2-1.9.1-2.1-.1-.2-.3-.3-.6-.4Z" />
      </svg>
    )
  }

  if (key.includes('linkedin')) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4v11H3v-11Zm6 0h3.8V11h.1c.5-.9 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 6v5.4h-4v-4.8c0-1.2 0-2.7-1.7-2.7s-1.9 1.3-1.9 2.6v4.9H9v-11Z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 8h2V4h-3c-3 0-5 2-5 5v2H6v4h2v7h4v-7h3l1-4h-4V9c0-.6.4-1 1-1h1Z" />
    </svg>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activePage, setActivePage] = useState<Page>('home')
  const [assistantOpen, setAssistantOpen] = useState(false)
  const [newsletterMessage, setNewsletterMessage] = useState('')
  const [chatMessages, setChatMessages] = useState([
    'Hi, I am Joseh AI powered by ChainGPT. Ask me about listings, tokenomics, audits, PR, or community growth.',
  ])
  const [chatInput, setChatInput] = useState('')

  const goToPage = (page: Page) => {
    setActivePage(page)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const sendAssistantMessage = (event: FormEvent) => {
    event.preventDefault()
    if (!chatInput.trim()) return

    setChatMessages((messages) => [
      ...messages,
      chatInput.trim(),
      getAssistantReply(chatInput.trim()),
    ])
    setChatInput('')
  }

  const subscribeNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = String(formData.get('newsletter') || '')

    if (!email.includes('@')) {
      setNewsletterMessage('Please enter a valid email address.')
      return
    }

    setNewsletterMessage('Subscribed. You will receive the next Web3 launch brief.')
    event.currentTarget.reset()
  }

  return (
    <main className="site-shell">
      <nav className="nav">
        <button className="brand" type="button" onClick={() => goToPage('home')}>
          <Logo />
          <span>
            Joseh<span>Web3</span>
          </span>
        </button>

        <button
          className="menu-toggle"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <button
              className={activePage === item.page ? 'active' : ''}
              key={item.page}
              type="button"
              onClick={() => goToPage(item.page)}
            >
              {item.label}
            </button>
          ))}
          <button className="nav-cta" type="button" onClick={() => goToPage('get-started')}>
            Get Started
          </button>
        </div>
      </nav>

      {activePage === 'home' && <HomePage goToPage={goToPage} />}
      {activePage === 'services' && <ServicesPage goToPage={goToPage} />}
      {activePage === 'about' && <AboutPage goToPage={goToPage} />}
      {activePage === 'partners' && <PartnersPage />}
      {activePage === 'team' && <TeamPage />}
      {activePage === 'pitch-deck' && <PitchDeckPage goToPage={goToPage} />}
      {activePage === 'contact' && <ContactPage />}
      {activePage === 'get-started' && <GetStartedPage goToPage={goToPage} />}

      <Footer
        goToPage={goToPage}
        newsletterMessage={newsletterMessage}
        onNewsletterSubmit={subscribeNewsletter}
      />

      <button className="ai-fab" type="button" onClick={() => setAssistantOpen(true)}>
        <AssistantIcon />
      </button>

      {assistantOpen && (
        <aside className="assistant-panel" aria-label="Joseh AI assistant chat">
          <div className="assistant-head">
            <div>
              <AssistantIcon />
              <span>Joseh AI Assistant</span>
              <strong>Powered by ChainGPT</strong>
            </div>
            <button type="button" onClick={() => setAssistantOpen(false)} aria-label="Close AI chat">
              x
            </button>
          </div>
          <div className="assistant-messages">
            {chatMessages.map((message, index) => (
              <p className={index % 2 === 0 ? 'bot' : 'user'} key={`${message}-${index}`}>
                {message}
              </p>
            ))}
          </div>
          <div className="assistant-prompts">
            {assistantPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => {
                  setChatMessages((messages) => [
                    ...messages,
                    prompt,
                    getAssistantReply(prompt),
                  ])
                }}
              >
                {prompt}
              </button>
            ))}
          </div>
          <form className="assistant-form" onSubmit={sendAssistantMessage}>
            <input
              value={chatInput}
              onChange={(event) => setChatInput(event.target.value)}
              placeholder="Ask about listing, audit, PR..."
            />
            <button type="submit">Send</button>
          </form>
        </aside>
      )}
    </main>
  )
}

function HomePage({ goToPage }: { goToPage: (page: Page) => void }) {
  return (
    <>
      <section className="hero">
        <div className="hero-copy centered">
          <p className="eyebrow">Trusted by 100+ projects worldwide</p>
          <h1>
            Joseh Web3
            <span>Solutions</span>
          </h1>
          <p className="hero-text">
            We help blockchain projects access global liquidity, exchange listings, market
            credibility, PR, audits, community growth, and token launch support.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="https://calendly.com/" target="_blank" rel="noreferrer">
              Schedule Free Call
            </a>
            <a className="btn secondary" href="https://t.me/" target="_blank" rel="noreferrer">
              Chat on Telegram
            </a>
          </div>
          <div className="availability">Available Mon - Fri, 9AM - 6PM UTC | Response within 24 hours</div>
        </div>

        <div className="hero-proof">
          <article>
            <strong>94%</strong>
            <span>Listing readiness framework</span>
          </article>
          <article>
            <strong>150+</strong>
            <span>Exchange partner network</span>
          </article>
          <article>
            <strong>24/7</strong>
            <span>Launch-room support</span>
          </article>
        </div>
      </section>

      <Ticker />

      <section className="section">
        <div className="section-heading centered">
          <p className="eyebrow">What we do</p>
          <h2>Our Services</h2>
          <p>
            Comprehensive Web3 solutions designed to accelerate your crypto project's growth and
            market presence.
          </p>
        </div>
        <div className="service-grid">
          {services.map((service, index) => (
            <article className="service-card" key={service.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <ul>
                {service.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <button type="button" onClick={() => goToPage('services')}>
                Learn more
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="section split">
        <div>
          <p className="eyebrow">Our Story</p>
          <h2>About JosehWeb3 Solutions</h2>
          <p className="large-copy">
            A premier consultancy specializing in cryptocurrency exchange listings and strategic
            Web3 growth, helping blockchain projects access global liquidity, visibility, and
            credibility.
          </p>
          <div className="quick-actions left">
            <button type="button" onClick={() => goToPage('about')}>
              Read Our Story
            </button>
            <button type="button" onClick={() => goToPage('contact')}>
              Start a Conversation
            </button>
          </div>
        </div>
        <div className="stat-block">
          {['100+ Successful Listings', '150+ Exchange Partners', '5+ Years Experience', '99% Success Rate'].map((item) => (
            <div key={item}>
              <strong>{item.split(' ')[0]}</strong>
              <span>{item.replace(item.split(' ')[0], '').trim()}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading centered">
          <p className="eyebrow">Core Capabilities</p>
          <h2>Everything your token needs before and after market entry.</h2>
        </div>
        <div className="capability-grid">
          {capabilities.map((item) => (
            <article className="capability" key={item}>
              <h3>{item}</h3>
              <p>
                Strategic support, documentation, execution systems, and reporting for serious
                Web3 teams.
              </p>
            </article>
          ))}
        </div>
      </section>

      <ExchangeNetwork />

      <section className="section success-section">
        <div className="section-heading centered">
          <p className="eyebrow">Client Success Stories</p>
          <h2>Trusted by ambitious Web3 teams</h2>
          <p>
            Hear from projects we have helped reach stronger visibility across the global exchange
            landscape.
          </p>
        </div>
        <div className="testimonial">
          <p>
            "JosehWeb3 helped us organize our listing materials, sharpen our market story, and
            launch with a much stronger exchange-readiness plan."
          </p>
          <strong>Core Team · Web3 Client</strong>
        </div>
        <div className="founder-stats">
          {founderStats.map(([metric, label]) => (
            <article key={label}>
              <strong>{metric}</strong>
              <span>{label}</span>
            </article>
          ))}
        </div>
      </section>

      <Consultation goToPage={goToPage} />

      <section className="section how-section">
        <div className="section-heading centered">
          <p className="eyebrow">How It Works</p>
          <h2>From first call to listing execution.</h2>
        </div>
        <div className="how-grid">
          {howItWorks.map(([number, title, text]) => (
            <article data-step={number} key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <HomeFaq goToPage={goToPage} />
      <HomeContact />
    </>
  )
}

function Ticker() {
  return (
    <section className="ticker" aria-label="JosehWeb3 credibility metrics">
      <div>
        {[...stats, ...stats, ...stats].map((stat, index) => (
          <span key={`${stat}-${index}`}>{stat}</span>
        ))}
      </div>
    </section>
  )
}

function ServicesPage({ goToPage }: { goToPage: (page: Page) => void }) {
  return (
    <>
      <PageHero label="What We Do" title="Our Services" text="A full Web3 growth stack for listing-ready tokens, serious founders, and post-launch communities." />
      <section className="section">
        <div className="service-grid">
          {services.map((service, index) => (
            <article className="service-card" key={service.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <ul>
                {service.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <button type="button" onClick={() => goToPage('contact')}>
                Learn more
              </button>
            </article>
          ))}
        </div>
      </section>
      <Consultation goToPage={goToPage} />
    </>
  )
}

function AboutPage({ goToPage }: { goToPage: (page: Page) => void }) {
  return (
    <>
      <PageHero
        label="Our Story"
        title="About JosehWeb3 Solutions"
        text="A premier consultancy specializing in cryptocurrency exchange listings and strategic Web3 growth."
      />
      <section className="section split">
        <div className="stat-block">
          {['100+ Successful Listings', '150+ Exchange Partners', '5+ Years Experience', '99% Success Rate'].map((item) => (
            <div key={item}>
              <strong>{item.split(' ')[0]}</strong>
              <span>{item.replace(item.split(' ')[0], '').trim()}</span>
            </div>
          ))}
        </div>
        <div className="story-panel">
          <h3>Who We Are</h3>
          <p>
            From initial strategy through post-listing support, our team navigates the complexities
            of the crypto landscape so founders can focus on building. Every engagement is tailored
            to the project, market position, and growth ambition.
          </p>
          <p>
            We combine exchange readiness, technical preparation, tokenomics, community execution,
            PR, and launch operations into one practical growth system.
          </p>
          <button className="text-link" type="button" onClick={() => goToPage('contact')}>
            Start a conversation
          </button>
        </div>
      </section>
      <section className="section journey">
        <div className="section-heading centered">
          <p className="eyebrow">Our Journey</p>
          <h2>Built through cycles, launches, and real market execution.</h2>
        </div>
        <div className="journey-track">
          {journey.map(([year, title, text]) => (
            <article key={year}>
              <span>{year}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

function PartnersPage() {
  return (
    <>
      <PageHero
        label="Trusted Network"
        title="Trusted Exchange Partners"
        text="Direct listing preparation for leading crypto exchanges, market data platforms, and launch ecosystems."
      />
      <ExchangeNetwork />
    </>
  )
}

function TeamPage() {
  return (
    <>
      <PageHero
        label="Client Success Stories"
        title="Trusted by ambitious Web3 teams"
        text="A focused operator team for listing strategy, launch execution, community growth, and technical readiness."
      />
      <section className="section">
        <div className="founder-stats team-stats">
          {[
            ['42%', 'Average pre-listing community growth'],
            ['18+', 'Listing workstreams delivered'],
            ['24/7', 'Launch room coverage'],
          ].map(([metric, label]) => (
            <article key={label}>
              <strong>{metric}</strong>
              <span>{label}</span>
            </article>
          ))}
        </div>
        <div className="team-grid">
          {team.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="client-story-grid">
          {clientStories.map((story, index) => (
            <article key={story.client}>
              <div className="client-avatar">{String.fromCharCode(65 + index)}</div>
              <p>"{story.quote}"</p>
              <strong>{story.client}</strong>
              <span>{story.result}</span>
            </article>
          ))}
        </div>
        <div className="testimonial">
          <p>
            "JosehWeb3 helped us understand exchange requirements, organize our token documents,
            and build a clearer go-to-market plan before launch."
          </p>
          <strong>Core Team · Web3 Client</strong>
        </div>
      </section>
    </>
  )
}

function PitchDeckPage({ goToPage }: { goToPage: (page: Page) => void }) {
  return (
    <>
      <PageHero
        label="Pitch Deck"
        title="Listing strategy, tokenomics, and launch execution in one deck."
        text="Use this page as the project-facing overview for founders, partners, investors, and exchange conversations."
      />
      <section className="section">
        <div className="deck-showcase">
          <div>
            <p className="eyebrow">Investor-ready overview</p>
            <h2>Everything a listing desk wants to understand quickly.</h2>
            <p>
              Present your token, market, technical readiness, community, liquidity plan, and
              growth strategy in one credible structure.
            </p>
          </div>
          <div className="deck-card">
            <Logo />
            <span>JosehWeb3 Pitch Deck</span>
            <strong>Listing Strategy · Tokenomics · Growth</strong>
          </div>
        </div>
        <div className="capability-grid">
          {capabilities.map((item) => (
            <article className="capability" key={item}>
              <h3>{item}</h3>
              <p>
                Structured support with clear documentation, launch rhythm, and measurable next
                steps for your token.
              </p>
            </article>
          ))}
        </div>
      </section>
      <section className="section faq">
        <div className="section-heading centered">
          <p className="eyebrow">FAQ</p>
          <h2>Everything you need to know before the first call.</h2>
        </div>
        <FaqAccordion />
      </section>
      <Consultation goToPage={goToPage} />
    </>
  )
}

function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        title="Get in touch"
        text="Ready to launch your token on top-tier exchanges? Reach out and we will craft a custom listing strategy."
      />
      <section className="section contact">
        <div className="contact-info">
          <article>
            <span>Email Us</span>
            <strong>hello@josehweb3.com</strong>
          </article>
          <article>
            <span>Schedule a Call</span>
            <strong>Book on Calendly</strong>
          </article>
          <article>
            <span>Availability</span>
            <strong>Mon - Fri, 9AM - 6PM UTC</strong>
          </article>
          <div className="follow-grid">
            <a href="https://twitter.com/" target="_blank" rel="noreferrer">
              <SocialIcon name="Twitter" />
              Twitter / X
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
              <SocialIcon name="LinkedIn" />
              LinkedIn
            </a>
            <a href="https://t.me/" target="_blank" rel="noreferrer">
              <SocialIcon name="Telegram" />
              Telegram
            </a>
            <a href="https://wa.me/" target="_blank" rel="noreferrer">
              <SocialIcon name="WhatsApp" />
              WhatsApp
            </a>
            <a href="https://facebook.com/" target="_blank" rel="noreferrer">
              <SocialIcon name="Facebook" />
              Facebook
            </a>
          </div>
        </div>

        <form className="contact-form">
          <h3>Send us a message</h3>
          <label>
            Your Name
            <input type="text" placeholder="Your name" />
          </label>
          <label>
            Email Address
            <input type="email" placeholder="you@company.com" />
          </label>
          <label>
            Project Name
            <input type="text" placeholder="Token or company name" />
          </label>
          <label>
            Message
            <textarea placeholder="Tell us about your token, exchange target, timeline, or campaign." />
          </label>
          <button className="btn primary" type="button">
            Send Message
          </button>
          <div className="newsletter">
            <input type="email" placeholder="Newsletter email" aria-label="Newsletter email" />
            <button type="button">Subscribe</button>
          </div>
        </form>
      </section>
    </>
  )
}

function ExchangeNetwork() {
  const marqueeRows = [exchanges.slice(0, 10), exchanges.slice(5, 15)]

  return (
    <section className="section exchange-section">
      <div className="section-heading centered">
        <p className="eyebrow">Trusted Network</p>
        <h2>Trusted Exchange Partners</h2>
        <p>
          Direct relationships with 150+ leading cryptocurrency exchanges worldwide, ensuring
          maximum visibility and liquidity for your token.
        </p>
      </div>
      <div className="exchange-marquee-stage" aria-label="Animated exchange logo network">
        {marqueeRows.map((row, rowIndex) => (
          <div className={`exchange-marquee ${rowIndex === 1 ? 'reverse' : ''}`} key={rowIndex}>
            <div className="exchange-track">
              {[...row, ...row, ...row].map(([name], index) => (
                <article key={`${name}-marquee-${rowIndex}-${index}`}>
                  <ExchangeLogo name={name} />
                  <span>{name}</span>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
      <h3 className="network-title">Tier-1 Partners</h3>
      <div className="tier-grid">
        {exchanges.slice(0, 3).map(([name, text, volume]) => (
          <article className="tier-card" key={name}>
            <ExchangeLogo name={name} />
            <h3>{name}</h3>
            <p>{text}</p>
            <strong>{volume}</strong>
          </article>
        ))}
      </div>
      <div className="network-stats">
        {[
          ['150+', 'Exchange Partners'],
          ['100+', 'Successful Listings'],
          ['$500M+', 'Combined Volume'],
          ['99%', 'Success Rate'],
        ].map(([metric, label]) => (
          <article key={label}>
            <strong>{metric}</strong>
            <span>{label}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

function HomeFaq({ goToPage }: { goToPage: (page: Page) => void }) {
  return (
    <section className="section faq">
      <div className="section-heading centered">
        <p className="eyebrow">FAQ</p>
        <h2>Frequently Asked Questions</h2>
        <p>Everything you need to know about our exchange listing services and Web3 solutions.</p>
      </div>
      <FaqAccordion />
      <div className="center-cta">
        <p>Still have questions? We're here to help.</p>
        <button className="btn primary" type="button" onClick={() => goToPage('contact')}>
          Contact Us
        </button>
      </div>
    </section>
  )
}

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="faq-list">
      {faqs.map(([q, a], index) => {
        const isOpen = openIndex === index

        return (
          <article className={`faq-item ${isOpen ? 'open' : ''}`} key={q}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {q}
              <strong>{isOpen ? '-' : '+'}</strong>
            </button>
            <div className="faq-answer" aria-hidden={!isOpen}>
              <p>{a}</p>
            </div>
          </article>
        )
      })}
    </div>
  )
}

function GetStartedPage({ goToPage }: { goToPage: (page: Page) => void }) {
  return (
    <>
      <PageHero
        label="Schedule Free Consultation"
        title="Ready to list your token?"
        text="Book a no-commitment strategy call and get a custom roadmap for exchange listings, PR, token audit, and community growth."
      />
      <section className="section get-started-grid">
        <div className="booking-card">
          <p className="eyebrow">Free strategy call</p>
          <h2>Choose your launch path</h2>
          <p>
            We will review your token, documentation, community, liquidity position, and exchange
            targets, then recommend the fastest credible route.
          </p>
          <div className="booking-options">
            {[
              ['30 min', 'Listing Readiness Review'],
              ['45 min', 'Tokenomics & Audit Advisory'],
              ['60 min', 'Full Launch Strategy Session'],
            ].map(([time, title]) => (
              <article key={title}>
                <strong>{time}</strong>
                <span>{title}</span>
              </article>
            ))}
          </div>
          <div className="consult-actions">
            <a className="btn primary" href="https://calendly.com/" target="_blank" rel="noreferrer">
              Open Calendly
            </a>
            <a className="btn secondary" href="https://wa.me/" target="_blank" rel="noreferrer">
              Chat on WhatsApp
            </a>
          </div>
        </div>
        <form className="contact-form">
          <h3>Tell us about your project</h3>
          <label>
            Project Name
            <input type="text" placeholder="Token or company name" />
          </label>
          <label>
            Target Service
            <input type="text" placeholder="Exchange listing, audit, PR..." />
          </label>
          <label>
            Telegram or WhatsApp
            <input type="text" placeholder="@username or phone number" />
          </label>
          <label>
            Timeline
            <textarea placeholder="When do you want to launch or list?" />
          </label>
          <button className="btn primary" type="button">
            Submit Project
          </button>
          <button className="text-link" type="button" onClick={() => goToPage('pitch-deck')}>
            View pitch deck first
          </button>
        </form>
      </section>
      <section className="section how-section">
        <div className="section-heading centered">
          <p className="eyebrow">What happens next</p>
          <h2>A clear process like a serious exchange listing desk.</h2>
        </div>
        <div className="how-grid">
          {howItWorks.map(([number, title, text]) => (
            <article data-step={number} key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

function HomeContact() {
  return (
    <section className="section contact home-contact">
      <div className="contact-info">
        <p className="eyebrow">Contact</p>
        <h2>Get in Touch</h2>
        <p className="large-copy">
          Ready to launch your token on top-tier exchanges? Reach out and our team will craft a
          custom listing strategy for your project.
        </p>
        <article>
          <span>Email Us</span>
          <strong>hello@josehweb3.com</strong>
        </article>
        <article>
          <span>Schedule a Call</span>
          <strong>Book on Calendly</strong>
        </article>
        <article>
          <span>Availability</span>
          <strong>Mon - Fri, 9AM - 6PM UTC</strong>
        </article>
      </div>
      <form className="contact-form">
        <h3>Send us a message</h3>
        <p>Fill in the details below and we will get back to you within 24 hours.</p>
        <label>
          Your Name
          <input type="text" placeholder="Your name" />
        </label>
        <label>
          Email Address
          <input type="email" placeholder="you@company.com" />
        </label>
        <label>
          Project Name
          <input type="text" placeholder="Token or company name" />
        </label>
        <label>
          Message
          <textarea placeholder="Tell us about your token, target exchanges, or campaign." />
        </label>
        <button className="btn primary" type="button">
          Send Message
        </button>
      </form>
    </section>
  )
}

function Footer({
  goToPage,
  newsletterMessage,
  onNewsletterSubmit,
}: {
  goToPage: (page: Page) => void
  newsletterMessage: string
  onNewsletterSubmit: (event: FormEvent<HTMLFormElement>) => void
}) {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <button className="brand" type="button" onClick={() => goToPage('home')}>
            <Logo />
            <span>
              Joseh<span>Web3</span>
            </span>
          </button>
          <p>
            Premium Web3 listing, tokenomics, PR, audit, and community growth support for founders
            preparing serious market launches.
          </p>
          <div className="footer-socials">
            <a href="https://twitter.com/" target="_blank" rel="noreferrer">
              <SocialIcon name="Twitter" />
              Twitter
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
              <SocialIcon name="LinkedIn" />
              LinkedIn
            </a>
            <a href="https://t.me/" target="_blank" rel="noreferrer">
              <SocialIcon name="Telegram" />
              Telegram
            </a>
            <a href="https://wa.me/" target="_blank" rel="noreferrer">
              <SocialIcon name="WhatsApp" />
              WhatsApp
            </a>
          </div>
        </div>

        <div className="footer-links">
          <div>
            <h3>Explore</h3>
            {navItems.map((item) => (
              <button key={item.page} type="button" onClick={() => goToPage(item.page)}>
                {item.label}
              </button>
            ))}
          </div>
          <div>
            <h3>Services</h3>
            {services.slice(0, 5).map((service) => (
              <button key={service.title} type="button" onClick={() => goToPage('services')}>
                {service.title}
              </button>
            ))}
          </div>
          <div>
            <h3>Contact</h3>
            <span>hello@josehweb3.com</span>
            <span>Mon - Fri, 9AM - 6PM UTC</span>
            <button type="button" onClick={() => goToPage('get-started')}>
              Schedule Free Call
            </button>
          </div>
        </div>
      </div>

      <div className="footer-newsletter">
        <div>
          <h3>Join the Web3 launch brief</h3>
          <p>Exchange listing insights, token readiness notes, and launch growth updates.</p>
        </div>
        <form className="newsletter" onSubmit={onNewsletterSubmit}>
          <input name="newsletter" type="email" placeholder="Newsletter email" aria-label="Newsletter email" />
          <button type="submit">Subscribe</button>
        </form>
        {newsletterMessage && <p className="newsletter-status">{newsletterMessage}</p>}
      </div>

      <div className="footer-bottom">
        <span>© 2026 JosehWeb3 Solutions. All rights reserved.</span>
        <span>Built for exchange-ready Web3 teams.</span>
      </div>
    </footer>
  )
}

function PageHero({ label, title, text }: { label: string; title: string; text: string }) {
  return (
    <section className="page-hero centered">
      <p className="eyebrow">{label}</p>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  )
}

function Consultation({ goToPage }: { goToPage: (page: Page) => void }) {
  return (
    <section className="section consult-band">
      <div>
        <p className="eyebrow">Limited Availability</p>
        <h2>Schedule a free consultation</h2>
        <p>
          Book a no-commitment strategy call and get a clear roadmap for exchange readiness,
          tokenomics, marketing, and community growth.
        </p>
        <div className="booked-founders" aria-label="Founders recently booked">
          {['A', 'B', 'C', 'D'].map((letter) => (
            <span key={letter}>{letter}</span>
          ))}
          <strong>127 founders booked strategy calls this quarter</strong>
        </div>
      </div>
      <div className="consult-widget">
        <div className="consult-widget-head">
          <span>Next available</span>
          <strong>Today · 30 min</strong>
        </div>
        <div className="consult-steps">
          <span>01 Project review</span>
          <span>02 Exchange fit</span>
          <span>03 Launch roadmap</span>
        </div>
        <div className="consult-actions">
          <a className="btn primary" href="https://calendly.com/" target="_blank" rel="noreferrer">
            Schedule Free Call
          </a>
          <button className="btn secondary" type="button" onClick={() => goToPage('contact')}>
            Send Us Message
          </button>
        </div>
      </div>
    </section>
  )
}

export default App
