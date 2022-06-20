import React, { useContext, useEffect, useState } from 'react'
import { Searchbar } from 'react-native-paper'
import styled from 'styled-components/native'

import { LocationContext } from '../../../services/location/location.context'

const SearchContainer = styled.View`
  position: absolute;
  z-index: 999;
  padding: ${(props) => props.theme.space[3]};
  top: 40px;
  width: 100%;
`

export const Search = () => {
  const { keyword, search } = useContext(LocationContext)
  const [searchKeyword, setSearchKeyword] = useState(keyword)

  useEffect(() => {
    setSearchKeyword(keyword)
  }, [keyword])

  return (
    <SearchContainer>
      <Searchbar
        placeholder="Search for a locaiton"
        icon="map"
        value={searchKeyword}
        onSubmitEditing={() => {
          search(searchKeyword)
        }}
        onChangeText={(text) => {
          if (!text.length) {
            return
          }

          setSearchKeyword(text)
        }}
      />
    </SearchContainer>
  )
}
