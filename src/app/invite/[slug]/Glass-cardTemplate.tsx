'use client'

import React from 'react'
import { Invitation } from '@/lib/api'
import { TemplateProps } from './ClassicTemplate'

const ModernMinimalistTemplate: React.FC<TemplateProps> = ({
  invitation,
  timeLeft,
  currentTheme,
  addRevealRef,
  formatDate,
  formatTime
}) => {
  const isBrideSide = invitation.side === 'bride'
  const firstPersonName = isBrideSide ? invitation.bride_name : invitation.groom_name
  const secondPersonName = isBrideSide ? invitation.groom_name : invitation.bride_name
  const heroDateFormatted = formatDate(invitation.event1_date, { month: 'short', day: 'numeric', year: 'numeric' })
  const event1Day = formatDate(invitation.event1_date, { day: 'numeric' })
  const event1Weekday = formatDate(invitation.event1_date, { weekday: 'long' })
  const event1MonthYear = formatDate(invitation.event1_date, { month: 'long', year: 'numeric' })

  const heroImageUrl = 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070'

  return (
    <div className="template-modern" style={{ backgroundColor: '#fafaf8', color: '#1a1a18', fontFamily: 'Georgia, serif' }}>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

        .mm-serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .mm-sans  { font-family: 'Jost', 'Helvetica Neue', sans-serif; letter-spacing: 0.18em; }

        /* ── Hero ── */
        .mm-hero {
          position: relative;
          width: 100%;
          height: 100svh;
          min-height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .mm-hero-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          filter: brightness(0.55) saturate(0.8);
          transform: scale(1.03);
          transition: transform 8s ease;
        }
        .mm-hero:hover .mm-hero-img { transform: scale(1); }

        .mm-hero-card {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 3.5rem 4rem;
          border: 1px solid rgba(255,255,255,0.3);
          background: rgba(10,10,8,0.45);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          max-width: min(520px, 90vw);
          width: 100%;
          animation: heroFadeIn 1.4s ease forwards;
        }
        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mm-hero-eyebrow {
          font-family: 'Jost', sans-serif;
          font-weight: 200;
          font-size: 0.65rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.65);
          margin-bottom: 1.75rem;
        }
        .mm-hero-names {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(2.4rem, 7vw, 4.5rem);
          line-height: 1.1;
          color: #fff;
          margin-bottom: 1.5rem;
        }
        .mm-hero-amp {
          display: block;
          font-style: italic;
          font-size: 0.65em;
          color: rgba(255,255,255,0.6);
          margin: 0.35rem 0;
        }
        .mm-hero-rule {
          width: 36px;
          height: 1px;
          background: rgba(255,255,255,0.4);
          margin: 0 auto 1.5rem;
        }
        .mm-hero-date {
          font-family: 'Jost', sans-serif;
          font-size: 0.7rem;
          font-weight: 300;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.7);
        }

        /* ── Intro ── */
        .mm-intro {
          padding: 7rem 1.5rem;
          text-align: center;
          background: #fafaf8;
        }
        .mm-intro-inner {
          max-width: 640px;
          margin: 0 auto;
        }
        .mm-label {
          font-family: 'Jost', sans-serif;
          font-size: 0.62rem;
          font-weight: 300;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #888880;
          margin-bottom: 0.75rem;
        }
        .mm-intro-header { font-size: clamp(1.1rem, 3vw, 1.5rem); margin-bottom: 0.4rem; }
        .mm-intro-sub { font-size: 0.8rem; letter-spacing: 0.22em; color: #aaa; text-transform: uppercase; margin-bottom: 3rem; }
        .mm-section-title { font-size: clamp(2rem, 4vw, 2.8rem); font-weight: 300; margin-bottom: 1.5rem; color: #1a1a18; }
        .mm-body-text { font-family: 'Jost', sans-serif; font-size: 0.95rem; font-weight: 300; line-height: 1.9; color: #555550; max-width: 480px; margin: 0 auto; }
        .mm-vline { width: 1px; height: 56px; background: #d0d0c8; margin: 3rem auto; }

        /* ── Parents Grid ── */
        .mm-parents-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          margin-top: 3rem;
          text-align: left;
        }
        @media (max-width: 600px) {
          .mm-parents-grid { grid-template-columns: 1fr; gap: 2rem; text-align: center; }
        }
        .mm-parents-name { font-size: clamp(1.3rem, 3vw, 1.8rem); font-weight: 300; margin-bottom: 0.5rem; }
        .mm-parents-addr { font-family: 'Jost', sans-serif; font-size: 0.7rem; font-weight: 300; letter-spacing: 0.15em; color: #aaa; text-transform: uppercase; margin-top: 0.4rem; }
        .mm-blessing { font-size: clamp(1rem, 2vw, 1.25rem); font-style: italic; font-weight: 300; color: #888880; line-height: 1.7; }

        /* ── Countdown ── */
        .mm-countdown {
          padding: 5rem 1.5rem;
          background: #f2f1ee;
          border-top: 1px solid #e4e4de;
          border-bottom: 1px solid #e4e4de;
          text-align: center;
        }
        .mm-countdown-label {
          font-family: 'Jost', sans-serif;
          font-size: 0.62rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #aaa;
          margin-bottom: 3rem;
        }
        .mm-countdown-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2rem 4rem;
        }
        .mm-count-item { text-align: center; min-width: 64px; }
        .mm-count-num {
          display: block;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3rem, 8vw, 5rem);
          font-weight: 300;
          line-height: 1;
          color: #1a1a18;
        }
        .mm-count-unit {
          display: block;
          font-family: 'Jost', sans-serif;
          font-size: 0.58rem;
          font-weight: 300;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #aaa;
          margin-top: 0.6rem;
        }

        /* ── Events ── */
        .mm-events { padding: 7rem 1.5rem; background: #fafaf8; }
        .mm-events-inner { max-width: 820px; margin: 0 auto; }
        .mm-events-heading { font-size: clamp(1.8rem, 4vw, 2.5rem); font-weight: 300; text-align: center; margin-bottom: 4rem; color: #1a1a18; }

        /* THE FIX: use CSS Grid with explicit min-width 0 to prevent overflow blowout */
        .mm-event-card {
          display: grid;
          grid-template-columns: minmax(0, 200px) minmax(0, 1fr);
          border: 1px solid #e4e4de;
          overflow: hidden;
        }
        @media (max-width: 640px) {
          .mm-event-card { grid-template-columns: 1fr; }
        }

        .mm-event-date-panel {
          background: #1a1a18;
          color: #fafaf8;
          padding: 3rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 0.75rem;
        }
        .mm-event-day-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(4rem, 10vw, 6rem);
          font-weight: 300;
          line-height: 1;
          color: #fff;
        }
        .mm-event-weekday {
          font-family: 'Jost', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
        }
        .mm-event-monthyr {
          font-family: 'Jost', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
        }

        .mm-event-details-panel {
          background: #fff;
          padding: 3rem 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 0; /* ← prevents grid blowout */
        }
        .mm-event-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 300;
          margin-bottom: 2rem;
          color: #1a1a18;
        }
        .mm-event-meta { display: flex; flex-direction: column; gap: 1.25rem; }
        .mm-meta-row { display: flex; align-items: flex-start; gap: 1rem; }
        .mm-meta-icon {
          width: 32px;
          height: 32px;
          border: 1px solid #e4e4de;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .mm-meta-label {
          font-family: 'Jost', sans-serif;
          font-size: 0.58rem;
          font-weight: 300;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #aaa;
          margin-bottom: 0.25rem;
        }
        .mm-meta-value {
          font-family: 'Jost', sans-serif;
          font-size: 0.9rem;
          font-weight: 300;
          color: #333330;
          line-height: 1.5;
          word-break: break-word;
        }
        .mm-map-btn {
          margin-top: 2.5rem;
          display: inline-block;
          padding: 0.75rem 2rem;
          border: 1px solid #1a1a18;
          font-family: 'Jost', sans-serif;
          font-size: 0.6rem;
          font-weight: 300;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #1a1a18;
          background: transparent;
          cursor: pointer;
          transition: background 0.25s ease, color 0.25s ease;
          align-self: flex-start;
        }
        .mm-map-btn:hover { background: #1a1a18; color: #fafaf8; }
      `}</style>

      {/* ── Hero ── */}
      <section className="mm-hero" id="home">
        <img className="mm-hero-img" src={heroImageUrl} alt="Wedding Scene" />
        <div className="mm-hero-card">
          <p className="mm-hero-eyebrow">Save the Date</p>
          <h1 className="mm-hero-names">
            {firstPersonName}
            <span className="mm-hero-amp">&</span>
            {secondPersonName}
          </h1>
          <div className="mm-hero-rule" />
          <p className="mm-hero-date">{heroDateFormatted}</p>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="mm-intro" id="intro">
        <div className="mm-intro-inner" ref={addRevealRef}>
          <div style={{ marginBottom: '3rem' }}>
            <p className={invitation.theme === 'islamic' ? 'mm-serif' : 'mm-label'} style={{ fontSize: invitation.theme === 'islamic' ? '1.4rem' : undefined }}>
              {currentTheme.header}
            </p>
            <p className="mm-intro-sub">{currentTheme.subHeader}</p>
          </div>

          <h2 className="mm-serif mm-section-title">The Invitation</h2>
          <p className="mm-body-text">{currentTheme.inviteText}</p>

          <div className="mm-vline" />

          <div className="mm-parents-grid">
            <div>
              <p className="mm-label">On Behalf of</p>
              <p className="mm-serif mm-parents-name">
                {invitation.side === 'bride'
                  ? [invitation.bride_father, invitation.bride_mother].filter(Boolean).join(' & ')
                  : [invitation.groom_father, invitation.groom_mother].filter(Boolean).join(' & ')}
              </p>
              <p className="mm-parents-addr">
                {invitation.side === 'bride' ? invitation.bride_address : invitation.groom_address}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p className="mm-serif mm-blessing">{"{" + currentTheme.blessing + "}"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Countdown ── */}
      <section className="mm-countdown">
        <div ref={addRevealRef}>
          <p className="mm-countdown-label">Counting Down</p>
          <div className="mm-countdown-grid">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="mm-count-item">
                <span className="mm-count-num">{value}</span>
                <span className="mm-count-unit">{unit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Events ── */}
      <section className="mm-events" id="events">
        <div className="mm-events-inner" ref={addRevealRef}>
          <h2 className="mm-serif mm-events-heading">Event Details</h2>

          <div className="mm-event-card">
            {/* Date Panel */}
            <div className="mm-event-date-panel">
              <span className="mm-event-weekday">{event1Weekday}</span>
              <span className="mm-event-day-num">{event1Day}</span>
              <span className="mm-event-monthyr">{event1MonthYear}</span>
            </div>

            {/* Details Panel */}
            <div className="mm-event-details-panel">
              <h3 className="mm-event-name">{invitation.event1_name}</h3>
              <div className="mm-event-meta">
                <div className="mm-meta-row">
                  <div className="mm-meta-icon">🕒</div>
                  <div>
                    <p className="mm-meta-label">Time</p>
                    <p className="mm-meta-value">{formatTime(invitation.event1_time)}</p>
                  </div>
                </div>
                <div className="mm-meta-row">
                  <div className="mm-meta-icon">📍</div>
                  <div>
                    <p className="mm-meta-label">Location</p>
                    <p className="mm-meta-value">{invitation.event1_location}</p>
                  </div>
                </div>
              </div>
              <button className="mm-map-btn">View on Map</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ModernMinimalistTemplate