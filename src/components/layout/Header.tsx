'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail } from 'lucide-react'
import styles from './header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href="/" className="flex items-center">
          <Image
            src="/Cleaning_Professionals.webp"
            alt="Cleaning Professionals"
            width={200}
            height={100}
            className="object-contain w-auto h-[60px]"
            priority
          />
        </Link>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-sm text-gray-500">Need Help?</p>
            <div className="flex items-center gap-4">
              <a 
                href="tel:0450124086" 
                className="flex items-center gap-2 text-[#0A61c9] hover:text-[#0854ac] font-medium"
              >
                <Phone className="w-4 h-4" />
                0450 124 086
              </a>
              <a 
                href="mailto:account@cleaningprofessionals.com.au"
                className="flex items-center gap-2 text-[#0A61c9] hover:text-[#0854ac] font-medium"
              >
                <Mail className="w-4 h-4" />
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
} 