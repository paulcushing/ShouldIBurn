import React, { useState } from 'react'

function toggleMenu(showMenu, setShowMenu) {
    setShowMenu(!showMenu)
    return
}

export const Header = () => {
    const [showMenu, setShowMenu] = useState(false)
    const classModifier = showMenu ? 'flex fixed' : 'hidden'
    return (
        <nav className="relative z-50 h-24 select-none">
            <div className="container relative flex flex-wrap items-center justify-between h-24 mx-auto overflow-hidden font-medium border-b border-gray-200 md:overflow-visible lg:justify-center sm:px-4 md:px-2">
                <div className="flex items-center justify-start w-1/4 h-full pr-4">
                    <a href="/" className="inline-block py-4 md:py-0">
                        <span className="p-1 text-xl font-black leading-none text-gray-900">
                            <span>ShouldIBurn</span>
                            <span className="text-indigo-600">?</span>
                        </span>
                    </a>
                </div>

                <div
                    className={`top-0 left-0 items-start w-full h-full p-4 text-sm bg-gray-900 bg-opacity-50 md:items-center md:w-3/4 md:absolute lg:text-base md:bg-transparent md:p-0 md:relative md:flex ${classModifier}`}
                >
                    <div className="flex-col w-full h-auto overflow-hidden bg-white rounded-lg md:bg-transparent md:overflow-visible md:rounded-none md:relative md:flex md:flex-row">
                        <a
                            href="/"
                            className="inline-flex items-center block w-auto h-16 px-6 text-xl font-black leading-none text-gray-900 md:hidden"
                        >
                            ShouldIBurn
                            <span className="text-indigo-600">?</span>
                        </a>
                        <div className="flex flex-col items-start justify-center w-full space-x-6 text-center lg:space-x-8 md:w-2/3 md:mt-0 md:flex-row md:items-center">
                            
                        </div>
                        
            <div className="flex flex-col items-start justify-end w-full mb-6 space-x-6 text-center lg:space-x-8 md:w-2/3 md:mb-0 md:mt-0 md:flex-row md:items-center">
              <a
                                href="/"
                                className="inline-block w-full py-2 mx-0 ml-6 font-medium text-left md:ml-0 md:w-auto md:px-0 md:mx-2 lg:mx-3 md:text-center"
                            >
                                Home
                            </a>
                            <a
                                href="/about"
                                className="inline-block w-full py-2 mx-0 font-medium text-left text-gray-700 md:w-auto md:px-0 md:mx-2 hover:text-indigo-600 lg:mx-3 md:text-center"
                            >
                                About
                            </a>
                            <a
                                href="/contact"
                                className="inline-block w-full py-2 mx-0 font-medium text-left text-gray-700 md:w-auto md:px-0 md:mx-2 hover:text-indigo-600 lg:mx-3 md:text-center"
                            >
                                Contact
                            </a>
            </div>
                    </div>
                </div>
                <div className="absolute right-0 flex flex-col items-center items-end justify-center w-10 h-10 bg-white rounded-full cursor-pointer md:hidden hover:bg-gray-100">
                    {!showMenu && (
                        <svg
                            className="w-6 h-6 text-gray-700"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            onClick={() => toggleMenu(showMenu, setShowMenu)}
                        >
                            <path d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    )}
                    {showMenu && (
                        <svg
                            className="w-6 h-6 text-gray-700"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => toggleMenu(showMenu, setShowMenu)}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Header
