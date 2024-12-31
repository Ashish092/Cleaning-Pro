import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import BookingSummary from '@/components/layout/BookingSummary'
import LocationSearch from '@/components/features/LocationSearch'
import BookingProgress from '@/components/features/BookingProgress'

export default function LocationPage() {
  return (
    <>
      <Header />
      <Sidebar />
      
      <main className="flex-1 min-h-screen pt-24 pl-64 pr-80">
        <div className="p-6">
          <BookingProgress />
          <h1 className="text-3xl font-bold mb-6">Enter Your Location</h1>
          <LocationSearch />
        </div>
      </main>
      
      <BookingSummary />
    </>
  )
} 