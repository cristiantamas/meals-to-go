import React, { createContext, useEffect, useState } from 'react'

import { locationRequest, locationTransform } from './location.service'

export const LocationContext = createContext()

export const LocationContextProvider = ({ children }) => {
  const [location, setLocation] = useState([])
  const [keyword, setKeyword] = useState('San Francisco')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const onSearch = (searchKeyword) => {
    setIsLoading(true)
    setKeyword(searchKeyword)
  }

  useEffect(() => {
    if (!keyword.length) {
      return
    }

    locationRequest(keyword.toLowerCase())
      .then(locationTransform)
      .then((result) => {
        setLocation(result)
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        setError(err)

        console.log(err)
      })
  }, [keyword])

  return (
    <LocationContext.Provider
      value={{
        isLoading,
        error,
        location,
        search: onSearch,
        keyword
      }}
    >
      {children}
    </LocationContext.Provider>
  )
}
