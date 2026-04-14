import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Heart, Sparkles, Users } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-amber-600" />
              <span className="text-xl font-serif text-amber-900">WeddingInvites</span>
            </div>
            <div className="flex gap-4">
              <Link href="/create">
                <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50">
                  Create Invitation
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="ghost" className="text-amber-700">
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Sparkles className="w-12 h-12 text-amber-500 animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-amber-900 mb-6">
            Create Your Wedding
            <br />
            <span className="text-amber-600">Invitation in Minutes</span>
          </h1>
          <p className="text-xl text-amber-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Design beautiful, personalized wedding invitations that your guests will love. 
            No design skills required - just fill in your details and we'll create something magical.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/create">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg">
                Create Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50 px-8 py-4 text-lg">
              View Sample
            </Button>
          </div>
        </div>

        {/* Sample Preview */}
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-8 text-center">
                <div className="text-2xl font-serif text-amber-900 mb-4">Sample Invitation</div>
                <div className="text-4xl font-serif text-amber-900 mb-2">John & Jane</div>
                <div className="text-amber-700 mb-6">Together Forever</div>
                <div className="bg-white/80 rounded-lg p-4 max-w-sm mx-auto">
                  <div className="text-amber-800 font-semibold mb-2">Wedding Ceremony</div>
                  <div className="text-sm text-amber-700">
                    <div>📅 December 25, 2024</div>
                    <div>🕐 4:00 PM</div>
                    <div>📍 Beautiful Garden Venue</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif text-amber-900 text-center mb-12">
            Why Choose WeddingInvites?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2">Beautiful Designs</h3>
                <p className="text-amber-700">
                  Elegant, romantic templates that capture the essence of your special day
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2">Multi-Cultural</h3>
                <p className="text-amber-700">
                  Support for Islamic, Hindu, Christian, and General wedding themes
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2">Easy to Share</h3>
                <p className="text-amber-700">
                  Share your beautiful invitation with guests via WhatsApp, email, or social media
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif text-amber-900 mb-6">
            Ready to Create Your Dream Invitation?
          </h2>
          <p className="text-xl text-amber-700 mb-8 max-w-2xl mx-auto">
            Join thousands of couples who have created beautiful wedding invitations with our platform
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg">
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-5 h-5" />
            <span className="font-serif">WeddingInvites</span>
          </div>
          <p className="text-amber-200">
            Making wedding invitations beautiful and accessible for everyone
          </p>
        </div>
      </footer>
    </div>
  )
}
