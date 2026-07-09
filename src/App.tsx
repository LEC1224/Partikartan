import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Bot,
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
  ShieldCheck,
  Send,
  UserRound,
  X,
} from 'lucide-react'
import { parties } from './data/parties'
import { partyCodingRules } from './data/partyCoding'
import { questionArguments } from './data/questionArguments'
import { issueQuestions, questions, valueQuestions } from './data/questions'
import { topics } from './data/topics'
import {
  calculateCoordinate,
  calculatePartyCoordinate,
  calculatePartyMatch,
  countKnownPartyResponses,
} from './lib/scoring'
import type { Answers, AnswerValue, Coordinate, Party, TopicId } from './types'
import type { PartyMatch } from './lib/scoring'

type View = 'start' | 'priorities' | 'quiz' | 'result'
type SavedProgress = { answers: Answers; priorities: TopicId[] }
type FeedbackReason =
  | 'Jag hittade bias i koden'
  | 'Jag tror att mitt resultat är fel'
  | 'Jag tror att ett partis position i koordinatsystemet är felaktigt'
  | 'Jag saknar ett parti i sammanfattningen'
  | 'Jag tycker att en fråga är vinklat formulerad'
  | 'Annat'
const STORAGE_KEY = 'partikartan-progress-v2'
const GITHUB_URL = 'https://github.com/LEC1224/Partikartan'
const OPEN_PROMPTS_URL = `${GITHUB_URL}/blob/main/OPEN_PROMPTS.md`
const CHART_AXIS_LIMIT = 140

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
  'Jag tror att ett partis position i koordinatsystemet är felaktigt',
  'Jag saknar ett parti i sammanfattningen',
  'Jag tycker att en fråga är vinklat formulerad',
  'Annat',
]

function markerTextColor(party: Party): string {
  return party.id === 'sd' || party.id === 'm' ? '#1c2520' : '#fff'
}

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
  const [aboutOpen, setAboutOpen] = useState(false)
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
        onAbout={() => setAboutOpen(true)}
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
            onResult={() => setView('result')}
            onMethod={() => setMethodOpen(true)}
            onFeedback={() => setFeedbackOpen(true)}
            onReset={reset}
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
            answers={answers}
            priorities={priorities}
            onEdit={beginQuiz}
            onMethod={() => setMethodOpen(true)}
            onFeedback={() => setFeedbackOpen(true)}
            onReset={reset}
          />
        )}
      </main>
      <Footer onAbout={() => setAboutOpen(true)} onFeedback={() => setFeedbackOpen(true)} />
      {aboutOpen && (
        <AboutDialog
          onClose={() => setAboutOpen(false)}
          onFeedback={() => {
            setAboutOpen(false)
            setFeedbackOpen(true)
          }}
          onMethod={() => {
            setAboutOpen(false)
            setMethodOpen(true)
          }}
        />
      )}
      {methodOpen && <MethodDialog onClose={() => setMethodOpen(false)} />}
      {feedbackOpen && <FeedbackDialog onClose={() => setFeedbackOpen(false)} />}
    </div>
  )
}

function Header({
  onLogo,
  onAbout,
  onMethod,
  onFeedback,
  answeredCount,
  onResume,
}: {
  onLogo: () => void
  onAbout: () => void
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
        <button className="nav-link" onClick={onAbout}>Om sidan</button>
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
  onResult,
  onMethod,
  onFeedback,
  onReset,
}: {
  answeredCount: number
  onStart: () => void
  onResume: () => void
  onResult: () => void
  onMethod: () => void
  onFeedback: () => void
  onReset: () => void
}) {
  const complete = answeredCount === questions.length
  const hasProgress = answeredCount > 0

  return (
    <>
      <section className="hero page-width">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Sverige · Politik · 2026</p>
          <h1>Var står du<br />politiskt?</h1>
          <p className="hero-intro">
            Utforska dina värderingar på en karta anpassad efter svensk politik. Partikartan är avsedd att vara objektiv, oberoende och transparent.
          </p>
          <div className="hero-actions">
            <button className="primary-button" onClick={complete ? onResult : hasProgress ? onResume : onStart}>
              {complete ? 'Visa ditt resultat' : hasProgress ? 'Fortsätt där du slutade' : 'Starta kompassen'}
              <ArrowRight size={18} />
            </button>
            {hasProgress && (
              <button className="secondary-button" onClick={onReset}>Börja om <RefreshCw size={16} /></button>
            )}
            <button className="text-button" onClick={onMethod}>Se hur det räknas <ChevronRight size={16} /></button>
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
        <TransparencySection onFeedback={onFeedback} />
      </section>
    </>
  )
}

