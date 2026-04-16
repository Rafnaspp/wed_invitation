'use client'

import React from 'react'
import { Invitation } from '@/lib/api'

export interface TemplateProps {
  invitation: Invitation;
  timeLeft: { days: string; hours: string; minutes: string; seconds: string };
  currentTheme: {
    header: string;
    subHeader: string;
    inviteText: string;
    blessing: string;
    icon: string;
  };
  addRevealRef: (el: HTMLElement | null) => void;
  formatDate: (dateStr: string, opts: Intl.DateTimeFormatOptions) => string;
  formatTime: (timeStr: string) => string;
}

const ClassicTemplate: React.FC<TemplateProps> = ({
  invitation,
  timeLeft,
  currentTheme,
  addRevealRef,
  formatDate,
  formatTime
}) => {
  const heroDateFormatted = formatDate(invitation.event1_date, { month: 'long', day: 'numeric', year: 'numeric' })
  const event1MonthFormatted = formatDate(invitation.event1_date, { month: 'long' }).toUpperCase()
  const event1DayFormatted = formatDate(invitation.event1_date, { day: 'numeric' })
  const event1YearFormatted = formatDate(invitation.event1_date, { year: 'numeric' })
  const event1DateFormatted = formatDate(invitation.event1_date, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  // Curated Classic Hero Image
  const heroImageUrl = 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070';

  return (
    <div className="template-classic">
      <style jsx>{`
        .hero-classic {
          background: url('${heroImageUrl}') center/cover no-repeat;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .classic-serif { font-family: 'Playfair Display', serif; }
      `}</style>

      {/* Hero Section */}
      <section className="hero-classic" id="home">
        <div className="hero-overlay" />
        <div className="hero-glass-card">
          <p className="hero-sub-title">TOGETHER WITH THEIR FAMILIES</p>
          <h1 className="hero-names classic-serif">
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

      {/* Intro Section */}
      <section className="section-pad" id="intro">
        <div className="container text-center">
          <div ref={addRevealRef} className="scroll-reveal mb-8">
            <p className={invitation.theme === 'islamic' ? 'arabic' : 'hero-sub-title'}>{currentTheme.header}</p>
            <p className="bismillah-eng">{currentTheme.subHeader}</p>
            <h2 className="section-title classic-serif mt-8">Invitation</h2>
            <div className="divider">{currentTheme.icon}</div>
            <h3 className="parents-names classic-serif">
              {invitation.side === 'bride'
                ? [invitation.bride_father, invitation.bride_mother].filter(Boolean).join(' & ')
                : [invitation.groom_father, invitation.groom_mother].filter(Boolean).join(' & ')}
            </h3>
            <p className="parents-address">{invitation.side === 'bride' ? invitation.bride_address : invitation.groom_address}</p>
            <p className="invite-msg mt-4">{currentTheme.inviteText}</p>
          </div>
        </div>
      </section>

      {/* Couple Section */}
      <section className="p-8 bg-light">
        <div className="container">
          <div ref={addRevealRef} className="scroll-reveal">
            <div className="couple-grid">
              <div className="text-center">
                <h2 className="person-name classic-serif">{invitation.groom_name}</h2>
                <p className="text-sm text-gray-600">S/O {invitation.groom_father} & {invitation.groom_mother}</p>
              </div>
              <div className="ampersand-big">&</div>
              <div className="text-center">
                <h2 className="person-name classic-serif">{invitation.bride_name}</h2>
                <p className="text-sm text-gray-600">D/O {invitation.bride_father} & {invitation.bride_mother}</p>
              </div>
            </div>
            <p className="insha-allah">{currentTheme.blessing}</p>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="section-pad" id="countdown">
        <div className="container text-center">
          <div ref={addRevealRef} className="scroll-reveal">
            <h2 className="section-title classic-serif">The Big Day</h2>
            <div className="divider">❧</div>
            <div className="countdown-grid">
              {['DAYS', 'HOURS', 'MINS', 'SECS'].map((label, idx) => (
                <div key={label} className="time-box">
                  <div className="time-val classic-serif">{Object.values(timeLeft)[idx]}</div>
                  <div className="time-label">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="section-pad bg-light" id="events">
        <div className="container">
          <div ref={addRevealRef} className="scroll-reveal">
            <h2 className="section-title text-center classic-serif">Event Details</h2>
            <div className="divider text-center mb-12">❧</div>
            <div className="event-card">
              <div className="event-date-box">
                <span className="month">{event1MonthFormatted}</span>
                <span className="date classic-serif">{event1DayFormatted}</span>
                <span className="year">{event1YearFormatted}</span>
              </div>
              <div className="event-info">
                <h3 className="event-title classic-serif">{invitation.event1_name}</h3>
                <p className="event-subtitle">{event1DateFormatted.split(',')[0]}</p>
                <div className="event-row">
                  <span className="icon">🕒</span>
                  <div><p className="strong">Time</p><p>{formatTime(invitation.event1_time)}</p></div>
                </div>
                <div className="event-row">
                  <span className="icon">📍</span>
                  <div><p className="strong">Location</p><p>{invitation.event1_location}</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClassicTemplate;