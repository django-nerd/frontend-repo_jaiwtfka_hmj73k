import React from 'react'

export default function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="min-h-[90vh] w-full py-16 px-4 sm:px-8 lg:px-12 flex items-center justify-center">
      <div className="max-w-6xl w-full">
        <div className="mb-8">
          <h2 className="font-black text-3xl sm:text-4xl tracking-tight text-neutral-900 drop-shadow-[2px_2px_0_#fff]">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-neutral-700 text-sm sm:text-base">{subtitle}</p>
          )}
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white/80 backdrop-blur p-4 sm:p-6">
          {children}
        </div>
      </div>
    </section>
  )
}
