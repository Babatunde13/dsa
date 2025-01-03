class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def isSameTree(self, p, q) -> bool:
        if not p and not q:
            return True
        
        if not p or not q or p.val != q.val:
            return False
        
        return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)

if __name__ == "__main__":
    p = TreeNode(0)
    q = TreeNode(0)
    p_left = TreeNode(1)
    p_right = TreeNode(2)
    p.left = p_left
    p.left = p_right

    q_left = TreeNode(1)
    q_right = TreeNode(2)
    q.left = q_left
    q.left = q_right

    s = Solution()
    print(s.isSameTree(p, q))