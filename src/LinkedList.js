'use strict';
const _Node = require('./Node');

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }

  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);
    }
  }

  insertBefore(insertItem, value) {
    let currentNode = this.head;

    while (value !== currentNode.next.value) {
      currentNode = currentNode.next;
    }
    let findValue = this.find(value);

    currentNode.next = new _Node(insertItem, findValue);
  }

  insertAfter(insertItem, value) {
    let findValue = this.find(value);
    let tempNext = findValue.next;
    findValue.next = new _Node(insertItem, tempNext);
  }

  insertAt(insertItem, position) {
    let currentNode = this.head;
    let count = 0;

    while (currentNode.next !== null) {
      count++;
      if (count === position) {
        this.insertBefore(insertItem, currentNode.value);
      }
      currentNode = currentNode.next;
    }
  }

  find(item) {
    // Start at the head
    let currNode = this.head;
    // If the list is empty
    if (!this.head) {
      return null;
    }
    // Check for the item
    while (currNode.value !== item) {
      /* Return null if it's the end of the list 
           and the item is not on the list */
      if (currNode.next === null) {
        return null;
      } else {
        // Otherwise, keep looking
        currNode = currNode.next;
      }
    }
    // Found it
    return currNode;
  }

  reverseList() {
    let currentNode = this.head; //start at the beginning
    let node = null; //save the previous thing to point at

    while (currentNode !== null) { //[1, 2, 3, 4]

      let tempNext = currentNode.next; //2 //3

      currentNode.next = node;//1 -> null //3
      node = currentNode; //value from null to 1

      currentNode = tempNext; //value from 1 to 2
    }

    this.head = node;
    
  }
  
  remove(item) {
    // If the list is empty
    if (!this.head) {
      return null;
    }
    // If the node to be removed is head, make the next node head
    if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }
    // Start at the head
    let currNode = this.head;
    // Keep track of previous
    let previousNode = this.head;

    while (currNode !== null && currNode.value !== item) {
      // Save the previous node
      previousNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      console.log('Item not found');
      return;
    }
    previousNode.next = currNode.next;
  }

  display() {
    let currentNode = this.head;
    while (currentNode !== null) {
      console.log(currentNode.value);
      currentNode = currentNode.next;
    }
  }

  size() {
    let currentNode = this.head;
    let counter = 0;
    while (currentNode !== null) {
      counter++;
      currentNode = currentNode.next;
    }
    console.log(counter);
    return counter;
  }

  isEmpty() {
    if (this.head === null) return true;
    return false;
  }

  findPrevious(item) {
    let currentNode = this.head;

    while (item !== currentNode.next.value) {
      currentNode = currentNode.next;
    }

    return currentNode;
  }

  findLast() {
    let currentNode = this.head;

    while (currentNode.next !== null) {
      currentNode = currentNode.next;
    }

    return currentNode;
  }


  thirdFromEnd() {
    let currentNode = this.head;
    while (currentNode.next.next.next !== null) {
      currentNode = currentNode.next;
    }
    console.log('third', currentNode.value);
    return currentNode;
  }

  MiddleOfList() {
    const lengthList = this.size();
    let currentNode = this.head;
    let position = 0;
    let count = 0;
    if (lengthList % 2 === 1) {
      position = lengthList / 2 + 0.5;
    } else {
      position = lengthList / 2;
    }

    while (currentNode.next !== null) {
      count++;
      if (count === position) {
        return currentNode.value;
      }
      currentNode = currentNode.next;
    }
  }

  cycleInAList() {
    let currentNode = this.head;
    let values = [];

    while (currentNode !== null) {
      if (values.includes(currentNode.value)){
        return true;
      }
      values.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return false;
  }
}
module.exports = LinkedList;
