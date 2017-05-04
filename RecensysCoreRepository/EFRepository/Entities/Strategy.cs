using System.Collections.Generic;

namespace RecensysCoreRepository.EFRepository.Entities
{
    public enum StrategyType
    {
        Distribution, Validation
    }

    public class Strategy : IEntity
    {
        public int Id { get; set; }
        public string Value { get; set; }
        public StrategyType StrategyType { get; set; }

        public int StageId { get; set; }
        public virtual Stage Stage { get; set; }

    }
}