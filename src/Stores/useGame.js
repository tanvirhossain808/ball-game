import create from "zustand"
import { subscribeWithSelector } from "zustand/middleware"
export default create(subscribeWithSelector((set) => {
    return {
        blocksCount: 3,
        phase: "ready",
        startTime: 0,
        endTime: 0,
        start: (state) => {
            set((state) => {
                if (state.phase === "ready") {
                    return { phase: "playing", startTime: Date.now() }
                }
                return {

                }

            })
        },
        restart: () => {
            set((state) => {
                if (state.phase === "playing" || "ended") {
                    // console.log('reset');
                    return {
                        phase: "ready"
                    }
                }
                return {}


            })
        },
        end: () => {
            set((state) => {
                if (state.phase === "playing") {
                    return {
                        phase: "ended", endTime: Date.now()
                    }
                }
                return {}

            })
        }

    }
}))