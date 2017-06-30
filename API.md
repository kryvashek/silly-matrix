# List of silly-matrix API functions #

1. Array-related (and vector-related so on) functions (all starts with *array-* prefix):
	1. `arrayMaxAbs(array, start, stop)`
		
		Looks in a specified array for the entry with the most absolute value and returns its index. If `start` and `stop` are undefined the entire array will be proceeded.

	2. `arraySwap(array, a, b)`

		Changes two entries of the given array with their places.

	3. `arrayCopy(array)`

		Makes a copy of given array and returns it.
		
	4. `arrayExclude(array, i)`

		Returns new array the same as given except of contatinig specified index.

	5. `arrayProduce(arrayOne, arrayTwo)`

		Returns scalar product of two given arrays.

	6. `arrayZeroedMake(length)`

		Returns zeroed array of the specified length.

	7. `arrayZeroedCheck(array)`

		Returns true if array is fully zeroed and false otherwise.

	8. `arrayCoef(array,value)`

		Produces all the array item and the given value, returns resulted array.

2. Matrix-related functions
	1. `copy(mtrx)`

		Makes a copy of given matrix and returns it.

	2. `excludeRow(mtrx, i)`

		Returns new matrix the same as given except of contatinig row specified by its index.

	3. `excludeCol(mtrx, j)`

		Returns new matrix the same as given except of contatinig column specified by its index.

	4. `excludeRowCol(mtrx, i, j)`

		Excludes specified row and column from the matrix.

	5. `height(mtrx)`

		Return height of the given matrix (rows count).

	6. `width(mtrx)`

		Returns width of the given matrix (columns count).

	7. `zeroedCheck(mtrx)`

		Returns true if all matrix rows are zeroed.

	8. `coef(mtrx,value)`

		Returns matrix produced by the given scalar value.

	9. `determinant(mtrx)`

		Calculation of the determinant for the given square matrix with Bareiss algorithm (complexity is ~O(n^3)).

	10. `minor(mtrx, i, j)`

		Calculates and returns extra i,j-minor for given matrix.

	11. `algebraicAddition(mtrx, i, j)`

		Calculates and returns algebraic addition for i,j-element of given matrix.

	12. `adjugate(mtrx)`

		Returns an adjugate matrix for the given one (should be square).

	13. `row(mtrx, i)`

		Returns array with elements of specified matrix row.

	14. `column(mtrx, j)`

		Returns array with elements of specified matrix column.

	15. `transpose(mtrx)`

		Returns a transposed matrix based on the given one.

	16. `fromArrayRow(array)`

		Returns matrix with one row made from usual array.

	17. `fromArrayColumn(array)`

		Returns matrix with one column made from usual array.

	18. `inverse(mtrx)`

		Returns an inverse matrix for the given one (should be square) or false if determinant equals zero.

	19. `sum(mtrx1, mtrx2)`

		Returns sum of two matrices of the same sizes.

	20. `differ(mtrx1, mtrx2)`

		Returns difference between two matrices of the same sizes.

	21. `produce(mtrx1, mtrx2)`

		Returns a production of the given matrices or false if it can not be calculated.

	22. `concatDown(mtrx1, mtrx2)`

		Concates matrix one by adding rows from matrix two to the bottom of matrix one.

	23. `concatRight(mtrx1, mtrx2)`

		Concates matrix one by adding columns from matrix two to the right of matrix one.

	24. `pseudoInverseOnRows(mtrx)`

		Returns pseudoinverse matrix for the given one in case of rows being linearly independent.

	25. `pseudoInverseOnColumns(mtrx)`

		Returns pseudoinverse matrix for the given one in case of columns being linearly independent.

	26. `pseudoInverseGrevil(mtrx)`

		Returns pseudoinverse matrix for the given one, calculated with Grevil`s method (complexity is ~O(n^3)).

	27. `solveEquation(mtrx, array)`

		Solves in OLS manner specified linear equation.