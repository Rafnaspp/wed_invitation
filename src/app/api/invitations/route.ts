import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db('wedding_invitations')
    
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    
    if (slug) {
      // Get single invitation by slug
      const invitation = await db.collection('invitations').findOne({ slug })
      
      if (!invitation) {
        return NextResponse.json({ error: 'Invitation not found' }, { status: 404 })
      }
      
      return NextResponse.json(invitation)
    } else {
      // Get all invitations
      const invitations = await db.collection('invitations').find({}).sort({ created_at: -1 }).toArray()
      return NextResponse.json(invitations)
    }
  } catch (error) {
    console.error('Error fetching invitations:', error)
    return NextResponse.json({ error: 'Failed to fetch invitations' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db('wedding_invitations')
    
    const invitationData = await request.json()
    
    // Generate unique slug if not provided
    if (!invitationData.slug) {
      const baseSlug = `${invitationData.groom_name.toLowerCase().replace(/\s+/g, '-')}-${invitationData.bride_name.toLowerCase().replace(/\s+/g, '-')}`
      const timestamp = Date.now()
      invitationData.slug = `${baseSlug}-${timestamp}`
    }
    
    // Add created_at timestamp
    invitationData.created_at = new Date().toISOString()
    
    const result = await db.collection('invitations').insertOne(invitationData)
    
    return NextResponse.json({
      ...invitationData,
      _id: result.insertedId
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating invitation:', error)
    const message = error instanceof Error ? error.message : 'Failed to create invitation'
    if (message.toLowerCase().includes('mongodb_uri')) {
      return NextResponse.json(
        { error: message },
        { status: 500 },
      )
    }
    return NextResponse.json({ error: 'Failed to create invitation' }, { status: 500 })
  }
}
