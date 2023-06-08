import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field'

const styles = StyleSheet.create({
  root: { padding: 20, minHeight: 300 },
  title: { textAlign: 'center', fontSize: 30 },
  fieldRow: {
    marginTop: 20,
    flexDirection: 'row',
    marginLeft: 8,
  },
  cell: {
    width: 55,
    height: 55,
    lineHeight: 55,
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginLeft: 8,
    borderRadius: 6,
    backgroundColor: '#eee',
  },
  toggle: {
    width: 55,
    height: 55,
    lineHeight: 55,
    fontSize: 24,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
})

const CELL_COUNT = 4

// Inspired by
// https://github.com/retyui/react-native-confirmation-code-field/issues/129
// https://dribbble.com/shots/8020632/attachments/530078?mode=media

const UnmaskExample = () => {
  const [enableMask, setEnableMask] = useState(true)
  const [value, setValue] = useState('')
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  })
  const toggleMask = () => setEnableMask((f) => !f)
  const renderCell = ({ index, symbol, isFocused }) => {
    let textChild = null

    if (symbol) {
      textChild = enableMask ? '•' : symbol
    } else if (isFocused) {
      textChild = <Cursor />
    }

    return (
      <Text
        key={index}
        // style={[styles.cell, isFocused && styles.focusCell]}
        className='w-16 h-16 bg-black/20 ml-4 text-center text-3xl leading-[60px]'
        onLayout={getCellOnLayoutHandler(index)}
      >
        {textChild}
      </Text>
    )
  }

  console.log('value', value)

  return (
    <View className='justify-center flex-1 h-[80vh] bg-white'>
      <View className='p-10 justify-center flex-1'>
        <Text className='text-3xl text-center font-bold text-black/80'>
          Desbloquear{' '}
        </Text>
        <View className='flex-row justify-center mt-5'>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            keyboardType='number-pad'
            textContentType='oneTimeCode'
            renderCell={renderCell}
          />
          <Text style={styles.toggle} onPress={toggleMask}>
            {enableMask ? '🙈' : '🐵'}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default UnmaskExample
