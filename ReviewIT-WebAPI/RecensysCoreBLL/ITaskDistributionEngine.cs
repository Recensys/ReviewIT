using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecensysCoreBLL
{
    public interface ITaskDistributionEngine
    {
        int Generate(int stageId);
        Task<int> GenerateAsync(int stageId);
    }
}
