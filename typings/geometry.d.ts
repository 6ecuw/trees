type PixelAmount = number
type DegreesAmount = number
type Coordinate = number

type Length = PixelAmount
type Angle = DegreesAmount

type Point = {
  x: Coordinate
  y: Coordinate
}

type Size = {
  width: Length
  height: Length
}

type Line = {
  start: Point
  end: Point
}