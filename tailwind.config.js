const colors = require('tailwindcss/colors')

module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'media', // or 'media' or 'class'
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: colors.black,
            white: colors.white,
            gray: colors.gray,
            amber: colors.amber,
            indigo: colors.indigo,
            yellow: colors.yellow,
            fire: {
                '50': '#fcf6ee',
                '100': '#f7e7ce',
                '200': '#eecc99',
                '300': '#e5ae64',
                '400': '#de9341',
                '500': '#d6742a',
                '600': '#b15120',
                '700': '#9d3d20',
                '800': '#803120',
                '900': '#6a2a1d',
                '950': '#3c140c',
            },
        },
        extend: {},
    },
    plugins: [],
}
