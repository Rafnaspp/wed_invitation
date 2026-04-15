'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/lib/api'
import InvitationPreview from '@/components/ui/invitation_preview';
import {motion,AnimatePresence} from 'framer-motion';

interface FormData {
  groom_name: string
  groom_father: string
  groom_mother: string
  groom_address: string
  bride_name: string
  bride_father: string
  bride_mother: string
  bride_address: string
  theme: string
  event1_name: string
  event1_date: string
  event1_time: string
  event1_location: string
  event1_maps_url: string
  event2_name: string
  event2_date: string
  event2_time: string
  event2_location: string
  event2_maps_url: string
}


export default function CreateInvitation() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [previewPopup,setPreviewPopup] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    groom_name: '',
    groom_father: '',
    groom_mother: '',
    groom_address: '',
    bride_name: '',
    bride_father: '',
    bride_mother: '',
    bride_address: '',
    theme: 'general',
    event1_name: '',
    event1_date: '',
    event1_time: '',
    event1_location: '',
    event1_maps_url: '',
    event2_name: '',
    event2_date: '',
    event2_time: '',
    event2_location: '',
    event2_maps_url: ''
  })

  const generateSlug = (groomName: string, brideName: string) => {
    const groom = groomName.toLowerCase().replace(/\s+/g, '-')
    const bride = brideName.toLowerCase().replace(/\s+/g, '-')
    return `${groom}-${bride}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const slug = generateSlug(formData.groom_name, formData.bride_name)
      const invitationData = {
        ...formData,
        slug,
        event2_date: formData.event2_date || undefined,
        event2_time: formData.event2_time || undefined,
        event2_location: formData.event2_location || undefined,
        event2_maps_url: formData.event2_maps_url || undefined
      }
      
      const createdInvitation = await api.createInvitation(invitationData)
      router.push(`/invitation_created?slug=${createdInvitation.slug}`)
    } catch (error) {
      console.error('Error creating invitation:', error)
      alert('Error creating invitation. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-serif text-amber-900">
              Create Your Wedding Invitation
            </CardTitle>
            <CardDescription className="text-amber-700">
              Fill in the details below to create your beautiful wedding invitation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Groom Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-amber-800">Groom Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="groom_name">Groom Name *</Label>
                    <Input
                      id="groom_name"
                      value={formData.groom_name}
                      onChange={(e) => handleInputChange('groom_name', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="groom_address">Address</Label>
                    <Input
                      id="groom_address"
                      value={formData.groom_address}
                      onChange={(e) => handleInputChange('groom_address', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="groom_father">Father's Name</Label>
                    <Input
                      id="groom_father"
                      value={formData.groom_father}
                      onChange={(e) => handleInputChange('groom_father', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="groom_mother">Mother's Name</Label>
                    <Input
                      id="groom_mother"
                      value={formData.groom_mother}
                      onChange={(e) => handleInputChange('groom_mother', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Bride Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-amber-800">Bride Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bride_name">Bride Name *</Label>
                    <Input
                      id="bride_name"
                      value={formData.bride_name}
                      onChange={(e) => handleInputChange('bride_name', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="bride_address">Address</Label>
                    <Input
                      id="bride_address"
                      value={formData.bride_address}
                      onChange={(e) => handleInputChange('bride_address', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bride_father">Father's Name</Label>
                    <Input
                      id="bride_father"
                      value={formData.bride_father}
                      onChange={(e) => handleInputChange('bride_father', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bride_mother">Mother's Name</Label>
                    <Input
                      id="bride_mother"
                      value={formData.bride_mother}
                      onChange={(e) => handleInputChange('bride_mother', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Wedding Theme */}
              {/* <div className="space-y-4">
                <h3 className="text-xl font-semibold text-amber-800">Wedding Theme</h3>
                <div>
                  <Label htmlFor="theme">Select Theme *</Label>
                  <Select value={formData.theme} onValueChange={(value) => handleInputChange('theme', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="islamic">Islamic</SelectItem>
                      <SelectItem value="hindu">Hindu</SelectItem>
                      <SelectItem value="christian">Christian</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div> */}

              {/* Event 1 */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-amber-800">Main Event *</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="event1_name">Event Name *</Label>
                    <Input
                      id="event1_name"
                      value={formData.event1_name}
                      onChange={(e) => handleInputChange('event1_name', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="event1_date">Date *</Label>
                    <Input
                      id="event1_date"
                      type="date"
                      value={formData.event1_date}
                      onChange={(e) => handleInputChange('event1_date', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="event1_time">Time *</Label>
                    <Input
                      id="event1_time"
                      type="time"
                      value={formData.event1_time}
                      onChange={(e) => handleInputChange('event1_time', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="event1_maps_url">Google Maps URL</Label>
                    <Input
                      id="event1_maps_url"
                      value={formData.event1_maps_url}
                      onChange={(e) => handleInputChange('event1_maps_url', e.target.value)}
                      placeholder="https://maps.google.com/..."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="event1_location">Location *</Label>
                    <Textarea
                      id="event1_location"
                      value={formData.event1_location}
                      onChange={(e) => handleInputChange('event1_location', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Event 2 */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-amber-800">Second Event (Optional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="event2_name">Event Name</Label>
                    <Input
                      id="event2_name"
                      value={formData.event2_name}
                      onChange={(e) => handleInputChange('event2_name', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="event2_date">Date</Label>
                    <Input
                      id="event2_date"
                      type="date"
                      value={formData.event2_date}
                      onChange={(e) => handleInputChange('event2_date', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="event2_time">Time</Label>
                    <Input
                      id="event2_time"
                      type="time"
                      value={formData.event2_time}
                      onChange={(e) => handleInputChange('event2_time', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="event2_maps_url">Google Maps URL</Label>
                    <Input
                      id="event2_maps_url"
                      value={formData.event2_maps_url}
                      onChange={(e) => handleInputChange('event2_maps_url', e.target.value)}
                      placeholder="https://maps.google.com/..."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="event2_location">Location</Label>
                    <Textarea
                      id="event2_location"
                      value={formData.event2_location}
                      onChange={(e) => handleInputChange('event2_location', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setPreviewPopup(true)}
                    className="w-1/2"
                  >
                    Preview
                  </Button>

                  <Button 
                    type="submit" 
                    className="w-1/2 bg-amber-600 hover:bg-amber-700 text-white"
                    disabled={loading}
                  >
                    {loading ? 'Creating...' : 'Create Invitation'}
                  </Button>
                </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <AnimatePresence>
  {previewPopup && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-2xl shadow-2xl relative"
      >
        {/* Close Button */}
        <button
          onClick={() => setPreviewPopup(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {/* Preview */}
        <div className="flex justify-center">
          <InvitationPreview data={formData as any} forceOpen={true} />
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  )
}
