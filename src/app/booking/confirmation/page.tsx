import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import BookingConfirmation from '@/components/features/BookingConfirmation'
import BookingSummary from '@/components/layout/BookingSummary'

export default function ConfirmationPage() {
  return (
    <>
      <Header />
      <Sidebar />
      
      <main className="flex-1 min-h-screen pt-24 pl-64 pr-80">
        <div className="p-6 max-w-4xl mx-auto">
          <BookingConfirmation />
        </div>
      </main>
      
      <BookingSummary />
    </>
  )
} 