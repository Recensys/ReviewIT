namespace RecensysCoreRepository.EFRepository.Entities
{
    public class UserStageRelation
    {
        public int UserId { get; set; }
        public virtual User User { get; set; }

        public int StageId { get; set; }
        public virtual Stage Stage { get; set; }

        public int StageRoleId { get; set; }
        public virtual StageRole StageRole { get; set; }
    }
}