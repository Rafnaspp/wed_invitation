'use client'

import React, { useMemo, useState } from 'react'
import { TemplateProps } from './ClassicTemplate'

const COVER_IMG = '/templates/gold-cover.png'
const INSIDE_IMG = '/templates/gold-inside.png'

const GoldMandalaTemplate: React.FC<TemplateProps> = ({ invitation, timeLeft, currentTheme, formatDate, formatTime }) => {
  const [opened, setOpened] = useState(false)

  const heroDateFormatted = useMemo(
    () => formatDate(invitation.event1_date, { month: 'long', day: 'numeric', year: 'numeric' }),
    [formatDate, invitation.event1_date],
  )

  const event1DateFormatted = useMemo(
    () =>
      formatDate(invitation.event1_date, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    [formatDate, invitation.event1_date],
  )

  return (
    <div className="gold-mandala-page">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Great+Vibes&family=Playfair+Display:wght@400;600;700&display=swap');

        :global(body) {
          background: #070709;
        }

        .gold-mandala-page {
          min-height: 100vh;
          padding: 28px 16px 72px;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          color: #e6c971;
        }

        .stage {
          width: min(980px, 100%);
        }

        .card-shell {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          box-shadow:
            0 35px 80px rgba(0, 0, 0, 0.55),
            0 0 0 1px rgba(230, 201, 113, 0.22) inset;
          background: #0b0b0d;
          width: min(520px, 100%);
          margin: 0 auto;
          aspect-ratio: 3 / 4;
        }

        /* Inside layer */
        .inside {
          position: relative;
          background: url('${INSIDE_IMG}') center/cover no-repeat;
          padding: clamp(18px, 3vw, 36px);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }

        .inside::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 40%, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75));
          pointer-events: none;
        }

        .content {
          position: relative;
          width: min(760px, 100%);
          text-align: center;
          padding: clamp(18px, 3vw, 34px);
          border-radius: 16px;
          background: rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(230, 201, 113, 0.24);
        }

        .topline {
          font-family: 'Cinzel', serif;
          font-size: 12px;
          letter-spacing: 0.34em;
          text-transform: uppercase;
          color: rgba(230, 201, 113, 0.9);
        }

        .names {
          font-family: 'Great Vibes', cursive;
          font-size: clamp(42px, 7vw, 78px);
          line-height: 1.05;
          margin: 16px 0 10px;
          color: #f0d17b;
          text-shadow: 0 12px 35px rgba(0, 0, 0, 0.55);
          overflow-wrap: anywhere;
        }

        .amp {
          display: inline-block;
          margin: 0 10px;
          font-family: 'Cinzel', serif;
          font-size: 0.44em;
          letter-spacing: 0.1em;
          color: rgba(230, 201, 113, 0.95);
          transform: translateY(-10px);
        }

        .date {
          font-family: 'Cinzel', serif;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(230, 201, 113, 0.9);
          font-size: 13px;
          margin-bottom: 18px;
        }

        .divider {
          width: 86px;
          height: 1px;
          background: rgba(230, 201, 113, 0.45);
          margin: 18px auto;
        }

        .sectionTitle {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          color: #f0d17b;
          margin: 18px 0 10px;
        }

        .copy {
          font-family: 'Playfair Display', serif;
          color: rgba(230, 201, 113, 0.92);
          font-size: 16px;
          line-height: 1.9;
        }

        .grid2 {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
          margin-top: 18px;
        }

        @media (min-width: 760px) {
          .grid2 {
            grid-template-columns: 1fr 1fr;
            text-align: left;
          }
        }

        .box {
          border: 1px solid rgba(230, 201, 113, 0.22);
          border-radius: 14px;
          padding: 14px 14px;
          background: rgba(0, 0, 0, 0.22);
        }

        .label {
          font-family: 'Cinzel', serif;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          font-size: 11px;
          color: rgba(230, 201, 113, 0.8);
          margin-bottom: 8px;
        }

        .value {
          font-family: 'Playfair Display', serif;
          color: rgba(240, 209, 123, 0.98);
          line-height: 1.7;
          overflow-wrap: anywhere;
        }

        .countdownRow {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 10px;
          margin-top: 16px;
        }

        .pill {
          border: 1px solid rgba(230, 201, 113, 0.22);
          border-radius: 14px;
          padding: 12px 10px;
          background: rgba(0, 0, 0, 0.22);
          text-align: center;
        }

        .pillNum {
          font-family: 'Cinzel', serif;
          font-size: 24px;
          color: #f0d17b;
          line-height: 1;
        }

        .pillLab {
          margin-top: 6px;
          font-family: 'Cinzel', serif;
          font-size: 10px;
          letter-spacing: 0.26em;
          color: rgba(230, 201, 113, 0.75);
        }

        /* Front cover layer */
        .cover {
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          cursor: pointer;
          user-select: none;
          touch-action: manipulation;
          background: #0b0b0d;
        }

        .cover-left,
        .cover-right {
          position: relative;
          overflow: hidden;
          filter: saturate(1.05) contrast(1.05);
        }

        .cover-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          background: #0b0b0d;
        }

        /* show left half of the image */
        .cover-left .cover-img {
          transform: translateX(25%);
          width: 200%;
        }

        /* show right half of the image */
        .cover-right .cover-img {
          transform: translateX(-25%);
          width: 200%;
        }

        .cover-right {
          transform-origin: right center;
          transition:
            transform 1400ms cubic-bezier(0.16, 1, 0.3, 1),
            filter 1400ms cubic-bezier(0.16, 1, 0.3, 1),
            opacity 1000ms ease;
          box-shadow: -14px 0 40px rgba(0, 0, 0, 0.45);
        }

        .opened .cover {
          pointer-events: none;
        }

        .opened .cover-left {
          opacity: 0;
          transition: opacity 650ms ease;
        }

        .opened .cover-right {
          transform: translateX(108%) rotateY(-12deg);
          filter: brightness(0.88) saturate(0.95);
          opacity: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .cover-right {
            transition: none;
          }
          .opened .cover-right {
            transform: translateX(110%);
          }
        }
      `}</style>

      <div className="stage">
        <div className={`card-shell ${opened ? 'opened' : ''}`}>
          <div className="inside">
            <div className="content">
              <div className="topline">{currentTheme.header}</div>
              <div className="names">
                {invitation.groom_name} <span className="amp">&</span> {invitation.bride_name}
              </div>
              <div className="date">{heroDateFormatted}</div>
              <div className="divider" />

              <div className="sectionTitle">Invitation</div>
              <div className="copy">{currentTheme.inviteText}</div>

              <div className="grid2" style={{ marginTop: 18 }}>
                <div className="box">
                  <div className="label">Groom</div>
                  <div className="value">
                    <div style={{ fontFamily: 'Cinzel, serif', letterSpacing: '0.08em' }}>{invitation.groom_name}</div>
                    <div style={{ opacity: 0.95, marginTop: 6 }}>
                      S/O {invitation.groom_father} {invitation.groom_mother ? `& ${invitation.groom_mother}` : ''}
                    </div>
                    {invitation.groom_address ? <div style={{ marginTop: 8, opacity: 0.88 }}>{invitation.groom_address}</div> : null}
                  </div>
                </div>

                <div className="box">
                  <div className="label">Bride</div>
                  <div className="value">
                    <div style={{ fontFamily: 'Cinzel, serif', letterSpacing: '0.08em' }}>{invitation.bride_name}</div>
                    <div style={{ opacity: 0.95, marginTop: 6 }}>
                      D/O {invitation.bride_father} {invitation.bride_mother ? `& ${invitation.bride_mother}` : ''}
                    </div>
                    {invitation.bride_address ? <div style={{ marginTop: 8, opacity: 0.88 }}>{invitation.bride_address}</div> : null}
                  </div>
                </div>
              </div>

              <div className="sectionTitle">Event Details</div>
              <div className="grid2">
                <div className="box">
                  <div className="label">{invitation.event1_name || 'Main Event'}</div>
                  <div className="value">
                    <div>{event1DateFormatted}</div>
                    <div style={{ marginTop: 6 }}>Time: {formatTime(invitation.event1_time)}</div>
                    <div style={{ marginTop: 6, opacity: 0.9 }}>{invitation.event1_location}</div>
                  </div>
                </div>

                <div className="box">
                  <div className="label">Countdown</div>
                  <div className="countdownRow">
                    {[
                      { lab: 'DAYS', val: timeLeft.days },
                      { lab: 'HRS', val: timeLeft.hours },
                      { lab: 'MIN', val: timeLeft.minutes },
                      { lab: 'SEC', val: timeLeft.seconds },
                    ].map((x) => (
                      <div key={x.lab} className="pill">
                        <div className="pillNum">{x.val}</div>
                        <div className="pillLab">{x.lab}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="cover"
            onClick={() => setOpened(true)}
            role="button"
            aria-label="Open invitation card"
            tabIndex={0}
          >
            <div className="cover-left" aria-hidden="true">
              <img className="cover-img" src={COVER_IMG} alt="" />
            </div>
            <div className="cover-right" aria-hidden="true">
              <img className="cover-img" src={COVER_IMG} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GoldMandalaTemplate

