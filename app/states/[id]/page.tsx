"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Navigation from "@/components/navigation"
import { ScrollAnimation, useParallax } from "@/components/scroll-animations"
import { Calendar, Users, Camera, Utensils, Music, Landmark, Mountain, Waves, TreePine, Building } from "lucide-react"

// Extended state data with detailed history and information
const stateDetails = {
  rajasthan: {
    name: "Rajasthan",
    tagline: "Land of Kings",
    description: "The largest state of India, known for its royal heritage, magnificent palaces, and golden deserts.",
    image: "/rajasthan-palace-desert-landscape.png",
    region: "West",
    capital: "Jaipur",
    established: "1956",
    area: "342,239 km²",
    population: "68.5 million",
    languages: ["Hindi", "Rajasthani"],
    history: {
      ancient:
        "Rajasthan has been inhabited since the Indus Valley Civilization. The region was ruled by various Rajput clans who built magnificent forts and palaces. The name 'Rajasthan' means 'Land of Kings', reflecting its royal heritage.",
      medieval:
        "During the medieval period, Rajasthan was divided into numerous princely states ruled by Rajput warriors. The Mughal Empire had significant influence, leading to a unique blend of Rajput and Mughal architecture seen in places like Amber Fort.",
      modern:
        "After India's independence in 1947, the princely states were integrated to form the state of Rajasthan in 1956. Today, it's a major tourist destination known for its cultural heritage and desert landscapes.",
    },
    attractions: [
      { name: "Jaipur Pink City", type: "Heritage", icon: Building },
      { name: "Thar Desert", type: "Natural", icon: Mountain },
      { name: "Udaipur Lakes", type: "Natural", icon: Waves },
      { name: "Jaisalmer Fort", type: "Heritage", icon: Landmark },
    ],
    culture: {
      festivals: ["Pushkar Fair", "Desert Festival", "Teej"],
      cuisine: ["Dal Baati Churma", "Laal Maas", "Ghevar"],
      arts: ["Miniature Painting", "Block Printing", "Puppet Shows"],
    },
  },
  kerala: {
    name: "Kerala",
    tagline: "God's Own Country",
    description: "A tropical paradise known for its backwaters, spice plantations, and Ayurvedic traditions.",
    image: "/kerala-backwaters-coconut-trees-boats.png",
    region: "South",
    capital: "Thiruvananthapuram",
    established: "1956",
    area: "38,852 km²",
    population: "33.4 million",
    languages: ["Malayalam", "English"],
    history: {
      ancient:
        "Kerala's history dates back to 3000 BCE. It was known as 'Malabar' to ancient traders. The region was famous for its spices, attracting traders from across the world including Arabs, Chinese, and Europeans.",
      medieval:
        "The medieval period saw the rise of powerful kingdoms like the Cheras, Cholas, and later the Zamorins of Calicut. Vasco da Gama's arrival in 1498 marked the beginning of European colonization.",
      modern:
        "Kerala was formed in 1956 by merging the princely states of Travancore and Cochin with Malabar district. It became the first state to democratically elect a communist government in 1957.",
    },
    attractions: [
      { name: "Backwaters", type: "Natural", icon: Waves },
      { name: "Spice Plantations", type: "Natural", icon: TreePine },
      { name: "Hill Stations", type: "Natural", icon: Mountain },
      { name: "Ayurveda Centers", type: "Cultural", icon: Landmark },
    ],
    culture: {
      festivals: ["Onam", "Thrissur Pooram", "Theyyam"],
      cuisine: ["Appam", "Fish Curry", "Sadya"],
      arts: ["Kathakali", "Mohiniyattam", "Kalaripayattu"],
    },
  },
  goa: {
    name: "Goa",
    tagline: "Pearl of the Orient",
    description: "India's smallest state, famous for its pristine beaches, Portuguese heritage, and vibrant nightlife.",
    image: "/goa-beaches-palm-trees-portuguese-architecture.png",
    region: "West",
    capital: "Panaji",
    established: "1987",
    area: "3,702 km²",
    population: "1.5 million",
    languages: ["Konkani", "Portuguese", "English"],
    history: {
      ancient:
        "Goa was ruled by the Kadamba dynasty from the 2nd century CE. The region was later controlled by various Hindu and Muslim rulers before Portuguese colonization.",
      medieval:
        "Portuguese explorer Afonso de Albuquerque conquered Goa in 1510, making it the capital of Portuguese India. The Portuguese rule lasted for 451 years, leaving a lasting impact on culture, architecture, and cuisine.",
      modern:
        "Goa was liberated from Portuguese rule in 1961 and became a Union Territory. It achieved statehood in 1987, becoming India's 25th state.",
    },
    attractions: [
      { name: "Pristine Beaches", type: "Natural", icon: Waves },
      { name: "Portuguese Churches", type: "Heritage", icon: Building },
      { name: "Spice Plantations", type: "Natural", icon: TreePine },
      { name: "Forts", type: "Heritage", icon: Landmark },
    ],
    culture: {
      festivals: ["Carnival", "Shigmo", "Feast of St. Francis Xavier"],
      cuisine: ["Fish Curry Rice", "Bebinca", "Feni"],
      arts: ["Fado Music", "Mandó", "Traditional Dance"],
    },
  },
  "himachal-pradesh": {
    name: "Himachal Pradesh",
    tagline: "Dev Bhoomi (Land of Gods)",
    description: "A mountainous state in northern India, known for its hill stations, temples, and adventure sports.",
    image: "/himachal-pradesh-mountains-snow-peaks-valleys.png",
    region: "North",
    capital: "Shimla",
    established: "1971",
    area: "55,673 km²",
    population: "6.9 million",
    languages: ["Hindi", "Pahari"],
    history: {
      ancient:
        "The region has been inhabited since prehistoric times. It was part of the Indus Valley Civilization and later ruled by various Hindu kingdoms including the Guptas and Harsha's empire.",
      medieval:
        "During medieval times, the region was divided into numerous hill states ruled by Rajput chiefs. The Mughal Empire had limited influence due to the difficult terrain.",
      modern:
        "After independence, the hill states were integrated to form Himachal Pradesh in 1971. The state has developed into a major tourist destination and hub for hydroelectric power generation.",
    },
    attractions: [
      { name: "Shimla", type: "Hill Station", icon: Mountain },
      { name: "Manali", type: "Hill Station", icon: Mountain },
      { name: "Dharamshala", type: "Spiritual", icon: Landmark },
      { name: "Spiti Valley", type: "Natural", icon: Mountain },
    ],
    culture: {
      festivals: ["Kullu Dussehra", "Ice Skating Carnival", "Minjar Fair"],
      cuisine: ["Dham", "Chana Madra", "Babru"],
      arts: ["Pahari Painting", "Wood Carving", "Folk Music"],
    },
  },
}

