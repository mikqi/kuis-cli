declare module 'ink-box' {
  import { Component, ReactChild } from 'react'

  interface InkBoxProps {
    readonly paddingTop?: number
    readonly paddingBottom?: number
    readonly paddingLeft?: number
    readonly paddingRight?: number
    readonly paddingX?: number
    readonly paddingY?: number
    readonly padding?: number
    readonly marginTop?: number
    readonly marginBottom?: number
    readonly marginLeft?: number
    readonly marginRight?: number
    readonly margin?: number
    readonly float?: 'right' | 'center' | 'left'
    readonly backgroundColor?: string
    readonly align?: 'left' | 'center' | 'right'
    readonly dimBorder?: boolean
    readonly borderColor?: string
    readonly borderStyle?:
      | 'single'
      | 'double'
      | 'round'
      | 'singleDouble'
      | 'doubleSingle'
      | 'classic'
  }

  declare class InkBox extends Component<InkBoxProps> {}

  export = InkBox
}
