import React from 'react'
import react from '../../assets/react-logo.png'
import tailwind from '../../assets/tailwind-logo.png'
import typescript from '../../assets/typescript-logo.png'
import github from '../../assets/github-logo.png'

type Props = {}

const Footer = (props: Props) => {
  return (
    <section className="border-t-2 px-20 lg:px-48 py-10 flex flex-col md:flex-row gap-4 justify-between items-center w-full select-none">
      <div className="flex gap-2 items-center h-7">
        <a
          href="https://github.com/lucadard/ecommerce-coderhouse_frontend"
          className="w-7 aspect-square relative"
          target="_blank"
        >
          <img src={github} alt="Github logo" className="h-full " />
        </a>
        <p className="flex items-center gap-[4px] border-[1px] bg-white border-gray-300 rounded-md h-10 px-4">
          <span className="hidden sm:block">Made</span>with
          <span className="flex items-center font-semibold text-blue-600 relative h-full group">
            <span className="-z-10 absolute w-full h-full left-0 top-0 place-content-center grid group-hover:-translate-y-[100%] transition-transform duration-200 ease-in-out">
              <img src={react} className="h-7 animate-spin" alt="React logo" />
            </span>
            React
          </span>
          +
          <span className="flex items-center font-semibold text-blue-600 relative h-full group">
            <span className="-z-10 absolute w-full h-full left-0 top-0 place-content-center grid group-hover:-translate-y-[90%] transition-transform duration-200 ease-in-out">
              <img
                src={typescript}
                className="h-6 animate-bounce"
                alt="TypeScript logo"
              />
            </span>
            TypeScript
          </span>
          +
          <span className="flex items-center font-semibold text-blue-600 relative h-full group">
            <span className="-z-10 absolute w-full h-full left-0 top-0 place-content-center grid group-hover:-translate-y-[100%] transition-transform duration-200 ease-in-out">
              <img
                src={tailwind}
                className="h-7 animate-spin"
                alt="TailwindCSS logo"
              />
            </span>
            TailwindCSS
          </span>
        </p>
      </div>
      <div>
        <span className="flex gap-[3px] items-center">
          and
          <span className="material-symbols-outlined fill scale-[.9]">
            favorite
          </span>
          by
          <a
            href="https://github.com/lucadard"
            target="_blank"
            className="relative group hover:text-blue-900"
          >
            <div className="absolute w-full bottom-0 h-[2px] bg-blue-900 origin-left scale-0 group-hover:scale-100 duration-200 transition-transform"></div>
            lucadard
          </a>
        </span>
      </div>
    </section>
  )
}

export default Footer
