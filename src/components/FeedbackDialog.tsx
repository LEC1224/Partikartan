import { Send, X } from 'lucide-react'
import { useState } from 'react'
import feedbackConfigData from '../data/feedbackConfig.json'
import { parties } from '../data/parties'
import { questions } from '../data/questions'
import { topics } from '../data/topics'

type FeedbackFieldKind = 'party' | 'question' | 'select' | 'text' | 'textarea' | 'topic'

interface FeedbackOption {
  value: string
  label: string
}

interface FeedbackFieldDefinition {
  id: string
  label: string
  kind: FeedbackFieldKind
  required: boolean
  minLength?: number
  maxLength?: number
  placeholder?: string
  options?: FeedbackOption[]
}

interface FeedbackReasonDefinition {
  id: string
  label: string
  fields: FeedbackFieldDefinition[]
}

const feedbackReasons = feedbackConfigData.reasons as FeedbackReasonDefinition[]

function fieldOptions(field: FeedbackFieldDefinition): FeedbackOption[] {
  if (field.kind === 'question') {
    return questions.map((question, index) => ({
      value: question.id,
      label: `${index + 1}. ${question.statement}`,
    }))
  }

  if (field.kind === 'party') {
    return parties.map((party) => ({ value: party.id, label: party.name }))
  }

  if (field.kind === 'topic') {
    return topics.map((topic) => ({ value: topic.id, label: topic.label }))
  }

  return field.options ?? []
}

function FeedbackField({
  field,
  value,
  onChange,
}: {
  field: FeedbackFieldDefinition
  value: string
  onChange: (value: string) => void
}) {
  const label = (
    <span>
      {field.label}
      {field.required && <span className="feedback-required" aria-hidden="true"> *</span>}
    </span>
  )

  if (field.kind === 'textarea') {
    return (
      <label className="feedback-field wide" htmlFor={`feedback-${field.id}`}>
        {label}
        <textarea
          id={`feedback-${field.id}`}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          minLength={field.minLength}
          maxLength={field.maxLength}
          rows={field.id === 'notes' ? 4 : 5}
          required={field.required}
          placeholder={field.placeholder}
        />
      </label>
    )
  }

  if (field.kind === 'text') {
    return (
      <label className="feedback-field" htmlFor={`feedback-${field.id}`}>
        {label}
        <input
          id={`feedback-${field.id}`}
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          minLength={field.minLength}
          maxLength={field.maxLength}
          required={field.required}
          placeholder={field.placeholder}
        />
      </label>
    )
  }

  const options = fieldOptions(field)

  return (
    <label className="feedback-field" htmlFor={`feedback-${field.id}`}>
      {label}
      <select
        id={`feedback-${field.id}`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={field.required}
      >
        <option value="">Välj</option>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  )
}

export function FeedbackDialog({ onClose }: { onClose: () => void }) {
  const [reasonId, setReasonId] = useState(feedbackReasons[0].id)
  const [details, setDetails] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<{ kind: 'idle' | 'success' | 'error' | 'submitting'; text: string }>({
    kind: 'idle',
    text: '',
  })
  const reason = feedbackReasons.find((item) => item.id === reasonId) ?? feedbackReasons[0]

  function changeReason(nextReasonId: string) {
    setReasonId(nextReasonId)
    setDetails({})
    setStatus({ kind: 'idle', text: '' })
  }

  function changeDetail(fieldId: string, value: string) {
    setDetails((current) => ({ ...current, [fieldId]: value }))
    if (status.kind !== 'idle') setStatus({ kind: 'idle', text: '' })
  }

  async function submitFeedback(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus({ kind: 'submitting', text: 'Skickar feedback...' })

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          reason: reasonId,
          details,
          page: window.location.href,
        }),
      })
      const data = (await response.json()) as { ok?: boolean; error?: string }
      if (!response.ok || !data.ok) throw new Error(data.error ?? 'Feedbacken kunde inte sparas.')

      setDetails({})
      setStatus({ kind: 'success', text: 'Tack. Feedbacken sparades som textfil.' })
    } catch (error) {
      setStatus({
        kind: 'error',
        text: error instanceof Error ? error.message : 'Feedbacken kunde inte skickas.',
      })
    }
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="modal feedback-modal" role="dialog" aria-modal="true" aria-labelledby="feedback-title">
        <button className="modal-close" onClick={onClose} aria-label="Stäng"><X size={20} /></button>
        <p className="eyebrow"><span /> Hjälp mig utforma tjänsten</p>
        <h2 id="feedback-title">Skicka feedback</h2>
        <form className="feedback-form" onSubmit={submitFeedback}>
          <label htmlFor="feedback-reason">
            <span>Anledning</span>
            <select id="feedback-reason" value={reasonId} onChange={(event) => changeReason(event.target.value)}>
              {feedbackReasons.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>
          </label>
          <div className="feedback-fields">
            {reason.fields.map((field) => (
              <FeedbackField
                key={field.id}
                field={field}
                value={details[field.id] ?? ''}
                onChange={(value) => changeDetail(field.id, value)}
              />
            ))}
          </div>
          <p className="feedback-privacy">Fält markerade med * är obligatoriska. Skicka inte känsliga personuppgifter.</p>
          {status.kind !== 'idle' && (
            <p className={`feedback-status ${status.kind}`} aria-live="polite">{status.text}</p>
          )}
          <div className="modal-actions">
            <button className="secondary-button" type="button" onClick={onClose}>Stäng</button>
            <button className="primary-button" type="submit" disabled={status.kind === 'submitting'}>
              Skicka <Send size={16} />
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
