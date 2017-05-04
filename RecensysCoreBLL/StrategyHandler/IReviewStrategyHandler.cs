using System.Collections.Generic;

namespace RecensysCoreBLL.StrategyHandler
{
    public interface IReviewStrategyHandler
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="articles"></param>
        /// <param name="json"></param>
        /// <returns>a dictionary of article ids per user id</returns>
        Dictionary<int, List<int>> DivideTasks(List<int> articles, string json);
    }
}
