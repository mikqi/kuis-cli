import React, { useState, useEffect } from 'react'
import { Box, Text } from 'ink'
import got from 'got'

const API_URL = 'https://opentdb.com/api.php?amount=10&encode=url3986'

function Kuis() {
  const [state] = useState({
    questions: [],
    activeQuestions: 0,
    error: false,
    loading: true,
    items: [],
    result: null,
  })

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const { body } = await got(API_URL)
      console.log(JSON.parse(body))
    } catch (error) {}
  }

  return (
    <Box>
      {state.loading ? (
        <Text>Loading</Text>
      ) : (
        <Box>
          <Text>result</Text>
        </Box>
      )}
    </Box>
  )
}

export default Kuis
