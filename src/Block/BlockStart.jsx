import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useState } from "react";
import { useRef } from "react";
import * as THREE from "three"

THREE.ColorManagement.legacyMode = false

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const floorMaterial = new THREE.MeshStandardMaterial({ color: "limegreen" })

const floor2Material = new THREE.MeshStandardMaterial({ color: "greenyellow" })

const obstacleMaterial = new THREE.MeshStandardMaterial({ color: "orangered" })
const wallMaterial = new THREE.MeshStandardMaterial({ color: "slategrey" })
const BlockStart = ({ position = [0, 0, 0] }) => {
    return (
        <group position={position}>
            <mesh geometry={boxGeometry} material={floorMaterial} position={[0, -0.1, 0]}
                scale={[4, 0.2, 4]}
                receiveShadow



            />
        </group>
    );
};
export default BlockStart;
export const Bounds = ({ length = 1 }) => {
    return (
        <>
            <RigidBody
                type="fixed"
                friction={0}
                restitution={0.2}

            >
                <mesh
                    position={[2.15, 0.75, -(length * 2) + 2]}
                    geometry={boxGeometry}
                    material={wallMaterial}
                    scale={[0.3, 1.5, 4 * length]}
                    castShadow

                />
                <mesh
                    position={[-2.15, 0.75, -(length * 2) + 2]}
                    geometry={boxGeometry}
                    material={wallMaterial}
                    scale={[0.3, 1.5, 4 * length]}
                    receiveShadow
                />
                <mesh
                    position={[0, .75, - (length * 4) + 2]}
                    geometry={boxGeometry}
                    material={wallMaterial}
                    scale={[4, 1.5, .3]}
                    receiveShadow
                />
                <CuboidCollider args={[2, 0.1, 2 * length]}
                    position={[0, -0.1, -(length * 2) + 2]}
                    restitution={0.2}
                    friction={1}
                />
            </RigidBody>


        </>
    )


}


export const BlockEnd = ({ position = [0, 0, 0] }) => {
    const hamburger = useGLTF("./hamburger.glb")
    hamburger.scene.children.forEach((mesh) => {
        mesh.castShadow = true
    })
    return (
        <group position={position}>
            <mesh geometry={boxGeometry} material={floorMaterial} position={[0, 0, 0]}
                scale={[4, 0.2, 4]}
                receiveShadow
            />
            <RigidBody type="fixed" colliders="hull"
                restitution={0.2}
                friction={0}
                position={[0, 0.25, 0]}
            >
                <primitive object={hamburger.scene} scale={0.2} />
            </RigidBody>
        </group>
    );
};


export const BlockSpinner = ({ position = [0, 0, 0] }) => {
    const obstacleRef = useRef(null)
    const [speed] = useState(() => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1))
    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        const rotation = new THREE.Quaternion()
        rotation.setFromEuler(new THREE.Euler(0, time * speed, 0))
        obstacleRef.current.setNextKinematicRotation(rotation)

    })
    return (

        <group position={position}>
            <mesh geometry={boxGeometry} material={floor2Material} position={[0, -0.1, 0]}
                scale={[4, 0.2, 4]}
                receiveShadow

            />
            <RigidBody
                ref={obstacleRef}
                type="kinematicPosition"
                position={[0, 0.3, 0]}
                restitution={0.2}
                friction={0}

            >
                <mesh geometry={boxGeometry} material={obstacleMaterial} scale={[3.5, 0.3, 0.3]}
                    castShadow
                    receiveShadow
                />
            </RigidBody>
        </group>
    );
}


export const BlockLimbo = ({ position = [0, 0, 0] }) => {
    const obstacleRef = useRef(null)
    const [timeOffset] = useState(() => Math.random() * Math.PI * 2)
    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        const y = Math.sin(time + timeOffset) + 1.15
        obstacleRef.current.setNextKinematicTranslation({
            x: position[0],
            y: position[1] + y,
            z: position[2]
        })

    })
    return (

        <group position={position}>
            <mesh geometry={boxGeometry} material={floor2Material} position={[0, -0.1, 0]}
                scale={[4, 0.2, 4]}
                receiveShadow

            />
            <RigidBody
                ref={obstacleRef}
                type="kinematicPosition"
                position={[0, 0.3, 0]}
                restitution={0.2}
                friction={0}

            >
                <mesh geometry={boxGeometry} material={obstacleMaterial} scale={[3.5, 0.3, 0.3]}
                    castShadow
                    receiveShadow
                />
            </RigidBody>
        </group>
    );
}


export const BlockAxe = ({ position = [0, 0, 0] }) => {
    const obstacleRef = useRef(null)
    const [timeOffset] = useState(() => Math.random() * Math.PI * 2)
    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        const x = Math.sin(time + timeOffset) * 1.25
        obstacleRef.current.setNextKinematicTranslation({
            x: position[0] + x,
            y: position[1] + 0.75,
            z: position[2]
        })
    })
    return (

        <group position={position}>
            <mesh geometry={boxGeometry} material={floor2Material} position={[0, -0.1, 0]}
                scale={[4, 0.2, 4]}
                receiveShadow

            />
            <RigidBody
                ref={obstacleRef}
                type="kinematicPosition"
                position={[0, 0.3, 0]}
                restitution={0.2}
                friction={0}

            >
                <mesh geometry={boxGeometry} material={obstacleMaterial} scale={[1.5, 1.5, 0.3]}
                    castShadow
                    receiveShadow
                />
            </RigidBody>
        </group>
    );
}