import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import BookingSummary from '@/components/layout/BookingSummary'
import CleaningService from '@/components/features/CleaningService'
import BookingProgress from '@/components/features/BookingProgress'

export default function ServicePage() {
  return (
    <>
      <Header />
      <Sidebar />
      
      <main className="flex-1 min-h-screen pt-24 pl-64 pr-80">
        <div className="p-6">
          <BookingProgress />
          <h1 className="text-3xl font-bold mb-6">Select Your Service</h1>
          <CleaningService />
        </div>
      </main>
      
      <BookingSummary />
    </>
  )
} 