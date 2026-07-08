import type { Party } from '../types'

// Partierna börjar avsiktligt utan kodade svar. Då visas de i origo tills
// källbelagda ställningstaganden har lagts till i responses.
export const parties: Party[] = [
  { id: 'v', shortName: 'V', name: 'Vänsterpartiet', color: '#DA291C', responses: [] },
  { id: 's', shortName: 'S', name: 'Socialdemokraterna', color: '#E8112D', responses: [] },
  { id: 'mp', shortName: 'MP', name: 'Miljöpartiet', color: '#53A045', responses: [] },
  { id: 'c', shortName: 'C', name: 'Centerpartiet', color: '#009933', responses: [] },
  { id: 'l', shortName: 'L', name: 'Liberalerna', color: '#006AB3', responses: [] },
  { id: 'm', shortName: 'M', name: 'Moderaterna', color: '#52BDEC', responses: [] },
  { id: 'kd', shortName: 'KD', name: 'Kristdemokraterna', color: '#231977', responses: [] },
  { id: 'sd', shortName: 'SD', name: 'Sverigedemokraterna', color: '#DDDD00', responses: [] },
]
