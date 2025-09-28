import React from 'react'

const Card = ({ title, action, children }) => {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export default Card