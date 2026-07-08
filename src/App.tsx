import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  CircleHelp,
  Compass,
  ExternalLink,
  FileText,
  GitBranch,
  Info,
  MessageSquare,
  RefreshCw,
  Scale,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import { parties } from './data/parties'
import { partyCodingRules } from './data/partyCoding'
import { issueQuestions, questions, valueQuestions } from './data/questions'
import { topics } from './data/topics'
import { calculateCoordinate, calculatePartyCoordinate, matchPercentage } from './lib/scoring'
import type { Answers, AnswerValue, Coordinate, Party, TopicId } from './types'

type View = 'start' | 'priorities' | 'quiz' | 'result'
type SavedProgress = { answers: Answers; priorities: TopicId[] }
type FeedbackReason =
  | 'Jag hittade bias i koden'
  | 'Jag tror att mitt resultat är fel'
  | 'Jag tycker att en fråga är vinklat formulerad'
  | 'Annat'
const STORAGE_KEY = 'partikartan-progress'
const GITHUB_URL = 'https://github.com/LEC1224/Partikartan'
const OPEN_PROMPTS_URL = `${GITHUB_URL}/blob/main/OPEN_PROMPTS.md`

const answerOptions: { value: AnswerValue; short: string; label: string }[] = [
  { value: 1, short: '1', label: 'Håller inte alls med' },
  { value: 2, short: '2', label: 'Håller mestadels inte med' },
  { value: 3, short: '3', label: 'Varken eller' },
  { value: 4, short: '4', label: 'Håller mestadels med' },
  { value: 5, short: '5', label: 'Håller helt med' },
  { value: null, short: '?', label: 'Vet ej' },
]

const feedbackReasons: FeedbackReason[] = [
  'Jag hittade bias i koden',
  'Jag tror att mitt resultat är fel',
  'Jag tycker att en fråga är vinklat formulerad',
  'Annat',
]

function readSavedProgress(): SavedProgress {
  if (typeof window === 'undefined') return { answers: {}, priorities: [] }

  const saved = localStorage.getItem(STORAGE_KEY)
  if (!saved) return { answers: {}, priorities: [] }

  try {
    const parsed = JSON.parse(saved) as Partial<SavedProgress>
    return {
      answers: parsed.answers ?? {},
      priorities: parsed.priorities ?? [],
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return { answers: {}, priorities: [] }
  }
}

function App() {
  const [initialProgress] = useState(readSavedProgress)
  const [view, setView] = useState<View>('start')
  const [priorities, setPriorities] = useState<TopicId[]>(initialProgress.priorities)
  const [answers, setAnswers] = useState<Answers>(initialProgress.answers)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [methodOpen, setMethodOpen] = useState(false)
  const [feedbackOpen, setFeedbackOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, priorities }))
  }, [answers, priorities])

  const answeredCount = Object.keys(answers).length
  const coordinate = useMemo(
    () => calculateCoordinate(answers, questions, priorities),
    [answers, priorities],
  )

  function beginQuiz() {
    const firstUnanswered = questions.findIndex((question) => !(question.id in answers))
    setQuestionIndex(firstUnanswered < 0 ? 0 : firstUnanswered)
    setView('quiz')
  }

  function answerQuestion(value: AnswerValue) {
    const question = questions[questionIndex]
    setAnswers((current) => ({ ...current, [question.id]: value }))
    if (questionIndex < questions.length - 1) {
      window.setTimeout(() => setQuestionIndex((index) => index + 1), 140)
    }
  }

  function reset() {
    setAnswers({})
    setPriorities([])
    setQuestionIndex(0)
    setView('start')
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <div className="app-shell">
      <Header
        onLogo={() => setView('start')}
        onMethod={() => setMethodOpen(true)}
        onFeedback={() => setFeedbackOpen(true)}
        answeredCount={answeredCount}
        onResume={beginQuiz}
      />
      <main>
        {view === 'start' && (
          <StartPage
            answeredCount={answeredCount}
            onStart={() => setView('priorities')}
            onResume={beginQuiz}
            onMethod={() => setMethodOpen(true)}
            onFeedback={() => setFeedbackOpen(true)}
          />
        )}
        {view === 'priorities' && (
          <PriorityPage
            priorities={priorities}
            onChange={setPriorities}
            onBack={() => setView('start')}
            onContinue={beginQuiz}
          />
        )}
        {view === 'quiz' && (
          <QuizPage
            index={questionIndex}
            answers={answers}
            onIndex={setQuestionIndex}
            onAnswer={answerQuestion}
            onBack={() => setView('priorities')}
            onResult={() => setView('result')}
          />
        )}
        {view === 'result' && (
          <ResultPage
            coordinate={coordinate}
            priorities={priorities}
            onEdit={beginQuiz}
            onMethod={() => setMethodOpen(true)}
            onFeedback={() => setFeedbackOpen(true)}
            onReset={reset}
          />
        )}
      </main>
      <Footer onFeedback={() => setFeedbackOpen(true)} />
      {methodOpen && <MethodDialog onClose={() => setMethodOpen(false)} />}
      {feedbackOpen && <FeedbackDialog onClose={() => setFeedbackOpen(false)} />}
    </div>
  )
}