function AboutDialog({
  onClose,
  onFeedback,
  onMethod,
}: {
  onClose: () => void
  onFeedback: () => void
  onMethod: () => void
}) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="modal about-modal" role="dialog" aria-modal="true" aria-labelledby="about-title">
        <button className="modal-close" onClick={onClose} aria-label="Stäng"><X size={20} /></button>
        <div className="about-intro">
          <p className="eyebrow"><span /> Om Partikartan</p>
          <h2 id="about-title">Vem driver sidan?</h2>
          <p>
            Sidan är helt oberoende, reklamfri och icke-vinstdrivande. Den är inte knuten till något parti, företag eller kampanj, och den har inget ekonomiskt incitament att styra användare mot ett visst resultat.
          </p>
          <p>
            Jag som driver Partikartan heter Carl Månsson och är mjukvaruutvecklare från Göteborg. Jag byggde sidan för att jag saknade en valkompass som ger partirelativa svar för både vänster-höger och GAL-TAN, känns saklig, responsiv och möjlig att granska.
          </p>
          <p>
            Målet är inte att påstå att kompassen är perfekt neutral. Målet är att göra antaganden, källor och möjliga fel synliga nog för att kunna granskas, kritiseras och förbättras.
          </p>
        </div>
        <div className="about-card">
          <span className="about-card-icon"><UserRound size={20} /></span>
          <h2>Drift och ansvar</h2>
          <p>
            Frågor, viktning, partipositioner, promptar och kod hålls öppna i projektets repo. Partikartan är nästan helt utvecklad genom prompting i Codex, vilket också gör utvecklingsprocessen möjlig att följa.
          </p>
          <p>
            Dina svar, prioriterade ämnen och ditt resultat skickas inte till servern. Pågående svar sparas bara i webbläsarens lokala lagring så att du kan fortsätta testet senare; det enda som sparas av Partikartan är feedbackmeddelanden du själv skickar in.
          </p>
        </div>
        <div className="about-steps">
          <article>
            <span><FileText size={18} /></span>
            <h2>Partiernas egna texter som grund</h2>
            <p>
              Partipositionerna kodas i första hand från partiernas egna partiprogram, principprogram, idéprogram och valmanifest. Där materialet inte räcker används kompletterande officiella källor från partierna.
            </p>
          </article>
          <article>
            <span><Bot size={18} /></span>
            <h2>AI som arbetsverktyg</h2>
            <p>
              GPT-5.5 och Codex har använts för att generera algoritmerna, bygga tjänsten och rapportera in partiernas svar utifrån källmaterialet. Det kan minska min direkta bias, men kan samtidigt föra in bias från OpenAI:s modeller.
            </p>
          </article>
          <article>
            <span><ShieldCheck size={18} /></span>
            <h2>Kontroller mot vinklade frågor</h2>
            <p>
              Testet har kontrollerats genom att svara 1 på alla frågor och 5 på alla frågor. Att båda resultaten hamnar hyfsat nära origo tyder på att frågorna inte systematiskt lutar åt ett håll.
            </p>
          </article>
        </div>
        <div className="about-actions modal-actions">
          <button className="secondary-button" onClick={onMethod}>Granska metoden <ChevronRight size={16} /></button>
          <button className="primary-button" onClick={onFeedback}>Skicka feedback <MessageSquare size={17} /></button>
        </div>
      </section>
    </div>
  )
}

