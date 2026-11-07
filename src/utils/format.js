const dateFormat = new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
})

export function formatDate(iso) {
    if (!iso) return null
    const date = new Date(`${iso}T00:00:00`)
    return Number.isNaN(date.getTime()) ? null : dateFormat.format(date)
}

const languages = new Intl.DisplayNames(['fr'], { type: 'language' })

export function languageName(code) {
    if (!code) return null
    try {
        const name = languages.of(code)
        return name.charAt(0).toUpperCase() + name.slice(1)
    } catch {
        return code
    }
}

// "J.R.R. Tolkien" devient "JT"
export function initials(name) {
    return name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0].toUpperCase())
        .join('')
}