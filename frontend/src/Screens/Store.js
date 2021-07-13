import React, { useEffect, useState } from 'react'
import { getData } from '../Utils/backend'
import StampsAdmin from './Admin/StampAdmin'

function Store() {

    return (
        <div>
            <StampsAdmin />
        </div>
    )
}

export default Store
