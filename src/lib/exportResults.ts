import { answerSimilarity } from './scoring'
import type { PartyMatch } from './scoring'
import type { Answers, AnswerValue, Coordinate, Party, Question, TopicId } from '../types'

export const PDF_EXPORT_FILENAME = 'partikartan-resultat-fullstandigt.pdf'
export const PNG_EXPORT_FILENAME = 'partikartan-resultat-kompakt.png'

const SUMMARY_WIDTH = 1800
const SUMMARY_HEIGHT = 1013
const PDF_CANVAS_WIDTH = 1800
const PDF_CANVAS_HEIGHT = 1273
const QUESTIONS_PER_PDF_PAGE = 5
const AXIS_LIMIT = 100

const colors = {
  ink: '#17251e',
  muted: '#68746b',
  green: '#1f5742',
  greenDark: '#143d2e',
  paper: '#f4f6f1',
  white: '#fffef9',
  line: '#d2dbd5',
  coral: '#ed714f',
  exact: '#dcece2',
  near: '#e9f0df',
  different: '#f3f1e9',
  unknown: '#eee8d8',
}

export interface ExportPartyResult {
  party: Party
  coordinate: Coordinate
  match: PartyMatch
}

export interface ExportResultsInput {
  answers: Answers
  coordinate: Coordinate
  parties: ExportPartyResult[]
  priorities: TopicId[]
  questions: Question[]
  quizMode: 'quick' | 'full'
}

export type AnswerComparisonKind = 'exact' | 'near' | 'different' | 'unknown' | 'unanswered'

export function getAnswerComparisonKind(
  userAnswered: boolean,
  userAnswer: AnswerValue | undefined,
  partyAnswer: AnswerValue | undefined,
): AnswerComparisonKind {
  if (!userAnswered) return 'unanswered'
  if (userAnswer == null || partyAnswer == null) return 'unknown'
  if (userAnswer === partyAnswer) return 'exact'
  return answerSimilarity(userAnswer, partyAnswer) === 1 ? 'near' : 'different'
}

export async function exportResultAsPdf(input: ExportResultsInput): Promise<void> {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4', compress: true })

  doc.setProperties({
    title: 'Partikartan - fullstandigt resultat',
    subject: 'GAL-TAN-kompass, partimatchning och svar frage for frage',
    creator: 'Partikartan',
  })

  const summary = renderSummaryCanvas(input)
  doc.addImage(summary.toDataURL('image/jpeg', 0.94), 'JPEG', 0, 0, 297, 210, undefined, 'FAST')

  const questionGroups = chunk(input.questions, QUESTIONS_PER_PDF_PAGE)
  questionGroups.forEach((pageQuestions, pageIndex) => {
    doc.addPage('a4', 'landscape')
    const canvas = renderAnswerPageCanvas(input, pageQuestions, pageIndex, questionGroups.length)
    doc.addImage(canvas.toDataURL('image/jpeg', 0.94), 'JPEG', 0, 0, 297, 210, undefined, 'FAST')
  })

  downloadBlob(doc.output('blob'), PDF_EXPORT_FILENAME)
}

export async function exportResultAsPng(input: ExportResultsInput): Promise<void> {
  const canvas = renderSummaryCanvas(input)
  const blob = await canvasToBlob(canvas, 'image/png')
  downloadBlob(blob, PNG_EXPORT_FILENAME)
}

function renderSummaryCanvas(input: ExportResultsInput): HTMLCanvasElement {
  const canvas = createCanvas(SUMMARY_WIDTH, SUMMARY_HEIGHT)
  const context = getContext(canvas)

  context.fillStyle = colors.paper
  context.fillRect(0, 0, canvas.width, canvas.height)
  drawSummaryHeader(context, input)

  const cardY = 156
  const cardHeight = 790
  const chartCard = { x: 58, y: cardY, width: 1015, height: cardHeight }
  const matchCard = { x: 1103, y: cardY, width: 639, height: cardHeight }
  drawCard(context, chartCard.x, chartCard.y, chartCard.width, chartCard.height, 12)
  drawCard(context, matchCard.x, matchCard.y, matchCard.width, matchCard.height, 12)
  drawCompass(context, input, chartCard)
  drawPartyMatches(context, input, matchCard)

  return canvas
}

