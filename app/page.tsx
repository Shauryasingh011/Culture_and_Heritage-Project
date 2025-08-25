"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollAnimation, useParallax, StaggeredGrid } from "@/components/scroll-animations"
import { ChevronDown, MapPin, Clock, Users, Sparkles, Search } from "lucide-react"

const allStates = [
  {
    id: "andhra-pradesh",
    name: "Andhra Pradesh",
    description: "Land of spices and ancient temples with rich cultural heritage",
    image: "/andhra-pradesh-temples-spices-cultural-heritage.png",
    highlights: ["Tirupati Temple", "Araku Valley", "Visakhapatnam Beaches"],
    region: "South",
  },
  {
    id: "arunachal-pradesh",
    name: "Arunachal Pradesh",
    description: "Land of dawn-lit mountains with pristine natural beauty",
    image: "/arunachal-pradesh-mountains-dawn-pristine-nature.png",
    highlights: ["Tawang Monastery", "Ziro Valley", "Namdapha National Park"],
    region: "Northeast",
  },
  {
    id: "assam",
    name: "Assam",
    description: "Gateway to Northeast with tea gardens and wildlife",
    image: "/assam-tea-gardens-wildlife-rhinos-culture.png",
    highlights: ["Kaziranga National Park", "Tea Gardens", "Majuli Island"],
    region: "Northeast",
  },
  {
    id: "bihar",
    name: "Bihar",
    description: "Birthplace of Buddhism with ancient universities and heritage",
    image: "/bihar-buddhism-ancient-universities-heritage.png",
    highlights: ["Bodh Gaya", "Nalanda University", "Patna Sahib"],
    region: "East",
  },
  {
    id: "chhattisgarh",
    name: "Chhattisgarh",
    description: "Heart of India with dense forests and tribal culture",
    image: "/chhattisgarh-forests-tribal-culture-waterfalls.png",
    highlights: ["Chitrakote Falls", "Kanger Valley", "Tribal Villages"],
    region: "Central",
  },
  {
    id: "goa",
    name: "Goa",
    description: "Coastal paradise with Portuguese heritage and beaches",
    image: "/goa-beaches-palm-trees-portuguese-architecture.png",
    highlights: ["Pristine Beaches", "Portuguese Churches", "Vibrant Nightlife"],
    region: "West",
  },
  {
    id: "gujarat",
    name: "Gujarat",
    description: "Land of entrepreneurs with vibrant culture and heritage",
    image: "/gujarat-rann-of-kutch-white-desert-culture.png",
    highlights: ["Rann of Kutch", "Gir National Park", "Somnath Temple"],
    region: "West",
  },
  {
    id: "haryana",
    name: "Haryana",
    description: "Agricultural heartland with modern cities and ancient sites",
    image: "/haryana-agriculture-modern-cities-kurukshetra.png",
    highlights: ["Kurukshetra", "Sultanpur Bird Sanctuary", "Pinjore Gardens"],
    region: "North",
  },
  {
    id: "himachal-pradesh",
    name: "Himachal Pradesh",
    description: "Mountain state with snow-capped peaks and hill stations",
    image: "/himachal-pradesh-mountains-snow-peaks-valleys.png",
    highlights: ["Shimla", "Manali", "Dharamshala"],
    region: "North",
  },
  {
    id: "jharkhand",
    name: "Jharkhand",
    description: "Land of forests with rich mineral resources and waterfalls",
    image: "/jharkhand-forests-waterfalls-tribal-heritage.png",
    highlights: ["Hundru Falls", "Betla National Park", "Tribal Heritage"],
    region: "East",
  },
  {
    id: "karnataka",
    name: "Karnataka",
    description: "Silicon Valley of India with palaces and coffee plantations",
    image: "/karnataka-bangalore-mysore-palace-coffee.png",
    highlights: ["Mysore Palace", "Coorg Coffee", "Hampi Ruins"],
    region: "South",
  },
  {
    id: "kerala",
    name: "Kerala",
    description: "God's Own Country with backwaters and spice gardens",
    image: "/kerala-backwaters-coconut-trees-boats.png",
    highlights: ["Backwaters", "Spice Plantations", "Ayurveda"],
    region: "South",
  },
  {
    id: "madhya-pradesh",
    name: "Madhya Pradesh",
    description: "Heart of India with tiger reserves and ancient temples",
    image: "/madhya-pradesh-tigers-khajuraho-temples.png",
    highlights: ["Khajuraho Temples", "Kanha National Park", "Sanchi Stupa"],
    region: "Central",
  },
  {
    id: "maharashtra",
    name: "Maharashtra",
    description: "Commercial capital with Bollywood and hill stations",
    image: "/maharashtra-mumbai-bollywood-ajanta-caves.png",
    highlights: ["Mumbai", "Ajanta Caves", "Lonavala"],
    region: "West",
  },
  {
    id: "manipur",
    name: "Manipur",
    description: "Jewel of India with pristine lakes and martial arts",
    image: "/manipur-loktak-lake-martial-arts-culture.png",
    highlights: ["Loktak Lake", "Kangla Fort", "Classical Dance"],
    region: "Northeast",
  },
  {
    id: "meghalaya",
    name: "Meghalaya",
    description: "Abode of clouds with living root bridges and waterfalls",
    image: "/meghalaya-living-root-bridges-waterfalls-clouds.png",
    highlights: ["Living Root Bridges", "Cherrapunji", "Shillong"],
    region: "Northeast",
  },
  {
    id: "mizoram",
    name: "Mizoram",
    description: "Land of blue mountains with bamboo forests and culture",
    image: "/mizoram-blue-mountains-bamboo-forests-culture.png",
    highlights: ["Blue Mountain", "Champhai", "Mizo Culture"],
    region: "Northeast",
  },
  {
    id: "nagaland",
    name: "Nagaland",
    description: "Land of festivals with tribal heritage and mountains",
    image: "/nagaland-tribal-festivals-mountains-heritage.png",
    highlights: ["Hornbill Festival", "Kohima War Cemetery", "Tribal Villages"],
    region: "Northeast",
  },
  {
    id: "odisha",
    name: "Odisha",
    description: "Land of temples with classical dance and coastal beauty",
    image: "/odisha-jagannath-temple-classical-dance-coast.png",
    highlights: ["Jagannath Temple", "Konark Sun Temple", "Chilika Lake"],
    region: "East",
  },
  {
    id: "punjab",
    name: "Punjab",
    description: "Land of five rivers with Golden Temple and vibrant culture",
    image: "/punjab-golden-temple-wheat-fields-culture.png",
    highlights: ["Golden Temple", "Wheat Fields", "Bhangra Dance"],
    region: "North",
  },
  {
    id: "rajasthan",
    name: "Rajasthan",
    description: "Land of Kings with majestic palaces and golden deserts",
    image: "/rajasthan-palace-desert-landscape.png",
    highlights: ["Jaipur Pink City", "Thar Desert", "Udaipur Lakes"],
    region: "West",
  },
  {
    id: "sikkim",
    name: "Sikkim",
    description: "Himalayan paradise with monasteries and mountain peaks",
    image: "/sikkim-monasteries-kanchenjunga-mountain-paradise.png",
    highlights: ["Kanchenjunga", "Rumtek Monastery", "Gangtok"],
    region: "Northeast",
  },
  {
    id: "tamil-nadu",
    name: "Tamil Nadu",
    description: "Land of temples with classical arts and coastal heritage",
    image: "/tamil-nadu-temples-classical-dance-marina-beach.png",
    highlights: ["Meenakshi Temple", "Marina Beach", "Bharatanatyam"],
    region: "South",
  },
  {
    id: "telangana",
    name: "Telangana",
    description: "Cyberabad with historic forts and modern IT industry",
    image: "/telangana-hyderabad-charminar-it-industry.png",
    highlights: ["Charminar", "Ramoji Film City", "IT Hub"],
    region: "South",
  },
  {
    id: "tripura",
    name: "Tripura",
    description: "Land of diversity with palaces and tribal heritage",
    image: "/tripura-ujjayanta-palace-tribal-heritage.png",
    highlights: ["Ujjayanta Palace", "Neermahal", "Tribal Culture"],
    region: "Northeast",
  },
  {
    id: "uttar-pradesh",
    name: "Uttar Pradesh",
    description: "Heartland of India with Taj Mahal and spiritual cities",
    image: "/uttar-pradesh-taj-mahal-varanasi-spiritual.png",
    highlights: ["Taj Mahal", "Varanasi Ghats", "Ayodhya"],
    region: "North",
  },
  {
    id: "uttarakhand",
    name: "Uttarakhand",
    description: "Dev Bhoomi with holy rivers and Himalayan peaks",
    image: "/uttarakhand-himalayan-peaks-holy-rivers-temples.png",
    highlights: ["Char Dham", "Valley of Flowers", "Rishikesh"],
    region: "North",
  },
  {
    id: "west-bengal",
    name: "West Bengal",
    description: "Cultural capital with literature, art, and Sundarbans",
    image: "/west-bengal-kolkata-sundarbans-cultural-heritage.png",
    highlights: ["Victoria Memorial", "Sundarbans", "Durga Puja"],
    region: "East",
  },
]

