import * as THREE from "three"
import { BoxGeometry } from "three";

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


export const BlockSpinner = ({ position = [0, 0, 0] }) => {
    return (
        <group position={position}>
            <mesh geometry={boxGeometry} material={floorMaterial} position={[0, -0.1, 0]}
                scale={[4, 0.2, 4]}
                receiveShadow



            />
        </group>
    );
}