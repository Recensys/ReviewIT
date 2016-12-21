using System.Collections.Generic;

namespace RecensysCoreRepository.EFRepository.Entities
{
    public class Article : IEntity
    {
        public int Id { get; set; }
        public int StudyId { get; set; }
        public virtual Study Study { get; set; }

        public CriteriaResult CriteriaResult { get; set; }

        //public virtual ICollection<TaskEntity> Tasks { get; set; } = new List<TaskEntity>();
        public virtual ICollection<Data> Data { get; set; } = new List<Data>();

    }
}