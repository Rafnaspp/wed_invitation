'use client'

import React from 'react'
import { Invitation } from '@/lib/api'
import { TemplateProps } from './ClassicTemplate'

const EtherealTemplate: React.FC<TemplateProps> = ({
  invitation,
  timeLeft,
  currentTheme,
  addRevealRef,
  formatDate,
  formatTime
}) => {
  const heroDate = formatDate(invitation.event1_date, { month: 'long', day: 'numeric', year: 'numeric' })
  const eventDay = formatDate(invitation.event1_date, { day: '2-digit' })
  const eventMonth = formatDate(invitation.event1_date, { month: 'short' }).toUpperCase()

  const heroImageUrl = 'https://images.unsplash.com/photo-1596751303335-ca42b3ca50c1?q=80&w=2070'

  return (
    <div className="template-ethereal" style={{ background: '#FBFBF9', color: '#5A5A5A', fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Cormorant+Infant:wght@300;400&display=swap');

        .eth-label {
          font-family: 'Cormorant Infant', serif;
          letter-spacing: 0.18em;
          font-weight: 300;
          font-size: 10px;
          text-transform: uppercase;
        }
        .eth-serif { font-family: 'Cormorant Garamond', serif; }

        /* HERO */
        .eth-hero {
          display: grid;
          grid-template-columns: 1fr;
          min-height: 100vh;
        }
        @media (min-width: 768px) {
          .eth-hero { grid-template-columns: 55% 45%; }
        }

        .eth-hero-img {
          position: relative;
          height: 52vw;
          min-height: 320px;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .eth-hero-img { height: 100vh; min-height: unset; }
        }
        .eth-hero-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        .eth-hero-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 3rem 2.5rem;
          background: #FBFBF9;
        }
        @media (min-width: 768px) {
          .eth-hero-content {
            padding: 4rem 3.5rem;
            border-left: 1px solid #EBEBEA;
          }
        }

        .eth-hero-names {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400;
          font-size: clamp(2.8rem, 6vw, 4.5rem);
          line-height: 1.15;
          color: #3A3A3A;
          margin: 1.8rem 0 0;
        }
        .eth-hero-names em {
          font-weight: 300;
          font-style: italic;
          display: block;
          padding-left: 1.8rem;
          color: #5A5A5A;
        }

        .eth-date-bar {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 2rem;
        }
        .eth-date-bar-line {
          width: 2px;
          height: 40px;
          background: #BF9B30;
          opacity: 0.6;
          flex-shrink: 0;
        }

        /* INTRO */
        .eth-intro {
          padding: 5rem 1.5rem;
          text-align: center;
        }
        .eth-intro-inner { max-width: 640px; margin: 0 auto; }

        .eth-intro-quote {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 300;
          font-size: clamp(1.4rem, 3vw, 2rem);
          color: #BF9B30;
          line-height: 1.7;
          margin: 1.5rem 0 2.5rem;
        }

        .eth-intro-names {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          color: #3A3A3A;
        }
        .eth-intro-names span {
          font-weight: 300;
          font-size: 1.1rem;
          font-style: italic;
          color: #9A9A95;
          margin: 0 0.6rem;
        }

        .eth-parents-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-top: 2.5rem;
          padding-top: 2.5rem;
          border-top: 1px solid #EBEBEA;
        }
        @media (min-width: 600px) {
          .eth-parents-grid { grid-template-columns: 1fr 1fr; }
          .eth-parent-groom {
            text-align: right;
            padding-right: 2rem;
            border-right: 1px solid #EBEBEA;
          }
          .eth-parent-bride { padding-left: 2rem; }
        }

        .eth-parent-name {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 1.35rem;
          color: #4A4A4A;
          line-height: 1.6;
          margin-top: 0.4rem;
        }

        /* EVENT CARD */
        .eth-events-section { padding: 2rem 1.5rem 5rem; }

        .eth-event-card {
          background: #fff;
          border: 1px solid #EFEFEC;
          max-width: 820px;
          margin: 0 auto;
        }

        .eth-event-card-inner {
          display: grid;
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .eth-event-card-inner { grid-template-columns: 1fr auto; }
        }

        .eth-event-main { padding: 2.5rem; }
        @media (min-width: 640px) { .eth-event-main { padding: 3.5rem; } }

        .eth-event-name {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          color: #3A3A3A;
          margin-top: 0.5rem;
          line-height: 1.2;
        }

        .eth-event-divider {
          width: 40px;
          height: 1px;
          background: rgba(191, 155, 48, 0.4);
          margin: 1.4rem 0;
        }

        .eth-event-row {
          display: flex;
          gap: 1.2rem;
          align-items: baseline;
          margin-top: 1.1rem;
        }
        .eth-event-row-label {
          flex-shrink: 0;
          width: 52px;
        }
        .eth-event-row-val {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 1.15rem;
          color: #5A5A5A;
          max-width: 280px;
        }

        .eth-date-block {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 1rem;
          padding: 2rem 2.5rem 1.5rem;
          border-top: 1px solid #EFEFEC;
        }
        @media (min-width: 640px) {
          .eth-date-block {
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 0.4rem;
            padding: 2.5rem;
            border-top: none;
            border-left: 1px solid #EFEFEC;
            min-width: 140px;
          }
        }

        .eth-event-day {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(4rem, 12vw, 7rem);
          color: #BF9B30;
          line-height: 1;
        }
        .eth-event-month {
          font-family: 'Cormorant Infant', serif;
          font-weight: 300;
          letter-spacing: 0.35em;
          font-size: 0.75rem;
          text-transform: uppercase;
          color: #9A9A95;
          margin-top: 0.3rem;
        }

        /* COUNTDOWN */
        .eth-countdown {
          padding: 4rem 1.5rem;
          background: rgba(235, 235, 232, 0.35);
          border-top: 1px solid #EBEBEA;
          border-bottom: 1px solid #EBEBEA;
          text-align: center;
        }
        .eth-countdown-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2rem 3rem;
          margin-top: 2.5rem;
        }
        .eth-countdown-unit { min-width: 64px; }
        .eth-countdown-val {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(2.5rem, 6vw, 3.5rem);
          color: #3A3A3A;
          line-height: 1;
        }
        .eth-countdown-sep {
          width: 1px;
          background: #DEDED9;
          align-self: center;
          height: 48px;
          display: none;
        }
        @media (min-width: 500px) { .eth-countdown-sep { display: block; } }

        /* FOOTER */
        .eth-footer { padding: 4rem 2rem; text-align: center; }
        .eth-blessing {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 300;
          font-size: clamp(1.2rem, 2.5vw, 1.55rem);
          color: #8A8A85;
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.9;
        }

        .eth-divider {
          width: 60px;
          height: 1px;
          background: rgba(191, 155, 48, 0.4);
          margin: 0 auto;
        }
      `}</style>

      {/* HERO */}
      <section className="eth-hero" id="home">
        <div className="eth-hero-img">
          <img src={heroImageUrl} alt="Soft wedding floral setting" />
        </div>
        <div className="eth-hero-content">
          <div ref={addRevealRef} className="scroll-reveal">
            <span className="eth-label" style={{ color: '#BF9B30', display: 'block' }}>
              Beginning our forever
            </span>
            <h1 className="eth-hero-names">
              {invitation.groom_name}
              <em>& {invitation.bride_name}</em>
            </h1>
            <div className="eth-date-bar">
              <div className="eth-date-bar-line" />
              <div>
                <span className="eth-label" style={{ color: '#8A8A85', display: 'block' }}>
                  {formatDate(invitation.event1_date, { weekday: 'long' })}
                </span>
                <span className="eth-label" style={{ fontSize: 11, marginTop: 4, color: '#5A5A5A', display: 'block', letterSpacing: '0.12em' }}>
                  {heroDate}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="eth-intro" id="intro">
        <div className="eth-intro-inner" ref={addRevealRef}>
          {currentTheme.icon && (
            <div style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#BF9B30' }}>
              {currentTheme.icon}
            </div>
          )}
          <p className={`eth-label ${invitation.theme === 'islamic' ? 'eth-serif' : ''}`}
            style={{ color: '#8A8A85', marginBottom: '1.2rem', fontSize: invitation.theme === 'islamic' ? '1.2rem' : undefined }}>
            {currentTheme.header}
          </p>
          <div className="eth-divider" style={{ marginBottom: '2rem' }} />
          <p className="eth-intro-quote">"{currentTheme.inviteText}"</p>
          <p className="eth-label" style={{ color: '#8A8A85', marginBottom: '1rem' }}>
            The wedding of
          </p>
          <p className="eth-intro-names">
            {invitation.groom_name}
            <span>and</span>
            {invitation.bride_name}
          </p>

          <div className="eth-parents-grid">
            <div className="eth-parent-groom">
              <p className="eth-label" style={{ color: '#BF9B30' }}>Parents of the groom</p>
              <p className="eth-parent-name">
                {invitation.groom_father}<br />& {invitation.groom_mother}
              </p>
            </div>
            <div className="eth-parent-bride">
              <p className="eth-label" style={{ color: '#BF9B30' }}>Parents of the bride</p>
              <p className="eth-parent-name">
                {invitation.bride_father}<br />& {invitation.bride_mother}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EVENT CARD */}
      <section className="eth-events-section" id="events">
        <p className="eth-label" style={{ color: '#8A8A85', textAlign: 'center', marginBottom: '2rem', display: 'block' }}>
          The celebration
        </p>
        <div className="eth-event-card" ref={addRevealRef}>
          <div className="eth-event-card-inner">
            <div className="eth-event-main">
              <p className="eth-label" style={{ color: '#BF9B30' }}>Join us for</p>
              <h3 className="eth-event-name">{invitation.event1_name}</h3>
              <div className="eth-event-divider" />
              <div className="eth-event-row">
                <span className="eth-label eth-event-row-label" style={{ color: '#8A8A85' }}>Date</span>
                <span className="eth-event-row-val">{heroDate}</span>
              </div>
              <div className="eth-event-row">
                <span className="eth-label eth-event-row-label" style={{ color: '#8A8A85' }}>Time</span>
                <span className="eth-event-row-val">{formatTime(invitation.event1_time)}</span>
              </div>
              <div className="eth-event-row">
                <span className="eth-label eth-event-row-label" style={{ color: '#8A8A85' }}>Venue</span>
                <span className="eth-event-row-val">{invitation.event1_location}</span>
              </div>
            </div>

            <div className="eth-date-block">
              <div className="eth-event-day">{eventDay}</div>
              <div className="eth-event-month">{eventMonth}</div>
            </div>
          </div>
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="eth-countdown">
        <p className="eth-label" style={{ color: '#BF9B30' }}>Counting down to forever</p>
        <div className="eth-countdown-grid">
          {Object.entries(timeLeft).map(([unit, value], i, arr) => (
            <React.Fragment key={unit}>
              <div className="eth-countdown-unit">
                <div className="eth-countdown-val">{value}</div>
                <p className="eth-label" style={{ color: '#8A8A85', marginTop: '0.7rem' }}>{unit}</p>
              </div>
              {i < arr.length - 1 && <div className="eth-countdown-sep" />}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="eth-footer">
        <div className="eth-divider" style={{ marginBottom: '2rem' }} />
        <p className="eth-blessing">"{currentTheme.blessing}"</p>
        <div className="eth-divider" style={{ marginTop: '2rem' }} />
      </footer>
    </div>
  )
}

export default EtherealTemplate