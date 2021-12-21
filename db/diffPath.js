/**
 * 不同路径
 * 一个机器人位于一个 m x n 网格的左上角
 * 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角
 * 问总共有多少条不同的路径？
 */

/**
 * 首先想到机器人想到达右下角，其实就是向右走m-1步，向下走n-1步,所以是从m-1+n-1中挑出n-1步向下，有多少种组合
 */
function diffPath(m, n) {
  if(m > 1 && n > 1) {
    let result = 1;
    for(let i = 0; i < n - 1; i++) {
      result = result * (m+n-2-i) / (1+i);
    }
    return result;
  } else {
    return 1;
  }
}

/**
 * 使用动态规划
 * 到达d[i][j]的路径条数 = d[i-1][j] + d[i][j-1]
 * 当 i === 0 或 j === 0 时，都是1条路径
 */
 function diffPath(m, n) {
  const db = new Array(m).map(() => {return new Array(n).fill(0)})
  // 内层数组
  for(let i = 0; i < n; i++) {
    db[0][i] = 1;
  }
  // 外层数组
  for(let j = 0; j < m; j++) {
    db[j][0] = 1;
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
     db[i][j] = db[i-1][j] + db[i][j-1];
    }
  }
  return db[m-1][n-1];
}
