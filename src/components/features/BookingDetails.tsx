'use client'

import { Calendar, Clock } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface TimeSlot {
  id: string
  time: string
  available: boolean
}

const timeSlots: TimeSlot[] = [
  { id: '1', time: '09:00 AM', available: true },
  { id: '2', time: '10:00 AM', available: true },
  { id: '3', time: '11:00 AM', available: false },
  { id: '4', time: '12:00 PM', available: true },
  { id: '5', time: '01:00 PM', available: true },
  { id: '6', time: '02:00 PM', available: true },
  { id: '7', time: '03:00 PM', available: false },
  { id: '8', time: '04:00 PM', available: true }
]

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
}

export default function BookingDetails() {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })

  const handleTimeSelect = (slot: TimeSlot) => {
    if (slot.available) {
      setSelectedTime(slot.id)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const isFormValid = () => {
    return (
      selectedDate &&
      selectedTime &&
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phone
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isFormValid()) {
      try {
        const selectedTimeSlot = timeSlots.find(slot => slot.id === selectedTime)
        const bookingDetails = {
          date: selectedDate,
          time: selectedTimeSlot?.time || '',
          ...formData
        }
        localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails))
        router.push('/booking/confirmation')
      } catch (error) {
        console.error('Error saving booking details:', error)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {/* Form content */}
    </form>
  )
} 