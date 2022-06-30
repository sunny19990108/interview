/**
 * 最大正方形
 * 在一个由 '0' 和 '1' 组成的二维矩阵内，找到只包含 '1' 的最大正方形，并返回其面积。
 */

/**
 * 找动态规划方程：
 * 【理解题目】：找最大正方形，并返回其面积，实际就是找正方形的最长边
 * 【解题思路】：假设已经有了一个由 '0' 和 '1' 组成的二维矩阵，正方形的最长边肯定是以一个点为右下角，「min(该点左边最长距离，该点上边最长距离，该点左上最长距离)+ 1（该点）」；
 *  如果该点的左边｜左上｜上边有0的情况，那么推导出该点就是 1，这个公式也没问题
 *  就像 木桶的短板理论 那样，附近的最小边长，才与该点的最长边长有关。
 * 【数据结构】：使用一个二维数组存储以该点为右下角的正方形的最长边，由于题目入参也是个二维数组，可以直接使用入参的数组当存储最长边的数组
 *  db[i][j] = Math.min(db[i-1][j], db[i][j-1], db[i-1][j-1]) + 1;
 */

/**
 * @param {character[][]} matrix
 * @return {number}
 */
const maximalSquare = (matrix) => {
  if (!matrix.length || !matrix[0].length) return 0;
  let area = 0;
  const rowLength = matrix.length,
    columnLength = matrix[0].length;
  for (let row = 0; row < rowLength; row++) {
    for (let column = 0; column < columnLength; column++) {
      matrix[row][column] = Number(matrix[row][column]);
      if (matrix[row][column] === 1 && row > 0 && column > 0) {
        matrix[row][column] =
          Math.min(
            matrix[row - 1][column],
            matrix[row][column - 1],
            matrix[row - 1][column - 1]
          ) + 1;
      }
      area = Math.max(area, matrix[row][column]);
    }
  }
  return area * area;
};
