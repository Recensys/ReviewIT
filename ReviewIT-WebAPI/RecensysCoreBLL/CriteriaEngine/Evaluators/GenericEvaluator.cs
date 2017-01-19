using System.Linq.Dynamic.Core;
using System.Linq.Expressions;

namespace RecensysCoreBLL.CriteriaEngine.Evaluators
{
    public class GenericEvaluator: IEvaluator
    {
        // uses https://www.nuget.org/packages/System.Linq.Dynamic.Core
        public bool Eval(string expected, string op, string actual)
        {
            if (actual == "") return true;
            // TODO run without the unused paramater.
            string exp = $"{expected}{op}{actual}";
            var parameter = Expression.Parameter(typeof(bool));
            var e = DynamicExpressionParser.ParseLambda(false, new []{ parameter }, null, exp);
            return (bool) e.Compile().DynamicInvoke(true);
        }
    }
}