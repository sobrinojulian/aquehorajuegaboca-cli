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

    console.log(desiredData)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

fetchData()
