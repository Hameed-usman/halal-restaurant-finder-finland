import { HALAL_STATUS } from '../../constants'
import PropTypes from 'prop-types'

export function Badge({ status }) {
  let badgeStyle = "bg-gray-200 text-gray-700"
  let text = "NOT SPECIFIED"

  if (status === HALAL_STATUS.FULLY) {
    badgeStyle = "bg-[#0b4d2a] text-white"
    text = "VERIFIED HALAL"
  } else if (status === HALAL_STATUS.OPTIONS) {
    badgeStyle = "bg-amber-100 text-amber-800"
    text = "HALAL OPTIONS"
  } else if (status === HALAL_STATUS.UNKNOWN) {
    badgeStyle = "bg-gray-200 text-gray-700"
    text = "NOT SPECIFIED"
  } else {
    text = status ? status.toUpperCase() : "NOT SPECIFIED"
  }

  return (
    <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${badgeStyle} shadow-sm backdrop-blur-md bg-opacity-90`}>
      {text === "VERIFIED HALAL" && (
        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )}
      {text}
    </div>
  )
}

Badge.propTypes = {
  status: PropTypes.string
}