function TransparencySection({ onFeedback }: { onFeedback: () => void }) {
  return (
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
        <h3>Feedback till mig</h3>
        <p>Misstänkt bias, felaktiga resultat och vinklade formuleringar ska kunna rapporteras.</p>
        <button className="inline-link button-link" onClick={onFeedback}>Skicka feedback <ChevronRight size={15} /></button>
      </article>
    </div>
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
  const argument = questionArguments[question.id]
  const [openArgumentId, setOpenArgumentId] = useState<string | null>(null)
  const argumentsOpen = openArgumentId === question.id

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
        <div className="question-prompt">
          <div className="question-meta">
            <span>{question.kind === 'sakfraga' ? 'Sakfråga' : 'Värdering'} {sectionIndex}/{sectionLength}</span>
            <span className="topic-pill">{topic.label}</span>
          </div>
          <h1>{question.statement}</h1>
          <p className="question-context"><Info size={16} /> {question.context}</p>
          <button
            className={`argument-toggle ${argumentsOpen ? 'active' : ''}`}
            onClick={() => setOpenArgumentId((id) => (id === question.id ? null : question.id))}
            aria-expanded={argumentsOpen}
            aria-controls={`question-arguments-${question.id}`}
          >
            <MessageSquare size={16} />
            Argument för och emot
            <ChevronRight className="argument-chevron" size={15} />
          </button>
          {argumentsOpen && (
            <div className="argument-panel" id={`question-arguments-${question.id}`}>
              <div>
                <strong>Emot påståendet</strong>
                <p>{argument.against}</p>
              </div>
              <div>
                <strong>För påståendet</strong>
                <p>{argument.for}</p>
              </div>
            </div>
          )}
        </div>
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
  answers,
  priorities,
  onEdit,
  onMethod,
  onFeedback,
  onReset,
}: {
  coordinate: Coordinate
  answers: Answers
  priorities: TopicId[]
  onEdit: () => void
  onMethod: () => void
  onFeedback: () => void
  onReset: () => void
}) {
  const partyResults = parties
    .map((party) => {
      const partyCoordinate = calculatePartyCoordinate(party, questions)
      return { party, coordinate: partyCoordinate, match: calculatePartyMatch(answers, party, questions, priorities) }
    })
    .sort((left, right) => {
      const leftSourced = countKnownPartyResponses(left.party) > 0
      const rightSourced = countKnownPartyResponses(right.party) > 0
      if (leftSourced !== rightSourced) return Number(rightSourced) - Number(leftSourced)
      if (leftSourced && rightSourced) return right.match.percent - left.match.percent
      return 0
    })
  const allUnscored = partyResults.every(({ party }) => countKnownPartyResponses(party) === 0)

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
      <AnswerComparison answers={answers} />
    </section>
  )
}

function PartyRow({ party, coordinate, match }: { party: Party; coordinate: Coordinate; match: PartyMatch }) {
  const sourced = countKnownPartyResponses(party)
  return (
    <div className="party-row">
      <span className="party-logo" style={{ background: party.color, color: markerTextColor(party) }}>{party.shortName}</span>
      <div><strong>{party.name}</strong><small>{sourced} källbelagda, {party.responses.length - sourced} Vet ej</small></div>
      <div className="match-value"><strong>{sourced ? `${match.percent}%` : '—'}</strong><small>{match.comparedQuestions ? `${match.exactMatches} exakta, ${match.nearMatches} nära` : 'inga svar'}</small></div>
      <span className="party-coordinate">{Math.round(coordinate.x)}, {Math.round(coordinate.y)}</span>
    </div>
  )
}

