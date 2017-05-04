using System.Collections.Generic;

namespace RecensysCoreRepository.EFRepository.Entities
{
    public class StageRole : IEntity
    {
        public int Id { get; set; }
        public string Value { get; set; }

        public virtual ICollection<UserStageRelation> UserStageRelations { get; set; } = new List<UserStageRelation>();
    }
}
