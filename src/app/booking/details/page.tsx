import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import BookingSummary from '@/components/layout/BookingSummary'
import BookingDetails from '@/components/features/BookingDetails'
import BookingProgress from '@/components/features/BookingProgress'

export default function DetailsPage() {
  return (
    <>
      <Header />
      <Sidebar />
      
      <main className="flex-1 min-h-screen pt-24 pl-64 pr-80">
        <div className="p-6">
          <BookingProgress />
          <h1 className="text-3xl font-bold mb-6">Booking Details</h1>
          <BookingDetails />
        </div>
      </main>
      
      <BookingSummary />
    </>
  )
} 