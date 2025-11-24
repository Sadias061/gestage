import React from 'react'

const Card = ({ icon: Icon, title, description }) => {
  return (
    <div className="rounded-xl p-6 border border-slate-700/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      {/* Icône */}
      <div className="mb-4">
        <Icon className="w-10 h-10 text-primary" />
      </div>
      
      {/* Titre */}
      <h3 className="text-xl font-bold  mb-3">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-sm leading-relaxed">
        {description}
      </p>
    </div>
  )
}

export default Card