export default function StatePage() {
  const params = useParams()
  const [activeSection, setActiveSection] = useState("overview")
  const [isVisible, setIsVisible] = useState(false)

  const stateId = params.id as string
  const state = stateDetails[stateId as keyof typeof stateDetails]

  useParallax()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">State not found</h1>
          <Button onClick={() => (window.location.href = "/")} variant="outline">
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  const interactiveButtons = [
    {
      id: "attractions",
      label: "Top Attractions",
      icon: Camera,
      color: "bg-primary",
      description: "Explore must-visit places",
    },
    {
      id: "cuisine",
      label: "Local Cuisine",
      icon: Utensils,
      color: "bg-secondary",
      description: "Taste authentic flavors",
    },
    {
      id: "culture",
      label: "Arts & Culture",
      icon: Music,
      color: "bg-accent",
      description: "Discover traditions",
    },
    {
      id: "history",
      label: "Rich History",
      icon: Landmark,
      color: "bg-primary",
      description: "Journey through time",
    },
  ]

  return (
    <>
      <Navigation currentStateId={stateId} />
      <div className="min-h-screen bg-background page-transition loaded">
        {/* Hero Section */}
        <section className="relative h-[70vh] overflow-hidden parallax-bg">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat parallax-element"
            data-speed="0.3"
            style={{ backgroundImage: `url('${state.image}')` }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div
            className={`relative z-10 h-full flex items-center justify-center text-center text-white px-4 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          >
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-typewriter">{state.name}</h1>
              <p className="text-2xl md:text-3xl mb-6 text-secondary font-semibold animate-fade-in-up animate-stagger-2">
                {state.tagline}
              </p>
              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-3xl mx-auto animate-fade-in-up animate-stagger-3">
                {state.description}
              </p>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <ScrollAnimation animation="fade-up">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center hover-scale">
                  <Building className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Capital</p>
                  <p className="font-semibold">{state.capital}</p>
                </div>
                <div className="text-center hover-scale">
                  <Calendar className="w-8 h-8 text-secondary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Established</p>
                  <p className="font-semibold">{state.established}</p>
                </div>
                <div className="text-center hover-scale">
                  <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Population</p>
                  <p className="font-semibold">{state.population}</p>
                </div>
                <div className="text-center hover-scale">
                  <Mountain className="w-8 h-8 text-secondary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Area</p>
                  <p className="font-semibold">{state.area}</p>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* Interactive Buttons Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <ScrollAnimation animation="fade-up">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Explore {state.name}</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Discover the essence of {state.name} through these interactive experiences
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="scale" delay={200}>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {interactiveButtons.map((button, index) => {
                  const IconComponent = button.icon
                  return (
                    <Card
                      key={button.id}
                      className={`group cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover-glow animate-bounce-in animate-stagger-${index + 1} ${
                        activeSection === button.id ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setActiveSection(button.id)}
                    >
                      <CardContent className="p-8 text-center">
                        <div
                          className={`w-16 h-16 ${button.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 animate-pulse-glow`}
                        >
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{button.label}</h3>
                        <p className="text-muted-foreground">{button.description}</p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </ScrollAnimation>

            {/* Dynamic Content Based on Active Section */}
            <ScrollAnimation animation="fade-up" delay={400}>
              <div className="bg-card rounded-2xl p-8 shadow-lg hover-lift">
                {activeSection === "attractions" && (
                  <div>
                    <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                      <Camera className="w-8 h-8 text-primary" />
                      Top Attractions in {state.name}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {state.attractions.map((attraction, index) => {
                        const IconComponent = attraction.icon
                        return (
                          <div key={index} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg hover-scale">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                              <IconComponent className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <h4 className="text-xl font-semibold mb-1">{attraction.name}</h4>
                              <Badge variant="outline" className="text-xs">
                                {attraction.type}
                              </Badge>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {activeSection === "cuisine" && (
                  <div>
                    <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                      <Utensils className="w-8 h-8 text-secondary" />
                      Local Cuisine of {state.name}
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      {state.culture.cuisine.map((dish, index) => (
                        <div key={index} className="text-center p-6 bg-muted/30 rounded-lg hover-scale">
                          <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Utensils className="w-8 h-8 text-secondary" />
                          </div>
                          <h4 className="text-lg font-semibold">{dish}</h4>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSection === "culture" && (
                  <div>
                    <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                      <Music className="w-8 h-8 text-accent" />
                      Arts & Culture of {state.name}
                    </h3>
                    <div className="space-y-8">
                      <div>
                        <h4 className="text-xl font-semibold mb-4">Festivals</h4>
                        <div className="flex flex-wrap gap-2">
                          {state.culture.festivals.map((festival, index) => (
                            <Badge key={index} variant="secondary" className="text-sm py-1 px-3 hover-scale">
                              {festival}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="text-xl font-semibold mb-4">Traditional Arts</h4>
                        <div className="flex flex-wrap gap-2">
                          {state.culture.arts.map((art, index) => (
                            <Badge key={index} variant="outline" className="text-sm py-1 px-3 hover-scale">
                              {art}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === "history" && (
                  <div>
                    <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                      <Landmark className="w-8 h-8 text-primary" />
                      Rich History of {state.name}
                    </h3>
                    <div className="space-y-8">
                      <div>
                        <h4 className="text-xl font-semibold mb-4 text-primary">Ancient Period</h4>
                        <p className="text-muted-foreground leading-relaxed">{state.history.ancient}</p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="text-xl font-semibold mb-4 text-secondary">Medieval Period</h4>
                        <p className="text-muted-foreground leading-relaxed">{state.history.medieval}</p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="text-xl font-semibold mb-4 text-accent">Modern Era</h4>
                        <p className="text-muted-foreground leading-relaxed">{state.history.modern}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* Languages Section */}
        <section className="py-16 px-4 bg-muted/30">
          <ScrollAnimation animation="scale">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-6">Languages Spoken</h3>
              <div className="flex justify-center gap-4">
                {state.languages.map((language, index) => (
                  <Badge key={index} variant="default" className="text-lg py-2 px-4 hover-scale">
                    {language}
                  </Badge>
                ))}
              </div>
            </div>
          </ScrollAnimation>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4 bg-primary text-primary-foreground">
          <ScrollAnimation animation="fade-up">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Plan Your Visit to {state.name}</h2>
              <p className="text-xl mb-8 opacity-90 leading-relaxed">
                Experience the magic of {state.tagline} and create memories that will last a lifetime.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-4 text-lg font-semibold transition-all duration-300 hover-glow"
                  onClick={() => (window.location.href = "/")}
                >
                  Explore More States
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold bg-transparent transition-all duration-300 hover-glow"
                >
                  Plan Your Trip
                </Button>
              </div>
            </div>
          </ScrollAnimation>
        </section>
      </div>
    </>
  )
}
