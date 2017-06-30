// boas-matrix.js
// ==============
module.exports = {
    // looks in a specified array for the entry with the most absolute value and returns its index
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
    copy: function(mtrx) {
        return mtrx.map( this.arrayCopy );
    },

    // returns new matrix the same as given except of contatinig row specified by its index
    excludeRow: function(mtrx, i) {
        return this.arrayExclude(mtrx,i);
    },

    // returns new matrix the same as given except of contatinig row specified by its index
    excludeCol: function(mtrx, j) {
        return mtrx.map(row => this.arrayExclude(row, j));
    },

    // excludes specified row and column from the matrix
    excludeRowCol: function(mtrx, i, j) {
        return this.excludeCol(this.excludeRow(mtrx, i), j);
    },

    // return height of the given matrix (rows count)
    height: function(mtrx) {
        return mtrx.length;
    },

    // returns width of the given matrix (columns count)
    width: function(mtrx) {
        return this.row(mtrx,0).length;
    },

    // returns true if all matrix rows are zeroed
    zeroedCheck: function(mtrx) {
        return !mtrx.some((row) => !this.arrayZeroedCheck(row));
    },

    // returns matrix produced by the given scalar value
    coef: function(mtrx,value) {
        return mtrx.map((row) => this.arrayCoef(row, value));
    },

    // calculation of the determinant for the given square matrix
    // Bareiss algorithm, complexity is ~O(n^3)
    determinant: function(mtrx) {
        var N = this.width(mtrx),
            B = this.copy(mtrx),
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
    minor: function(mtrx, i, j) {
        if( 1 == this.height( mtrx ) && 1 == this.width( mtrx ) )
            return 1;
        else
            return this.determinant(this.excludeRowCol(mtrx, i, j));
    },

    // calculates and returns algebraic addition for i,j-element of given matrix
    algebraicAddition: function(mtrx, i, j) {
        return (((i + j) % 2) ? -1 : 1) * this.minor(mtrx, i, j)
    },

    // returns an adjugate matrix for the given one (should be square)
    adjugate: function(mtrx) {
        return mtrx.map(
            (row, i) => row.map(
                (item, j) => this.algebraicAddition(mtrx, j, i)
            )
        ); // j and i swapped because result should be transposed
    },

    // returns array with elements of specified matrix row
    row: function(mtrx, i) {
        return this.arrayCopy( mtrx[ i ] );
    },

    // returns array with elements of specified matrix column
    column: function(mtrx, j) {
        return mtrx.reduce((column, item) => column.concat( [ item[j] ] ), []);
    },

    // returns a transposed matrix based on the given one
    transpose: function(mtrx) {
        return this.row(mtrx, 0).map((item, j) => this.column(mtrx, j));
    },

    // returns matrix with one row made from usual array
    fromArrayRow: function(array) {
        return [array];
    },

    // returns matrix with one column made from usual array
    fromArrayColumn: function(array) {
        return this.transpose(this.fromArrayRow(array));
    },

    // returns an inverse matrix for the given one (should be square) or false if determinant equals zero
    inverse: function(mtrx) {
        var det = this.determinant(mtrx);

        if (0 === det)
            return false;

        return this.adjugate(mtrx).map(row => row.map(item => item / det));
    },

    // returns sum of two matrices of the same sizes
    sum: function(mtrx1, mtrx2) {
        if( this.width(mtrx1) !== this.width(mtrx2) ||
            this.height(mtrx1) !== this.height(mtrx2) )
            return false;

        return mtrx1.map((row,i) => row.map((item,j) => item + mtrx2[i][j] ) );
    },

    // returns difference between two matrices of the same sizes
    differ: function(mtrx1, mtrx2) {
        if( this.width(mtrx1) !== this.width(mtrx2) ||
            this.height(mtrx1) !== this.height(mtrx2) )
            return false;

        return mtrx1.map((row,i) => row.map((item,j) => item - mtrx2[i][j] ) );
    },

    // returns a production of the given matrices or false if it can not be calculated
    produce: function(mtrx1, mtrx2) {
        return mtrx1.map(
            (row, i) => this.row(mtrx2, 0).map(
                (item, j) => this.arrayProduce(this.row(mtrx1, i), this.column(mtrx2, j))
            )
        );
    },

    // concates matrix one by adding rows from matrix two to the bottom of matrix one
    concatDown: function(mtrx1, mtrx2) {
        if( this.width(mtrx1) !== this.width(mtrx2) )
            return false;

        return mtrx1.concat(mtrx2);
    },

    // concates matrix one by adding columns from matrix two to the right of matrix one
    concatRight: function(mtrx1, mtrx2) {
        if( this.height(mtrx1) !== this.height(mtrx2) )
            return false;

        return mtrx1.map((row, i) => row.concat(this.row(mtrx2,i)));
    },

    // returns pseudoinverse matrix for the given one in case of rows being linearly independent
    pseudoInverseOnRows: function(mtrx) {
        var At = this.transpose(mtrx),
            B = this.produce(mtrx, At);

        if( 0 === this.determinant(B) )
            return false;

        return this.produce(At, this.inverse(B));
    },

    // returns pseudoinverse matrix for the given one in case of columns being linearly independent
    pseudoInverseOnColumns: function(mtrx) {
        var At = this.transpose(mtrx),
            B = this.produce(At, mtrx);

        if( 0 === this.determinant(B) )
            return false;

        return this.produce(this.inverse(B), At);
    },

    // returns pseudoinverse matrix for the given one
    // Grevil`s method, complexity is ~O(n^3)
    pseudoInverseGrevil: function(mtrx) {
        var k, Ak, AkInv,
            column, lastRow,
            prod, prodTrans,
            diff, coef;

        column = this.fromArrayColumn( this.column( mtrx, 0 ) );
        Ak = column;

        if( this.zeroedCheck( column ) )
            AkInv = this.transpose( column );
        else
            AkInv = this.pseudoInverseOnColumns(column);

        for( k = 1; k < this.width( mtrx ); k++) {
            column = this.fromArrayColumn( this.column( mtrx, k ) );
            prod = this.produce(AkInv,column);
            diff = this.differ(column,this.produce(Ak,prod));

            if( this.zeroedCheck( diff ) ) {
                prodTrans = this.transpose(prod);
                coef = 1 / ( 1 + this.produce( prodTrans, prod )[ 0 ][ 0 ] );
                lastRow = this.coef( this.produce( prodTrans, AkInv ), coef );
            } else
                lastRow = this.pseudoInverseOnColumns( diff, this.transpose( diff) );

            AkInv = this.concatDown( this.differ( AkInv, this.produce(prod,lastRow) ), lastRow );
            Ak = this.concatRight( Ak, column );
        }

        return AkInv;
    },

    // solves linear equation in OLS manner
    solveEquation: function(mtrx, array) {
        return this.produce(this.pseudoInverseGrevil(mtrx), this.fromArrayColumn(array));
    }
};

