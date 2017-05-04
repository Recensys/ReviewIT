using System.Threading.Tasks;
using RecensysCoreBLL.CriteriaEngine.Evaluators;
using RecensysCoreRepository.Repositories;

namespace RecensysCoreBLL
{
    public class PostStageEngine: IPostStageEngine
    {

        private readonly ICriteriaEngine _criteriaEngine;
        private readonly IStageStartEngine _stageStartEngine;
        private readonly IStageDetailsRepository _stageDetailsRepo;

        public PostStageEngine(ICriteriaEngine criteriaEngine, IStageStartEngine stageStartEngine, IStageDetailsRepository stageDetailsRepo)
        {
            _criteriaEngine = criteriaEngine;
            _stageStartEngine = stageStartEngine;
            _stageDetailsRepo = stageDetailsRepo;
        }

        public int Evaluate(int stageId)
        {
            _criteriaEngine.Evaluate(stageId);

            using (_stageDetailsRepo)
            {
                int nextStageId;
                if (_stageDetailsRepo.TryGetNextStage(stageId, out nextStageId))
                {
                    return _stageStartEngine.StartStage(nextStageId);
                }
                return 0;
            }
        }

        public Task<int> EvaluateAsync(int stageId)
        {
            throw new System.NotImplementedException();
        }
    }
}