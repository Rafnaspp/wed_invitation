'use client'

import { useEffect, useState } from 'react'
import './invitation.css'

export default function WeddingInvitation() {
  const [envelopeOpened, setEnvelopeOpened] = useState(false)
  const [countdown, setCountdown] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  })

  useEffect(() => {
    // Countdown timer
    const countDownDate = new Date("Apr 17, 2026 10:00:00").getTime()
    
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = countDownDate - now

      if (distance < 0) {
        clearInterval(timer)
        setCountdown({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00'
        })
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setCountdown({
        days: days < 10 ? '0' + days : days.toString(),
        hours: hours < 10 ? '0' + hours : hours.toString(),
        minutes: minutes < 10 ? '0' + minutes : minutes.toString(),
        seconds: seconds < 10 ? '0' + seconds : seconds.toString()
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    }

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    const revealElements = document.querySelectorAll('.scroll-reveal')
    revealElements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const handleEnvelopeClick = () => {
    // Trigger flap open animation
    const envelopeCover = document.getElementById("envelope-cover")
    const mainContent = document.getElementById("main-content")
    
    if (envelopeCover) {
      envelopeCover.classList.add("opening")

      // Wait for flap animation then fade out wrapper
      setTimeout(() => {
        envelopeCover.classList.add("opened")
        if (mainContent) {
          mainContent.classList.remove("hidden")
        }

        // Allow time for display:block to apply before scrolling
        setTimeout(() => {
          window.scrollTo(0, 0)
        }, 50)

        // Completely remove from DOM flow after fade
        setTimeout(() => {
          if (envelopeCover) {
            envelopeCover.style.display = 'none'
          }
        }, 1000)

      }, 800)
    }

    setEnvelopeOpened(true)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <>
      {/* Loading / Envelope Cover */}
      <div id="envelope-cover" className="envelope-cover" onClick={handleEnvelopeClick}>
        <div className="envelope-inner">
          <div className="envelope-flap"></div>
          <div className="envelope-content">
            <h1 className="invite-text">You're Invited</h1>
            <p className="tap-text">Tap to open</p>
            <div className="envelope-seal">♥</div>
          </div>
        </div>
      </div>

      {/* Main Content Background Wrapper */}
      <div id="main-content" className="main-content hidden">

        {/* Hero Section */}
        <section className="hero" id="home">
          <div className="hero-overlay"></div>
          <div className="hero-glass-card fade-up">
            <p className="sub-title gold-text">TOGETHER WITH THEIR FAMILIES</p>
            <h1 className="hero-names">Afsal <span className="ampersand">&</span> Lubna</h1>
            <p className="hero-date">April 17, 2026</p>
          </div>
          <a href="#intro" className="scroll-down-btn bounce">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </a>
        </section>

        {/* Intro / Bismillah Section */}
        <section className="intro section-pad" id="intro">
          <div className="container text-center scroll-reveal">
            <div className="bismillah-block">
              <p className="arabic">بسم الله الرحمن الرحيم</p>
              <p className="bismillah-eng">In the name of Allah, <br />The most beneficial and the most gracious</p>
            </div>

            <h2 className="section-title text-teal">Invitation</h2>
            <div className="divider vine-divider">❧</div>

            <h3 className="parents-names">Mr. Abdul Kareem C & Mrs. Afsath</h3>
            <p className="parents-address">Afra manzil, Edavachal, Maniyoor</p>

            <p className="invite-msg">With gratitude to Allah, please join us to celebrate the Nikah of</p>
          </div>
        </section>

        {/* The Couple Section */}
        <section className="couple-section section-pad bg-light">
          <div className="container scroll-reveal">
            <div className="couple-grid">
              <div className="person-card">
                <h2 className="person-name">Afsal</h2>
              </div>

              <div className="ampersand-big text-gold">&</div>

              <div className="person-card">
                <h2 className="person-name">Lubna</h2>
              </div>
            </div>
            <p className="insha-allah">Insha Allah</p>
          </div>
        </section>

        {/* Countdown Timer */}
        <section className="countdown-section section-pad">
          <div className="container text-center scroll-reveal">
            <h2 className="section-title text-teal">The Big Day</h2>
            <div className="divider">❧</div>

            <div className="countdown-grid" id="countdown">
              <div className="time-box">
                <div className="time-val" id="cd-days">{countdown.days}</div>
                <div className="time-label">DAYS</div>
              </div>
              <div className="time-box">
                <div className="time-val" id="cd-hours">{countdown.hours}</div>
                <div className="time-label">HOURS</div>
              </div>
              <div className="time-box">
                <div className="time-val" id="cd-mins">{countdown.minutes}</div>
                <div className="time-label">MINS</div>
              </div>
              <div className="time-box">
                <div className="time-val" id="cd-secs">{countdown.seconds}</div>
                <div className="time-label">SECS</div>
              </div>
            </div>
          </div>
        </section>

        {/* Event Details */}
        <section className="event-details section-pad bg-light" id="events">
          <div className="container scroll-reveal">
            <h2 className="section-title text-teal text-center" style={{ marginBottom: '10px' }}>Event Details</h2>
            <div className="divider text-center" style={{ marginBottom: '50px' }}>❧</div>

            {/* Nikah Ceremony */}
            <div className="event-card mb-5" style={{ marginBottom: '40px' }}>
              <div className="event-date-box">
                <span className="month">APRIL</span>
                <span className="date">17</span>
                <span className="year">2026</span>
              </div>
              <div className="event-info">
                <h3 className="event-title text-teal">Nikah Ceremony</h3>
                <p className="hijri-date" style={{ marginBottom: '20px' }}>Friday<br /></p>

                <div className="event-row">
                  <span className="icon">🕒</span>
                  <div>
                    <p className="strong">Time</p>
                    <p>10:00 AM</p>
                  </div>
                </div>

                <div className="event-row">
                  <span className="icon">📍</span>
                  <div>
                    <p className="strong">Location</p>
                    <p>Kadoor Juma Masjid</p>
                  </div>
                </div>

                <div className="event-row">
                  <span className="icon">🎉</span>
                  <div>
                    <p className="strong">Function Details</p>
                    <p>Reception to follow</p>
                  </div>
                </div>

                <a 
                  href="https://www.google.com/maps/place/Kadoor+Juma+Masjid/@11.97041,75.4529757,17z/data=!3m1!4b1!4m16!1m9!4m8!1m0!1m6!1m2!1s0x3ba4395da89a1b1d:0x17aad162ffd64f44!2sKadoor+Juma+Masjid,+XFC4%2B567,+Kadoor,+Kerala+670602!2m2!1d75.4555392!2d11.9703615!3m5!1s0x3ba4395da89a1b1d:0x17aad162ffd64f44!8m2!3d11.9704048!4d75.4555506!16s%2Fg%2F11fxzj4np1?entry=ttu&g_ep=EgoyMDI2MDQxMi4wIKXMDSoASAFQAw%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="gradient-btn mt-4"
                >
                  Get Location 
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer text-center section-pad">
          <div className="container scroll-reveal">
            <button id="back-to-top" className="back-top-btn" onClick={scrollToTop}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
            <div className="compliments mt-4">
              <p className="comp-text text-teal">With Best Compliments From</p>
              <p className="comp-names text-gold uppercase">Family and Friends</p>
            </div>
            <p className="footer-credit mt-4">We can't wait to celebrate with you!</p>
          </div>
        </footer>
      </div>
    </>
  )
}
