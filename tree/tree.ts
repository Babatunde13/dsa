class TreeNode {
    value: number
    left: TreeNode | undefined
    right: TreeNode | undefined
    constructor(value: number, left?: TreeNode, right?: TreeNode) {
        this.value = value
        this.left = left
        this.right = right
    }
}

class Tree {
    root: TreeNode
    constructor(rootVal: number, leftVal?: number, rightVal?: number) {
        const root = new TreeNode(rootVal)
        if (leftVal != undefined) {
            const leftNode = new TreeNode(leftVal)
            root.left = leftNode
        }
        if (rightVal != undefined) {
            const rightNode = new TreeNode(rightVal)
            root.right = rightNode
        }
        this.root = root
    }

    // root -> left -> right
    private preOrderSearchHelper(node?: TreeNode, data: number[] = []): number[] {
        if (node == undefined || node == null) {
            return data
        }

        data.push(node.value)
        this.preOrderSearchHelper(node.left, data)
        this.preOrderSearchHelper(node.right, data)

        return data
    }

    // left -> root -> right
    private inOrderSearchHelper(node?: TreeNode, data: number[] = []): number[] {
        if (node == undefined || node == null) {
            return data
        }

        this.inOrderSearchHelper(node.left, data)
        data.push(node.value)
        this.inOrderSearchHelper(node.right, data)
        return data
    }

    // left -> right -> root
    private postOrderSearchHelper(node?: TreeNode, data: number[] = []): number[] {
        if (node == undefined || node == null) {
            return data
        }

        this.postOrderSearchHelper(node.left, data)
        this.postOrderSearchHelper(node.right, data)
        data.push(node.value)
        return data
    }

    preOrderSearch() {
        return this.preOrderSearchHelper(this.root, [])
    }

    inOrderSearch() {
        return this.inOrderSearchHelper(this.root, [])
    }

    postOrderSearch() {
        return this.postOrderSearchHelper(this.root, [])
    }

    levelOrderSearch(): number[] {
        let currentNode: TreeNode | undefined = this.root
        const queue = [this.root] // queue
        const data: number[] = []
        while (queue.length > 0) {
            currentNode = queue.shift() // deque
            if (currentNode) {
                data.push(currentNode.value)
                if (currentNode.left) queue.push(currentNode.left)
                if (currentNode.right) queue.push(currentNode.right)
            }
        }

        return data
    }
}

//          1
//        /   \
//       2     3
//     /  \   /  \
//    4    5 6    7

const tree = new Tree(1)
const leftNode = new TreeNode(2)
const rightNode = new TreeNode(3)
leftNode.left = new TreeNode(4)
leftNode.right = new TreeNode(5)

rightNode.right = new TreeNode(6)
rightNode.right = new TreeNode(7)
tree.root.left = leftNode
tree.root.right = rightNode

console.log(tree.inOrderSearch())
console.log(tree.preOrderSearch())
console.log(tree.postOrderSearch())
console.log(tree.levelOrderSearch())