function Header({
  onLogo,
  onMethod,
  onFeedback,
  answeredCount,
  onResume,
}: {
  onLogo: () => void
  onMethod: () => void
  onFeedback: () => void
  answeredCount: number
  onResume: () => void
}) {
  return (
    <header className="site-header">
      <button className="brand" onClick={onLogo} aria-label="Till startsidan">
        <span className="brand-mark"><Compass size={20} strokeWidth={2.2} /></span>
        <span>Partikartan</span>
      </button>
      <nav aria-label="Huvudmeny">
        <a className="nav-link" href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub</a>
        <button className="nav-link" onClick={onMethod}>Så fungerar det</button>
        <button className="nav-link" onClick={onFeedback}>Feedback</button>
        {answeredCount > 0 && answeredCount < questions.length && (
          <button className="resume-link" onClick={onResume}>
            Fortsätt <span>{answeredCount}/{questions.length}</span>
          </button>
        )}
      </nav>
    </header>
  )
}

function StartPage({
  answeredCount,
  onStart,
  onResume,
  onMethod,
  onFeedback,
}: {
  answeredCount: number
  onStart: () => void
  onResume: () => void
  onMethod: () => void
  onFeedback: () => void
}) {
  return (
    <>
      <section className="hero page-width">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Sverige · Politik · 2026</p>
          <h1>Var står du<br />politiskt?</h1>
          <p className="hero-intro">
            Utforska dina värderingar på en karta anpassad efter svensk politik. Partikartan är avsedd att vara objektiv, källkritisk och möjlig att granska öppet.
          </p>
          <div className="hero-actions">
            <button className="primary-button" onClick={answeredCount ? onResume : onStart}>
              {answeredCount ? 'Fortsätt där du slutade' : 'Starta kompassen'}
              <ArrowRight size={18} />
            </button>
            <button className="text-button" onClick={onMethod}>Se hur vi räknar <ChevronRight size={16} /></button>
          </div>
          <div className="hero-meta">
            <span><Check size={15} /> {questions.length} frågor</span>
            <span><Check size={15} /> öppen källkod</span>
            <span><Check size={15} /> open prompts</span>
          </div>
        </div>
        <div className="hero-visual" aria-label="Illustration av den politiska kompassen">
          <MiniCompass />
          <div className="visual-note note-one">Ekonomisk<br /><strong>vänster–höger</strong></div>
          <div className="visual-note note-two"><strong>GAL–TAN</strong><br />värderingar</div>
        </div>
      </section>
      <section className="principles">
        <div className="page-width principle-grid">
          <div className="section-heading">
            <p className="eyebrow"><span /> Vår utgångspunkt</p>
            <h2>En kompass som visar<br />hur den tänker.</h2>
          </div>
          <Feature icon={<Scale />} title="Svensk måttstock" text="Skalan beskriver skiljelinjer inom svensk politik — inte var Sverige råkar ligga jämfört med USA." />
          <Feature icon={<ShieldCheck />} title="Källor framför magkänsla" text="Partier placeras först när svar kan stödjas av program, beslut eller tydliga uttalanden." />
          <Feature icon={<Sparkles />} title="Dina prioriteringar" text="Välj tre ämnen som betyder extra mycket. Frågorna där får 1,75 gånger större vikt." />
        </div>
      </section>
      <TransparencySection onFeedback={onFeedback} />
    </>
  )
}

