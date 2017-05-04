using System.Collections.Generic;

namespace RecensysCoreBLL.StrategyHandler
{
    class StubReviewStrategyHandler : IReviewStrategyHandler
    {
        
        
        public Dictionary<int, List<int>> DivideTasks(List<int> articles, string json)
        {

            var dic = new Dictionary<int, List<int>>();
            switch (json)
            {
                case "1":
                    dic = Equal(articles, json);
                    break;

                case "2":
                    dic = Overlap(articles, json);
                    break;

                default:
                        return new Dictionary<int, List<int>>
                        {
                            {1, new List<int>() {1, 2, 3, 4, 5}},
                            {2, new List<int>() {6, 7, 8, 9, 10}}
                        };
            }

            return dic;
        }


        private Dictionary<int, List<int>> Equal(List<int> articles, string json)
        {
            var dic = new Dictionary<int, List<int>>()
            {
                { 1, new List<int>()},
                { 2, new List<int>()},
            };
            var enumerator = dic.Keys.GetEnumerator();
            foreach (var article in articles)
            {
                dic[enumerator.Current].Add(article);
                if (!enumerator.MoveNext())
                {
                    enumerator = dic.Keys.GetEnumerator();
                }
            }

            return dic;
        }

        private Dictionary<int, List<int>> Overlap(List<int> articles, string json)
        {
            var dic = new Dictionary<int, List<int>>()
            {
                { 1, new List<int>()},
                { 2, new List<int>()},
            };
            foreach (var article in articles)
            {
                foreach (var user in dic)
                {
                    user.Value.Add(article);
                }
            }

            return dic;
        }
    }
}
