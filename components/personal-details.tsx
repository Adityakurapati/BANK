"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface PersonalDetailsProps {
  formData: {
    name: string
    email: string
    phone: string
    address: string
  }
  onUpdate: (
    data: Partial<{
      name: string
      email: string
      phone: string
      address: string
    }>,
  ) => void
}

export function PersonalDetails({ formData, onUpdate }: PersonalDetailsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={(e) => onUpdate({ email: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={(e) => onUpdate({ phone: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Textarea
          id="address"
          placeholder="Enter your address"
          rows={3}
          value={formData.address}
          onChange={(e) => onUpdate({ address: e.target.value })}
        />
      </div>
    </div>
  )
}

