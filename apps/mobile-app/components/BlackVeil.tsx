import React from 'react'
import { View } from 'react-native'
import { twMerge } from 'tailwind-merge'

const BlackVeil = ({className}:{className?:string}) => {
  return (
    <View className={twMerge('absolute top-0 left-0 bg-black/30 z-10 h-full w-full', className)} />
  )
}

export default BlackVeil
