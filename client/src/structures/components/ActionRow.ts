import Button from './Button'

export default class ActionRow {
  type: number
  components: Button[]

  public constructor () {
    this.type = 1
    this.components = []
  }

  public addComponent (component: Button) {
    this.components.push(component)
    return this
  }

  public addComponents (components: Button[]) {
    this.components.push(...components)
    return this
  }
}