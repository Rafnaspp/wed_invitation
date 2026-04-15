'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { api, Invitation } from '@/lib/api'

export default function InvitationPage({
  forceOpen = false,
  data = null,
}: {
  forceOpen?: boolean;
  data?: any | null;
}) {
  const themeContent = {
  islamic: {
    header: "بسم الله الرحمن الرحيم",
    subHeader: "In the name of Allah, The most beneficial and the most gracious",
    inviteText: "With gratitude to Allah, please join us to celebrate the Nikah of",
    blessing: "Insha Allah",
    icon: "❧",
  },
  hindu: {
    header: "|| श्री गणेशाय नमः ||",
    subHeader: "With the divine blessings of God, we cordially invite you",
    inviteText: "We request the honor of your presence at the wedding ceremony of",
    blessing: "Mangalam Bhagwan Vishnu",
    icon: "🪔",
  },
  christian: {
    header: "God has made everything beautiful in its time",
    subHeader: "Ecclesiastes 3:11",
    inviteText: "We invite you to witness the joining of two hearts in Holy Matrimony",
    blessing: "Bound by Love, Blessed by God",
    icon: "✝",
  },
  general: {
    header: "Together with our Families",
    subHeader: "We invite you to celebrate our new beginning",
    inviteText: "Please join us for the wedding celebration of",
    blessing: "Forever Begins Today",
    icon: "♥",
  }
};
  const params = useParams()
  const searchParams = useSearchParams()
  const isPreview = searchParams.get('preview') === 'true'
  const router = useRouter()
  const [invitation, setInvitation] = useState<Invitation | null>(data)
  const [loading, setLoading] = useState(!data)
  const shouldSkipEnvelope = forceOpen || isPreview
const [envelopeState, setEnvelopeState] = useState<'closed' | 'opening' | 'opened'>(
  shouldSkipEnvelope ? 'opened' : 'closed'
)
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' })
  const revealRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const fetchInvitation = async () => {
      if(data){
        return 
      }
      try {
        const invitationData = await api.getInvitation(params.slug as string)
        if (invitationData) {
          setInvitation(invitationData)
        } else {
          setInvitation(getMockInvitation(params.slug as string))
        }
      } catch {
        setInvitation(getMockInvitation(params.slug as string))
      } finally {
        setLoading(false)
      }
    }
    fetchInvitation()
  }, [params.slug])
  
  function getMockInvitation(slug: string): Invitation {
    return {
  _id: '1',
  slug,
  groom_name: 'John Doe',
  groom_father: 'Mr. Michael Doe',
  groom_mother: 'Mrs. Sarah Doe',
  groom_address: '221B Lexington Avenue, Manhattan, New York, NY 10016, USA',

  side: 'groom',
  bride_name: 'Sara Doe',
  bride_father: 'Mr. Michle Ali',
  bride_mother: 'Mrs. Sona',
  bride_address: '45-12 30th Avenue, Astoria, Queens, New York, NY 11103, USA',

  theme: 'islamic',

  event1_name: 'Nikkah Ceremony',
  event1_date: '2026-04-26',
  event1_time: '16:00',
  event1_location: 'Islamic Cultural Center of New York, 1711 3rd Ave, New York, NY 10128, USA',
  event1_maps_url: 'https://maps.google.com/?q=Islamic+Cultural+Center+of+New+York',

  event2_name: 'Wedding Reception',
  event2_date: '2026-04-27',
  event2_time: '10:00',
  event2_location: 'The Astorian, 28-50 31st St, Astoria, NY 11102, USA',
  event2_maps_url: 'https://maps.google.com/?q=The+Astorian+NYC',

  created_at: new Date().toISOString()
}
  }

  // Countdown timer
  useEffect(() => {
    if (!invitation?.event1_date || !invitation?.event1_time) return
    const [hours, minutes] = (invitation.event1_time || '00:00').split(':')
    const targetDate = new Date(invitation.event1_date)
    targetDate.setHours(parseInt(hours), parseInt(minutes), 0, 0)
    const countDownDate = targetDate.getTime()

    const tick = () => {
      const now = new Date().getTime()
      const distance = countDownDate - now
      if (distance < 0) {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' })
        return
      }
      const d = Math.floor(distance / (1000 * 60 * 60 * 24))
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const s = Math.floor((distance % (1000 * 60)) / 1000)
      setTimeLeft({
        days: d < 10 ? '0' + d : String(d),
        hours: h < 10 ? '0' + h : String(h),
        minutes: m < 10 ? '0' + m : String(m),
        seconds: s < 10 ? '0' + s : String(s),
      })
    }
    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [invitation])

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { root: null, rootMargin: '0px', threshold: 0.15 }
    )
    revealRefs.current.forEach((el) => { if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [loading])

  const addRevealRef = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el)
  }

  const handleEnvelopeClick = () => {
    if (forceOpen) return;

    if (envelopeState !== 'closed') return
    setEnvelopeState('opening')
    setTimeout(() => {
      setEnvelopeState('opened')
      window.scrollTo(0, 0)
    }, 800)
  }

  const formatDate = (dateStr: string, opts: Intl.DateTimeFormatOptions) =>
    new Date(dateStr).toLocaleDateString('en-US', opts)

  const formatTime = (timeStr: string) => {
    if (!timeStr) return ''
    const [hours, minutes] = timeStr.split(':')
    const h = parseInt(hours)
    const ampm = h >= 12 ? 'PM' : 'AM'
    const h12 = h % 12 || 12
    return `${h12}:${minutes} ${ampm}`
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--off-white)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner" />
        <style>{`.spinner{width:60px;height:60px;border:3px solid #e0d9c8;border-top-color:#2D5A47;border-radius:50%;animation:spin 0.8s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    )
  }

  if (!invitation) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#2D5A47', fontSize: '1.8rem' }}>Invitation Not Found</h1>
        <button onClick={() => router.push('/')} className="gradient-btn">Go Home</button>
      </div>
    )
  }

  const event1DateFormatted = formatDate(invitation.event1_date, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  const event1MonthFormatted = formatDate(invitation.event1_date, { month: 'long' }).toUpperCase()
  const event1DayFormatted = formatDate(invitation.event1_date, { day: 'numeric' })
  const event1YearFormatted = formatDate(invitation.event1_date, { year: 'numeric' })
  const heroDateFormatted = formatDate(invitation.event1_date, { month: 'long', day: 'numeric', year: 'numeric' })
  const currentTheme = themeContent[invitation.theme as keyof typeof themeContent] || themeContent.general;
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600&display=swap');

        :root {
          --gold: #C5A059;
          --teal: #2D5A47;
          --pink: #E91E63;
          --sage-green: #839788;
          --light-cream: #FDFBF7;
          --off-white: #FAF9F6;
          --text-dark: #333333;
          --text-muted: #666666;
          --font-serif: 'Playfair Display', serif;
          --font-sans: 'Outfit', sans-serif;
          --font-cursive: 'Great Vibes', cursive;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          background-color: var(--off-white);
          color: var(--text-dark);
          font-family: var(--font-sans);
          line-height: 1.6;
          overflow-x: hidden;
        }

        /* Envelope */
        .envelope-cover {
          position: fixed;
          top: 0; left: 0;
          width: 100vw; height: 100vh;
          background: linear-gradient(135deg, rgba(253,251,247,0.9), rgba(245,241,230,0.95));
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          transition: opacity 1s ease-in-out, visibility 1s;
          cursor: pointer;
          backdrop-filter: blur(10px);
        }
        .envelope-cover.opening .envelope-flap { transform: rotateX(180deg); }
        .envelope-cover.opening .envelope-seal { opacity: 0; }
        .envelope-cover.opened { opacity: 0; visibility: hidden; pointer-events: none; }

        .envelope-inner {
          position: relative;
          width: 340px; height: 220px;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }
        .envelope-flap {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 50%;
          background: var(--sage-green);
          clip-path: polygon(0 0, 100% 0, 50% 100%);
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          z-index: 2;
          transition: transform 0.8s ease;
          transform-origin: top;
        }
        .envelope-content {
          position: relative;
          z-index: 3;
          margin-top: 30px;
          text-align: center;
        }
        .envelope-invite-text {
          font-family: var(--font-serif);
          font-size: 2rem;
          color: var(--teal);
          font-weight: 700;
          margin-bottom: 5px;
        }
        .envelope-tap-text {
          font-family: var(--font-sans);
          font-style: italic;
          color: var(--text-muted);
          font-size: 0.9rem;
          animation: pulse 1.5s infinite;
        }
        .envelope-seal {
          position: absolute;
          top: -65px; left: 50%;
          transform: translateX(-50%);
          width: 50px; height: 50px;
          background: var(--gold);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 1.5rem;
          box-shadow: 0 4px 8px rgba(197,160,89,0.4);
          z-index: 4;
          transition: opacity 0.5s;
        }

        @keyframes pulse {
          0% { opacity: 0.7; } 50% { opacity: 1; } 100% { opacity: 0.7; }
        }

        /* Hero */
        .hero {
          height: 100vh;
          min-height: 600px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: url('/Hero.jpg') center/cover no-repeat;
          position: relative;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.3);
        }
        .hero-glass-card {
          position: relative;
          z-index: 2;
          background: rgba(255,255,255,0.25);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          padding: 60px 40px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.4);
          text-align: center;
          box-shadow: 0 15px 35px rgba(0,0,0,0.2);
          width: 90%;
          max-width: 600px;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards;
        }
        .hero-sub-title {
          color: var(--gold);
          text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 3px;
          margin-bottom: 20px;
        }
        .hero-names {
          font-family: var(--font-serif);
          font-size: 4rem;
          color: #fff;
          line-height: 1.2;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .hero-names .ampersand {
          font-family: var(--font-cursive);
          color: var(--gold);
          font-size: 4.5rem;
          margin: 0 10px;
        }
        .hero-date {
          color: #fff;
          font-size: 1.2rem;
          letter-spacing: 2px;
          font-weight: 300;
        }
        .scroll-down-btn {
          position: absolute;
          bottom: 30px; right: 30px;
          width: 50px; height: 50px;
          background: var(--pink);
          color: #fff;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          box-shadow: 0 5px 15px rgba(233,30,99,0.4);
          z-index: 2;
          border: none;
          cursor: pointer;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%,20%,50%,80%,100% { transform: translateY(0); }
          40% { transform: translateY(-15px); }
          60% { transform: translateY(-7px); }
        }
        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        /* Sections */
        .section-pad { padding: 80px 20px; }
        .container { max-width: 900px; margin: 0 auto; }
        .bg-light { background-color: var(--light-cream); }
        .section-title {
          font-family: var(--font-serif);
          font-size: 2.5rem;
          font-weight: 600;
          color: var(--teal);
          margin-bottom: 10px;
        }
        .divider { font-size: 1.5rem; color: var(--gold); margin-bottom: 30px; }

        /* Intro */
        .arabic { font-family: 'Amiri', serif; font-size: 3rem; color: var(--teal); }
        .bismillah-eng {
          font-family: var(--font-cursive);
          font-size: 1.8rem;
          color: var(--text-muted);
          margin-bottom: 40px;
          line-height: 1.2;
        }
        .parents-names { font-family: var(--font-serif); font-size: 1.4rem; color: var(--text-dark); }
        .parents-address { font-size: 0.95rem; color: var(--text-muted); margin-bottom: 30px; }
        .invite-msg { font-size: 1.1rem; line-height: 1.8; color: var(--text-dark); }

        /* Couple */
        .couple-grid {
          display: flex;
          flex-direction: column;
          gap: 30px;
          align-items: center;
        }
        .person-name {
          font-family: var(--font-serif);
          color: var(--teal);
          font-size: 2.2rem;
          margin-bottom: 10px;
          text-align: center;
        }
        .ampersand-big { font-family: var(--font-cursive); font-size: 4rem; color: var(--gold); }
        .insha-allah {
          font-family: var(--font-cursive);
          font-size: 2.5rem;
          color: var(--teal);
          margin-top: 40px;
          text-align: center;
        }

        /* Countdown */
        .countdown-grid {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
          margin-top: 20px;
        }
        .time-box {
          background: #fff;
          border: 1px solid rgba(197,160,89,0.3);
          border-radius: 12px;
          padding: 20px;
          width: 100px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.03);
          text-align: center;
        }
        .time-val {
          font-family: var(--font-serif);
          color: var(--gold);
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1;
          margin-bottom: 10px;
        }
        .time-label { font-size: 0.8rem; color: var(--teal); letter-spacing: 2px; font-weight: 600; }

        /* Events */
        .event-card {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          max-width: 700px;
          margin: 0 auto 40px auto;
        }
        .event-date-box {
          background: var(--light-cream);
          padding: 30px;
          text-align: center;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
        }
        .event-date-box .month { color: var(--gold); font-weight: 600; font-size: 1.1rem; letter-spacing: 3px; margin-bottom: 5px; }
        .event-date-box .date { font-family: var(--font-serif); font-size: 4.5rem; color: var(--text-dark); line-height: 1; font-weight: 700; }
        .event-date-box .year { color: var(--text-muted); font-size: 1.1rem; margin-top: 5px; }
        .event-info { padding: 40px; }
        .event-title { font-family: var(--font-serif); font-size: 1.8rem; color: var(--teal); margin-bottom: 5px; }
        .event-subtitle { color: var(--text-muted); font-size: 1rem; margin-bottom: 30px; }
        .event-row { display: flex; align-items: flex-start; gap: 15px; margin-bottom: 20px; }
        .event-row .icon { font-size: 1.5rem; color: var(--gold); }
        .event-row p { color: var(--text-muted); }
        .event-row .strong { color: var(--text-dark); font-weight: 600; margin-bottom: 3px; }

        .gradient-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, var(--gold), var(--pink));
          color: #fff;
          text-decoration: none;
          padding: 14px 28px;
          border-radius: 30px;
          font-weight: 500;
          letter-spacing: 1px;
          box-shadow: 0 8px 20px rgba(233,30,99,0.2);
          transition: transform 0.3s, box-shadow 0.3s;
          border: none;
          cursor: pointer;
          font-family: var(--font-sans);
          font-size: 1rem;
          margin-top: 1rem;
        }
        .gradient-btn:hover { transform: translateY(-3px); box-shadow: 0 12px 25px rgba(233,30,99,0.3); }

        /* Footer */
        .footer { background: var(--off-white); }
        .back-top-btn {
          width: 50px; height: 50px;
          background: #fff;
          border: 1px solid #eaeaea;
          color: var(--teal);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          display: inline-flex;
          justify-content: center;
          align-items: center;
          transition: background 0.3s;
        }
        .back-top-btn:hover { background: var(--light-cream); }
        .comp-text { font-size: 1rem; color: var(--teal); }
        .comp-names { font-family: var(--font-serif); font-size: 1.3rem; font-weight: 600; color: var(--gold); text-transform: uppercase; letter-spacing: 2px; margin-top: 0.5rem; }
        .footer-credit { font-size: 0.9rem; color: var(--text-muted); margin-top: 1rem; }

        /* Scroll reveal */
        .scroll-reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.8s ease-out, transform 0.8s ease-out; }
        .scroll-reveal.visible { opacity: 1; transform: translateY(0); }

        /* Responsive */
        @media (min-width: 768px) {
          .event-card { flex-direction: row; }
          .event-date-box { border-bottom: none; border-right: 1px solid rgba(0,0,0,0.05); justify-content: center; padding: 50px 40px; }
          .event-info { flex: 1; }
          .couple-grid { flex-direction: row; justify-content: space-around; }
        }
        @media (max-width: 480px) {
          .hero-names { font-size: 2.8rem; }
          .hero-names .ampersand { font-size: 3rem; }
          .hero-glass-card { padding: 40px 20px; }
          .bismillah-eng { font-size: 1.5rem; }
          .time-box { width: 75px; padding: 15px 10px; }
          .time-val { font-size: 1.8rem; }
          .time-label { font-size: 0.7rem; }
          .event-date-box .date { font-size: 3.5rem; }
          .event-info { padding: 30px 20px; }
        }
      `}</style>

      {/* Envelope Cover */}
      {!shouldSkipEnvelope &&(
          <div
        className={`envelope-cover${envelopeState === 'opening' ? ' opening' : ''}${envelopeState === 'opened' ? ' opened' : ''}`}
        onClick={handleEnvelopeClick}
      >
        <div className="envelope-inner">
          <div className="envelope-flap" />
          <div className="envelope-content">
            <h1 className="envelope-invite-text">You're Invited</h1>
            <p className="envelope-tap-text">Tap to open</p>
            <div className="envelope-seal">♥</div>
          </div>
        </div>
      </div>
      )}
      

      {/* Main Content */}
      <div style={{ display: 'block' }}>

        {/* Hero Section */}
        <section className="hero" id="home">
          <div className="hero-overlay" />
          <div className="hero-glass-card">
            <p className="hero-sub-title">TOGETHER WITH THEIR FAMILIES</p>
            <h1 className="hero-names">
              {invitation.groom_name} <span className="ampersand">&</span> {invitation.bride_name}
            </h1>
            <p className="hero-date">{heroDateFormatted}</p>
          </div>
          <a href="#intro" className="scroll-down-btn bounce" onClick={(e) => { e.preventDefault(); document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' }) }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </a>
        </section>

        {/* Intro / Bismillah Section */}
        <section className="section-pad" id="intro">
          <div className="container" style={{ textAlign: 'center' }}>
            <div ref={addRevealRef} className="scroll-reveal" style={{ marginBottom: '2rem' }}>
              <div style={{ marginBottom: '2rem' }}>
                <p className={invitation.theme === 'islamic'?'arabic':'hero-sub-title'}>{currentTheme.header}</p>
                <p className="bismillah-eng">{currentTheme.subHeader}</p>
              </div>
              <h2 className="section-title">Invitation</h2>
              <div className="divider">{currentTheme.icon}</div>
              <h3 className="parents-names">
                {invitation.side === 'bride'
                  ? [invitation.bride_father, invitation.bride_mother].filter(Boolean).join(' & ')
                  : [invitation.groom_father, invitation.groom_mother].filter(Boolean).join(' & ')}
              </h3>
              <p className="parents-address">
                {invitation.side === 'bride' ? invitation.bride_address : invitation.groom_address}
              </p>
              <p className="invite-msg">{currentTheme.inviteText}</p>
            </div>
          </div>
        </section>

        {/* Couple Section */}
        <section className="p-2 md:p-4 bg-light">
          <div className="container">
            <div ref={addRevealRef} className="scroll-reveal">
              <div className="couple-grid">
                <div style={{ textAlign: 'center' }}>
                  <h2 className="person-name">{invitation.groom_name}</h2> 
                  <p className="text-sm text-gray-600">S/O {invitation.groom_father} & {invitation.groom_mother}</p>
                </div>
                <div className="ampersand-big">&</div>
                <div style={{ textAlign: 'center' }}>
                  <h2 className="person-name">{invitation.bride_name}</h2> 
                  <p className="text-sm text-gray-600">D/O {invitation.bride_father} & {invitation.bride_mother}</p>
                </div>
              </div>
              <p className="insha-allah">{currentTheme.blessing}</p>
            </div>
          </div>
        </section>

        {/* Countdown Section */}
        <section className="section-pad" id="countdown">
          <div className="container" style={{ textAlign: 'center' }}>
            <div ref={addRevealRef} className="scroll-reveal">
              <h2 className="section-title">The Big Day</h2>
              <div className="divider">❧</div>
              <div className="countdown-grid">
                <div className="time-box">
                  <div className="time-val">{timeLeft.days}</div>
                  <div className="time-label">DAYS</div>
                </div>
                <div className="time-box">
                  <div className="time-val">{timeLeft.hours}</div>
                  <div className="time-label">HOURS</div>
                </div>
                <div className="time-box">
                  <div className="time-val">{timeLeft.minutes}</div>
                  <div className="time-label">MINS</div>
                </div>
                <div className="time-box">
                  <div className="time-val">{timeLeft.seconds}</div>
                  <div className="time-label">SECS</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section className="section-pad bg-light" id="events">
          <div className="container">
            <div ref={addRevealRef} className="scroll-reveal">
              <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '10px' }}>Event Details</h2>
              <div className="divider" style={{ textAlign: 'center', marginBottom: '50px' }}>❧</div>

              {/* Event 1 */}
              <div className="event-card">
                <div className="event-date-box">
                  <span className="month">{event1MonthFormatted}</span>
                  <span className="date">{event1DayFormatted}</span>
                  <span className="year">{event1YearFormatted}</span>
                </div>
                <div className="event-info">
                  <h3 className="event-title">{invitation.event1_name}</h3>
                  <p className="event-subtitle">{event1DateFormatted.split(',')[0]}</p>
                  <div className="event-row">
                    <span className="icon">🕒</span>
                    <div>
                      <p className="strong">Time</p>
                      <p>{formatTime(invitation.event1_time)}</p>
                    </div>
                  </div>
                  <div className="event-row">
                    <span className="icon">📍</span>
                    <div>
                      <p className="strong">Location</p>
                      <p>{invitation.event1_location}</p>
                    </div>
                  </div>
                  {invitation.event1_maps_url && (
                    <a href={invitation.event1_maps_url} target="_blank" rel="noopener noreferrer" className="gradient-btn">
                      Get Location
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              {/* Event 2 */}
              {invitation.event2_name && invitation.event2_date && (
                <div className="event-card">
                  <div className="event-date-box">
                    <span className="month">{formatDate(invitation.event2_date, { month: 'long' }).toUpperCase()}</span>
                    <span className="date">{formatDate(invitation.event2_date, { day: 'numeric' })}</span>
                    <span className="year">{formatDate(invitation.event2_date, { year: 'numeric' })}</span>
                  </div>
                  <div className="event-info">
                    <h3 className="event-title">{invitation.event2_name}</h3>
                    <p className="event-subtitle">{formatDate(invitation.event2_date, { weekday: 'long' })}</p>
                    <div className="event-row">
                      <span className="icon">🕒</span>
                      <div>
                        <p className="strong">Time</p>
                        <p>{formatTime(invitation.event2_time)}</p>
                      </div>
                    </div>
                    <div className="event-row">
                      <span className="icon">📍</span>
                      <div>
                        <p className="strong">Location</p>
                        <p>{invitation.event2_location}</p>
                      </div>
                    </div>
                    {invitation.event2_maps_url && (
                      <a href={invitation.event2_maps_url} target="_blank" rel="noopener noreferrer" className="gradient-btn">
                        Get Location
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer section-pad" style={{ textAlign: 'center' }}>
          <div className="container">
            <div ref={addRevealRef} className="scroll-reveal">
              <button
                className="back-top-btn"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Back to top"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              </button>
              <div style={{ marginTop: '1rem' }}>
                <p className="comp-text">With Best Compliments From</p>
                <p className="comp-names">Family and Friends</p>
              </div>
              <p className="footer-credit">We can't wait to celebrate with you!</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}