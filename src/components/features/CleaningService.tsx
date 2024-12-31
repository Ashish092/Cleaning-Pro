'use client'

import { Check } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ServiceOption {
  id: string
  title: string
  description: string
  price: number
  duration: number
}

const serviceOptions: ServiceOption[] = [
  {
    id: 'regular',
    title: 'Regular Clean',
    description: 'Perfect for maintaining a clean and tidy home on a regular basis',
    price: 120,
    duration: 3
  },
  {
    id: 'deep',
    title: 'Deep Clean',
    description: 'Thorough cleaning of all areas including inside cabinets and appliances',
    price: 180,
    duration: 4
  },
  {
    id: 'move',
    title: 'Move In/Out Clean',
    description: 'Detailed cleaning to prepare your property for moving in or out',
    price: 250,
    duration: 5
  }
]

export default function CleaningService() {
  const router = useRouter()
  const [selectedService, setSelectedService] = useState<string>('')

  const handleContinue = () => {
    if (selectedService) {
      try {
        const service = serviceOptions.find(s => s.id === selectedService)
        if (service) {
          localStorage.setItem('selectedService', JSON.stringify(service))
          router.push('/booking/details')
        }
      } catch (error) {
        console.error('Error saving service:', error)
      }
    }
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-4">Select Your Service</h2>
      <div className="grid gap-4 grid-cols-1">
        {serviceOptions.map((service) => (
          <div
            key={service.id}
            onClick={() => setSelectedService(service.id)}
            className={`p-4 border rounded-lg cursor-pointer transition-all
              ${selectedService === service.id 
                ? 'border-[#0A61c9] bg-[#e6f0fa]' 
                : 'border-gray-200 hover:border-[#90c2f7]'}`}
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold">{service.title}</h3>
              {selectedService === service.id && (
                <Check className="w-5 h-5 text-[#0A61c9]" />
              )}
            </div>
            <p className="text-sm text-gray-600 mb-4">{service.description}</p>
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium">${service.price}</span>
              <span className="text-gray-500">{service.duration} hours</span>
            </div>
          </div>
        ))}
      </div>

      <button
        className="mt-8 w-full bg-[#0A61c9] text-white py-3 rounded-lg font-medium
          hover:bg-[#0854ac] transition-colors disabled:opacity-50"
        disabled={!selectedService}
        onClick={handleContinue}
      >
        Continue to Booking Details
      </button>
    </div>
  )
} 