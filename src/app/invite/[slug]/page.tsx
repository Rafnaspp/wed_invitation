'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { api, Invitation } from '@/lib/api'
import { Share2, MapPin, Clock, Calendar, ChevronDown, Heart, Sparkles } from 'lucide-react'

export default function InvitationPage() {
  const params = useParams()
  const router = useRouter()
  const [invitation, setInvitation] = useState<Invitation | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentSection, setCurrentSection] = useState('intro')
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const fetchInvitation = async () => {
      try {
        const invitationData = await api.getInvitation(params.slug as string)
        
        if (invitationData) {
          setInvitation(invitationData)
        } else {
          // For demo purposes, use mock data if API fails
          setInvitation({
            _id: '1',
            slug: params.slug as string,
            groom_name: 'Shamil',
            groom_father: 'Late. Assainar',
            groom_mother: 'Mrs. Asma',
            groom_address: 'Al Aman, Kizhunnapara, Thottada',
            bride_name: 'Sahada',
            bride_father: 'Mr. Muhammed Ali PK',
            bride_mother: 'Mrs. Soudath.M',
            bride_address: "Sahada's, Thannada, Chala",
            theme: 'islamic',
            event1_name: 'Nikkah Ceremony',
            event1_date: '2026-04-26',
            event1_time: '16:00',
            event1_location: 'Sheikh Juma Masjid, Thannada',
            event1_maps_url: 'https://maps.app.goo.gl/fnDRetZGpYwPdr7Z8',
            event2_name: 'Wedding Reception',
            event2_date: '2026-04-27',
            event2_time: '10:00',
            event2_location: 'Al Aman, Kizhunnapara, Thottada',
            event2_maps_url: 'https://maps.app.goo.gl/NzfcPADyn87fvxcD6',
            created_at: new Date().toISOString()
          })
        }
      } catch (error) {
        console.error('Error fetching invitation:', error)
        // For demo purposes, use mock data if API fails
        setInvitation({
          _id: '1',
          slug: params.slug as string,
          groom_name: 'Shamil',
          groom_father: 'Late. Assainar',
          groom_mother: 'Mrs. Asma',
          groom_address: 'Al Aman, Kizhunnapara, Thottada',
          bride_name: 'Sahada',
          bride_father: 'Mr. Muhammed Ali PK',
          bride_mother: 'Mrs. Soudath.M',
          bride_address: "Sahada's, Thannada, Chala",
          theme: 'islamic',
          event1_name: 'Nikkah Ceremony',
          event1_date: '2026-04-26',
          event1_time: '16:00',
          event1_location: 'Sheikh Juma Masjid, Thannada',
          event1_maps_url: 'https://maps.app.goo.gl/fnDRetZGpYwPdr7Z8',
          event2_name: 'Wedding Reception',
          event2_date: '2026-04-27',
          event2_time: '10:00',
          event2_location: 'Al Aman, Kizhunnapara, Thottada',
          event2_maps_url: 'https://maps.app.goo.gl/NzfcPADyn87fvxcD6',
          created_at: new Date().toISOString()
        })
      } finally {
        setLoading(false)
      }
    }

    fetchInvitation()
  }, [params.slug, router])

  useEffect(() => {
    if (!invitation?.event1_date) return

    const calculateTimeLeft = () => {
      const weddingDate = new Date(invitation.event1_date)
      const now = new Date()
      const difference = weddingDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [invitation])

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      await navigator.share({
        title: `${invitation?.groom_name} & ${invitation?.bride_name}'s Wedding`,
        text: 'You are invited to our wedding!',
        url: url
      })
    } else {
      await navigator.clipboard.writeText(url)
      alert('Invitation link copied to clipboard!')
    }
  }

  const getThemeBlessing = () => {
    switch (invitation?.theme) {
      case 'islamic':
        return 'In the name of Allah, The most beneficial and the most gracious'
      case 'hindu':
        return 'With divine blessings'
      case 'christian':
        return 'In the name of the Father, and of the Son, and of the Holy Spirit'
      default:
        return 'With love and joy, we invite you to celebrate'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div>
      </div>
    )
  }

  if (!invitation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-amber-900 mb-4">Invitation Not Found</h1>
          <Button onClick={() => router.push('/')} className="bg-amber-600 hover:bg-amber-700">
            Go Home
          </Button>
        </div>
      </div>
    )
  }

  const scrollToSection = (sectionId: string) => {
    setCurrentSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleLocationClick = (mapsUrl: string) => {
    window.open(mapsUrl, '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div>
      </div>
    )
  }

  if (!invitation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-amber-900 mb-4">Invitation Not Found</h1>
          <Button onClick={() => router.push('/')} className="bg-amber-600 hover:bg-amber-700">
            Go Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white relative overflow-hidden">
      {/* Background with subtle pattern */}
      <div className="fixed inset-0 bg-gradient-to-b from-emerald-50 via-white to-emerald-50">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-200 to-emerald-100"></div>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
        <div className="flex flex-col gap-4">
          {['intro', 'invitation', 'events', 'countdown'].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSection === section ? 'bg-emerald-600 scale-125' : 'bg-emerald-300 hover:bg-emerald-400'
              }`}
              aria-label={`Go to ${section}`}
            />
          ))}
        </div>
      </div>

      {/* Intro Section */}
      <section id="intro" className="min-h-screen flex items-center justify-center relative">
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Clean white card */}
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-emerald-100">
            <div className="space-y-8">
              {/* Envelope icon */}
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 bg-emerald-600 rounded-lg transform rotate-45"></div>
                  <Heart className="w-6 h-6 text-yellow-500 absolute" />
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl text-emerald-800 font-light tracking-wide">
                You're Invited
              </h1>
              
              <div className="space-y-2">
                <p className="text-lg text-emerald-600 font-light">
                  Tap to open
                </p>
              </div>
            </div>
          </div>

          {/* Scroll down button */}
          <button
            onClick={() => scrollToSection('invitation')}
            className="mt-8 w-12 h-12 bg-emerald-500 hover:bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:scale-110 animate-bounce"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Invitation Section */}
      <section id="invitation" className="min-h-screen flex items-center justify-center relative py-20">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-emerald-100">
            <div className="text-center space-y-8">
              <h3 className="text-4xl font-serif text-emerald-800 font-bold">TOGETHER WITH THEIR FAMILIES</h3>
              
              {/* Couple Names */}
              <div className="space-y-4">
                <h2 className="text-5xl md:text-6xl font-serif text-emerald-900 font-bold">
                  {invitation.groom_name} <span className="text-emerald-600">&</span> {invitation.bride_name}
                </h2>
                <div className="text-xl text-emerald-700">
                  {new Date(invitation.event1_date).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </div>
              </div>

              {/* Parents Information */}
              <div className="space-y-8">
                {invitation.groom_father && invitation.groom_mother && (
                  <div className="bg-emerald-50 rounded-2xl p-8">
                    <h4 className="text-xl text-emerald-800 mb-3">Mr. {invitation.groom_father} & Mrs. {invitation.groom_mother}</h4>
                    <p className="text-emerald-700 mb-4">{invitation.groom_address}</p>
                    <p className="text-emerald-800 font-serif italic mb-6">
                      Cordially invite your esteemed presence with family on the occasion of the marriage of our beloved son
                    </p>
                    <h5 className="text-3xl font-serif text-emerald-900 font-bold mb-2">
                      {invitation.groom_name}
                    </h5>
                    <p className="text-emerald-700">
                      Grand S/O {invitation.groom_father} & Mrs. {invitation.groom_mother}
                    </p>
                  </div>
                )}

                {invitation.bride_father && invitation.bride_mother && (
                  <div className="bg-emerald-50 rounded-2xl p-8">
                    <h5 className="text-3xl font-serif text-emerald-900 font-bold mb-2">
                      {invitation.bride_name}
                    </h5>
                    <p className="text-emerald-700 mb-2">
                      D/O Mr. {invitation.bride_father} & Mrs. {invitation.bride_mother}
                    </p>
                    <p className="text-emerald-600 mb-2">{invitation.bride_address}</p>
                    <p className="text-emerald-800 font-serif italic">Insha Allah</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="min-h-screen flex items-center justify-center relative py-20">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl md:text-5xl font-serif text-emerald-900 font-bold mb-4">The Big Day</h3>
            <h4 className="text-2xl text-emerald-700">Event Details</h4>
          </div>

          <div className="space-y-8">
            {/* Event 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-emerald-100">
              <h3 className="text-3xl font-serif text-emerald-900 font-bold mb-6 text-center">
                {invitation.event1_name}
              </h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-emerald-800 font-semibold mb-3">
                    {new Date(invitation.event1_date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="flex items-center justify-center gap-3 text-emerald-700 mb-4">
                    <Clock className="w-5 h-5" />
                    <span className="font-semibold">Time</span>
                    <span>{invitation.event1_time}</span>
                  </div>
                  <div className="flex items-start justify-center gap-3 text-emerald-700">
                    <MapPin className="w-5 h-5 mt-1" />
                    <div className="text-center">
                      <span className="font-semibold block mb-2">Location</span>
                      <p className="text-emerald-600 mb-4">{invitation.event1_location}</p>
                      {invitation.event1_maps_url && (
                        <Button
                          onClick={() => handleLocationClick(invitation.event1_maps_url!)}
                          className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                          <MapPin className="w-4 h-4 mr-2" />
                          Get Location
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Event 2 */}
            {invitation.event2_name && (
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-emerald-100">
                <h3 className="text-3xl font-serif text-emerald-900 font-bold mb-6 text-center">
                  {invitation.event2_name}
                </h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-emerald-800 font-semibold mb-3">
                      {invitation.event2_date && new Date(invitation.event2_date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="flex items-center justify-center gap-3 text-emerald-700 mb-4">
                      <Clock className="w-5 h-5" />
                      <span className="font-semibold">Time</span>
                      <span>{invitation.event2_time}</span>
                    </div>
                    <div className="flex items-start justify-center gap-3 text-emerald-700">
                      <MapPin className="w-5 h-5 mt-1" />
                      <div className="text-center">
                        <span className="font-semibold block mb-2">Location</span>
                        <p className="text-emerald-600 mb-4">{invitation.event2_location}</p>
                        {invitation.event2_maps_url && (
                          <Button
                            onClick={() => handleLocationClick(invitation.event2_maps_url!)}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                          >
                            <MapPin className="w-4 h-4 mr-2" />
                            Get Location
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section id="countdown" className="min-h-screen flex items-center justify-center relative py-20">
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-emerald-100">
            <h3 className="text-4xl font-serif text-emerald-900 font-bold mb-8">Countdown to the Big Day</h3>
            
            <div className="flex justify-center gap-4 md:gap-8 mb-12">
              <div className="bg-emerald-50 rounded-2xl p-6 min-w-[100px]">
                <div className="text-3xl md:text-4xl font-bold text-emerald-900">{timeLeft.days}</div>
                <div className="text-sm text-emerald-700 font-semibold">DAYS</div>
              </div>
              <div className="bg-emerald-50 rounded-2xl p-6 min-w-[100px]">
                <div className="text-3xl md:text-4xl font-bold text-emerald-900">{timeLeft.hours}</div>
                <div className="text-sm text-emerald-700 font-semibold">HOURS</div>
              </div>
              <div className="bg-emerald-50 rounded-2xl p-6 min-w-[100px]">
                <div className="text-3xl md:text-4xl font-bold text-emerald-900">{timeLeft.minutes}</div>
                <div className="text-sm text-emerald-700 font-semibold">MINS</div>
              </div>
              <div className="bg-emerald-50 rounded-2xl p-6 min-w-[100px]">
                <div className="text-3xl md:text-4xl font-bold text-emerald-900">{timeLeft.seconds}</div>
                <div className="text-sm text-emerald-700 font-semibold">SECS</div>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-emerald-800 font-semibold">With Best Compliments From</p>
              <p className="text-emerald-700">Family and Friends</p>
              <div className="pt-6">
                <p className="text-2xl font-serif text-emerald-900 font-bold italic">
                  We can't wait to celebrate with you!
                </p>
              </div>
              
              {/* Share Button */}
              <div className="pt-8">
                <Button 
                  onClick={handleShare}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share Invitation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </div>
  )
}
