using System;
using System.Linq;
using System.Threading.Tasks;
using RecensysCoreRepository.DTOs;
using RecensysCoreRepository.Repositories;

namespace RecensysCoreBLL
{
    public class TaskDistributionEngine : ITaskDistributionEngine
    {
        private readonly IDistributionRepository _distRepo;
        private readonly ITaskConfigRepository _tRepo;
        private readonly IArticleRepository _articleRepo;

        public TaskDistributionEngine(IDistributionRepository distRepo, ITaskConfigRepository tRepo, IArticleRepository articleRepo)
        {
            _distRepo = distRepo;
            _tRepo = tRepo;
            _articleRepo = articleRepo;
        }


        public int Generate(int stageId)
        {
            var createdTasks = 0;

            using (_distRepo)
            using (_tRepo)
            {
                var article = _articleRepo.GetAllWithRequestedFields(stageId).ToList();
                var distDto = _distRepo.Read(stageId);
                var dist = distDto.Dist;

                var taskWeight = 100.0 / article.Count;
                var articleNr = 1;

                // TODO implment randomization in task distribution

                foreach (var a in article)
                {
                    var p = (articleNr * taskWeight) - taskWeight;
                    foreach (var d in dist)
                    {
                        if (InRange(p, d.Range[0], d.Range[1]))
                        {
                            _tRepo.Create(stageId, a.ArticleId, d.Id, a.FieldIds);
                            createdTasks++;
                        }
                    }
                    articleNr++;
                }
            }
            return createdTasks;
        }

        private bool InRange(double numberToCheck, double bottom, double top)
        {
            return numberToCheck >= bottom && numberToCheck < top;
        }

        public async Task<int> GenerateAsync(int stageId)
        {
            throw new NotImplementedException();
        }
    }
}