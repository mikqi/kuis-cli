import React, { useState, useEffect, FunctionComponent } from 'react'
import { Box, Text } from 'ink'
import got from 'got'
import SelectInput from 'ink-select-input'

import { toJSON, log } from './utils'

import Header from './components/Header'

interface IQuestion {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
  choices: string[]
  items: IItemsSelect[]
}
interface IResponse {
  response_code: number
  results: IQuestion[]
}
interface IItemsSelect {
  label: string
  value: string
}
interface IState {
  questions: IQuestion[] | []
  activeQuestions: number
  error: boolean
  loading: boolean
  items: IItemsSelect[] | []
  result: any
}

interface IPState extends Partial<IState> {}

const API_URL = 'https://opentdb.com/api.php?amount=10&encode=url3986'

const Kuis: FunctionComponent = () => {
  const [state, setState] = useState<IState>({
    activeQuestions: 0,
    error: false,
    items: [],
    loading: false,
    questions: [],
    result: null,
  })

  const updateState = ((s, fn) => (newState: IPState) =>
    fn({ ...s, ...newState }))(state, setState)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    updateState({
      loading: true,
      error: false,
    })
    try {
      const { body } = await got.get(API_URL)
      const questions: IResponse = toJSON(body)
      updateState({
        loading: false,
        questions: transformQuestions(questions.results),
      })
    } catch (error) {
      updateState({
        error: true,
      })
    }
  }

  const transformQuestions = (questions: IQuestion[]) =>
    questions.map(question => ({
      ...question,
      correct_answer: decodeURIComponent(question.correct_answer),
      choices: [...question.incorrect_answers, question.correct_answer],
      items: createChoices([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    }))

  const createChoices = (choices: string[]) =>
    choices.map(choice => ({
      label: decodeURIComponent(choice),
      value: decodeURIComponent(choice),
    }))

  const getChoices = (questions: IQuestion[], idx: number) =>
    questions[idx] ? questions[idx].items : []

  const handleSelect = (value: any) => {
    log(value)
    updateState({
      activeQuestions: state.activeQuestions + 1,
    })
  }

  return (
    <Box flexDirection="column" width={100}>
      <Header />
      {state.loading ? (
        <Text>Loading</Text>
      ) : (
        <Box>
          >
          <SelectInput
            items={getChoices(state.questions, state.activeQuestions)}
            onSelect={handleSelect}
          />
        </Box>
      )}
    </Box>
  )
}

export default Kuis
