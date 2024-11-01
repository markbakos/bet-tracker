import { default as tailwindcssAnimate } from 'tailwindcss-animate';

export default {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				'gray': '#4D4D4D',
				'white': '#FAF9F6',
			}
		}
	},
	plugins: [tailwindcssAnimate],
}