function drawSummaryHeader(context: CanvasRenderingContext2D, input: ExportResultsInput) {
  context.fillStyle = colors.green
  context.beginPath()
  context.arc(83, 75, 29, 0, Math.PI * 2)
  context.fill()
  context.strokeStyle = colors.white
  context.lineWidth = 3
  context.beginPath()
  context.arc(83, 75, 13, 0, Math.PI * 2)
  context.moveTo(83, 52)
  context.lineTo(83, 98)
  context.moveTo(60, 75)
  context.lineTo(106, 75)
  context.stroke()

  setCanvasFont(context, 700, 29)
  context.fillStyle = colors.ink
  context.fillText('Partikartan', 130, 85)
  setCanvasFont(context, 500, 20)
  context.fillStyle = colors.muted
  context.fillText(
    `${input.quizMode === 'quick' ? 'Snabbtest' : 'Fullständigt test'} - ${formatExportDate(new Date())}`,
    130,
    116,
  )

  context.textAlign = 'right'
  setCanvasFont(context, 700, 42)
  context.fillStyle = colors.ink
  context.fillText('Ditt politiska resultat', 1742, 82)
  setCanvasFont(context, 500, 19)
  context.fillStyle = colors.muted
  context.fillText('GAL-TAN-kompass och partimatchning', 1742, 115)
  context.textAlign = 'left'
}

function drawCompass(
  context: CanvasRenderingContext2D,
  input: ExportResultsInput,
  card: { x: number; y: number; width: number; height: number },
) {
  setCanvasFont(context, 800, 17)
  context.fillStyle = colors.green
  context.fillText('GAL-TAN-KOMPASS', card.x + 34, card.y + 48)
  setCanvasFont(context, 500, 25)
  context.fillStyle = colors.ink
  context.fillText('Din position och partiernas positioner', card.x + 34, card.y + 87)

  const size = 625
  const x = card.x + 195
  const y = card.y + 119
  const inner = { x: x + 51, y: y + 47, size: size - 98 }

  context.fillStyle = '#fbfaf5'
  context.fillRect(inner.x, inner.y, inner.size, inner.size)
  context.strokeStyle = '#d9d7cc'
  context.lineWidth = 1.4
  const gridSteps = 10
  for (let index = 0; index <= gridSteps; index += 1) {
    const offset = inner.x + (inner.size / gridSteps) * index
    const vertical = inner.y + (inner.size / gridSteps) * index
    context.beginPath()
    context.moveTo(offset, inner.y)
    context.lineTo(offset, inner.y + inner.size)
    context.stroke()
    context.beginPath()
    context.moveTo(inner.x, vertical)
    context.lineTo(inner.x + inner.size, vertical)
    context.stroke()
  }
  context.strokeStyle = '#8f9189'
  context.lineWidth = 2.5
  context.beginPath()
  context.moveTo(inner.x + inner.size / 2, inner.y)
  context.lineTo(inner.x + inner.size / 2, inner.y + inner.size)
  context.moveTo(inner.x, inner.y + inner.size / 2)
  context.lineTo(inner.x + inner.size, inner.y + inner.size / 2)
  context.stroke()

  setCanvasFont(context, 800, 18)
  context.fillStyle = colors.green
  context.textAlign = 'center'
  context.fillText('GAL', inner.x + inner.size / 2, inner.y - 17)
  context.fillText('TAN', inner.x + inner.size / 2, inner.y + inner.size + 32)
  context.textAlign = 'right'
  context.fillText('VÄNSTER', inner.x - 17, inner.y + inner.size / 2 + 6)
  context.textAlign = 'left'
  context.fillText('HÖGER', inner.x + inner.size + 17, inner.y + inner.size / 2 + 6)

  const toPoint = (coordinate: Coordinate) => ({
    x: inner.x + ((clampAxis(coordinate.x) + AXIS_LIMIT) / (AXIS_LIMIT * 2)) * inner.size,
    y: inner.y + ((AXIS_LIMIT - clampAxis(coordinate.y)) / (AXIS_LIMIT * 2)) * inner.size,
  })

  input.parties.forEach(({ party, coordinate }) => {
    const point = toPoint(coordinate)
    context.fillStyle = party.color
    context.strokeStyle = colors.white
    context.lineWidth = 5
    context.beginPath()
    context.arc(point.x, point.y, 22, 0, Math.PI * 2)
    context.fill()
    context.stroke()
    setCanvasFont(context, 800, 17)
    context.fillStyle = markerTextColor(party)
    context.textAlign = 'center'
    context.fillText(party.shortName, point.x, point.y + 6)
  })

  const userPoint = toPoint(input.coordinate)
  context.fillStyle = 'rgba(237, 113, 79, 0.18)'
  context.beginPath()
  context.arc(userPoint.x, userPoint.y, 42, 0, Math.PI * 2)
  context.fill()
  context.fillStyle = colors.coral
  context.strokeStyle = colors.white
  context.lineWidth = 6
  context.beginPath()
  context.arc(userPoint.x, userPoint.y, 27, 0, Math.PI * 2)
  context.fill()
  context.stroke()
  setCanvasFont(context, 800, 16)
  context.fillStyle = colors.white
  context.textAlign = 'center'
  context.fillText('DU', userPoint.x, userPoint.y + 6)

  context.textAlign = 'left'
  const readoutY = card.y + card.height - 52
  drawLegendDot(context, card.x + 38, readoutY, colors.coral, 'Din position')
  drawLegendDot(context, card.x + 204, readoutY, colors.white, 'Partier', '#68746b')
  setCanvasFont(context, 600, 17)
  context.fillStyle = colors.muted
  context.textAlign = 'right'
  context.fillText(
    `${formatAxisValue(input.coordinate.x, 'Vänster', 'Höger')}  ·  ${formatAxisValue(input.coordinate.y, 'TAN', 'GAL')}`,
    card.x + card.width - 34,
    readoutY + 6,
  )
  context.textAlign = 'left'
}

