

;
import BlockStart, { BlockLimbo, BlockSpinner } from "./Block/BlockStart";

const Level = () => {
    return (
        <>

            <BlockStart position={[0, 0, 8]} />
            <BlockSpinner position={[0, 0, 4]} />
            <BlockLimbo position={[0, 0, 0]} />
        </>
    );
};

export default Level;