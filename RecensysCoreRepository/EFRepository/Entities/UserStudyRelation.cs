namespace RecensysCoreRepository.EFRepository.Entities
{
    public class UserStudyRelation
    {
        public int UserId { get; set; }
        public virtual User User { get; set; }

        public int StudyId { get; set; }
        public virtual Study Study { get; set; } 

        public bool IsAdmin { get; set; }

    }
}