'use client'

import { useState } from 'react'
import Hero from '@/components/Hero'
import CheckForm from '@/components/CheckForm'
import Result from '@/components/Result'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'
import ConsultationModal from '@/components/ConsultationModal'
import questionsData from '@/data/questions.json'
import resultsData from '@/data/results.json'

export default function Home() {
  const [answers, setAnswers] = useState<Map<number, 'yes' | 'no'>>(new Map())
  const [showResult, setShowResult] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const handleAnswer = (id: number, answer: 'yes' | 'no') => {
    const newAnswers = new Map(answers)
    if (newAnswers.get(id) === answer) {
      // 同じボタンをクリックした場合は選択を解除
      newAnswers.delete(id)
    } else {
      newAnswers.set(id, answer)
    }
    setAnswers(newAnswers)
  }

  const handleSubmit = () => {
    const answeredCount = answers.size
    if (answeredCount === 0) {
      if (window.confirm('まだ回答がありません。このまま診断を実行しますか？')) {
        setShowResult(true)
      }
    } else {
      setShowResult(true)
    }
  }

  const handleReset = () => {
    setAnswers(new Map())
    setShowResult(false)
  }

  const calculateScore = () => {
    // 「はい」の数をカウント
    let yesCount = 0
    answers.forEach((answer) => {
      if (answer === 'yes') {
        yesCount++
      }
    })
    return yesCount
  }

  const getRiskLevel = (score: number) => {
    if (score >= resultsData.high.min) return 'high'
    if (score >= resultsData.medium.min) return 'medium'
    return 'low'
  }

  const score = calculateScore()
  const riskLevel = showResult ? getRiskLevel(score) : null

  return (
    <main className="min-h-screen">
      <Hero />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {!showResult ? (
          <CheckForm
            questions={questionsData}
            answers={answers}
            onAnswer={handleAnswer}
            onSubmit={handleSubmit}
            onReset={handleReset}
          />
        ) : (
          <>
            <Result
              score={score}
              riskLevel={riskLevel!}
              onReset={handleReset}
              onConsultation={() => setShowModal(true)}
            />
            <FAQ />
          </>
        )}
      </div>
      <Footer />
      <ConsultationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={() => {
          setShowModal(false)
          setShowToast(true)
          setTimeout(() => setShowToast(false), 3000)
        }}
      />
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          送信しました（ダミー）
        </div>
      )}
    </main>
  )
}
