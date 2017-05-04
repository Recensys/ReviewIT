namespace RecensysCoreRepository.EFRepository.Entities
{

    public enum CriteriaType
    {
        Inclusion, Exclusion
    }

    public class Criteria : IEntity
    {
        public int Id { get; set; }
        public string Value { get; set; }
        public string Operator { get; set; }

        public CriteriaType Type { get; set; }

        public int StudyId { get; set; }
        public virtual Study Study { get; set; }

        public int FieldId { get; set; }
        public virtual Field Field { get; set; }
    }
}
