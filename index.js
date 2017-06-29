// boas-matrix.js
// ==============
module.exports = {
    // looks in a specified array for the entry with the most absolute value
    arrayMaxAbs: function(array, start, stop) {
        if (undefined === start)
            start = 0;

        if (undefined === stop)
            stop = array.length;

        var maximal = start;

        for (var i = start + 1; i < stop; i++)
            if (Math.abs(array[maximal]) < Math.abs(array[i]))
                maximal = i;

        return maximal;
    },

    // changes two entries of the given array with their places
    arraySwap: function(array, a, b) {
        if (a == b)
            return false;

        var temp = array[a];

        array[a] = array[b];
        array[b] = temp;
        return true;
    },

    // makes a copy of given array and returns it
    arrayCopy: function(array) {
        return array.map( item => item );
    },

    // returns new array the same as given except of contatinig specified index
    arrayExclude: function(array, i) {
        return array.filter((entry, index) => (index !== i));
    },

    // returns scalar product of two given arrays
    arrayProduce: function(arrayOne, arrayTwo) {
        if(arrayOne.length !== arrayTwo.length)
            return false;

        return arrayOne.reduce((sum, current, i) => sum + current * arrayTwo[i], 0);
    },

    // makes a copy pf given matrix and returns it
    matrixCopy: function(matrix) {
        return matrix.map( this.arrayCopy );
    },

    // returns new matrix the same as given except of contatinig row specified by its index
    matrixExcludeRow: function(matrix, i) {
        return this.arrayExclude(matrix,i);
    },

    // returns new matrix the same as given except of contatinig row specified by its index
    matrixExcludeCol: function(matrix, j) {
        return matrix.map(row => this.arrayExclude(row, j));
    },

    // excludes specified row and column from the matrix
    matrixExcludeRowCol: function(matrix, i, j) {
        return this.matrixExcludeCol(this.matrixExcludeRow(matrix, i), j);
    },

    // calculation of the determinant for the given square matrix
    // Bareiss algorithm, complexity is ~O(n^3)
    determinant: function(matrix) {
        var N = matrix[0].length,
            B = this.matrixCopy(matrix),
            denom = 1,
            exchanges = 0,
            maxIdx,
            prop,
            sub,
            i, j, k;

        for (i = 0; i < N - 1; ++i) {
            maxIdx = this.arrayMaxAbs(B[i], i);

            if (this.arraySwap(B, i, maxIdx))
                exchanges++;
            else if (0 === B[i][maxIdx])
                return 0;

            prop = B[i][i];

            for (j = i + 1; j < N; ++j) {
                sub = B[j][i];
                B[j][i] = 0;

                for (k = i + 1; k < N; ++k)
                    B[j][k] = (B[j][k] * prop - B[i][k] * sub) / denom;
            }

            denom = prop;
        }

        if (exchanges % 2)
            B[N - 1][N - 1] *= -1;

        return B[N - 1][N - 1];
    },

    // calculates and returns extra i,j-minor for given matrix
    minor: function(matrix, i, j) {
        return this.determinant(this.matrixExcludeRowCol(matrix, i, j));
    },

    // calculates and returns algebraic addition for i,j-element of given matrix
    algebraicAddition: function(matrix, i, j) {
        return (((i + j) % 2) ? -1 : 1) * this.minor(matrix, i, j)
    },

    // returns an adjugate matrix for the given one (should be square)
    adjugate: function(matrix) {
        return matrix.map((row, i) => row.map((item, j) => this.algebraicAddition(matrix, j, i))); // j and i swapped because result should be transposed
    },

    // returns array with elements of specified matrix row
    fromMatrixRow: function(matrix, i) {
        return matrix[ i ];
    },

    // returns array with elements of specified matrix column
    fromMatrixColumn: function(matrix, j) {
        return matrix.reduce((column, item) => column.concat( [ item[j] ] ), []);
    },

    // returns a transposed matrix based on the given one
    transpose: function(matrix) {
        return matrix[0].map((item, j) => this.fromMatrixColumn(matrix, j));
    },

    // returns matrix with one row made from usual array
    matrixFromArrayRow: function(array) {
        return [array];
    },

    // returns matrix with one column made from usual array
    matrixFromArrayColumn: function(array) {
        return this.transpose(this.matrixFromArrayRow(array));
    },

    // returns an inverse matrix for the given one (should be square) or false if determinant equals zero
    inverse: function(matrix) {
        var det = this.determinant(matrix);

        if (0 === det)
            return false;

        return this.adjugate(matrix).map(row => row.map(item => item / det));
    },

    // returns a production of the given matrices or false if it can not be calculated
    produce: function(matrixOne, matrixTwo) {
        return matrixOne.map((row, i) => matrixTwo[0].map((item, j) => this.arrayProduce(this.fromMatrixRow(matrixOne, i), this.fromMatrixColumn(matrixTwo, j))));
    },

    // returns pseudoinverse matrix for the given one
    pseudoinverse: function(A) {
        var At = this.transpose(A);

        if (A.length < At.length)
            return this.produce(At, this.inverse(this.produce(A, At)));
        else
            return this.produce(this.inverse(this.produce(At, A)), At);
    },

    // solves linear equation in OLS manner
    solveEquation: function(A, b) {
        return this.produce(this.pseudoinverse(A), this.matrixFromArrayColumn(b));
    }
};

