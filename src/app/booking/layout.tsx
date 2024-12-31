import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import BookingSummary from '@/components/layout/BookingSummary'
import MobileNav from '@/components/layout/MobileNav'
import styles from './booking-layout.module.css'

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <Sidebar />
      <MobileNav />
      
      <main className={styles.mainContent}>
        {children}
      </main>
      
      <BookingSummary />
    </>
  )
} 