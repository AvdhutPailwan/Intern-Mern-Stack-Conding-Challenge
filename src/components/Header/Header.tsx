import React from 'react'

function Header() {
  return (
    <div className="flex justify-center items-center mt-6">
      <div className="flex justify-center items-center rounded-full bg-zinc-100 dark:bg-zinc-900 h-40 w-40">
        <h1 className="text-center text-xl font-bold p-6">
          Transaction Dashboard
        </h1>
      </div>
    </div>

  )
}

export default Header