function drawPartyMatches(
  context: CanvasRenderingContext2D,
  input: ExportResultsInput,
  card: { x: number; y: number; width: number; height: number },
) {
  const left = card.x + 34
  const right = card.x + card.width - 34
  setCanvasFont(context, 800, 17)
  context.fillStyle = colors.green
  context.fillText('PARTIMATCHNING', left, card.y + 48)
  setCanvasFont(context, 500, 29)
  context.fillStyle = colors.ink
  context.fillText('Svenska partier', left, card.y + 88)
  setCanvasFont(context, 500, 15)
  context.fillStyle = colors.muted
  context.fillText('Exakt svar', left, card.y + 121)
  context.fillStyle = colors.green
  context.fillRect(left + 84, card.y + 109, 30, 10)
  context.fillStyle = colors.muted
  context.fillText('Nästan samma riktning', left + 135, card.y + 121)
  context.globalAlpha = 0.38
  context.fillStyle = colors.green
  context.fillRect(left + 311, card.y + 109, 30, 10)
  context.globalAlpha = 1

  const rowTop = card.y + 145
  const rowHeight = 74
  input.parties.forEach(({ party, match }, index) => {
    const y = rowTop + index * rowHeight
    if (index > 0) {
      context.strokeStyle = '#e2dfd5'
      context.lineWidth = 1
      context.beginPath()
      context.moveTo(left, y)
      context.lineTo(right, y)
      context.stroke()
    }

    context.fillStyle = party.color
    context.beginPath()
    context.arc(left + 21, y + 32, 20, 0, Math.PI * 2)
    context.fill()
    setCanvasFont(context, 800, 15)
    context.fillStyle = markerTextColor(party)
    context.textAlign = 'center'
    context.fillText(party.shortName, left + 21, y + 37)

    context.textAlign = 'left'
    setCanvasFont(context, 700, 18)
    context.fillStyle = colors.ink
    context.fillText(party.name, left + 55, y + 25)
    setCanvasFont(context, 500, 14)
    context.fillStyle = colors.muted
    context.fillText(`${match.knownPartyAnswers} jämförbara svar`, left + 55, y + 48)

    const value = match.knownPartyAnswers > 0 ? `${match.percent}%` : '-'
    setCanvasFont(context, 800, 21)
    context.fillStyle = colors.ink
    context.textAlign = 'right'
    context.fillText(value, right, y + 26)

    const barX = left + 310
    const barWidth = right - barX
    const barY = y + 40
    context.fillStyle = '#e4e4dc'
    drawRoundedRect(context, barX, barY, barWidth, 12, 6)
    context.fill()
    if (match.knownPartyAnswers > 0) {
      context.fillStyle = party.color
      const exactWidth = (barWidth * match.exactPercent) / 100
      const nearWidth = (barWidth * match.nearPercent) / 100
      if (exactWidth > 0) context.fillRect(barX, barY, exactWidth, 12)
      if (nearWidth > 0) {
        context.globalAlpha = 0.38
        context.fillRect(barX + exactWidth, barY, nearWidth, 12)
        context.globalAlpha = 1
      }
    }
    context.textAlign = 'left'
  })

  setCanvasFont(context, 500, 13)
  context.fillStyle = colors.muted
  context.fillText('Procenten bygger bara på frågor där både du och partiet har svarat.', left, card.y + card.height - 25)
}

