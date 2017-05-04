using System.Threading.Tasks;

namespace RecensysCoreBLL
{
    public interface IPostStageEngine
    {
        int Evaluate(int stageId);

        Task<int> EvaluateAsync(int stageId);
    }
}