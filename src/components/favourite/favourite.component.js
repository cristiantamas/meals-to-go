import React, { useContext } from 'react'
import styled from 'styled-components/native'
import { AntDesign } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { FavouritesContext } from '../../services/favourites/favourites.context'

const FavouriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 25px;
  right: 25px;
  z-index: 9;
`

export const Favourite = ({ restaurant }) => {
  const { favourites, addToFavourites, removeFromFavourites } =
    useContext(FavouritesContext)

  const isFavourite = favourites.find(
    (fav) => fav.placeId === restaurant.placeId
  )

  return (
    <FavouriteButton>
      <AntDesign
        onPress={() =>
          isFavourite
            ? removeFromFavourites(restaurant)
            : addToFavourites(restaurant)
        }
        name={isFavourite ? 'heart' : 'hearto'}
        size={24}
        color={isFavourite ? 'red' : 'white'}
      />
    </FavouriteButton>
  )
}
