'use client'


import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { motion, AnimatePresence } from 'framer-motion'


// ── Config ────────────────────────────────────────────────────────────────────
const DONATE_CONFIG = {
  upiId: process.env.NEXT_PUBLIC_UPI_ID,
  upiName: process.env.NEXT_PUBLIC_UPI_NAME,          // ← replace with your name
  presetAmounts: [100,200,300,400,500],
}

// ── QR code as inline SVG (no extra package needed) ──────────────────────────
// Generates a UPI deep-link QR. For production, use qrcode.react instead.
export function UpiQR({ upiId, name, amount }: { upiId: string; name: string; amount: number }) {
  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR`
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="bg-white rounded-xl border border-amber-200 p-3 shadow-sm">
        <QRCodeSVG value={upiUrl} size={160} level="M" />
      </div>
      <p className="text-[10px] text-amber-700 text-center leading-relaxed font-medium">
        Scan with Google Pay · PhonePe<br />Paytm · BHIM · any UPI app
      </p>
    </div>
  )
}

// ── Donate Modal ──────────────────────────────────────────────────────────────
export function DonateModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [selectedAmount, setSelectedAmount] = useState(501)
  const [customAmount, setCustomAmount] = useState('')
  const [upiCopied, setUpiCopied] = useState(false)

  const finalAmount = customAmount ? parseInt(customAmount) || selectedAmount : selectedAmount

  const copyUpi = async () => {
    await navigator.clipboard.writeText(DONATE_CONFIG.upiId ??'').catch(() => {})
    setUpiCopied(true)
    setTimeout(() => setUpiCopied(false), 2000)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 24 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 px-6 pt-6 pb-4 border-b border-amber-100 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 rounded-2xl bg-amber-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-amber-900">Bless us with a cup of tea</h3>
                  <p className="text-xs text-amber-600">A small token of love for the developer</p>
                </div>
              </div>
            </div>

            <div className="px-6 py-5 space-y-5">
              {/* QR Code */}
              <UpiQR upiId={DONATE_CONFIG.upiId ??''} name={DONATE_CONFIG.upiName??''} amount={finalAmount} />

              {/* Amount selector */}
              <div>
                <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Select amount</p>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {DONATE_CONFIG.presetAmounts.map(amt => (
                    <button
                      key={amt}
                      onClick={() => { setSelectedAmount(amt); setCustomAmount('') }}
                      className={`py-2 rounded-xl text-sm font-medium transition-all ${
                        selectedAmount === amt && !customAmount
                          ? 'bg-amber-600 text-white shadow-sm'
                          : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
                      }`}
                    >
                      ₹{amt >= 1000 ? `${amt/1000}k` : amt}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="Custom amount"
                  value={customAmount}
                  onChange={e => setCustomAmount(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-amber-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-amber-50 placeholder-amber-300"
                />
              </div>

              {/* UPI ID row */}
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5">
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] uppercase tracking-widest text-amber-500 mb-0.5">UPI ID</p>
                  <p className="text-sm font-mono text-amber-900 truncate">{DONATE_CONFIG.upiId}</p>
                </div>
                <button
                  onClick={copyUpi}
                  className="shrink-0 text-xs px-3 py-1.5 bg-white border border-amber-300 rounded-lg text-amber-700 hover:bg-amber-100 transition-colors font-medium"
                >
                  {upiCopied ? '✓ Copied' : 'Copy'}
                </button>
              </div>

              {/* Pay button */}
              <a
                href={`upi://pay?pa=${DONATE_CONFIG.upiId}&pn=${encodeURIComponent(DONATE_CONFIG.upiName??'')}&am=${finalAmount}&cu=INR`}
                className="block w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-center py-3.5 rounded-xl font-semibold text-sm shadow-md transition-all"
              >
                Pay ₹{finalAmount.toLocaleString('en-IN')} via UPI
              </a>

              <p className="text-center text-[11px] text-gray-400">
                Payment goes directly to the couple · 100% secure
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Success Popup ─────────────────────────────────────────────────────────────
// Props mirror the state already in your CreateInvitation component.
export function SuccessPopup({
  show,
  invitationLink,
  copySuccess,
  onCopy,
  onShare,
  onClose,
}: {
  show: boolean
  invitationLink: string
  copySuccess: boolean
  onCopy: () => void
  onShare: () => void
  onClose: () => void
}) {
  const [showDonate, setShowDonate] = useState(false)

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 32 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 32 }}
              transition={{ type: 'spring', damping: 22, stiffness: 280 }}
              className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden"
            >
              {/* Top accent bar */}
              <div className="h-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400" />

              <div className="px-8 py-8 text-center">
                {/* Success icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, type: 'spring', damping: 14 }}
                  className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5 border border-green-200"
                >
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/>
                  </svg>
                </motion.div>

                <h3 className="text-2xl font-serif font-semibold text-gray-900 mb-1">Invitation Created!</h3>
                <p className="text-sm text-gray-500 mb-6">Your wedding invitation is live and ready to share.</p>

                {/* Link box */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 mb-5 text-left">
                  <p className="text-[10px] uppercase tracking-widest text-amber-500 mb-1">Invitation Link</p>
                  <p className="text-sm text-amber-900 font-mono break-all">{invitationLink}</p>
                </div>

                {/* Action buttons */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <button
                    onClick={onCopy}
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
                    onClick={onShare}
                    className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-4 py-3 rounded-xl text-sm font-medium transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                    </svg>
                    Share
                  </button>
                </div>

                {/* Donate button */}
                <button
                  onClick={() => setShowDonate(true)}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border border-amber-300 text-amber-800 px-4 py-3 rounded-xl text-sm font-medium transition-all mb-3 active:scale-95"
                >
                  <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
                  </svg>
                  Gift /Donate to the devs
                </button>

                <button
                  onClick={onClose}
                  className="w-full bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-600 px-4 py-3 rounded-xl text-sm font-medium transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Donate modal — layered above success popup */}
      <DonateModal open={showDonate} onClose={() => setShowDonate(false)} />
    </>
  )
}
