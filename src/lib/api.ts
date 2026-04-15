// API client for Next.js API routes

export interface Invitation {
  _id?: string
  slug: string
  groom_name: string
  groom_father: string
  groom_mother: string
  groom_address: string
  bride_name: string
  bride_father: string
  bride_mother: string
  bride_address: string
  theme: string
  side:string
  event1_name: string
  event1_date: string
  event1_time: string
  event1_location: string
  event1_maps_url: string
  event2_name?: string
  event2_date?: string
  event2_time?: string
  event2_location?: string
  event2_maps_url?: string
  photo_url?: string
  created_at?: string
}

class ApiClient {
  private baseUrl: string

  constructor() {
    this.baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_API_URL || ''
      : ''
  }

  async getInvitations(): Promise<Invitation[]> {
    const response = await fetch(`${this.baseUrl}/api/invitations`)
    if (!response.ok) {
      throw new Error('Failed to fetch invitations')
    }
    return response.json()
  }

  async getInvitation(slug: string): Promise<Invitation | null> {
    const response = await fetch(`${this.baseUrl}/api/invitations?slug=${slug}`)
    if (!response.ok) {
      if (response.status === 404) return null
      throw new Error('Failed to fetch invitation')
    }
    return response.json()
  }

  async createInvitation(invitation: Omit<Invitation, '_id' | 'created_at'>): Promise<Invitation> {
    const response = await fetch(`${this.baseUrl}/api/invitations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invitation),
    })

    if (!response.ok) {
      throw new Error('Failed to create invitation')
    }

    return response.json()
  }

  async deleteInvitation(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/invitations/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Failed to delete invitation')
    }
  }
}

export const api = new ApiClient()
