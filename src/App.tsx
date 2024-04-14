import { FormEvent, useState } from 'react'
import AmountInput from './components/AmountInput'
import ResultRow from './components/ResultRow'
import {
  getOfferFromGuardarian,
  getOfferFromMoonpay,
  getOfferFromPaybis,
  getOfferFromTransak,
} from './lib/providers'

import guardianLogo from './assets/guardian.png'
import moonpayLogo from './assets/moonpay.png'
import paybisLogo from './assets/paybis.png'
import transakLogo from './assets/transak.png'

type BtcOffer = {
  provider: string
  amount: number
  logo: string
}

function App() {
  const [amount, setAmount] = useState('100')
  const [results, setResults] = useState<BtcOffer[]>([])
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setLoading(true)
    const numberAmount = Number(amount)

    const [guardianOffer, moonpayOffer, paybisOffer, transakOffer] =
      await Promise.all([
        getOfferFromGuardarian(numberAmount),
        getOfferFromMoonpay(numberAmount),
        getOfferFromPaybis(numberAmount),
        getOfferFromTransak(numberAmount),
      ])

    const results: BtcOffer[] = []
    if (guardianOffer)
      results.push({
        provider: 'Guardian',
        amount: Number(guardianOffer),
        logo: guardianLogo,
      })

    if (moonpayOffer)
      results.push({
        provider: 'Moonpay',
        amount: Number(moonpayOffer),
        logo: moonpayLogo,
      })

    if (paybisOffer)
      results.push({
        provider: 'Paybis',
        amount: Number(paybisOffer),
        logo: paybisLogo,
      })

    if (transakOffer)
      results.push({
        provider: 'Transak',
        amount: Number(transakOffer),
        logo: transakLogo,
      })

    setResults(results)
    setLoading(false)
  }

  return (
    <main className="max-w-2xl px-4 py-8 mx-auto">
      <h1 className="text-6xl text-center text-transparent uppercase font-bolds bg-gradient-to-br from-purple-600 from-30% to-sky-400 bg-clip-text">
        find cheapest btc
      </h1>

      <form
        className="flex items-center justify-center gap-2 mt-6"
        onSubmit={handleSubmit}
      >
        <AmountInput
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          className="block max-w-2xl p-2 rounded-md bg-purple-400/70 hover:bg-purple-600/70"
          type="submit"
        >
          Update
        </button>
      </form>

      <div className="mt-6">
        {!loading &&
          results &&
          results.map((btcOffer) => {
            return (
              <ResultRow
                key={btcOffer.provider}
                amount={btcOffer.amount}
                provider={btcOffer.provider}
                logo={btcOffer.logo}
              />
            )
          })}
        {loading &&
          [...Array(3).keys()].map((idx) => {
            return (
              <ResultRow
                key={idx}
                amount={0}
                provider=""
                logo=""
                loading={true}
              />
            )
          })}
      </div>
    </main>
  )
}

export default App
