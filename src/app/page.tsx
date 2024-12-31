import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import BookingSummary from '@/components/layout/BookingSummary'
import LocationSearch from '@/components/features/LocationSearch'
import styles from './page.module.css'

export default function Home() {
  return (
    <>
      <Header />
      <Sidebar />
      
      <main className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Book Your Clean</h1>
          <LocationSearch />
        </div>
      </main>
      
      <BookingSummary />
    </>
  )
}
