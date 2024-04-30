export interface Event{
  id: number
  title: string
  description: string
  date: Date
  imageUrl: string
  places: number
  time: string
  location: string
  participants: string[]
}

export interface User{
  id: number,
  username: string,
  password: string,
  email: string,
  events: string[]
}

export interface Token{
  access: string
  refresh: string
}