function TransparencySection({ onFeedback }: { onFeedback: () => void }) {
  return (
    <section className="transparency">
      <div className="page-width transparency-grid">
        <div className="section-heading">
          <p className="eyebrow"><span /> Öppen granskning</p>
          <h2>Objektiv ambition,<br />öppen process.</h2>
        </div>
        <article className="transparency-item">
          <div className="feature-icon"><GitBranch /></div>
          <h3>Koden finns på GitHub</h3>
          <p>Frågor, vikter, scoring och framtida partibelägg ska kunna granskas i repo:t.</p>
          <a className="inline-link" href={GITHUB_URL} target="_blank" rel="noreferrer">Öppna GitHub <ExternalLink size={15} /></a>
        </article>
        <article className="transparency-item">
          <div className="feature-icon"><FileText /></div>
          <h3>Open prompts</h3>
          <p>Prompterna som styr utvecklingen dokumenteras i en öppen markdown-fil.</p>
          <a className="inline-link" href={OPEN_PROMPTS_URL} target="_blank" rel="noreferrer">Läs prompts <ExternalLink size={15} /></a>
        </article>
        <article className="transparency-item">
          <div className="feature-icon"><MessageSquare /></div>
          <h3>Feedbackspår</h3>
          <p>Misstänkt bias, felaktiga resultat och vinklade formuleringar ska kunna rapporteras.</p>
          <button className="inline-link button-link" onClick={onFeedback}>Skicka feedback <ChevronRight size={15} /></button>
        </article>
      </div>
    </section>
  )
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <article className="feature">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  )
}

function MiniCompass() {
  return (
    <div className="mini-compass">
      <div className="mini-grid" />
      <span className="axis-label axis-top">GAL</span>
      <span className="axis-label axis-right">HÖGER</span>
      <span className="axis-label axis-bottom">TAN</span>
      <span className="axis-label axis-left">VÄNSTER</span>
      <span className="orbit orbit-a" />
      <span className="orbit orbit-b" />
      <span className="orbit orbit-c" />
      <span className="you-dot"><span>du</span></span>
    </div>
  )
}

function PriorityPage({
  priorities,
  onChange,
  onBack,
  onContinue,
}: {
  priorities: TopicId[]
  onChange: (topics: TopicId[]) => void
  onBack: () => void
  onContinue: () => void
}) {
  function toggle(topic: TopicId) {
    if (priorities.includes(topic)) onChange(priorities.filter((item) => item !== topic))
    else if (priorities.length < 3) onChange([...priorities, topic])
  }

  return (
    <section className="wizard-page page-width narrow-page">
      <button className="back-button" onClick={onBack}><ArrowLeft size={17} /> Tillbaka</button>
      <p className="eyebrow"><span /> Steg 1 av 2</p>
      <h1>Vad betyder lite extra för dig?</h1>
      <p className="page-lead">Välj upp till tre ämnen. Dina svar inom dem väger 1,75 gånger mer i resultatet. Du kan också fortsätta utan att välja.</p>
      <div className="selection-status" aria-live="polite">
        <strong>{priorities.length}</strong> av 3 valda
        <div className="selection-dots">
          {[0, 1, 2].map((index) => <span key={index} className={index < priorities.length ? 'filled' : ''} />)}
        </div>
      </div>
      <div className="topic-grid">
        {topics.map((topic) => {
          const selected = priorities.includes(topic.id)
          const disabled = priorities.length === 3 && !selected
          return (
            <button
              key={topic.id}
              className={`topic-card ${selected ? 'selected' : ''}`}
              onClick={() => toggle(topic.id)}
              disabled={disabled}
              aria-pressed={selected}
            >
              <span className="topic-check">{selected && <Check size={15} />}</span>
              <strong>{topic.label}</strong>
              <small>{topic.description}</small>
            </button>
          )
        })}
      </div>
      <div className="wizard-actions">
        <span>{priorities.length === 0 ? 'Inga extra vikter valda' : 'Du kan ändra detta senare'}</span>
        <button className="primary-button" onClick={onContinue}>Till frågorna <ArrowRight size={18} /></button>
      </div>
    </section>
  )
}

