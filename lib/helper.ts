export const coerceInt = (number: string) => {
  
  if ( Number.isNaN(parseInt(number)) ) {
    return 0
  } else {
    return parseInt(number)
  }
}