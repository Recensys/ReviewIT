namespace RecensysCoreRepository.DTOs
{
    public class FieldCriteriaDTO
    {
        public int Id { get; set; }
        public string Value { get; set; }
        public string Operator { get; set; }
        public FieldDTO Field { get; set; }
    }
}