function QuizPage({
  index,
  answers,
  onIndex,
  onAnswer,
  onBack,
  onResult,
}: {
  index: number
  answers: Answers
  onIndex: (index: number) => void
  onAnswer: (answer: AnswerValue) => void
  onBack: () => void
  onResult: () => void
}) {
  const question = questions[index]
  const currentAnswer = answers[question.id]
  const complete = Object.keys(answers).length === questions.length
  const topic = topics.find((item) => item.id === question.topic)!
  const sectionQuestions = question.kind === 'sakfraga' ? issueQuestions : valueQuestions
  const sectionLength = sectionQuestions.length
  const sectionIndex = sectionQuestions.findIndex((item) => item.id === question.id) + 1

  return (
    <section className="quiz-page">
      <div className="quiz-progress-wrap">
        <div className="page-width quiz-progress-meta">
          <button className="back-button" onClick={onBack}><ArrowLeft size={17} /> Prioriteringar</button>
          <span>{index + 1} av {questions.length}</span>
        </div>
        <div className="quiz-progress"><span style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div>
      </div>
      <div className="question-wrap">
        <div className="question-meta">
          <span>{question.kind === 'sakfraga' ? 'Sakfråga' : 'Värdering'} {sectionIndex}/{sectionLength}</span>
          <span className="topic-pill">{topic.label}</span>
        </div>
        <h1>{question.statement}</h1>
        <p className="question-context"><Info size={16} /> {question.context}</p>
        <div className="answer-scale" role="group" aria-label="Välj hur väl påståendet stämmer">
          <div className="scale-end-labels"><span>Håller inte alls med</span><span>Håller helt med</span></div>
          <div className="answer-row">
            {answerOptions.slice(0, 5).map((option) => (
              <button
                key={option.short}
                className={currentAnswer === option.value ? 'active' : ''}
                onClick={() => onAnswer(option.value)}
                aria-label={option.label}
                aria-pressed={currentAnswer === option.value}
              >{option.short}</button>
            ))}
          </div>
          <button
            className={`unsure-button ${question.id in answers && currentAnswer === null ? 'active' : ''}`}
            onClick={() => onAnswer(null)}
          >
            <CircleHelp size={18} /> Vet ej
          </button>
        </div>
        <div className="question-navigation">
          <button className="secondary-button" disabled={index === 0} onClick={() => onIndex(index - 1)}><ArrowLeft size={17} /> Föregående</button>
          {index < questions.length - 1 ? (
            <button className="secondary-button" onClick={() => onIndex(index + 1)}>Nästa <ArrowRight size={17} /></button>
          ) : (
            <button className="primary-button" disabled={!complete} onClick={onResult}>Visa resultat <ArrowRight size={17} /></button>
          )}
        </div>
        {!complete && index === questions.length - 1 && (
          <p className="completion-note">Du har {questions.length - Object.keys(answers).length} obesvarade frågor. Använd föregående eller välj dem i översikten.</p>
        )}
        <QuestionDots index={index} answers={answers} onIndex={onIndex} />
      </div>
    </section>
  )
}

