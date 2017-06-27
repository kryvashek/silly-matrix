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

    // makes a copy pf given matrix and returns it
    matrixCopy: function(A) {
        return A.map( this.arrayCopy );
    },

    // calculation of the determinant for the given square matrix
    // Bareiss algorithm, complexity is ~O(n^3)
    determinant: function(A) {
        var N = A[0].length,
            B = this.matrixCopy(A),
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

    // returns new array the same as given axcept of contatinig specified index
    arrayExclude: function(array, i) {
        return array.filter((entry, index) => (index !== i));
    },

    // excludes specified row and column from the matrix
    matrixExclude: function(matrix, i, j) {
        return this.arrayExclude(matrix, i).map( row => this.arrayExclude(row, j) );
    },

    // returns an adjugate matrix for the given one (should be square)
    adjugate: function(A) {
        var N = A[0].length,
            C = [],
            i, j, k;

        for (i = 0; i < N; i++) {
            C[i] = [];

            for (j = 0; j < N; j++)
                C[i][j] = (((i + j) % 2) ? -1 : 1) * this.determinant(this.matrixExclude(A, j, i));
        }

        return C;
    },

    // returns a transposed matrix based on the given one
    transpose: function(A) {
        var M = A.length,
            N = A[0].length,
            B = [],
            i, j;

        for (i = 0; i < N; i++) {
            B[i] = [];

            for (j = 0; j < M; j++)
                B[i][j] = A[j][i];
        }

        return B;
    },

    // returns matrix with one row made from usual array
    makeOneRowMatrix: function(array) {
        return [array];
    },

    // returns matrix with one column made from usual array
    makeOneColMatrix: function(array) {
        return this.transpose(this.makeOneRowMatrix(array));
    },

    // returns an inverse matrix for the given one (should be square)
    inverse: function(A) {
        var det = this.determinant(A);

        if (0 === det)
            return false;

        var N = A[0].length,
            B = this.adjugate(A),
            i, j;

        for (i = 0; i < N; i++)
            for (j = 0; j < N; j++)
                B[i][j] /= det;

        return B;
    },

    // returns a production of the given matrices or undefined if it can not be calculated
    produce: function(A, B) {
        console.log( "Producing ", A, " and ", B );
        var M = A.length,
            N = A[0].length,
            O = B.length,
            P = B[0].length,
            i, j, k,
            C = [];

        if (N != O)
            return undefined;

        for (i = 0; i < M; i++) {
            C[i] = [];

            for (j = 0; j < P; j++) {
                C[i][j] = 0;

                for (k = 0; k < N; k++)
                    C[i][j] += A[i][k] * B[k][j];
            }
        }

        return C;
    },

    // returns pseudoinverse matrix for the given one
    pseudoinverse: function(A) {
        var At = this.transpose(A);

        if (A.length < At.length)
            return this.produce(At, this.inverse(this.produce(A, At)));
        else
            return this.produce(this.inverse(this.produce(At, A)), At);
    },

    newPseudoInverse: function(A) {

    },

    // solves linear equation in OLS manner
    solveEquation: function(A, b) {
        return this.produce(this.pseudoinverse(A), this.makeOneColMatrix(b));
    }
};

