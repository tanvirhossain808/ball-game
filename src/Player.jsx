import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";

const Player = () => {
    const bodyRef = useRef(null)
    const [subscribeKeys, getKeys] = useKeyboardControls()
    useFrame((state) => {
        const { forward, backward, leftward, rightward } = getKeys()
        const impulse = {
            x: 0, y: 0, z: 0
        }
        const torque = {
            x: 0,
            y: 0,
            z: 0
        }

        bodyRef.current.applyImpulse(impulse)
        bodyRef.current.applyTorqueImpulse(torque)
    })
    return (
        <RigidBody
            ref={bodyRef}
            colliders="ball"
            restitution={0.2}
            friction={2}
            position={[0, 1, 0]}>
            <mesh castShadow>
                <icosahedronGeometry args={[0.3, 1]} />
                <meshStandardMaterial
                    flatShading
                    color="mediumpurple" />

            </mesh>
        </RigidBody>



    )
};

export default Player;