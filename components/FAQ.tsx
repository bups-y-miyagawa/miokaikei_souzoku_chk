import faqData from '@/data/faq.json'

export default function FAQ() {
  return (
    <section className="card mb-8">
      <h2 className="text-2xl font-bold text-text mb-6">よくある質問</h2>
      <div className="space-y-6">
        {faqData.map((item, index) => (
          <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
            <h3 className="text-lg font-semibold text-text mb-2">
              {item.question}
            </h3>
            <p className="text-gray-700 leading-relaxed">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
