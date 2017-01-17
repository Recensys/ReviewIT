using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RecensysCoreRepository.DTOs;
using RecensysCoreRepository.EFRepository.Entities;
using RecensysCoreRepository.Repositories;

namespace RecensysCoreRepository.EFRepository.Repositories
{
    public class ReviewTaskRepository : IReviewTaskRepository
    {

        private readonly RecensysContext _context;

        public ReviewTaskRepository(RecensysContext context)
        {
            if (context == null) throw new ArgumentNullException($"{nameof(context)} is null");
            _context = context;
        }

        public void Dispose()
        {
            
        }

        public ReviewTaskListDTO GetListDto(int stageId, int userId)
        {
            // Find fields
            var fields = (from sf in _context.StageFieldRelations
                where sf.StageId == stageId
                orderby sf.FieldId
                let f = sf.Field
                select
                new TaskFieldDTO
                {
                    Id = f.Id,
                    Name = f.Name,
                    FieldType = sf.FieldType,
                    DataType = f.DataType
                }).ToList();

            // Find Tasks and populate data
            var taskDtos = (from t in _context.Tasks
                where t.StageId == stageId && t.UserId == userId && t.TaskState != TaskState.Done
                select new ReviewTaskDTO
                {
                    Id = t.Id,
                    TaskState = t.TaskState,
                    Data = (from d in _context.Data
                        where fields.Any(fi => fi.Id == d.FieldId) && d.ArticleId == t.ArticleId
                        orderby d.FieldId
                        select new DataDTO
                        {
                            Id = d.Id,
                            Value = d.Value
                        }).ToList()
                }).ToList();

            var result = new ReviewTaskListDTO
            {
                Fields = fields,
                Tasks = taskDtos
            };

            return result;
        }

        public async Task<ICollection<int>> GetIdsAsync(int stageId, int userId)
        {
            return await (from t in _context.Tasks
                where t.StageId == stageId && t.UserId == userId && t.TaskState != TaskState.Done
                orderby t.Id
                select t.Id).ToListAsync();
        }

        public async Task<ReviewTaskListDTO> GetTaskAsync(int id)
        {
            // Get stage id for task
            var stageId = await GetStageIdAsync(id);

            // Find fields
            var fields = await (from sf in _context.StageFieldRelations
                            where sf.StageId == stageId
                          orderby sf.FieldId
                          let f = sf.Field
                          select
                          new TaskFieldDTO
                          {
                              Id = f.Id,
                              Name = f.Name,
                              FieldType = sf.FieldType,
                              DataType = f.DataType
                          }).ToListAsync();


            // Find Tasks and populate data
            var taskDtos = await (from t in _context.Tasks
                where t.Id == id
                select new ReviewTaskDTO
                {
                    Id = t.Id,
                    TaskState = t.TaskState,
                    Data = (from d in _context.Data
                        where fields.Any(fi => fi.Id == d.FieldId) && d.ArticleId == t.ArticleId
                        orderby d.FieldId
                        select new DataDTO
                        {
                            Id = d.Id,
                            Value = d.Value
                        }).ToList()
                }).ToListAsync();

            var result = new ReviewTaskListDTO
            {
                Fields = fields,
                Tasks = taskDtos
            };

            return result;
        }

        public bool SetState(int id, TaskState state)
        {
            var entity = _context.Tasks.SingleOrDefault(t => t.Id == id);
            if (entity == null) return false;
            entity.TaskState = state;
            return _context.SaveChanges() > 0;
        }

        public bool Update(ReviewTaskDTO dto)
        {
            var stored = (from t in _context.Tasks
                where t.Id == dto.Id
                select t).Single();

            stored.TaskState = dto.TaskState;

            foreach (var d in dto.Data)
            {
                var ds = _context.Data.Single(da => da.Id == d.Id);
                ds.Value = d.Value;
            }

            return _context.SaveChanges() > 0;
        }

        public int CountIncomplete(int stageId)
        {
            return _context.Tasks.Count(t => t.StageId == stageId && t.TaskType == TaskType.Review && t.TaskState != TaskState.Done);
        }

        public int GetStageId(ReviewTaskDTO dto)
        {
            return (from t in _context.Tasks
                where t.Id == dto.Id
                select t.StageId).Single();
        }

        public int GetStageId(int id)
        {
            return (from t in _context.Tasks
                    where t.Id == id
                    select t.StageId).Single();
        }

        private async Task<int> GetStageIdAsync(int taskId)
        {
            return await (from t in _context.Tasks where t.Id == taskId select t.StageId).SingleAsync();
        }
    }
}
