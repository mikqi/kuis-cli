import React from 'react'
import { Box, Text } from 'ink'

interface HeaderProps {
  correctCount: Number
  totalQuestion: Number
}

const Header = ({ correctCount, totalQuestion }: HeaderProps) => {
  return (
    <Box flexDirection="column">
      <Text>Difficulty: Easy</Text>
      <Text>
        Correctness: {correctCount}/{totalQuestion}
      </Text>
    </Box>
  )
}

export default Header
