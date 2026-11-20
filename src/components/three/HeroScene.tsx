import { Canvas, useThree } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { useEffect, useMemo, useRef } from 'react'
import { CanvasTexture, Group, SpotLight } from 'three'
import gsap from 'gsap'
import { asset, site } from '../../data/site'
import ProductModel, { RealProduct } from './ProductModel'
import SportsCar from './SportsCar'

const neutral = -.32
let played = false

function claimIntro() {
  if (played) return false
  played = true
  try {
    if (sessionStorage.getItem('motrix-intro-v2')) return false
    sessionStorage.setItem('motrix-intro-v2', 'seen')
  } catch { /* Keep the in-memory session flag. */ }
  return true
}

type Props = {
  fine: boolean
  onReady: (ready: boolean) => void
  onFailure: (failure: boolean) => void
}

function FloorShadows() {
  const shadow = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 128
    const context = canvas.getContext('2d')!
    const fade = context.createRadialGradient(64, 64, 10, 64, 64, 64)
    fade.addColorStop(0, 'rgba(0,0,0,.95)')
    fade.addColorStop(.52, 'rgba(0,0,0,.68)')
    fade.addColorStop(1, 'rgba(0,0,0,0)')
    context.fillStyle = fade
    context.fillRect(0, 0, 128, 128)
    return new CanvasTexture(canvas)
  }, [])
  useEffect(() => () => shadow.dispose(), [shadow])
  return <>
    <mesh position-y={-.025} rotation={[-Math.PI / 2, 0, -.32]}>
      <planeGeometry args={[3.7, 6.7]} />
      <meshBasicMaterial map={shadow} transparent depthWrite={false} />
    </mesh>
    <mesh position={[2.42, -.029, .05]} rotation-x={-Math.PI / 2}>
      <planeGeometry args={[1.8, 1.6]} />
      <meshBasicMaterial map={shadow} transparent depthWrite={false} />
    </mesh>
  </>
}

function Studio({ fine, onReady, onFailure }: Props) {
  const car = useRef<Group>(null!)
  const rim = useRef<SpotLight>(null!)
  const moving = useRef(false)
  const { invalidate, gl } = useThree()

  useEffect(() => {
    const target = car.current
    const light = rim.current
    const frame = requestAnimationFrame(() => onReady(true))
    const lost = (event: Event) => { event.preventDefault(); onFailure(true) }
    gl.domElement.addEventListener('webglcontextlost', lost)
    let sequence: gsap.core.Timeline | undefined
    if (claimIntro()) {
      moving.current = true
      gsap.set(target.rotation, { y: -1.02 })
      gsap.set(target.position, { x: .48, z: -.75 })
      gsap.set(light, { intensity: 0 })
      sequence = gsap.timeline({
        onUpdate: () => invalidate(),
        onComplete: () => { moving.current = false; invalidate() },
      })
      sequence
        .to(light, { intensity: 175, duration: .35 }, 0)
        .to(light.position, { x: 4, duration: 1.05, ease: 'sine.inOut' }, .08)
        .to(target.position, { x: 0, z: 0, duration: 1.82, ease: 'power3.out' }, .18)
        .to(target.rotation, { y: neutral, duration: 2.1, ease: 'expo.out' }, .26)
        .to(light, { intensity: 28, duration: .52 }, 1.45)
        .to(light.position, { x: -1.8, duration: .48 }, 1.92)
    }
    invalidate()
    return () => {
      onReady(false)
      cancelAnimationFrame(frame)
      sequence?.kill()
      gl.domElement.removeEventListener('webglcontextlost', lost)
    }
  }, [gl, invalidate, onFailure, onReady])

  useEffect(() => {
    if (!fine) return
    const stage = gl.domElement.closest('.stage')
    if (!stage) return
    const rotation = car.current.rotation
    const move = (event: Event) => {
      if (moving.current) return
      const pointer = event as PointerEvent
      const rect = stage.getBoundingClientRect()
      gsap.to(rotation, {
        y: neutral + ((pointer.clientX - rect.left) / rect.width - .5) * .15,
        duration: .55, overwrite: 'auto', onUpdate: () => invalidate(),
      })
    }
    const reset = () => {
      if (!moving.current) gsap.to(rotation, { y: neutral, duration: .65, overwrite: 'auto', onUpdate: () => invalidate() })
    }
    stage.addEventListener('pointermove', move)
    stage.addEventListener('pointerleave', reset)
    return () => {
      stage.removeEventListener('pointermove', move)
      stage.removeEventListener('pointerleave', reset)
      if (!moving.current) gsap.killTweensOf(rotation)
    }
  }, [fine, gl, invalidate])

  return <>
    <ambientLight intensity={.55} />
    <directionalLight color="#ffefe7" position={[-3, 5, 4]} intensity={2.2} />
    <directionalLight color="#ff193b" position={[3, 2, -4]} intensity={3.2} />
    <spotLight ref={rim} position={[-1.8, 3, 4]} intensity={28} color="#ffe5db" angle={.5} penumbra={.85} />
    <Environment resolution={128}>
      <Lightformer intensity={3} position={[0, 5, 0]} rotation-x={Math.PI / 2} scale={[8, 2, 1]} />
      <Lightformer intensity={2} position={[3.5, 2, 1]} rotation-y={Math.PI / 2} scale={[6, 1.1, 1]} />
      <Lightformer intensity={3} color="#ff123b" position={[-4, 1, -2]} rotation-y={-Math.PI / 2} scale={[5, 2, 1]} />
    </Environment>
    <group position-y={-.48}>
      <FloorShadows />
      <group ref={car} rotation-y={neutral}><SportsCar /></group>
      <group position={[2.42, .45, .05]} rotation={[.02, -.16, -.09]} scale={.41}>
        {site.model ? <RealProduct path={asset(site.model)} /> : <ProductModel />}
      </group>
    </group>
  </>
}

export default function HeroScene(props: Props) {
  return <Canvas frameloop="demand" dpr={[1, 1.65]} camera={{ position: [4.7, 2.28, 6.7], fov: 33 }}
    gl={{ alpha: true, antialias: true }} fallback={null}>
    <Studio {...props} />
  </Canvas>
}



