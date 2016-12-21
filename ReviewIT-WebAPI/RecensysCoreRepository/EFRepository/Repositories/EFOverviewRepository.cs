using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RecensysCoreRepository.DTOs;
using RecensysCoreRepository.Repositories;

namespace RecensysCoreRepository.EFRepository.Repositories
{
    public class EFOverviewRepository: IOverviewRepository
    {

        private readonly RecensysContext _context;

        public EFOverviewRepository(RecensysContext context)
        {
            if (context == null) throw new ArgumentNullException($"{nameof(context)} is null");
            _context = context;
        }


        public async Task<TaskOverviewDTO> ReadAsync(int studyId)
        {
            var result = new TaskOverviewDTO();

            result.Stages = await (from s in _context.Stages
                where s.StudyId == studyId
                orderby s.Id
                select new StageDetailsDTO
                {
                    Id = s.Id,
                    Name = s.Name,
                    Description = s.Description
                }).ToListAsync();

            result.UserTasks = await (from usr in _context.UserStudyRelations
                where usr.StudyId == studyId
                let u = usr.User
                select new UserTaskOverviewDTO
                {
                    User = new UserDetailsDTO
                    {
                        Id = u.Id,
                        LastName = u.LastName,
                        FirstName = u.FirstName,
                        Email = u.Email
                    }
                }).ToListAsync();

            foreach (var ut in result.UserTasks)
            {
                ut.Progress = await (from s in _context.Stages
                    where s.StudyId == studyId
                    let t = s.Tasks.Where(ta => ta.StageId == s.Id && ta.UserId == ut.User.Id)
                    orderby s.Id
                    select new TaskProgressDTO
                    {
                        DoneTasks = t.Count(ta => ta.TaskState == TaskState.Done),
                        TotalTasks = t.Count()
                    }).ToListAsync();
            }

            return result;
        }
    }
}