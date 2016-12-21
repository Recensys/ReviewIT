using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecensysCoreBLL.CriteriaEngine.Evaluators
{
    public interface ICriteriaEngine
    {
        void Evaluate(int stageId);

        Task EvaluateAsync(int stageId);
    }
}
