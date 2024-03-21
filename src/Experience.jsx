
// import { OrbitControls } from '@react-three/drei'
import Lights from './Lights.jsx'
import Level from './Level.jsx'
import { Debug, Physics } from '@react-three/rapier'
import Player from './Player.jsx'
import useGame from './Stores/useGame.js'

export default function Experience() {
    const blocksCount = useGame(state => state.blocksCount)
    console.log(blocksCount, 'df');
    return <>
        <color args={["black"]} attach="background" />
        {/* <OrbitControls makeDefault /> */}
        <Physics>
            <Lights />
            <Debug />

            <Level count={blocksCount} />
            <Player />
        </Physics>


    </>
}