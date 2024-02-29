'use client'
import React from 'react'

const Imagegenerator = () => {
  return (
    <div >
      <h2 className="h2-bold text-dark-600">AI-Image Generator</h2>
       <p className='p-16-regular mt-4'>Checkout our website(Imagerator) for generating AI-Powered images </p>
       <p className='p-16-regular mt-4'>It is Free for limited time</p>
      <img  src="https://github.com/AnasAAhmed/lol2.textutility/blob/main/Screenshot%20(2).png?raw=true" alt="web"  width={500}
      height={400}
      className='webimg mt-0 md:mt-12'
      onClick={() => window.open("https://imagerator-vite.vercel.app", "_blank")}
      />
    </div>
  )
}

export default Imagegenerator
