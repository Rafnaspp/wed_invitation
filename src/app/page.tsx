"use client";
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Heart, Sparkles, Users } from 'lucide-react'
import {motion} from "framer-motion";


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
              {/* <Link href="/dashboard">
                <Button variant="ghost" className="text-amber-700">
                  Dashboard
                </Button>
              </Link> */}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className=" py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-6">
            <Sparkles className="w-12 h-12 text-amber-500 animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-amber-900 mb-6 text-center leading-tight">
            Create Your Wedding
            <br />
            <span className="text-amber-600 flex justify-center">Invitation in Minutes</span>
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
            {/* <Button size="lg" variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50 px-8 py-4 text-lg">
              View Sample
            </Button> */}
          </div>
        </div>

        {/* Sample Preview */}
        <div className='flex justify-center items-center mt-10'>
          <motion.div 
              initial={{opacity:0 ,y:30 , scale:0.98}}
              animate={{opacity:1,y:0,scale:1}}
              transition={{duration:0.8,ease:"easeOut"}}
              className='w-2xl p-10 rounded-2xl shadow-xl bg-gradient-to-b from[#f5e6d3] to-[#eed9c4]'>
                  <p className='text-center text-brown-700 text-sm mb-5'>
                    Sample Invitation
                  </p>
                  {/* Names with blur -> clear */}
                  <motion.h1
                    initial={{opacity:0,filter:"blur(10px)"}}
                    animate={{opacity:1,filter:"blur(0px)"}}
                    transition={{delay:0.2,duration:0.6}}
                    className='text-center text-3xl font-semibold text-[#6b3e26]'
                  >
                    John & Jane
                  </motion.h1>
                  {/* Tagline */}
                  <motion.p
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    transition={{delay:0.5,duration:0.5}}
                    className='text-center text-sm text-[#6b3e26] mb-2'>
                      Together Forever
                    </motion.p>
                  {/* Divider */}
                  <motion.div 
                    initial={{opacity:0,scale:0.8}}
                    animate={{opacity:1,scale:1}}
                    transition={{delay:0.7,duration:0.4}}
                    className='text-center my-4 text-[#6b3e26]'>
                      — ❦ —
                    </motion.div>
                  {/* Details */}
                  <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible:{
                        transition:{
                          staggerChildren:0.15,
                          delayChildren:0.9,
                        },
                      },
                    }}
                    className='text-center text-[#6b3e26]'>
                      {["Decemmber 25,2024","4:00 PM","Beutyful Garden Venue" ].map(
                        (item,i)=>(
                          <motion.p
                            key={i}
                            variants={{
                              hidden:{opacity:0,y:10},
                              visible:{opacity:1,y:0}
                            }}
                            transition={{duration:0.4}}
                            className='my-1'
                            >
                              {item}
                            </motion.p>
                        )
                      )}
                    </motion.div>
              </motion.div>
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
