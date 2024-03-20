
import { OrbitControls } from '@react-three/drei'
import Lights from './Lights.jsx'
import Level from './Level.jsx'
import { Debug, Physics } from '@react-three/rapier'

export default function Experience() {
    return <>
        <color args={["black"]} attach="background" />
        <OrbitControls makeDefault />
        <Physics>
            <Lights />
            <Debug />

            <Level />

        </Physics>


    </>
}