"use client"

import { User } from "@/types/types"
import { createContext, useState, useContext, type ReactNode } from "react"

type UserContextType = {
  user: User | null
  setUser: (user: User | null) => void
  isLoggedIn: boolean
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  isLoggedIn: false,
})

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
