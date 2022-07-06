import React, { useState, useRef, useEffect, useContext } from 'react'
import styled from 'styled-components/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { View } from 'react-native'
import { IconButton } from 'react-native-paper'

import { Text } from '../../../components/typography/text.component'
import { Camera, CameraType } from 'expo-camera'

import { AuthenticationContext } from '../../../services/authentication/authentication.context'

const ProfileCamera = styled(Camera)`
  width: 100%;
  height: 100%;
`

const CameraIconsView = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  left: -35px;
`

export const CameraScreen = ({ navigation }) => {
  const cameraRef = useRef()
  const { user } = useContext(AuthenticationContext)
  const [hasPermission, setHasPermission] = useState(null)
  const [type, setType] = useState(CameraType.front)

  const snap = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync()
      AsyncStorage.setItem(`${user.uid}-photo`, photo.uri)
      navigation.goBack()
    }
  }

  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text variant="label">No access to camera</Text>
  }

  return (
    <ProfileCamera ref={(camera) => (cameraRef.current = camera)} type={type}>
      <CameraIconsView>
        <IconButton
          icon="camera-flip-outline"
          mode="contained"
          size={40}
          onPress={() => {
            setType(
              type === CameraType.back ? CameraType.front : CameraType.back
            )
          }}
        />
        <IconButton icon="camera" mode="contained" size={40} onPress={snap} />
      </CameraIconsView>
    </ProfileCamera>
  )
}
