using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RecensysCoreRepository.DTOs;
using RecensysCoreRepository.EFRepository.Entities;
using RecensysCoreRepository.Repositories;

namespace RecensysCoreRepository.EFRepository.Repositories
{
    public class TaskConfigRepository: ITaskConfigRepository
    {

        private readonly RecensysContext _context;

        public TaskConfigRepository(RecensysContext context)
        {
            if (context == null) throw new ArgumentNullException($"{nameof(context)} is null");
            _context = context;
        }

        public void Dispose()
        {
            
        }
        public int Create(int stageId, int articleId, int ownerId, int[] requestedFields)
        {
            // add the task
            var task = new Entities.Task
            {
                ArticleId = articleId,
                StageId = stageId,
                UserId = ownerId,
                TaskType = TaskType.Review,
                TaskState = TaskState.New
            };

            // add all requested data to the task. If it already exists, add that, or create a new data entity.
            foreach (var rf in requestedFields)
            {
                var storedDataValue = (from d in _context.Data
                                       where d.ArticleId == articleId && rf == d.FieldId
                                       select d).SingleOrDefault();

                if (storedDataValue == null)
                {
                    storedDataValue = new Data
                    {
                        ArticleId = articleId,
                        FieldId = rf,
                        Value = ""
                    };
                }
                task.Data.Add(storedDataValue);
            }

            _context.Tasks.Add(task);
            _context.SaveChanges();

            return task.Id;
        }
    }
}
