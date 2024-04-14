import Input, { InputProps } from './Input'

function AmountInput(props: InputProps) {
  return (
    <div className="flex items-center border rounded-md bg-blue-950 border-white/10">
      <Input
        placeholder="Amount"
        value={props.value}
        onChange={props.onChange}
        className="w-24 pl-4 text-2xl bg-transparent border-0 placeholder:text-base"
      />
      <span className="px-4 text-white/50">USD</span>
    </div>
  )
}

export default AmountInput
