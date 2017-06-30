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

    // returns zeroed array of the specified length
    arrayZeroedMake: function(length) {
        return Array(length).fill(0);
    },

    // returns true if array is fully zeroed and false otherwise
    arrayZeroedCheck: function(array) {
        return !array.some((item) => item !== 0);
    },

    // produces all the array item and the given value, returns resulted array
    arrayCoef: function(array,value) {
        return array.map((item)=>item*value);
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

    // return height of the given matrix (rows count)
    matrixHeight: function(matrix) {
        return matrix.length;
    },

    // returns width of the given matrix (columns count)
    matrixWidth: function(matrix) {
        return this.fromMatrixRow(matrix,0).length;
    },

    // returns true if all matrix rows are zeroed
    matrixZeroedCheck: function(matrix) {
        return !matrix.some((row) => !this.arrayZeroedCheck(row));
    },

    // returns matrix produced by the given scalar value
    matrixCoef: function(matrix,value) {
        return matrix.map((row) => this.arrayCoef(row, value));
    },

    // calculation of the determinant for the given square matrix
    // Bareiss algorithm, complexity is ~O(n^3)
    determinant: function(matrix) {
        var N = this.matrixWidth(matrix),
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
        if( 1 == this.matrixHeight( matrix ) && 1 == this.matrixWidth( matrix ) )
            return 1;
        else
            return this.determinant(this.matrixExcludeRowCol(matrix, i, j));
    },

    // calculates and returns algebraic addition for i,j-element of given matrix
    algebraicAddition: function(matrix, i, j) {
        return (((i + j) % 2) ? -1 : 1) * this.minor(matrix, i, j)
    },

    // returns an adjugate matrix for the given one (should be square)
    adjugate: function(matrix) {
        return matrix.map(
            (row, i) => row.map(
                (item, j) => this.algebraicAddition(matrix, j, i)
            )
        ); // j and i swapped because result should be transposed
    },

    // returns array with elements of specified matrix row
    fromMatrixRow: function(matrix, i) {
        return this.arrayCopy( matrix[ i ] );
    },

    // returns array with elements of specified matrix column
    fromMatrixColumn: function(matrix, j) {
        return matrix.reduce((column, item) => column.concat( [ item[j] ] ), []);
    },

    // returns a transposed matrix based on the given one
    transpose: function(matrix) {
        return this.fromMatrixRow(matrix, 0).map((item, j) => this.fromMatrixColumn(matrix, j));
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

    // returns sum of two matrices of the same sizes
    sum: function(mtx1, mtx2) {
        if( this.matrixWidth(mtx1) !== this.matrixWidth(mtx2) ||
            this.matrixHeight(mtx1) !== this.matrixHeight(mtx2) )
            return false;

        return mtx1.map((row,i) => row.map((item,j) => item + mtx2[i][j] ) );
    },

    // returns difference between two matrices of the same sizes
    differ: function(mtx1, mtx2) {
        if( this.matrixWidth(mtx1) !== this.matrixWidth(mtx2) ||
            this.matrixHeight(mtx1) !== this.matrixHeight(mtx2) )
            return false;

        return mtx1.map((row,i) => row.map((item,j) => item - mtx2[i][j] ) );
    },

    // returns a production of the given matrices or false if it can not be calculated
    produce: function(matrixOne, matrixTwo) {
        return matrixOne.map(
            (row, i) => this.fromMatrixRow(matrixTwo, 0).map(
                (item, j) => this.arrayProduce(this.fromMatrixRow(matrixOne, i), this.fromMatrixColumn(matrixTwo, j))
            )
        );
    },

    // concates matrix one by adding rows from matrix two to the bottom of matrix one
    concatDown: function(matrixOne, matrixTwo) {
        if( this.matrixWidth(matrixOne) !== this.matrixWidth(matrixTwo) )
            return false;

        return matrixOne.concat(matrixTwo);
    },

    // concates matrix one by adding columns from matrix two to the right of matrix one
    concatRight: function(matrixOne, matrixTwo) {
        if( this.matrixHeight(matrixOne) !== this.matrixHeight(matrixTwo) )
            return false;

        return matrixOne.map((row, i) => row.concat(this.fromMatrixRow(matrixTwo,i)));
    },

    // returns pseudoinverse matrix for the given one in case of rows being linearly independent
    pseudoInverseOnRows: function(A) {
        var At = this.transpose(A),
            B = this.produce(A, At);

        if( 0 === this.determinant(B) )
            return false;

        return this.produce(At, this.inverse(B));
    },

    // returns pseudoinverse matrix for the given one in case of columns being linearly independent
    pseudoInverseOnColumns: function(A) {
        var At = this.transpose(A),
            B = this.produce(At, A);

        if( 0 === this.determinant(B) )
            return false;

        return this.produce(this.inverse(B), At);
    },

    // returns pseudoinverse matrix for the given one
    // Grevil`s method, complexity is ~O(n^3)
    pseudoInverseGrevil: function(matrix) {
        var k, Ak, AkInv,
            column, lastRow,
            prod, prodTrans,
            diff, coef;

        column = this.matrixFromArrayColumn( this.fromMatrixColumn( matrix, 0 ) );
        Ak = column;

        if( this.matrixZeroedCheck( column ) )
            AkInv = this.transpose( column );
        else
            AkInv = this.pseudoInverseOnColumns(column);

        for( k = 1; k < this.matrixWidth( matrix ); k++) {
            column = this.matrixFromArrayColumn( this.fromMatrixColumn( matrix, k ) );
            prod = this.produce(AkInv,column);
            diff = this.differ(column,this.produce(Ak,prod));

            if( this.matrixZeroedCheck( diff ) ) {
                prodTrans = this.transpose(prod);
                coef = 1 / ( 1 + this.produce( prodTrans, prod )[ 0 ][ 0 ] );
                lastRow = this.matrixCoef( this.produce( prodTrans, AkInv ), coef );
            } else
                lastRow = this.pseudoInverseOnColumns( diff, this.transpose( diff) );

            AkInv = this.concatDown( this.differ( AkInv, this.produce(prod,lastRow) ), lastRow );
            Ak = this.concatRight( Ak, column );
        }

        return AkInv;
    },

    // solves linear equation in OLS manner
    solveEquation: function(A, b) {
        return this.produce(this.pseudoInverseGrevil(A), this.matrixFromArrayColumn(b));
    }
};

