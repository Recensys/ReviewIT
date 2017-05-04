using System.Linq;
using RecensysCoreRepository.Repositories;

namespace RecensysCoreBLL
{
    public class StudyStartEngine: IStudyStartEngine
    {

        private readonly IStageStartEngine _stageEngine;
        private readonly IStageDetailsRepository _stageRepo;
        private readonly IArticleRepository _aRepo;
        private readonly ITaskDistributionEngine _tdEngine;

        public StudyStartEngine(IStageStartEngine stageEngine, IStageDetailsRepository stageRepo, IArticleRepository aRepo, ITaskDistributionEngine tdEngine)
        {
            _stageEngine = stageEngine;
            _stageRepo = stageRepo;
            _aRepo = aRepo;
            _tdEngine = tdEngine;
        }


        public int StartStudy(int studyId)
        {
            using (_aRepo)
            {
                using (_stageRepo)
                {

                    var minStageId = _stageRepo.GetAll(studyId).Min(s => s.Id);

                    // add articles from previous stage
                    // No longer needed
                    //var includedArticles = _aRepo.GetAllIdsForStudy(studyId).ToList();
                    //foreach (var i in includedArticles)
                    //{
                    //    _aRepo.AddToStage(minStageId, i);
                    //}

                    // create tasks for the first stage
                    var nrOfTasksCreated = _tdEngine.Generate(minStageId);

                    return nrOfTasksCreated;
                }
            }
            
        }
    }
}