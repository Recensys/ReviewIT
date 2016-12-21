using System.Collections.Generic;
using RecensysCoreRepository.DTOs;

namespace RecensysCoreRepository.EFRepository.Entities
{

    public enum TaskType
    {
        Unknown, Review, Conflict
    }
    

    public class Task : IEntity
    {
        public int Id { get; set; }

        public int StageId { get; set; }
        public virtual Stage Stage { get; set; }

        public int ArticleId { get; set; }
        public virtual Article Article { get; set; }

        public int UserId { get; set; }
        public virtual User User { get; set; }

        public TaskType TaskType { get; set; }

        public TaskState TaskState { get; set; }

        //public int? ParentId { get; set; }
        //public virtual Article Parent { get; set; }

        public virtual ICollection<Data> Data { get; set; } = new List<Data>();
    }
}