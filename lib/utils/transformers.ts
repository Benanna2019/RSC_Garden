import { format, getDate } from 'date-fns'

type Props = {
  timestamp?: number | string | null
  locale?: string
  year?: 'numeric' | '2-digit'
  monthForm?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow'
  dayForm?: 'numeric' | '2-digit'
}

export function timestampToCleanTime({
  timestamp = null,
  locale = 'en-us',
  year = 'numeric',
  monthForm = 'long',
  dayForm = 'numeric',
}: Props) {
  const date = timestamp ? new Date(timestamp) : new Date()

  const formatted = date.toLocaleDateString(locale, {
    year,
    month: monthForm,
    day: dayForm,
  })

  const raw = date.toISOString()

  return {
    formatted,
    raw,
  }
}

export function dateHelper({ timestamp = null }: Props) {
  const date = timestamp ? new Date(timestamp) : new Date()

  const day = getDate(date)
  const month = format(date, 'MMM')
  return {
    day,
    month,
  }
}
