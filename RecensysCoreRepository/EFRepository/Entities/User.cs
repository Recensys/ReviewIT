using System.Collections.Generic;

namespace RecensysCoreRepository.EFRepository.Entities
{
    public class User : IEntity
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string PasswordSalt { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string NameWithIdentifyProvider { get; set; }

        public virtual ICollection<Task> Tasks { get; set; } = new List<Task>();
        public virtual ICollection<UserStageRelation> StageRelations { get; set; } = new List<UserStageRelation>();
        public virtual ICollection<UserStudyRelation> StudyRelations { get; set; } = new List<UserStudyRelation>();
    }
}