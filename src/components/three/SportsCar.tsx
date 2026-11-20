import { useEffect, useMemo } from 'react'
import { BufferGeometry, Float32BufferAttribute, Vector3, CatmullRomCurve3 } from 'three'

type Section = [z: number, halfWidth: number, shoulder: number, crown: number]
const chassis: Section[] = [
  [-2.43, .75, .61, .69], [-2.28, 1.03, .68, .75], [-1.78, 1.18, .86, .89],
  [-1.40, 1.23, .91, .93], [-.85, 1.10, .70, .81], [0, 1.05, .55, .73],
  [.70, 1.07, .57, .69], [1.30, 1.23, .84, .74], [1.58, 1.22, .82, .69],
  [2.08, 1.06, .52, .60], [2.45, .87, .40, .46],
]
const canopy: Section[] = [
  [-1.57, .80, .77, .79], [-1.23, .80, .80, .91], [-.79, .78, .80, 1.29],
  [-.43, .78, .79, 1.38], [.0, .76, .75, 1.35], [.26, .74, .73, 1.29],
  [.58, .70, .71, 1.03], [.92, .65, .69, .71],
]
const axles = [-1.48, 1.47]
const sides = [-1, 1]
const spokes = Array.from({ length: 10 }, (_, index) => index * Math.PI / 5)
const paint = '#bc102a'

function loft(sections: Section[], glass = false) {
  const curve = new CatmullRomCurve3(sections.map(([z, width, shoulder]) => new Vector3(z, width, shoulder)))
  const roof = new CatmullRomCurve3(sections.map(([z, , , crown]) => new Vector3(z, crown, 0)))
  const positions: number[] = []
  const indices: number[] = []
  const rows = 100
  const columns = 40
  for (let row = 0; row <= rows; row++) {
    const t = row / rows
    const { x: z, y: width, z: shoulder } = curve.getPoint(t)
    const crown = roof.getPoint(t).y
    const archOffset = Math.min(...axles.map(axle => Math.abs(z - axle)))
    const arch = glass ? 0 : Math.sqrt(Math.max(0, .49 ** 2 - archOffset ** 2))
    for (let column = 0; column <= columns; column++) {
      const angle = column / columns * Math.PI * 2
      const s = Math.sin(angle)
      const c = Math.cos(angle)
      const lower = glass ? shoulder - .07 : .22 + arch * 1.12 * Math.abs(c) ** 5
      const x = width * c * (glass && s > 0 ? 1 - .28 * s : 1)
      const y = s >= 0 ? shoulder + (crown - shoulder) * s ** .72 : shoulder + (shoulder - lower) * s
      positions.push(x, y, z)
      if (row < rows && column < columns) {
        const a = row * (columns + 1) + column
        const b = a + columns + 1
        indices.push(a, a + 1, b, a + 1, b + 1, b)
      }
    }
  }
  for (const end of [0, rows]) {
    const [z, , shoulder] = sections[end === 0 ? 0 : sections.length - 1]
    const base = end * (columns + 1)
    const center = positions.length / 3
    positions.push(0, shoulder, z)
    for (let column = 0; column < columns; column++) {
      const a = base + column
      if (end === 0) indices.push(center, a + 1, a)
      else indices.push(center, a, a + 1)
    }
  }
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()
  return geometry
}

function Strip({ points, color, light = false, radius = .015 }: {
  points: [number, number, number][]
  color: string
  light?: boolean
  radius?: number
}) {
  const curve = useMemo(() => new CatmullRomCurve3(points.map(point => new Vector3(...point))), [points])
  return <mesh>
    <tubeGeometry args={[curve, 28, radius, 6, false]} />
    {light ? <meshBasicMaterial color={color} toneMapped={false} /> : <meshStandardMaterial color={color} roughness={.31} />}
  </mesh>
}

function Wheel({ side, z }: { side: number; z: number }) {
  return <group position={[side * 1.05, .44, z]} rotation-z={-side * Math.PI / 2}>
    <mesh>
      <cylinderGeometry args={[.435, .435, .30, 48]} />
      <meshStandardMaterial color="#111114" roughness={.94} />
    </mesh>
    <mesh position-y={.14} rotation-x={-Math.PI / 2}>
      <torusGeometry args={[.367, .060, 12, 48]} />
      <meshStandardMaterial color="#111113" roughness={.78} />
    </mesh>
    <mesh position-y={.15} rotation-x={-Math.PI / 2}>
      <torusGeometry args={[.318, .013, 8, 48]} />
      <meshStandardMaterial color="#8a909c" metalness={.75} roughness={.22} />
    </mesh>
    <mesh position-y={.155}>
      <cylinderGeometry args={[.302, .302, .012, 40]} />
      <meshStandardMaterial color="#151519" roughness={.4} />
    </mesh>
    {spokes.map(angle => <group key={angle} rotation-y={angle}>
      <mesh position={[.191, .166, .017]} rotation-y={.23}>
        <boxGeometry args={[.237, .026, .031]} />
        <meshStandardMaterial color="#686c76" metalness={.78} roughness={.24} />
      </mesh>
    </group>)}
    <mesh position-y={.185}>
      <cylinderGeometry args={[.077, .077, .045, 20]} />
      <meshStandardMaterial color="#b21129" metalness={.5} roughness={.35} />
    </mesh>
  </group>
}

export default function SportsCar() {
  const body = useMemo(() => loft(chassis), [])
  const glass = useMemo(() => loft(canopy, true), [])
  useEffect(() => () => { body.dispose(); glass.dispose() }, [body, glass])
  return <group>
    <mesh geometry={body}>
      <meshPhysicalMaterial color={paint} metalness={.64} roughness={.26} clearcoat={1} clearcoatRoughness={.13} side={2} />
    </mesh>
    <mesh geometry={glass}>
      <meshPhysicalMaterial color="#151922" metalness={.45} roughness={.17} clearcoat={1} side={2} />
    </mesh>
    <mesh position={[0, .337, 2.39]}>
      <boxGeometry args={[1.56, .148, .14]} />
      <meshStandardMaterial color="#090a0f" roughness={.38} />
    </mesh>
    <mesh position={[0, .245, 2.31]}>
      <boxGeometry args={[1.84, .046, .29]} />
      <meshStandardMaterial color="#16171d" roughness={.25} metalness={.45} />
    </mesh>
    <mesh position={[0, .48, -2.275]}>
      <boxGeometry args={[1.66, .18, .18]} />
      <meshStandardMaterial color="#101016" roughness={.38} />
    </mesh>
    {sides.map(side => <group key={side}>
      {axles.map(z => <Wheel key={z} side={side} z={z} />)}
      <mesh position={[side * .84, .79, .43]} rotation-z={side * 1.1}>
        <capsuleGeometry args={[.072, .13, 5, 10]} />
        <meshPhysicalMaterial color={paint} metalness={.5} roughness={.24} clearcoat={1} />
      </mesh>
      <Strip light color="#f7f1ea" radius={.022} points={[[side * .51, .493, 2.455], [side * .78, .505, 2.32], [side * 1.006, .56, 2.11], [side * 1.061, .65, 1.94]]} />
      <Strip light color="#ff244b" radius={.019} points={[[side * .14, .64, -2.442], [side * .57, .64, -2.444], [side * .80, .645, -2.36], [side * .98, .666, -2.24]]} />
      <Strip color="#490813" radius={.009} points={[[side * .48, .49, 2.38], [side * .45, .60, 1.83], [side * .44, .70, 1.27], [side * .45, .715, .88]]} />
    </group>)}
  </group>
}