function renderAnswerPageCanvas(
  input: ExportResultsInput,
  pageQuestions: Question[],
  pageIndex: number,
  answerPageCount: number,
): HTMLCanvasElement {
  const canvas = createCanvas(PDF_CANVAS_WIDTH, PDF_CANVAS_HEIGHT)
  const context = getContext(canvas)
  context.fillStyle = colors.paper
  context.fillRect(0, 0, canvas.width, canvas.height)

  const margin = 66
  setCanvasFont(context, 800, 20)
  context.fillStyle = colors.green
  context.fillText('PARTIKARTAN', margin, 65)
  setCanvasFont(context, 700, 39)
  context.fillStyle = colors.ink
  context.fillText('Dina svar och partiernas svar', margin, 116)
  setCanvasFont(context, 500, 17)
  context.fillStyle = colors.muted
  context.fillText('Grönt = exakt. Ljusgrönt = nästan, alltså samma riktning men annan styrka. Frågetecken = inget jämförbart svar.', margin, 148)

  const questionWidth = 640
  const valuesX = margin + questionWidth + 28
  const columnWidth = 111
  const columns = ['Du', ...input.parties.map(({ party }) => party.shortName)]
  setCanvasFont(context, 800, 17)
  context.fillStyle = colors.green
  context.fillText('FRÅGA OCH DITT FULLSTÄNDIGA SVAR', margin, 207)
  columns.forEach((label, index) => {
    const x = valuesX + index * columnWidth + columnWidth / 2
    context.textAlign = 'center'
    context.fillText(label.toUpperCase(), x, 207)
  })
  context.textAlign = 'left'

  const rowTop = 232
  const rowHeight = 190
  pageQuestions.forEach((question, localIndex) => {
    const questionIndex = input.questions.findIndex((item) => item.id === question.id)
    const y = rowTop + localIndex * rowHeight
    drawAnswerRow(context, input, question, questionIndex, y, rowHeight, margin, questionWidth, valuesX, columnWidth)
  })

  setCanvasFont(context, 500, 14)
  context.fillStyle = colors.muted
  context.fillText('Partier utan tydligt källbelägg visas som Vet ej. Prioriterade ämnen påverkar procenten men inte partisvaren.', margin, PDF_CANVAS_HEIGHT - 37)
  context.textAlign = 'right'
  context.fillText(`Svarsbilaga ${pageIndex + 1} av ${answerPageCount}  ·  PDF-sida ${pageIndex + 2}`, PDF_CANVAS_WIDTH - margin, PDF_CANVAS_HEIGHT - 37)
  context.textAlign = 'left'

  return canvas
}

