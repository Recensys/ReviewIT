using System.Collections.Generic;

namespace RecensysCoreRepository.EFRepository.Entities
{
    public class Stage : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool StageInitiated { get; set; }


        public int StudyId { get; set; }
        public virtual Study Study { get; set; }

        

        public virtual ICollection<StageFieldRelation> StageFields { get; set; } = new List<StageFieldRelation>();
        public virtual ICollection<Task> Tasks { get; set; } = new List<Task>();
        public virtual ICollection<UserStageRelation> UserRelations { get; set; } = new List<UserStageRelation>();

        public virtual ICollection<Strategy> Strategies { get; set; } = new List<Strategy>();

        public virtual ICollection<CriteriaResult> CriteriaResults { get; set; } = new List<CriteriaResult>();
        
    }
}