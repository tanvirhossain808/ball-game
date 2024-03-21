import { useKeyboardControls } from "@react-three/drei";
import useGame from "./Stores/useGame";
import { useEffect, useRef } from "react";
import { addEffect } from "@react-three/fiber";

const Interface = () => {
    const { restart, phase } = useGame()
    // const { forward, backward, leftward, rightward, jump } = useKeyboardControls((state) => state)
    const { forward, backward, leftward, rightward, jump } = useKeyboardControls()
    const timeRef = useRef(null)
    useEffect(() => {
        const unsubscribeEffect = addEffect(() => {
            const state = useGame.getState()
            let elapsedTime = 0
            if (state.phase === "playing") elapsedTime = Date.now() - state.startTime

            else if (state.phase === "ended") elapsedTime = state.endTime - state.startTime
            elapsedTime /= 1000
            elapsedTime = elapsedTime.toFixed(2)
            timeRef.current.textContent = elapsedTime

        })
        return () => {
            useEffect()
        }
    }, [])
    return (
        <div className="interface">
            <div className="time" ref={timeRef}>
                0.00
            </div>
            {
                phase === "ended" && <div className="restart" onClick={restart}>
                    Restart
                </div>
            }

            <div className="controls">
                <div className="raw">
                    <div className={`key ${forward ? 'active' : ''}`}></div>
                </div>
                <div className="raw">
                    <div className={`key ${leftward ? 'active' : ''}`}></div>
                    <div className={`key ${backward ? 'active' : ''}`}></div>
                    <div className={`key ${rightward ? 'active' : ''}`}></div>
                </div>
                <div className="raw">
                    <div className={`key large ${jump ? 'active' : ''}`}></div>
                </div>
            </div>



        </div>
    );
};

export default Interface;