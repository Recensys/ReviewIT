using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RecensysCoreRepository.DTOs;
using RecensysCoreRepository.EFRepository.Entities;
using RecensysCoreRepository.Repositories;

namespace RecensysCoreRepository.EFRepository.Repositories
{
    public class StudyMemberRepository : IStudyMemberRepository
    {

        private RecensysContext _context;

        public StudyMemberRepository(RecensysContext context)
        {
            _context = context;
        }

        public void Dispose()
        {
            
        }

        public ICollection<StudyMemberDTO> Get(int studyId)
        {
            return (from s in _context.UserStudyRelations
                where s.StudyId == studyId
                select new StudyMemberDTO
                {
                    Id = s.UserId,
                    FirstName = s.User.FirstName,
                    LastName = s.User.LastName,
                    Role = s.IsAdmin ? ResearcherRole.ResearchManager : ResearcherRole.Researcher
                }).ToList();
        }
        

        public bool Update(int studyId, StudyMemberDTO[] dtos)
        {
            var stored = (from s in _context.UserStudyRelations
                where s.StudyId == studyId
                select s).ToList();

            // remove entries in store that are not passed in dto
            foreach (var re in stored)
                if (dtos.All(d => d.Id == re.UserId)) _context.UserStudyRelations.Remove(re);

            // map data
            foreach (var dto in dtos)
            {
                var r = _context.UserStudyRelations.SingleOrDefault(us => us.UserId == dto.Id && us.StudyId == studyId);
                if (r == null)
                {
                    r = new UserStudyRelation()
                    {
                        IsAdmin = dto.Role == ResearcherRole.ResearchManager,
                        UserId = dto.Id,
                        StudyId = studyId
                    };
                    _context.UserStudyRelations.Add(r);
                }
                else
                {
                    r.IsAdmin = dto.Role == ResearcherRole.ResearchManager;
                }

            }
            return _context.SaveChanges() > 0;
        }
        
    }
}
