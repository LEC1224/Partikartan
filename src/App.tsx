import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Check,
  ChevronRight,
  CircleHelp,
  Compass,
  Download,
  ExternalLink,
  FileDown,
  FileImage,
  FileText,
  GitBranch,
  Info,
  LoaderCircle,
  MessageSquare,
  RefreshCw,
  ShieldCheck,
  User,
  UserRound,
  X,
} from 'lucide-react'
import { FeedbackDialog } from './components/FeedbackDialog'
import { parties } from './data/parties'
import { partyCodingRules } from './data/partyCoding'
import { questionArguments } from './data/questionArguments'
import { questions } from './data/questions'
import { questionRevisions } from './data/questionRevisions'
import { quickQuestions } from './data/quickQuestions'
import { topics } from './data/topics'
import {
  calculateCoordinate,
  calculatePartyCoordinate,
  getAnsweredAxes,
  calculatePartyMatch,
  COORDINATE_SCALE,
  countKnownPartyResponses,
} from './lib/scoring'
import { exportResultAsPdf, exportResultAsPng } from './lib/exportResults'
import { getPartyCoverage, requiredPartyResponses } from './lib/partyCoverage'
import { restoreAnswers } from './lib/savedAnswers'
import type { PartyCoverage } from './lib/partyCoverage'
import type { Answers, AnswerValue, Coordinate, Party, PartyResponse, Question, TopicId } from './types'
import type { PartyMatch } from './lib/scoring'

type View = 'start' | 'quiz-mode' | 'priorities' | 'quiz' | 'result'
type QuizMode = 'quick' | 'full'
type SavedProgress = { answers: Answers; priorities: TopicId[]; quizMode: QuizMode; questionRevisions?: Record<string, number>; revisedQuestionIds?: string[] }
const STORAGE_KEY = 'partikartan-progress-v2'
const GITHUB_URL = 'https://github.com/LEC1224/Partikartan'
const OPEN_PROMPTS_URL = `${GITHUB_URL}/blob/main/PROMPTS/OPEN_PROMPTS_v2.md`
const REVIEW_URL = `${GITHUB_URL}/blob/main/source-data/reviews/2026-09-26-review.md`
const CHART_AXIS_LIMIT = COORDINATE_SCALE
const CHART_AXIS_LABEL = `±${CHART_AXIS_LIMIT}`

const answerOptions: { value: AnswerValue; short: string; label: string }[] = [
  { value: 1, short: '1', label: 'Håller inte alls med' },
  { value: 2, short: '2', label: 'Håller mestadels inte med' },
  { value: 3, short: '3', label: 'Varken eller' },
  { value: 4, short: '4', label: 'Håller mestadels med' },
  { value: 5, short: '5', label: 'Håller helt med' },
  { value: null, short: '?', label: 'Vet ej' },
]

function markerTextColor(party: Party): string {
  return party.textColor ?? (party.id === 'sd' || party.id === 'm' ? '#1c2520' : '#fff')
}

function swedishGenitive(name: string): string {
  return /[sxz]$/i.test(name) ? name : `${name}s`
}

