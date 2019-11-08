const memory = require("./memory");
const Memory = new memory();

class Array {
	constructor() {
		this.length = 0;
		this._capacity = 0;
		this.ptr = Memory.allocate(this.length);
	}

	push(value) {
		if (this.length >= this._capacity) {
			this._resize((this.length + 1) * Array.SIZE_RATIO);
		}
		Memory.set(this.ptr + this.length, value);
		this.length++;
	}

	_resize(size) {
		const oldPtr = this.ptr;
		this.ptr = Memory.allocate(size);
		if (this.ptr === null) {
			throw new Error("Out of memory");
		}
		Memory.copy(this.ptr, oldPtr, this.length);
		Memory.free(oldPtr);
		this._capacity = size;
	}

	get(index) {
		if (index < 0 || index >= this.length) {
			throw new Error("Index error");
		}
		return Memory.get(this.ptr + index);
	}

	pop() {
		if (this.length == 0) {
			throw new Error("Index error");
		}
		const value = Memory.get(this.ptr + this.length - 1);
		this.length--;
		return value;
	}

	insert(index, value) {
		if (index < 0 || index >= this.length) {
			throw new Error("Index error");
		}

		if (this.length >= this.capacity) {
			this._resize((this.length + 1) * Array.SIZE_RATIO);
		}

		Memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
		Memory.set(this.ptr + index, value);
		this.length++;
	}

	remove(index) {
		if (index < 0 || index >= this.length) {
			throw new Error("Index Error");
		}
		Memory.copy(
			this.ptr + index,
			this.ptr + index + 1,
			this.length - index - 1
		);
		this.length--;
	}
}

Array.SIZE_RATIO = 3;

function main() {
	Array.SIZE_RATIO = 3;

	// Create an instance of the Array class
	let arr = new Array();

	// Add an item to the array
	arr.push(3);
	arr.push(5);
	arr.push(15);
	arr.push(19);
	arr.push(45);
	arr.push(10);

	arr.pop();
	arr.pop();
	arr.pop();
	console.log(this._capacity);
	console.log(arr);
}

main();

//5. URLify a string

function urlify(str) {
	let idx = str.indexOf(" ");
	if (idx === -1) {
		return [str];
	}

	return [str.slice(0, idx), "20%"].join("") + urlify(str.slice(idx + 1));
}

console.log(urlify("tauhida parveen"));
console.log(urlify("www.thinkful.com /tauh ida parv een"));

// 6. Filtering an array
// function filterArr(arr, filter, results=[], i = 0) {
// 	if (i === arr.length) {
// 		return results;
// 	}
// 	console.log({ arr }, { i });
// 	if (arr[i] < filter) {
//     arr.splice(i, 1);

//   }
// }
// console.log(filterArr([1, 3, 5, 7, 3, 9], 5));

function recurFilt(arr, value) {
	if (arr.length === 0) {
		return arr;
	}

	if (arr[0] > value) {
		return [...arr.slice(0, 1), ...recurFilt(arr.slice(1), value)];
	}

	return recurFilt(arr.slice(1), value);
}
console.log(recurFilt([1, 3, 4, 2, 6, 3, 8, 10], 8));

// 7. Max sum of array

// function maxSum(arr, currHighest = arr[0] + arr[1]) {
// 	//add current and prev number
// 	//somehow eventually add that value to an array
// 	//sort array and return highest number

// 	if (arr.length > 1) {
// 		return currHighest;
// 	}

// 	for (let i = 0; i < arr.length; i++) {
// 		let sum = 0;
// 		for (let j = 0; j < arr.length; j++) {
// 			sum += arr[j];
// 			console.log({ sum });
// 		}
// 		if (currHighest < sum) {
// 			currHighest = sum;
// 		}
// 		return maxSum(arr.slice(arr.length - 1), currHighest);
// 	}
// }
// console.log(maxSum([4, 6, -3, 5, -2, -1]));

//If required/time, alter to incorporate continuous sequence starting from anywhere in the array
function maxSum(arr) {
	maxSum = null;
	currSum = null;
	for (let i = 0; i <= arr.length - 1; i++) {
		// for (let j = i; j <= arr.length - 1; j++) {a
		currSum += arr[i];

		if (currSum > maxSum) {
			maxSum = currSum;
		}
		// }
	}
	return maxSum;
}
console.log(maxSum([4, 6, -3, 5, -2, -1]));

// 8. Merge Arrays

function mergeArrays(arr1, arr2) {
	let newArr = [...arr1, ...arr2].sort();
	return newArr;
}

console.log(mergeArrays([1, 3, 6, 8, 11], [2, 3, 5, 8, 9, 10]));

// 9. Remove characters
function removeChar(str, rmChars) {
  //make str and rmChars into arrays 
  rmCharsArr = [];
  strArr = [];
  for (let k = 0; k < rmChars.length; k++) {
    rmCharsArr.push(rmChars[k]);
  }
  for (let k = 0; k < str.length; k++) {
    strArr.push(str[k]);
  }
  
  //get the string indexes of the chars to remove 
  const idxsOfRmChars = [];
  for (let j = 0; j < rmCharsArr.length; j++) {
		for (let i = 0; i < strArr.length; i++) {
      if (strArr[i] === rmCharsArr[j]) {
        idxsOfRmChars.push(i);
      }
    }
  };
  
	//reverse order of array so that when removing the item it doesn't alter the following char's indexes
  idxsOfRmChars.sort((a, b) => b-a);
  
  //splice every char to remove from the str starting from the end of the string to not alter the indexes while removing
	idxsOfRmChars.forEach(idx => strArr.splice(idx, 1));
	return strArr.join('');
}
console.log(removeChar("Battle of the Vowels: Hawaii vs. Grozny", "aeiou"));

//10. Products
//code doesn't work yet
// function products(arr) {
// 	let product = arr[1];
// 	for (let i = 2; i < arr.length - 1; i++) {
// 		product *= arr[i];
// 	}
// 	return product;
// }
// console.log(products([1, 3, 9, 4]))

//11. 2D arr
function oSetter(twoDArr) {
	//2D Arrays are unique in how they need to be copied. One way to do so is below:
	//(can also use recursion)
	const copy = JSON.parse(JSON.stringify(twoDArr));
  console.log('copy before: ',copy)

  //For Each Sub Array
  for (let l=0; l<twoDArr.length; l++) {
  
    //Loop through subarray
    for (let i=0; i<twoDArr[l].length; i++) {
  
      //if the item we're on is equal to 0
      if (twoDArr[l][i] === 0) {
  
        //change the row to 0s
        for (let j=0; j<twoDArr[l].length; j++) {  
          //there may be a more efficient way to do this
          copy[l].splice(j, 1, 0)
        }

        //change the column to 0s
        for (let k=0; k<twoDArr.length; k++) {
          copy[k].splice(i, 1, 0)
        }
      }
      // console.log({twoDArr}, {copy})
    }
  }
  console.log('copy after: ', copy)
} 

const twoDInput = [
  [1,0,1,1,0],
  [0,1,1,1,0],
  [1,1,1,1,1],
  [1,0,1,1,1],
  [1,1,1,1,1]
];
const copy = [...twoDInput]
// const copy = [
//   [1,0,1,1,0],
//   [0,1,1,1,0],
//   [1,1,1,1,1],
//   [1,0,1,1,1],
//   [1,1,1,1,1]
// ];
oSetter(twoDInput);
