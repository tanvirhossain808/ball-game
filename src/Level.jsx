

;
import BlockStart, { BlockSpinner } from "./Block/BlockStart";

const Level = () => {
    return (
        <>

            <BlockStart position={[0, 0, 4]} />
            <BlockSpinner position={[0, 0, 0]} />
        </>
    );
};

export default Level;