function PoliticalChart({
  user,
  partyResults,
}: {
  user: Coordinate
  partyResults: { party: Party; coordinate: Coordinate; match: PartyMatch }[]
}) {
  const clampToChart = (value: number) => Math.max(-CHART_AXIS_LIMIT, Math.min(CHART_AXIS_LIMIT, value))
  const toX = (x: number) => 8 + ((clampToChart(x) + CHART_AXIS_LIMIT) / (CHART_AXIS_LIMIT * 2)) * 84
  const toY = (y: number) => 8 + ((CHART_AXIS_LIMIT - clampToChart(y)) / (CHART_AXIS_LIMIT * 2)) * 84
  const unscored = partyResults.filter(({ party }) => countKnownPartyResponses(party) === 0)
  const scored = partyResults.filter(({ party }) => countKnownPartyResponses(party) > 0)

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
            <text y="1.25" textAnchor="middle" fontSize="3.4" fontWeight="800" fill={markerTextColor(party)}>{party.shortName}</text>
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

function AnswerComparison({ answers }: { answers: Answers }) {
  return (
    <section className="answer-comparison">
      <div className="answer-comparison-heading">
        <div>
          <span className="overline">Svar fråga för fråga</span>
          <h2>Din matchning mot partierna</h2>
        </div>
        <p>Partier utan tydligt källbelägg visas som Vet ej. Procenten ovan bygger på dina besvarade frågor, där ett steg ifrån ger delträff.</p>
      </div>
      <div className="answer-table" role="table" aria-label="Svar per fråga och parti">
        {questions.map((question, index) => {
          const userAnswered = question.id in answers
          const userAnswer = answers[question.id]
          const topic = topics.find((item) => item.id === question.topic)

          return (
            <article className="comparison-row" key={question.id} role="row">
              <div className="answer-question">
                <span>{index + 1}. {question.kind === 'sakfraga' ? 'Sakfråga' : 'Värdering'} · {topic?.label}</span>
                <h3>{question.statement}</h3>
                <p>Du: {userAnswered ? answerLabel(userAnswer) : 'Ej besvarad'}</p>
              </div>
              <div className="answer-options">
                {answerOptions.map((option) => {
                  const markers = [
                    ...(userAnswered && userAnswer === option.value
                      ? [{ id: 'you', shortName: 'DU', name: 'Du', color: '#ed714f', textColor: '#fff' }]
                      : []),
                    ...parties
                      .filter((party) => party.responses.find((response) => response.questionId === question.id)?.value === option.value)
                      .map((party) => ({
                        id: party.id,
                        shortName: party.shortName,
                        name: party.name,
                        color: party.color,
                        textColor: markerTextColor(party),
                      })),
                  ]

                  return (
                    <div className="answer-option" key={option.short} role="cell">
                      <span className="answer-option-label" title={option.label}>{option.short === '?' ? 'Vet ej' : option.short}</span>
                      <div className="answer-token-stack">
                        {markers.length > 0 ? markers.map((marker) => (
                          <span
                            className={`answer-token ${marker.id === 'you' ? 'you-token' : ''}`}
                            key={marker.id}
                            style={{ background: marker.color, color: marker.textColor }}
                            title={marker.name}
                          >
                            {marker.shortName}
                          </span>
                        )) : <span className="answer-token-placeholder" aria-hidden="true" />}
                      </div>
                    </div>
                  )
                })}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function answerLabel(value: AnswerValue | undefined): string {
  if (value == null) return 'Vet ej'
  return `${value} - ${answerOptions.find((option) => option.value === value)?.label ?? ''}`
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
          <div><strong>4</strong><p><b>Kartresultatet normaliseras till −100…+100.</b> Skalan är relativ till svenska politiska skiljelinjer och ska inte jämföras direkt med amerikanska kompasser.</p></div>
          <div><strong>5</strong><p><b>Partimatchningen räknas fråga för fråga.</b> Exakt samma svar ger full träff. Ett steg ifrån, till exempel 4 mot 5, ger 75 procent av frågans poäng; två steg ger 50 procent.</p></div>
          <div><strong>6</strong><p><b>Partisvar kräver belägg.</b> När källorna är oklara, indirekta eller motsägelsefulla visas partiet som Vet ej i den frågan i stället för att få en gissad position.</p></div>
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
        <p className="eyebrow"><span /> Hjälp mig utforma tjänsten</p>
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
              placeholder="Skriv din feedback här."
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

function Footer({ onAbout, onFeedback }: { onAbout: () => void; onFeedback: () => void }) {
  return (
    <footer>
      <div className="page-width">
        <span>Partikartan</span>
        <span className="footer-links">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub</a>
          <a href={OPEN_PROMPTS_URL} target="_blank" rel="noreferrer">Open prompts</a>
          <button onClick={onAbout}>Om sidan</button>
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
