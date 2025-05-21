export function getCountryFlag(countryCode: string) {
  if (!countryCode) {
    return ''
  }

  const code = countryCode.toUpperCase()

  if (code.length !== 2) {
    return ''
  }

  return String.fromCodePoint(...Array.from(code).map((char) => char.charCodeAt(0) + 127397))
}
