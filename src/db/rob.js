/**
 * 打家劫舍
 * 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
 * 给定一个代表每个房屋存放金额的非负整数数组，计算你在不触动警报装置的情况下，能够偷窃到的最高金额
 */

/**
 * 思路
 * 动态规划方程： db[n] = Math.max(db[n-1],db[n-2] + num)
 * 假设第n家的金额是num,那么由于不能拿连续的两家，可以拿到的最大金额是以下两种情况中比较大的那个：
 * 1、到第 n-1 家能拿到的最大金额
 * 2、到第 n-2 家能拿到的最大金额 + 第n家的金额num
 */

function rob(arr) {
  if (arr.length === 0) {
    return 0;
  } else if (arr.length === 1) {
    return arr[0];
  } else if (arr.length === 2) {
    return Math.max(arr[0], arr[1]);
  } else {
    let db = [arr[0], Math.max(arr[0], arr[1])];
    for (let i = 2; i < arr.length; i++) {
      db[i] = Math.max(db[i - 1], db[i - 2] + arr[i]);
    }
    return Math.max(
      db[arr.length - 2],
      db[arr.length - 3] + arr[arr.length - 1]
    );
  }
}
