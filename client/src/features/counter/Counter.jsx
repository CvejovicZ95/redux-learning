import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, reset, incrementByAmount } from "./counterSlice";

export const Counter = () => {
    const count = useSelector((state) => state.counter.count)
    const dispatch = useDispatch()

    const [incrementAmount, setIncrementAmount] = useState(0)

    const resetAll = (() => {
        dispatch(reset())
        setIncrementAmount(0)
    })

    const addValue = Number(incrementAmount) || 0

    return (
        <>
            <div>Counter</div>
            <p>{count}</p>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
            <div>
                <button onClick={resetAll}>Reset</button>
            </div>
            <input
                type="text"
                value={incrementAmount}
                onChange={(e) => setIncrementAmount(e.target.value)}
            />
            <button onClick={() => dispatch(incrementByAmount(addValue))}>Add value</button>
        </>
    )
}