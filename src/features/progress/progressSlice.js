import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    completedChallengeIds: [],
    bookmarkedChallengeIds: [],
    currentStreak: 0,
    lastSolvedDate: null
}

const progressSlice = createSlice({
    name:"progress",
    initialState,

    reducers:{
        markChallengeCompleted: (state, action)=>{
            const challengeId = action.payload

            if(!state?.completedChallengeIds.includes(challengeId)){
                state?.completedChallengeIds.push(challengeId)

                let today = new Date().toDateString()
                const yesterdayDate = new Date()
                yesterdayDate.setDate(yesterdayDate.getDate() - 1)
                let yesterday = yesterdayDate.toDateString()

                if(state.lastSolvedDate===null || yesterday===state.lastSolvedDate){
                    state.currentStreak = state.currentStreak + 1
                }
                else if(today!==state.lastSolvedDate){
                    state.currentStreak = 1
                }
                state.lastSolvedDate = today
            }
        },
        bookmarkChallenge: (state,action)=>{
            const bookmarkedId = action.payload
            if(!state.bookmarkedChallengeIds.includes(bookmarkedId)){
                state.bookmarkedChallengeIds.push(bookmarkedId)
            }
            else{
                state.bookmarkedChallengeIds = state.bookmarkedChallengeIds.filter(id=>id!==bookmarkedId)
            }
        },
        refreshStreak: (state) => {
            const today = new Date().toDateString();

            const yesterdayDate = new Date();
            yesterdayDate.setDate(yesterdayDate.getDate() - 1);
            const yesterday = yesterdayDate.toDateString();

            if (
                state.lastSolvedDate !== today &&
                state.lastSolvedDate !== yesterday
            ) {
                state.currentStreak = 0;
            }
        },
    }
})

export const {markChallengeCompleted, bookmarkChallenge, refreshStreak} = progressSlice.actions

export default progressSlice.reducer