function QuestionDots({ index, answers, onIndex }: { index: number; answers: Answers; onIndex: (index: number) => void }) {
  return (
    <div className="question-overview" aria-label="Frågeöversikt">
      {questions.map((question, questionIndex) => (
        <button
          key={question.id}
          className={`${questionIndex === index ? 'current' : ''} ${question.id in answers ? 'answered' : ''}`}
          onClick={() => onIndex(questionIndex)}
          aria-label={`Fråga ${questionIndex + 1}${question.id in answers ? ', besvarad' : ''}`}
        />
      ))}
    </div>
  )
}

function ResultPage({
  coordinate,
  priorities,
  onEdit,
  onMethod,
  onFeedback,
  onReset,
}: {
  coordinate: Coordinate
  priorities: TopicId[]
  onEdit: () => void
  onMethod: () => void
  onFeedback: () => void
  onReset: () => void
}) {
  const partyResults = parties
    .map((party) => {
      const partyCoordinate = calculatePartyCoordinate(party, questions)
      return { party, coordinate: partyCoordinate, match: matchPercentage(coordinate, partyCoordinate) }
    })
    .sort((left, right) => {
      const leftSourced = left.party.responses.length > 0
      const rightSourced = right.party.responses.length > 0
      if (leftSourced !== rightSourced) return Number(rightSourced) - Number(leftSourced)
      if (leftSourced && rightSourced) return right.match - left.match
      return 0
    })
  const allUnscored = partyResults.every(({ party }) => party.responses.length === 0)

  return (
    <section className="result-page page-width">
      <div className="result-heading">
        <div>
          <p className="eyebrow"><span /> Ditt resultat</p>
          <h1>Din politiska position</h1>
          <p>Det här är en riktning, inte en etikett. Närliggande positioner kan bygga på ganska olika svar.</p>
        </div>
        <div className="coordinate-readout">
          <div><span>Ekonomi</span><strong>{formatAxis(coordinate.x, 'Vänster', 'Höger')}</strong><small>{Math.abs(Math.round(coordinate.x))} / 100</small></div>
          <div><span>Värderingar</span><strong>{formatAxis(coordinate.y, 'TAN', 'GAL')}</strong><small>{Math.abs(Math.round(coordinate.y))} / 100</small></div>
          <div><span>Inräknade svar</span><strong>{coordinate.answered}</strong><small>av {questions.length}</small></div>
        </div>
      </div>
      <div className="result-layout">
        <PoliticalChart user={coordinate} partyResults={partyResults} />
        <aside className="party-panel">
          <div className="panel-title">
            <div><span className="overline">Partijämförelse</span><h2>Svenska partier</h2></div>
            <span className={`status-badge ${allUnscored ? 'pending' : ''}`}>{allUnscored ? 'Inväntar data' : 'Källbelagd'}</span>
          </div>
          {allUnscored && (
            <div className="data-notice">
              <Info size={18} />
              <p><strong>Partierna ligger i origo tills vidare.</strong> De flyttas först när källbelagda svar från partiprogram och andra primärkällor har matats in.</p>
            </div>
          )}
          <div className="party-list">
            {partyResults.map(({ party, coordinate: partyCoordinate, match }) => (
              <PartyRow key={party.id} party={party} coordinate={partyCoordinate} match={match} />
            ))}
          </div>
        </aside>
      </div>
      <div className="result-details">
        <div>
          <span className="overline">Extra vikt</span>
          <h3>Dina prioriterade ämnen</h3>
          <div className="priority-tags">
            {priorities.length ? priorities.map((id) => <span key={id}>{topics.find((topic) => topic.id === id)?.label} · 1,75×</span>) : <span>Inga extra vikter</span>}
          </div>
        </div>
        <div className="result-actions">
          <button className="secondary-button" onClick={onEdit}>Ändra svar</button>
          <button className="secondary-button" onClick={onMethod}>Granska metoden</button>
          <button className="secondary-button" onClick={onFeedback}>Skicka feedback</button>
          <button className="danger-link" onClick={onReset}><RefreshCw size={15} /> Börja om</button>
        </div>
      </div>
    </section>
  )
}

