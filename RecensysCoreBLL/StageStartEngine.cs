using System.Collections.Generic;
using RecensysCoreRepository.Repositories;
using System.Linq;

namespace RecensysCoreBLL
{
    public class StageStartEngine: IStageStartEngine
    {

        private readonly ITaskDistributionEngine _tdEngine;
        private readonly IArticleRepository _aRepo;
        private readonly IStageDetailsRepository _sdRepo;

        public StageStartEngine(ITaskDistributionEngine tdEngine, IArticleRepository aRepo, IStageDetailsRepository sdRepo)
        {
            _tdEngine = tdEngine;
            _aRepo = aRepo;
            _sdRepo = sdRepo;
        }

        public int StartStage(int id)
        {
            using(_aRepo)
            {
                // add articles from previous stage
                //var includedArticles = _aRepo.GetAllActiveIds(id);
                //foreach (var i in includedArticles)
                //{
                //    _aRepo.AddToStage(id, i);
                //}


                // create tasks for the first stage
                var nrOfTasksCreated = _tdEngine.Generate(id);

                return nrOfTasksCreated;
            }
        }
    }
}