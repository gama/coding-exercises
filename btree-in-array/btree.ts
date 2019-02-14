export default class BinaryTree<T> {
  data: T[]

  NULL_NODE: Node<T> = {
    index:  null,
    value:  null,
    parent: null,
    left:   null,
    right:  null
  }

  constructor(maxElements:number) {
    const nodeCount = (2 ** (Math.floor(Math.log2(maxElements)) + 1) - 1)
    if (nodeCount < 0)
      throw 'invalid size: ' + maxElements
    this.data = new Array<T>(nodeCount)
  }

  get root():Node<T> {
    return this.node(0)
  }

  parent(index:number):Node<T> {
    const [depth, offset] = BinaryTree._depthAndOffset(index)
    if (this._outOfBounds(index)  || depth === 0)
      return this.NULL_NODE
    return this.node(BinaryTree._index(depth - 1, Math.floor(offset / 2)))
  }

  left(index:number):Node<T> {
    const [depth, offset] = BinaryTree._depthAndOffset(index)
    const leftIndex       = BinaryTree._index(depth + 1, offset * 2)
    return this._outOfBounds(leftIndex) ? this.NULL_NODE : this.node(leftIndex)
  }

  right(index:number):Node<T> {
    const [depth, offset] = BinaryTree._depthAndOffset(index)
    const rightIndex      = BinaryTree._index(depth + 1, offset * 2 + 1)
    return this._outOfBounds(rightIndex) ? this.NULL_NODE : this.node(rightIndex)
  }

  *breadthFirst(): IterableIterator<T> {
    for (let node of this.data) {
      yield node
    }
  }

  // in-order traversal
  *depthFirst(node:Node<T> = this.root): IterableIterator<T> {
    if (node == this.NULL_NODE)
      return
    yield node.value!
    yield *this.depthFirst(node.left!)
    yield *this.depthFirst(node.right!)
  }

  node(index:number):Node<T> {
    const _this:BinaryTree<T> = this
    return {
      index: index,
      set value(value:T)   { _this.data[index] = value },
      get value():T        { return _this.data[index] },
      get parent():Node<T> { return _this.parent(index) },
      get left():Node<T>   { return _this.left(index) },
      get right():Node<T>  { return _this.right(index) }
    }
  }

  _outOfBounds(index:number):boolean {
    return index >= this.data.length
  }

  static _depthAndOffset(index:number):number[] {
    const depth  = Math.floor(Math.log2(index + 1))
    const offset = index - (2 ** depth) + 1
    return [depth, offset]
  }

  static _index(depth: number, offset: number):number {
    return ((2 ** depth) - 1) + offset 
  }
}

export interface Node<T> {
  index:  number  | null,
  value:  T       | null,
  parent: Node<T> | null,
  left:   Node<T> | null,
  right:  Node<T> | null,
}
