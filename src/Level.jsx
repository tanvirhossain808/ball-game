const Bounds = ({ length = 1 }) => {


}


import { useMemo } from "react";
import BlockStart, { BlockAxe, BlockEnd, BlockLimbo, BlockSpinner } from "./Block/BlockStart";

const Level = ({ count = 5, types = [BlockSpinner, BlockAxe, BlockLimbo] }) => {
    const blocks = useMemo(() => {
        const blocks = []


        for (let i = 0; i < count; i++) {
            const type = types[Math.floor(Math.random() * types.length)]
            blocks.push(type)
        }

        return blocks

    }, [count, types])
    console.log(blocks);
    return (
        <>

            {/* <BlockStart position={[0, 0, 16]} />
            <BlockSpinner position={[0, 0, 12]} />
            <BlockLimbo position={[0, 0, 8]} />
            <BlockAxe position={[0, 0, 4]} />
            <BlockEnd position={[0, 0, 0]} /> */}
            <BlockStart position={[0, 0, 0]} />
            {
                blocks.map((Block, index) => (
                    <Block key={index} position={[0, 0, -(index + 1) * 4]} />
                ))
            }
            <BlockEnd position={[0, 0, -(count + 1) * 4]} />
            <Bounds length={count + 2} />
        </>
    );
};

export default Level;