import React, { useState, useEffect, FunctionComponent } from 'react'
import { Box, Text } from 'ink'
import got from 'got'
import SelectInput from 'ink-select-input'

import { toJSON, shuffleArray } from './utils'

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
  correctCount: Number
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
    correctCount: 0,
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
      choices: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
      items: shuffleArray(
        createChoices([...question.incorrect_answers, question.correct_answer]),
      ),
    }))

  const createChoices = (choices: string[]) =>
    choices.map(choice => ({
      label: decodeURIComponent(choice),
      value: decodeURIComponent(choice),
    }))

  const getChoices = (questions: IQuestion[], idx: number) =>
    questions[idx] ? questions[idx].items : []

  const getQuestion = (questions: IQuestion[], idx: number) =>
    decodeURIComponent(questions[idx] ? questions[idx].question : '')

  const handleSelect = (value: any) => {
    if (!state.questions[state.activeQuestions]) {
      return
    }
    let correctCount = state.correctCount
    if (value.value === state.questions[state.activeQuestions].correct_answer) {
      correctCount = +correctCount + 1
    }
    updateState({
      activeQuestions: state.activeQuestions + 1,
      correctCount,
    })
  }

  return (
    <Box flexDirection="column" width={100}>
      <Header
        correctCount={state.correctCount}
        totalQuestion={state.questions.length}
      />
      {state.loading ? (
        <Text>Loading questions...</Text>
      ) : state.activeQuestions < state.questions.length ? (
        <Box flexDirection="column">
          <Box>
            <Text>
              #{state.activeQuestions + 1} :{' '}
              {getQuestion(state.questions, state.activeQuestions)}
            </Text>
          </Box>
          <Box>
            <SelectInput
              items={getChoices(state.questions, state.activeQuestions)}
              onSelect={handleSelect}
            />
          </Box>
        </Box>
      ) : (
        <Box>
          <Text>Finished</Text>
        </Box>
      )}
    </Box>
  )
}

export default Kuis
