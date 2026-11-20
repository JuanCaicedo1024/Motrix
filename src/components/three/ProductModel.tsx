import { useGLTF, useTexture } from '@react-three/drei'
import { useEffect, useMemo } from 'react'
import { CanvasTexture, SRGBColorSpace, Vector2 } from 'three'
import { asset, site } from '../../data/site'

const body = [
  [0, -1.24], [.51, -1.24], [.60, -1.21], [.65, -1.14],
  [.66, -1.03], [.66, .65], [.65, .77], [.61, .86],
  [.53, .94], [.38, 1.04], [.31, 1.10], [.28, 1.19], [0, 1.19],
].map(([x, y]) => new Vector2(x, y))
const labelAngle = 1.626
const labelRadius = .665
const labelHeight = labelRadius * labelAngle * 302 / 1070
const ribs = Array.from({ length: 56 }, (_, index) => index * Math.PI / 28)

export function RealProduct({ path }: { path: string }) {
  const { scene } = useGLTF(path)
  return <primitive object={scene} />
}

export default function ProductModel() {
  const logo = useTexture(asset(site.logo))
  const label = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1070
    canvas.height = 302
    const context = canvas.getContext('2d')!
    context.drawImage(logo.image, 100, 478, 1070, 302, 0, 0, 1070, 302)
    const texture = new CanvasTexture(canvas)
    texture.colorSpace = SRGBColorSpace
    texture.anisotropy = 8
    return texture
  }, [logo])
  useEffect(() => () => label.dispose(), [label])

  return <>
    <mesh>
      <latheGeometry args={[body, 96]} />
      <meshStandardMaterial color="#17181b" roughness={.43} metalness={.12} />
    </mesh>
    <mesh position-y={1.20}>
      <cylinderGeometry args={[.325, .326, .095, 64]} />
      <meshStandardMaterial color="#df102d" metalness={.3} roughness={.33} />
    </mesh>
    <mesh position-y={1.39}>
      <cylinderGeometry args={[.318, .325, .32, 64]} />
      <meshStandardMaterial color="#17171a" roughness={.57} />
    </mesh>
    {ribs.map(angle => <mesh key={angle} position={[Math.sin(angle) * .322, 1.39, Math.cos(angle) * .322]} rotation-y={angle}>
      <boxGeometry args={[.014, .278, .014]} />
      <meshStandardMaterial color="#222226" roughness={.61} />
    </mesh>)}
    <mesh position-y={-.29}>
      <cylinderGeometry args={[.663, .663, 1.07, 96, 1, true]} />
      <meshStandardMaterial color="#09090b" roughness={.54} />
    </mesh>
    <mesh position-y={-.18}>
      <cylinderGeometry args={[labelRadius, labelRadius, labelHeight, 48, 1, true, -labelAngle / 2, labelAngle]} />
      <meshStandardMaterial map={label} emissiveMap={label} emissive="#ffffff" emissiveIntensity={.34} roughness={.58} />
    </mesh>
    <mesh position-y={-.74}>
      <cylinderGeometry args={[.665, .665, .022, 96, 1, true]} />
      <meshStandardMaterial color="#cc112b" emissive="#840015" emissiveIntensity={.34} />
    </mesh>
  </>
}

