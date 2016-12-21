using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RecensysCoreRepository.DTOs;
using RecensysCoreRepository.EFRepository.Entities;
using RecensysCoreRepository.Repositories;

namespace RecensysCoreRepository.EFRepository.Repositories
{
    public class StageDetailsRepository: IStageDetailsRepository
    {

        private readonly RecensysContext _context;

        public StageDetailsRepository(RecensysContext context)
        {
            if (context == null) throw new ArgumentNullException($"{nameof(context)} is null");
            _context = context;
        }

        public void Dispose()
        {
            
        }

        public StageDetailsDTO Read(int id)
        {
            return (from s in _context.Stages
                where s.Id == id
                select new StageDetailsDTO
                {
                    Id = s.Id,
                    Name = s.Name,
                    Description = s.Description
                }).Single();
        }

        public int GetStudyId(int stageId)
        {
            return (from s in _context.Stages
                where s.Id == stageId
                select s.StudyId).Single();
        }

        public int Create(int studyId, StageDetailsDTO dto)
        {
            var entity = new Stage()
            {
                Description = dto.Description,
                Name = dto.Name,
                StudyId = studyId
            };
            _context.Stages.Add(entity);
            _context.SaveChanges();
            return entity.Id;
        }

        public bool Update(StageDetailsDTO dto)
        {
            var e = (from s in _context.Stages
                where s.Id == dto.Id
                select s).Single();

            e.Name = dto.Name;
            e.Description = dto.Description;

            return _context.SaveChanges() > 0;
        }

        public ICollection<StageDetailsDTO> GetAll(int studyId)
        {
            return (from s in _context.Stages
                where s.StudyId == studyId
                orderby s.Id
                select new StageDetailsDTO
                {
                    Id = s.Id,
                    Name = s.Name,
                    Description = s.Description
                }).ToList();
        }


        public bool TryGetNextStage(int currentStageId, out int nextStageId)
        {
            var studyId = GetStudyId(currentStageId);

            var stageIds = (from s in _context.Stages
                where s.StudyId == studyId
                orderby s.Id
                select s.Id).ToArray();

            var index = Array.IndexOf(stageIds, currentStageId);
            if (index == stageIds.Length - 1)
            {
                nextStageId = -1;
                return false;
            }
            else
            {
                nextStageId = stageIds[index + 1];
                return true;
            }
            
        }
    }
}
