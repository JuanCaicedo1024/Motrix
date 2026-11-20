import { asset, site } from '../../data/site'

export default function SceneFallback({ hidden }: { hidden: boolean }) {
  return <img className={`scene-fallback ${hidden ? 'scene-hidden' : ''}`} src={asset(site.fallback)} alt="" fetchPriority="high" />
}
