'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

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

export default function DemoPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    groom_name: 'John Smith',
    groom_father: 'Robert Smith',
    groom_mother: 'Mary Smith',
    groom_address: '123 Main Street, New York, NY',
    bride_name: 'Jane Johnson',
    bride_father: 'David Johnson',
    bride_mother: 'Sarah Johnson',
    bride_address: '456 Oak Avenue, New York, NY',
    theme: 'general',
    event1_name: 'Wedding Ceremony',
    event1_date: '2024-12-25',
    event1_time: '16:00',
    event1_location: 'Grand Ballroom, Plaza Hotel',
    event1_maps_url: 'https://maps.google.com/?q=Plaza+Hotel+New+York',
    event2_name: 'Reception Dinner',
    event2_date: '2024-12-25',
    event2_time: '19:00',
    event2_location: 'Rooftop Garden, Plaza Hotel',
    event2_maps_url: 'https://maps.google.com/?q=Plaza+Hotel+New+York'
  })

  const generateSlug = (groomName: string, brideName: string) => {
    const groom = groomName.toLowerCase().replace(/\s+/g, '-')
    const bride = brideName.toLowerCase().replace(/\s+/g, '-')
    return `${groom}-${bride}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setShowPreview(true)
      setLoading(false)
    }, 1000)
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const getThemeBlessing = () => {
    switch (formData.theme) {
      case 'islamic':
        return 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم'
      case 'hindu':
        return 'ॐ श्री गणेशाय नमः'
      case 'christian':
        return 'In the name of the Father, and of the Son, and of the Holy Spirit'
      default:
        return 'With love and joy, we invite you to celebrate'
    }
  }

  if (showPreview) {
    const slug = generateSlug(formData.groom_name, formData.bride_name)
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-6">
            <Button 
              onClick={() => setShowPreview(false)}
              variant="outline"
              className="mb-4"
            >
              ← Back to Form
            </Button>
            <h1 className="text-3xl font-serif text-amber-900 mb-2">
              Your Wedding Invitation Preview
            </h1>
            <p className="text-amber-700">
              This is how your invitation will look: /invite/{slug}
            </p>
          </div>

          {/* Invitation Preview */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-8 text-center">
                <div className="text-3xl font-serif text-amber-900 mb-6">
                  {getThemeBlessing()}
                </div>
                <h1 className="text-5xl md:text-6xl font-serif text-amber-900 mb-2">
                  {formData.groom_name}
                </h1>
                <div className="text-3xl text-amber-700 mb-2">&</div>
                <h1 className="text-5xl md:text-6xl font-serif text-amber-900 mb-8">
                  {formData.bride_name}
                </h1>
                
                {/* Parents Information */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-amber-800 mb-2">Groom</h3>
                    {formData.groom_father && (
                      <p className="text-amber-700">S/o {formData.groom_father}</p>
                    )}
                    {formData.groom_mother && (
                      <p className="text-amber-700">& {formData.groom_mother}</p>
                    )}
                    {formData.groom_address && (
                      <p className="text-amber-600 text-sm mt-2">{formData.groom_address}</p>
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-amber-800 mb-2">Bride</h3>
                    {formData.bride_father && (
                      <p className="text-amber-700">D/o {formData.bride_father}</p>
                    )}
                    {formData.bride_mother && (
                      <p className="text-amber-700">& {formData.bride_mother}</p>
                    )}
                    {formData.bride_address && (
                      <p className="text-amber-600 text-sm mt-2">{formData.bride_address}</p>
                    )}
                  </div>
                </div>

                {/* Events */}
                <div className="space-y-6">
                  {/* Event 1 */}
                  <div className="bg-white/80 rounded-lg p-6">
                    <h3 className="text-2xl font-serif text-amber-900 mb-4">
                      {formData.event1_name}
                    </h3>
                    <div className="space-y-2 text-amber-700">
                      <div className="flex justify-center gap-2">
                        <span>📅</span>
                        <span>{new Date(formData.event1_date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex justify-center gap-2">
                        <span>🕐</span>
                        <span>{formData.event1_time}</span>
                      </div>
                      <div className="flex justify-center gap-2">
                        <span>📍</span>
                        <span>{formData.event1_location}</span>
                      </div>
                      {formData.event1_maps_url && (
                        <div className="flex justify-center mt-4">
                          <img 
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(formData.event1_maps_url)}`}
                            alt="Location QR Code"
                            className="w-32 h-32 border-2 border-amber-200 rounded"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Event 2 */}
                  {formData.event2_name && (
                    <div className="bg-white/80 rounded-lg p-6">
                      <h3 className="text-2xl font-serif text-amber-900 mb-4">
                        {formData.event2_name}
                      </h3>
                      <div className="space-y-2 text-amber-700">
                        <div className="flex justify-center gap-2">
                          <span>📅</span>
                          <span>{formData.event2_date && new Date(formData.event2_date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}</span>
                        </div>
                        <div className="flex justify-center gap-2">
                          <span>🕐</span>
                          <span>{formData.event2_time}</span>
                        </div>
                        <div className="flex justify-center gap-2">
                          <span>📍</span>
                          <span>{formData.event2_location}</span>
                        </div>
                        {formData.event2_maps_url && (
                          <div className="flex justify-center mt-4">
                            <img 
                              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(formData.event2_maps_url)}`}
                              alt="Location QR Code"
                              className="w-32 h-32 border-2 border-amber-200 rounded"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 p-4 bg-amber-50 rounded-lg">
                  <p className="text-amber-800 text-sm">
                    <strong>Share Link:</strong> /invite/{slug}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-serif text-amber-900">
              Demo: Create Your Wedding Invitation
            </CardTitle>
            <CardDescription className="text-amber-700">
              This demo shows how the invitation creation works. Form is pre-filled with sample data.
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
              <div className="space-y-4">
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

              <Button 
                type="submit" 
                className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Preview Invitation'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
