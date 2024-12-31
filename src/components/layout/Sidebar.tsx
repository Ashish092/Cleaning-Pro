'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Calendar, MapPin, Settings, CheckCircle } from 'lucide-react'

interface NavItem {
  id: string
  label: string
  path: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  {
    id: 'location',
    label: 'Location',
    path: '/booking/location',
    icon: <MapPin className="w-5 h-5" />
  },
  {
    id: 'service',
    label: 'Service',
    path: '/booking/service',
    icon: <Settings className="w-5 h-5" />
  },
  {
    id: 'details',
    label: 'Details',
    path: '/booking/details',
    icon: <Calendar className="w-5 h-5" />
  },
  {
    id: 'confirmation',
    label: 'Confirmation',
    path: '/booking/confirmation',
    icon: <CheckCircle className="w-5 h-5" />
  }
]

export default function Sidebar() {
  const pathname = usePathname()
  
  const getCurrentStepIndex = () => {
    return navItems.findIndex(item => pathname.includes(item.id))
  }

  const currentStep = getCurrentStepIndex()

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 pt-24
      hidden md:block">
      <nav className="px-4">
        <ul className="space-y-1">
          {navItems.map((item, index) => {
            const isCompleted = index < currentStep
            const isCurrent = index === currentStep
            const isClickable = index <= currentStep

            return (
              <li key={item.id}>
                <Link
                  href={isClickable ? item.path : '#'}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${isCompleted 
                      ? 'text-[#0A61c9] hover:bg-[#e6f0fa]' 
                      : isCurrent
                        ? 'text-[#0A61c9] bg-[#e6f0fa]'
                        : 'text-gray-400 cursor-not-allowed'
                    }`}
                  onClick={(e) => {
                    if (!isClickable) {
                      e.preventDefault()
                    }
                  }}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                  {isCompleted && (
                    <CheckCircle className="w-5 h-5 ml-auto text-[#0A61c9]" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
} 