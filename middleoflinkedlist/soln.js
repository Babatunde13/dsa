class ListNode1 {
    constructor(val, next) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

class Solution1 {
    middleNode(head) {
        let slow = head
        let fast = head

        while (fast != null && fast.next != null) {
            slow = fast.next
            fast = fast.next.next
        }

        return slow
    }
}
