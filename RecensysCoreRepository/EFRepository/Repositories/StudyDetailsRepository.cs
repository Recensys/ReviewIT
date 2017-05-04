using System;
using System.Collections.Generic;
using System.Linq;
using RecensysCoreRepository.DTOs;
using RecensysCoreRepository.EFRepository.Entities;
using RecensysCoreRepository.Repositories;

namespace RecensysCoreRepository.EFRepository.Repositories
{
    public class StudyDetailsRepository : IStudyDetailsRepository
    {
        private readonly RecensysContext _context;

        public StudyDetailsRepository(RecensysContext context)
        {
            if (context == null) throw new ArgumentNullException($"{nameof(context)} is null");
            _context = context;
        }

        public IEnumerable<StudyDetailsDTO> GetAll()
        {
            return from s in _context.Studies
                    select new StudyDetailsDTO {Id = s.Id, Name = s.Name, Description = s.Description};
        }

        public IEnumerable<StudyDetailsDTO> GetAll(int userId)
        {
            return from us in _context.UserStudyRelations
                   where us.UserId == userId
                   let s = us.Study
                   select new StudyDetailsDTO { Id = s.Id, Name = s.Name, Description = s.Description };
        }

        public StudyDetailsDTO Read(int id)
        {
            return (from s in _context.Studies
                   where s.Id == id
                   select new StudyDetailsDTO
                   {
                       Id = s.Id,
                       Name = s.Name,
                       Description = s.Description
                   }).Single();
        }

        public bool Update(StudyDetailsDTO dto)
        {
            var e = (from s in _context.Studies
                where s.Id == dto.Id
                select s).Single();

            e.Name = dto.Name;
            e.Description = dto.Description;

            return _context.SaveChanges() > 0;
        }

        public int Create(StudyDetailsDTO dto)
        {
            var entity = new Study
            {
                Name = dto.Name,
                Description = dto.Description
            };
            _context.Studies.Add(entity);
            _context.SaveChanges();
            return entity.Id;
        }

        public bool Delete(int id)
        {
            var entity = from s in _context.Studies
                where s.Id == id
                select s;
            _context.Studies.RemoveRange(entity);
            return _context.SaveChanges() > 0;
        }

        public IEnumerable<int> GetStageIds(int studyId)
        {
            return from s in _context.Stages
                where s.StudyId == studyId
                select s.Id;
        }

        public IEnumerable<UserDetailsDTO> GetAllResearchers(int studyId)
        {
            return from us in _context.UserStudyRelations
                where us.StudyId == studyId
                select new UserDetailsDTO {Id = us.UserId, FirstName = us.User.FirstName};
        }


        public void Dispose()
        {
            
        }
    }
}
