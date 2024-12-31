'use client'

import { Calendar, Clock, MapPin, Check, Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface BookingData {
  date: string
  time: string
  firstName: string
  lastName: string
  email: string
  phone: string
  service?: {
    id: string
    title: string
    price: number
    duration: number
  }
  suburb?: {
    name: string
    postcode: string
  }
}

export default function BookingConfirmation() {
  const router = useRouter()
  const [booking, setBooking] = useState<BookingData | null>(null)
  const [reference] = useState(`BOOK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`)

  useEffect(() => {
    try {
      // Safely parse localStorage data with error handling
      const getLocalStorageItem = (key: string) => {
        try {
          const item = localStorage.getItem(key)
          return item ? JSON.parse(item) : null
        } catch (error) {
          console.error(`Error parsing ${key}:`, error)
          return null
        }
      }

      const bookingDetails = getLocalStorageItem('bookingDetails')
      const selectedService = getLocalStorageItem('selectedService')
      const selectedSuburb = getLocalStorageItem('selectedSuburb')

      // Verify we have the minimum required data
      if (!bookingDetails?.date || !bookingDetails?.time || !selectedService || !selectedSuburb) {
        console.error('Missing required booking data')
        router.push('/booking/location')
        return
      }

      setBooking({
        ...bookingDetails,
        service: selectedService,
        suburb: selectedSuburb
      })
    } catch (error) {
      console.error('Error setting up booking:', error)
      router.push('/booking/location')
    }
  }, [router])

  if (!booking) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    )
  }

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-AU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch (error) {
      return dateStr
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Booking Confirmed!</h2>
        <p className="text-gray-600">
          Your booking reference is: <span className="font-medium">{reference}</span>
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="font-semibold mb-4">Booking Details</h3>
        <div className="space-y-4">
          {booking.suburb && (
            <DetailItem
              icon={<MapPin className="w-5 h-5" />}
              label="Location"
              value={`${booking.suburb.name} ${booking.suburb.postcode}`}
            />
          )}
          <DetailItem
            icon={<Calendar className="w-5 h-5" />}
            label="Date"
            value={formatDate(booking.date)}
          />
          <DetailItem
            icon={<Clock className="w-5 h-5" />}
            label="Time"
            value={booking.time}
          />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="font-semibold mb-4">Service Details</h3>
        <div className="space-y-4">
          {booking.service && (
            <>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Service Type</span>
                <span className="font-medium">{booking.service.title}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium">{booking.service.duration} hours</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Total Price</span>
                <span className="text-xl font-semibold">${booking.service.price}</span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h3 className="font-semibold mb-4">Contact Information</h3>
        <div className="space-y-4">
          <DetailItem
            icon={<Mail className="w-5 h-5" />}
            label="Email"
            value={booking.email}
          />
          <DetailItem
            icon={<Phone className="w-5 h-5" />}
            label="Phone"
            value={booking.phone}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <Link
          href="/booking/location"
          className="flex-1 text-center py-3 border border-[#0A61c9] text-[#0A61c9] 
            rounded-lg font-medium hover:bg-[#e6f0fa] transition-colors"
        >
          Book Another Clean
        </Link>
        <button
          onClick={() => window.print()}
          className="flex-1 bg-[#0A61c9] text-white py-3 rounded-lg font-medium
            hover:bg-[#0854ac] transition-colors"
        >
          Print Confirmation
        </button>
      </div>
    </div>
  )
}

interface DetailItemProps {
  icon: React.ReactNode
  label: string
  value: string
}

function DetailItem({ icon, label, value }: DetailItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-gray-400">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  )
} 