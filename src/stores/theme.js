import { ref } from 'vue'
import { defineStore } from 'pinia'
import { textColors, onColor } from '../utils/color'

const VARIABLES = [
    '--bg', '--primary', '--accent', '--on-accent',
    '--text', '--text-muted', '--font-heading', '--font-body',
]

export const useThemeStore = defineStore('theme', () => {
    const active = ref(false)

    // Applique le thème d'un genre (objet `theme` renvoyé par l'API)
    function apply(theme) {
        const style = document.documentElement.style
        const { text, muted } = textColors(theme.secondary_color)

        style.setProperty('--bg', theme.secondary_color)
        style.setProperty('--primary', theme.primary_color)
        style.setProperty('--accent', theme.accent_color)
        style.setProperty('--on-accent', onColor(theme.accent_color))
        style.setProperty('--text', text)
        style.setProperty('--text-muted', muted)
        style.setProperty('--font-heading', `'${theme.heading_font}', serif`)
        style.setProperty('--font-body', `'${theme.body_font}', sans-serif`)
        active.value = true
    }

    // Retour au thème neutre défini dans tokens.css
    function reset() {
        const style = document.documentElement.style
        VARIABLES.forEach((name) => style.removeProperty(name))
        active.value = false
    }

    return { active, apply, reset }
})