function PartyRow({ party, coordinate, match }: { party: Party; coordinate: Coordinate; match: number }) {
  const sourced = party.responses.length > 0
  return (
    <div className="party-row">
      <span className="party-logo" style={{ background: party.color, color: party.id === 'sd' ? '#1c2520' : '#fff' }}>{party.shortName}</span>
      <div><strong>{party.name}</strong><small>{sourced ? `${party.responses.length} källbelagda svar` : 'Ej analyserat'}</small></div>
      <div className="match-value"><strong>{sourced ? `${match}%` : '—'}</strong><small>{sourced ? 'matchning' : 'i origo'}</small></div>
      <span className="party-coordinate">{Math.round(coordinate.x)}, {Math.round(coordinate.y)}</span>
    </div>
  )
}

function PoliticalChart({
  user,
  partyResults,
}: {
  user: Coordinate
  partyResults: { party: Party; coordinate: Coordinate; match: number }[]
}) {
  const toX = (x: number) => 8 + ((x + 100) / 200) * 84
  const toY = (y: number) => 8 + ((100 - y) / 200) * 84
  const unscored = partyResults.filter(({ party }) => party.responses.length === 0)
  const scored = partyResults.filter(({ party }) => party.responses.length > 0)

  return (
    <div className="chart-card">
      <div className="chart-label top">GAL <small>grön · alternativ · frihetlig</small></div>
      <div className="chart-label bottom">TAN <small>traditionell · auktoritär · nationalistisk</small></div>
      <div className="chart-label left">VÄNSTER <small>ekonomisk</small></div>
      <div className="chart-label right">HÖGER <small>ekonomisk</small></div>
      <svg viewBox="0 0 100 100" role="img" aria-label={`Din position: ${Math.round(user.x)} på vänster–höger och ${Math.round(user.y)} på GAL–TAN`}>
        <defs>
          <pattern id="smallGrid" width="8.4" height="8.4" patternUnits="userSpaceOnUse">
            <path d="M 8.4 0 L 0 0 0 8.4" fill="none" stroke="#d9d7cc" strokeWidth="0.22" />
          </pattern>
        </defs>
        <rect x="8" y="8" width="84" height="84" rx="1" fill="#fbfaf5" />
        <rect x="8" y="8" width="84" height="84" rx="1" fill="url(#smallGrid)" />
        <line x1="50" y1="8" x2="50" y2="92" stroke="#8f9189" strokeWidth="0.45" />
        <line x1="8" y1="50" x2="92" y2="50" stroke="#8f9189" strokeWidth="0.45" />
        {scored.map(({ party, coordinate }) => (
          <g key={party.id} transform={`translate(${toX(coordinate.x)} ${toY(coordinate.y)})`}>
            <circle r="3.1" fill={party.color} stroke="#fff" strokeWidth="0.8" />
            <text y="1.25" textAnchor="middle" fontSize="3.4" fontWeight="800" fill={party.id === 'sd' ? '#1c2520' : '#fff'}>{party.shortName}</text>
          </g>
        ))}
        {unscored.length > 0 && (
          <g transform="translate(50 50)">
            <circle r="4.8" fill="#fff" stroke="#68746b" strokeWidth="0.6" />
            <text y="-0.1" textAnchor="middle" fontSize="3.4" fontWeight="800" fill="#24342b">{unscored.length}</text>
            <text y="2.7" textAnchor="middle" fontSize="1.55" fontWeight="700" fill="#68746b">PARTIER</text>
          </g>
        )}
        <g transform={`translate(${toX(user.x)} ${toY(user.y)})`}>
          <circle r="6.2" fill="#ed714f" opacity="0.16" />
          <circle r="3.65" fill="#ed714f" stroke="#fff" strokeWidth="0.8" />
          <text y="1.05" textAnchor="middle" fontSize="2.8" fontWeight="800" fill="#fff">DU</text>
        </g>
      </svg>
      <div className="chart-legend"><span className="legend-you" /> Din position <span className="legend-parties" /> Partier utan analyserade svar</div>
    </div>
  )
}

