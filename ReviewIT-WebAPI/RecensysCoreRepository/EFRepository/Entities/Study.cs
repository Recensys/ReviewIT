using System.Collections.Generic;

namespace RecensysCoreRepository.EFRepository.Entities
{
    public class Study : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual ICollection<Article> Articles { get; set; } = new List<Article>();
        public virtual ICollection<Criteria> Criteria { get; set; } = new List<Criteria>();
        public virtual ICollection<Field> Fields { get; set; } = new List<Field>();
        public virtual ICollection<Stage> Stages { get; set; } = new List<Stage>();
        public virtual ICollection<UserStudyRelation> UserRelations { get; set; } = new List<UserStudyRelation>();

    }
}