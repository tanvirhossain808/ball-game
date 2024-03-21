
// import { OrbitControls } from '@react-three/drei'
import Lights from './Lights.jsx'
import Level from './Level.jsx'
import { Debug, Physics } from '@react-three/rapier'
import Player from './Player.jsx'
import useGame from './Stores/useGame.js'
import Effect from './Effect.jsx'

export default function Experience() {
    const blocksCount = useGame(state => state.blocksCount)
    const blocksSeed = useGame(state => state.blocksSeed)
    console.log(blocksCount, 'df');
    return <>
        <color args={["#252731"]} attach="background" />
        {/* <OrbitControls makeDefault /> */}
        <Physics>
            <Lights />
            {/* <Debug /> */}

            <Level count={blocksCount} seed={blocksSeed} />
            <Player />
        </Physics>
        <Effect />

    </>
}