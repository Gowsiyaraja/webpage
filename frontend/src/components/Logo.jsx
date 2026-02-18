import React from 'react'

export default function Logo({ size = 'md', className = '' }) {
  const sizeMap = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24'
  }

  return (
    <svg 
      viewBox="0 0 200 200" 
      className={`${sizeMap[size]} ${className}`}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circle gradient background */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d6336c" />
          <stop offset="50%" stopColor="#f06595" />
          <stop offset="100%" stopColor="#c2255c" />
        </linearGradient>
        <linearGradient id="flowerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f783ac" />
          <stop offset="100%" stopColor="#d6336c" />
        </linearGradient>
      </defs>

      {/* Circular background */}
      <circle cx="100" cy="100" r="95" fill="url(#logoGradient)" opacity="0.1" stroke="url(#logoGradient)" strokeWidth="2" />

      {/* Flower petals - 5 petals in a circle */}
      {[0, 72, 144, 216, 288].map((angle, idx) => {
        const rad = (angle * Math.PI) / 180
        const x = 100 + 50 * Math.cos(rad)
        const y = 100 + 50 * Math.sin(rad)
        return (
          <ellipse
            key={idx}
            cx={x}
            cy={y}
            rx="20"
            ry="30"
            fill="url(#flowerGradient)"
            opacity="0.9"
            transform={`rotate(${angle} ${x} ${y})`}
          />
        )
      })}

      {/* Center circle */}
      <circle cx="100" cy="100" r="22" fill="#ffd700" opacity="0.95" />
      <circle cx="100" cy="100" r="20" fill="#ffed4e" />

      {/* Highlight on center */}
      <circle cx="105" cy="95" r="6" fill="white" opacity="0.6" />

      {/* Sparkle accent */}
      <g opacity="0.8">
        <line x1="130" y1="50" x2="140" y2="40" stroke="#f783ac" strokeWidth="2" strokeLinecap="round" />
        <line x1="135" y1="45" x2="145" y2="35" stroke="#f783ac" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  )
}
