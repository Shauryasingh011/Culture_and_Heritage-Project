"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface ScrollAnimationProps {
  children: React.ReactNode
  className?: string
  animation?: "fade-up" | "fade-left" | "fade-right" | "scale" | "slide-up"
  delay?: number
  threshold?: number
}

export function ScrollAnimation({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
  threshold = 0.1,
}: ScrollAnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("revealed")
            }, delay)
          }
        })
      },
      { threshold },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [delay, threshold])

  const getAnimationClass = () => {
    switch (animation) {
      case "fade-left":
        return "scroll-reveal-left"
      case "fade-right":
        return "scroll-reveal-right"
      case "scale":
        return "scroll-reveal-scale"
      case "slide-up":
        return "scroll-reveal"
      default:
        return "scroll-reveal"
    }
  }

  return (
    <div ref={elementRef} className={`${getAnimationClass()} ${className}`}>
      {children}
    </div>
  )
}

export function useParallax() {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const parallaxElements = document.querySelectorAll(".parallax-element")

      parallaxElements.forEach((element) => {
        const speed = element.getAttribute("data-speed") || "0.5"
        const yPos = -(scrolled * Number.parseFloat(speed))
        ;(element as HTMLElement).style.transform = `translateY(${yPos}px)`
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
}

export function StaggeredGrid({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = Array.from(entry.target.children)
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add("animate-fade-in-scale")
              }, index * 100)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(grid)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={gridRef} className={className}>
      {children}
    </div>
  )
}
