namespace RecensysCoreRepository.EFRepository.Entities
{
    public class Data : IEntity
    {
        public int Id { get; set; }
        public string Value { get; set; }

        public int? TaskId { get; set; }
        public virtual Task Task { get; set; }

        public int FieldId { get; set; }
        public virtual Field Field { get; set; }

        public int ArticleId { get; set; }
        public virtual Article Article { get; set; }

    }
}