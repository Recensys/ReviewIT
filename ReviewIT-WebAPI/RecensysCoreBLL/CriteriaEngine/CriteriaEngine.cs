using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RecensysCoreBLL.CriteriaEngine.Evaluators;
using RecensysCoreRepository.DTOs;
using RecensysCoreRepository.EFRepository.Repositories;
using RecensysCoreRepository.Repositories;

namespace RecensysCoreBLL.CriteriaEngine
{
    public class CriteriaEngine: ICriteriaEngine
    {

        private readonly IDictionary<DataType, IEvaluator> _evaluators;
        private readonly IStageFieldsRepository _sfRepo;
        private readonly ICriteriaRepository _cRepo;
        private readonly IStageDetailsRepository _stageDetailsRepo;
        private readonly IArticleRepository _articleRepo;
        private readonly IDataRepository _dataRepo;

        public CriteriaEngine(IStageFieldsRepository sfRepo, ICriteriaRepository cRepo, IStageDetailsRepository stageDetailsRepo, IArticleRepository articleRepo, IDataRepository dataRepo)
        {
            _sfRepo = sfRepo;
            _cRepo = cRepo;
            _stageDetailsRepo = stageDetailsRepo;
            _articleRepo = articleRepo;
            _dataRepo = dataRepo;

            var g = new GenericEvaluator();
            var n = new NumberEvaluator();
            var s = new StringEvaluator();
            _evaluators = new Dictionary<DataType, IEvaluator>
            {
                [DataType.Boolean] = g,
                [DataType.Number] = g,
                [DataType.String] = s
            };
        }


        public void Evaluate(int stageId)
        {
            // evaluate criteria
            List<FieldDTO> stageFields;
            CriteriaDTO criteria;
            using (_sfRepo)
            using (_cRepo)
            using (_stageDetailsRepo)
            using (_articleRepo)
            using (_dataRepo)
            {
                stageFields = _sfRepo.Get(stageId, FieldType.Requested);
                var studyId = _stageDetailsRepo.GetStudyId(stageId);
                criteria = _cRepo.Read(studyId);
                var articles = _articleRepo.GetAllActiveIds(stageId).ToList();
                foreach (var stageField in stageFields)
                {
                    var inc =
                        criteria.Inclusions?.SingleOrDefault(i => i.Field.Id == stageField.Id);
                    var exc =
                        criteria.Exclusions?.SingleOrDefault(x => x.Field.Id == stageField.Id);

                    if (inc != null || exc != null)
                    {
                        foreach (var a in articles)
                        {
                            var data = _dataRepo.Read(a, stageField.Id);

                            if (inc != null && EvaluateArticle(inc, data.Value))
                            {
                                _articleRepo.AddCriteriaResult(inc.Id, stageId, a);
                                continue;
                            }
                            if (exc != null && EvaluateArticle(exc, data.Value))
                            {
                                _articleRepo.AddCriteriaResult(exc.Id, stageId, a);
                            }
                        }
                    }
                }
            }
        }

        private bool EvaluateArticle(FieldCriteriaDTO criteria, string articleData)
        {
            var dataType = criteria.Field.DataType;
            return _evaluators[dataType].Eval(criteria.Value, criteria.Operator, articleData);
        }

        public Task EvaluateAsync(int stageId)
        {
            throw new System.NotImplementedException();
        }
    }
}