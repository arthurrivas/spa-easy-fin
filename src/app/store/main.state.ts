import { state } from "@angular/animations"
import { createAction, createReducer, on } from "@ngrx/store"

export interface IMainState {
    counter: number
}

export const mainState: IMainState = {
    counter : 0
}

export const incrementCounter = createAction('[main] increment counter')
export const decrementCounter = createAction('[main] decrement counter')

export const mainReducer = createReducer(
    mainState,
    on(incrementCounter, (state) => {
        state = {
            ...state,
            counter: state.counter + 1
        }
        return state;
    }),
    on(decrementCounter, (state) => {
        state = {
            ...state,
            counter: state.counter -1
        }
        return state;
    })
)