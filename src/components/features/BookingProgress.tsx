'use client'

import { Check } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface Step {
  id: string
  label: string
  path: string
}

// Use the same steps as the sidebar
const steps: Step[] = [
  { id: 'location', label: 'Location', path: '/booking/location' },
  { id: 'service', label: 'Service', path: '/booking/service' },
  { id: 'details', label: 'Details', path: '/booking/details' },
  { id: 'confirmation', label: 'Confirmation', path: '/booking/confirmation' }
]

// Change these color classes
const colorClasses = {
  completed: {
    bg: 'bg-[#0A61c9]',
    text: 'text-[#0A61c9]'
  },
  current: {
    bg: 'bg-[#0A61c9]',
    text: 'text-[#0A61c9]'
  },
  hover: 'hover:bg-[#e6f0fa]'
}

export default function BookingProgress() {
  const pathname = usePathname()
  
  const getCurrentStepIndex = () => {
    return steps.findIndex(step => pathname.includes(step.id))
  }

  const currentStep = getCurrentStepIndex()

  // Add validation for step access
  const canAccessStep = (index: number) => {
    // Check if we have the required data for each step
    const hasSuburb = localStorage.getItem('selectedSuburb')
    const hasService = localStorage.getItem('selectedService')
    const hasDetails = localStorage.getItem('bookingDetails')

    switch (index) {
      case 0: // Location
        return true
      case 1: // Service
        return !!hasSuburb
      case 2: // Details
        return !!hasSuburb && !!hasService
      case 3: // Confirmation
        return !!hasSuburb && !!hasService && !!hasDetails
      default:
        return false
    }
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isCurrent = index === currentStep
          const isClickable = index <= currentStep && canAccessStep(index)

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex items-center relative">
                <Link
                  href={isClickable ? step.path : '#'}
                  onClick={(e) => {
                    if (!isClickable) {
                      e.preventDefault()
                    }
                  }}
                  className={`flex items-center justify-center w-8 h-8 rounded-full 
                    ${isCompleted 
                      ? 'bg-[#0A61c9] text-white cursor-pointer' 
                      : isCurrent
                        ? 'bg-[#0A61c9] text-white'
                        : 'bg-gray-200 text-gray-600 cursor-not-allowed'
                    } transition-colors`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </Link>
                <span
                  className={`ml-3 text-sm font-medium whitespace-nowrap
                    ${isCurrent ? 'text-[#0A61c9]' : 'text-gray-500'}`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 flex-1 mx-4
                    ${index < currentStep ? 'bg-[#0A61c9]' : 'bg-gray-200'}`}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
} 