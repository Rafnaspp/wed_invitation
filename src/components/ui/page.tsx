'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { DonateModal } from '@/components/ui/success_popup'
import Link from 'next/link'

function SuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const slug = searchParams.get('slug')
  const [copySuccess, setCopySuccess] = useState(false)
  const [showDonate, setShowDonate] = useState(false)
  const invitationLink =
    slug && typeof window !== 'undefined' ? `${window.location.origin}/invite/${slug}` : ''

  useEffect(() => {
    if (!slug) {
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

          <h3 className="text-2xl font-serif font-semibold text-gray-900 mb-1">Aayi! Invitation Ready! 🎉</h3>
          <p className="text-sm text-gray-500 mb-6">Your beautiful invitation is now live and ready to be shared with everyone.</p>

          {/* Link box */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 mb-5 text-left">
            <p className="text-[10px] uppercase tracking-widest text-amber-500 mb-1">Invitation Link</p>
            <p className="text-sm text-amber-900 font-mono break-all">{invitationLink}</p>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3 mb-3">
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

          {/* Donate button with Malayali Touch */}
          <button
            onClick={() => setShowDonate(true)}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border border-amber-300 text-amber-800 px-4 py-3 rounded-xl text-sm font-medium transition-all mb-3 active:scale-95"
          >
            <span className="text-xl">☕</span>
            {' oru "Kattanum Parippuvadayum'}
          </button>

          <div className="flex flex-col gap-2">
            {React.createElement(
              Link,
              {
                href: '/create',
                className:
                  'w-full bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-600 px-4 py-3 rounded-xl text-sm font-medium transition-all',
              },
              'Iniyum Onnu Undakkiyaalo?'
            )}
            {React.createElement(
              Link,
              { href: '/', className: 'text-xs text-amber-600 hover:underline' },
              'Back to Home'
            )}
          </div>
        </div>
      </motion.div>

      {/* Donate modal */}
      <DonateModal open={showDonate} onClose={() => setShowDonate(false)} />
    </div>
  )
}

export default function SuccessPage() {
  return React.createElement(
    Suspense,
    { fallback: React.createElement('div', null, 'Loading...') },
    React.createElement(SuccessContent)
  )
}