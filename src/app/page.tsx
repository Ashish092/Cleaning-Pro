import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import BookingSummary from '@/components/layout/BookingSummary'
import LocationSearch from '@/components/features/LocationSearch'

export default function Home() {
  return (
    <>
      <Header />
      <Sidebar />
      
      <main className="flex-1 min-h-screen pt-24 
        px-4 md:pl-64 md:pr-80">
        <div className="p-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Book Your Clean</h1>
          <LocationSearch />
        </div>
      </main>
      
      <BookingSummary />
    </>
  )
}
