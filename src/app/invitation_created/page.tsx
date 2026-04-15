'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { AnimatePresence, motion,useAnimation } from 'framer-motion'
import { DonateModal } from '@/components/ui/success_popup'
import Link from 'next/link'
import DonateButton from '@/components/ui/donate_button';

function SuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const slug = searchParams.get('slug')
  const [invitationLink, setInvitationLink] = useState('')
  const [copySuccess, setCopySuccess] = useState(false)
  const [showDonate, setShowDonate] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  
  const handleDonate = () => {
    setShowDonate(true);

    
  };

  useEffect(() => {
    if (slug) {
      setInvitationLink(`${window.location.origin}/invite/${slug}`)
    } else {
      // If someone lands here without a slug, send them back to create
      router.push('/create')
    }
  }, [slug, router])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(invitationLink)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error('Failed to copy!', err)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Wedding Invitation',
          text: 'You are invited to our wedding!',
          url: invitationLink
        })
      } catch (error) {
        console.error('Share failed:', error)
      }
    } else {
      handleCopy()
    }
  }

  if (!slug) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden"
      >
        {/* Top accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400" />

        <div className="px-8 py-8 text-center">
          {/* Success icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', damping: 14 }}
            className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5 border border-green-200"
          >
            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/>
            </svg>
          </motion.div>

          <h3 className="text-2xl font-serif font-semibold text-gray-900 mb-1"> Invitation Created! 🎉</h3>
          <p className="text-sm text-gray-500 mb-6">Your beautiful invitation is now live and ready to be shared with everyone.</p>

          {/* Priview Button  */}
          <button onClick={()=>setShowPreview(true)}
            className='w-full flex items-center justify-center gap-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 px-4 py-3 rounded-2xl text-sm font-medium transition-all mb-5 '>
                {/* <svg className='w-4 h-4'> */}
                    {/* <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/> */}
                    {/* <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/> */}
                {/* </svg> */}
                Preview Invitation
            </button>
        {/* Scorallable preview modal */}
        <AnimatePresence>
                {showPreview && (
                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onClick={() => setShowPreview(false)}
                    >
                    <motion.div
                        initial={{ scale: 0.92, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ type: 'spring', damping: 20 }}
                        className="relative w-full max-w-sm h-[75vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white z-10">
                        <span className="text-sm font-medium text-gray-700">Preview</span>
                        <button
                            onClick={() => setShowPreview(false)}
                            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
                        >×</button>
                        </div>
                        {/* Scrollable iframe */}
                        <iframe
                        src={`${invitationLink}?preview=true`}
                        className="w-full h-full border-0"
                        title="Invitation Preview"
                        />
                    </motion.div>
                    </motion.div>
                )}
                </AnimatePresence>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white px-4 py-3 rounded-xl text-sm font-medium transition-all"
            >
              {copySuccess ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/>
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                  Copy Link
                </>
              )}
            </button>

            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-4 py-3 rounded-xl text-sm font-medium transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
              </svg>
              Share
            </button>
          </div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={handleDonate}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border border-amber-300 text-amber-800 px-4 py-4 rounded-2xl text-sm font-bold transition-all mb-4 shadow-sm active:shadow-inner"
          >
            <span className="text-2xl animate-bounce">☕</span>
            Devinu oru "Kattanum Parippuvadayum
          </button>
        </motion.div>

            {/* Toast */}
      <AnimatePresence>
        {showDonate && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="px-5 py-3 bg-white border border-amber-200 rounded-xl shadow text-amber-800 text-sm font-medium"
          >
            ☕ Thank you! The devs appreciate it 🙏
          </motion.div>
        )}
      </AnimatePresence>

          <div className="flex flex-col gap-2">
            <Link
              href="/create"
              className="mt-4 w-full bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-600 px-4 py-3 rounded-xl text-sm font-medium transition-all"
            >
              Create one more invitation?
            </Link>
            <Link href="/" className="text-xs text-amber-600 hover:underline">
              Back to Home
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Donate modal */}
      <DonateModal open={showDonate} onClose={() => setShowDonate(false)} />
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  )
}