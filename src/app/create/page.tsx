'use client'

import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
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
  side:string
  theme: string
  template: string
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
  const [step, setStep] = useState<'template' | 'form'>('template')
  const [formData, setFormData] = useState<FormData>({
    groom_name: '',
    groom_father: '',
    groom_mother: '',
    groom_address: '',
    bride_name: '',
    bride_father: '',
    bride_mother: '',
    bride_address: '',
    side:'groom',
    theme: 'general',
    template: 'classic',
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

  const templateOptions: Array<{
    value: FormData['template']
    label: string
    description: string
    imageUrl: string
  }> = [
    {
      value: 'classic',
      label: 'Classic Minimal',
      description: 'Elegant serif, timeless and warm',
      imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070',
    },
    {
      value: 'glass',
      label: 'Modern Minimal',
      description: 'Clean typography with glassy hero',
      imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070',
    },
    {
      value: 'ethreal',
      label: 'Ethereal Botanical',
      description: 'Soft florals, editorial feel',
      imageUrl: 'https://images.unsplash.com/photo-1596751303335-ca42b3ca50c1?q=80&w=2070',
    },
  ]

  const generateSlug = (groomName: string, brideName: string) => {
    const groom = groomName.toLowerCase().replace(/\s+/g, '-')
    const bride = brideName.toLowerCase().replace(/\s+/g, '-')
    return `${groom}-${bride}`
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

  const handleTextChange =
    (field: keyof FormData) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      handleInputChange(field, e.target.value)
    }

  const selectedTemplateMeta =
    templateOptions.find((t) => t.value === formData.template) ?? templateOptions[0]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {step === 'template' ? (
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-serif text-amber-900">
                Choose a Wedding Card Design
              </CardTitle>
              <CardDescription className="text-amber-700">
                Select a template first — then we&apos;ll ask for your details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {templateOptions.map((tpl) => {
                  const isSelected = formData.template === tpl.value
                  return (
                    <button
                      key={tpl.value}
                      type="button"
                      onClick={() => {
                        handleInputChange('template', tpl.value)
                        setStep('form')
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                      className={[
                        'text-left rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow border',
                        isSelected ? 'border-amber-500 ring-2 ring-amber-200' : 'border-amber-100',
                      ].join(' ')}
                    >
                      <div
                        className="h-44 w-full bg-center bg-cover"
                        style={{ backgroundImage: `url(${tpl.imageUrl})` }}
                      />
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-lg font-semibold text-amber-900">{tpl.label}</p>
                            <p className="text-sm text-amber-700">{tpl.description}</p>
                          </div>
                          <span
                            className={[
                              'text-xs px-2 py-1 rounded-full border',
                              isSelected
                                ? 'border-amber-300 bg-amber-50 text-amber-800'
                                : 'border-amber-100 bg-white text-amber-700',
                            ].join(' ')}
                          >
                            {isSelected ? 'Selected' : 'Preview'}
                          </span>
                        </div>

                        <div className="mt-4">
                          <span className="inline-flex items-center justify-center w-full rounded-md bg-amber-600 hover:bg-amber-700 text-white py-2 text-sm font-medium">
                            Use this design
                          </span>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ) : (
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
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-8 p-4 rounded-xl bg-white border border-amber-100">
                <div>
                  <p className="text-sm text-amber-700">Selected design</p>
                  <p className="text-lg font-semibold text-amber-900">{selectedTemplateMeta.label}</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep('template')}
                  className="border-amber-200 text-amber-800 hover:bg-amber-50"
                >
                  Change template
                </Button>
              </div>

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
                      onChange={handleTextChange('groom_name')}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="groom_address">Address</Label>
                    <Input
                      id="groom_address"
                      value={formData.groom_address}
                      onChange={handleTextChange('groom_address')}
                    />
                  </div>
                  <div>
                    <Label htmlFor="groom_father">Father&apos;s Name</Label>
                    <Input
                      id="groom_father"
                      value={formData.groom_father}
                      onChange={handleTextChange('groom_father')}
                    />
                  </div>
                  <div>
                    <Label htmlFor="groom_mother">Mother&apos;s Name</Label>
                    <Input
                      id="groom_mother"
                      value={formData.groom_mother}
                      onChange={handleTextChange('groom_mother')}
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
                      onChange={handleTextChange('bride_name')}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="bride_address">Address</Label>
                    <Input
                      id="bride_address"
                      value={formData.bride_address}
                      onChange={handleTextChange('bride_address')}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bride_father">Father&apos;s Name</Label>
                    <Input
                      id="bride_father"
                      value={formData.bride_father}
                      onChange={handleTextChange('bride_father')}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bride_mother">Mother&apos;s Name</Label>
                    <Input
                      id="bride_mother"
                      value={formData.bride_mother}
                      onChange={handleTextChange('bride_mother')}
                    />
                  </div>
                </div>
              </div>

              {/* Wedding Theme */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-amber-800">Wedding Theme</h3>
                <div>
                  <Label htmlFor="theme">Select Theme *</Label>
                  <Select value={formData.theme} onValueChange={(value: string) => handleInputChange('theme', value)}>
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
              </div>

              {/* Side  */}
              <div className="space-y-4">
                  <Label>Who is creating this invitation? *</Label>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant={formData.side === 'groom' ? 'default' : 'outline'}
                      onClick={() => handleInputChange('side', 'groom')}
                      className={`flex-1 ${formData.side === 'groom' ? 'bg-amber-600 text-white' : 'bg-white'} hover:bg-amber-600 hover:text-white`}
                    >
                      Groom&apos;s Side
                    </Button>
                    <Button
                      type="button"
                      variant={formData.side === 'bride' ? 'default' : 'outline'}
                      onClick={() => handleInputChange('side', 'bride')}
                      className={`flex-1 ${formData.side === 'bride' ? 'bg-amber-600 text-white' : 'bg-white'} hover:bg-amber-600 hover:text-white`}
                    >
                      Bride&apos;s Side
                    </Button>
                  </div>
                </div>
              {/* Event 1 */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-amber-800">Main Event *</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="event1_name">Event Name *</Label>
                    <Input
                      id="event1_name"
                      value={formData.event1_name}
                      onChange={handleTextChange('event1_name')}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="event1_date">Date *</Label>
                    <Input
                      id="event1_date"
                      type="date"
                      value={formData.event1_date}
                      onChange={handleTextChange('event1_date')}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="event1_time">Time *</Label>
                    <Input
                      id="event1_time"
                      type="time"
                      value={formData.event1_time}
                      onChange={handleTextChange('event1_time')}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="event1_maps_url">Google Maps URL</Label>
                    <Input
                      id="event1_maps_url"
                      value={formData.event1_maps_url}
                      onChange={handleTextChange('event1_maps_url')}
                      placeholder="https://maps.google.com/..."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="event1_location">Location *</Label>
                    <Textarea
                      id="event1_location"
                      value={formData.event1_location}
                      onChange={handleTextChange('event1_location')}
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
                      onChange={handleTextChange('event2_name')}
                    />
                  </div>
                  <div>
                    <Label htmlFor="event2_date">Date</Label>
                    <Input
                      id="event2_date"
                      type="date"
                      value={formData.event2_date}
                      onChange={handleTextChange('event2_date')}
                    />
                  </div>
                  <div>
                    <Label htmlFor="event2_time">Time</Label>
                    <Input
                      id="event2_time"
                      type="time"
                      value={formData.event2_time}
                      onChange={handleTextChange('event2_time')}
                    />
                  </div>
                  <div>
                    <Label htmlFor="event2_maps_url">Google Maps URL</Label>
                    <Input
                      id="event2_maps_url"
                      value={formData.event2_maps_url}
                      onChange={handleTextChange('event2_maps_url')}
                      placeholder="https://maps.google.com/..."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="event2_location">Location</Label>
                    <Textarea
                      id="event2_location"
                      value={formData.event2_location}
                      onChange={handleTextChange('event2_location')}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                    disabled={loading}
                  >
                    {loading ? 'Creating...' : 'Create Invitation'}
                  </Button>
                </div>
            </form>
          </CardContent>
          </Card>
        )}
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
          <InvitationPreview data={formData} />
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  )
}
