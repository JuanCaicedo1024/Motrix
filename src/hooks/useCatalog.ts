import { useEffect, useState } from 'react'
import { asset, site } from '../data/site'

export function useCatalog() {
  const [url, setUrl] = useState('')
  useEffect(() => {
    if (!site.catalog) return
    const controller = new AbortController()
    const path = asset(site.catalog)
    fetch(path, { method: 'HEAD', signal: controller.signal })
      .then(response => {
        if (response.ok && response.headers.get('content-type')?.includes('application/pdf')) setUrl(path)
      })
      .catch(() => {})
    return () => controller.abort()
  }, [])
  return url
}
