'use client'

interface Question {
  id: number
  text: string
}

interface CheckFormProps {
  questions: Question[]
  answers: Map<number, 'yes' | 'no'>
  onAnswer: (id: number, answer: 'yes' | 'no') => void
  onSubmit: () => void
  onReset: () => void
}

export default function CheckForm({
  questions,
  answers,
  onAnswer,
  onSubmit,
  onReset,
}: CheckFormProps) {
  const answeredCount = answers.size
  const progress = (answeredCount / questions.length) * 100

  return (
    <section className="card">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-text">診断フォーム</h2>
          <span className="text-sm text-gray-600">
            {answeredCount} / {questions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-accent h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={answeredCount}
            aria-valuemin={0}
            aria-valuemax={questions.length}
          />
        </div>
      </div>

      <div className="space-y-4 mb-8">
        {questions.map((question) => {
          const currentAnswer = answers.get(question.id)
          return (
            <div
              key={question.id}
              className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <p className="text-text mb-3 font-medium">{question.text}</p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => onAnswer(question.id, 'yes')}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                    currentAnswer === 'yes'
                      ? 'bg-accent text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  aria-label={`質問${question.id}に「はい」と回答`}
                >
                  はい
                </button>
                <button
                  type="button"
                  onClick={() => onAnswer(question.id, 'no')}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                    currentAnswer === 'no'
                      ? 'bg-gray-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  aria-label={`質問${question.id}に「いいえ」と回答`}
                >
                  いいえ
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex gap-4 justify-center">
        <button
          onClick={onSubmit}
          className="btn-primary"
          aria-label="診断を実行する"
        >
          診断する
        </button>
        <button
          onClick={onReset}
          className="btn-secondary"
          aria-label="回答をリセットする"
        >
          リセット
        </button>
      </div>
    </section>
  )
}
