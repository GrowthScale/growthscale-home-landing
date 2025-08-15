import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				heading: ['Montserrat', 'system-ui', 'sans-serif'],
				body: ['Inter', 'system-ui', 'sans-serif'],
				roboto: ['Roboto', 'system-ui', 'sans-serif'],
				'sf-pro': ['-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Helvetica Neue', 'Arial', 'system-ui', 'sans-serif'],
				'system': ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
			},
			fontSize: {
				'xs': ['0.75rem', { lineHeight: '1rem' }],
				'sm': ['0.875rem', { lineHeight: '1.25rem' }],
				'base': ['1rem', { lineHeight: '1.5rem' }],
				'lg': ['1.125rem', { lineHeight: '1.75rem' }],
				'xl': ['1.25rem', { lineHeight: '1.75rem' }],
				'2xl': ['1.5rem', { lineHeight: '2rem' }],
				'3xl': ['1.875rem', { lineHeight: '2.25rem' }],
				'4xl': ['2.25rem', { lineHeight: '2.5rem' }],
				'5xl': ['3rem', { lineHeight: '1.1' }],
				'6xl': ['3.75rem', { lineHeight: '1.1' }],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				
				/* GrowthScale Design System - Cores Oficiais */
				primary: {
					50: 'hsl(var(--primary-50))',
					100: 'hsl(var(--primary-100))',
					200: 'hsl(var(--primary-200))',
					300: 'hsl(var(--primary-300))',
					400: 'hsl(var(--primary-400))',
					500: 'hsl(var(--primary-500))',
					600: 'hsl(var(--primary-600))',  /* #004AAD - Principal */
					700: 'hsl(var(--primary-700))',  /* #003380 */
					800: 'hsl(var(--primary-800))',  /* #001F52 */
					900: 'hsl(var(--primary-900))',  /* #001025 */
					DEFAULT: 'hsl(var(--primary-600))',
					foreground: 'hsl(var(--primary-foreground))',
					hover: 'hsl(var(--primary-700))'
				},
				secondary: {
					50: 'hsl(var(--secondary-50))',
					100: 'hsl(var(--secondary-100))',
					200: 'hsl(var(--secondary-200))',
					300: 'hsl(var(--secondary-300))',
					400: 'hsl(var(--secondary-400))',
					500: 'hsl(var(--secondary-500))',  /* #FF6B00 - CTA Principal */
					600: 'hsl(var(--secondary-600))',  /* #EA580C */
					700: 'hsl(var(--secondary-700))',
					800: 'hsl(var(--secondary-800))',
					900: 'hsl(var(--secondary-900))',
					DEFAULT: 'hsl(var(--secondary-500))',
					foreground: 'hsl(var(--secondary-foreground))',
					hover: 'hsl(var(--secondary-600))'
				},
				neutral: {
					50: 'hsl(var(--neutral-50))',
					100: 'hsl(var(--neutral-100))',
					200: 'hsl(var(--neutral-200))',
					300: 'hsl(var(--neutral-300))',
					400: 'hsl(var(--neutral-400))',
					500: 'hsl(var(--neutral-500))',
					600: 'hsl(var(--neutral-600))',
					700: 'hsl(var(--neutral-700))',
					800: 'hsl(var(--neutral-800))',
					900: 'hsl(var(--neutral-900))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
					hover: 'hsl(var(--accent-hover))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',  /* #00B37E */
					foreground: 'hsl(var(--success-foreground))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',  /* #F59E0B */
					foreground: 'hsl(var(--warning-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',  /* #E63946 */
					foreground: 'hsl(var(--destructive-foreground))'
				},
				info: {
					DEFAULT: 'hsl(var(--info))',  /* #2563EB */
					foreground: 'hsl(var(--info-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Cores semânticas adicionais para evitar conflitos
				'subtle-background': 'hsl(var(--muted))',
				'subtle-foreground': 'hsl(var(--muted-foreground))',
				'strong-border': 'hsl(var(--border))',
				'button-primary-hover': 'hsl(var(--primary-hover))',
				'text-emphasis': 'hsl(var(--foreground))',
				'text-subtle': 'hsl(var(--muted-foreground))',
				'text-muted': 'hsl(var(--muted-foreground))',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"fade-in": {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				"fade-out": {
					"0%": { opacity: "1" },
					"100%": { opacity: "0" },
				},
				"slide-in-from-top": {
					"0%": { transform: "translateY(-100%)" },
					"100%": { transform: "translateY(0)" },
				},
				"slide-in-from-bottom": {
					"0%": { transform: "translateY(100%)" },
					"100%": { transform: "translateY(0)" },
				},
				"slide-in-from-left": {
					"0%": { transform: "translateX(-100%)" },
					"100%": { transform: "translateX(0)" },
				},
				"slide-in-from-right": {
					"0%": { transform: "translateX(100%)" },
					"100%": { transform: "translateX(0)" },
				},
				"scale-in": {
					"0%": { transform: "scale(0.95)", opacity: "0" },
					"100%": { transform: "scale(1)", opacity: "1" },
				},
				"scale-out": {
					"0%": { transform: "scale(1)", opacity: "1" },
					"100%": { transform: "scale(0.95)", opacity: "0" },
				},
				"confetti": {
					"0%": { transform: "translateY(0) rotate(0deg)", opacity: "1" },
					"100%": { transform: "translateY(-100vh) rotate(720deg)", opacity: "0" },
				},
				"progress": {
					"0%": { width: "0%" },
					"100%": { width: "100%" },
				},
				"pulse-soft": {
					"0%, 100%": { opacity: "1" },
					"50%": { opacity: "0.8" },
				},
				"bounce-soft": {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-5px)" },
				},
				"wiggle": {
					"0%, 100%": { transform: "rotate(-3deg)" },
					"50%": { transform: "rotate(3deg)" },
				},
				"float": {
					"0%, 100%": { transform: "translateY(0px)" },
					"50%": { transform: "translateY(-10px)" },
				},
				"glow": {
					"0%, 100%": { boxShadow: "0 0 5px rgba(0, 74, 173, 0.5)" },
					"50%": { boxShadow: "0 0 20px rgba(0, 74, 173, 0.8)" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in": "fade-in 0.5s ease-out",
				"fade-out": "fade-out 0.5s ease-out",
				"slide-in-from-top": "slide-in-from-top 0.3s ease-out",
				"slide-in-from-bottom": "slide-in-from-bottom 0.3s ease-out",
				"slide-in-from-left": "slide-in-from-left 0.3s ease-out",
				"slide-in-from-right": "slide-in-from-right 0.3s ease-out",
				"scale-in": "scale-in 0.2s ease-out",
				"scale-out": "scale-out 0.2s ease-out",
				"confetti": "confetti 3s ease-out forwards",
				"progress": "progress 2s ease-out forwards",
				"pulse-soft": "pulse-soft 2s ease-in-out infinite",
				"bounce-soft": "bounce-soft 2s ease-in-out infinite",
				"wiggle": "wiggle 1s ease-in-out infinite",
				"float": "float 3s ease-in-out infinite",
				"glow": "glow 2s ease-in-out infinite",
			},
			spacing: {
				'xs': 'var(--spacing-xs)',
				'sm': 'var(--spacing-sm)',
				'md': 'var(--spacing-md)',
				'lg': 'var(--spacing-lg)',
				'xl': 'var(--spacing-xl)',
				'2xl': 'var(--spacing-2xl)',
				'3xl': 'var(--spacing-3xl)',
				'4xl': 'var(--spacing-4xl)',
			},
			boxShadow: {
				'xs': 'var(--shadow-xs)',
				'sm': 'var(--shadow-sm)',
				'md': 'var(--shadow-md)',
				'lg': 'var(--shadow-lg)',
				'xl': 'var(--shadow-xl)',
				'elegant': 'var(--shadow-elegant)',
				'soft': 'var(--shadow-soft)',
			},
			transitionDuration: {
				'fast': 'var(--transition-fast)',
				'normal': 'var(--transition-normal)',
				'slow': 'var(--transition-slow)',
			},
			zIndex: {
				'hide': 'var(--z-hide)',
				'base': 'var(--z-base)',
				'docked': 'var(--z-docked)',
				'dropdown': 'var(--z-dropdown)',
				'sticky': 'var(--z-sticky)',
				'banner': 'var(--z-banner)',
				'overlay': 'var(--z-overlay)',
				'modal': 'var(--z-modal)',
				'popover': 'var(--z-popover)',
				'skip-link': 'var(--z-skip-link)',
				'toast': 'var(--z-toast)',
				'tooltip': 'var(--z-tooltip)',
			},
		},
	},
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
