'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Copy, Edit, Trash2, Eye, Plus, Heart } from 'lucide-react'
import { api, Invitation } from '@/lib/api'

export default function Dashboard() {
  const [invitations, setInvitations] = useState<Invitation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInvitations()
  }, [])

  const fetchInvitations = async () => {
    try {
      const invitations = await api.getInvitations()
      setInvitations(invitations)
    } catch (error) {
      console.error('Error fetching invitations:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCopyLink = async (slug: string) => {
    const url = `${window.location.origin}/invite/${slug}`
    await navigator.clipboard.writeText(url)
    alert('Invitation link copied to clipboard!')
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this invitation?')) return

    try {
      await api.deleteInvitation(id)
      setInvitations(invitations.filter(inv => inv._id !== id))
    } catch (error) {
      console.error('Error deleting invitation:', error)
      alert('Error deleting invitation. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-amber-600" />
              <span className="text-xl font-serif text-amber-900">WeddingInvites</span>
            </Link>
            <div className="flex gap-4">
              <Link href="/create">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50">
                  Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-amber-900 mb-2">My Invitations</h1>
          <p className="text-amber-700">Manage and share your wedding invitations</p>
        </div>

        {invitations.length === 0 ? (
          <Card className="shadow-xl">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-amber-600" />
              </div>
              <h2 className="text-2xl font-serif text-amber-900 mb-4">No invitations yet</h2>
              <p className="text-amber-700 mb-6">Create your first wedding invitation to get started</p>
              <Link href="/create">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Invitation
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {invitations.map((invitation) => (
              <Card key={invitation._id} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl font-serif text-amber-900">
                        {invitation.groom_name} & {invitation.bride_name}
                      </CardTitle>
                      <CardDescription className="text-amber-700">
                        {new Date(invitation.event1_date!).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm capitalize">
                        {invitation.theme}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopyLink(invitation.slug)}
                      className="border-amber-600 text-amber-600 hover:bg-amber-50"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Link
                    </Button>
                    <Link href={`/invite/${invitation.slug}`}>
                      <Button variant="outline" size="sm" className="border-amber-600 text-amber-600 hover:bg-amber-50">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="border-amber-600 text-amber-600 hover:bg-amber-50">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(invitation._id!)}
                      className="border-red-600 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                  <div className="mt-4 text-sm text-amber-600">
                    Created on {new Date(invitation.created_at!).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
