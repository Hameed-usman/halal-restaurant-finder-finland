/**
 * Parses CSV text into an array of objects.
 * Handles basic CSV features including quoted fields and commas.
 * @param {string} csvText - The raw CSV string from Google Sheets.
 * @returns {Array<Object>} - An array of objects where keys are from the header row.
 */
export const parseSheetData = (csvText) => {
  if (!csvText || typeof csvText !== 'string') return []

  const lines = csvText.split(/\r?\n/).filter(line => line.trim())
  if (lines.length < 2) return []

  // Split headers (assumes headers are simple and don't contain commas)
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''))

  return lines.slice(1).map(line => {
    const values = []
    let current = ''
    let inQuotes = false

    // More robust splitting logic to handle commas inside quotes
    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim().replace(/^"|"$/g, ''))
        current = ''
      } else {
        current += char
      }
    }
    values.push(current.trim().replace(/^"|"$/g, ''))

    // Map headers to values
    const row = headers.reduce((obj, header, index) => {
      const val = values[index] || ''
      if (header === 'lat' || header === 'lng') {
        obj[header] = parseFloat(val)
      } else {
        obj[header] = val
      }
      return obj
    }, {})

    return row
  }).filter(r => r.name && !isNaN(r.lat) && !isNaN(r.lng))
}
