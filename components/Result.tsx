'use client'

import resultsData from '@/data/results.json'

interface ResultProps {
  score: number
  riskLevel: 'low' | 'medium' | 'high'
  onReset: () => void
  onConsultation: () => void
}

export default function Result({
  score,
  riskLevel,
  onReset,
  onConsultation,
}: ResultProps) {
  const result = resultsData[riskLevel]
  const isHighRisk = riskLevel === 'high'
  const ctaText = isHighRisk ? '今すぐ無料で相談する' : '無料で相談する'

  const getColorClasses = () => {
    switch (riskLevel) {
      case 'low':
        return 'border-gray-300 bg-gray-50'
      case 'medium':
        return 'border-accent bg-accent/5'
      case 'high':
        return 'border-red-500 bg-red-50'
      default:
        return 'border-gray-300'
    }
  }

  const getScoreColor = () => {
    switch (riskLevel) {
      case 'low':
        return 'text-gray-600'
      case 'medium':
        return 'text-accent'
      case 'high':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <>
      <section className={`card border-2 ${getColorClasses()} mb-8`}>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-text mb-4">診断結果</h2>
          <div className={`text-5xl font-bold mb-2 ${getScoreColor()}`}>
            {score}点
          </div>
          <div className={`text-xl font-semibold mb-4 ${getScoreColor()}`}>
            {riskLevel === 'low' && '低リスク'}
            {riskLevel === 'medium' && '中リスク'}
            {riskLevel === 'high' && '高リスク'}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-6">
          <p className="text-text leading-relaxed">{result.message}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-text mb-4">
            あなたにおすすめの次の一手
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {result.recommendations.map((rec, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 border border-gray-200"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-accent font-bold">{index + 1}.</span>
                  <span className="text-text font-medium">{rec}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center space-y-4">
          <button
            onClick={onConsultation}
            className="btn-primary text-lg px-8 py-4 w-full md:w-auto"
            aria-label={ctaText}
          >
            {ctaText}
          </button>
          <p className="text-sm text-gray-600">
            60分無料｜相続リスク個別診断
          </p>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onReset}
            className="text-sm text-gray-600 hover:text-text underline"
            aria-label="診断をやり直す"
          >
            診断をやり直す
          </button>
        </div>
      </section>
    </>
  )
}
