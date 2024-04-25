import { useRef, useState } from "react"
import { toast } from "sonner"

function validarURL(url: string): boolean {
  // Expresión regular para validar una URL
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+\.[a-zA-Z]{2,}(\/\S*)?$/

  // Comprobamos si la URL coincide con la expresión regular
  return urlRegex.test(url)
}

export default function ShorterURL({ userId }: {
  userId?: number
}) {
  const [url, setUrl] = useState<string>()
  const [error, setError] = useState<string>()
  const shortenedUrlRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!url) {
      setError('Debes escribir una URL')
      return
    }

    if (!validarURL(url)) {
      setError('Debes escribir una URL válida')
      return
    }

    try {
      const res = await fetch('/api/shorter-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: url,
          userId: userId ?? null
        })
      })

      const body = await res.json()

      const shortenedUrl = body.shortenedUrl

      if (!shortenedUrl) {
        setError('Error al acortar la URL, inténtalo de nuevo más tarde')
        return
      }

      shortenedUrlRef.current!.value = shortenedUrl
      
      setError(undefined)
    } catch {
      setError('Error al acortar la URL, inténtalo de nuevo más tarde')
    }
  }

  const handleCopy = () => {
    try {
      window.navigator.clipboard.writeText(shortenedUrlRef.current!.value)
    
      toast.success('URL copiada al portapapeles')
    } catch (e) {
      toast.error('Error al copiar la URL')
    }
  }

  return (
    <form onSubmit={handleSubmit} id="shorter-url-form">
      {
        error && (
          <span className="shorter-url-form-error">{error}</span>
        )
      }

      <input
        className="shorter-url-form-input"
        type="url"
        placeholder="Escribe aquí tu URL"
        defaultValue={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button
        className="shorter-url-form-button"
        type="submit"
      >
        Acortar URL
      </button>

      <input
        ref={shortenedUrlRef}
        className="shorter-url-form-input"
        disabled
        type="url"
      />

      <button
        onClick={handleCopy}
        className="shorter-url-form-button"
        type="button"
      >
        Copiar URL
      </button>
    </form>
  )
}