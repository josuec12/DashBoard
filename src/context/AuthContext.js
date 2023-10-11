import React from 'react'
import { createContext } from 'react'

const context = createContext()

function AuthProvider({ children }) {
    return (
        <context.Provider>
            {children}
        </context.Provider>
    )
}