function readSavedProgress(): SavedProgress {
  if (typeof window === 'undefined') return { answers: {}, priorities: [], quizMode: 'full' }

  const saved = localStorage.getItem(STORAGE_KEY)
  if (!saved) return { answers: {}, priorities: [], quizMode: 'full' }

  try {
    const parsed = JSON.parse(saved) as Partial<SavedProgress>
    return {
      ...restoreAnswers(parsed.answers, parsed.questionRevisions),
      priorities: parsed.priorities ?? [],
      quizMode: parsed.quizMode === 'quick' ? 'quick' : 'full',
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return { answers: {}, priorities: [], quizMode: 'full' }
  }
}

function App() {
  const [initialProgress] = useState(readSavedProgress)
  const [view, setView] = useState<View>('start')
  const [priorities, setPriorities] = useState<TopicId[]>(initialProgress.priorities)
  const [answers, setAnswers] = useState<Answers>(initialProgress.answers)
  const [quizMode, setQuizMode] = useState<QuizMode>(initialProgress.quizMode)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [methodOpen, setMethodOpen] = useState(false)
  const [feedbackOpen, setFeedbackOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [view])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, priorities, quizMode, questionRevisions }))
  }, [answers, priorities, quizMode])

  const activeQuestions = quizMode === 'quick' ? quickQuestions : questions
  const answeredCount = activeQuestions.filter((question) => question.id in answers).length
  const coordinate = useMemo(
    () => calculateCoordinate(answers, activeQuestions, priorities),
    [activeQuestions, answers, priorities],
  )

  function beginQuiz() {
    const firstUnanswered = activeQuestions.findIndex((question) => !(question.id in answers))
    setQuestionIndex(firstUnanswered < 0 ? 0 : firstUnanswered)
    setView('quiz')
  }

  function answerQuestion(value: AnswerValue) {
    const question = activeQuestions[questionIndex]
    setAnswers((current) => ({ ...current, [question.id]: value }))
    if (questionIndex < activeQuestions.length - 1) {
      window.setTimeout(() => setQuestionIndex((index) => index + 1), 140)
    }
  }

  function chooseQuizMode(mode: QuizMode) {
    setQuizMode(mode)
    setQuestionIndex(0)
    setView('priorities')
  }

  function reset() {
    setAnswers({})
    setPriorities([])
    setQuizMode('full')
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
        questionCount={activeQuestions.length}
        onResume={beginQuiz}
      />
      <main>
        {initialProgress.revisedQuestionIds?.some((id) => activeQuestions.some((question) => question.id === id) && !(id in answers)) && (
          <div className="page-width data-notice" role="status">
            <Info size={18} />
            <p>Några frågor har fått en ny formulering eller förklaring och behöver besvaras på nytt. Dina övriga sparade svar finns kvar.</p>
          </div>
        )}
        {view === 'start' && (
          <StartPage
            answeredCount={answeredCount}
            questionCount={activeQuestions.length}
            onStart={() => setView('quiz-mode')}
            onResume={beginQuiz}
            onResult={() => setView('result')}
            onMethod={() => setMethodOpen(true)}
            onFeedback={() => setFeedbackOpen(true)}
            onReset={reset}
          />
        )}
        {view === 'quiz-mode' && (
          <QuizModePage
            onBack={() => setView('start')}
            onSelect={chooseQuizMode}
          />
        )}
        {view === 'priorities' && (
          <PriorityPage
            priorities={priorities}
            onChange={setPriorities}
            onBack={() => setView(answeredCount > 0 ? 'start' : 'quiz-mode')}
            onContinue={beginQuiz}
          />
        )}
        {view === 'quiz' && (
          <QuizPage
            index={questionIndex}
            answers={answers}
            questions={activeQuestions}
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
            questions={activeQuestions}
            quizMode={quizMode}
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
  questionCount,
  onResume,
}: {
  onLogo: () => void
  onAbout: () => void
  onMethod: () => void
  onFeedback: () => void
  answeredCount: number
  questionCount: number
  onResume: () => void
}) {
  return (
    <header className="site-header">
      <button className="brand" onClick={onLogo} aria-label="Till startsidan">
        <span className="brand-mark"><Compass size={20} strokeWidth={2.2} /></span>
        <span className="brand-title">Partikartan</span>
      </button>
      <nav aria-label="Huvudmeny">
        <button className="nav-link" onClick={onAbout}>Om sidan</button>
        <button className="nav-link" onClick={onMethod}>Så fungerar det</button>
        <button className="nav-link" onClick={onFeedback}>Feedback</button>
        <button className="nav-icon-link" onClick={onAbout} aria-label="Öppna Om sidan" title="Om sidan">
          <User size={17} />
        </button>
        <button className="nav-icon-link" onClick={onMethod} aria-label="Öppna Så fungerar det" title="Så fungerar det">
          <CircleHelp size={17} />
        </button>
        <button className="nav-icon-link" onClick={onFeedback} aria-label="Öppna Feedback" title="Feedback">
          <MessageSquare size={17} />
        </button>
        {answeredCount > 0 && answeredCount < questionCount && (
          <button className="resume-link" onClick={onResume}>
            Fortsätt <span>{answeredCount}/{questionCount}</span>
          </button>
        )}
      </nav>
    </header>
  )
}

function StartPage({
  answeredCount,
  questionCount,
  onStart,
  onResume,
  onResult,
  onMethod,
  onFeedback,
  onReset,
}: {
  answeredCount: number
  questionCount: number
  onStart: () => void
  onResume: () => void
  onResult: () => void
  onMethod: () => void
  onFeedback: () => void
  onReset: () => void
}) {
  const complete = answeredCount === questionCount
  const hasProgress = answeredCount > 0

  return (
    <>
      <section className="hero page-width">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Sverige · Politik · 2026</p>
          <h1>Var står du<br />politiskt?</h1>
          <p className="hero-intro">
            Gör ett politiskt test på två axlar: ekonomisk vänster–höger och GAL–TAN. Partikartan är en oberoende och transparent valkompass för svensk politik 2026.
          </p>
          <div className="hero-actions">
            <button className="primary-button" onClick={complete ? onResult : hasProgress ? onResume : onStart}>
              {complete ? 'Visa ditt resultat' : hasProgress ? 'Fortsätt där du slutade' : 'Starta kompassen'}
              <ArrowRight size={18} />
            </button>
            {!complete && (
              <button className="secondary-button" onClick={onResult}>
                Visa partisvar <FileText size={16} />
              </button>
            )}
            {hasProgress && (
              <button className="secondary-button" onClick={onReset}>Börja om <RefreshCw size={16} /></button>
            )}
            <button className="text-button" onClick={onMethod}>Se hur det räknas <ChevronRight size={16} /></button>
          </div>
          <div className="hero-meta">
            <span><Check size={15} /> {quickQuestions.length} eller {questions.length} frågor</span>
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
      <SeoOverview />
      <section className="principles">
        <TransparencySection onFeedback={onFeedback} />
      </section>
    </>
  )
}

function SeoOverview() {
  return (
    <section className="seo-overview" aria-labelledby="gal-tan-heading">
      <div className="page-width">
        <div className="seo-heading">
          <div>
            <p className="eyebrow"><span /> Två politiska dimensioner</p>
            <h2 id="gal-tan-heading">En svensk GAL–TAN-kompass för politikens vägval</h2>
          </div>
          <p>
            Partikartan kombinerar en politisk kompass med en valkompass. Du får både se var du hamnar på kartan och hur dina enskilda svar stämmer överens med riksdagspartiernas källbelagda ståndpunkter.
          </p>
        </div>
        <div className="seo-grid">
          <article>
            <span className="seo-number">01</span>
            <h3>Vad betyder GAL–TAN?</h3>
            <p>
              GAL står för gröna, alternativa och frihetliga värderingar. TAN står för traditionella, auktoritära och nationalistiska värderingar. Axeln kompletterar den ekonomiska vänster–höger-skalan.
            </p>
          </article>
          <article>
            <span className="seo-number">02</span>
            <h3>{quickQuestions.length} eller {questions.length} politiska frågor</h3>
            <p>
              Välj ett snabbt GAL–TAN-test på cirka fem minuter eller den fullständiga politiska kompassen. Båda versionerna täcker sakpolitik och värderingsfrågor anpassade till Sverige.
            </p>
          </article>
          <article>
            <span className="seo-number">03</span>
            <h3>Jämför med svenska partier</h3>
            <p>
              Jämför dina svar med de åtta riksdagspartierna. Källor och motiveringar visar hur deras ståndpunkter har bedömts.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}

function QuizModePage({
  onBack,
  onSelect,
}: {
  onBack: () => void
  onSelect: (mode: QuizMode) => void
}) {
  return (
    <section className="wizard-page page-width narrow-page mode-page">
      <button className="back-button" onClick={onBack}><ArrowLeft size={17} /> Tillbaka</button>
      <p className="eyebrow"><span /> Välj testlängd</p>
      <h1>Vilken testlängd vill du använda?</h1>
      <p className="page-lead">
        Välj mellan {quickQuestions.length} frågor på cirka 5 minuter och samtliga {questions.length} frågor på cirka 15 minuter.
      </p>
      <div className="mode-grid">
        <button className="mode-card" onClick={() => onSelect('quick')}>
          <span className="mode-time">Cirka 5 minuter</span>
          <strong>Snabbtest</strong>
          <p>{quickQuestions.length} frågor inom samtliga ämnen. Varje fråga har källbelagda svar från minst sju partier.</p>
          <span className="mode-action">Starta snabbtestet <ArrowRight size={17} /></span>
        </button>
        <button className="mode-card" onClick={() => onSelect('full')}>
          <span className="mode-time">Cirka 15 minuter</span>
          <strong>Fullständigt test</strong>
          <p>Samtliga {questions.length} sak- och värderingsfrågor inom kompassens alla ämnen.</p>
          <span className="mode-action">Starta fullständiga testet <ArrowRight size={17} /></span>
        </button>
      </div>
      <p className="mode-note"><ShieldCheck size={17} /> Båda testversionerna innehåller påståenden i båda politiska riktningarna. Frågor, vikter och källor är öppna för granskning.</p>
    </section>
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
            Partikartan drivs av mig, Carl Månsson, mjukvaruutvecklare från Göteborg. Jag byggde sidan eftersom jag saknade en valkompass som kombinerar ekonomisk vänster–höger med GAL–TAN och samtidigt känns snabb, clean och möjlig att granska.
          </p>
          <p>
            Sidan drivs inte på uppdrag av och är inte knuten till något parti, företag, kampanj eller annan intresseorganisation. Ingen extern aktör bestämmer över frågor, viktning, partipositioner eller resultat, förutom genom er sakliga och källbegrundade feedback.
          </p>
          <p>
            För transparensens skull vill jag också upplysa om att jag är medlem i Liberalerna, men partiet har inte haft något att göra med att jag valt att skapa Partikartan.
          </p>
          <p>
            Målet är inte att hävda att kompassen är perfekt neutral. Jag tror för övrigt inte att människor kan skapa helt objektiva verk. Målet är snarare att göra antaganden, källor och möjliga fel synliga nog för att kunna granskas, kritiseras och förbättras.
          </p>
        </div>
        <div className="about-card">
          <span className="about-card-icon"><GitBranch size={20} /></span>
          <h2>Ansvar och öppenhet</h2>
          <p>
            Frågor, viktning, partipositioner, promptar och kod hålls öppna i projektets repo. Partikartan är nästan helt utvecklad genom prompting i Codex, vilket också gör utvecklingsprocessen möjlig att följa.
          </p>
          <p>
            Dina svar, prioriterade ämnen och resultat skickas inte till servern. Pågående svar sparas bara lokalt i din webbläsare så att du kan fortsätta testet senare. Det enda Partikartan sparar är feedbackmeddelanden som du själv väljer att skicka in.
          </p>
        </div>
        <div className="about-card">
          <span className="about-card-icon"><UserRound size={20} /></span>
          <h2>Drift och frivilligt stöd</h2>
          <p>
            Partikartan är gratis och drivs inte som en kommersiell tjänst. Den har inga annonser, sponsrade placeringar eller betalfunktioner. Jag står själv för driften, men den som vill kan frivilligt bidra till drift och fortsatt utvecklingsarbete via Swish på <strong>072‑329 77 62</strong>.
          </p>
          <p>
            Skriv gärna &quot;Tack för Partikartan&quot; eller något i meddelandefältet så jag vet var pengarna kommer ifrån. Donationer med konkreta ändringsförslag i meddelande-fältet kommer tolkas som påverkansförsök och jag kommer i sådana fall återbetala beloppet och ignorera förslaget. Vill du påverka Partikartans innehåll, använd feedback-formuläret. Donationer är bara för visad uppskattning.
          </p>
        </div>
        <div className="about-card">
          <span className="about-card-icon"><ShieldCheck size={20} /></span>
          <h2>Ren upplevelse</h2>
          <p>
            Jag värdesätter en snabb och responsiv hemsida som fungerar lika bra i mobilen som på datorn och låter dig fokusera på frågorna.
          </p>
          <p>
            Partikartan använder inga cookies, annonsnätverk eller verktyg för reklamspårning.
          </p>
        </div>
        <div className="about-steps">
          <article>
            <span><FileText size={18} /></span>
            <h2>Partiernas egna texter som grund</h2>
            <p>
              Partipositionerna bygger på partiernas egna program och officiella ställningstaganden. Även motioner, reservationer och omröstningar används när de tydligt gäller just frågan. Det är en sammanställning av belagda ståndpunkter, inte en fullständig granskning av hur partierna har röstat eller genomfört sin politik.
            </p>
          </article>
          <article>
            <span><Bot size={18} /></span>
            <h2>AI som arbetsverktyg</h2>
            <p>
              OpenAI:s språkmodeller har använts genom Codex för att utveckla tjänsten, skriva stora delar av koden och strukturera partiernas svar utifrån källmaterialet. Det kan minska betydelsen av vissa direkta val från mig, men garanterar inte neutralitet och kan samtidigt föra in bias från modellerna.
            </p>
          </article>
          <article>
            <span><ShieldCheck size={18} /></span>
            <h2>Kontroller av frågornas balans</h2>
            <p>
              Som en grundläggande balanskontroll testar vi svaret 1 på samtliga frågor och svaret 5 på samtliga frågor, utan prioriterade ämnen. På varje axel ska minst 40 procent av frågornas sammanlagda vikt peka åt vardera hållet. Det är en redaktionell kontroll av påståenderiktningar, inte ett bevis på neutralitet eller en vetenskapligt validerad modell. Därför hålls frågor och viktning öppna för granskning och feedback.
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
        <p>Frågor, vikter, poängsättning och källbelagda partisvar går att granska direkt i repo:t.</p>
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
        <p>Misstänkt bias, felaktiga resultat och vinklade formuleringar kan rapporteras direkt.</p>
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
  questions: quizQuestions,
  onIndex,
  onAnswer,
  onBack,
  onResult,
}: {
  index: number
  answers: Answers
  questions: Question[]
  onIndex: (index: number) => void
  onAnswer: (answer: AnswerValue) => void
  onBack: () => void
  onResult: () => void
}) {
  const question = quizQuestions[index]
  const currentAnswer = answers[question.id]
  const complete = quizQuestions.every((item) => item.id in answers)
  const topic = topics.find((item) => item.id === question.topic)!
  const sectionQuestions = quizQuestions.filter((item) => item.kind === question.kind)
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
          <span>{index + 1} av {quizQuestions.length}</span>
        </div>
        <div className="quiz-progress"><span style={{ width: `${((index + 1) / quizQuestions.length) * 100}%` }} /></div>
      </div>
      <div className="question-wrap">
        <div className="question-prompt">
          <div className="question-meta">
            <span>{question.kind === 'sakfraga' ? 'Sakfråga' : 'Värdering'} {sectionIndex}/{sectionLength}</span>
            <span className="topic-pill">{topic.label}</span>
          </div>
          <h1>{question.statement}</h1>
          <p className="question-context"><Info size={16} /> {question.context}</p>
          {question.matchOnlyReason && (
            <details className="question-scoring-note">
              <summary>Påverkar partimatchningen, inte kartpositionen</summary>
              <p>{question.matchOnlyReason}</p>
            </details>
          )}
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
          {index < quizQuestions.length - 1 ? (
            <button className="secondary-button" onClick={() => onIndex(index + 1)}>Nästa <ArrowRight size={17} /></button>
          ) : (
            <button className="primary-button" disabled={!complete} onClick={onResult}>Visa resultat <ArrowRight size={17} /></button>
          )}
        </div>
        {!complete && index === quizQuestions.length - 1 && (
          <p className="completion-note">Du har {quizQuestions.filter((item) => !(item.id in answers)).length} obesvarade frågor. Använd föregående eller välj dem i översikten.</p>
        )}
        <QuestionDots index={index} answers={answers} questions={quizQuestions} onIndex={onIndex} />
      </div>
    </section>
  )
}

function QuestionDots({
  index,
  answers,
  questions: quizQuestions,
  onIndex,
}: {
  index: number
  answers: Answers
  questions: Question[]
  onIndex: (index: number) => void
}) {
  return (
    <div className="question-overview" aria-label="Frågeöversikt">
      {quizQuestions.map((question, questionIndex) => (
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
  questions: quizQuestions,
  quizMode,
  onEdit,
  onMethod,
  onFeedback,
  onReset,
}: {
  coordinate: Coordinate
  answers: Answers
  priorities: TopicId[]
  questions: Question[]
  quizMode: QuizMode
  onEdit: () => void
  onMethod: () => void
  onFeedback: () => void
  onReset: () => void
}) {
  const [exporting, setExporting] = useState<'pdf' | 'png' | null>(null)
  const [exportError, setExportError] = useState<string | null>(null)
  const partyResults = parties
    .map((party) => {
      const partyCoordinate = calculatePartyCoordinate(party, quizQuestions, priorities)
      return {
        party,
        coordinate: partyCoordinate,
        match: calculatePartyMatch(answers, party, quizQuestions, priorities),
        coverage: getPartyCoverage(party, quizQuestions),
      }
    })
    .sort((left, right) => {
      if (left.coverage.sufficient !== right.coverage.sufficient) {
        return Number(right.coverage.sufficient) - Number(left.coverage.sufficient)
      }
      if (left.coverage.sufficient && right.coverage.sufficient) {
        return right.match.percent - left.match.percent
      }
      return right.coverage.known - left.coverage.known
    })
  const allUnscored = partyResults.every(({ coverage }) => !coverage.sufficient)
  const answeredAxes = getAnsweredAxes(answers, quizQuestions)

  async function handleExport(format: 'pdf' | 'png') {
    setExporting(format)
    setExportError(null)
    try {
      const exportInput = {
        answers,
        coordinate,
        parties: partyResults,
        priorities,
        questions: quizQuestions,
        quizMode,
      }
      if (format === 'pdf') await exportResultAsPdf(exportInput)
      else await exportResultAsPng(exportInput)
    } catch (error) {
      console.error('Kunde inte exportera resultatet', error)
      setExportError('Exporten misslyckades. Försök igen eller använd en annan webbläsare.')
    } finally {
      setExporting(null)
    }
  }

  return (
    <section className="result-page page-width">
      <div className="result-heading">
        <div>
          <p className="eyebrow"><span /> Ditt resultat · {quizMode === 'quick' ? 'Snabbtest' : 'Fullständigt test'}</p>
          <h1>Din politiska position</h1>
          <p>Det här är en riktning, inte en etikett. Närliggande positioner kan bygga på ganska olika svar.</p>
        </div>
        <div className="coordinate-readout">
          <div><span>Ekonomi</span><strong>{answeredAxes.x ? formatAxis(coordinate.x, 'Vänster', 'Höger') : '—'}</strong><small>{answeredAxes.x ? `${Math.abs(Math.round(coordinate.x))} / ${CHART_AXIS_LIMIT}` : 'Inga svar på axeln'}</small></div>
          <div><span>Värderingar</span><strong>{answeredAxes.y ? formatAxis(coordinate.y, 'TAN', 'GAL') : '—'}</strong><small>{answeredAxes.y ? `${Math.abs(Math.round(coordinate.y))} / ${CHART_AXIS_LIMIT}` : 'Inga svar på axeln'}</small></div>
          <div><span>Inräknade svar</span><strong>{coordinate.answered}</strong><small>av {quizQuestions.length}</small></div>
        </div>
      </div>
      <div className="result-layout">
        <PoliticalChart user={coordinate} showUser={answeredAxes.x && answeredAxes.y} partyResults={partyResults} />
        <aside className="party-panel">
          <div className="panel-title">
            <div><span className="overline">Partijämförelse</span><h2>Svenska partier</h2></div>
            <span className={`status-badge ${allUnscored ? 'pending' : ''}`}>{allUnscored ? 'Saknar underlag' : 'Källbelagd'}</span>
          </div>
          {!allUnscored && (
            <div className="data-notice">
              <Info size={18} />
              <p><strong>Matchningen bygger på belagda svar.</strong> Ett parti behöver minst {requiredPartyResponses(quizQuestions)} av {quizQuestions.length} svar. Procenten jämför bara frågor där både du och partiet har ett svar. Kartan kräver dessutom belägg för minst 60 % av frågevikten på vardera axeln.</p>
            </div>
          )}
          {allUnscored && (
            <div className="data-notice">
              <Info size={18} />
              <p><strong>Inget parti når gränsen för tillräckligt källunderlag.</strong> Då visas ingen partimarkör eller matchningsprocent.</p>
            </div>
          )}
          {!allUnscored && (
            <div className="match-legend" aria-label="Teckenförklaring för matchningsstaplar">
              <span className="legend-segment exact" /> Exakt
              <span className="legend-segment near" /> Samma riktning
              <small>Hovra eller tryck på en stapel</small>
            </div>
          )}
          <div className="party-list">
            {partyResults.map(({ party, match, coverage }) => (
              <PartyRow key={party.id} party={party} match={match} coverage={coverage} questions={quizQuestions} />
            ))}
          </div>
        </aside>
      </div>
      <section className="export-panel" aria-labelledby="export-heading">
        <div className="export-intro">
          <span className="export-icon"><Download size={22} /></span>
          <div>
            <span className="overline">Spara och dela</span>
            <h2 id="export-heading">Exportera ditt resultat</h2>
            <p>Filerna skapas lokalt i din webbläsare. Dina svar skickas inte till servern.</p>
          </div>
        </div>
        <div className="export-options">
          <button
            className="export-option"
            type="button"
            onClick={() => handleExport('pdf')}
            disabled={exporting !== null}
          >
            <span className="export-option-icon"><FileDown size={20} /></span>
            <span>
              <strong>Fullständig PDF</strong>
              <small>Kompass, partimatchning och alla dina svar jämförda med de partier som visas.</small>
            </span>
            {exporting === 'pdf' ? <LoaderCircle className="export-spinner" size={19} /> : <Download size={18} />}
          </button>
          <button
            className="export-option"
            type="button"
            onClick={() => handleExport('png')}
            disabled={exporting !== null}
          >
            <span className="export-option-icon"><FileImage size={20} /></span>
            <span>
              <strong>Kompakt PNG</strong>
              <small>Endast GAL-TAN-kompassen och partimatchningen sida vid sida.</small>
            </span>
            {exporting === 'png' ? <LoaderCircle className="export-spinner" size={19} /> : <Download size={18} />}
          </button>
        </div>
        <p className={`export-status ${exportError ? 'error' : ''}`} aria-live="polite">
          {exportError ?? (exporting ? `${exporting === 'pdf' ? 'PDF' : 'PNG'}-filen skapas…` : '')}
        </p>
      </section>
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
      <AnswerComparison answers={answers} parties={parties} questions={quizQuestions} />
    </section>
  )
}

function PartyRow({
  party,
  match,
  coverage,
  questions: quizQuestions,
}: {
  party: Party
  match: PartyMatch
  coverage: PartyCoverage
  questions: Question[]
}) {
  const sourced = countKnownPartyResponses(party, quizQuestions)
  const hasComparison = coverage.sufficient && match.knownPartyAnswers > 0
  const hasInsufficientCoverage = !coverage.sufficient
  return (
    <div className="party-row">
      <span className="party-logo" style={{ background: party.color, color: markerTextColor(party) }}>{party.shortName}</span>
      <div className="party-details"><strong>{party.name}</strong><small>{sourced} belagda · {quizQuestions.length - sourced} ej belagda</small>{coverage.sufficient && !coverage.chartSufficient && <small>För glest underlag på en kartaxel</small>}</div>
      <div className="match-value">
        <strong>{hasComparison ? `${match.percent}%` : '—'}</strong>
        <small>{hasComparison ? `${match.knownPartyAnswers} jämförda svar` : hasInsufficientCoverage ? 'otillräckligt underlag' : 'inga jämförbara svar'}</small>
      </div>
      <div className="match-bar-wrap">
        {hasComparison ? (
          <button
            type="button"
            className="match-bar"
            aria-label={`${party.name}: ${match.percent} procent matchning på ${match.knownPartyAnswers} jämförda svar, varav ${match.exactPercent} procent exakt och ${match.nearPercent} procent i samma riktning.`}
          >
            <span className="match-fill exact" style={{ width: `${match.exactPercent}%`, backgroundColor: party.color }} />
            <span className="match-fill near" style={{ width: `${match.nearPercent}%`, backgroundColor: party.color }} />
            <span className="match-tooltip" role="tooltip">
              <strong>Exakt: {match.exactPercent}%</strong>
              <span>Samma riktning: +{match.nearPercent}%</span>
              <span>Jämförda svar: {match.knownPartyAnswers} av dina {match.comparedQuestions}</span>
            </span>
          </button>
        ) : hasInsufficientCoverage ? (
          <div className="coverage-bar" aria-label={`${party.name}: ${coverage.known} källbelagda svar av ${coverage.required} som krävs.`}>
            <span style={{ width: `${Math.min(100, (coverage.known / coverage.required) * 100)}%` }} />
            <small>{coverage.known} av {coverage.required} krävs</small>
          </div>
        ) : (
          <div className="match-bar match-bar-static" aria-label={`${party.name}: ingen matchning eftersom inga frågor har besvarats.`} />
        )}
      </div>
    </div>
  )
}

function PoliticalChart({
  user,
  showUser,
  partyResults,
}: {
  user: Coordinate
  showUser: boolean
  partyResults: { party: Party; coordinate: Coordinate; match: PartyMatch; coverage: PartyCoverage }[]
}) {
  const clampToChart = (value: number) => Math.max(-CHART_AXIS_LIMIT, Math.min(CHART_AXIS_LIMIT, value))
  const toX = (x: number) => 8 + ((clampToChart(x) + CHART_AXIS_LIMIT) / (CHART_AXIS_LIMIT * 2)) * 84
  const toY = (y: number) => 8 + ((CHART_AXIS_LIMIT - clampToChart(y)) / (CHART_AXIS_LIMIT * 2)) * 84
  const scored = partyResults.filter(({ coverage }) => coverage.chartSufficient)

  return (
    <div className="chart-card">
      <div className="chart-label top">GAL <small>grön · alternativ · frihetlig</small></div>
      <div className="chart-label bottom">TAN <small>traditionell · auktoritär · nationalistisk</small></div>
      <div className="chart-label left">VÄNSTER <small>ekonomisk</small></div>
      <div className="chart-label right">HÖGER <small>ekonomisk</small></div>
      <svg viewBox="0 0 100 100" role="img" aria-label={showUser ? `Din position: ${Math.round(user.x)} på vänster–höger och ${Math.round(user.y)} på GAL–TAN` : 'Partikarta. Din position saknas eftersom du inte besvarat frågor på båda axlarna.'}>
        <defs>
          <pattern id="smallGrid" width="8.4" height="8.4" patternUnits="userSpaceOnUse">
            <path d="M 8.4 0 L 0 0 0 8.4" fill="none" stroke="#d9d7cc" strokeWidth="0.22" />
          </pattern>
        </defs>
        <rect x="8" y="8" width="84" height="84" rx="1" fill="#fbfaf5" />
        <rect x="8" y="8" width="84" height="84" rx="1" fill="url(#smallGrid)" />
        <line x1="50" y1="8" x2="50" y2="92" stroke="#8f9189" strokeWidth="0.45" />
        <line x1="8" y1="50" x2="92" y2="50" stroke="#8f9189" strokeWidth="0.45" />
        {scored.map(({ party, coordinate, coverage }) => (
          <g key={party.id} transform={`translate(${toX(coordinate.x)} ${toY(coordinate.y)})`}>
            <title>{party.name}: {Math.round(coordinate.x)}, {Math.round(coordinate.y)}. Källunderlag ekonomi {Math.round(coverage.xCoverage * 100)} %, GAL–TAN {Math.round(coverage.yCoverage * 100)} % av frågevikterna.</title>
            <circle r="3.1" fill={party.color} stroke="#fff" strokeWidth="0.8" />
            <text y="1.25" textAnchor="middle" fontSize="3.4" fontWeight="800" fill={markerTextColor(party)}>{party.shortName}</text>
          </g>
        ))}
        {showUser && <g transform={`translate(${toX(user.x)} ${toY(user.y)})`}>
          <circle r="6.2" fill="#ed714f" opacity="0.16" />
          <circle r="3.65" fill="#ed714f" stroke="#fff" strokeWidth="0.8" />
          <text y="1.05" textAnchor="middle" fontSize="2.8" fontWeight="800" fill="#fff">DU</text>
        </g>}
      </svg>
      <div className="chart-legend">{showUser && <><span className="legend-you" /> Din position </>}<span className="legend-parties" /> Partiernas beräknade positioner</div>
      {!showUser && <p className="chart-empty-note">Besvara minst en fråga på vardera axeln för att se din kartposition.</p>}
    </div>
  )
}

function AnswerComparison({
  answers,
  parties: visibleParties,
  questions: quizQuestions,
}: {
  answers: Answers
  parties: Party[]
  questions: Question[]
}) {
  const [query, setQuery] = useState('')
  const [topicFilter, setTopicFilter] = useState('all')
  const [showGaps, setShowGaps] = useState(false)
  const filteredQuestions = quizQuestions.filter((question) => {
    const topic = topics.find((item) => item.id === question.topic)
    return (topicFilter === 'all' || question.topic === topicFilter)
      && `${question.statement} ${question.id} ${topic?.label}`.toLocaleLowerCase('sv').includes(query.trim().toLocaleLowerCase('sv'))
      && (!showGaps || visibleParties.some((party) => party.responses.find((response) => response.questionId === question.id)?.value == null))
  })
  const [sourcePopover, setSourcePopover] = useState<{
    id: string
    partyName: string
    response: PartyResponse
    top: number
    left: number
  } | null>(null)
  const [closeTimer, setCloseTimer] = useState<number | null>(null)

  const cancelClose = () => {
    if (closeTimer != null) {
      window.clearTimeout(closeTimer)
      setCloseTimer(null)
    }
  }

  const closeSource = () => {
    cancelClose()
    setCloseTimer(window.setTimeout(() => {
      setSourcePopover(null)
      setCloseTimer(null)
    }, 140))
  }

  const openSource = (
    id: string,
    partyName: string,
    response: PartyResponse,
    target: HTMLElement,
  ) => {
    cancelClose()
    const rect = target.getBoundingClientRect()
    const popoverWidth = Math.min(280, window.innerWidth - 24)
    const estimatedHeight = Math.min(420, 140 + (response.rationale ? 100 : 0) + response.evidence.reduce((height, item) => height + 72 + (item.quote ? 84 : 0), 0))
    const left = Math.min(
      Math.max(12, rect.left + rect.width / 2 - popoverWidth / 2),
      window.innerWidth - popoverWidth - 12,
    )
    const top = rect.bottom + estimatedHeight + 12 > window.innerHeight && rect.top > estimatedHeight
      ? rect.top - estimatedHeight - 8
      : rect.bottom + 8

    setSourcePopover({ id, partyName, response, top, left })
  }

  useEffect(() => () => {
    if (closeTimer != null) window.clearTimeout(closeTimer)
  }, [closeTimer])

  useEffect(() => {
    if (!sourcePopover) return

    const closeOnOutsideInteraction = (event: PointerEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent) {
        if (event.key === 'Escape') setSourcePopover(null)
        return
      }

      if (!(event.target instanceof Element) || !event.target.closest('.source-token, .source-popover')) {
        setSourcePopover(null)
      }
    }

    document.addEventListener('pointerdown', closeOnOutsideInteraction)
    document.addEventListener('keydown', closeOnOutsideInteraction)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideInteraction)
      document.removeEventListener('keydown', closeOnOutsideInteraction)
    }
  }, [sourcePopover])

  return (
    <section className="answer-comparison">
      <div className="answer-comparison-heading">
        <div>
          <span className="overline">Svar fråga för fråga</span>
          <h2>Din matchning mot partierna</h2>
          <p className="answer-source-hint"><Info size={14} /> Hovra över eller tryck på en partiikon för att se källorna.</p>
        </div>
        <div className="answer-comparison-explanation">
          <p>Svaren sammanfattar partiernas belagda ståndpunkter. De är inte en fullständig granskning av partiernas omröstningar eller genomförda politik. Öppna en partimarkör för att se källan till just det svaret.</p>
          <p><strong>Ej belagt</strong> betyder att underlaget inte räcker för en bedömning av partiets ståndpunkt. Det är skilt från ditt ”Vet ej”. Svar i samma riktning, exempelvis 4 och 5, räknas som match. Olika partiers procentsiffror kan bygga på olika frågor.</p>
        </div>
      </div>
      <div className="comparison-filters">
        <label>Sök fråga<input type="search" value={query} onChange={(event) => { setQuery(event.target.value); setSourcePopover(null) }} placeholder="Ämne, påstående eller fråge-id" /></label>
        <label>Ämne<select value={topicFilter} onChange={(event) => { setTopicFilter(event.target.value); setSourcePopover(null) }}><option value="all">Alla ämnen</option>{topics.map((topic) => <option key={topic.id} value={topic.id}>{topic.label}</option>)}</select></label>
        <label className="gap-filter"><input type="checkbox" checked={showGaps} onChange={(event) => { setShowGaps(event.target.checked); setSourcePopover(null) }} /> Visa frågor med källluckor</label>
        <span role="status">{filteredQuestions.length} av {quizQuestions.length} frågor</span>
      </div>
      <div
        className="answer-table"
        role="table"
        aria-label="Svar per fråga och parti"
        onScrollCapture={() => setSourcePopover(null)}
      >
        {filteredQuestions.map((question) => {
          const index = quizQuestions.findIndex((item) => item.id === question.id)
          const userAnswered = question.id in answers
          const userAnswer = answers[question.id]
          const topic = topics.find((item) => item.id === question.topic)

          return (
            <article className="comparison-row" key={question.id} role="row">
              <div className="answer-question">
                <span>{index + 1}. {question.kind === 'sakfraga' ? 'Sakfråga' : 'Värdering'} · {topic?.label}</span>
                <h3>{question.statement}</h3>
                <p>Du: {userAnswered ? answerLabel(userAnswer) : 'Ej besvarad'}</p>
                {question.matchOnlyReason && <small className="match-only-label">Räknas i partimatchningen, inte på kartan</small>}
              </div>
              <div className="answer-options">
                {answerOptions.map((option) => {
                  const userMatchesOption = userAnswered && userAnswer === option.value
                  const partyMarkers = visibleParties
                    .map((party) => ({
                      party,
                      response: party.responses.find((response) => response.questionId === question.id)!,
                    }))
                    .filter(({ response }) => response.value === option.value)
                    .map(({ party, response }) => ({
                      id: party.id,
                      shortName: party.shortName,
                      name: party.name,
                      color: party.color,
                      textColor: markerTextColor(party),
                      response,
                    }))

                  return (
                    <div className="answer-option" key={option.short} role="cell">
                      <span className="answer-option-label" title={option.value == null ? 'Du: Vet ej. Partier: ej belagt.' : option.label}>{option.short === '?' ? <>Vet ej<small>Parti: ej belagt</small></> : option.short}</span>
                      <div className="answer-marker-groups">
                        <div className="answer-user-slot">
                          {userMatchesOption
                            ? <span className="answer-token you-token" title="Du">DU</span>
                            : <span className="answer-token-placeholder" aria-hidden="true" />}
                        </div>
                        <span className="answer-marker-divider" aria-hidden="true" />
                        <div className="answer-party-stack">
                          {partyMarkers.length > 0 ? partyMarkers.map((marker) => {
                            const popoverId = `source-${question.id}-${marker.id}`
                            const isOpen = sourcePopover?.id === popoverId

                            return (
                              <button
                                type="button"
                                className="answer-token source-token"
                                key={marker.id}
                                style={{ background: marker.color, color: marker.textColor }}
                                aria-label={marker.response.evidence.length
                                  ? `Visa källa för ${swedishGenitive(marker.name)} svar`
                                  : `Visa källstatus för ${swedishGenitive(marker.name)} svar`}
                                aria-expanded={isOpen}
                                aria-controls={popoverId}
                                onMouseEnter={(event) => openSource(popoverId, marker.name, marker.response, event.currentTarget)}
                                onMouseLeave={closeSource}
                                onFocus={(event) => openSource(popoverId, marker.name, marker.response, event.currentTarget)}
                                onBlur={closeSource}
                                onClick={(event) => openSource(popoverId, marker.name, marker.response, event.currentTarget)}
                              >
                                {marker.shortName}
                              </button>
                            )
                          }) : <span className="answer-token-placeholder" aria-hidden="true" />}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </article>
          )
        })}
      </div>
      {filteredQuestions.length === 0 && <p className="empty-filter">Inga frågor passar filtret. Prova ett annat sökord eller ämne.</p>}
      {sourcePopover && typeof document !== 'undefined' && createPortal(
        <aside
          className="source-popover"
          id={sourcePopover.id}
          role="dialog"
          aria-label={`Källor för ${sourcePopover.partyName}`}
          style={{ top: sourcePopover.top, left: sourcePopover.left, maxHeight: `min(420px, calc(100dvh - ${sourcePopover.top + 12}px))` }}
          onMouseEnter={cancelClose}
          onMouseLeave={closeSource}
        >
          <strong>{sourcePopover.partyName}</strong>
          <span>{sourcePopover.response.value == null ? 'Ej belagt' : `${answerLabel(sourcePopover.response.value)} · ${confidenceLabel(sourcePopover.response.confidence)}`}</span>
          {sourcePopover.response.rationale && <p className="source-rationale"><b>Bedömning: </b>{sourcePopover.response.rationale}</p>}
          {sourcePopover.response.evidence.length > 0 ? (
            <>
              <span>Källunderlag till bedömningen</span>
              <ul>
                {sourcePopover.response.evidence.map((item) => (
                  <li key={item.url}>
                    <a href={item.url} target="_blank" rel="noreferrer">
                      {item.title} <ExternalLink size={12} aria-hidden="true" />
                    </a>
                    {item.quote && <blockquote>”{item.quote}”</blockquote>}
                    <small>Kontrollerad {item.accessedAt}</small>
                  </li>
                ))}
              </ul>
            </>
          ) : <p>Inget tydligt källbelägg har hittats för den här frågan.</p>}
        </aside>,
        document.body,
      )}
    </section>
  )
}

function answerLabel(value: AnswerValue | undefined): string {
  if (value == null) return 'Vet ej'
  return `${value} - ${answerOptions.find((option) => option.value === value)?.label ?? ''}`
}

function confidenceLabel(value: PartyResponse['confidence']): string {
  return { high: 'hög säkerhet', medium: 'medelhög säkerhet', low: 'låg säkerhet', unknown: 'ej belagt' }[value]
}

function MethodDialog({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="method-title">
        <button className="modal-close" onClick={onClose} aria-label="Stäng"><X size={20} /></button>
        <p className="eyebrow"><span /> Öppen metod</p>
        <h2 id="method-title">Så räknas kompassen</h2>
        <div className="method-list">
          <div><strong>1</strong><p><b>Kartan är en förenkling.</b> Ekonomisk fördelning och marknadens roll påverkar vänster–höger. Frihet, tradition, auktoritet och miljövärderingar påverkar GAL–TAN. Sakfrågor utan en tydlig riktning på dessa axlar påverkar bara partimatchningen. Det framgår vid frågan.</p></div>
          <div><strong>2</strong><p><b>Svarsskalan omvandlas symmetriskt.</b> 1–5 blir −1, −0,5, 0, +0,5 och +1. Omvända formuleringar minskar risken för ja-sägareffekt.</p></div>
          <div><strong>3</strong><p><b>Dina “Vet ej” lämnas utanför.</b> Det drar dig inte mot mitten. Valda prioriteringar får vikten 1,75; övriga vikten 1.</p></div>
          <div><strong>4</strong><p><b>Dina koordinater skalas till {CHART_AXIS_LABEL} efter sammanvägningen.</b> Det är inte en enkel summa av frågorna: svaren räknas först som ett viktat genomsnitt per axel och multipliceras sedan med samma skala.</p></div>
          <div><strong>5</strong><p><b>Du och partierna räknas med samma metod.</b> Bara källbelagda partisvar ingår i genomsnittet, med samma ämnesprioriteringar som dina. Saknade belägg räknas inte som mittenåsikter. Positionerna är redaktionella beräkningar, inte en vetenskapligt validerad mätning av partiernas ideologi.</p></div>
          <div><strong>6</strong><p><b>Partimatchningen räknas fråga för fråga.</b> Exakt samma svar ger exakt träff. Svar i samma riktning men med olika styrka, till exempel 4 mot 5 eller 1 mot 2, ger träff i samma riktning. Totalprocenten är exakt plus samma riktning, med extra vikt för dina prioriterade ämnen. Frågor där partiet saknar ett källbelagt svar lämnas utanför procenten.</p></div>
          <div><strong>7</strong><p><b>Underlagsgränserna är lika för alla partier.</b> Matchning kräver belägg för minst 80 % av snabbtestet ({requiredPartyResponses(quickQuestions)} svar) eller 60 % av hela testet ({requiredPartyResponses(questions)} svar), avrundat uppåt. Kartan kräver också minst 60 % av frågevikten på varje axel. Det är redaktionella gränser, inte statistiska säkerhetsnivåer. Olika partier kan jämföras på olika frågor; antalet jämförda svar visas vid matchningen.</p></div>
          <div><strong>8</strong><p><b>Snabbtestet använder {quickQuestions.length} fasta frågor.</b> Urvalet tar hänsyn till tydlighet, källunderlag, ämnesbredd och påståenden i båda riktningarna. Minst 40 procent av den sammanlagda axelvikten ska peka åt vardera hållet, utan ämnesprioritering. Detta kontrollerar svarsriktningar men bevisar inte politisk neutralitet.</p></div>
        </div>
        <div className="coding-rules">
          <h3>Så beläggs partiernas svar</h3>
          <ul>
            {partyCodingRules.map((rule) => <li key={rule}>{rule}</li>)}
          </ul>
        </div>
        <div className="method-links">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer"><GitBranch size={16} /> Källkod</a>
          <a href={OPEN_PROMPTS_URL} target="_blank" rel="noreferrer"><FileText size={16} /> Open prompts</a>
          <a href={REVIEW_URL} target="_blank" rel="noreferrer"><FileText size={16} /> Granskning 26 september 2026</a>
        </div>
        <div className="method-caveat"><Info size={19} /><p>Ingen modell är helt värderingsfri: val av frågor och axlar påverkar resultatet. Därför ligger frågetexter, vikter och partibelägg öppet i projektets datafiler.</p></div>
        <button className="primary-button" onClick={onClose}>Jag förstår</button>
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