function drawAnswerRow(
  context: CanvasRenderingContext2D,
  input: ExportResultsInput,
  question: Question,
  questionIndex: number,
  y: number,
  height: number,
  margin: number,
  questionWidth: number,
  valuesX: number,
  columnWidth: number,
) {
  context.fillStyle = questionIndex % 2 === 0 ? colors.white : '#f8f7f0'
  drawRoundedRect(context, margin, y, PDF_CANVAS_WIDTH - margin * 2, height - 12, 9)
  context.fill()
  context.strokeStyle = colors.line
  context.lineWidth = 1
  context.stroke()

  const topicLabel = topicName(question.topic)
  setCanvasFont(context, 800, 14)
  context.fillStyle = colors.green
  context.fillText(`${questionIndex + 1}. ${question.kind === 'sakfraga' ? 'SAKFRÅGA' : 'VÄRDERING'} · ${topicLabel.toUpperCase()}`, margin + 18, y + 30)
  setCanvasFont(context, 600, 21)
  context.fillStyle = colors.ink
  const statementLines = wrapCanvasText(context, question.statement, questionWidth - 38, 3)
  statementLines.forEach((line, index) => context.fillText(line, margin + 18, y + 64 + index * 27))

  const userAnswered = Object.prototype.hasOwnProperty.call(input.answers, question.id)
  const userAnswer = input.answers[question.id]
  setCanvasFont(context, 600, 16)
  context.fillStyle = userAnswered ? colors.coral : colors.muted
  context.fillText(`Ditt svar: ${userAnswered ? fullAnswerLabel(userAnswer) : 'Ej besvarad'}`, margin + 18, y + height - 34)

  const answerValues: (AnswerValue | undefined)[] = [
    userAnswered ? userAnswer : undefined,
    ...input.parties.map(({ party }) => party.responses.find((response) => response.questionId === question.id)?.value),
  ]

  answerValues.forEach((value, columnIndex) => {
    const cellX = valuesX + columnIndex * columnWidth
    const cellY = y + 20
    const cellHeight = height - 52
    const comparisonKind = columnIndex === 0
      ? userAnswered ? 'exact' : 'unanswered'
      : getAnswerComparisonKind(userAnswered, userAnswer, value)
    const fill = columnIndex === 0
      ? userAnswered ? colors.coral : colors.different
      : comparisonFill(comparisonKind)
    context.fillStyle = fill
    drawRoundedRect(context, cellX + 5, cellY, columnWidth - 10, cellHeight, 8)
    context.fill()

    context.textAlign = 'center'
    setCanvasFont(context, 800, value == null ? 25 : 31)
    context.fillStyle = columnIndex === 0 && userAnswered ? colors.white : colors.ink
    context.fillText(value == null ? '?' : String(value), cellX + columnWidth / 2, cellY + 62)
    setCanvasFont(context, 800, 12)
    context.fillStyle = columnIndex === 0 && userAnswered ? colors.white : colors.muted
    context.fillText(columnIndex === 0 ? userStatus(userAnswered, value) : comparisonStatus(comparisonKind), cellX + columnWidth / 2, cellY + 94)
    context.textAlign = 'left'
  })
}

function drawCard(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  context.fillStyle = 'rgba(255, 254, 249, 0.88)'
  context.strokeStyle = colors.line
  context.lineWidth = 2
  drawRoundedRect(context, x, y, width, height, radius)
  context.fill()
  context.stroke()
}

function drawLegendDot(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  fill: string,
  label: string,
  stroke?: string,
) {
  context.fillStyle = fill
  context.strokeStyle = stroke ?? fill
  context.lineWidth = 2
  context.beginPath()
  context.arc(x, y, 7, 0, Math.PI * 2)
  context.fill()
  if (stroke) context.stroke()
  setCanvasFont(context, 500, 16)
  context.fillStyle = colors.muted
  context.fillText(label, x + 15, y + 6)
}

function drawRoundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const safeRadius = Math.min(radius, width / 2, height / 2)
  context.beginPath()
  context.moveTo(x + safeRadius, y)
  context.lineTo(x + width - safeRadius, y)
  context.quadraticCurveTo(x + width, y, x + width, y + safeRadius)
  context.lineTo(x + width, y + height - safeRadius)
  context.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height)
  context.lineTo(x + safeRadius, y + height)
  context.quadraticCurveTo(x, y + height, x, y + height - safeRadius)
  context.lineTo(x, y + safeRadius)
  context.quadraticCurveTo(x, y, x + safeRadius, y)
  context.closePath()
}

function setCanvasFont(context: CanvasRenderingContext2D, weight: number, size: number) {
  context.font = `${weight} ${size}px Inter, "Segoe UI", Arial, sans-serif`
}

function wrapCanvasText(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines = Number.POSITIVE_INFINITY,
): string[] {
  const words = text.split(/\s+/)
  const lines: string[] = []
  let current = ''

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word
    if (context.measureText(candidate).width <= maxWidth || !current) {
      current = candidate
      continue
    }
    lines.push(current)
    current = word
    if (lines.length === maxLines - 1) break
  }

  if (current && lines.length < maxLines) lines.push(current)
  const consumedWords = lines.join(' ').split(/\s+/).length
  if (consumedWords < words.length && lines.length > 0) {
    let finalLine = `${lines[lines.length - 1]}…`
    while (context.measureText(finalLine).width > maxWidth && finalLine.length > 1) {
      finalLine = `${finalLine.slice(0, -2)}…`
    }
    lines[lines.length - 1] = finalLine
  }
  return lines
}

function comparisonFill(kind: AnswerComparisonKind): string {
  if (kind === 'exact') return colors.exact
  if (kind === 'near') return colors.near
  if (kind === 'unknown') return colors.unknown
  return colors.different
}

function comparisonStatus(kind: AnswerComparisonKind): string {
  if (kind === 'exact') return 'EXAKT'
  if (kind === 'near') return 'NÄRA'
  if (kind === 'unknown') return 'INGET'
  if (kind === 'unanswered') return 'EJ JÄMF.'
  return 'ANNAT'
}

function userStatus(answered: boolean, value: AnswerValue | undefined): string {
  if (!answered) return 'EJ SVAR'
  return value == null ? 'VET EJ' : 'DITT SVAR'
}

function fullAnswerLabel(value: AnswerValue | undefined): string {
  if (value == null) return 'Vet ej'
  const labels: Record<Exclude<AnswerValue, null>, string> = {
    1: 'Håller inte alls med',
    2: 'Håller mestadels inte med',
    3: 'Varken eller',
    4: 'Håller mestadels med',
    5: 'Håller helt med',
  }
  return `${value} - ${labels[value]}`
}

function topicName(topic: TopicId): string {
  const names: Record<TopicId, string> = {
    ekonomi: 'Ekonomi',
    valfard: 'Välfärd',
    arbete: 'Arbete',
    bostad: 'Bostad',
    forsvar: 'Försvar',
    energi: 'Energi',
    klimat: 'Klimat',
    lagordning: 'Lag och ordning',
    migration: 'Migration',
    frihet: 'Frihet',
    demokrati: 'Demokrati',
    euvarld: 'EU och världen',
  }
  return names[topic]
}

function markerTextColor(party: Party): string {
  return party.id === 'sd' || party.id === 'm' ? '#1c2520' : '#ffffff'
}

function formatAxisValue(value: number, negative: string, positive: string): string {
  if (Math.abs(value) < 0.5) return 'Mitten 0'
  return `${value < 0 ? negative : positive} ${Math.abs(Math.round(value))}`
}

function formatExportDate(date: Date): string {
  return new Intl.DateTimeFormat('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' }).format(date)
}

function clampAxis(value: number): number {
  return Math.max(-AXIS_LIMIT, Math.min(AXIS_LIMIT, value))
}

function createCanvas(width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  return canvas
}

function getContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Webbläsaren kunde inte skapa exportgrafiken.')
  return context
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob)
      else reject(new Error('Webbläsaren kunde inte skapa bildfilen.'))
    }, type)
  })
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

function chunk<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let index = 0; index < items.length; index += size) chunks.push(items.slice(index, index + size))
  return chunks
}
