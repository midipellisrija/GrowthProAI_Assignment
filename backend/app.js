const express = require("express");
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

const generateSEOHeadlines = (name, location)=>{
    if(!name){
        name = "Your Business"
    }
    if(!location){
        location = "Your City"
    }

   const templates = [
  `Why ${name} Is ${location}'s Sweetest Spot in 2025`,
  `Discover What Makes ${name} a Favorite in ${location}`,
  `${name}: A Hidden Gem in the Heart of ${location}`,
  `How ${name} Became the Talk of ${location}`,
  `Top-Rated in ${location}: Why Locals Love ${name}`,
  `${name}: Redefining Local Excellence in ${location}`,
  `${location}'s Beloved Choice for Quality ${name}`,
  `What Sets ${name} Apart from the Rest in ${location}`,
  `Unveiling the Magic of ${name} in ${location}`,
  `${name} — The Pride of ${location}'s Local Business Scene`, 
  `Experience the Best of ${location} at ${name}`,
  `${name}: Where Tradition Meets Innovation in ${location}`,
  `Why ${name} Is the Go-To Spot for Locals in ${location}`,
  `Step Inside ${name}, ${location}’s Top Pick for Quality`,
  `The Secret Behind ${name}’s Success in ${location}`,
  `${name} Is Raising the Bar in ${location}`,
  `Local Favorite: Here's Why ${name} Wins Hearts in ${location}`,
  `What ${location} Residents Say About ${name}`,
  `Discover the Local Buzz: Why ${name} Stands Out in ${location}`,
  `From Good to Great: ${name}'s Journey in ${location}`,
  `${name}: Setting New Standards in ${location}`,
  `Your Next Must-Visit in ${location}: ${name}`,
  `${name} Has Everyone Talking in ${location}`,
  `Excellence You Can Trust: ${name} in ${location}`,
  `${name} Is More Than Just a Business — It’s a ${location} Staple`
];


    const randomInd = Math.floor(Math.random() * templates.length);
    return templates[randomInd];

}


app.post('/business-data', (request, response)=>{
    const {name, location } = request.body;

    if(!name && !location) {
        return response.status(400).json({error: "Name and Location are Required"})
    }
    else if(!name) {
        return response.status(400).json({error: "Name is Required"})
    }
    else if(!location) {
        return response.status(400).json({error: "Location is Required"})
    }

    const ratings = Number((Math.random() * 5.0 +1.0).toFixed(1));
    const reviews = Math.floor((Math.random() * 500) + 50);
    const headline = generateSEOHeadlines(name, location);

    response.status(200).json({
        rating : ratings,
        reviews: reviews,
        headline: headline
    })

})


app.get('/regenerate-headline', (request, response)=>{
    const {name, location} = request.query

    const headline = generateSEOHeadlines(name, location);
    response.status(200).json({headline})
})

app.listen(5000, ()=>{
    console.log("Server running on the port 5000")
})