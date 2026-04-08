'use client'

import { useState } from 'react'

interface ConsultationModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
}

export default function ConsultationModal({
  isOpen,
  onClose,
  onSubmit,
}: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    content: '',
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
    setFormData({ name: '', email: '', phone: '', content: '' })
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 id="modal-title" className="text-2xl font-bold text-text">
            無料相談のお申し込み
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-text text-2xl font-bold"
            aria-label="モーダルを閉じる"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text mb-1">
              氏名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text mb-1">
              メールアドレス <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-text mb-1">
              電話番号 <span className="text-gray-500 text-xs">（任意）</span>
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-text mb-1">
              相談内容 <span className="text-gray-500 text-xs">（任意）</span>
            </label>
            <textarea
              id="content"
              rows={4}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none resize-none"
            />
          </div>

          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="btn-primary flex-1"
            >
              送信する
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
