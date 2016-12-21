using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecensysCoreBLL.CriteriaEngine.Evaluators
{
    public class StringEvaluator: IEvaluator
    {
        public bool Eval(string expected, string op, string actual)
        {
            return actual.ToLower().Contains(expected.ToLower());
        }
    }
}
