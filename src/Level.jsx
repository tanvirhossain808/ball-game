

;
import BlockStart, { BlockAxe, BlockEnd, BlockLimbo, BlockSpinner } from "./Block/BlockStart";

const Level = () => {
    return (
        <>

            <BlockStart position={[0, 0, 16]} />
            <BlockSpinner position={[0, 0, 12]} />
            <BlockLimbo position={[0, 0, 8]} />
            <BlockAxe position={[0, 0, 4]} />
            <BlockEnd position={[0, 0, 0]} />
            {/* <BlockStart position={[0, 0, 0]} /> */}
        </>
    );
};

export default Level;