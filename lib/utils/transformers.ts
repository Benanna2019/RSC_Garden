import { format, getDate } from 'date-fns'

export type DateProps = {
  timestamp?: number | string | null
  locale?: string
  year?: 'numeric' | '2-digit'
  monthForm?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow'
  dayForm?: 'numeric' | '2-digit'
}

// function timestampToCleanTime({ timestamp = null }: DateProps) {
//   const date = timestamp ? new Date(timestamp) : new Date()
//   const formatted = format(date, 'MM/dd/yyyy')
//   // const raw = dateForBrowsers

//   console.log('formatted', formatted)
//   return {
//     formatted,
//     // raw,
//   }
// }

export function dateHelper({ timestamp = null }: DateProps) {
  const date = timestamp ? new Date(timestamp) : new Date()

  const day = getDate(date)
  const month = format(date, 'MMM')
  return {
    day,
    month,
  }
}

// const fixDateForAllBrowsers = (dateString: any) => dateString.replace(/-/g, '/')
