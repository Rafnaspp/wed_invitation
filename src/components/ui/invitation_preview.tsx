"use client"
import { motion } from "framer-motion"

type InvitationPreviewData = {
  groom_name?: string
  bride_name?: string
  event1_date?: string
  event1_time?: string
  event1_location?: string
}

const formatTime = (timeStr: string) => {
  if (!timeStr) return ''
  const [hours, minutes] = timeStr.split(':')
  const h = parseInt(hours)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const h12 = h % 12 || 12
  return `${h12}:${minutes} ${ampm}`
}

export default function InvitationPreview({ data }: { data: InvitationPreviewData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="w-[280px] p-6 rounded-xl shadow-xl bg-gradient-to-b from-[#f5e6d3] to-[#eed9c4]"
    >
      <p className="text-center text-sm mb-3 text-[#6b3e26]">
        Invitation Preview
      </p>

      <h1 className="text-center text-2xl font-semibold text-[#6b3e26]">
        {data.groom_name || "John"} & {data.bride_name || "Jane"}
      </h1>

      <p className="text-center text-xs text-[#6b3e26] mb-2">
        Together Forever
      </p>

      <div className="text-center my-2 text-[#6b3e26]">— ❦ —</div>

      <div className="text-center text-sm text-[#6b3e26]">
        <p>{data.event1_date || "Dec 25, 2024"}</p>
        <p>{data.event1_time ? formatTime(data.event1_time) : "4:00 PM"}</p>
        <p>{data.event1_location || "Venue"}</p>
      </div>
    </motion.div>
  )
}