import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody, useRapier } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import useGame from "./Stores/useGame";

const Player = () => {
    const bodyRef = useRef(null)
    const [subscribeKeys, getKeys] = useKeyboardControls()
    const [smoothedCameraPosition] = useState(() => new THREE.Vector3(10, 10, 10))
    const [smoothCameraTarget] = useState(() => new THREE.Vector3())




    const { rapier, world } = useRapier()
    const rapierWorld = world.raw()

    const { start, end, blocksCount, restart } = useGame()
    const jump = () => {


        const origin = bodyRef.current.translation()
        origin.y -= 0.31

        const direction = {
            x: 0,
            y: -1,
            z: 0
        }
        const ray = new rapier.Ray(origin, direction)
        const hit = rapierWorld.castRay(ray, 10, true)

        if (hit.toi < 0.15) {
            bodyRef.current.applyImpulse({
                x: 0, y: 0.5, z: 0
            })
        }


    }

    // const reset = () =>

    useEffect(() => {

        const unsubscribeReset = useGame.subscribe(
            (state) => state.phase,
            (value) => {
                console.log("phase change to", value);
            }
        )

        const unsubscribeJump = subscribeKeys(
            (state) => state.jump,
            (value) => {
                if (value === "ready") {
                    restart()
                }


            },


        )

        const unsubscribeAny = subscribeKeys(
            () => {
                start()
            }
        )

        return () => {
            unsubscribeJump()
            unsubscribeAny()
            unsubscribeAny()
        }
    }, [])


    useFrame((state, delta) => {
        const { forward, backward, leftward, rightward } = getKeys()

        const impulseStrength = 0.6 * delta
        const torqueStrength = 0.2 * delta

        const impulse = {
            x: 0, y: 0, z: 0
        }
        const torque = {
            x: 0,
            y: 0,
            z: 0
        }
        if (forward) {
            impulse.z -= impulseStrength
            torque.x -= torqueStrength
        }
        if (rightward) {
            impulse.x += impulseStrength
            torque.z -= torqueStrength
        }
        if (backward) {
            impulse.z += impulseStrength
            torque.x += torqueStrength
        }
        if (leftward) {
            impulse.x -= impulseStrength
            torque.z += torqueStrength
        }

        bodyRef.current.applyImpulse(impulse)
        bodyRef.current.applyTorqueImpulse(torque)


        const bodyPosition = bodyRef.current.translation()

        const cameraPosition = new THREE.Vector3()
        cameraPosition.copy(bodyPosition)
        cameraPosition.z += 2.25
        cameraPosition.y += 0.65

        const cameraTarget = new THREE.Vector3()
        cameraTarget.copy(bodyPosition)
        cameraTarget.y += 0.25
        smoothedCameraPosition.lerp(cameraPosition, 5 * delta)
        smoothCameraTarget.lerp(
            cameraTarget, 5 * delta
        )

        state.camera.position.copy(smoothedCameraPosition)

        state.camera.lookAt(smoothCameraTarget)


        if (bodyPosition.z < -(blocksCount * 4 + 2)) {
            end()
        }

        if (bodyPosition.y < -4) restart()

    })
    return (
        <RigidBody
            ref={bodyRef}
            colliders="ball"
            restitution={0.2}
            friction={2}
            position={[0, 1, 0]}
            linearDamping={0.5}
            angularDamping={0.5}

        >
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