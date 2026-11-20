import { Canvas, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { CatmullRomCurve3, Group, Mesh, PointLight, TubeGeometry, Vector3 } from 'three'
import gsap from 'gsap'
import { asset, site } from '../../data/site'
import ProductModel, { RealProduct } from './ProductModel'

const neutral = { x: .01, y: -.29, z: -.12 }
const sessionKey = 'motrix-intro-v1'

function markIntro() {
  try {
    if (sessionStorage.getItem(sessionKey)) return false
    sessionStorage.setItem(sessionKey, 'seen')
  } catch {
    return !played
  }
  return true
}
let played = false

type Props = {
  fine: boolean
  onReady: (ready: boolean) => void
  onFailure: (failure: boolean) => void
}

function Studio({ fine, onReady, onFailure }: Props) {
  const product = useRef<Group>(null!)
  const contour = useRef<Mesh>(null!)
  const glint = useRef<PointLight>(null!)
  const { invalidate, gl } = useThree()
  const introActive = useRef(false)
  const geometry = useMemo(() => {
    const coordinates = [
      [-.02, -1.24], [.49, -1.24], [.62, -1.2], [.67, -1.09],
      [.67, .65], [.64, .82], [.53, .95], [.32, 1.11],
      [.33, 1.53], [.25, 1.56], [0, 1.56],
    ]
    const path = new CatmullRomCurve3(coordinates.map(([x, y]) => new Vector3(x, y, .018)))
    return new TubeGeometry(path, 100, .012, 5)
  }, [])
  useEffect(() => () => geometry.dispose(), [geometry])

  useEffect(() => {
    const target = product.current
    const light = glint.current
    const trace = contour.current
    const frame = requestAnimationFrame(() => onReady(true))
    const lost = (event: Event) => { event.preventDefault(); onFailure(true) }
    gl.domElement.addEventListener('webglcontextlost', lost)
    const shouldPlay = markIntro()
    played = true
    let sequence: gsap.core.Timeline | undefined
    if (shouldPlay) {
      introActive.current = true
      const progress = { value: 0 }
      const indexCount = geometry.index!.count
      trace.visible = !site.model
      geometry.setDrawRange(0, 0)
      gsap.set(target.rotation, { x: -.07, y: .74, z: -.19 })
      gsap.set(target.position, { y: -.45, z: -.7 })
      gsap.set(target.scale, { x: .79, y: .79, z: .79 })
      sequence = gsap.timeline({ onUpdate: () => invalidate(), onComplete: () => {
        introActive.current = false
        invalidate()
      } })
      sequence
        .to(progress, { value: 1, duration: .7, ease: 'power2.inOut', onUpdate: () => {
          geometry.setDrawRange(0, Math.floor(indexCount * progress.value / 30) * 30)
        } }, 0)
        .to(target.position, { y: 0, z: 0, duration: 1.48, ease: 'power3.out' }, .28)
        .to(target.scale, { x: 1, y: 1, z: 1, duration: 1.48, ease: 'power3.out' }, .28)
        .to(target.rotation, { ...neutral, duration: 1.67, ease: 'power3.out' }, .32)
        .set(trace, { visible: false }, 1.19)
        .to(light, { intensity: 8, duration: .22 }, 1.48)
        .to(light.position, { x: 1.75, duration: .82, ease: 'sine.inOut' }, 1.48)
        .to(light, { intensity: 0, duration: .48 }, 1.82)
    }
    invalidate()
    return () => {
      onReady(false)
      cancelAnimationFrame(frame)
      sequence?.kill()
      gl.domElement.removeEventListener('webglcontextlost', lost)
    }
  }, [geometry, gl, invalidate, onFailure, onReady])

  useEffect(() => {
    if (!fine) return
    const stage = gl.domElement.closest('.stage')
    if (!stage) return
    const rotation = product.current.rotation
    const move = (event: Event) => {
      if (introActive.current) return
      const pointer = event as PointerEvent
      const rect = stage.getBoundingClientRect()
      gsap.to(rotation, {
        y: neutral.y + ((pointer.clientX - rect.left) / rect.width - .5) * .25,
        x: neutral.x + ((pointer.clientY - rect.top) / rect.height - .5) * .14,
        duration: .46, overwrite: 'auto', onUpdate: () => invalidate(),
      })
    }
    const reset = () => {
      if (!introActive.current) gsap.to(rotation, { ...neutral, duration: .6, overwrite: 'auto', onUpdate: () => invalidate() })
    }
    stage.addEventListener('pointermove', move)
    stage.addEventListener('pointerleave', reset)
    return () => {
      stage.removeEventListener('pointermove', move)
      stage.removeEventListener('pointerleave', reset)
      if (!introActive.current) {
        gsap.killTweensOf(rotation)
        rotation.set(neutral.x, neutral.y, neutral.z)
        invalidate()
      }
    }
  }, [fine, gl, invalidate])

  return <>
    <ambientLight intensity={.53} />
    <directionalLight color="#fff1eb" position={[-3, 5, 4]} intensity={3.1} />
    <directionalLight color="#ff0529" position={[2, 2, -1.6]} intensity={5.5} />
    <directionalLight color="#d3dafa" position={[4, .4, 2]} intensity={.8} />
    <pointLight ref={glint} position={[-1.7, -.1, 2]} intensity={0} decay={2} />
    <group ref={product} rotation={[neutral.x, neutral.y, neutral.z]}>
      {site.model ? <RealProduct path={asset(site.model)} /> : <ProductModel />}
      <mesh ref={contour} geometry={geometry} visible={false}>
        <meshBasicMaterial color="#ff1838" toneMapped={false} />
      </mesh>
    </group>
  </>
}

export default function HeroScene(props: Props) {
  return <Canvas frameloop="demand" dpr={[1, 1.75]} camera={{ position: [0, .26, 5.55], fov: 36 }}
    gl={{ alpha: true, antialias: true }} fallback={null}>
    <Studio {...props} />
  </Canvas>
}