function MethodDialog({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="method-title">
        <button className="modal-close" onClick={onClose} aria-label="Stäng"><X size={20} /></button>
        <p className="eyebrow"><span /> Öppen metod</p>
        <h2 id="method-title">Så räknas kompassen</h2>
        <div className="method-list">
          <div><strong>1</strong><p><b>Varje påstående har en fördefinierad riktning.</b> Ekonomiska frågor påverkar vänster–höger. Frågor om frihet, tradition och auktoritet påverkar GAL–TAN.</p></div>
          <div><strong>2</strong><p><b>Svarsskalan omvandlas symmetriskt.</b> 1–5 blir −1, −0,5, 0, +0,5 och +1. Omvända formuleringar minskar risken för ja-sägareffekt.</p></div>
          <div><strong>3</strong><p><b>“Vet ej” lämnas utanför.</b> Det drar dig inte mot mitten. Valda prioriteringar får vikten 1,75; övriga vikten 1.</p></div>
          <div><strong>4</strong><p><b>Resultatet normaliseras till −100…+100.</b> Skalan är relativ till svenska politiska skiljelinjer och ska inte jämföras direkt med amerikanska kompasser.</p></div>
          <div><strong>5</strong><p><b>Partisvar kräver belägg.</b> Varje kodat svar kan bära källa, citat, datum och säkerhetsnivå. Motstridiga eller oklara belägg ska markeras — inte gissas bort.</p></div>
        </div>
        <div className="coding-rules">
          <h3>Regler för partiprogram</h3>
          <ul>
            {partyCodingRules.map((rule) => <li key={rule}>{rule}</li>)}
          </ul>
        </div>
        <div className="method-links">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer"><GitBranch size={16} /> Källkod</a>
          <a href={OPEN_PROMPTS_URL} target="_blank" rel="noreferrer"><FileText size={16} /> Open prompts</a>
        </div>
        <div className="method-caveat"><Info size={19} /><p>Ingen modell är helt värderingsfri: val av frågor och axlar påverkar resultatet. Därför ligger frågetexter, vikter och partibelägg öppet i projektets datafiler.</p></div>
        <button className="primary-button" onClick={onClose}>Jag förstår</button>
      </section>
    </div>
  )
}

function FeedbackDialog({ onClose }: { onClose: () => void }) {
  const [reason, setReason] = useState<FeedbackReason>(feedbackReasons[0])
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<{ kind: 'idle' | 'success' | 'error' | 'submitting'; text: string }>({
    kind: 'idle',
    text: '',
  })

  async function submitFeedback(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus({ kind: 'submitting', text: 'Skickar feedback...' })

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          reason,
          message,
          page: window.location.href,
        }),
      })
      const data = (await response.json()) as { ok?: boolean; error?: string }
      if (!response.ok || !data.ok) throw new Error(data.error ?? 'Feedbacken kunde inte sparas.')

      setMessage('')
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
        <p className="eyebrow"><span /> Hjälp oss granska</p>
        <h2 id="feedback-title">Skicka feedback</h2>
        <form className="feedback-form" onSubmit={submitFeedback}>
          <label htmlFor="feedback-reason">
            Anledning
            <select id="feedback-reason" value={reason} onChange={(event) => setReason(event.target.value as FeedbackReason)}>
              {feedbackReasons.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label htmlFor="feedback-message">
            Utveckla
            <textarea
              id="feedback-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              minLength={12}
              maxLength={4000}
              rows={7}
              required
              placeholder="Skriv vad du såg, vilken fråga det gäller eller varför resultatet känns fel."
            />
          </label>
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

function Footer({ onFeedback }: { onFeedback: () => void }) {
  return (
    <footer>
      <div className="page-width">
        <span>Partikartan</span>
        <span className="footer-links">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub</a>
          <a href={OPEN_PROMPTS_URL} target="_blank" rel="noreferrer">Open prompts</a>
          <button onClick={onFeedback}>Feedback</button>
        </span>
      </div>
    </footer>
  )
}

function formatAxis(value: number, negative: string, positive: string) {
  if (Math.abs(value) < 5) return 'Mitten'
  return value < 0 ? negative : positive
}

export default App
