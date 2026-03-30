import { useState } from 'react'

/** Logo: `public/crest.svg`. Falls back to FCB badge if missing. */
export function ClubCrest({ className = '' }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className={`club-crest-fallback ${className}`} aria-hidden>
        <span>FCB</span>
      </div>
    )
  }

  return (
    <img
      className={`club-crest ${className}`}
      src="/crest.svg"
      alt=""
      aria-hidden
      onError={() => setFailed(true)}
    />
  )
}
