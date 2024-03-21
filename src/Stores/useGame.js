import create from "zustand"

export default create((set) => {
    return {
        blocksCount: 3,
        phase: "ready",
        start: (state) => {
            set(() => {
                if (state.phase === "ready") {
                    return { phase: "playing" }
                }
                return {

                }

            })
        },
        restart: () => {
            set((state) => {
                if (state.phase === "playing" || "ended") {
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
                        phase: ended
                    }
                }
                return {}

            })
        }

    }
})