const regions = ["All", "North", "South", "East", "West", "Northeast", "Central"]

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("All")
  const [showAllStates, setShowAllStates] = useState(false)

  useParallax()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToStates = () => {
    document.getElementById("states-section")?.scrollIntoView({ behavior: "smooth" })
  }

  const filteredStates = allStates.filter((state) => {
    const matchesSearch =
      state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      state.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRegion = selectedRegion === "All" || state.region === selectedRegion
    return matchesSearch && matchesRegion
  })

  const displayedStates = showAllStates ? filteredStates : filteredStates.slice(0, 8)

  return (
    <div className="min-h-screen bg-background page-transition loaded">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden parallax-bg">
        {/* Background Image with Parallax */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat parallax-element"
          data-speed="0.5"
          style={{
            backgroundImage: `url('/india-landscape-taj-mahal-golden-hour-vibrant-colo.png')`,
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Hero Content */}
        <div
          className={`relative z-10 text-center text-white px-4 max-w-4xl mx-auto ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Discover
            <span className="text-secondary block animate-float">Incredible India</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed animate-fade-in-up animate-stagger-2">
            Journey through 28 diverse states, each with unique culture, history, and breathtaking landscapes
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12 animate-fade-in-up animate-stagger-3">
            <div className="flex items-center gap-2 hover-scale">
              <MapPin className="w-6 h-6 text-secondary" />
              <span className="text-lg font-semibold">28 States</span>
            </div>
            <div className="flex items-center gap-2 hover-scale">
              <Clock className="w-6 h-6 text-secondary" />
              <span className="text-lg font-semibold">5000+ Years</span>
            </div>
            <div className="flex items-center gap-2 hover-scale">
              <Users className="w-6 h-6 text-secondary" />
              <span className="text-lg font-semibold">1.4B People</span>
            </div>
            <div className="flex items-center gap-2 hover-scale">
              <Sparkles className="w-6 h-6 text-secondary" />
              <span className="text-lg font-semibold">Infinite Stories</span>
            </div>
          </div>

          <Button
            onClick={scrollToStates}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover-glow animate-fade-in-up animate-stagger-4"
          >
            Explore States
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/70" />
        </div>
      </section>

      {/* About India Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollAnimation animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">The Land of Diversity</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                India is a tapestry woven with threads of ancient civilizations, diverse cultures, magnificent
                architecture, and natural wonders that span from the Himalayas to the Indian Ocean.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollAnimation animation="fade-left">
              <div>
                <img
                  src="/india-cultural-diversity-festivals-colors-traditio.png"
                  alt="Indian Cultural Diversity"
                  className="rounded-2xl shadow-2xl w-full h-auto hover-lift"
                />
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-right" delay={200}>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 hover-scale">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Geographic Marvel</h3>
                    <p className="text-muted-foreground">
                      From the snow-capped Himalayas to tropical beaches, deserts to rainforests - India encompasses
                      every landscape imaginable.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 hover-scale">
                    <Users className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Cultural Richness</h3>
                    <p className="text-muted-foreground">
                      Home to hundreds of languages, festivals, art forms, and traditions that have flourished for
                      millennia.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 hover-scale">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Ancient Heritage</h3>
                    <p className="text-muted-foreground">
                      Witness to the rise and fall of great empires, birthplace of major religions, and keeper of
                      timeless wisdom.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <section id="states-section" className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <ScrollAnimation animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Explore All 28 Indian States</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Each state tells a unique story. Search, filter by region, and click on any state to dive deep into its
                history, culture, and attractions.
              </p>
            </div>
          </ScrollAnimation>

          {/* Search and Filter Controls */}
          <ScrollAnimation animation="scale" delay={200}>
            <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-4xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search states..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background border-border transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {regions.map((region) => (
                  <Button
                    key={region}
                    variant={selectedRegion === region ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedRegion(region)}
                    className={`transition-all duration-300 hover-scale ${selectedRegion === region ? "bg-primary text-primary-foreground" : ""}`}
                  >
                    {region}
                  </Button>
                ))}
              </div>
            </div>
          </ScrollAnimation>

          {/* States Grid */}
          <StaggeredGrid className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {displayedStates.map((state, index) => (
              <Card
                key={state.id}
                className="group cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card border-border hover-lift"
                onClick={() => (window.location.href = `/states/${state.id}`)}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={state.image || "/placeholder.svg"}
                    alt={state.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{state.name}</h3>
                    <span className="text-sm bg-secondary/80 px-2 py-1 rounded-full">{state.region}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4 leading-relaxed">{state.description}</p>
                  <div className="space-y-2 mb-4">
                    {state.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                        <span className="text-sm text-muted-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover-glow"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.location.href = `/states/${state.id}`
                    }}
                  >
                    Explore {state.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </StaggeredGrid>

          {/* Show More/Less Button */}
          {filteredStates.length > 8 && (
            <ScrollAnimation animation="fade-up">
              <div className="text-center">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 bg-transparent transition-all duration-300 hover-glow"
                  onClick={() => setShowAllStates(!showAllStates)}
                >
                  {showAllStates ? "Show Less" : `View All ${filteredStates.length} States`}
                </Button>
              </div>
            </ScrollAnimation>
          )}

          {/* No Results Message */}
          {filteredStates.length === 0 && (
            <ScrollAnimation animation="scale">
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground">No states found matching your search criteria.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedRegion("All")
                  }}
                  className="mt-4 hover-scale"
                >
                  Clear Filters
                </Button>
              </div>
            </ScrollAnimation>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-primary text-primary-foreground parallax-bg">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollAnimation animation="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Start Your Journey Today</h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Discover the incredible diversity, rich heritage, and timeless beauty of India's states. Each click opens
              a new chapter in this magnificent story.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-4 text-lg font-semibold transition-all duration-300 hover-glow"
              onClick={scrollToStates}
            >
              Begin Exploration
            </Button>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  )
}
