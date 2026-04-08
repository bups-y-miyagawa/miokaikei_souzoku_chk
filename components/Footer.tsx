import officeData from '@/data/office.json'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4 mt-12">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-xl font-bold mb-4">{officeData.name}</h3>
        <div className="space-y-2 text-gray-300">
          <p>{officeData.address}</p>
          <p>電話: {officeData.phone}</p>
          <p>メール: {officeData.email}</p>
          <p>営業時間: {officeData.businessHours}</p>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>© 2026 {officeData.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
