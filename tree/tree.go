package main

import "fmt"

type (
	Node struct {
		Value *int
		Left *Node
		Right *Node
	}

	Tree struct {
		Root *Node
	}
)

func NewNode(value int) *Node {
	return &Node{ Value: &value }
}

func New(value int) *Tree {
	return &Tree{
		Root: &Node{
			Value: &value,
		},
	}
}

func deque(queue *[]*Node) *Node {
	queueVal := *queue
	first := queueVal[0]
	queueVal = queueVal[1:]
	*queue = queueVal
	return first
}

func enque(queue *[]*Node, val *Node) {
	queueVal := *queue
	queueVal = append(queueVal, val)
	*queue = queueVal
}

func (t *Tree) levelOrderTraversal() []int {
	queue := make([]*Node, 0)
	data := make([]int, 0)
	enque(&queue, t.Root)
	for (len(queue) > 0) {
		currentNode := deque(&queue)
		if currentNode != nil {
			data = append(data, *currentNode.Value)
			enque(&queue, currentNode.Left)
			enque(&queue, currentNode.Right)
		}
	}

	return data
}

// root -> left -> right
func (t *Tree) preOrderTraversal() []int {
	data := make([]int, 0)
	data = *t.preOrderTraversalHelper(t.Root, &data)
	return data
}

func (t *Tree) preOrderTraversalHelper(node *Node, data *[]int) *[]int {
	if (node == nil) {
		return data
	}
	
	*data = append(*data, *node.Value)
	t.preOrderTraversalHelper(node.Left, data)
	t.preOrderTraversalHelper(node.Right, data)
	return data
}

// left -> root -> right
func (t *Tree) inOrderTraversal() []int {
	data := make([]int, 0)
	data = *t.inOrderTraversalHelper(t.Root, &data)
	return data
}

func (t *Tree) inOrderTraversalHelper(node *Node, data *[]int) *[]int {
	if (node == nil) {
		return data
	}
	
	t.inOrderTraversalHelper(node.Left, data)
	*data = append(*data, *node.Value)
	t.inOrderTraversalHelper(node.Right, data)
	return data
}

// left -> right -> root
func (t *Tree) postOrderTraversal() []int {
	data := make([]int, 0)
	data = *t.postOrderTraversalHelper(t.Root, &data)
	return data
}

func (t *Tree) postOrderTraversalHelper(node *Node, data *[]int) *[]int {
	if (node == nil) {
		return data
	}
	
	t.postOrderTraversalHelper(node.Left, data)
	t.postOrderTraversalHelper(node.Right, data)
	*data = append(*data, *node.Value)
	return data
}

//          1
//        /   \
//       2     3
//     /  \   /  \
//    4    5 6    7
func main () {
	var tree Tree = *New(1)
	var leftNode = NewNode(2)
	leftNode.Left = NewNode(4)
	leftNode.Right = NewNode(5)
	var rightNode = NewNode(3)
	rightNode.Left = NewNode(6)
	rightNode.Right = NewNode(7)
	tree.Root.Left = leftNode
	tree.Root.Right = rightNode

	fmt.Println(tree.inOrderTraversal())
	fmt.Println(tree.preOrderTraversal())
	fmt.Println(tree.postOrderTraversal())
	fmt.Println(tree.levelOrderTraversal())
}
