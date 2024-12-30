class Node:
    value = None
    left = None
    right = None

    def __init__(self, value, left = None, right = None):
        self.value = value
        self.right = right
        self.left = left

class Tree:
    root = None

    def __init__(self, value):
        self.root = Node(value)
    
    def level_order_traversal(self):
        queue = [self.root]
        data = []
        while (len(queue) > 0):
            current_node = queue.pop(0) # deque the queue
            if current_node:
                data.append(current_node.value)
                if current_node.left:
                    queue.append(current_node.left) # enque the left node
                if current_node.right:
                    queue.append(current_node.right) # enque the right node

        return data

    def __pre_order_traversal_helper(self, node, data = []):
        if node == None:
            return data
    
        data.append(node.value)
        self.__pre_order_traversal_helper(node.left, data)
        self.__pre_order_traversal_helper(node.right, data)

        return data
    
    def __in_order_traversal_helper(self, node, data = []):
        if node == None:
            return data
    
        self.__in_order_traversal_helper(node.left, data)
        data.append(node.value)
        self.__in_order_traversal_helper(node.right, data)

        return data
    
    def __post_order_traversal_helper(self, node, data = []):
        if node == None:
            return data
    
        self.__post_order_traversal_helper(node.left, data)
        self.__post_order_traversal_helper(node.right, data)
        data.append(node.value)

        return data
    
    def pre_order_traversal(self):
        return self.__pre_order_traversal_helper(self.root)
    
    def in_order_traversal(self):
        return self.__in_order_traversal_helper(self.root)
    
    def post_order_traversal(self):
        return self.__post_order_traversal_helper(self.root)
    
tree = Tree(1)
leftNode = Node(2)
leftNode.left = Node(4)
leftNode.right = Node(5)
rightNode = Node(3)
rightNode.left = Node(6)
rightNode.right = Node(7)
tree.root.left = leftNode
tree.root.right = rightNode

#         1
#       /   \
#      2     3
#    /  \   /  \
#   4    5 6    7

print(tree.in_order_traversal())
print(tree.pre_order_traversal())
print(tree.post_order_traversal())
print(tree.level_order_traversal())
