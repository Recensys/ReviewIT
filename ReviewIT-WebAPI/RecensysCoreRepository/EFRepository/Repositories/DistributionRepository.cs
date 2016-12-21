using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using RecensysCoreRepository.DTOs;
using RecensysCoreRepository.EFRepository.Entities;
using RecensysCoreRepository.Repositories;

namespace RecensysCoreRepository.EFRepository.Repositories
{
    public class DistributionRepository : IDistributionRepository
    {
        
        private readonly RecensysContext _context;

        public DistributionRepository(RecensysContext context)
        {
            if (context == null) throw new ArgumentNullException($"{nameof(context)} is null");
            _context = context;
        }
        

        public DistributionDTO Read(int stageId)
        {
            var q = (from s in _context.Strategies
                where s.StageId == stageId && s.StrategyType == StrategyType.Distribution
                select JsonConvert.DeserializeObject<DistributionDTO>(s.Value)).FirstOrDefault();
            if (q == null)
            {
                q = new DistributionDTO
                {
                    StageId = stageId,
                    Dist = new List<UserWorkDTO>()
                };
            }
            return q;
        }

        public bool Update(DistributionDTO dto)
        {
            var strategy = (from s in _context.Strategies
                where s.StageId == dto.StageId && s.StrategyType == StrategyType.Distribution
                select s).FirstOrDefault();

            if (strategy == null)
            {
                strategy = new Strategy()
                {
                    StageId = dto.StageId,
                    StrategyType = StrategyType.Distribution,
                };
                _context.Strategies.Add(strategy);
            }

            strategy.Value = JsonConvert.SerializeObject(dto);
            return _context.SaveChanges() > 0;
        }

        public void Dispose()
        {
            
        }
    }
}
