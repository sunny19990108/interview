/**
 * 零钱兑换
 * 给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1；
 */

/**
 * 从后向前推导，并建立一个存放最少的硬币个数的数组（db = new Array(amount+1)）
 * db[0] = 0;
 * db[n] = Math.min(db[n], db[n-coin1]+1, db[n-coin2]+1,......);
 */

function moneyChange(coins, amount) {
  const db = new Array(amount + 1).fill(Infinity);
  db[0] = 0;
  for (let i = 1; i < db.length; i++) {
    for (let coin of coins) {
      if (i >= coin) {
        db[i] = Math.min(db[i], db[i - coin] + 1);
      }
    }
  }
  return db[amount] === Infinity ? -1 : db[amount];
}

/**
 * 零钱兑换2
 * 给你一个整数数组 coins 表示不同面额的硬币，另给一个整数 amount 表示总金额。
 * 请你计算并返回可以凑成总金额的硬币组合数。如果任何硬币组合都无法凑出总金额，返回 0 。
 * 假设每一种面额的硬币有无限个
 */

/**
 * 题意： 求组合数，
 * 所以要先遍历coins,保证每个db[i]中放入的coin只有一种顺序 例如{1,5}
 * 而如果先遍历amount,那么每个coin 都会向db[i]中放入一遍 例如{1,5} {5,1}(排列)
 * https://programmercarl.com/0518.%E9%9B%B6%E9%92%B1%E5%85%91%E6%8D%A2II.html
 *
 * 公式：从后向前推导，并建立一个存放硬币组合数的数组（db = new Array(amount+1)）
 * db[0] = 1; // 金额总数是0 只有0这一种情况（递推公式的基础）
 * db[n] = db[n-coin1] + db[n-coin2] + ......;
 *
 */
function moneyChangeII(coins, amount) {
  const db = new Array(amount + 1).fill(0);
  db[0] = 1;
  // 这里要先遍历coins
  for (let coin of coins) {
    for (let i = 1; i < db.length; i++) {
      if (i >= coin) {
        db[i] = db[i] + db[i - coin];
      }
    }
  }
  return db[amount];
}
