export default () => {
  const scrollTo = (query, byId = false, block = 'start') => {
    let el
    if (byId) {
      el = document.getElementById(query)
    } else {
      el = document.getElementsByName(query)[0]
    }
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block })
    }
  }

  return { scrollTo }
}
