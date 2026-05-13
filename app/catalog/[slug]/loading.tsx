import { Tailspin } from 'ldrs/react'
import 'ldrs/react/Tailspin.css'

export default function Loading() {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-white/70">
      <Tailspin size="40" stroke="3" speed="0.9" color="#7a553a" />
    </div>
  )
}
