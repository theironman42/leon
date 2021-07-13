import React, { useEffect, useState } from 'react'
import { getData } from '../Utils/backend'

function Store() {
    const [stamps, setStamps] = useState([])
    useEffect(() => {
        getData("/api/stamps").then(res => setStamps(res.data))
    }, [setStamps])
    return (
        <div>
            {stamps.map((stamp, index)=>{
                return (
                    <p>
                        {stamp.name}
                    </p>
                )
            })}
        </div>
    )
}

export default Store
