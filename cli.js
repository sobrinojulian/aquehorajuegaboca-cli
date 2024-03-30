import { load } from 'cheerio'

async function fetchData() {
  try {
    const response = await fetch('https://www.espn.com.ar/futbol/equipo/calendario?id=5')
    const html = await response.text()
    const $ = load(html)

    // Extract the script content
    const scriptContent = $('script')
      .filter(function () {
        return $(this).html().includes('__espnfitt__')
      })
      .html()

    // Extract the page object from the script content
    const pageObject = JSON.parse(scriptContent.match(/window\['__espnfitt__'\]\s*=\s*({.*?});/)[1])

    // Extract the desired data from the page object
    const desiredData = pageObject.page.content.fixtures.events

    //
    const date = desiredData[0].date.slice(0, -7)
    const when = desiredData[0].status.detail.slice(0, -4)
    const versus = desiredData[0].teams[0].shortDisplayName
    const isLocal = ''
    const time = ''
    const league = desiredData[0].league
    const where = `${desiredData[0].venue.fullName} (${desiredData[0].venue.address.country})`
    console.log(desiredData[0])
    console.log(`${when}, ${versus}, ${where}, ${league}`)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

fetchData()
