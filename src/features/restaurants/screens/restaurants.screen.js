import React, { useContext, useState } from 'react'
import { ActivityIndicator, Colors } from 'react-native-paper'
import { View, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

import { FadeInView } from '../../../components/animations/fade.animation'
import { SafeArea } from '../../../components/utility/safe-area.component'
import { FavouritesBar } from '../../../components/favourite/favourites-bar.component'
import { RestaurantInfoCard } from '../components/restaurant-info-card.component'
import { Spacer } from '../../../components/spacer/spacer.component'
import { Search } from '../components/search.component'
import { Text } from '../../../components/typography/text.component'

import { RestaurantList } from '../components/restaurant-list.styles'

import { RestaurantsContext } from '../../../services/restaurants/restaurants.context'
import { LocationContext } from '../../../services/location/location.context'
import { FavouritesContext } from '../../../services/favourites/favourites.context'

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`

const LoadingContainer = styled(View)`
  position: absolute;
  top: 50%;
  left: 50%;
`

export const RestaurantsScreen = ({ navigation }) => {
  const { error: locationError } = useContext(LocationContext)
  const { isLoading, error, restaurants } = useContext(RestaurantsContext)
  const { favourites } = useContext(FavouritesContext)
  const [isToggled, setIsToggled] = useState(false)

  const hasErrors = !!error || !!locationError
  return (
    <SafeArea>
      <Search
        isFavouritesToggled={isToggled}
        onFavouritesToggle={() => setIsToggled(!isToggled)}
      />
      {isToggled && (
        <FavouritesBar
          favourites={favourites}
          onNavigate={navigation.navigate}
        />
      )}
      {hasErrors && (
        <Spacer position="bottom" size="large">
          <Text variant="error">Something went wrong</Text>
        </Spacer>
      )}
      {isLoading ? (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      ) : (
        <RestaurantList
          data={restaurants}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('RestaurantDetail', {
                    restaurant: item
                  })
                }
              >
                <Spacer position="bottom" size="large">
                  <FadeInView>
                    <RestaurantInfoCard restaurant={item} />
                  </FadeInView>
                </Spacer>
              </TouchableOpacity>
            )
          }}
          keyExtractor={(item) => item.name}
        />
      )}
    </SafeArea>
  )
}
