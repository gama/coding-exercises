import BinaryTree, { Node } from '../btree';
import { strict as assert } from 'assert';

describe('Binary tree in array', () => {
  it('should allocate array of the right size', () => {
    assert.equal((new BinaryTree(1)).data.length, 1)
    assert.equal((new BinaryTree(2)).data.length, 3)
    assert.equal((new BinaryTree(3)).data.length, 3)
    assert.equal((new BinaryTree(4)).data.length, 7)
    assert.equal((new BinaryTree(5)).data.length, 7)
    assert.equal((new BinaryTree(6)).data.length, 7)
    assert.equal((new BinaryTree(7)).data.length, 7)
    assert.equal((new BinaryTree(8)).data.length, 15)
  })

  it('should throw when allocating invalid size', () => {
    assert.throws(() => new BinaryTree(0),  'invalid size 0')
    assert.throws(() => new BinaryTree(-1), 'invalid size -1')
  })

  it('should calculate right depth and offset from index', () => {
    assert.deepEqual(BinaryTree._depthAndOffset(0), [0, 0])
    assert.deepEqual(BinaryTree._depthAndOffset(1), [1, 0])
    assert.deepEqual(BinaryTree._depthAndOffset(2), [1, 1])
    assert.deepEqual(BinaryTree._depthAndOffset(3), [2, 0])
    assert.deepEqual(BinaryTree._depthAndOffset(4), [2, 1])
    assert.deepEqual(BinaryTree._depthAndOffset(5), [2, 2])
    assert.deepEqual(BinaryTree._depthAndOffset(6), [2, 3])
    assert.deepEqual(BinaryTree._depthAndOffset(7), [3, 0])
  })

  it('should calculate right index from depth and offset', () => {
    assert.deepEqual(BinaryTree._index(0, 0), 0)
    assert.deepEqual(BinaryTree._index(1, 0), 1)
    assert.deepEqual(BinaryTree._index(1, 1), 2)
    assert.deepEqual(BinaryTree._index(2, 0), 3)
    assert.deepEqual(BinaryTree._index(2, 1), 4)
    assert.deepEqual(BinaryTree._index(2, 2), 5)
    assert.deepEqual(BinaryTree._index(2, 3), 6)
    assert.deepEqual(BinaryTree._index(3, 0), 7)
  })

  it('calculates parent node index', () => {
    const btree = new BinaryTree<number>(28)
    assert.equal(btree.parent( 0).index, null)
    assert.equal(btree.parent( 1).index, 0)
    assert.equal(btree.parent( 2).index, 0)
    assert.equal(btree.parent( 3).index, 1)
    assert.equal(btree.parent( 4).index, 1)
    assert.equal(btree.parent( 5).index, 2)
    assert.equal(btree.parent( 6).index, 2)
    assert.equal(btree.parent( 7).index, 3)
    assert.equal(btree.parent( 8).index, 3)
    assert.equal(btree.parent(13).index, 6)
    assert.equal(btree.parent(14).index, 6)
    assert.equal(btree.parent(15).index, 7)
    assert.equal(btree.parent(16).index, 7)
    assert.equal(btree.parent(30).index, 14)
    assert.equal(btree.parent(31).index, null)
  })

  it('calculates child indexes', () => {
    const btree = new BinaryTree<number>(28)
    assert.equal(btree.left(0).index,    1)
    assert.equal(btree.right(0).index,   2)
    assert.equal(btree.left(1).index,    3)
    assert.equal(btree.right(1).index,   4)
    assert.equal(btree.left(2).index,    5)
    assert.equal(btree.right(2).index,   6)
    assert.equal(btree.left(3).index,    7)
    assert.equal(btree.right(3).index,   8)
    assert.equal(btree.left(6).index,   13)
    assert.equal(btree.right(6).index,  14)
    assert.equal(btree.left(7).index,   15)
    assert.equal(btree.right(7).index,  16)
    assert.equal(btree.left(14).index,  29)
    assert.equal(btree.right(14).index, 30)
    assert.equal(btree.left(15).index,  null)
    assert.equal(btree.right(15).index, null)
  })

  it('should set/get a node\'s value and follow pointers', () => {
    const btree = sampleTree()
    btree.root.right!.left!.value = null

    assert.deepEqual(btree.data, ['root', 'root.left', 'root.right', 'root.left.left', 'root.left.right', null, 'root.right.right'])
    assert.equal(btree.root.value,               'root')
    assert.equal(btree.root.left!.value,         'root.left')
    assert.equal(btree.root.right!.value,        'root.right')
    assert.equal(btree.root.left!.left!.value,   'root.left.left')
    assert.equal(btree.root.left!.right!.value,  'root.left.right')
    assert.equal(btree.root.right!.left!.value,  null)
    assert.equal(btree.root.right!.right!.value, 'root.right.right')
  })

  it('should handle breadth-first traversal', () => {
    const nodes:string[] = []
    for (let value of sampleTree().breadthFirst())
      nodes.push(value)

    assert.deepEqual(nodes, ['root', 'root.left', 'root.right', 'root.left.left', 'root.left.right', 'root.right.left', 'root.right.right'])
  })

  it('should handle in-order depth-first traversal', () => {
    const nodes:string[] = []
    for (let value of sampleTree().depthFirst())
      nodes.push(value)

    assert.deepEqual(nodes, ['root', 'root.left', 'root.left.left', 'root.left.right', 'root.right', 'root.right.left', 'root.right.right'])
  })
})


// ------- helpers & fixtures -------

function sampleTree():BinaryTree<string> {
  const btree = new BinaryTree<string>(7)
  btree.root.value               = 'root'
  btree.root.left!.value         = 'root.left'
  btree.root.right!.value        = 'root.right'
  btree.root.left!.left!.value   = 'root.left.left'
  btree.root.left!.right!.value  = 'root.left.right'
  btree.root.right!.left!.value  = 'root.right.left'
  btree.root.right!.right!.value = 'root.right.right'
  return btree
}
