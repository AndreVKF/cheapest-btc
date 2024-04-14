interface ResultRowProps {
  amount: number
  provider: string
  logo: string
  loading?: boolean
}

function ResultRow({ amount, provider, loading, logo }: ResultRowProps) {
  return (
    <div className="relative p-4 my-2 overflow-hidden border rounded-lg min-h-16 border-white/10 bg-gradient-to-r from-purple-500/10 to-blue-500/10">
      {provider && !loading && (
        <div className="flex items-center gap-4">
          <img src={logo} alt={provider} className="h-10" />
          <div className="grow">{provider}</div>
          <div className="flex gap-2">
            <span className="text-xl text-purple-200/80">
              {new Intl.NumberFormat('pt-BR', {
                minimumFractionDigits: 8,
              }).format(amount)}
            </span>
            <span className="text-xl text-purple-300/50">BTC</span>
          </div>
        </div>
      )}

      {loading && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-800/50 to-transparent skeleton-animation"></div>
      )}
    </div>
  )
}

export default ResultRow
